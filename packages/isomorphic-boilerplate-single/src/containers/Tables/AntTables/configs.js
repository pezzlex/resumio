import React from 'react'
import clone from 'clone'
import { Button } from 'antd'
import { Link, useRouteMatch } from 'react-router-dom'
import CardWrapper from '../../Invoice/Invoice.styles'
import { useSelector, useDispatch } from 'react-redux'
import { deleteResume } from '../../../redux/resumes/actions'

import {
  DateCell,
  ImageCell,
  LinkCell,
  TextCell,
} from '@iso/components/Tables/HelperCells'
import { connect } from 'react-redux'

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

const ActionButtons = ({ url, resumeId }) => {
  const dispatch = useDispatch()
  return (
    <CardWrapper>
      <div className="isoInvoiceBtnView">
        <Link to={`${url}/resume/${resumeId}`}>
          <Button color="primary" className="invoiceViewBtn">
            View
          </Button>
        </Link>
        <Button
          className="invoiceDltBtn"
          // icon="delete"
          onClick={() => {
            // notification('error', '1 invoice deleted')
            dispatch(deleteResume(resumeId))
            // setSelected([])
          }}
        >
          <i className="ion-android-delete" />
        </Button>
      </div>
    </CardWrapper>
  )
}

const columns = ({ url }) => [
  {
    title: 'File Name',
    key: 'fileName',
    width: 500,
    render: (object) => renderCell(object, 'TextCell', 'fileName'),
  },
  {
    title: 'Date Created',
    key: 'createdAt',
    width: 100,
    render: (object) => renderCell(object, 'DateCell', 'createdAt'),
  },
  {
    width: 100,
    render: (object) => {
      return <ActionButtons resumeId={object._id} url={url} />
    },
  },
]

const tableinfo = {
  title: 'Simple Table',
  value: 'simple',
  columns,
}

export { columns, tableinfo }
