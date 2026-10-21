import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ProductScreen from './ProductScreen'
import CartScreen from './CartScreen'

const HomeScreen = () => {
  return (
    <View style={{flex:1}}>
        <ProductScreen/>
         <CartScreen />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})