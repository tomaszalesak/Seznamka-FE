import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as authSignOut,
  onAuthStateChanged,
  User as UserFirebase
} from 'firebase/auth';
import {
  collection,
  CollectionReference,
  doc,
  DocumentReference,
  getFirestore
} from 'firebase/firestore';

// Initialize Firebase
initializeApp({
  apiKey: 'AIzaSyCpBQfHKYALAKU_8Yp9cWuvL_gR9TnnJ80',
  authDomain: 'seznamka-a12c8.firebaseapp.com',
  projectId: 'seznamka-a12c8',
  storageBucket: 'seznamka-a12c8.appspot.com',
  messagingSenderId: '258879444758',
  appId: '1:258879444758:web:7e35ee89f49831d71f6237',
  // eslint-disable-next-line no-template-curly-in-string
  measurementId: '${config.measurementId}'
});

// Authentication
const auth = getAuth();

// Sign up handler
export const signUp = (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password);

// Sign in handler
export const signIn = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

// Sign out handler
export const signOut = () => authSignOut(auth);

// Subscribe to auth state changes
export const onAuthChanged = (callback: (u: UserFirebase | null) => void) =>
  onAuthStateChanged(auth, callback);

// Firestore
const db = getFirestore();

// user collection
export type User = {
  first_name: string;
  last_name: string;
  birth: string;
  bio: string;
  gender: string;
  height: number;
  weight: number;
  photos: string[];
  preferences: {
    gender: string[];
    min_age: number;
    max_age: number;
    gps_radius: number;
    min_height: number;
    max_height: number;
    min_weight: number;
    max_weight: number;
  };
  //follow: string[];
  //blocked: string[];
};

export type Follow = {
  email: string;
  first_name: string;
  last_name: string;
};

export type Blocked = {
  email: string;
  first_name: string;
  last_name: string;
};

export const usersCollection = collection(db, 'users') as CollectionReference<User>;

export const usersDocument = (id: string) => doc(db, 'users', id) as DocumentReference<User>;

export const userFollowDocument = (idUser: string, idFollow: string) =>
  doc(db, 'users', idUser, 'follow', idFollow) as DocumentReference<Follow>;

export const userBlockedDocument = (idUser: string, idFollow: string) =>
  doc(db, 'users', idUser, 'blocked', idFollow) as DocumentReference<Blocked>;
