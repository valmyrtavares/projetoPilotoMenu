import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth'; // ✅ importa auth

const firebaseConfig = {
  apiKey: 'AIzaSyB7bvkvqDzmRVZWLADteuNQM4AMHkYre_o',
  authDomain: 'projetopilotomenu.firebaseapp.com',
  projectId: 'projetopilotomenu',
  storageBucket: 'projetopilotomenu.appspot.com',
  messagingSenderId: '307443442433',
  appId: '1:307443442433:web:888d3d72ad91a8b9e03100',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app); // ✅ cria instância do auth

export { app, db, storage, auth };
