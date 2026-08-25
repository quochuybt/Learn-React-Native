import {useState} from 'react';
import {Text} from 'react-native';

type geoType = {
  lat:string
  lng:string
}

type addressType = {
  street:string
  suite:string
  city:string
  zipcode:string
  geo:geoType
}

type companyType = {
  name:string
  catchPhrase:string
  bs:string
}
interface userType {
  id:string
  name:string
  username:string
  email:string
  address:addressType
  phone:string
  website:string
  company:companyType
}
const UserProfileDetail = () => {
  const [user, setUser] =useState<userType>({})

  const fetchData = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/users/1")
    const data = await res.json()
    setUser(data)
  }

  fetchData()

  return (
    <>
      <Text>{user.id}</Text>
      <Text>{user.name}</Text>
      <Text>{user.username}</Text>
      <Text>{user.email}</Text>
      <Text>{user?.address?.street}</Text>
      <Text>{user?.address?.suite}</Text>
      <Text>{user?.address?.city}</Text>
      <Text>{user?.address?.zipcode}</Text>
      <Text>{user?.address?.geo?.lat}</Text>
      <Text>{user?.address?.geo?.lng}</Text>
      <Text>{user.phone}</Text>
      <Text>{user.website}</Text>
      <Text>{user?.company?.name}</Text>
      <Text>{user?.company?.catchPhrase}</Text>
      <Text>{user?.company?.bs}</Text>
    </>
  );
};


export default UserProfileDetail;