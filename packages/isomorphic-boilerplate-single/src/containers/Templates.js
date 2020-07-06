import LayoutContent from '@iso/components/utility/layoutContent'
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper'
import PageHeader from '@iso/components/utility/pageHeader'
import React, { Component } from 'react'
import { connect } from 'react-redux'

const Templates = ({ templates }) => {
  return (
    <LayoutContentWrapper style={{ height: '100vh' }}>
      <LayoutContent>
        <PageHeader>Templates</PageHeader>
      </LayoutContent>
    </LayoutContentWrapper>
  )
}

const mapStateToProps = (state) => {
  return {
    templates: state.templateData.templates,
  }
}

export default connect(mapStateToProps)(Templates)
