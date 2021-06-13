import React, { ReactElement } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useApp } from "@src/context";
import NewsItem from "@src/components/NewsItem";
import { colors } from "@src/utils";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const logoIcon = (
  <FontAwesome5 name="hacker-news-square" size={30} color={colors.headColor} />
);

const loadingIcon = <ActivityIndicator size={30} />;

const MainView: React.FC = () => {
  const [appState] = useApp();
  const [storyList, setStoryList] = React.useState<string[]>([]);
  const { fetchStories, stories, items, _loading } = appState;

  React.useEffect(() => {
    fetchStories();
  }, []);

  const sortFn = (a: string, b: string): number => {
    if (storyList && items) {
      const scoreA = items[a]?.score;
      const scoreB = items[b]?.score;
      if (scoreA && scoreB) {
        if (scoreA > scoreB) return -1;
        else if (scoreB > scoreA) return 1;
        else return 0;
      }
    }
    return 0;
  };

  React.useEffect(() => {
    if (stories?.length > 0 && storyList.length < 1) {
      setStoryList(stories);
    }
  }, [stories]);

  const renderHeader = (): ReactElement => {
    return (
      <View style={styles.header}>
        {logoIcon}
        <Text
          style={{
            fontSize: 25,
            fontWeight: "600",
            marginLeft: 10,
            color: colors.headColor,
          }}
        >
          {storyList?.length ? "Hacker News" : ""}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.mainView}>
      {_loading ? (
        <View style={styles.loading}>{loadingIcon}</View>
      ) : (
        <FlatList
          testID="news-list"
          data={storyList.sort(sortFn)}
          renderItem={({ item }) => <NewsItem id={item} />}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={renderHeader()}
          stickyHeaderIndices={[0]}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    backgroundColor: colors.background,
    height: "100%",
  },

  header: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: colors.headBg,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MainView;
