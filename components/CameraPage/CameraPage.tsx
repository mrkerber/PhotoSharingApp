import React, { Component } from "react";
import { Camera } from "expo-camera";
import { BlurView } from "expo-blur";
import { Dimensions, View, StyleSheet, TouchableOpacity, Text } from "react-native";
import CameraControls from "./CameraControls";
import RollPreview from "./RollPreview";
import { FilmRoll } from "../../interfaces/FilmRoll";
import { Photo } from "../../interfaces/Photo";
import { manipulateAsync } from "expo-image-manipulator";
import * as DBConnect from "../../api/DBConnect"
import * as Sharing from "expo-sharing";

const CameraPage = (props) => {
   const [cameraActive, setCameraActive] = React.useState(false);
   const [cameraDimensions, setCameraDimensions] = React.useState({width:0,height:0});
   const [cameraRef, setCameraRef] = React.useState<Camera>(undefined);
   const [currentRoll, setCurrentRoll] = React.useState<FilmRoll>(undefined);
   const [currentPhoto, setCurrentPhoto] = React.useState<Photo>(undefined);

   const rollChangeHandler = async (newRoll: FilmRoll) => {
      setCurrentRoll(newRoll);
   }

   const getCurrentRollAsync = async (): Promise<FilmRoll> => {
      return new Promise<FilmRoll>(async(resolve, reject) => {
         DBConnect.fetchCurrentRollID('mrkerber').then((rollID) => {
            DBConnect.fetchRoll(rollID).then((roll) => {
               resolve(roll);
            })
         });
      })
   }

   const uploadPicture = async (newPhoto: Photo) => {
      const resizedPhoto = await manipulateAsync(
         newPhoto.uri,
         [
            {resize: {
               height: 1920,
               width: 1440
            }}
         ],
         {compress:.55}
      )
      await DBConnect.createPhoto(resizedPhoto.uri, currentRoll.id);
      await getCurrentRollAsync().then((roll) => {
         setCurrentRoll(roll);
      })
   }
   
   const setCameraDimensionsAsync = async () => {
      let screenWidth = Dimensions.get('window').width;
      let screenHeight = Math.round((screenWidth * 4) / 3);
      setCameraDimensions({width:screenWidth,height:screenHeight});
   }

   const openCameraAsync = async () => {
      let permissionResult = await Camera.requestCameraPermissionsAsync();
      if (permissionResult.granted === true) {
         await getCurrentRollAsync().then((roll) => {
            setCameraActive(true);
            setCurrentRoll(roll);
            setCameraDimensionsAsync();
         });
      } else {
         alert('Permission to access camera is required');
         return;
      }
   }

   const capturePhotoAsync = async () => {
      if (!cameraActive) return;
      let capturedPhoto = await cameraRef.takePictureAsync()
      console.log(capturedPhoto)
      let newPhoto: Photo = {
         id: 'rand',
         uri: capturedPhoto.uri,
         pictureInfo: 'placeholder'
      }
      uploadPicture(newPhoto);
   }

   if(!cameraActive) {
      openCameraAsync();
   }
   else {
      return (
         <View style={styles.cameraPageContainer}>
            <RollPreview
               currentRoll={currentRoll}
               onRollChange={rollChangeHandler}
            ></RollPreview>
            <Camera
               style={{width: cameraDimensions.width, height: cameraDimensions.height}}
               ref={(r) => {
                  setCameraRef(r);
               }}
               ratio='4:3'
            >
               <BlurView
                     intensity={100}
                     tint = 'dark'
                     style={styles.cameraOverlay}
               >
               </BlurView>
            </Camera>
            <CameraControls capturePhoto={capturePhotoAsync}></CameraControls>
         </View>
      );
   }
}

const styles = StyleSheet.create({
   cameraOverlay: {
      flex: 1,
      padding: 20,
      justifyContent: 'center',
   },
   cameraPageContainer: {
      justifyContent: 'center',
      height: '90%',
      backgroundColor: "#1e2b22"
   }
})

export default CameraPage;