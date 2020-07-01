import LayoutContent from '@iso/components/utility/layoutContent';
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper';
import PageHeader from '@iso/components/utility/pageHeader';
import React, { Component } from 'react';

export default class extends Component {
  render() {
    return (
      <LayoutContentWrapper style={{ height: '100vh' }}>
        <LayoutContent>
          <PageHeader>My Resumes</PageHeader>
        </LayoutContent>
      </LayoutContentWrapper>
    );
  }
}
