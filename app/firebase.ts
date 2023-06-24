import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  UserCredential,
} from "firebase/auth";
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyAx0Z6ZVaBHz6SMGrGcc7u-Wq2a6wexct0",
//   authDomain: "bunshoco.firebaseapp.com",
//   projectId: "bunshoco",
//   storageBucket: "bunshoco.appspot.com",
//   messagingSenderId: "857463691753",
//   appId: "1:857463691753:web:4ac544baff389717619378",
//   measurementId: "G-VEJSW31QWW",
// };

const firebaseConfig = {
  apiKey: "AIzaSyBjQEna-3VRjM8BdYgIm60udYXVryfhRtg",
  authDomain: "assement-73946.firebaseapp.com",
  projectId: "assement-73946",
  storageBucket: "assement-73946.appspot.com",
  messagingSenderId: "525200984985",
  appId: "1:525200984985:web:7f0b3ece7c94398e7a6108",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async (): Promise<UserCredential | Error> => {
  try {
    const res = await signInWithPopup(auth, googleProvider);

    const user = res.user;
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
    return res;
  } catch (err: any) {
    return err;
  }
};

const logInWithEmailAndPassword = async (
  email: string,
  password: string,
): Promise<UserCredential | Error> => {
  try {
    const user = await signInWithEmailAndPassword(auth, email, password);
    return user;
  } catch (err: any) {
    console.error(err);
    return err;
  }
};

const registerWithEmailAndPassword = async (
  name: string,
  email: string,
  password: string,
) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err: any) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err: any) {
    console.error(err);
    alert(err.message);
  }
};

const logout = async (): Promise<Boolean | Error> => {
  try {
    await signOut(auth);
    return true;
  } catch (error: any) {
    return error;
  }
};

export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
};
