import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, connect } from 'react-redux'
import Popover from '@iso/components/uielements/popover'
import userpic from '@iso/assets/images/pezzlex-profile.png'
import { logoutUser } from '@iso/redux/auth/actions'
import TopbarDropdownWrapper from './TopbarDropdown.styles'

const TopbarUser = () => {
  const [visible, setVisibility] = React.useState(false)
  const dispatch = useDispatch()
  function handleVisibleChange() {
    setVisibility((visible) => !visible)
  }

  const content = (
    <TopbarDropdownWrapper className="isoUserDropdown">
      <Link className="isoDropdownLink" to={'/dashboard/my-profile'}>
        My Profile
      </Link>
      <a className="isoDropdownLink" onClick={() => dispatch(logoutUser())}>
        Logout
      </a>
    </TopbarDropdownWrapper>
  )

  return (
    <Popover
      content={content}
      trigger="click"
      visible={visible}
      onVisibleChange={handleVisibleChange}
      arrowPointAtCenter={true}
      placement="bottomLeft"
    >
      <div className="isoImgWrapper">
        <img alt="user" src={userpic} />
        <span className="userActivity online" />
      </div>
    </Popover>
  )
}

export default TopbarUser
