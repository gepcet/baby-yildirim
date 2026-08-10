// firebase.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


// Firebase Config
// Buraya kendi config bilgilerini yapıştır.

const firebaseConfig = {
    apiKey: "AIzaSyBnr7ItRJZoCApnimGhKkOySWK6BQNfXNc",
    authDomain: "baby-yildirim.firebaseapp.com",
    projectId: "baby-yildirim",
    storageBucket: "baby-yildirim.firebasestorage.app",
    messagingSenderId: "1046244114876",
    appId: "1:1046244114876:web:319ec1995b5686b251ebb9"
};


// Firebase

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);


// ----------------------------
// Tahmin Kaydet
// ----------------------------

window.savePrediction = async function(prediction){

    try{

        await addDoc(

            collection(db,"predictions"),

            {

                prediction:prediction,

                createdAt:serverTimestamp()

            }

        );

    }
    catch(e){

        console.error(e);

    }

};


// ----------------------------
// Mesaj Kaydet
// ----------------------------

window.saveMessage = async function(data){

    try{

        await addDoc(

            collection(db,"messages"),

            {

                name:data.name,

                message:data.message,

                prediction:data.prediction,

                createdAt:serverTimestamp()

            }

        );

    }
    catch(e){

        console.error(e);

    }

};


// ----------------------------
// İstatistikleri Oku
// ----------------------------

window.loadStats = async function(){

    let girl=0;
    let boy=0;

    const snapshot=await getDocs(

        collection(db,"predictions")

    );

    snapshot.forEach(doc=>{

        const p=doc.data().prediction;

        if(p==="girl"){

            girl++;

        }
        else{

            boy++;

        }

    });

    updateStats(girl,boy);

}