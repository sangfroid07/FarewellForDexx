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

function renderPost(data) {
    const post = document.createElement("div");
    post.classList.add("post");

    post.innerHTML = `
        <div class="name">${data.name}</div>
        <div class="time">${new Date(data.timestamp).toLocaleString()}</div>
        <p>${escapeHTML(data.message)}</p>
    `;

    wall.appendChild(post);
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const message = document.getElementById("message").value.trim();
    if (!message) return;

    const name = (!anonCheckbox.checked && nameField.value.trim() !== "")
        ? nameField.value.trim()
        : "Anonymous ❤️";

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