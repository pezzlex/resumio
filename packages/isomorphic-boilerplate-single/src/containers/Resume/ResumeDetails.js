import React, { useEffect } from 'react'
import { Link, useRouteMatch, useParams } from 'react-router-dom'
import Box from '@iso/components/utility/box'
import { Button } from 'antd'
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper'
import LayoutContent from '@iso/components/utility/layoutContent'
import InvoicePageWrapper from '../Invoice/SingleInvoice.styles'
import Invoice from '../Invoice/Invoice'
import { Title, Filters, Header, HeaderSecondary } from '../AppLayout.style'
import { connect } from 'react-redux'
import { fetchResumeById } from '../../redux/resumes/actions'

const ResumeDetails = (props) => {
  const { currentInvoice, toggleView, redirectPath } = props
  const { resumeId } = useParams()

  useEffect(() => {
    props.fetchResumeById({ resumeId })
  }, [])
  console.log('currentResume', props.currentResume)

  return (
    <LayoutContentWrapper>
      <LayoutContent>
        <Header>
          <Title>Resume</Title>
          <InvoicePageWrapper className="InvoicePageWrapper">
            <div className="PageHeader viewMode">
              <Link to="/dashboard">
                <Button className="isoGoInvoBtn">
                  <span>Back to My Resumes</span>
                </Button>
              </Link>
              <Button color="secondary" onClick={() => toggleView(true)}>
                <span>Edit Resume</span>
              </Button>
            </div>
          </InvoicePageWrapper>
        </Header>

        <Box style={{ padding: 20 }}>
          <InvoicePageWrapper className="InvoicePageWrapper">
            <Invoice
              currentInvoice={currentInvoice}
              ref={(invoice) => invoice}
            />
          </InvoicePageWrapper>
        </Box>
      </LayoutContent>
    </LayoutContentWrapper>
  )
}

const mapStateToProps = (state) => {
  return {
    currentResume: state.resumeData.currentResume,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchResumeById: ({ resumeId }) => dispatch(fetchResumeById({ resumeId })),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ResumeDetails)
