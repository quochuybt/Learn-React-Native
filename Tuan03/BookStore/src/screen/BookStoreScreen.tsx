import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import BookCard from '../components/BookCard'

const books = [
    {source:require("../../assets/biasach.jpg"),title:"Săn cá thần",author:"Huy",price:200000,discount:20},
    {source:require("../../assets/biasach.jpg"),title:"Săn cá thần",author:"Huy",price:200000,discount:10},
    {source:require("../../assets/biasach.jpg"),title:"Săn cá thần",author:"Huy",price:200000,discount:15},
    {source:require("../../assets/biasach.jpg"),title:"Săn cá thần",author:"Huy",price:200000,discount:21}
]

const BookStoreScreen = () => {
  return (
    <View style={styles.container}>
      {books.map((book)=>{
        return <BookCard book={book}/>
      })}
    </View>
  )
}

export default BookStoreScreen

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
      },
})