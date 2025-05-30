// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyB7bvkvqDzmRVZWLADteuNQM4AMHkYre_o',
  authDomain: 'projetopilotomenu.firebaseapp.com',
  projectId: 'projetopilotomenu',
  storageBucket: 'projetopilotomenu.appspot.com',
  messagingSenderId: '307443442433',
  appId: '1:307443442433:web:888d3d72ad91a8b9e03100',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, db, storage };
