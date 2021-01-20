import { Button, Col, notification, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import Iframe from 'react-iframe'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import LayoutContent from '../../components/utility/layoutContent'
import LayoutContentWrapper from '../../components/utility/layoutWrapper'
import Loader from '../../components/utility/loader'
import {
  clearCurrentResume,
  clearStatus,
  fetchResumeById,
  renderResume,
} from '../../redux/resumes/actions'
import { Header, Title } from '../AppLayout.style'

const ResumeDetails = () => {
  const dispatch = useDispatch()
  const { resumeId } = useParams()
  const { currentResume, success, error } = useSelector(
    (state) => state.resumeData
  )
  const [isLoading, setLoading] = useState(true)
  const [resumeNotFound, setResumeNotFound] = useState(false)

  useEffect(() => {
    dispatch(fetchResumeById(resumeId))
  }, [])

  useEffect(() => {
    if (error || success) {
      dispatch(clearStatus())
      setLoading(false)
    }
  }, [success, error])

  useEffect(() => {
    if (success && currentResume) {
      dispatch(
        renderResume(resumeId, {
          template: currentResume.template,
          resumeDetails: currentResume,
        })
      )
    }
  }, [success])

  useEffect(() => {
    if (error) {
      notification['error']({
        message: 'Error',
        description: error,
      })
      dispatch(clearCurrentResume())
    }
  }, [error])

  return (
    <LayoutContentWrapper>
      <LayoutContent>
        {!isLoading ? (
          currentResume ? (
            <>
              <Header>
                <Title>{`Resume "${currentResume.fileName}"`}</Title>

                <div className="PageHeader viewMode">
                  <Link to="/dashboard">
                    <Button className="isoGoInvoBtn">
                      <span>Back to My Resumes</span>
                    </Button>
                  </Link>
                  <Link to={`/dashboard/edit-resume/${resumeId}`}>
                    <Button color="secondary">
                      <span>Edit Resume</span>
                    </Button>
                  </Link>
                </div>
              </Header>

              <Row>
                <Col flex="auto">
                  <Iframe
                    width="100%"
                    height="1000px"
                    position="relative"
                    url={`https://latexonline.cc/compile?url=${process.env.REACT_APP_baseUrl}/resumes/display-latex-resume/${resumeId}/eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJyZXN1bWVJZCI6IjVmZmZhNDY4ZGZlZTFmYmI0MjIyYzlhOCJ9.II9YJks-j8oSNFMXzW3Vb6eJV967f6VyG9ZbKHKNiko`}
                  />

                  <Button type="primary">Download</Button>
                </Col>
              </Row>
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
  )
}

export default ResumeDetails
