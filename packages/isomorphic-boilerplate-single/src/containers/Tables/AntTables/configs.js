import React from 'react'
import clone from 'clone'
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
    title: 'First Name',
    key: 'firstName',
    width: 100,
    render: (object) => renderCell(object, 'TextCell', 'firstName'),
  },
  {
    title: 'Last Name',
    key: 'lastName',
    width: 100,
    render: (object) => renderCell(object, 'TextCell', 'lastName'),
  },
  {
    title: 'Email',
    key: 'email',
    width: 200,
    render: (object) => renderCell(object, 'LinkCell', 'email'),
  },
  {
    title: 'Date Created',
    key: 'createdDate',
    width: 200,
    render: (object) => renderCell(object, 'DateCell', 'createdDate'),
  },
]
const smallColumns = [columns[1], columns[2], columns[3], columns[4]]

const tableinfo = {
  title: 'Simple Table',
  value: 'simple',
  columns: clone(smallColumns),
}

export { columns, tableinfo }
