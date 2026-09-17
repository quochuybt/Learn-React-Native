import { StyleSheet, Text, View, ScrollView } from "react-native";
import React from "react";
import Header from "../components/Header";
import CategoryChip from "../components/CategoryChip";
import BookCard from "../components/BookCard";
import BookStoreScreen from "./BookStoreScreen";
import FloatingCardButton from "../components/FloatingCardButton";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <Header />
        <CategoryChip />
        <BookStoreScreen />
      </ScrollView>
      <FloatingCardButton />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
