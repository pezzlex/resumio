import LayoutContent from '@iso/components/utility/layoutContent'
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper'
import PageHeader from '@iso/components/utility/pageHeader'
import React, { Component, useEffect, useState } from 'react'
import { Link, useRouteMatch, useParams } from 'react-router-dom'
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
import { addResume, clearStatus } from '../redux/resumes/actions'

const AddEditResume = () => {
  const dispatch = useDispatch()
  const { resumeId } = useParams()
  const { Text, Title } = Typography
  const match = useRouteMatch()
  const isAddResume = match.path.endsWith('create-resume')
  const [contactText, setContactText] = useState('Contact')
  const error = useSelector((state) => state.resumeData.error)
  const success = useSelector((state) => state.resumeData.success)
  const [form] = Form.useForm()

  useEffect(() => {
    dispatch(clearStatus())
  }, [success, error])

  const onFinish = (values) => {
    console.log(values)
    dispatch(addResume(values))
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  useEffect(() => {
    // message.error(error)
    if (error) {
      notification['error']({
        message: 'Error',
        description: error,
      })
    }
  }, [error])
  useEffect(() => {
    // message.success(success)
    if (success) {
      notification['success']({
        message: 'Success',
        description: success,
      })
    }
  }, [success])

  return (
    <LayoutContentWrapper>
      <LayoutContent>
        <Header>
          <PageTitle>{isAddResume ? 'Build Resume' : 'Edit Resume'}</PageTitle>
          <InvoicePageWrapper className="InvoicePageWrapper">
            <div className="PageHeader viewMode">
              <Link
                to={
                  isAddResume ? '/dashboard' : `/dashboard/resume/${resumeId}`
                }
              >
                <Button className="isoGoInvoBtn">
                  <span>Cancel</span>
                </Button>
              </Link>
              <Button type="primary">
                <span>Save</span>
              </Button>
            </div>
          </InvoicePageWrapper>
        </Header>

        <Box>
          <InvoicePageWrapper className="editView">
            <Row gutter={24}>
              <Col xl={12} lg={12} md={12} span={24}>
                <Form
                  form={form}
                  layout="vertical"
                  name="register"
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  scrollToFirstError
                >
                  <Title
                    level={4}
                    editable={{ onChange: (str) => setContactText(str) }}
                  >
                    {contactText}
                  </Title>
                  <Row gutter={16}>
                    <Col span={12}>
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
                    <Col span={12}>
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
                  </Row>
                </Form>
              </Col>

              <Col flex="auto">
                <Skeleton active />
              </Col>
            </Row>
          </InvoicePageWrapper>
        </Box>
      </LayoutContent>
    </LayoutContentWrapper>
  )
}

export default AddEditResume
