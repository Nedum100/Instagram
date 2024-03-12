import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, serverTimestamp } from 'firebase/firestore';

const firebaseConfig  = { 
  apiKey: "AIzaSyCx2yjPuTi4nSWVrnXHg3KibdcwQ2HJqyY",
  authDomain: "instagram-yt-d1e1e.firebaseapp.com",
  projectId: "instagram-yt-d1e1e",
  storageBucket: "instagram-yt-d1e1e.appspot.com",
  messagingSenderId: "743305877307",
  appId: "1:743305877307:web:f152c6e75ab60b7b87c91e"
};

const firebaseApp = initializeApp(firebaseConfig );
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const  FieldValue  = serverTimestamp(); 

// eslint-disable-next-line react-refresh/only-export-components
export { db, auth, FieldValue, firebaseApp, firebaseConfig  };







// import { initializeApp } from "firebase/app";
// import { getAuth } from 'firebase/auth';
// import { getFirestore, serverTimestamp } from "firebase/firestore";

// // TODO: Replace the following with your app's Firebase project configuration
// // See: https://support.google.com/firebase/answer/7015592
// const firebaseConfig  = { 
//   apiKey: "AIzaSyCx2yjPuTi4nSWVrnXHg3KibdcwQ2HJqyY",
//   authDomain: "instagram-yt-d1e1e.firebaseapp.com",
//   projectId: "instagram-yt-d1e1e",
//   storageBucket: "instagram-yt-d1e1e.appspot.com",
//   messagingSenderId: "743305877307",
//   appId: "1:743305877307:web:f152c6e75ab60b7b87c91e"
// };
// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// const db = getFirestore(app);
// const  FieldValue  = serverTimestamp(); 
// const auth = getAuth(app);

// // eslint-disable-next-line react-refresh/only-export-components
// export { db, FieldValue, auth, app, firebaseConfig}
