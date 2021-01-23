import {
  DownloadOutlined,
  MinusCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons'
import {
  Button,
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  notification,
  Row,
  Typography,
} from 'antd'
import React, { useEffect, useState } from 'react'
import Iframe from 'react-iframe'
import { useDispatch, useSelector } from 'react-redux'
import { Prompt } from 'react-router'
import { Link, Redirect, useParams, useRouteMatch } from 'react-router-dom'
import Box from '../components/utility/box'
import LayoutContent from '../components/utility/layoutContent'
import LayoutContentWrapper from '../components/utility/layoutWrapper'
import Loader from '../components/utility/loader'
import {
  addResume,
  clearCurrentResume,
  clearStatus,
  editResume,
  fetchResumeById,
  fetchResumes,
  renderResume,
} from '../redux/resumes/actions'
import { Header, Title } from './AppLayout.style'

const { TextArea } = Input
const { Text } = Typography

export function restructured({
  fileName,
  firstName,
  lastName,
  phone,
  email,
  linkedIn,
  github,
  workExperience,
  education,
  projects,
  skills,
}) {
  return {
    contact: {
      firstName,
      lastName,
      email,
      phone,
      linkedIn,
      github,
    },
    workExperience: {
      content: workExperience,
    },
    education: {
      content: education,
    },
    projects: {
      content: projects,
    },
    skills: {
      content: skills,
    },
    fileName,
  }
}

const AddEditResume = () => {
  const [isChangeDetected, setChangeDetected] = useState(false)
  const [renderedPdfLink, setRenderedPdfLink] = useState('')

  const dispatch = useDispatch()
  const { resumeId } = useParams()

  const match = useRouteMatch()
  const isAddResume = match.path.endsWith('create-resume')
  const { error, success, currentResume, displayLink } = useSelector(
    (state) => state.resumeData
  )
  const { resumes, count } = useSelector((state) => state.resumeData.resumes)

  const { firstName, lastName, email } = useSelector((state) => state.Auth)
  const defaultFileNamePrefix = 'New Resume'
  /**
   * Generate default filenames like New Resume 1, New Resume 2, etc
   * @param {list of resumes} resumes
   */
  function defaultFileName(resumes) {
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
  const [isUpdating, setUpdating] = useState(false)
  const [isSpinning, setSpinning] = useState(false)
  const [liveCurrentResume, setLiveCurrentResume] = useState(
    currentResume
      ? reverseRestructured(currentResume)
      : {
          fileName,
          firstName,
          lastName,
          email,
        }
  )

  const [form] = Form.useForm()

  useEffect(() => {
    if (!isUpdating) {
      setSpinning(false)
      setUpdating(false)
    }
  }, [isUpdating])

  useEffect(() => {
    // If initially edit, fetch resume => add currentResume
    if (!isAddResume) {
      dispatch(fetchResumeById(resumeId))
    } else {
      dispatch(clearCurrentResume())

      setRedirectToReferrer(false)
      setRenderedPdfLink(
        `https://latexonline.cc/compile?url=${process.env.REACT_APP_baseUrl}/resumes/display-default-latex-resume/${firstName}/${lastName}/${email}`
      )
      console.log(
        'default link: ',
        `https://latexonline.cc/compile?url=${process.env.REACT_APP_baseUrl}/resumes/display-default-latex-resume/${firstName}/${lastName}/${email}`
      )
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
    console.log(values)

    if (isAddResume) {
      dispatch(addResume(restructured(values)))
    } else {
      dispatch(editResume(resumeId, restructured(values)))
      dispatch(
        renderResume(resumeId, {
          template: values.template,
          resumeDetails: restructured(values),
        })
      )
    }

    setLoading(true)
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
      setChangeDetected(true)
    }
  }, [error])

  useEffect(() => {
    if (success) {
      dispatch(fetchResumes)
      setChangeDetected(false)
      // ADD
      if (isAddResume) {
        setRedirectToReferrer(true)
        // EDIT
      } else {
        dispatch(
          renderResume(resumeId, {
            template: currentResume.template,
            resumeDetails: restructured(liveCurrentResume),
          })
        )
      }
    }
  }, [success])

  useEffect(() => {
    if (displayLink) {
      setRenderedPdfLink(`https://latexonline.cc/compile?url=${displayLink}`)
    }
  }, [displayLink])

  if (redirectToReferrer && currentResume) {
    let from = {
      pathname: `/dashboard/edit-resume/${currentResume._id}`,
    }

    return <Redirect to={from} />
  }

  function reverseRestructured({
    contact: { firstName, lastName, email, phone, github, linkedIn },
    workExperience: { content: workExperience },
    education: { content: education },
    projects: { content: projects },
    skills: { content: skills },
    fileName,
  }) {
    return {
      fileName,
      firstName,
      lastName,
      phone,
      email,
      github,
      linkedIn,
      workExperience,
      education,
      projects,
      skills,
    }
  }

  return (
    <>
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
                  initialValues={
                    currentResume
                      ? reverseRestructured(currentResume)
                      : { firstName, lastName, email, fileName }
                  }
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  scrollToFirstError
                  onValuesChange={(_, formValues) => {
                    setChangeDetected(true)
                    setLiveCurrentResume(formValues)
                  }}
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
                              onClick={() =>
                                dispatch(
                                  renderResume(resumeId, {
                                    template: currentResume.template,
                                    resumeDetails: restructured(
                                      liveCurrentResume
                                    ),
                                  })
                                )
                              }
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
                        <Divider>Contact Information</Divider>
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
                              rules={[
                                {
                                  type: 'email',
                                },
                              ]}
                            >
                              <Input placeholder="Email" />
                            </Form.Item>
                          </Col>
                          <Col xl={12} lg={12} md={12} span={24}>
                            <Form.Item label="Contact Number" name="phone">
                              <Input placeholder="Contact Number" />
                            </Form.Item>
                          </Col>
                          <Col xl={12} lg={12} md={12} span={24}>
                            <Form.Item label="LinkedIn" name="linkedIn">
                              <Input placeholder="LinkedIn" />
                            </Form.Item>
                          </Col>
                          <Col xl={12} lg={12} md={12} span={24}>
                            <Form.Item label="Github (Optional)" name="github">
                              <Input placeholder="Github" />
                            </Form.Item>
                          </Col>

                          <Col xl={24} lg={24} md={24} span={24}>
                            <Divider>Professional Experience</Divider>
                            <Form.List name="workExperience">
                              {(fields, { add, remove }) => {
                                return (
                                  <div>
                                    {fields.map((field, index) => (
                                      <Row key={field.key} gutter={16}>
                                        <Col xl={23}>Company {index + 1}</Col>
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
                                          >
                                            <Input placeholder="Company Name" />
                                          </Form.Item>
                                        </Col>
                                        <Col xl={12} lg={12} md={12} span={24}>
                                          <Form.Item
                                            label="City"
                                            name={[field.name, 'city']}
                                            fieldKey={[field.fieldKey, 'city']}
                                          >
                                            <Input placeholder="City" />
                                          </Form.Item>
                                        </Col>

                                        <Col xl={12} lg={12} md={12} span={24}>
                                          <Form.Item
                                            label="State/Country"
                                            name={[field.name, 'state']}
                                            fieldKey={[field.fieldKey, 'state']}
                                          >
                                            <Input placeholder="State/Country" />
                                          </Form.Item>
                                        </Col>
                                        <Col xl={12} lg={12} md={12} span={24}>
                                          <Form.Item
                                            label="Start Date"
                                            name={[field.name, 'startDate']}
                                            fieldKey={[
                                              field.fieldKey,
                                              'startDate',
                                            ]}
                                          >
                                            <Input placeholder="MM/YYYY" />
                                          </Form.Item>
                                        </Col>

                                        <Col xl={12} lg={12} md={12} span={24}>
                                          <Form.Item
                                            label="End Date"
                                            name={[field.name, 'endDate']}
                                            fieldKey={[
                                              field.fieldKey,
                                              'endDate',
                                            ]}
                                          >
                                            <Input placeholder="MM/YYYY" />
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
                                          >
                                            <TextArea
                                              rows={4}
                                              placeholder="Description"
                                            />
                                          </Form.Item>
                                        </Col>
                                        <Divider />
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
                                        <PlusOutlined /> Add Professional
                                        Experience
                                      </Button>
                                    </Form.Item>
                                  </div>
                                )
                              }}
                            </Form.List>
                          </Col>

                          <Col xl={24} lg={24} md={24} span={24}>
                            <Divider>Education</Divider>
                            <Form.List name="education">
                              {(fields, { add, remove }) => {
                                return (
                                  <div>
                                    {fields.map((field, index) => (
                                      <Row key={field.key} gutter={16}>
                                        <Col xl={23}>College {index + 1}</Col>
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
                                            label="College Name"
                                            name={[field.name, 'collegeName']}
                                            fieldKey={[
                                              field.fieldKey,
                                              'collegeName',
                                            ]}
                                          >
                                            <Input placeholder="College Name" />
                                          </Form.Item>
                                        </Col>

                                        <Col xl={12} span={24}>
                                          <Form.Item
                                            label="GPA"
                                            name={[field.name, 'gpa']}
                                            fieldKey={[field.fieldKey, 'gpa']}
                                          >
                                            <InputNumber
                                              placeholder="GPA"
                                              step={0.1}
                                            />
                                          </Form.Item>
                                        </Col>
                                        <Col xl={12} span={24}>
                                          <Form.Item
                                            label="GPA Scale"
                                            name={[field.name, 'gpaScale']}
                                            fieldKey={[
                                              field.fieldKey,
                                              'gpaScale',
                                            ]}
                                          >
                                            <InputNumber
                                              placeholder="GPA Scale"
                                              step={0.1}
                                            />
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
                                          >
                                            <Input placeholder="Degree" />
                                          </Form.Item>
                                        </Col>

                                        <Col xl={12} lg={12} md={12} span={24}>
                                          <Form.Item
                                            label="City"
                                            name={[field.name, 'city']}
                                            fieldKey={[field.fieldKey, 'city']}
                                          >
                                            <Input placeholder="City" />
                                          </Form.Item>
                                        </Col>

                                        <Col xl={12} lg={12} md={12} span={24}>
                                          <Form.Item
                                            label="State/Country"
                                            name={[field.name, 'state']}
                                            fieldKey={[field.fieldKey, 'state']}
                                          >
                                            <Input placeholder="State/Country" />
                                          </Form.Item>
                                        </Col>

                                        <Col xl={12} lg={12} md={12} span={24}>
                                          <Form.Item
                                            label="Start Date"
                                            name={[field.name, 'startDate']}
                                            fieldKey={[
                                              field.fieldKey,
                                              'startDate',
                                            ]}
                                          >
                                            <Input placeholder="MM/YYYY" />
                                          </Form.Item>
                                        </Col>

                                        <Col xl={12} lg={12} md={12} span={24}>
                                          <Form.Item
                                            label="End Date"
                                            name={[field.name, 'endDate']}
                                            fieldKey={[
                                              field.fieldKey,
                                              'endDate',
                                            ]}
                                          >
                                            <Input placeholder="MM/YYYY" />
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
                                          >
                                            <Input placeholder="Summary" />
                                          </Form.Item>
                                        </Col>
                                        <Divider />
                                      </Row>
                                    ))}

                                    <Form.Item>
                                      <Button
                                        type="dashed"
                                        onClick={add}
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
                            <Divider>Projects</Divider>
                            <Form.List name="projects">
                              {(fields, { add, remove }) => (
                                <>
                                  {fields.map((field, index) => (
                                    <Row key={field.key} gutter={16}>
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
                                          fieldKey={[field.fieldKey, 'title']}
                                        >
                                          <Input placeholder="Project Title" />
                                        </Form.Item>
                                      </Col>

                                      <Col xl={24} span={24}>
                                        <Form.Item
                                          label="Link"
                                          name={[field.name, 'link']}
                                          fieldKey={[field.fieldKey, 'link']}
                                        >
                                          <Input placeholder="Link" />
                                        </Form.Item>
                                      </Col>

                                      <Col xl={12} lg={12} md={12} span={24}>
                                        <Form.Item
                                          label="Start Date"
                                          name={[field.name, 'startDate']}
                                          fieldKey={[
                                            field.fieldKey,
                                            'startDate',
                                          ]}
                                        >
                                          <Input placeholder="MM/YYYY" />
                                        </Form.Item>
                                      </Col>

                                      <Col xl={12} lg={12} md={12} span={24}>
                                        <Form.Item
                                          label="End Date"
                                          name={[field.name, 'endDate']}
                                          fieldKey={[field.fieldKey, 'endDate']}
                                        >
                                          <Input placeholder="MM/YYYY" />
                                        </Form.Item>
                                      </Col>

                                      <Col xl={24} span={24}>
                                        <Form.Item
                                          label="Summary"
                                          name={[field.name, 'summary']}
                                          fieldKey={[field.fieldKey, 'summary']}
                                        >
                                          <Input placeholder="Summary" />
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
                                        >
                                          <TextArea
                                            rows={4}
                                            placeholder="Description"
                                          />
                                        </Form.Item>
                                        <Divider />
                                      </Col>
                                    </Row>
                                  ))}

                                  <Form.Item>
                                    <Button
                                      type="dashed"
                                      onClick={() => add()}
                                      style={{ width: '100%' }}
                                    >
                                      <PlusOutlined /> Add Project
                                    </Button>
                                  </Form.Item>
                                </>
                              )}
                            </Form.List>
                          </Col>

                          <Col xl={24} lg={24} md={24} span={24}>
                            <Divider>Skills</Divider>
                            <Form.List name="skills">
                              {(fields, { add, remove }) => (
                                <>
                                  {fields.map((field, index) => (
                                    <Row key={field.key} gutter={16}>
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
                                          label="Skill Name"
                                          name={[field.name, 'subHeader']}
                                          fieldKey={[
                                            field.fieldKey,
                                            'subHeader',
                                          ]}
                                        >
                                          <Input placeholder="Skill Name" />
                                        </Form.Item>
                                      </Col>

                                      <Col xl={24} span={24}>
                                        <Form.Item
                                          label="Details"
                                          name={[field.name, 'details']}
                                          fieldKey={[field.fieldKey, 'details']}
                                        >
                                          <Input placeholder="Details" />
                                        </Form.Item>
                                      </Col>
                                      <Divider />
                                    </Row>
                                  ))}

                                  <Form.Item>
                                    <Button
                                      type="dashed"
                                      onClick={() => add()}
                                      style={{ width: '100%' }}
                                    >
                                      <PlusOutlined /> Add Skill
                                    </Button>
                                  </Form.Item>
                                </>
                              )}
                            </Form.List>
                          </Col>
                        </Row>
                      </Col>

                      <Col flex="auto" className="iframeFull">
                        {
                          <>
                            <Iframe
                              width="100%"
                              height="1000px"
                              position="relative"
                              url={renderedPdfLink}
                            />
                            <Button
                              disabled={!currentResume}
                              type="secondary"
                              onClick={() => {
                                console.log(
                                  'restructured(liveCurrentResume)',
                                  restructured(liveCurrentResume),
                                  'liveCurrentResume',
                                  liveCurrentResume
                                )
                                dispatch(
                                  renderResume(resumeId, {
                                    template: currentResume.template,
                                    resumeDetails: restructured(
                                      liveCurrentResume
                                    ),
                                  })
                                )
                              }}
                            >
                              Preview
                            </Button>

                            <Button
                              icon={<DownloadOutlined />}
                              type="primary"
                              disabled={!currentResume}
                              onClick={() =>
                                dispatch(
                                  renderResume(resumeId, {
                                    template: currentResume.template,
                                    resumeDetails: restructured(
                                      liveCurrentResume
                                    ),
                                  })
                                )
                              }
                            >
                              Download
                            </Button>
                            {!currentResume && (
                              <Row>
                                <Text>
                                  Preview and Download available after saving
                                  resume
                                </Text>
                              </Row>
                            )}
                          </>
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
    </>
  )
}

export default AddEditResume
