import React from "react";
import { View, StyleSheet, TouchableOpacity, Text, ScrollView, Image } from "react-native";
import * as DBConnect from "../../api/DBConnect";
import RollScroll from "./RollScroll";

const HomePage = (props) => {

   const buildFeed = async () => {
      DBConnect.fetchUsers();
   }

   const testAPI = async () => {
      // DBConnect.fetchRollsByUser('mrkerber');
      // DBConnect.createUser('deherman')
      // DBConnect.createRoll('mrkerber', 'testroll')
      // DBConnect.uploadImageAsync('test')
      // await DBConnect.fetchCurrentRollID('mrkerber'));
      DBConnect.fetchPhotoIDsByRoll('-NCVybtVLZzveQeQ8QhT');
   }
   
   return (
      <View style={styles.homePageContainer}>
         {/* <Text>TEST</Text>
         <TouchableOpacity onPress={testAPI}><Text style={{color:'white', height:50}}>DEBUG</Text></TouchableOpacity> */}
         <View style={styles.rollFeed}>
            {/* <RollScroll rollID='-NCVybtVLZzveQeQ8QhT'></RollScroll> */}
         </View>
      </View>
   );

}

const styles = StyleSheet.create({
   homePageContainer: {
      justifyContent: 'center',
      alignContent: 'center',
      height: '90%',
      backgroundColor: "#1e2b22"
   },
   testText: {
      color:'white',
      height:50
   },
   rollFeed: {
      height: '100%',
      justifyContent: 'center',
      alignContent: 'center',
      flex: 1
   },
   userPhoto: {
      width: 500,
      height: 1000
   }
})

export default HomePage;