import React from 'react'
import {
  Document,
  Font,
  Page,
  PDFViewer,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer'

const RenderedPdf = ({ resume, test }) => {
  console.log(resume, test)
  Font.register({
    family: 'Oswald',
    src: 'https://fonts.gstatic.com/s/oswald/v13/Y_TKV6o8WovbUd3m_X9aAA.ttf',
  })

  const styles = StyleSheet.create({
    body: {
      paddingTop: 35,
      paddingBottom: 65,
      paddingHorizontal: 35,
      width: '100%',
    },
    title: {
      fontSize: 24,
      textAlign: 'center',
      fontFamily: 'Oswald',
    },
    author: {
      fontSize: 12,
      textAlign: 'center',
      marginBottom: 40,
    },
    subtitle: {
      fontSize: 18,
      margin: 12,
      fontFamily: 'Oswald',
    },
    text: {
      margin: 12,
      fontSize: 14,
      textAlign: 'justify',
      fontFamily: 'Times-Roman',
    },
    image: {
      marginVertical: 15,
      marginHorizontal: 100,
    },
    header: {
      fontSize: 12,
      marginBottom: 20,
      textAlign: 'center',
      color: 'grey',
    },
    pageNumber: {
      position: 'absolute',
      fontSize: 12,
      bottom: 30,
      left: 0,
      right: 0,
      textAlign: 'center',
      color: 'grey',
    },
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4',
    },
    section: {
      width: 600,
      '@media max-width: 400': {
        width: 300,
      },
      '@media orientation: landscape': {
        width: 400,
      },
    },
  })
  return (
    <PDFViewer>
      <Document style={styles}>
        <Page size="A4" style={styles}>
          <View style={styles.section}>
            <Text>{test}</Text>
            {Object.keys(resume).map((key) => {
              console.log(key, resume[key])
              return (
                <Text key={key}>
                  {key}: {resume[key]}
                </Text>
              )
            })}
          </View>
        </Page>
      </Document>
    </PDFViewer>
  )
}

export default RenderedPdf
