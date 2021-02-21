import React from 'react';
import { StyleSheet, View } from 'react-native';
import LoginPage from "./components/login/LoginPage";
import AppPanel from "./components/AppPanel";

export default function App() {
  return (
    <View style={styles.container}>
      <AppPanel/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
