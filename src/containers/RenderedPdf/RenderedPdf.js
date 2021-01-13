import {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  View,
} from '@react-pdf/renderer'
import React from 'react'
import LatoBold from '../../assets/fonts/Lato/LatoBold.ttf'
import LatoItalic from '../../assets/fonts/Lato/LatoItalic.ttf'
import LatoRegular from '../../assets/fonts/Lato/LatoRegular.ttf'
import OpenSansRegular from '../../assets/fonts/Open_Sans/OpenSansRegular.ttf'
import Src from '../../assets/images/luke.jpg'
import Education from './Education'
import Experience from './Experience'
import Header from './Header'
import Skills from './Skills'

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  container: {
    flex: 1,
    flexDirection: 'row',
    '@media max-width: 400': {
      flexDirection: 'column',
    },
  },
  image: {
    marginBottom: 10,
  },
  leftColumn: {
    flexDirection: 'column',
    width: 170,
    paddingTop: 30,
    paddingRight: 15,
    // '@media max-width: 400': {
    //   width: '100%',
    //   paddingRight: 0,
    // },
    // '@media orientation: landscape': {
    //   width: 200,
    // },
  },
  footer: {
    fontSize: 12,
    fontFamily: 'Lato Bold',
    textAlign: 'center',
    marginTop: 25,
    paddingTop: 10,
    borderWidth: 3,
    borderColor: 'gray',
    borderStyle: 'dashed',
    '@media orientation: landscape': {
      marginTop: 10,
    },
  },
})

Font.register({
  family: 'Open Sans',
  src: OpenSansRegular,
})
Font.register({
  family: 'Lato',
  src: LatoRegular,
})
Font.register({
  family: 'Lato Italic',
  src: LatoItalic,
})
Font.register({
  family: 'Lato Bold',
  src: LatoBold,
})

const Resume = ({ resume, ...rest }) => (
  <Page {...rest} style={styles.page}>
    <Header
      firstName={resume.firstName}
      lastName={resume.lastName}
      email={resume.email}
    />
    <View style={styles.container}>
      <View style={styles.leftColumn}>
        <Image />
        <Education />
        <Skills />
      </View>
      <Experience />
    </View>
  </Page>
)

const RenderedPdf = ({ resume }) => {
  Font.register({
    family: 'Oswald',
    src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
  })
  console.log(resume)

  return (
    <>
      <Document
        author={resume.firstName}
        keywords="awesome, resume, start wars"
        subject="The resume of Luke Skywalker"
        title="Resume"
      >
        <Resume size="letter" resume={resume} />
      </Document>
    </>
  )
}

export default RenderedPdf
