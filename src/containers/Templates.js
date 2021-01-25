import { Col, Row, Typography, Image } from 'antd'
import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import LayoutContent from '../components/utility/layoutContent'
import LayoutContentWrapper from '../components/utility/layoutWrapper'
import { Header, Title } from './AppLayout.style'
import Src from '../assets/images/jakes-resume.jpeg'

const { Text } = Typography

export const TemplatesData = [
  {
    value: 'BASIC_TEMPLATE',
    name: "Overleaf: Jake's Resume",
  },
]

const Templates = () => {
  const { path } = useRouteMatch()
  console.log('path', path)
  return (
    <LayoutContentWrapper style={{ height: '100vh' }}>
      <LayoutContent>
        <Header>
          <Title>Templates</Title>
        </Header>
        <Row gutter={12}>
          <Col xl={3} lg={6} md={12} span={24}>
            <Image width={300} src={Src} />
            <Text> Overleaf: Jake's Resume</Text>
          </Col>
        </Row>
      </LayoutContent>
    </LayoutContentWrapper>
  )
}

export default Templates
