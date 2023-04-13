import React from "react";
import { Button, TextInput, View } from "react-native";

import { useDispatch } from "react-redux";

import { addTokens } from "../features/auth/authSlice";
const SignIn = () => {
  const dispatch = useDispatch();

  const [mobilenumber, setMobilenumber] = React.useState("9790056175");
  const [otp, setOtp] = React.useState("590852");

  const signIn = (data) => {
    fetch("http://192.168.1.4:3005/authentication/validate-otp", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mobile_number: Number(data.mobilenumber),
        otp_number: Number(data.otp),
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        dispatch(addTokens(json));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <View>
      <TextInput
        placeholder="mobilenumber"
        value={mobilenumber}
        onChangeText={setMobilenumber}
        style={{ marginBottom: 20 }}
      />
      <TextInput
        placeholder="otp"
        value={otp}
        onChangeText={setOtp}
        secureTextEntry
        style={{ marginBottom: 20 }}
      />
      <Button title="Sign in" onPress={() => signIn({ mobilenumber, otp })} />
    </View>
  );
};

export default SignIn;
