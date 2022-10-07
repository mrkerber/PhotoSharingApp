import React, { useRef } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { FilmRoll } from "../../interfaces/FilmRoll";
import { Picker } from "@react-native-picker/picker";
import * as DBConnect from "../../api/DBConnect";

const RollPreview = (props) => {
   const [availableRolls, setAvailableRolls] = React.useState<FilmRoll[]>([])

   const currentRoll: FilmRoll = props.currentRoll;
   let debug = true;

   const fetchAvailableRollsAsync = async() => {
      console.log('absolutely fetching')
      await DBConnect.fetchRollsByUser('mrkerber').then(async (rolls) => {
         console.log("TESTTTT" + rolls)
         let fetchedRolls = [];
         for(let roll of rolls) {
            fetchedRolls.push(await DBConnect.fetchRoll(roll));
         }
         setAvailableRolls(fetchedRolls);
      })
   }

   const remainingPhotosOnRoll = () : number => {
      if(currentRoll.photos)
         return 13 - (Object.keys(currentRoll.photos).length)
      else
         return 13
   }

   const rollPickerHandler = (rollTitle, rollID) => {
      props.onRollChange(rollID)
   }
   // if(availableRolls.length === 0) {
   if(debug) {
      debug = false;
      fetchAvailableRollsAsync()
   } else {
      return (
         <View style={styles.rollPreviewContainer}>
            <View style={styles.rollPreviewTextContainer}>
               <Text style={styles.rollPreviewText}>Photos remaining: {remainingPhotosOnRoll()}</Text>
            </View>
            {/* <Picker
               selectedValue={currentRoll.title}
               onValueChange={rollPickerHandler}
               style={styles.pickerStyle}
            >
               {availableRolls.map((roll) => {
                  return <Picker.Item label={roll.title} value={roll.id} />
               })}
            </Picker> */}
         </View>
      );
   }
}

const styles = StyleSheet.create({
   rollPreviewContainer: {
      height: 100,
      marginTop:'5%',
      width: '100%',
      backgroundColor: "#1e2b22",
      alignItems: 'flex-start',
      flexDirection: 'row',
      flex: 1
   },
   rollPreviewText: {
      backgroundColor: '#1e2b22',
      color: '#CFCBAB',
   },
   rollPreviewTextContainer: {
      height: '100%',
      alignItems:'center',
      justifyContent: 'center',
      width: '50%',
   },
   pickerStyle: {
      height: '100%',
      width: '50%',
      color: '#CFCBAB',
   }
})

export default RollPreview;