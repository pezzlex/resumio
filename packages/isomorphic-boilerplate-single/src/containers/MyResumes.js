import LayoutContent from '@iso/components/utility/layoutContent'
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper'
import PageHeader from '@iso/components/utility/pageHeader'
import React, { useEffect } from 'react'
import { connect, useSelector } from 'react-redux'
import { fetchResumes } from '../redux/resumes/actions'

import Table from './Tables/AntTables/AntTables'

const MyResumes = ({ resumes, fetchResumes, shouldFetchResumes }) => {
  const userId = useSelector((state) => state.Auth.id)
  useEffect(() => {
    // if (shouldFetchResumes) {
    fetchResumes(userId)
    // }
  }, [])

  return (
    <LayoutContentWrapper>
      <LayoutContent>
        <PageHeader>My Resumes</PageHeader>
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
