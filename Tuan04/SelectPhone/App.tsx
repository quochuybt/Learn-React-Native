import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import PhoneDetail from "./src/screens/PhoneDetail";
import SelectColor from "./src/screens/SelectColor";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="PhoneDetail"
          component={PhoneDetail}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="SelectColor"
          component={SelectColor}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
