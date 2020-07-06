import React from 'react'
import Tabs, { TabPane } from '@iso/components/uielements/tabs'
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper'
import TableDemoStyle from './Demo.styles'
import fakeData from '../data'
import { tableinfo } from './configs'
import * as TableViews from './TableViews/TableViews'

export default function AntTable() {
  function renderTable(tableinfo) {
    let Component = TableViews.SimpleView
    return (
      <Component
        columns={tableinfo.columns}
        resumes={[{ id: 1, key: 1, firstName: 'Pez' }]}
      />
    )
  }
  return (
    <LayoutContentWrapper>
      <TableDemoStyle className="isoLayoutContent">
        <Tabs className="isoTableDisplayTab">
          <TabPane tab={tableinfo.title} key={tableinfo.value}>
            {renderTable(tableinfo)}
          </TabPane>
        </Tabs>
      </TableDemoStyle>
    </LayoutContentWrapper>
  )
}

export { TableViews, tableinfo }
