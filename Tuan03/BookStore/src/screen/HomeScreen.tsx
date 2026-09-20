import { StyleSheet, Text, View, ScrollView, SafeAreaView } from "react-native";
import Header from "../components/Header";
import CategoryChip from "../components/CategoryChip";
import BookStoreScreen from "./BookStoreScreen";
import FloatingCardButton from "../components/FloatingCardButton";
import BottomTabBar from "../components/BottomTabBar";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../App";

const HomeScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (index: number) => {
    setActiveTab(index);
    if (index === 2) {
      navigation.navigate("Cart");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <CategoryChip />
        <BookStoreScreen />
      </ScrollView>
      <FloatingCardButton />
      <BottomTabBar activeTab={activeTab} onChange={handleTabChange} />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
