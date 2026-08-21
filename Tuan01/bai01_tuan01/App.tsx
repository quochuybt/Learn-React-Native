import {StyleSheet, Text, View} from 'react-native';

interface userType {
  name:string,
  age:number,
  isAdmin:boolean
}

const UserCard = ({name,age,isAdmin}:userType) => {
  return (
    <View>
      <Text>{name}</Text>
      <Text>{age}</Text>
      <Text>{isAdmin?"admin":"user"}</Text>
    </View>
  );
};

const Test = () => {
  return (
    <View>
      <UserCard name="Huy" age={21} isAdmin={false}/>
    </View>
  );
};


export default Test;