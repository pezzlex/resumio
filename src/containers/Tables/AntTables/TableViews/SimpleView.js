import React from 'react'
import TableWrapper from '../AntTables.styles'

export default function ({ resumes, columns, isTableLoading }) {
  return (
    <TableWrapper
      pagination={false}
      columns={columns}
      dataSource={resumes}
      loading={isTableLoading}
      className="isoSimpleTable"
    />
  )
}
