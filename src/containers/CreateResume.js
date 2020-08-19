import LayoutContent from '../../components/utility/layoutContent'
import LayoutContentWrapper from '../../components/utility/layoutWrapper'
import React, { Component } from 'react'

export default class extends Component {
  render() {
    return (
      <LayoutContentWrapper style={{ height: '100vh' }}>
        <LayoutContent>
          <h1>Create Resume</h1>
        </LayoutContent>
      </LayoutContentWrapper>
    )
  }
}
