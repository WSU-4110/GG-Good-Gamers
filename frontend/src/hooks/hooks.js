import { collection, getDocs, query, where } from "firebase/firestore";
import  db  from "../firebase/firebase";


export const getUserDataByEmail = async (email) => {
  const usersCollection = collection(db, "users");
  const userQuery = query(usersCollection, where("email", "==", email));
  const querySnapshot = await getDocs(userQuery);
  return querySnapshot.docs[0].data();
};

export const getUserDataByUsername = async (username) => {
  const usersCollection = collection(db, "users");
  const userQuery = query(usersCollection, where("username", "==", username));
  const querySnapshot = await getDocs(userQuery);
  return querySnapshot.docs[0].data();
};
