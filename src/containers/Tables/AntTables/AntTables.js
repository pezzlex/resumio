import React from 'react'
import { tableinfo } from './configs'
import TableDemoStyle from './Demo.styles'
import SimpleView from './TableViews/SimpleView'

const Table = ({ resumes, url, isTableLoading }) => {
  const RenderTable = ({ columns }) => {
    return (
      <SimpleView
        columns={columns}
        resumes={resumes.map((d) => ({
          ...d,
          key: d._id,
        }))}
        isTableLoading={isTableLoading}
      />
    )
  }
  return (
    <TableDemoStyle className="isoLayoutContent">
      <RenderTable columns={tableinfo.columns({ url })} />
    </TableDemoStyle>
  )
}

export default Table
