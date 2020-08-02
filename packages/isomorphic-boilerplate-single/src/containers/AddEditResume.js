import LayoutContent from '@iso/components/utility/layoutContent'
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper'
import PageHeader from '@iso/components/utility/pageHeader'
import React, { Component, useEffect, useState } from 'react'
import Loader from '@iso/components/utility/loader'

import {
  Link,
  Redirect,
  useRouteMatch,
  useParams,
  useLocation,
} from 'react-router-dom'
import Box from '@iso/components/utility/box'
import {
  Button,
  Typography,
  Form,
  Input,
  Row,
  Col,
  Skeleton,
  notification,
} from 'antd'
import InvoicePageWrapper from './Invoice/SingleInvoice.styles'
import { Title, Filters, Header, HeaderSecondary } from './AppLayout.style'
import { Textarea } from '@iso/components/uielements/input'
import DatePicker from '@iso/components/uielements/datePicker'
import { useDispatch, useSelector } from 'react-redux'
import {
  addResume,
  editResume,
  clearStatus,
  fetchResumes,
  fetchResumeById,
  clearCurrentResume,
} from '../redux/resumes/actions'

const AddEditResume = () => {
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
    console.log(resumes.map((res) => res.fileName))
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
  const [isPageLoading, setPageLoading] = useState(!isAddResume)
  const [redirectToReferrer, setRedirectToReferrer] = useState(false)
  const [isChangeDetected, setChangeDetected] = useState(false)

  const [form] = Form.useForm()

  useEffect(() => {
    // If initially edit, fetch resume => add currentResume
    if (!isAddResume) {
      dispatch(fetchResumeById(resumeId))
      // If iitially add, clear current resume
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

    console.log(structured(values))

    if (isAddResume) {
      dispatch(addResume(structured(values)))
    } else {
      console.log('dispatching editResume')
      dispatch(editResume(resumeId, structured(values)))
    }
    setLoading(true)
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  useEffect(() => {
    if (error) {
      console.log('error detected')
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
      if (!isAddResume) setChangeDetected(false)
    }
  }, [success])

  const unstructured = ({
    contact: { firstName, lastName, email, phone },
    fileName,
  }) => ({ fileName, firstName, lastName, phone, email })

  if (redirectToReferrer && currentResume) {
    console.log('redirecting...')
    let from = {
      pathname: `/dashboard/edit-resume/${currentResume._id}`,
    }
    console.log('from', from)
    return <Redirect to={from} />
  }

  return (
    <LayoutContentWrapper>
      <LayoutContent>
        {!isPageLoading ? (
          isAddResume || currentResume ? (
            <Form
              form={form}
              layout="vertical"
              initialValues={
                isAddResume
                  ? {
                      remember: true,
                      fileName,
                      firstName,
                      lastName,
                      email,
                    }
                  : {
                      ...unstructured(currentResume),
                    }
              }
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              onValuesChange={() => setChangeDetected(true)}
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
                      </Row>
                    </Col>

                    <Col flex="auto">
                      {/* <Skeleton active /> */}
                      <pre className="language-bash">
                        {JSON.stringify(currentResume, null, 2)}
                      </pre>
                    </Col>
                  </Row>
                </InvoicePageWrapper>
              </Box>
            </Form>
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
  )
}

export default AddEditResume
