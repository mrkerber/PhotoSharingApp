import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CameraPage from './components/CameraPage/CameraPage';
import LoginPage from './components/LoginPage';
import Toolbar from './components/Toolbars/Toolbar';
import CameraToolbar from './components/Toolbars/CameraToolbar'
import HomePage from './components/FeedPage/HomePage';
import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { getDatabase } from 'firebase/database';

export default function App() {
   const [loggedIn, setLoggedIn] = React.useState(false);
   const [currentPage, setCurrentPage] = React.useState('home');

   const setLoggedInHandler = (login) => {
      console.log('you are now logged in');
      if(login) {
         setLoggedIn(true);
      } else {
         setLoggedIn(false);
      }
   };

   const setCurrentPageHandler = (page) => {
      console.log('setCurrentPageHandler', page);
      setCurrentPage(page);
   }

   if(!loggedIn) {
      return (
         <View style={styles.container}>
            <LoginPage loggedIn={loggedIn} onLogin={setLoggedInHandler}></LoginPage>
         </View>
      );
   }
   if(currentPage === 'home') {
      return (
         <View style={styles.container}>
            <HomePage></HomePage>
            <Toolbar onPageChange={setCurrentPageHandler}></Toolbar>
         </View>
      );
   }
   if(currentPage === 'camera') {
      return (
         <View style={styles.container}>
            <CameraPage></CameraPage>
            <Toolbar onPageChange={setCurrentPageHandler}></Toolbar>
         </View>
      )
   }
   // if(currentPage === '')
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#1e2b22',
      alignItems: 'center',
      justifyContent: 'center'
   },
   appContainer: {
      flex: 1
   }
});


const firebaseConfig = {
   apiKey: "AIzaSyBF1KogKCFW6Qd9Bxq7p3FvLcjy-jJfCsw",
   authDomain: "roll-1516f.firebaseapp.com",
   projectId: "roll-1516f",
   storageBucket: "roll-1516f.appspot.com",
   messagingSenderId: "524841596327",
   appId: "1:524841596327:web:c3a3c5d2c56892e311f282",
   measurementId: "G-39Z61TBW43",
   databaseURL: 'https://roll-1516f-default-rtdb.firebaseio.com/'
};
 
 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
// 
 const database = getDatabase(app);