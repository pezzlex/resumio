import Box from '@iso/components/utility/box'
import LayoutContent from '@iso/components/utility/layoutContent'
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper'
import Loader from '@iso/components/utility/loader'
import {
  Button,
  Col,
  Form,
  Input,
  notification,
  Row,
  Skeleton,
  Spin,
} from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Redirect, useParams, useRouteMatch } from 'react-router-dom'
import {
  addResume,
  clearCurrentResume,
  clearStatus,
  editResume,
  fetchResumeById,
  fetchResumes,
} from '../redux/resumes/actions'
import { Header, Title } from './AppLayout.style'
import InvoicePageWrapper from './Invoice/SingleInvoice.styles'
import RenderedPdf from './RenderedPdf/RenderedPdf'
import Styles from './AddEditResume.scss'
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'
import { Prompt } from 'react-router'

export const unstructured = ({
  contact: { firstName, lastName, email, phone },
  workExperience: { headerName, content },
  fileName,
}) => ({
  fileName,
  firstName,
  lastName,
  phone,
  email,
  headerName,
  workExpContent: content,
})

const AddEditResume = () => {
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages)
  }
  const dispatch = useDispatch()
  const { resumeId } = useParams()

  const match = useRouteMatch()
  const isAddResume = match.path.endsWith('create-resume')
  const { error, success, currentResume } = useSelector(
    (state) => state.resumeData
  )
  const { resumes, count } = useSelector((state) => state.resumeData.resumes)

  const { firstName, lastName, email } = useSelector((state) => state.Auth)
  const defaultFileNamePrefix = 'New Resume'
  /**
   * Generate default filenames like New Resume 1, New Resume 2, etc
   * @param {list of resumes} resumes
   */
  const defaultFileName = (resumes) => {
    let maxIndex = -1
    resumes.forEach((resume) => {
      if (resume.fileName.startsWith(defaultFileNamePrefix)) {
        const fileIndex =
          resume.fileName === defaultFileNamePrefix
            ? 0
            : parseInt(resume.fileName.substr(defaultFileNamePrefix.length + 1))
        if (Number.isInteger(fileIndex)) {
          maxIndex = Math.max(maxIndex, fileIndex)
        }
      }
    })
    return maxIndex === -1
      ? defaultFileNamePrefix
      : `${defaultFileNamePrefix} ${maxIndex + 1}`
  }
  const [fileName, setFileName] = useState(defaultFileName(resumes))

  const [isLoading, setLoading] = useState(false)
  // So it should be false initially, except if I'm on add resume page
  const [isPageLoading, setPageLoading] = useState(true)
  const [redirectToReferrer, setRedirectToReferrer] = useState(false)
  const [isChangeDetected, setChangeDetected] = useState(false)
  const [isLiveChangeDetected, setLiveChangeDetected] = useState(false)
  // Hackey workaround for React-PDF bug
  const [isPdfReady, setPdfReady] = useState(true)
  const [isUpdating, setUpdating] = useState(false)
  const [liveResume, setLiveResume] = useState(
    isAddResume
      ? {
          fileName,
          firstName,
          lastName,
          email,
        }
      : {
          ...unstructured(currentResume),
        }
  )
  const [isSpinning, setSpinning] = useState(false)
  const [canDownload, setCanDownload] = useState(true)

  const [delayedResume, setDelayedResume] = useState(liveResume)

  const [form] = Form.useForm()

  useEffect(() => {
    if (!isUpdating && isLiveChangeDetected) {
      console.log('liveResume', delayedResume, 'latestValue', liveResume)
      setTimeout(() => {
        setUpdating(true)
        setTimeout(() => {
          setUpdating(false)
          setLiveChangeDetected(false)
        }, 2000)
      }, 9000)
      setSpinning(true)
      setTimeout(() => {
        setSpinning(false)
      }, 500)
      setDelayedResume({ ...delayedResume, ...liveResume })
    }
  }, [isUpdating, isLiveChangeDetected])

  useEffect(() => {
    // If initially edit, fetch resume => add currentResume
    if (!isAddResume) {
      dispatch(fetchResumeById(resumeId))
      // If initially add, clear current resume
    } else {
      dispatch(clearCurrentResume())
      setRedirectToReferrer(false)
    }
  }, [])

  useEffect(() => {
    if (success || error) {
      dispatch(clearStatus())
      setLoading(false)
      setPageLoading(false)
    }
  }, [success, error])

  const updateDelayedResume = () => {
    setSpinning(true)
    setTimeout(() => {
      setSpinning(false)
    }, 500)
    setDelayedResume({ ...delayedResume, ...liveResume })
    setLiveChangeDetected(false)
  }

  const onFinish = (values) => {
    const structured = ({ fileName, firstName, lastName, phone, email }) => ({
      contact: {
        firstName,
        lastName,
        email,
        phone,
      },
      fileName,
    })
    if (isAddResume) {
      dispatch(addResume(structured(values)))
    } else {
      setPdfReady(false)
      setTimeout(() => {
        setPdfReady(true)
      }, 1)
      dispatch(editResume(resumeId, structured(values)))
      updateDelayedResume()
    }
    setLoading(true)
  }

  const download = () => {
    setCanDownload(false)
    updateDelayedResume()
    setTimeout(() => {
      setCanDownload(true)
    }, 200)
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  useEffect(() => {
    if (error) {
      notification['error']({
        message: 'Error',
        description: error,
      })
    }
  }, [error])
  useEffect(() => {
    if (success) {
      dispatch(fetchResumes)
      if (isAddResume) setRedirectToReferrer(true)
      if (!isAddResume) {
        setChangeDetected(false)
        setLiveChangeDetected(false)
      }
    }
  }, [success])

  if (redirectToReferrer && currentResume) {
    let from = {
      pathname: `/dashboard/edit-resume/${currentResume._id}`,
    }

    return <Redirect to={from} />
  }

  const handleAddWorkExperience = () => {
    const newWorkExp = {
      companyName: 'Company Name',
      startDate: Date.now,
      endDate: Date.now,
      summary: 'Summary Here',
      description: [],
    }
    setLiveResume({
      ...liveResume,
      workExpContent: [...liveResume.workExpContent, newWorkExp],
    })

    const structuredValues = {
      contact: {
        firstName: liveResume.firstName,
        lastName: liveResume.lastName,
        email: liveResume.email,
        phone: liveResume.phone,
      },
      workExperience: {
        headerName: liveResume.headerName,
        content: [...liveResume.workExpContent, newWorkExp],
      },
      fileName: liveResume.fileName,
    }
    debugger
    if (isAddResume) {
      dispatch(addResume(structuredValues))
    } else {
      setPdfReady(false)
      setTimeout(() => {
        setPdfReady(true)
      }, 1)
      dispatch(editResume(resumeId, structuredValues))
      updateDelayedResume()
    }
    setLoading(true)
  }

  return (
    <>
      <React.Fragment>
        <Prompt
          when={isChangeDetected}
          message="You have unsaved changes. Are you sure you want to leave?"
        />

        <LayoutContentWrapper>
          <LayoutContent>
            {!isPageLoading ? (
              isAddResume || currentResume ? (
                <>
                  <Form
                    form={form}
                    layout="vertical"
                    initialValues={liveResume}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    onValuesChange={(value) => {
                      setLiveResume({ ...liveResume, ...value })
                      setChangeDetected(true)
                      setLiveChangeDetected(true)
                    }}
                    scrollToFirstError
                  >
                    <Header>
                      <Title>
                        {isAddResume
                          ? fileName
                            ? `Build Resume "${fileName}"`
                            : 'Build Resume'
                          : `Edit Resume "${currentResume.fileName}"`}
                      </Title>
                      <InvoicePageWrapper className="InvoicePageWrapper">
                        <div className="PageHeader viewMode">
                          {!isAddResume ? (
                            <>
                              {isChangeDetected ? (
                                <Link to={`/dashboard/resume/${resumeId}`}>
                                  <Button className="isoGoInvoBtn">
                                    Cancel
                                  </Button>
                                </Link>
                              ) : (
                                <Link to={`/dashboard/resume/${resumeId}`}>
                                  <Button className="isoGoInvoBtn">Done</Button>
                                </Link>
                              )}

                              {isChangeDetected ? (
                                <Button
                                  type="primary"
                                  loading={isLoading}
                                  htmlType="submit"
                                >
                                  Save Changes
                                </Button>
                              ) : (
                                <Button type="primary" disabled>
                                  Changes Saved!
                                </Button>
                              )}
                            </>
                          ) : (
                            <>
                              <Link to="/dashboard">
                                <Button className="isoGoInvoBtn">Cancel</Button>
                              </Link>
                              <Button
                                type="primary"
                                loading={isLoading}
                                htmlType="submit"
                              >
                                Save
                              </Button>
                            </>
                          )}
                        </div>
                      </InvoicePageWrapper>
                    </Header>

                    <Box>
                      <InvoicePageWrapper className="editView">
                        <Row gutter={24}>
                          <Col xl={12} lg={12} md={12} span={24}>
                            <Row gutter={16}>
                              <Col xl={12} lg={12} md={12} span={24}>
                                <Form.Item
                                  label="File Name"
                                  name="fileName"
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Please input a file name!',
                                    },
                                  ]}
                                >
                                  <Input
                                    placeholder="File Name"
                                    onChange={(e) => {
                                      setFileName(e.target.value)
                                    }}
                                  />
                                </Form.Item>
                              </Col>
                            </Row>

                            <Row gutter={16}>
                              <Col xl={12} lg={12} md={12} span={24}>
                                <Form.Item
                                  label="First Name"
                                  name="firstName"
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Please input your first name!',
                                    },
                                  ]}
                                >
                                  <Input placeholder="First Name" />
                                </Form.Item>
                              </Col>
                              <Col xl={12} lg={12} md={12} span={24}>
                                <Form.Item
                                  label="Last Name"
                                  name="lastName"
                                  rules={[
                                    {
                                      required: true,
                                      message: 'Please input your last name!',
                                    },
                                  ]}
                                >
                                  <Input placeholder="Last Name" />
                                </Form.Item>
                              </Col>
                              <Col xl={12} lg={12} md={12} span={24}>
                                <Form.Item
                                  label="Email"
                                  name="email"
                                  rules={[{ type: 'email' }]}
                                >
                                  <Input placeholder="Email" />
                                </Form.Item>
                              </Col>
                              <Col xl={12} lg={12} md={12} span={24}>
                                <Form.Item label="Contact Number" name="phone">
                                  <Input placeholder="Contact Number" />
                                </Form.Item>
                              </Col>
                              <Col xl={24} lg={24} md={24} span={24}>
                                <Button
                                  type="primary"
                                  onClick={handleAddWorkExperience}
                                >
                                  Add Work Experience
                                </Button>
                              </Col>
                              {liveResume.workExpContent &&
                                liveResume.workExpContent.map((exp, index) => {
                                  return (
                                    <Col
                                      xl={24}
                                      lg={24}
                                      md={24}
                                      span={24}
                                      key={index}
                                    >
                                      <Form.Item
                                        label="Work Experience"
                                        name={exp.companyName}
                                      >
                                        <Input placeholder={exp.companyName} />
                                      </Form.Item>
                                    </Col>
                                  )
                                })}
                            </Row>
                          </Col>

                          <Col flex="auto" className="iframeFull">
                            {
                              // isReady
                              isPdfReady ? (
                                <>
                                  <Spin
                                    spinning={isSpinning}
                                    // delay={700}
                                    tip="Updating Preview..."
                                  >
                                    <PDFViewer height="700" width="95%">
                                      <RenderedPdf resume={delayedResume} />
                                    </PDFViewer>

                                    <Button
                                      type="primary"
                                      loading={!canDownload}
                                      onClick={download}
                                    >
                                      <PDFDownloadLink
                                        document={
                                          <RenderedPdf
                                            resume={delayedResume}
                                            // resume={{ fileName: 'dummy' }}
                                          />
                                        }
                                        fileName={`${delayedResume.fileName}.pdf`}
                                      >
                                        Download!
                                      </PDFDownloadLink>
                                    </Button>
                                  </Spin>
                                </>
                              ) : (
                                <Loader />
                              )
                            }
                          </Col>
                        </Row>
                      </InvoicePageWrapper>
                    </Box>
                  </Form>
                </>
              ) : (
                <Header>
                  <Title>Resume not found!</Title>
                  <InvoicePageWrapper className="InvoicePageWrapper">
                    <div className="PageHeader viewMode">
                      <Link to="/dashboard">
                        <Button className="isoGoInvoBtn">
                          <span>Back to My Resumes</span>
                        </Button>
                      </Link>
                    </div>
                  </InvoicePageWrapper>
                </Header>
              )
            ) : (
              <Loader />
            )}
          </LayoutContent>
        </LayoutContentWrapper>
      </React.Fragment>
    </>
  )
}

export default AddEditResume
