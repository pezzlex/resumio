import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import LayoutContent from '../components/utility/layoutContent'
import LayoutContentWrapper from '../components/utility/layoutWrapper'
import { Header, Title } from './AppLayout.style'

const Templates = () => {
  const { path } = useRouteMatch()
  console.log('path', path)
  return (
    <LayoutContentWrapper style={{ height: '100vh' }}>
      <LayoutContent>
        <Header>
          <Title>Templates</Title>
        </Header>
      </LayoutContent>
    </LayoutContentWrapper>
  )
}

export default Templates
