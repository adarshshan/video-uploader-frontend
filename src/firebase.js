// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCCXAz0XTMWx_DzMSsNa080qCWNq1fd2ls",
    authDomain: "video-uploader-d48e2.firebaseapp.com",
    projectId: "video-uploader-d48e2",
    storageBucket: "video-uploader-d48e2.appspot.com",
    messagingSenderId: "240189570370",
    appId: "1:240189570370:web:ce59817475da3b2dbf1cdb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;