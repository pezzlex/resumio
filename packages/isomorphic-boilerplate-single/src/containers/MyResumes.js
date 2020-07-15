import LayoutContent from '@iso/components/utility/layoutContent'
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper'
import PageHeader from '@iso/components/utility/pageHeader'
import React, { useEffect } from 'react'
import { connect, useSelector } from 'react-redux'
import { fetchResumes } from '../redux/resumes/actions'
import { Title, Filters, Header, HeaderSecondary } from './AppLayout.style'
import { Button } from 'antd'
import { Link, useRouteMatch } from 'react-router-dom'

import Table from './Tables/AntTables/AntTables'

const MyResumes = ({ resumes, fetchResumes, shouldFetchResumes }) => {
  const { path, url } = useRouteMatch()
  console.log('path', path)
  const userId = useSelector((state) => state.Auth.id)
  useEffect(() => {
    // if (shouldFetchResumes) {
    fetchResumes(userId)
    // }
  }, [])

  return (
    <LayoutContentWrapper style={{ height: '100vh' }}>
      <LayoutContent style={{ height: '' }}>
        <Header>
          <Title>My Resumes</Title>
          <Link to={`${url}/create-resume`}>
            <Button type="primary">Build Resume</Button>
          </Link>
        </Header>
        <Table resumes={resumes} />
      </LayoutContent>
    </LayoutContentWrapper>
  )
}

const mapStateToProps = (state) => {
  return {
    resumes: state.resumeData.resumes,
    shouldFetchResumes: state.resumeData.shouldFetchResumes,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchResumes: (user) => {
      dispatch(fetchResumes(user))
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyResumes)
