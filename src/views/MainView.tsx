import React, { ReactElement } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useApp } from "@src/context";
import NewsItem from "@src/components/NewsItem";
import { colors } from "@src/utils";

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
      <View>
        <Text style={styles.header}>
          {storyList?.length ? "Hacker News" : ""}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.mainView}>
      {_loading ? (
        <Text>Loading...</Text>
      ) : (
        <FlatList
          testID="news-list"
          data={storyList.sort(sortFn)}
          renderItem={({ item }) => <NewsItem id={item} />}
          keyExtractor={(item, index) => index.toString()}
          ListHeaderComponent={renderHeader()}
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
    backgroundColor: colors.headBg,
    color: colors.headColor,
    padding: 20,
    height: 60,
    fontSize: 25,
    fontWeight: "800",
  },
  loadingTitle: {
    backgroundColor: colors.loadingTextPlaceholder,
    height: 17,
    marginTop: 3,
    marginBottom: 3,
  },
});

export default MainView;
