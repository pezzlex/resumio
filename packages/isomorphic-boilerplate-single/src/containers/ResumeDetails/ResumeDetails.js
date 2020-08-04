import React, { useEffect, useState } from 'react'
import { Link, useRouteMatch, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Row, Col, notification, Skeleton } from 'antd'
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper'
import LayoutContent from '@iso/components/utility/layoutContent'
import Loader from '@iso/components/utility/loader'
import InvoicePageWrapper from '../Invoice/SingleInvoice.styles'
import { Title, Header } from '../AppLayout.style'
import {
  fetchResumeById,
  clearStatus,
  clearCurrentResume,
} from '../../redux/resumes/actions'
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer'
import RenderedPdf from '../RenderedPdf/RenderedPdf'

import { unstructured } from '../AddEditResume'

const ResumeDetails = () => {
  const dispatch = useDispatch()
  const { resumeId } = useParams()
  const { currentResume, success, error } = useSelector(
    (state) => state.resumeData
  )
  const [isLoading, setLoading] = useState(true)
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
                <InvoicePageWrapper className="InvoicePageWrapper">
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
                </InvoicePageWrapper>
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
                    // <Skeleton loading={true} active />
                    <Loader />
                  )}
                </Col>
              </Row>
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
          // <Skeleton loading={true} active />
          <Loader />
        )}
      </LayoutContent>
    </LayoutContentWrapper>
  )
}

export default ResumeDetails
