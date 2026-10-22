import React from "react";
import { StyleSheet, ScrollView, SafeAreaView } from "react-native";
import Header from "../components/Header";
import CategoryChip from "../components/CategoryChip";
import BookStoreScreen from "./BookStoreScreen";
import FloatingCardButton from "../components/FloatingCardButton";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        <CategoryChip />
        <BookStoreScreen />
      </ScrollView>
      <FloatingCardButton />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
