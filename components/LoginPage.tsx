import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

const LoginPage = (props) => {
   const userLoginAsync = () => {
      props.onLogin(true)
   }

   return (
      <View style={styles.container}>
         <TouchableOpacity>
            <Text style={styles.landingText}
            onPress={userLoginAsync}
            >LOGIN</Text>
         </TouchableOpacity>
      </View>
   )
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#1e2b22',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%'
   },
   landingText: {
      backgroundColor: '#1e2b22',
      color: '#CFCBAB'
   }
})

export default LoginPage;