import React from 'react'
import clone from 'clone'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import CardWrapper from '../../Invoice/Invoice.styles'

import {
  DateCell,
  ImageCell,
  LinkCell,
  TextCell,
} from '@iso/components/Tables/HelperCells'

const renderCell = (object, type, key) => {
  const value = object[key]
  switch (type) {
    case 'ImageCell':
      return ImageCell(value)
    case 'DateCell':
      return DateCell(value)
    case 'LinkCell':
      return LinkCell(value)
    default:
      return TextCell(value)
  }
}
const columns = [
  {
    title: 'Image',
    key: 'avatar',
    width: '1%',
    className: 'isoImageCell',
    render: (object) => renderCell(object, 'ImageCell', 'avatar'),
  },
  {
    title: 'File Name',
    key: 'fileName',
    width: 500,
    render: (object) => renderCell(object, 'TextCell', 'fileName'),
  },
  // {
  //   title: 'Last Name',
  //   key: 'lastName',
  //   width: 100,
  //   render: (object) => renderCell(object, 'TextCell', 'lastName'),
  // },
  {
    title: 'Date Created',
    key: 'createdDate',
    width: 100,
    render: (object) => renderCell(object, 'DateCell', 'createdDate'),
  },
  {
    width: 100,
    render: () => (
      <CardWrapper>
        <div className="isoInvoiceBtnView">
          <Link>
            <Button color="primary" className="invoiceViewBtn">
              View
            </Button>
          </Link>
          <Button
            className="invoiceDltBtn"
            // icon="delete"
            onClick={() => {
              // notification('error', '1 invoice deleted')
              // dispatch(deleteInvoice([invoice.key]))
              // setSelected([])
            }}
          >
            <i className="ion-android-delete" />
          </Button>
        </div>
      </CardWrapper>
    ),
  },
]
const smallColumns = columns.filter((d) => d.key !== 'avatar')

const tableinfo = {
  title: 'Simple Table',
  value: 'simple',
  columns: clone(smallColumns),
}

export { columns, tableinfo }
