import React, { useEffect, useState } from 'react'
import { StyleSheet, Button, Text, View } from 'react-native'
import { useGetChitsQuery } from '../../services/chitsAPI'
import { DataTable } from 'react-native-paper'
const ChitList = () => {
  const [chits, setChits] = useState([])

  const { data: ChitsList, isLoading } = useGetChitsQuery()

  useEffect(() => {
    if (!isLoading) {
      setChits(ChitsList)
    }
  }, [isLoading, ChitsList])

  return (
    <>
      <View style={styles.container}>
        <View>
          <DataTable>
            <DataTable.Header style={styles.Header}>
              <DataTable.Title>Name</DataTable.Title>
              <DataTable.Title>Amount</DataTable.Title>
              <DataTable.Title>status</DataTable.Title>
              <DataTable.Title>Date</DataTable.Title>
            </DataTable.Header>
            {chits &&
              chits.map((chit, index) => (
                <DataTable.Row key={index} style={styles.table}>
                  <DataTable.Cell style={styles.paragraph}>
                    {chit.chit_name}
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.paragraph}>
                    {chit.amount}
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.mobileNumber} numeric>
                    {chit.status}
                  </DataTable.Cell>
                  <DataTable.Cell style={styles.mobileNumber} numeric>
                    {new Date(chit.start_date).toLocaleDateString()}
                  </DataTable.Cell>
                </DataTable.Row>
              ))}
          </DataTable>
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
export default ChitList
