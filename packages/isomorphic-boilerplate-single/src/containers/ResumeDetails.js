import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import Box from '@iso/components/utility/box'
import { Button } from 'antd'
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper'
import InvoicePageWrapper from '../containers/Invoice/SingleInvoice.styles'
// import Invoice from '../containers/Invoice/Invoice'
import { Title, Filters, Header, HeaderSecondary } from './AppLayout.style'

export default function (props) {
  const { currentInvoice, toggleView, redirectPath } = props
  console.log(props, 'props')
  const { path, url } = useRouteMatch()

  return (
    <LayoutContentWrapper style={{ height: '100vh' }}>
      <Header>
        <Title>My Resumes</Title>
        <Link to={`${url}/create-resume`}>
          <Button type="primary">Build Resume</Button>
        </Link>
      </Header>

      <Box style={{ padding: 20 }}>
        <InvoicePageWrapper className="InvoicePageWrapper">
          <div className="PageHeader viewMode">
            <Link to={redirectPath}>
              <Button className="isoGoInvoBtn">
                <span>Go To Invoices</span>
              </Button>
            </Link>
            <Button color="secondary" onClick={() => toggleView(true)}>
              <span>Edit Invoice</span>
            </Button>
          </div>
          {/* <Invoice currentInvoice={currentInvoice} ref={(invoice) => invoice} /> */}
          <div className="ButtonWrapper">
            <Button type="primary" className="mateInvoPrint">
              <span>Send Invoice</span>
            </Button>
          </div>
        </InvoicePageWrapper>
      </Box>
    </LayoutContentWrapper>
  )
}
