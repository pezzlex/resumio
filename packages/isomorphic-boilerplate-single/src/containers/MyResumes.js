import LayoutContent from '@iso/components/utility/layoutContent'
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper'
import React, { useEffect } from 'react'
import { connect, useSelector } from 'react-redux'
import { fetchResumes } from '../redux/resumes/actions'
import { Title, Filters, Header, HeaderSecondary } from './AppLayout.style'
import { Button } from 'antd'
import { Link, useRouteMatch } from 'react-router-dom'

import Table from './Tables/AntTables/AntTables'

const MyResumes = ({ resumes, fetchResumes, shouldFetchResumes }) => {
  const { url } = useRouteMatch()
  useEffect(() => {
    console.log('other useEffect called')
    // if (shouldFetchResumes) {
    fetchResumes()
    // }
  }, [])

  return (
    <LayoutContentWrapper>
      <LayoutContent>
        <Header>
          <Title>My Resumes</Title>
          <Link to={`${url}/create-resume`}>
            <Button type="primary">Build Resume</Button>
          </Link>
        </Header>
        <Table resumes={resumes} url={url} />
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
    fetchResumes: () => {
      dispatch(fetchResumes())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyResumes)
