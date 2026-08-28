import {View,ActivityIndicator,Text} from 'react-native';

type LoadingType = {
  isLoading: boolean
  children?: React.ReactNode
}

const LoadingWrapper = ({isLoading,children}:LoadingType) => {
  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size="large" />
        <Text>Đang tải...</Text>
      </View>
    );
  }

  return <>{children}</>;
};

const Test = () => {
  return (
    <LoadingWrapper isLoading={true}>
      <Text>Hello</Text>
    </LoadingWrapper>
  );
}


export default Test;