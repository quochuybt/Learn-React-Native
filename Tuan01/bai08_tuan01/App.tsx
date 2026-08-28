import {View,StyleSheet, Pressable,ActivityIndicator} from 'react-native';

type ButtonVariant = `primary` | `secondary` | `outline` | `danger`
type ButtonSize = `small` | `medium` | `large`
interface myType {
  title:string
  variant:ButtonVariant
  size:ButtonSize
  onPress:()=>void
  disabled:boolean
  loading:boolean
  icon?:React.ReactNode
}

const AppButton = ({title,variant,size,onPress,disabled,loading,icon}:myType) => {
  return (
    <Pressable onPress={onPress} disabled={disabled} style={[
      variant === 'primary' && styles.primary,
      variant === 'secondary' && styles.secondary,
      variant === 'outline' && styles.outline,
      variant === 'danger' && styles.danger,
      size === 'small' && styles.small,
      size === 'medium' && styles.medium,
      size === 'large' && styles.large,
    ]}>
      {loading?<ActivityIndicator/>:<View>{title}</View>}
    </Pressable>
  )
}

const BookStore = () => {
  return (
    <>
    <AppButton title="Thêm vào giỏ hàng" variant="primary" size="small" 
    onPress={()=>console.log("Thêm vào giỏ hàng")} disabled={true} loading={false} />
    <AppButton title="Xem chi tiết" variant="outline" size="medium" 
    onPress={()=>console.log("Xem chi tiết")} disabled={false} loading={false} />
    <AppButton title="Xóa sách" variant="danger" size="large" 
    onPress={()=>console.log("Xóa sách")} disabled={true} loading={true} />
</>
  );
};

const styles = StyleSheet.create({
  primary:{backgroundColor:"blue"},
  secondary:{backgroundColor:"gray"},
  outline:{backgroundColor:"green"},
  danger:{backgroundColor:"red"},
  small:{
    height:32
  },
  medium:{
    height:48
  },
  large:{
    height:56
  }
})

export default BookStore;