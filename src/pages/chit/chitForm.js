import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  Picker,
  Pressable,
} from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import DateTimePicker from '@react-native-community/datetimepicker'

const dateOfChitData = [
  { label: '01', value: '01' },
  { label: '02', value: '02' },
  { label: '03', value: '03' },
  { label: '04', value: '04' },
  { label: '05', value: '05' },
  { label: '06', value: '06' },
  { label: '07', value: '07' },
  { label: '08', value: '08' },
  { label: '09', value: '09' },
  { label: '10', value: '10' },
  { label: '11', value: '11' },
  { label: '12', value: '12' },
  { label: '13', value: '13' },
  { label: '14', value: '14' },
  { label: '15', value: '15' },
  { label: '16', value: '16' },
  { label: '17', value: '17' },
  { label: '18', value: '18' },
  { label: '19', value: '19' },
  { label: '20', value: '20' },
  { label: '21', value: '21' },
  { label: '22', value: '22' },
  { label: '23', value: '23' },
  { label: '24', value: '24' },
  { label: '25', value: '25' },
  { label: '26', value: '26' },
  { label: '27', value: '27' },
  { label: '28', value: '28' },
  { label: '29', value: '29' },
  { label: '30', value: '30' },
  { label: '31', value: '31' },
]
const occuranceData = [
  { label: 'Every Month', value: 'Every Month' },
  { label: '2 Months only', value: '2 Months only' },
]

function ChitForm() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      dateOfChit: '',
      occurance: '',
      months: '',
      commission: '',
      name: '',
      amount: '',
      maximumMembers: '',
    },
  })
  const [listOpen, setListOpen] = useState(false)
  const [occuranceOpen, setOccuranceOpen] = useState(false)
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [date, setDate] = useState(new Date())
  const [showPicker, setShowPicker] = useState(false)

  const onSubmit = (data) => {
    console.log(data)
  }

  const toggleDatepicker = () => {
    setShowPicker(!showPicker)
  }

  const onChange = ({ type }, selectedDate) => {
    if (type == 'set') {
      const currentDate = selectedDate
      setDate(currentDate)
    } else {
      toggleDatepicker()
    }
  }

  return (
    <View style={styles.container}>
      <View>
        {showPicker && (
          <DateTimePicker
            mode="date"
            display="spinner"
            value={date}
            onChange={onChange}
          />
        )}
        {!showPicker && (
          <Pressable onPress={toggleDatepicker}>
            <TextInput
              style={styles.input}
              placeholder="Select date"
              value={dateOfBirth}
              onChangeText={setDateOfBirth}
              editable={false}
            />
          </Pressable>
        )}

        <Controller
          control={control}
          name="dateOfChit"
          render={({ field: { onChange, value } }) => (
            <DropDownPicker
              style={styles.dropdown}
              placeholder="Date of chit"
              placeholderStyle={styles.dropdownPlaceholder}
              open={listOpen}
              setOpen={() => setListOpen(!listOpen)}
              items={dateOfChitData}
              value={value}
              setValue={(item) => onChange(item())}
            />
          )}
          rules={{
            required: {
              value: true,
              message: 'Field is required!',
            },
          }}
        />
        <br />
        <br />
        <br />

        <Controller
          control={control}
          name="occurance"
          render={({ field: { onChange, value } }) => (
            <DropDownPicker
              style={styles.dropdown}
              placeholder="Occurance"
              placeholderStyle={styles.dropdownPlaceholder}
              open={occuranceOpen}
              setOpen={() => setOccuranceOpen(!occuranceOpen)}
              items={occuranceData}
              value={value}
              setValue={(item) => onChange(item())}
            />
          )}
        />
        {errors.occurance && <Text>No.of Months is required.</Text>}
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="No.of Months"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="months"
        />
        {errors.months && <Text>No.of Months is required.</Text>}
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Commission"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="commission"
        />
        {errors.commission && <Text>Commission is required.</Text>}
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
        {errors.commission && <Text>Name is required.</Text>}
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Amount"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="amount"
        />
        {errors.commission && <Text>Amount is required.</Text>}
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Maximum Members"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
          name="maximumMembers"
        />
        {errors.commission && <Text>Maximum Members is required.</Text>}
      </View>

      <View style={styles.button}>
        <Button title="Next" onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
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
  memberlist: {
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
  mobilenumber: {
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
export default ChitForm
