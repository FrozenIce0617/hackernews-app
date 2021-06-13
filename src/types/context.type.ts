export type ItemType = {
  id: string;
  text?: string;
  by?: string;
  kids?: string[];
  title: string;
  url: string;
  score: number;
  descendants: string[];
  type: string;
  time: string;
};

export type UserType = {
  id: string;
  karma: number;
};

export type ItemMap = { [key: string]: ItemType };

export type UserMap = { [name: string]: UserType };

export interface Action<T = any> {
  type: T;
  payload?: T;
}

export interface AppState {
  _loading?: boolean;
  items?: ItemMap;
  users?: UserMap;
  stories?: Array<string>;
  fetchStories?: () => {};
  fetchItem?: (id: string) => {};
  fetchUser?: (name: string) => {};
}
