// const dotenv = require("dotenv");
import { initializeApp } from "firebase/app";
// dotenv.config();
import { getStorage } from "firebase/storage";

class FirebaseConfig {
  constructor() {
    const firebaseConfig = {
      apiKey: process.env.FIREBASE_APIKEY,
      authDomain: process.env.FIREBASE_AUTHDOMAIN,
      projectId: process.env.FIREBASE_PROJECTID,
      storageBucket: process.env.FIREBASE_STORAGEBUCKET,
      messagingSenderId: process.env.FIREBASE_MESSAGINGSENDERID,
      appId: process.env.FIREBASE_APPID,
      measurementId: process.env.FIREBASE_MEASUREMENTID,
    };
    this.app = initializeApp(firebaseConfig);
    this.storage = getStorage(this.app);
    console.log("Firebase created");
  }
  static getStorage() {
    return this.storage;
  }
}
export default FirebaseConfig;
