import { Layout } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Sidebar from '../Sidebar/Sidebar'
import Topbar from '../Topbar/Topbar'
import { DashboardContainer, DashboardGlobalStyles } from './Dashboard.styles'
import DashboardRoutes from './DashboardRoutes'
import siteConfig from '../../config/site.config'
import useWindowSize from '../../library/hooks/useWindowSize'
import appActions from '../../redux/app/actions'

const { Content, Footer } = Layout
const { toggleAll } = appActions
const styles = {
  layout: { flexDirection: 'row', overflowX: 'hidden' },
  content: {
    padding: '70px 0 0',
    flexShrink: '0',
    background: '#f1f3f6',
    position: 'relative',
  },
  footer: {
    background: '#ffffff',
    textAlign: 'center',
    borderTop: '1px solid #ededed',
  },
}

export default function Dashboard() {
  const dispatch = useDispatch()
  const appHeight = useSelector((state) => state.App.height)
  const { width, height } = useWindowSize()

  React.useEffect(() => {
    dispatch(toggleAll(width, height))
  }, [width, height, dispatch])
  return (
    <DashboardContainer>
      <DashboardGlobalStyles />
      <Layout style={{ height: height }}>
        <Topbar />
        <Layout style={styles.layout}>
          <Sidebar />
          <Layout
            className="isoContentMainLayout"
            style={{
              height: appHeight,
            }}
          >
            <Content className="isomorphicContent" style={styles.content}>
              <DashboardRoutes />
            </Content>
            <Footer style={styles.footer}>{siteConfig.footerText}</Footer>
          </Layout>
        </Layout>
        {/* <ThemeSwitcher /> */}
      </Layout>
    </DashboardContainer>
  )
}
