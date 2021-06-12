import useAppDispatch from "./dispatch_hook";
import useAppState from "./state_hook";
import { request } from "@src/utils";
import { topStoriesUrl, getItemUrl, getUserUrl } from "@src/utils";
import { numStoriesToDisplay } from '@src/utils'

function useApp() {
  const appDispatch = useAppDispatch();

  const setLoadingStatus = (status: boolean) => {
    console.log("setting loading", status);
    appDispatch({
      type: "SET_LOADING",
      payload: status,
    });
  };

  const fetchUser = async (name: string) => {
    const user = await request<any>({
      method: "GET",
      url: getUserUrl(name),
    });

    appDispatch({
      type: "UPDATE_USER",
      payload: user,
    });
  };

  const fetchItem = async (id: string) => {
    const story = await request<any>({
      method: "GET",
      url: getItemUrl(id),
    });

    appDispatch({
      type: "UPDATE_STORY",
      payload: story || {},
    });
  };

  const fetchStories = async () => {
    setLoadingStatus(true);
    const storyList = await request<any>({
      method: "GET",
      url: topStoriesUrl,
    });

    if (storyList) {
      const filteredList = storyList
        .sort(() => 0.5 - Math.random())
        .slice(0, numStoriesToDisplay);
      const storyPromise = filteredList.map(
        (story) =>
          new Promise((resolve, reject) => {
            fetchItem(story)
              .then((res) => resolve(res))
              .catch((err) => reject(err));
          })
      );

      await Promise.all(storyPromise);

      appDispatch({
        type: "SET_STORY_IDS",
        payload: filteredList || [],
      });
    }

    setLoadingStatus(false);
  };

  const initialData = {
    fetchStories,
    fetchItem,
    fetchUser,
  };

  const appState = useAppState(initialData);

  return [appState, appDispatch];
}

export default useApp;
