import React, { useEffect, useState } from 'react'
import { Link, useRouteMatch, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Row, Col, notification } from 'antd'
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

const ResumeDetails = () => {
  const dispatch = useDispatch()
  const { resumeId } = useParams()
  const { currentResume, success, error } = useSelector(
    (state) => state.resumeData
  )
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    dispatch(fetchResumeById(resumeId))
  }, [dispatch])

  useEffect(() => {
    if (error || success) {
      dispatch(clearStatus())
      setLoading(false)
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
  // useEffect(() => {
  //   if (success) {
  //     notification['success']({
  //       message: 'Success',
  //       description: success,
  //     })
  //   }
  // }, [success])

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
                  {/* <Skeleton active /> */}
                  <pre className="language-bash">
                    {JSON.stringify(currentResume, null, 2)}
                  </pre>
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
          <Loader />
        )}
      </LayoutContent>
    </LayoutContentWrapper>
  )
}

export default ResumeDetails
