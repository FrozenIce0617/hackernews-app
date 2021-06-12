import { UserType } from "@src/types";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useApp } from "@src/context";

type Props = {
  name: string;
};

const styles = StyleSheet.create<any>({
  container: {
    paddingBottom: 7,
    paddingTop: 7,
    marginLeft: 15,
    marginRight: 0,
    borderWidth: 0,
    borderColor: "#d6d7da",
    borderBottomWidth: 0.5,
  },
  title: { color: "blue" },
});

const UserItem: React.FC<Props> = ({ name }) => {
  const [appState] = useApp();
  const { fetchUser, users } = appState;
  const [user, setUser] = React.useState<UserType>(null);

  React.useEffect(() => {
    !user && !users[name] && fetchUser(name);
  }, [name]);

  React.useEffect(() => {
    const userProfile = users[name] || null;
    userProfile && !user && setUser(userProfile);
  }, [users, user]);

  return (
    <View>
      {!user ? (
        <Text>Loading...</Text>
      ) : (
        <View style={styles.container}>
          <Text key={`${user?.id}`}>{name},{user?.karma}</Text>
        </View>
      )}
    </View>
  );
};

export default UserItem;
