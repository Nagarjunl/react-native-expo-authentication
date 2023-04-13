import React, { useEffect, useState } from "react";
import { StyleSheet, Button, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { removeTokens } from "../features/auth/authSlice";

import { useGetMembersQuery } from "../services/membersAPI";

const Home = () => {
  const dispatch = useDispatch();
  const [members, setMembers] = useState([]);

  const { data: membersList, isLoading } = useGetMembersQuery();

  const signOut = () => {
    dispatch(removeTokens());
  };

  useEffect(() => {
    if (!isLoading) {
      setMembers(membersList);
    }
  }, [isLoading, membersList]);

  console.log(membersList);

  return (
    <View style={styles.container}>
      {members &&
        members.map((member) => (
          <Text style={styles.bigBlue}>{member.name}</Text>
        ))}

      <Button title="Sign out" onPress={signOut} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  bigBlue: {
    color: "blue",
    fontWeight: "bold",
    fontSize: 30,
  },
});
export default Home;