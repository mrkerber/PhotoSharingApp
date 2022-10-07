import React, { useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text, ScrollView, Image } from "react-native";
import * as DBConnect from "../../api/DBConnect";
import * as StorageConnect from "../../api/StorageConnect";

const RollPhoto = (props) => {
   

   return (
      <Image style={styles.userPhoto} source={{uri: props.photoURL}}></Image>
   )
}

const styles = StyleSheet.create({
   userPhoto: {
      width: 300,
      height: 300
   }
})


export default RollPhoto;