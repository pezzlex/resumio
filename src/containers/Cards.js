import basicStyle from '../assets/styles/constants'
import Box from '../components/utility/box'
import ContentHolder from '../components/utility/contentHolder'
import LayoutWrapper from '../components/utility/layoutWrapper'
import PageHeader from '../components/utility/pageHeader'
import { Col, Row } from 'antd'
import React from 'react'

import Card from './Cards.styles'

export default function () {
  const { rowStyle, colStyle, gutter } = basicStyle
  return (
    <LayoutWrapper>
      <PageHeader>Cards</PageHeader>
      <Row style={rowStyle} gutter={gutter} justify="start">
        <Col md={12} sm={12} xs={24} style={colStyle}>
          <Box
            title="Lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
            subtitle="Subtitle"
          >
            <ContentHolder>
              <Card
                title="Card Title"
                extra={<a href="# ">More</a>}
                style={{ width: '100%' }}
              >
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                  enim ad minim veniam quis nostrud exercitation ullamco laboris
                  nisi ut aliquip ex ea commodo consequat.
                </p>
                <p>Card content</p>
              </Card>
            </ContentHolder>
          </Box>
        </Col>
        <Col md={12} sm={12} xs={24} style={colStyle}>
          <Box title="Title" subtitle="Subtitle">
            <ContentHolder>
              <Card
                title="Card Title"
                bordered={false}
                style={{ width: '100%' }}
              >
                <p>
                  {' '}
                  Lorem ipsum dolor sit amet consectetur adipisicing elit sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                  enim ad minim veniam quis nostrud exercitation ullamco laboris
                  nisi ut aliquip ex ea commodo consequat.
                </p>
                <p>Card content</p>
              </Card>
            </ContentHolder>
          </Box>
        </Col>
      </Row>
      <Row style={rowStyle} gutter={gutter} justify="start">
        <Col span={24} style={colStyle}>
          <Box title="Title" subtitle="Subtitle">
            <ContentHolder style={{ overflow: 'hidden' }}>
              <Row>
                <Col md={8} sm={8} xs={24} style={{ padding: '0 8px' }}>
                  <Card title="Card Title"></Card>
                </Col>
                <Col md={8} sm={8} xs={24} style={{ padding: '0 8px' }}>
                  <Card title="Card Title"></Card>
                </Col>
                <Col md={8} sm={8} xs={24} style={{ padding: '0 8px' }}>
                  <Card title="Card Title"></Card>
                </Col>
              </Row>
            </ContentHolder>
          </Box>
        </Col>
      </Row>

      <Row style={rowStyle} gutter={gutter} justify="start">
        <Col md={12} sm={12} xs={24} style={colStyle}>
          <Box title="Title" subtitle="Subtitle">
            <ContentHolder>
              <Card loading title="Card Title" style={{ width: '100%' }}>
                Whatever Content
              </Card>
            </ContentHolder>
          </Box>
        </Col>

        <Col md={12} sm={12} xs={24} style={colStyle}>
          <Box
            title="Customized Content"
            subtitle="Shows a loading indicator while the contents of the card is being fetched."
          >
            <ContentHolder>
              <Card bodyStyle={{ padding: 0 }}>
                <div className="custom-image">
                  <img
                    alt="example"
                    width="100%"
                    src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                  />
                </div>
                <div className="custom-card">
                  <h3>Europe Street Beat</h3>
                  <p>www.instagram.com</p>
                </div>
              </Card>
            </ContentHolder>
          </Box>
        </Col>
      </Row>
    </LayoutWrapper>
  )
}
