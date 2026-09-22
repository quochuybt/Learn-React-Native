import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import PhoneDetail from "./src/screens/PhoneDetail";
import SelectColor from "./src/screens/SelectColor";

export default function App() {
  return (
    <View>
      <PhoneDetail />
    </View>
  );
}

const styles = StyleSheet.create({});
