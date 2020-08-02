import LayoutContent from '@iso/components/utility/layoutContent'
import LayoutContentWrapper from '@iso/components/utility/layoutWrapper'
import React, { useEffect, useState } from 'react'
import { connect, useSelector, useDispatch } from 'react-redux'
import {
  fetchResumes,
  clearStatus,
  clearCurrentResume,
} from '../redux/resumes/actions'
import { Title, Filters, Header, HeaderSecondary } from './AppLayout.style'
import { Button, notification, Pagination, Space } from 'antd'
import { Link, useRouteMatch } from 'react-router-dom'

import Table from './Tables/AntTables/AntTables'

const MyResumes = () => {
  const { url } = useRouteMatch()
  const dispatch = useDispatch()
  const shouldFetchResumes = useSelector(
    (state) => state.resumeData.shouldFetchResumes
  )
  const { resumes, count } = useSelector((state) => state.resumeData.resumes)
  const isSignedIn = useSelector((state) => state.Auth.token)
  const success = useSelector((state) => state.resumeData.success)
  const error = useSelector((state) => state.resumeData.error)
  const [isTableLoading, setTableLoading] = useState(false)

  console.log(resumes, count)

  useEffect(() => {
    if (success || error) {
      setTableLoading(false)
      dispatch(clearStatus())
      dispatch(clearCurrentResume())
    }
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
  // useEffect(() => {
  //   if (success) {
  //     notification['success']({
  //       message: 'Success',
  //       description: success,
  //     })
  //   }
  // }, [success])

  return (
    <LayoutContentWrapper>
      <LayoutContent>
        <Header>
          <Title>My Resumes</Title>
          <Link to={`${url}/create-resume`}>
            <Button type="primary">Build Resume</Button>
          </Link>
        </Header>
        <Table resumes={resumes} url={url} isTableLoading={isTableLoading} />
        <br />
        <br />
        {count > 10 && (
          <Pagination
            defaultCurrent={1}
            total={count}
            onChange={(val) => {
              setTableLoading(true)
              dispatch(fetchResumes({ skip: val - 1 }))
            }}
          />
        )}
      </LayoutContent>
    </LayoutContentWrapper>
  )
}

export default MyResumes
