import Box from '../components/utility/box'
import LayoutContent from '../components/utility/layoutContent'
import LayoutContentWrapper from '../components/utility/layoutWrapper'
import Loader from '../components/utility/loader'
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
// import InvoicePageWrapper from './Invoice/SingleInvoice.styles'
import RenderedPdf from './RenderedPdf/RenderedPdf'
import Styles from './AddEditResume.scss'
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'
import { Prompt } from 'react-router'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

const { TextArea } = Input
export const unstructured = ({
  contact: { firstName, lastName, email, phone },
  workExperience: { headerName, content },
  education,
  projects,
  skills,
  fileName,
}) => ({
  fileName,
  firstName,
  lastName,
  phone,
  email,
  workHeaderName: headerName,
  workExperienceContent: content,
  educationContent: education.content,
  educationHeaderName: education.headerName,
  projectHeaderName: projects.headerName,
  projectContent: projects.content,
  skillsContent: skills.content,
  skillsHeaderName: skills.headerName,
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
          workHeaderName: 'Work Experience',
          workExperienceContent: [],
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
    const structured = ({
      fileName,
      firstName,
      lastName,
      phone,
      email,
      workHeaderName,
      workExperienceContent,
      educationContent,
      educationHeaderName,
      projectContent,
      projectHeaderName,
      skillsContent,
      skillsHeaderName,
    }) => ({
      contact: {
        firstName,
        lastName,
        email,
        phone,
      },
      workExperience: {
        headerName: workHeaderName,
        content: workExperienceContent,
      },
      education: {
        headerName: educationHeaderName,
        content: educationContent,
      },
      projects: {
        headerName: projectHeaderName,
        content: projectContent,
      },
      skills: {
        headerName: skillsHeaderName,
        content: skillsContent,
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

                      <div className="PageHeader viewMode">
                        {!isAddResume ? (
                          <>
                            {isChangeDetected ? (
                              <Link to={`/dashboard/resume/${resumeId}`}>
                                <Button className="isoGoInvoBtn">Cancel</Button>
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
                    </Header>

                    <Box>
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

                          <br></br>
                          <h4>Contact Information</h4>
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
                              <br></br>
                              <h4>Work Experience</h4>
                              <Form.List name="workExperienceContent">
                                {(fields, { add, remove }) => {
                                  return (
                                    <div>
                                      {fields.map((field, index) => (
                                        <Row key={field.key}>
                                          <Col xl={23}>Job {index + 1}</Col>
                                          <Col xl={1}>
                                            <MinusCircleOutlined
                                              className="dynamic-delete-button"
                                              onClick={() => {
                                                remove(field.name)
                                              }}
                                            />
                                          </Col>
                                          <Col xl={24} span={24}>
                                            <Form.Item
                                              label="Job Title"
                                              name={[field.name, 'jobTitle']}
                                              fieldKey={[
                                                field.fieldKey,
                                                'jobTitle',
                                              ]}
                                              // rules={rules}
                                            >
                                              <Input placeholder="Job Title" />
                                            </Form.Item>
                                          </Col>

                                          <Col xl={24} span={24}>
                                            <Form.Item
                                              label="Company Name"
                                              name={[field.name, 'companyName']}
                                              fieldKey={[
                                                field.fieldKey,
                                                'companyName',
                                              ]}
                                              // rules={rules}
                                            >
                                              <Input placeholder="Employer Name" />
                                            </Form.Item>
                                          </Col>
                                          <Col
                                            xl={12}
                                            lg={12}
                                            md={12}
                                            span={24}
                                          >
                                            <Form.Item
                                              label="Start Date"
                                              name={[field.name, 'startDate']}
                                              fieldKey={[
                                                field.fieldKey,
                                                'startDate',
                                              ]}
                                              // rules={rules}
                                            >
                                              <Input placeholder="Start Date" />
                                            </Form.Item>
                                          </Col>

                                          <Col
                                            xl={12}
                                            lg={12}
                                            md={12}
                                            span={24}
                                          >
                                            <Form.Item
                                              label="End Date"
                                              name={[field.name, 'endDate']}
                                              fieldKey={[
                                                field.fieldKey,
                                                'endDate',
                                              ]}
                                              // rules={rules}
                                            >
                                              <Input placeholder="End Date" />
                                            </Form.Item>
                                          </Col>

                                          <Col xl={24} span={24}>
                                            <Form.Item
                                              label="Description"
                                              name={[field.name, 'description']}
                                              fieldKey={[
                                                field.fieldKey,
                                                'description',
                                              ]}
                                              // rules={rules}
                                            >
                                              <TextArea
                                                rows={4}
                                                placeholder="Description"
                                              />
                                            </Form.Item>
                                          </Col>
                                        </Row>
                                      ))}

                                      <Form.Item>
                                        <Button
                                          type="dashed"
                                          onClick={() => {
                                            add()
                                          }}
                                          style={{ width: '100%' }}
                                        >
                                          <PlusOutlined /> Add Work Experience
                                        </Button>
                                      </Form.Item>
                                    </div>
                                  )
                                }}
                              </Form.List>
                            </Col>

                            <Col xl={24} lg={24} md={24} span={24}>
                              <br></br>
                              <h4>Education</h4>
                              <Form.List name="educationContent">
                                {(fields, { add, remove }) => {
                                  return (
                                    <div>
                                      {fields.map((field, index) => (
                                        <Row key={field.key}>
                                          <Col xl={23}>
                                            Education {index + 1}
                                          </Col>
                                          <Col xl={1}>
                                            <MinusCircleOutlined
                                              className="dynamic-delete-button"
                                              onClick={() => {
                                                remove(field.name)
                                              }}
                                            />
                                          </Col>
                                          <Col xl={24} span={24}>
                                            <Form.Item
                                              label="School Name"
                                              name={[field.name, 'collegeName']}
                                              fieldKey={[
                                                field.fieldKey,
                                                'collegeName',
                                              ]}
                                              // rules={rules}
                                            >
                                              <Input placeholder="School Name" />
                                            </Form.Item>
                                          </Col>

                                          <Col xl={12} span={24}>
                                            <Form.Item
                                              label="GPA"
                                              name={[field.name, 'gpa']}
                                              fieldKey={[field.fieldKey, 'gpa']}
                                              // rules={rules}
                                            >
                                              <Input placeholder="GPA" />
                                            </Form.Item>
                                          </Col>
                                          <Col xl={12} span={24}>
                                            <Form.Item
                                              label="Degree"
                                              name={[field.name, 'degree']}
                                              fieldKey={[
                                                field.fieldKey,
                                                'degree',
                                              ]}
                                              // rules={rules}
                                            >
                                              <Input placeholder="Degree" />
                                            </Form.Item>
                                          </Col>
                                          <Col
                                            xl={12}
                                            lg={12}
                                            md={12}
                                            span={24}
                                          >
                                            <Form.Item
                                              label="Start Date"
                                              name={[field.name, 'startDate']}
                                              fieldKey={[
                                                field.fieldKey,
                                                'startDate',
                                              ]}
                                              // rules={rules}
                                            >
                                              <Input placeholder="Start Date" />
                                            </Form.Item>
                                          </Col>

                                          <Col
                                            xl={12}
                                            lg={12}
                                            md={12}
                                            span={24}
                                          >
                                            <Form.Item
                                              label="End Date"
                                              name={[field.name, 'endDate']}
                                              fieldKey={[
                                                field.fieldKey,
                                                'endDate',
                                              ]}
                                              // rules={rules}
                                            >
                                              <Input placeholder="End Date" />
                                            </Form.Item>
                                          </Col>

                                          <Col xl={24} span={24}>
                                            <Form.Item
                                              label="Summary"
                                              name={[field.name, 'summary']}
                                              fieldKey={[
                                                field.fieldKey,
                                                'summary',
                                              ]}
                                              // rules={rules}
                                            >
                                              <TextArea
                                                rows={4}
                                                placeholder="Summary"
                                              />
                                            </Form.Item>
                                          </Col>
                                        </Row>
                                      ))}

                                      <Form.Item>
                                        <Button
                                          type="dashed"
                                          onClick={() => {
                                            add()
                                          }}
                                          style={{ width: '100%' }}
                                        >
                                          <PlusOutlined /> Add Education
                                        </Button>
                                      </Form.Item>
                                    </div>
                                  )
                                }}
                              </Form.List>
                            </Col>

                            <Col xl={24} lg={24} md={24} span={24}>
                              <br></br>
                              <h4>Projects</h4>
                              <Form.List name="projectContent">
                                {(fields, { add, remove }) => {
                                  return (
                                    <div>
                                      {fields.map((field, index) => (
                                        <Row key={field.key}>
                                          <Col xl={23}>Project {index + 1}</Col>
                                          <Col xl={1}>
                                            <MinusCircleOutlined
                                              className="dynamic-delete-button"
                                              onClick={() => {
                                                remove(field.name)
                                              }}
                                            />
                                          </Col>
                                          <Col xl={24} span={24}>
                                            <Form.Item
                                              label="Project Title"
                                              name={[field.name, 'title']}
                                              fieldKey={[
                                                field.fieldKey,
                                                'title',
                                              ]}
                                              // rules={rules}
                                            >
                                              <Input placeholder="Project Title" />
                                            </Form.Item>
                                          </Col>

                                          <Col xl={24} span={24}>
                                            <Form.Item
                                              label="Link"
                                              name={[field.name, 'link']}
                                              fieldKey={[
                                                field.fieldKey,
                                                'link',
                                              ]}
                                              // rules={rules}
                                            >
                                              <Input placeholder="Link" />
                                            </Form.Item>
                                          </Col>

                                          <Col
                                            xl={12}
                                            lg={12}
                                            md={12}
                                            span={24}
                                          >
                                            <Form.Item
                                              label="Start Date"
                                              name={[field.name, 'startDate']}
                                              fieldKey={[
                                                field.fieldKey,
                                                'startDate',
                                              ]}
                                              // rules={rules}
                                            >
                                              <Input placeholder="Start Date" />
                                            </Form.Item>
                                          </Col>

                                          <Col
                                            xl={12}
                                            lg={12}
                                            md={12}
                                            span={24}
                                          >
                                            <Form.Item
                                              label="End Date"
                                              name={[field.name, 'endDate']}
                                              fieldKey={[
                                                field.fieldKey,
                                                'endDate',
                                              ]}
                                              // rules={rules}
                                            >
                                              <Input placeholder="End Date" />
                                            </Form.Item>
                                          </Col>

                                          <Col xl={24} span={24}>
                                            <Form.Item
                                              label="Summary"
                                              name={[field.name, 'summary']}
                                              fieldKey={[
                                                field.fieldKey,
                                                'summary',
                                              ]}
                                              // rules={rules}
                                            >
                                              <TextArea
                                                rows={4}
                                                placeholder="Summary"
                                              />
                                            </Form.Item>
                                          </Col>
                                        </Row>
                                      ))}

                                      <Form.Item>
                                        <Button
                                          type="dashed"
                                          onClick={() => {
                                            add()
                                          }}
                                          style={{ width: '100%' }}
                                        >
                                          <PlusOutlined /> Add New Project
                                        </Button>
                                      </Form.Item>
                                    </div>
                                  )
                                }}
                              </Form.List>
                            </Col>

                            <Col xl={24} lg={24} md={24} span={24}>
                              <br></br>
                              <h4>Skills</h4>
                              <Form.List name="skillsContent">
                                {(fields, { add, remove }) => {
                                  return (
                                    <div>
                                      {fields.map((field, index) => (
                                        <Row key={field.key}>
                                          <Col xl={23}>Skill {index + 1}</Col>
                                          <Col xl={1}>
                                            <MinusCircleOutlined
                                              className="dynamic-delete-button"
                                              onClick={() => {
                                                remove(field.name)
                                              }}
                                            />
                                          </Col>
                                          <Col xl={24} span={24}>
                                            <Form.Item
                                              label="Skill Title"
                                              name={[field.name, 'subHeader']}
                                              fieldKey={[
                                                field.fieldKey,
                                                'title',
                                              ]}
                                              // rules={rules}
                                            >
                                              <Input placeholder="Skill Title" />
                                            </Form.Item>
                                          </Col>

                                          <Col xl={24} span={24}>
                                            <Form.Item
                                              label="Details"
                                              name={[field.name, 'details']}
                                              fieldKey={[
                                                field.fieldKey,
                                                'details',
                                              ]}
                                              // rules={rules}
                                            >
                                              <Input placeholder="Details" />
                                            </Form.Item>
                                          </Col>
                                        </Row>
                                      ))}

                                      <Form.Item>
                                        <Button
                                          type="dashed"
                                          onClick={() => {
                                            add()
                                          }}
                                          style={{ width: '100%' }}
                                        >
                                          <PlusOutlined /> Add New Skill
                                        </Button>
                                      </Form.Item>
                                    </div>
                                  )
                                }}
                              </Form.List>
                            </Col>
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
                    </Box>
                  </Form>
                </>
              ) : (
                <Header>
                  <Title>Resume not found!</Title>

                  <div className="PageHeader viewMode">
                    <Link to="/dashboard">
                      <Button className="isoGoInvoBtn">
                        <span>Back to My Resumes</span>
                      </Button>
                    </Link>
                  </div>
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