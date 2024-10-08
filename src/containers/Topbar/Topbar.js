import appActions from '../../redux/app/actions'
import { Layout } from 'antd'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import TopbarWrapper from './Topbar.styles'
import TopbarUser from './TopbarUser'

const { Header } = Layout
const { toggleCollapsed } = appActions

export default function Topbar() {
  const [, setSelectedItem] = React.useState('')
  // const customizedTheme = useSelector(
  //   (state) => state.ThemeSwitcher.topbarTheme
  // )
  const { collapsed, openDrawer } = useSelector((state) => state.App)
  const dispatch = useDispatch()
  const handleToggle = React.useCallback(() => dispatch(toggleCollapsed()), [
    dispatch,
  ])
  const isCollapsed = collapsed && !openDrawer
  const styling = {
    position: 'fixed',
    width: '100%',
    height: 70,
  }
  return (
    <TopbarWrapper>
      <Header
        style={styling}
        className={
          isCollapsed ? 'isomorphicTopbar collapsed' : 'isomorphicTopbar'
        }
      >
        <div className="isoLeft">
          <button
            className={
              isCollapsed ? 'triggerBtn menuCollapsed' : 'triggerBtn menuOpen'
            }
            style={{ color: '#323332' }}
            onClick={handleToggle}
          />
        </div>

        <ul className="isoRight">
          <li onClick={() => setSelectedItem('user')} className="isoUser">
            <TopbarUser />
          </li>
        </ul>
      </Header>
    </TopbarWrapper>
  )
}
