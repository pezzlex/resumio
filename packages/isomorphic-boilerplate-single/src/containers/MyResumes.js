import LayoutContent from '@iso/components/utility/layoutContent'
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper'
import React, { useEffect } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'
import { fetchResumes } from '../redux/resumes/actions'
import { Title, Filters, Header, HeaderSecondary } from './AppLayout.style'
import { Button } from 'antd'
import { Link, useRouteMatch } from 'react-router-dom'

import Table from './Tables/AntTables/AntTables'

const MyResumes = () => {
  const { url } = useRouteMatch()
  const dispatch = useDispatch()
  const shouldFetchResumes = useSelector(
    (state) => state.resumeData.shouldFetchResumes
  )
  const resumes = useSelector((state) => state.resumeData.resumes)
  const isSignedIn = useSelector((state) => state.Auth.token)

  useEffect(() => {
    if (isSignedIn) {
      console.log('signed in!!')
      dispatch(fetchResumes())
    }
  }, [isSignedIn])

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

export default MyResumes
