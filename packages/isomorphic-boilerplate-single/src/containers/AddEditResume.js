import LayoutContent from '@iso/components/utility/layoutContent'
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper'
import PageHeader from '@iso/components/utility/pageHeader'
import React, { Component, useEffect, useState } from 'react'

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
import {
  Title as PageTitle,
  Filters,
  Header,
  HeaderSecondary,
} from './AppLayout.style'
import { Textarea } from '@iso/components/uielements/input'
import DatePicker from '@iso/components/uielements/datePicker'
import { useDispatch, useSelector } from 'react-redux'
import {
  addResume,
  editResume,
  clearStatus,
  fetchResumeById,
  clearCurrentResume,
} from '../redux/resumes/actions'

const AddEditResume = () => {
  const dispatch = useDispatch()
  const { resumeId } = useParams()

  const match = useRouteMatch()
  const isAddResume = match.path.endsWith('create-resume')
  const [fileName, setFileName] = useState('New Resume')

  const error = useSelector((state) => state.resumeData.error)
  const success = useSelector((state) => state.resumeData.success)
  const currentResume = useSelector((state) => state.resumeData.currentResume)
  const [isLoading, setLoading] = useState(false)
  const [redirectToReferrer, setRedirectToReferrer] = useState(false)
  const [isChangeDetected, setChangeDetected] = useState(false)

  const [form] = Form.useForm()

  useEffect(() => {
    // If initially edit, fetch resume => add currentResume
    if (!isAddResume) {
      console.log('hm??')
      dispatch(fetchResumeById(resumeId))
      // If iitially add, clear current resume
    } else {
      console.log('useEffect1')
      dispatch(clearCurrentResume())
      setRedirectToReferrer(false)
    }
  }, [])

  useEffect(() => {
    console.log('here')
    dispatch(clearStatus())
    setLoading(false)
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
      if (isAddResume) setRedirectToReferrer(true)
      if (!isAddResume) setChangeDetected(false)
    }
  }, [success])

  const unstructured = ({
    contact: { firstName, lastName, email, phone },
    fileName,
  }) => ({ fileName, firstName, lastName, phone, email })

  if (redirectToReferrer) {
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
        <Form
          form={form}
          layout="vertical"
          initialValues={
            isAddResume
              ? {
                  remember: true,
                  fileName,
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
            <PageTitle>
              {isAddResume
                ? fileName
                  ? `Build Resume "${fileName}"`
                  : 'Build Resume'
                : `Edit Resume "${currentResume.fileName}"`}
            </PageTitle>
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
      </LayoutContent>
    </LayoutContentWrapper>
  )
}

export default AddEditResume
