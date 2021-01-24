import { Button, Col, notification, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import Iframe from 'react-iframe'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import LayoutContent from '../../components/utility/layoutContent'
import LayoutContentWrapper from '../../components/utility/layoutWrapper'
import Loader from '../../components/utility/loader'
import axios from 'axios'
import fileDownload from 'js-file-download'

import {
  clearCurrentResume,
  clearStatus,
  fetchResumeById,
  renderResume,
} from '../../redux/resumes/actions'
import { Header, Title } from '../AppLayout.style'
import { restructured } from '../AddEditResume'

const ResumeDetails = () => {
  const dispatch = useDispatch()
  const { resumeId } = useParams()
  const { currentResume, displayLink, success, error } = useSelector(
    (state) => state.resumeData
  )
  const [isLoading, setLoading] = useState(true)
  // const [resumeNotFound, setResumeNotFound] = useState(false)
  // const [displayLink, setDisplayLink] = useState('')
  const [renderedPdfLink, setRenderedPdfLink] = useState('')

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
    if (displayLink) {
      setRenderedPdfLink(`https://latexonline.cc/compile?url=${displayLink}`)
    }
  }, [displayLink])

  useEffect(() => {
    if (error) {
      notification['error']({
        message: 'Error',
        description: error,
      })
      dispatch(clearCurrentResume())
    }
  }, [error])

  function handleDownload(url, downloadFileName) {
    // testing
    axios
      .get(url, {
        responseType: 'blob',
      })
      .then((res) => {
        res.header('Access-Control-Allow-Origin', '*')
        fileDownload(res.data, downloadFileName)
      })
  }

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
                <Col xl={12} lg={12} md={12} span={24}>
                  <Iframe
                    width="100%"
                    height="1000px"
                    position="relative"
                    url={renderedPdfLink}
                  />
                  <Header>
                    <Button
                      type="primary"
                      onClick={() =>
                        handleDownload(
                          renderedPdfLink,
                          `${currentResume.fileName}.pdf`
                        )
                      }
                    >
                      Download
                    </Button>
                  </Header>
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
