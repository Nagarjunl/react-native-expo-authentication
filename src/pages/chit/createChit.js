import React, { useState } from "react";

import { View, Text } from "react-native";
import { Menu, MenuItem, MenuDivider } from "react-native-material-menu";
import ChitForm from "./chitForm";

function CreateChit() {
  const [visible, setVisible] = useState(false);

  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);

  return (
    <View>
      <View
        style={{
          height: "100%",
          alignItems: "start",
          justifyContent: "top",
        }}
      >
        <Menu
          visible={visible}
          anchor={<Text onPress={showMenu}>Create Chit</Text>}
          onRequestClose={hideMenu}
        >
          <MenuItem onPress={hideMenu}>Commission Chit</MenuItem>
          <MenuItem onPress={hideMenu}>Fixed Chit</MenuItem>
          <MenuItem onPress={hideMenu}>Extra Chit</MenuItem>
        </Menu>
      </View>
      <ChitForm />
    </View>
  );
}
export default CreateChit;
