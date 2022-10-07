import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import ToolbarButton from "./ToolbarButton";

const CameraToolbar = (props) => {

   const toolbarButtonClickHandler = (page) => {
      console.log('toolbarButtonClickHandler', page);
      props.onPageChange(page);
   }

   const toolbarButtons = [
      'home',
      'feed',
      '',
      'profile',
      'gear'
   ]

   return (
      <View style={styles.toolbarContainer}>
         {toolbarButtons.map((data) => {
            return(
               <ToolbarButton onClick={toolbarButtonClickHandler} destination={data} key={data}></ToolbarButton>
            )
         })}
      </View>
   )
}

const styles = StyleSheet.create({
   toolbarContainer: {
      backgroundColor: '#17201a',
      alignItems: 'flex-start',
      width: '100%',
      height: '10%',
      minHeight: 75,
      flexDirection: 'row'
   }
})

export default CameraToolbar;