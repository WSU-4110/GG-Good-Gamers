import { collection, getDocs, query, where } from "firebase/firestore";
import db from "../firebase/firebase.js";

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

export const getUserRefByUsername = async (username) => {
  try {
    const usersCollection = collection(db, "users");
    const userQuery = query(usersCollection, where("username", "==", username));
    const querySnapshot = await getDocs(userQuery);

    if (querySnapshot.empty) {
      throw new Error("No user found with the given username.");
    }

    return querySnapshot.docs[0].ref;
  } catch (error) {
    console.error("Error fetching userRef by username:", error);
    throw error;
  }
};

export const getPostsByUserRef = async (userRef) => {
  try {
    const postsCollection = collection(db, "posts");
    const postsQuery = query(postsCollection, where("userRef", "==", userRef));
    const querySnapshot = await getDocs(postsQuery);

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
  } catch (error) {
    console.error("Error fetching posts by userRef:", error);
    throw error;
  }
};

export const getPostsByUsername = async (username) => {
  try {
    const userRef = await getUserRefByUsername(username);
    const posts = await getPostsByUserRef(userRef);
    return posts;
  } catch (error) {
    console.error("Error fetching posts by username:", error);
    throw error;
  }
};