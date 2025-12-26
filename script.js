// 🔥 PASTE YOUR FIREBASE CONFIG HERE
const firebaseConfig = {
    apiKey: "AIzaSyBbVHB-sjFqGDvpYiRTof8zdqF6oVEfYxo",
    authDomain: "dexxer-43e55.firebaseapp.com",
    projectId: "dexxer-43e55",
    storageBucket: "dexxer-43e55.firebasestorage.app",
    messagingSenderId: "80900359866",
    appId: "1:80900359866:web:818425eff775c7f55fe483"
  };

// Init Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const form = document.getElementById("messageForm");
const wall = document.getElementById("wall");
const anonCheckbox = document.getElementById("anonymous");
const nameField = document.getElementById("name");

anonCheckbox.addEventListener("change", () => {
    nameField.disabled = anonCheckbox.checked;
    if (anonCheckbox.checked) nameField.value = "";
});

// REALTIME WALL
db.collection("posts")
  .orderBy("timestamp", "desc")
  .onSnapshot(snapshot => {
      wall.innerHTML = "";
      snapshot.forEach(doc => renderPost(doc.data()));
  });

// RENDER FUNCTION WITH RANDOM BACKGROUNDS + IMAGES
function renderPost(data) {
    const post = document.createElement("div");
    post.classList.add("post");

    // RANDOM BACKGROUND COLORS
    const backgrounds = [
    /* Crimson / Blue (pastel) */
    'linear-gradient(135deg, #f4b1b1, #b8c6ff)',

    /* Peach / Red (pastel) */
    'linear-gradient(135deg, #ffd6c9, #ff9aa2)',

    /* Green / Blue (pastel) */
    'linear-gradient(135deg, #c7e9d8, #b5d8ff)',

    /* Black / White (soft gray pastel) */
    'linear-gradient(135deg, #f2f2f2, #cfcfcf)',

    /* Tan / Beige (pastel) */
    'linear-gradient(135deg, #f3e6d3, #e6d5b8)'
];
    const randomBg = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    post.style.background = randomBg;

    // RANDOM IMAGES
    const images = [
  'lg1.jpg',
  'lg2.jpg',
  'lg3.jpg',
  'lg4.jpg',
  'lg5.jpg',
  'lg6.jpg',
  'lg7.jpg',
  'lg8.jpg',
  'lg9.jpg',
  'lg10.jpg'
];
    const randomImg = images[Math.floor(Math.random() * images.length)];

    post.innerHTML = `
        <div class="name">${data.name}</div>
        <div class="time">${new Date(data.timestamp).toLocaleString()}</div>
        <p>${escapeHTML(data.message)}</p>
        <img src="${randomImg}" alt="goofy" class="post-image">
    `;

    wall.appendChild(post);
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const message = document.getElementById("message").value.trim();
    if (!message) return;

    const name = (!anonCheckbox.checked && nameField.value.trim() !== "")
        ? nameField.value.trim()
        : "~Anonymous <3";

    await db.collection("posts").add({
        name: name,
        message: message,
        timestamp: Date.now()
    });

    form.reset();
    anonCheckbox.checked = true;
    nameField.disabled = true;
});

function escapeHTML(str) {
    return str.replace(/[&<>"']/g, m => ({
        '&':'&amp;',
        '<':'&lt;',
        '>':'&gt;',
        '"':'&quot;',
        "'":'&#39;'
    })[m]);
        }
