export const BASE_URL = "https://hacker-news.firebaseio.com/v0/";
export const topStoriesUrl = `topstories.json`;
export const askStoriesUrl = `askstories.json`;
export const showStoriesUrl = `showstories.json`;
export const newStoriesUrl = `newstories.json`;

export const getItemUrl = (id: string) => `item/${id}.json`;

export const getUserUrl = (name: string) => `user/${name}.json`;

export const numStoriesToDisplay = 30;

export const colors = {
  background: "rgba(245, 167, 66, 0.2)",
  headBg: "#f58442",
  headColor: "#5e5d5b",
  loadingTextPlaceholder: "#999999",
};
