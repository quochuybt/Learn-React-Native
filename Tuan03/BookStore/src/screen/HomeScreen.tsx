import { StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";
import Header from "../components/Header";
import CategoryChip from "../components/CategoryChip";
import BookStoreScreen from "./BookStoreScreen";
import FloatingCardButton from "../components/FloatingCardButton";
import BottomTabBar from "../components/BottomTabBar";
import { useState } from "react";

const HomeScreen = () => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <CategoryChip />
        <BookStoreScreen />
      </ScrollView>
      <FloatingCardButton />
      <BottomTabBar activeTab={activeTab} onChange={setActiveTab}/>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
