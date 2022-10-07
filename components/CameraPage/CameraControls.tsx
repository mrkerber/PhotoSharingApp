import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";

const CameraControls = (props) => {


   return (
      <View style={styles.controlsContainer}>
         <View style={styles.cameraButtonContainer}>
            <TouchableOpacity
               style={styles.cameraButton}
               onPress={props.capturePhoto}
            >
               <View style={styles.cameraButtonOverlay}></View>
            </TouchableOpacity>
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   controlsContainer: {
      flex: 1,
      backgroundColor: "#1e2b22",
      height: '100%'
   },
   cameraButtonContainer: {
      alignSelf: "center",
      flex: 1,
      alignItems: "center",
   },
   cameraButton: {
      width: 100,
      height: '90%',
      top: '5%',
      borderRadius: 50,
      backgroundColor: "#888",
      alignItems: "center"
   },
   cameraButtonOverlay: {
      width: 80,
      height: '80%',
      top: '10%',
      borderRadius: 50,
      backgroundColor: "#666"
   }
})

export default CameraControls;