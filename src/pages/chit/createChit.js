import React, { useState } from 'react'

import { View, Text } from 'react-native'
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu'
import ChitForm from './chitForm'

import Datepicker from '../chit/datepicker'
import { TextInput } from 'react-native'
import { COMMISSION, FIXED, EXTRA } from './assets/constants'
import ChitList from './chitList'
function CreateChit({ Navigation }) {
  const [visible, setVisible] = useState(false)

  const hideMenu = () => setVisible(false)

  const showMenu = () => setVisible(true)

  return (
    <View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
          padding: 10,
          borderRadius: 10,
          borderWidth: 1,
        }}
      >
        <Menu
          visible={visible}
          anchor={<Text onPress={showMenu}>Create Chit</Text>}
          onRequestClose={hideMenu}
        >
          <MenuItem onPress={() => Navigation.navigate('COMMISSION')}>
            <COMMISSION />
          </MenuItem>
          <MenuItem onPress={() => Navigation.navigate('FIXED')}>
            <FIXED />
          </MenuItem>
          <MenuItem onPress={() => Navigation.navigate('EXTRA')}>
            <EXTRA />
          </MenuItem>
        </Menu>
      </View>
      <View>
        <ChitList />
      </View>
    </View>
  )
}
export default CreateChit
