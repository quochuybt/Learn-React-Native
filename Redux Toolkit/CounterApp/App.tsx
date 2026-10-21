import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './store';
import CounterScreen from './screens/CounterScreen';

export default function App() {
  return (
    <Provider store={store}>
      <CounterScreen/>
    </Provider>
  );
}

const styles = StyleSheet.create({
  
});
