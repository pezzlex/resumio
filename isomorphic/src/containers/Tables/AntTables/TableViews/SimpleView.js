import React from 'react'
import TableWrapper from '../AntTables.styles'

export default function ({ resumes, columns }) {
  console.log(resumes, columns)
  return (
    <TableWrapper
      pagination={false}
      columns={columns}
      dataSource={resumes}
      className="isoSimpleTable"
    />
  )
}