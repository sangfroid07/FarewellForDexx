// 🔥 FIREBASE CONFIG
const firebaseConfig = {
    apiKey: "AIzaSyBbVHB-sjFqGDvpYiRTof8zdqF6oVEfYxo",
    authDomain: "dexxer-43e55.firebaseapp.com",
    projectId: "dexxer-43e55",
    storageBucket: "dexxer-43e55.appspot.com",
    messagingSenderId: "80900359866",
    appId: "1:80900359866:web:818425eff775c7f55fe483"
};

// INIT FIREBASE
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// ELEMENTS
const form = document.getElementById("messageForm");
const wall = document.getElementById("wall");
const anonCheckbox = document.getElementById("anonymous");
const nameField = document.getElementById("name");
const messageField = document.getElementById("message");

// 🎨 PASTEL GRADIENTS
const gradients = [
    'linear-gradient(135deg, #f4b1b1, #b8c6ff)', // crimson/blue
    'linear-gradient(135deg, #ffd6c9, #ff9aa2)', // peach/red
    'linear-gradient(135deg, #c7e9d8, #b5d8ff)', // green/blue
    'linear-gradient(135deg, #f2f2f2, #cfcfcf)', // gray
    'linear-gradient(135deg, #f3e6d3, #e6d5b8)'  // beige
];

// 🖼️ GOOBY IMAGES (MUST EXIST IN ROOT OR /img/)
const goofyImages = [
    'Ig1.jpg','Ig2.jpg','Ig3.jpg','Ig4.jpg','Ig5.jpg',
    'Ig6.jpg','Ig7.jpg','Ig8.jpg','Ig9.jpg','Ig10.jpg'
];

// ANON TOGGLE
anonCheckbox.addEventListener("change", () => {
    nameField.disabled = anonCheckbox.checked;
    if (anonCheckbox.checked) nameField.value = "";
});

// 🔁 REALTIME WALL
db.collection("posts")
  .orderBy("timestamp", "desc")
  .onSnapshot(snapshot => {
      wall.innerHTML = "";
      snapshot.forEach(doc => renderPost(doc.data()));
  });

// 🧱 RENDER POST
function renderPost(data) {
    const post = document.createElement("div");
    post.className = "post";

    // RANDOM GRADIENT
    post.style.background =
        gradients[Math.floor(Math.random() * gradients.length)];

    // RANDOM IMAGE
    const img =
        goofyImages[Math.floor(Math.random() * goofyImages.length)];

    post.innerHTML = `
        <div class="name">${escapeHTML(data.name)}</div>
        <div class="time">${new Date(data.timestamp).toLocaleString()}</div>
        <p>${escapeHTML(data.message)}</p>
        <div class="post-image"></div>
    `;

    const imageDiv = post.querySelector(".post-image");
    imageDiv.style.backgroundImage = `url("${img}")`;

    wall.appendChild(post);
}

// ✉️ SUBMIT POST
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const message = messageField.value.trim();
    if (!message) return;

    const name =
        (!anonCheckbox.checked && nameField.value.trim() !== "")
            ? nameField.value.trim()
            : "~Anonymous<3";

await db.collection("posts").add({
        name,
        message,
        timestamp: Date.now()
    });

    form.reset();
    anonCheckbox.checked = true;
    nameField.disabled = true;
});

// 🔐 ESCAPE HTML
function escapeHTML(str) 
    return str.replace(/[&<>"']/g, m => ({
        '&':'&amp;',
        '<':'&lt;',
        '>':'&gt;',
        '"':'&quot;',
        "'":'&#39;'
    })[m]);


