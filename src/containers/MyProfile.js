import React from 'react'
import LayoutContent from '../components/utility/layoutContent'
import LayoutContentWrapper from '../components/utility/layoutWrapper'
import { Header, Title } from './AppLayout.style'

const MyProfile = () => {
  return (
    <LayoutContentWrapper style={{ height: '100vh' }}>
      <LayoutContent>
        <Header>
          <Title>My Profile</Title>
        </Header>
      </LayoutContent>
    </LayoutContentWrapper>
  )
}

export default MyProfile
