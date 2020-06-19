import React from "react"
import clone from "clone"
import { Row, Col } from "antd"
import LayoutWrapper from "@iso/components/utility/layoutWrapper"
import basicStyle from "@iso/assets/styles/constants"
import IsoWidgetsWrapper from "./WidgetsWrapper"
import IsoWidgetBox from "./WidgetBox"
import ReportsWidget from "./Report/ReportWidget"
import { TableViews, tableinfos, dataList } from "../Tables/AntTables/AntTables"
import IntlMessages from "@iso/components/utility/intlMessages"

const tableDataList = clone(dataList)
tableDataList.size = 5
const styles = {
  wisgetPageStyle: {
    display: "flex",
    flexFlow: "row wrap",
    alignItems: "flex-start",
    overflow: "hidden",
  },
}

export default function () {
  const { rowStyle, colStyle } = basicStyle

  return (
    <LayoutWrapper>
      <div style={styles.wisgetPageStyle}>
        <Row style={rowStyle} gutter={0} justify="start">
          {/* Table */}
          <Col lg={16} md={12} sm={24} xs={24} style={colStyle}>
            <IsoWidgetsWrapper>
              <IsoWidgetBox>
                {/* TABLE */}
                <TableViews.SimpleView
                  tableInfo={tableinfos[0]}
                  dataList={tableDataList}
                />
              </IsoWidgetBox>
            </IsoWidgetsWrapper>
          </Col>
          {/* Some Stats */}
          <Col lg={8} md={12} sm={24} xs={24} style={colStyle}>
            <IsoWidgetsWrapper>
              <ReportsWidget
                label={<IntlMessages id="widget.reportswidget.label" />}
                details={<IntlMessages id="widget.reportswidget.details" />}
              >
                {/* {SIGNLE_PROGRESS_WIDGET.map((widget, idx) => (
                  <SingleProgressWidget
                    key={idx}
                    label={<IntlMessages id={widget.label} />}
                    percent={widget.percent}
                    barHeight={widget.barHeight}
                    status={widget.status}
                    info={widget.info} // Boolean: true, false
                  />
                ))} */}
              </ReportsWidget>
            </IsoWidgetsWrapper>
          </Col>
        </Row>
      </div>
    </LayoutWrapper>
  )
}
