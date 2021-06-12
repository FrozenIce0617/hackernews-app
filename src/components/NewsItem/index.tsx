import { ItemType } from "@src/types";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useApp } from "@src/context";
import UserItem from '@src/components/UserItem'

type Props = {
  id: string;
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

const NewsItem: React.FC<Props> = ({ id }) => {
  const [appState] = useApp();
  const { fetchItem, items, users } = appState;
  const [item, setItem] = React.useState<ItemType>(null);

  const [expended, setExpended] = React.useState(false);

  React.useEffect(() => {
    !item && !items[id] && fetchItem(id);
  }, [id]);

  React.useEffect(() => {
    const story = items[id] || null;
    story && !item && setItem(story);
  }, [items, item]);

  const handleExpend = () => {
    setExpended(!expended);
  };

  return (
    <View>
      {!item ? (
        <Text>Loading...</Text>
      ) : (
        <View style={styles.container}>
          <TouchableOpacity onPress={handleExpend}>
            <Text style={styles.title} key={`${item?.id}@${item?.title}`}>{item?.title}</Text>
          </TouchableOpacity>
          {expended && (
            <View>
              <Text key={`${item?.id}@${item?.score}`}>
                {item?.score}
              </Text>
              <Text key={`${item?.id}@${item?.url}`}>{item?.url}</Text>
              <Text key={`${item?.time}@${item?.time}`}>
                {item?.time}
              </Text>
              <UserItem name={item.by}/>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default NewsItem;
