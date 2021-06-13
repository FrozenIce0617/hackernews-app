import { ItemType } from "@src/types";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useApp } from "@src/context";
import UserItem from "@src/components/UserItem";
import { colors, getHostName, timeAgo } from "@src/utils";

const loadingIcon = <ActivityIndicator size={30} />;

type Props = {
  id: string;
};

const styles = StyleSheet.create<any>({
  container: {
    margin: 10,
    marginBottom: 0,
    padding: 10,
    backgroundColor: colors.itemBodyBg,
    borderRadius: 5,
  },
  content: {
    paddingLeft: 45,
  },
  title: {
    color: "black",
    fontWeight: "bold",
    flex: 1,
    flexDirection: "row",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },

  score: {
    textAlign: "center",
    width: 40,
    marginRight: 5,
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
  },
  info: { flex: 1, flexDirection: "row", justifyContent: "space-between" },
  url: {
    padding: 5,
    textAlign: "left",
    color: "#73706E",
  },
});

const NewsItem: React.FC<Props> = ({ id }) => {
  const [appState] = useApp();
  const { fetchItem, items } = appState;
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
      <TouchableOpacity onPress={handleExpend}>
        {!item ? (
          <View>{loadingIcon}</View>
        ) : (
          <View style={styles.container}>
            <View style={styles.title}>
              <Text key={`${item?.id}@${item?.score}`} style={styles.score}>
                {item?.score}
              </Text>
              <Text style={styles.title} key={`${item?.id}@${item?.title}`}>
                {item?.title}
              </Text>
            </View>
            <View>
              {expended && (
                <View style={styles.content}>
                  <Text key={`${item?.id}@${item?.url}`} style={styles.url}>
                    {getHostName(item?.url)}
                  </Text>
                  <View style={styles.info}>
                    <UserItem name={item.by} />
                    <Text key={`${item?.time}@${item?.time}`}>
                      {timeAgo(item?.time)}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default NewsItem;
