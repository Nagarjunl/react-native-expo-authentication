import React, { useEffect, useState } from 'react'
import { StyleSheet, SafeAreaView, Button, Text, View } from 'react-native'

import { removeTokens } from '../features/auth/authSlice'

const Home = () => {
  const signOut = () => {
    dispatch(removeTokens())
  }

  return (
    <SafeAreaView>
      <Button title="Sign out" onPress={signOut} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    paddingTop: 40,
    backgroundColor: 'white',
  },
  paragraph: {
    margin: 7,
    fontSize: 11,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
  border: {
    borderRadius: 6,
    elevation: 3,
    backgroundColor: '#fff',
    shadowOffset: { width: 1, height: 1 },
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2,
    marginHorizontal: 4,
    marginVertical: 6,
    marginHorizontal: 18,
    marginVertical: 10,
  },
})
export default Home
