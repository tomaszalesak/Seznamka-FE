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
import { getStorage } from 'firebase/storage';

// Initialize Firebase
const firebaseApp = initializeApp({
  apiKey: 'AIzaSyBy4ZyghoTmA64Ml1b6iwmwoXPj19n7nZg',
  authDomain: 'pv247-seznamka.firebaseapp.com',
  projectId: 'pv247-seznamka',
  storageBucket: 'pv247-seznamka.appspot.com',
  messagingSenderId: '615016461999',
  appId: '1:615016461999:web:d33d892bc792eb5b12065a'
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
export const db = getFirestore();

// user collection
export type User = {
  first_name: string;
  last_name: string;
  birth: string;
  bio: string;
  gender: string;
  height: number;
  weight: number;
  photo: string;
  preferences: {
    min_age: number;
    max_age: number;
    gps_radius: number;
    min_height: number;
    max_height: number;
    min_weight: number;
    max_weight: number;
  };
  follow?: string[];
  //blocked: string[];
};

export type UserWithId = User & { id: string };

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

export type Message = {
  createdAt: Date;
  time: string;
  author: string;
  message: string;
};

export type Chat = {
  user1: string;
  user2: string;
};

export type ChatWithEmail = Chat & { email: string; id: string };

export const usersCollection = collection(db, 'users') as CollectionReference<User>;

export const usersDocument = (id: string) => doc(db, 'users', id) as DocumentReference<User>;

export const storage = getStorage(firebaseApp);

export const userFollowDocument = (idUser: string, idFollow: string) =>
  doc(db, 'users', idUser, 'follow', idFollow) as DocumentReference<Follow>;

export const userFollowCollection = (idUser: string) =>
  collection(db, 'users', idUser, 'follow') as CollectionReference<Follow>;

export const userBlockedDocument = (idUser: string, idFollow: string) =>
  doc(db, 'users', idUser, 'blocked', idFollow) as DocumentReference<Blocked>;

export const chatsCollection = collection(db, 'chats') as CollectionReference<Chat>;

export const chatMessagesCollection = (idChat: string) =>
  collection(db, 'chats', idChat, 'messages') as CollectionReference<Message>;

export const chatsDocument = (idChat: string) =>
  doc(db, 'chats', idChat) as DocumentReference<Chat>;
