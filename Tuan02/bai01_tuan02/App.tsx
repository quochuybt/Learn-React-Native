import {useState} from 'react';
import {View, FlatList, Text} from 'react-native';

interface myType {
  userId:string
  id:string
  title:string
  completed:boolean
}
const NewsFeed = () => {
  const [news, setNews] = useState<myType[]>([])

  const fetchData = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/todos")
    const data = await res.json()
    setNews(data)
  }
  fetchData()

  return (
    <View>
      <FlatList data={news} renderItem={({item})=>{
        return (
          <>
            <Text>{item.id}</Text>
            <Text>{item.userId}</Text>
            <Text>{item.title}</Text>
            <Text>{item.completed?"true":"false"}</Text>
          </>
        )
      }} keyExtractor={item=>item.id.toString()}/>
    </View>
  );
};


export default NewsFeed;