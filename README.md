### Mini Hacker News App

This is a simple Hacker News Client App on React Native.
<p align="center">
    <img src="./screenshots/news_list_01.png" alt="screenshot"
	width="350" height="700" />
    <img src="./screenshots/news_list_02.png" alt="screenshot"
	width="350" height="700" />
    <img src="./screenshots/news_list_03.png" alt="screenshot"
	width="350" height="700" />
</p>

## Features
- The news list page contains a list of hacker news
- Random, sorted by score, 30 maximum news
- Click the news ticket to see author name, karma, time
- Show the time ago ( such as '2 days ago', '3 mins ago' )

## Topic
- My own light version of redux with context API for state management
- React Hooks
- Hackernews API

## Dependencies
- axios 0.21.1
- react 17.0.1
- react-native 0.64.1
- react-native-vector-icons 8.1.0

## How to run
1. Clone the repo
``` 
git clone https://github.com/FrozenIce0617/hackernews-app.git 
```

2. Install dependencies
```
yarn

yarn install:ios
```

3. Run project
```
yarn ios
```