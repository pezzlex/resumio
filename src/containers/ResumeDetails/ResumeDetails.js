import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'
import { Button, Col, notification, Row } from 'antd'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import LayoutContent from '../../components/utility/layoutContent'
import LayoutContentWrapper from '../../components/utility/layoutWrapper'
import Loader from '../../components/utility/loader'
import {
  clearCurrentResume,
  clearStatus,
  fetchResumeById,
} from '../../redux/resumes/actions'
import { unstructured } from '../AddEditResume'
import { Header, Title } from '../AppLayout.style'
import RenderedPdf from '../RenderedPdf/RenderedPdf'

const ResumeDetails = () => {
  const dispatch = useDispatch()
  const { resumeId } = useParams()
  const { currentResume, success, error } = useSelector(
    (state) => state.resumeData
  )
  const [isLoading, setLoading] = useState(true)
  const [resumeNotFound, setResumeNotFound] = useState(false)
  // Hackey workaround for React-PDF bug

  const [isPdfReady, setPdfReady] = useState(true)

  useEffect(() => {
    dispatch(fetchResumeById(resumeId))
  }, [])

  useEffect(() => {
    if (error || success) {
      dispatch(clearStatus())
    }
  }, [success, error])

  useEffect(() => {
    if (error) {
      notification['error']({
        message: 'Error',
        description: error,
      })
      dispatch(clearCurrentResume())
      setLoading(false)
    }
  }, [error])
  useEffect(() => {
    if (success) {
      if (currentResume) {
        setLoading(false)
        setPdfReady(false)
        setTimeout(() => {
          setPdfReady(true)
        }, 100)
      }
    }
  }, [success])

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
                  {isPdfReady ? (
                    <>
                      <PDFViewer height="900" width="60%">
                        <RenderedPdf
                          resume={unstructured(currentResume)}
                          // resume={{ fileName: 'dummy' }}
                        />
                      </PDFViewer>
                      <Button type="primary">
                        <PDFDownloadLink
                          document={
                            <RenderedPdf
                              resume={unstructured(currentResume)}
                              // resume={{ fileName: 'dummy' }}
                            />
                          }
                          fileName={`${currentResume.fileName}.pdf`}
                        >
                          {({ blob, url, loading, error }) =>
                            loading ? 'Loading document...' : 'Download'
                          }
                        </PDFDownloadLink>
                      </Button>
                    </>
                  ) : (
                    <Loader />
                  )}
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
