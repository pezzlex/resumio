import { QuestionCircleOutlined } from '@ant-design/icons'
import { Button, Popconfirm } from 'antd'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  DateCell,
  ImageCell,
  LinkCell,
  TextCell,
} from '../../../components/Tables/HelperCells.js'
import { deleteResume } from '../../../redux/resumes/actions'

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
        <Button className="invoiceDltBtn" type="text" danger>
          <i className="ion-android-delete" />
        </Button>
      </Popconfirm>
    </div>
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
