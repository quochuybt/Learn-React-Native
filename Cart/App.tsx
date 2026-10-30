// App.tsx
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { store } from "./src/store";

import ProductListScreen from "./src/screens/ProductListScreen";
import CartScreen from "./src/screens/CartScreen";

export type RootStackParamList = {
  ProductList: undefined;
  Cart: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="ProductList"
      screenOptions={{
        headerStyle: { backgroundColor: "#2f80ed" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "700" },
      }}
    >
      <Stack.Screen
        name="ProductList"
        component={ProductListScreen}
        options={{ title: "Sản phẩm" }}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{ title: "Giỏ hàng" }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </Provider>
  );
}
