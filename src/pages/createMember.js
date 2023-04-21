import React, { useState } from 'react'
import { StyleSheet, Button, TextInput, View, Text } from 'react-native'
import { usePostMembersMutation } from '../services/membersAPI'
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

  const createMember = async (data) => {
    const { name, mobile_number, id_proof } = data

    await postMember({
      name: name,
      mobile_number: Number(mobile_number),
      //   id_proof: id_proof.length === 0 ? "" : id_proof,
    })
      .unwrap()
      .then(() => reset())
      .then(() => {
        console.log(data)
      })
  }

  const onSubmit = (data) => {
    createMember(data)
    console.log(data)
  }

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
  },
  fixToText: {
    justifyContent: 'center',
    borderRadius: 40,
  },
})

export default CreateMember
