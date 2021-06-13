import { UserType } from "@src/types";
import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useApp } from "@src/context";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const userIcon = <FontAwesome5 name="feather" size={14} />;

const karmaIcon = <FontAwesome5 name="dharmachakra" size={14} />;

const loadingIcon = <ActivityIndicator size={10} />;

type Props = {
  name: string;
};

const styles = StyleSheet.create<any>({
  container: {},
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
        <View>{loadingIcon}</View>
      ) : (
        <Text key={`${user?.id}`}>
          {userIcon} {name}, {karmaIcon} {user?.karma}
        </Text>
      )}
    </View>
  );
};

export default UserItem;
