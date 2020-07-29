import LayoutContent from '@iso/components/utility/layoutContent'
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper'
import PageHeader from '@iso/components/utility/pageHeader'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Title, Filters, Header, HeaderSecondary } from './AppLayout.style'
import { Link, useRouteMatch } from 'react-router-dom'
import { Button } from 'antd'

const Templates = () => {
  const { path, url } = useRouteMatch()
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
