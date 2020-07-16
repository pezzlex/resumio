import React from 'react'
import clone from 'clone'
import { Button } from 'antd'
import { Link, useRouteMatch } from 'react-router-dom'
import CardWrapper from '../../Invoice/Invoice.styles'
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

const ActionButtons = ({ resumeId, userId, deleteResume }) => {
  return (
    <CardWrapper>
      <div className="isoInvoiceBtnView">
        <Link to={`dashboard/resumes/${resumeId}`}>
          <Button color="primary" className="invoiceViewBtn">
            View
          </Button>
        </Link>
        <Button
          className="invoiceDltBtn"
          // icon="delete"
          onClick={() => {
            // notification('error', '1 invoice deleted')
            deleteResume({ resumeId, userId })
            // setSelected([])
          }}
        >
          <i className="ion-android-delete" />
        </Button>
      </div>
    </CardWrapper>
  )
}

const mapStateToProps = (state) => {
  return {
    userId: state.Auth.id,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteResume: ({ resumeId, userId }) => {
      dispatch(deleteResume({ resumeId, userId }))
    },
  }
}

const ActionButtonsHoc = connect(
  mapStateToProps,
  mapDispatchToProps
)(ActionButtons)

const columns = [
  {
    title: 'File Name',
    key: 'fileName',
    width: 500,
    render: (object) => renderCell(object, 'TextCell', 'fileName'),
  },
  {
    title: 'Date Created',
    key: 'createdDate',
    width: 100,
    render: (object) => renderCell(object, 'DateCell', 'createdDate'),
  },
  {
    width: 100,
    render: (object) => {
      return <ActionButtonsHoc resumeId={object._id} />
    },
  },
]

const tableinfo = {
  title: 'Simple Table',
  value: 'simple',
  columns,
}

export { columns, tableinfo }
