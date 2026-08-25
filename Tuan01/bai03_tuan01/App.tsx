import React, { useState } from 'react';
import { View, Text } from 'react-native';

interface todoType {
  id:string,
  title:string
}

const Todo = () => {
  const [todo, setTodo] = useState<todoType[]>([
    {id:"01",title:"nau com"},
    {id:"02",title:"rua chen"},
    {id:"03",title:"an com"},
  ]);
  return (
    <View>
      {todo.map((x)=>{
        return (
            <Text>Viec {x.id} - {x.title}</Text>
        )
      })}
    </View>
  );
};

export default Todo;