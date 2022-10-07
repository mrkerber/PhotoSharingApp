import { initializeApp } from 'firebase/app';
import { getAnalytics, isSupported } from 'firebase/analytics';
import { getDatabase, onValue, ref, set, push, update } from 'firebase/database';
import GeneratePushID from './GeneratePushID';
import * as StorageConnect from './StorageConnect';
import { FilmRoll } from '../interfaces/FilmRoll';

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
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export const fetchUsers = () => {
   const userList = ref(database, 'users/');
   onValue(userList, (snapshot) => {
      const data = snapshot.val();
      console.log(data);
   })
   console.log(GeneratePushID()());
}

export const createUser = async(username: string) => {
   const newRef = ref(database, 'users/'+username);
   const pushID = push(ref(database, 'users/'));
   set(newRef, {
      userid:pushID.key,
      rollList:{}
   })
}

export const createRoll = async(owner: string, title: string) => {
   //Create the roll
   const newRef = push(ref(database, 'rolls/'));
   const rollID = newRef.key;
   set(newRef, {
      owner,
      title,
      developed: false
   })

   //Update User with reference to roll
   // let rolls = await fetchRollsByUser(owner);
   // if (rolls === null) rolls = {};
   // rolls[rollID] = true;
   // set(ref(database, 'users/'+owner+'/rollList/'), rolls)
}

export const fetchRollsByUser = async (username: string): Promise<string[]> => {
   return new Promise<string[]>((resolve, reject) => {
      const rollList = ref(database, 'users/' + username + '/rollList/')
      onValue(rollList, async(snapshot) => {
         let data = snapshot.val();
         resolve(Object.keys(data));
      })
   })
}

export const fetchPhotoIDsByRoll = async (rollID: string): Promise<{}> => {
   return new Promise<{}>((resolve, reject) => {
      const photos = ref(database, 'rolls/'+rollID+'/photos');
      onValue(photos, async(snapshot) => {
         const data = snapshot.val();
         resolve(data);
      })
   })
}

export const createPhoto = async(uri: string, rollID: string) => {
   const newRef = push(ref(database, 'photos/'));
   const photoID = newRef.key;
   set(newRef, {
      rollID
   })
   StorageConnect.uploadPhotoAsync(uri, photoID);
   
   //NEED TO UPDATE ROLLS.PHOTOS WITH IMAGE ID
      //CREATE FetchPhotosByRoll
   let photos = await fetchPhotoIDsByRoll(rollID);
   if (photos === null) photos = {};
   photos[photoID] = true;
   console.log(photos)
   set(ref(database, 'rolls/'+rollID+'/photos'), photos);
   // set(rollRef, )
}

export const fetchCurrentRollID = async (username: string): Promise<string> => {
   return new Promise<string>((resolve, reject) => {
      const currentRoll = ref(database, 'users/'+username+'/currentRoll');
      onValue(currentRoll, async(snapshot) => {
         const rollID = snapshot.val();
         resolve(rollID);
      })
   })
}

export const fetchRoll = async(rollID: string): Promise<FilmRoll> => {
   return new Promise<FilmRoll>((resolve, reject) => {
      const roll = ref(database, 'rolls/'+rollID);
      onValue(roll, async(snapshot) => {
         let data = snapshot.val();
         data.id = rollID;
         resolve(data);
      });
   })
}