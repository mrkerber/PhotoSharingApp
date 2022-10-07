import { initializeApp } from 'firebase/app';
import { onValue } from 'firebase/database';
import { getStorage, uploadBytes, getDownloadURL, ref } from "firebase/storage";
import { uuid } from 'uuid';

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
const storage = getStorage(app);


export const uploadPhotoAsync = async (uri, photoID) => {
   const blob: Blob = await new Promise((res, rej) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = () => {
         res(xhr.response);
      }
      xhr.onerror = (error) => {
         console.log(error)
         rej(new TypeError("Request Failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", uri, true);
      xhr.send(null);
   })

   const photoRef = ref(storage, photoID+'.jpg')
   uploadBytes(photoRef, blob).then((snapshot) => {
      console.log(snapshot)
   })

   // const ref = ref(storage);
   // const 
   // const file = storageRef(storage, uuid.v4());
   // const result = await uploadBytes(file, blob);

   // // blob.close()

   // return await getDownloadURL(file);
   
}

export const fetchPhotoAsync = async (photoID: string): Promise<string> => {
   return new Promise<string>((resolve, reject) => {
      const photoURL = '/' + photoID + '.jpg';
      const photoRef = ref(storage, photoURL)
      getDownloadURL(photoRef).then((result) => {
         resolve(result);
      })
   })
}