import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

const ToolbarButton = (props) => {

   const onToolbarButtonClick = () => {
      console.log('onToolbarButtonClick')
      props.onClick(props.destination)
   }
   

   return (
      <TouchableOpacity
         style={styles.toolbarButtonContainer}
         onPress={onToolbarButtonClick}
      >
         <Text style={styles.buttonText}>{props.destination}</Text>
      </TouchableOpacity>
   );
}

const styles = StyleSheet.create({
   toolbarButtonContainer: {
      flex: 1,
      backgroundColor: '#FFF1',
      alignItems: 'center',
      width: '20%',
      height: '100%',
      justifyContent: 'center',
      borderRadius: 20,
      margin: 1
   },
   toolbarButton: {
      flex: 1,
      height: 10,
      backgroundColor: 'black'
   },
   buttonText: {
      color: '#cfcbab',
   }
})

export default ToolbarButton;