// const dotenv = require("dotenv");
import { initializeApp } from "firebase/app";
// dotenv.config();
import { getStorage } from "firebase/storage";
import { getEnv } from "../utils/getEnv";

class FirebaseConfig {
  constructor() {
    const firebaseConfig = {
      apiKey: getEnv("REACT_APP_FIREBASE_API_KEY"),
      authDomain: getEnv("REACT_APP_FIREBASE_AUTH_DOMAIN"),
      projectId: getEnv("REACT_APP_FIREBASE_PROJECT_ID"),
      storageBucket: getEnv("REACT_APP_FIREBASE_STORAGE_BUCKET"),
      messagingSenderId: getEnv("REACT_APP_FIREBASE_MESSAGING_SENDER_ID"),
      appId: getEnv("REACT_APP_FIREBASE_APP_ID"),
      measurementId: getEnv("REACT_APP_FIREBASE_MEASUREMENT_ID"),
    };
    this.app = initializeApp(firebaseConfig);
    this.storage = getStorage(this.app);
    console.log("Firebase created");
  }
  getStorage() {
    return this.storage;
  }
}
export default FirebaseConfig;
