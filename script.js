const container = document.getElementById('container');
const retrieveBtn = document.getElementById('retrive');
const uploadBtn = document.getElementById('upload');

retrieveBtn.addEventListener('click', () => {
    container.classList.add("active");
});

uploadBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

// Paste your Firebase configuration code here
const firebaseConfig = {
    apiKey: "AIzaSyDbmtTMf1OG24a75xyVwBVgu9_i6klIfok",
  
    authDomain: "anonymousdatasender.firebaseapp.com",
  
    projectId: "anonymousdatasender",
  
    storageBucket: "anonymousdatasender.appspot.com",
  
    messagingSenderId: "751649128129",
  
    appId: "1:751649128129:web:19a3fd290e6bc6bc399e40",
  
    measurementId: "G-TTJP2DT5LD",
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
console.log(firebase);

function randomString(len, bits) {
    bits = bits || 36;
    var outStr = "", newStr;
    while (outStr.length < len) {
        newStr = Math.random().toString(bits).slice(2);
        outStr += newStr.slice(0, Math.min(newStr.length, (len - outStr.length)));
    }
    return outStr.toUpperCase();
}

function uploadImage() {
    const ref = firebase.storage().ref();
    const file = document.querySelector("#photo").files[0];
    var onlyDate = new Date().toISOString().slice(0, 10);
    console.log(onlyDate);
    var imgName = randomString(5);
    var sendName = "Tanz-" + imgName + "-" + onlyDate;
    var name = "Tanz-" + imgName;

    const metadata = {
        contentType: file.type,
    };
    const task = ref.child(sendName).put(file, metadata);
    alert("Image is uploading, please wait 10sec");
    task
        .then((snapshot) => snapshot.ref.getDownloadURL())
        .then((url) => {
            console.log(url);
            alert(`Image uploaded successfully! Your image ID is ${name}`);
            document.getElementById("image").value = name;
        })
        .catch(console.error);
}

function Retrieve() {
    var name = document.getElementById("image").value;
    var date = document.getElementById("date").value;
    var url = `https://firebasestorage.googleapis.com/v0/b/anonymousdatasender.appspot.com/o/${name}-${date}?alt=media`;
    console.log(date);
    if (name == "" || date == "") {
        alert("Please enter all the details");
        return;
    }
    if (name != "" && date != "") {
        window.open(url, "_blank");
    }
}
