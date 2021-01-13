import React from 'react'

import { Link, Text, View, StyleSheet } from '@react-pdf/renderer'

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#112131',
    borderBottomStyle: 'solid',
    alignItems: 'stretch',
  },
  detailColumn: {
    flexDirection: 'column',
    flexGrow: 9,
    textTransform: 'uppercase',
  },
  linkColumn: {
    flexDirection: 'column',
    flexGrow: 2,
    alignSelf: 'flex-end',
    justifySelf: 'flex-end',
  },
  name: {
    fontSize: 16,
    fontFamily: 'Lato Bold',
  },
  subtitle: {
    fontSize: 10,
    justifySelf: 'flex-end',
    fontFamily: 'Lato',
  },
  link: {
    fontFamily: 'Lato',
    fontSize: 10,
    color: 'black',
    textDecoration: 'none',
    alignSelf: 'flex-end',
    justifySelf: 'flex-end',
  },
})

export default ({ firstName, lastName, email }) => (
  <View style={styles.container}>
    <View style={styles.detailColumn}>
      <Text style={styles.name}>
        {firstName} {lastName}
      </Text>
    </View>
    <View style={styles.linkColumn}>
      <Link style={styles.link}>{email}</Link>
    </View>
  </View>
)
