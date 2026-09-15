import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../components/Header'
import CategoryChip from '../components/CategoryChip'
import BookCard from '../components/BookCard'
import BookStoreScreen from './BookStoreScreen'

const HomeScreen = () => {
  return (
    <View>
        <Header/>
        <CategoryChip/>
        <BookStoreScreen/>
    </View>
    
  )
}

export default HomeScreen

const styles = StyleSheet.create({})