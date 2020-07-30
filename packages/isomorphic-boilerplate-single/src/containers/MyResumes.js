import LayoutContent from '@iso/components/utility/layoutContent'
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper'
import React, { useEffect } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'
import { fetchResumes, clearStatus } from '../redux/resumes/actions'
import { Title, Filters, Header, HeaderSecondary } from './AppLayout.style'
import { Button, notification } from 'antd'
import { Link, useRouteMatch } from 'react-router-dom'
import { Pagination } from 'antd'

import Table from './Tables/AntTables/AntTables'

const MyResumes = () => {
  const { url } = useRouteMatch()
  const dispatch = useDispatch()
  const shouldFetchResumes = useSelector(
    (state) => state.resumeData.shouldFetchResumes
  )
  const resumes = useSelector((state) => state.resumeData.resumes)
  const isSignedIn = useSelector((state) => state.Auth.token)
  const success = useSelector((state) => state.resumeData.success)
  const error = useSelector((state) => state.resumeData.error)

  useEffect(() => {
    dispatch(clearStatus())
  }, [success, error])

  useEffect(() => {
    if (isSignedIn) {
      dispatch(fetchResumes())
    }
  }, [isSignedIn])

  useEffect(() => {
    if (error) {
      notification['error']({
        message: 'Error',
        description: error,
      })
    }
  }, [error])
  useEffect(() => {
    if (success) {
      notification['open']({
        message: 'Notification',
        description: success,
      })
    }
  }, [success])

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
        {/* <Pagination defaultCurrent={1} total={50} /> */}
      </LayoutContent>
    </LayoutContentWrapper>
  )
}

export default MyResumes
