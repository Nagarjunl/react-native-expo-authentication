import React, { useEffect, useState } from 'react'
import { StyleSheet, SafeAreaView, Button, Text, View } from 'react-native'
import { useDispatch } from 'react-redux'
import { removeTokens } from '../features/auth/authSlice'
import { useGetMembersQuery } from '../services/membersAPI'

const Home = () => {
  const dispatch = useDispatch()
  const [members, setMembers] = useState([])

  const { data: membersList, isLoading } = useGetMembersQuery()

  const signOut = () => {
    dispatch(removeTokens())
  }

  useEffect(() => {
    if (!isLoading) {
      setMembers(membersList)
    }
  }, [isLoading, membersList])

  return (
    <SafeAreaView>
      <View style={styles.container}>
        {members &&
          members.map((member) => (
            <View style={styles.border}>
              <Text style={styles.paragraph} key={member.id}>
                {member.name}
              </Text>
              <Text style={styles.paragraph} key={member.id}>
                {member.mobile_number}
              </Text>
            </View>
          ))}

        <Button title="Sign out" onPress={signOut} />
      </View>
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
