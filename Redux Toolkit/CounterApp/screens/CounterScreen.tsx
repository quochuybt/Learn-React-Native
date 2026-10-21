import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { descrement, increment } from '../store/counterSlice';

const CounterScreen = () => {
    const dispatch = useDispatch()
    const counter= useSelector((state:RootState)=>state.counter.value)
  return (
    <View>
     <Text>{counter}</Text>
     <TouchableOpacity onPress={() => dispatch(increment())}>
       <Text>+ Tăng</Text>
     </TouchableOpacity>
     <TouchableOpacity onPress={() => dispatch(descrement())}>
       <Text>- Giảm</Text>
     </TouchableOpacity>
    </View>
  )
}

export default CounterScreen
