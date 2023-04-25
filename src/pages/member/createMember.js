import React, { useState, useEffect } from 'react'
import { StyleSheet, Button, TextInput, View, Text } from 'react-native'
import {
  usePostMembersMutation,
  useGetMembersQuery,
} from '../../services/membersAPI'
import { useForm, Controller } from 'react-hook-form'

function CreateMember() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      mobile_number: '',
    },
  })
  const [postMember] = usePostMembersMutation()
  const [members, setMembers] = useState([])
  const { data: membersList, isLoading } = useGetMembersQuery()
  const createMember = async (data) => {
    const { name, mobile_number, id_proof } = data

    await postMember({
      name: name,
      mobile_number: Number(mobile_number),
      //   id_proof: id_proof.length === 0 ? "" : id_proof,
    })
      .unwrap()
      .then(() => reset())
  }

  const onSubmit = (data) => {
    createMember(data)
  }
  useEffect(() => {
    if (!isLoading) {
      setMembers(membersList)
    }
  }, [isLoading, membersList])

  return (
    <>
      <View style={styles.container}>
        <View>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="name"
          />
          {errors.name && <Text>Name is required.</Text>}

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Mobile number"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
            name="mobile_number"
          />
          {errors.mobile_number && <Text>Mobile Number is required.</Text>}
        </View>

        <View style={styles.button}>
          <Button title="Add a member" onPress={handleSubmit(onSubmit)} />
        </View>

        <View style={styles.memberList}>
          {members &&
            members.map((member, index) => (
              <View style={styles.border} key={index}>
                <Text style={styles.paragraph}>{member.name}</Text>
                <Text style={styles.mobileNumber}>{member.mobile_number}</Text>
              </View>
            ))}
        </View>
      </View>
    </>
  )
}
const styles = StyleSheet.create({
  input: {
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 7,
    borderColor: '#a9a9a9',
    marginTop: 12,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderRadius: 10,
  },
  profileImgContainer: {
    width: 150,
    height: 150,
    marginLeft: 120,
    borderRadius: 150 / 2,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: 'red',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    margin: 4,
    backgroundColor: 'white',
  },
  fixToText: {
    justifyContent: 'center',
    borderRadius: 40,
  },
  memberList: {
    flex: 1,
    alignItems: 'stretch',
    paddingTop: 40,
    backgroundColor: 'white',
  },
  paragraph: {
    margin: 7,
    fontSize: 15,
    textAlign: 'left',
    color: '#34495e',
  },
  mobileNumber: {
    margin: 7,
    fontSize: 15,
    textAlign: 'right',
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

export default CreateMember
