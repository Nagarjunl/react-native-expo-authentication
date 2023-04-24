import React, { useEffect } from "react";
import { Button, TextInput, View } from "react-native";

import { useDispatch, useSelector } from "react-redux";

import { addTokens } from "../features/auth/authSlice";

import { useVerifyOtpMutation } from "../services/authAPI";

const SignIn = () => {
  const dispatch = useDispatch();

  const [verifyOtp] = useVerifyOtpMutation();

  const [mobilenumber, setMobilenumber] = React.useState("8270214342");
  const [otp, setOtp] = React.useState("123456");
  const state = useSelector((state) => state);
  console.log(state);

  const signIn = (data) => {
    try {
      verifyOtp({
        mobile_number: Number(data.mobilenumber),
        otp_number: Number(data.otp),
      })
        .unwrap()
        .then((res) => {
          const { user, ...rest } = res;
          dispatch(addTokens(rest));
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
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
