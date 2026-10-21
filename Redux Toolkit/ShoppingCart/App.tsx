import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import CartScreen from './screen/CartScreen';
import { store } from './store';
import ProductScreen from './screen/ProductScreen';
import HomeScreen from './screen/HomeScreen';

export default function App() {
  return (
    <Provider store={store}>
      <HomeScreen/>
    </Provider>
  );
}

const styles = StyleSheet.create({
});
