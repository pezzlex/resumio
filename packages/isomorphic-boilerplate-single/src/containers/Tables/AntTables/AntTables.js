import React, { useEffect } from 'react'
import Tabs, { TabPane } from '@iso/components/uielements/tabs'
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper'
import TableDemoStyle from './Demo.styles'
import fakeData from '../data'
import { tableinfo } from './configs'
import SimpleView from './TableViews/SimpleView'
import { fetchResumes } from '../../../redux/resumes/actions'
import { connect } from 'react-redux'

const AntTable = ({ resumes, url }) => {
  const RenderTable = ({ columns }) => {
    return (
      <SimpleView
        columns={columns}
        resumes={resumes.map((d) => ({
          ...d,
          key: d._id,
        }))}
      />
    )
  }
  console.log('tableinfo.columns', tableinfo.columns)
  return (
    <TableDemoStyle className="isoLayoutContent">
      <RenderTable columns={tableinfo.columns({ url })} />
    </TableDemoStyle>
  )
}

export default AntTable
