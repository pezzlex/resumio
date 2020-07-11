import React, { useEffect } from 'react'
import Tabs, { TabPane } from '@iso/components/uielements/tabs'
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper'
import TableDemoStyle from './Demo.styles'
import fakeData from '../data'
import { tableinfo } from './configs'
import SimpleView from './TableViews/SimpleView'
import { fetchResumes } from '../../../redux/resumes/actions'
import { connect } from 'react-redux'

const AntTable = ({ resumes }) => {
  const renderTable = (tableinfo) => {
    return (
      <SimpleView
        columns={tableinfo.columns}
        resumes={resumes.map((d) => ({
          ...d,
          key: d._id,
          // createdDate: new Date(d.createdDate).toDateString(),
        }))}
      />
    )
  }
  return (
    <TableDemoStyle className="isoLayoutContent">
      {renderTable(tableinfo)}
    </TableDemoStyle>
  )
}

export default AntTable
