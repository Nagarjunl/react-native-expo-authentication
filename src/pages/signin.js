import React from "react";
import { Button, TextInput, View } from "react-native";

import { useDispatch } from "react-redux";

import { addTokens } from "../features/auth/authSlice";

import { useVerifyOtpMutation } from "../services/authAPI";

const SignIn = () => {
  const dispatch = useDispatch();

  const [verifyOtp] = useVerifyOtpMutation();

  const [mobilenumber, setMobilenumber] = React.useState("9790056175");
  const [otp, setOtp] = React.useState("590852");

  const signIn = (data) => {
    verifyOtp({
      mobile_number: Number(data.mobilenumber),
      otp_number: Number(data.otp),
    })
      .unwrap()
      .then((res) => {
        const { user, ...rest } = res;
        dispatch(addTokens(rest));
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
