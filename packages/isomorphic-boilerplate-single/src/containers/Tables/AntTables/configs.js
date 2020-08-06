import React, { useEffect } from 'react'
import clone from 'clone'
import { Button, notification, Popconfirm } from 'antd'
import { Link, useRouteMatch } from 'react-router-dom'
import CardWrapper from '../../Invoice/Invoice.styles'
import { useSelector, useDispatch } from 'react-redux'
import {
  deleteResume,
  fetchResumes,
  clearStatus,
} from '../../../redux/resumes/actions'
import { QuestionCircleOutlined } from '@ant-design/icons'

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

const ActionButtons = ({ url, resumeId, fileName }) => {
  const dispatch = useDispatch()

  return (
    <CardWrapper>
      <div className="isoInvoiceBtnView">
        <Link to={`${url}/resume/${resumeId}`}>
          <Button color="primary" className="invoiceViewBtn">
            View
          </Button>
        </Link>
        <Popconfirm
          placement="leftBottom"
          title={`Sure you want to delete "${fileName}"?`}
          onConfirm={() => {
            dispatch(deleteResume(resumeId))
          }}
          icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
          okText="Yes, Delete"
          okButtonProps={{ type: 'primary', danger: true }}
          cancelText="Cancel"
        >
          <Button className="invoiceDltBtn">
            <i className="ion-android-delete" />
          </Button>
        </Popconfirm>
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
      return (
        <ActionButtons
          resumeId={object._id}
          fileName={object.fileName}
          url={url}
        />
      )
    },
  },
]

const tableinfo = {
  title: 'Simple Table',
  value: 'simple',
  columns,
}

export { columns, tableinfo }
