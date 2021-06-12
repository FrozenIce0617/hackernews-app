/**
 * Hacker News App
 *
 * @format
 */

import React from "react";
import { SafeAreaView } from "react-native";
import { AppProvider } from "@src/context";
import MainView from "@src/views/MainView";

const App = () => {
  return (
    <AppProvider>
      <SafeAreaView>
        <MainView />
      </SafeAreaView>
    </AppProvider>
  );
};

export default App;
