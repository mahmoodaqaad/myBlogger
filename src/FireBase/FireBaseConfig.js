import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {

    apiKey: "AIzaSyAXENWIvo6R77imXkVmdPGABxShh-ool9Q",
    authDomain: "my-blog-7f375.firebaseapp.com",
    projectId: "my-blog-7f375",
    storageBucket: "my-blog-7f375.appspot.com",
    messagingSenderId: "858465066469",
    appId: "1:858465066469:web:2c24579c7a5a5f8f54a30c"
};

const app = initializeApp(firebaseConfig);
const firedb = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)

export { firedb, auth, storage }
