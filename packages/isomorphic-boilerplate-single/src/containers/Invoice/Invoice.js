import React from 'react'
import moment from 'moment'
import InvoiceAddress from '@iso/components/Invoice/Address'
import { ViewTable } from '@iso/components/Invoice/InvoiceTable'

const Invoice = React.forwardRef(({ currentInvoice }, ref) => {
  return (
    <div className="PageContent" style={{ padding: '20' }} ref={ref}>
      <div className="OrderInfo">
        <div className="LeftSideContent">
          <h3 className="Title">Invoice Info</h3>
          <span className="InvoiceNumber">
            {/* {currentInvoice.number} */}
            Some number 123456-1234
          </span>
        </div>
        <div className="RightSideContent">
          <p>
            <span className="orderStatusSpan">Order Status: </span>
            <span className="orderStatus">
              {/* {currentInvoice.orderStatus} */}
              Approved, Pending...
            </span>
          </p>
          <p>
            <span className="orderDateSpan">Order date: </span>
            <span className="orderDate">
              {moment(
                new Date()
                // currentInvoice.orderDate
              ).format('MMMM Do YYYY')}
            </span>
          </p>
        </div>
      </div>
      <div className="BillingInformation">
        <div className="LeftSideContent">
          <h3 className="Title">Bill From</h3>

          <InvoiceAddress
            companyName={
              // currentInvoice.billFrom
              'Providence, RI'
            }
            companyAddress={
              // currentInvoice.billFromAddress
              'San Francisco, CA'
            }
          />
        </div>
        <div className="RightSideContent">
          <h3 className="Title">Bill To</h3>

          <InvoiceAddress
            companyName={
              // currentInvoice.billFrom
              'Providence, RI'
            }
            companyAddress={
              // currentInvoice.billFromAddress
              'San Francisco, CA'
            }
          />
        </div>
      </div>
      <div className="InvoiceTable">
        <ViewTable
          invoiceList={
            // currentInvoice.invoiceList
            [
              {
                costs: 500,
                itemName: 'Unicorn Tears',
                key: 1,
                price: 7000,
                qty: 14,
              },
              {
                costs: 100,
                itemName: 'Unicorn Tears',
                key: 2,
                price: 7000,
                qty: 14,
              },
              {
                costs: 500,
                itemName: 'Something',
                key: 3,
                price: 7000,
                qty: 14,
              },
            ]
          }
        />
        <div className="TotalBill">
          <p>
            Sub-total :{' '}
            <span>
              {
                // `${currentInvoice.currency}${currentInvoice.subTotal}`
                '$1000'
              }
            </span>
          </p>
          <p>
            Vat :{' '}
            <span>
              {
                // `${currentInvoice.currency}${currentInvoice.subTotal}`
                '$1000'
              }
            </span>
          </p>
          <h3>
            Grand Total :{' '}
            <span>
              {
                // `${currentInvoice.currency}${currentInvoice.subTotal}`
                '$1000'
              }
            </span>
          </h3>
        </div>
      </div>
    </div>
  )
})
export default Invoice
