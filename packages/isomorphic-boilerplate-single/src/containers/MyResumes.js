import LayoutContent from '@iso/components/utility/layoutContent'
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper'
import PageHeader from '@iso/components/utility/pageHeader'
import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchResumes } from '../redux/resumes/actions'
import Table from './Tables/AntTables/AntTables'

const MyResumes = ({ resumes, getResumes }) => {
  useEffect(() => {
    getResumes()
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
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getResumes: () => {
      dispatch(fetchResumes())
    },
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyResumes)
