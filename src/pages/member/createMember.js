import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Button,
  TextInput,
  View,
  Text,
  Modal,
  Pressable,
  ScrollView,
} from 'react-native'
import {
  usePostMembersMutation,
  useGetMembersQuery,
} from '../../services/membersAPI'
import { useForm, Controller } from 'react-hook-form'
import { DataTable } from 'react-native-paper'
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
  const [modalVisible, setModalVisible] = useState(false)
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
      <ScrollView>
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.')
              setModalVisible(!modalVisible)
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
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
                  {errors.mobile_number && (
                    <Text>Mobile Number is required.</Text>
                  )}
                </View>
                <View style={styles.button}>
                  <Button
                    title="Add a member"
                    onPress={handleSubmit(onSubmit)}
                  />
                </View>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={styles.textStyle}>Hide Modal</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => setModalVisible(true)}
          >
            <Text style={styles.textStyle}>Show Modal</Text>
          </Pressable>
        </View>
        <View style={styles.container}>
          <View style={styles.memberList}>
            <DataTable>
              <DataTable.Header style={styles.Header}>
                <DataTable.Title sortDirection="descending">
                  Name
                </DataTable.Title>
                <DataTable.Title>Mobilenumber</DataTable.Title>
                <DataTable.Title numeric sortDirection="descending">
                  Id-Proof
                </DataTable.Title>
              </DataTable.Header>
              {members &&
                members.map((member, index) => (
                  <DataTable.Row key={index} style={styles.table}>
                    <DataTable.Cell style={styles.paragraph}>
                      {member.name}
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.mobileNumber}>
                      {member.mobile_number}
                    </DataTable.Cell>
                    <DataTable.Cell style={styles.mobileNumber}>
                      {member.id_proof}
                    </DataTable.Cell>
                  </DataTable.Row>
                ))}
            </DataTable>
          </View>
        </View>
      </ScrollView>
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

  container: {
    flex: 1,
    justifyContent: 'center',
    margin: 4,
    padding: 5,
    backgroundColor: 'white',
  },

  memberList: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 40,
    backgroundColor: 'white',
  },
  paragraph: {
    fontSize: 15,
    color: '#34495e',
  },
  mobileNumber: {
    margin: 4,
    fontSize: 15,
    color: '#34495e',
    marginLeft: 9,
  },
  table: {
    margin: 4,
    fontSize: 15,
    color: '#34495e',
  },
  Header: {
    backgroundColor: 'gray',
    fontFamily: 'bold',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: 'blue',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
})

export default CreateMember
