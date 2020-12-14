/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text,View, TouchableOpacity } from "react-native";

import FlatListScreen from './src/FlatList'
import FlatListDemo from "./src/FlatListDemo";
import Test from './src/test'

const App = () => {

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Welcome </Text>
      </View>
       {/* <FlatListScreen /> */}
       <FlatListDemo/>
       {/* <Test ></Test> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default App;

// const App: () => React$Node = () => {
//   return (
//     <>
//       <StatusBar barStyle="dark-content" />
//       <SafeAreaView>
    
//       </SafeAreaView>
//     </>
//   );
// };
