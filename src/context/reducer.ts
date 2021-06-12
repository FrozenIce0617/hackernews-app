import { AppState, Action } from "@src/types";

export const initialState = {
  _loading: false,
  items: {},
  users: {},
  stories: [],
};

const reducer = (state: AppState = initialState, action: Action) => {
  const { type, payload } = action;
  switch (type) {
    case "SET_LOADING": {
      return {
        ...state,
        _loading: payload,
      };
    }

    case "SET_STORY_IDS": {
      return {
        ...state,
        stories: payload,
      };
    }
    case "UPDATE_STORY": {
      return {
        ...state,
        items: { ...state.items, ...{ [payload.id]: payload } },
      };
    }

    case "UPDATE_USER": {
      return {
        ...state,
        users: { ...state.users, ...{ [payload.id]: payload } },
      };
    }

    default: {
      throw new Error(`Unhandled action type: ${type}`);
    }
  }
};

export default reducer;
