import { StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";
import React from "react";
import Header from "../components/Header";
import CategoryChip from "../components/CategoryChip";
import BookCard from "../components/BookCard";
import BookStoreScreen from "./BookStoreScreen";
import FloatingCardButton from "../components/FloatingCardButton";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
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
  },
});
