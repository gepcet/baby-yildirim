// script.js

const CONFIG = {
    gender: "girl", //"boy",
    babyName: "Ela", //"Aras",
    babyNameDative: "Ela'ya" //"Aras'a"
};

let prediction = "";
let clicks = 0;
let balloonScale = 1;

const intro = document.getElementById("intro");
const balloonScreen = document.getElementById("balloonScreen");
const reveal = document.getElementById("reveal");
const message = document.getElementById("message");
const stats = document.getElementById("stats");

const balloon = document.getElementById("balloon");
const heart = document.getElementById("heart");
const babyName = document.getElementById("babyName");
const revealMessage = document.getElementById("revealMessage");
const messageTitle = document.getElementById("messageTitle");

function choose(value){

    prediction = value;

    intro.classList.add("hidden");
    balloonScreen.classList.remove("hidden");

    if(typeof savePrediction==="function"){
        savePrediction(value);
    }

}

function inflate(){

    clicks++;

    if(clicks<3){

        balloonScale += .25;

        balloon.style.transform =
            `scale(${balloonScale})`;

        return;

    }

    explode();

}

function explode(){

    const revealColor =
        CONFIG.gender === "boy"
            ? "#89C8FF"
            : "#F7A8C4";

    // Balon patlama anı
    balloon.innerHTML = "💥";

    balloon.style.background = "transparent";
    balloon.style.boxShadow = "none";
    balloon.style.opacity = "1";
    balloon.style.transform = "scale(1.35)";

    // Cinsiyete göre konfeti
    confetti({
        particleCount: 220,
        spread: 100,
        startVelocity: 35,
        gravity: 0.8,
        scalar: 1.1,
        origin: {
            x: 0.5,
            y: 0.58
        },
        colors: [
            revealColor,
            revealColor,
            revealColor,
            "#FFFFFF"
        ]
    });

    setTimeout(showReveal, 1100);

}

function showReveal(){

    balloonScreen.classList.add("hidden");

    reveal.classList.remove("hidden");

    if(CONFIG.gender==="boy"){

        heart.innerHTML="💙";

    }
    else{

        heart.innerHTML="🩷";

    }

    messageTitle.innerHTML =
        CONFIG.babyNameDative + " Bir Not Bırak";

    const correct =
        prediction === CONFIG.gender;

    if(correct){

        revealMessage.innerHTML =
            CONFIG.gender === "boy"
                ? `Tebrikler, doğru tahmin!🎉<br>Minik ${CONFIG.babyName} aramıza katılıyor.`
                : `Tebrikler, doğru tahmin!🎉<br>Minik ${CONFIG.babyName} aramıza katılıyor.`;

    }
    else{

        revealMessage.innerHTML =
            CONFIG.gender === "boy"
                ? `İyi deneme, ama bilemedin!😄<br>Minik ${CONFIG.babyName} aramıza katılıyor.`
                : `İyi deneme, ama bilemedin!😄<br>Minik ${CONFIG.babyName} aramıza katılıyor.`;

    }

    setTimeout(()=>{

        message.classList.remove("hidden");

        stats.classList.remove("hidden");

        loadStats();

        window.scrollTo({

            top:document.body.scrollHeight,

            behavior:"smooth"

        });

    },1200);

}

function sendMessage(){

    const name =
        document.getElementById("name").value.trim();

    const text =
        document.getElementById("text").value.trim();

    if(name===""){

        alert("Lütfen ismini yaz.");

        return;

    }

    if(text===""){

        alert("Bir mesaj yazmayı unutma ❤️");

        return;

    }

    if(typeof saveMessage==="function"){

        saveMessage({

            name:name,

            message:text,

            prediction:prediction

        });

    }

    document.getElementById("name").value="";

    document.getElementById("text").value="";

    alert("❤️ Mesajın ulaştı.");

}

function updateStats(girl,boy){

    document.getElementById("girlCount").innerHTML=girl;

    document.getElementById("boyCount").innerHTML=boy;

}