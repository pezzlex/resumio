import LayoutContent from '@iso/components/utility/layoutContent'
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper'
import PageHeader from '@iso/components/utility/pageHeader'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchResumes } from '../redux/resumes/actions'
import Table from './Tables/AntTables/AntTables'

const MyResumes = ({ resumes, fetchResumes, shouldFetchResumes }) => {
  useEffect(() => {
    if (shouldFetchResumes) {
      console.log('shouldFetchResumes', shouldFetchResumes)
      fetchResumes()
    }
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
    fetchResumes: () => {
      dispatch(fetchResumes())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyResumes)
