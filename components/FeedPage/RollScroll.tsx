import { isReactNative } from "@firebase/util";
import React, { useLayoutEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text, ScrollView, Image } from "react-native";
import * as DBConnect from "../../api/DBConnect";
import * as StorageConnect from "../../api/StorageConnect";
import RollPhoto from "./RollPhoto";

const RollScroll = (props) => {
   const [photoURLs, setPhotoURLs] = React.useState<string[]>([]);

   const compilePhotos = async () => {
      const result = await DBConnect.fetchPhotoIDsByRoll(props.rollID);
      const photoIDs = Object.keys(result);
      let fetchedURLs = [];
      for (let id of photoIDs) {
         fetchedURLs.push(await StorageConnect.fetchPhotoAsync(id))
      }
      setPhotoURLs(fetchedURLs);
   }

   if(photoURLs.length === 0){
      compilePhotos();
   } else {
      return (
         <ScrollView horizontal={true}>
            <View style={styles.photoScroller}>
               {photoURLs.map((url) => {
                  console.log(url)
                  return <RollPhoto key={url} photoURL={url}></RollPhoto>
               })}
            </View>
         </ScrollView>
      );
   }
}

const styles = StyleSheet.create({
   photoScroller: {
      backgroundColor: '#17201a',
      alignItems: 'flex-start',
      width: '100%',
      height: '10%',
      minHeight: 75,
      flexDirection: 'row'
   }
})


export default RollScroll;