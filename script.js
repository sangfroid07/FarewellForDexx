const form = document.getElementById("postForm");
const postsContainer = document.getElementById("posts");

const gradients = [
    "linear-gradient(135deg, #f6d365, #fda085)", // peach
    "linear-gradient(135deg, #fbc2eb, #a6c1ee)", // pink-blue
    "linear-gradient(135deg, #cfd9df, #e2ebf0)", // grey
    "linear-gradient(135deg, #d4fc79, #96e6a1)", // green
    "linear-gradient(135deg, #fddb92, #d1fdff)"  // beige
];

const goofyImages = ['Ig1.jpg','Ig2.jpg','Ig3.jpg','Ig4.jpg','Ig5.jpg','Ig6.jpg','Ig7.jpg','Ig8.jpg','Ig9.jpg','Ig10.jpg']; // put in repo root

// Load saved posts
let posts = JSON.parse(localStorage.getItem("posts")) || [];
renderPosts();

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nameInput = document.getElementById("nameInput");
    const anonCheck = document.getElementById("anonCheck");
    const messageInput = document.getElementById("messageInput");

    let name = anonCheck.checked || nameInput.value.trim() === ""
        ? "Anonymous <3"
        : nameInput.value.trim();

    const post = {
        name,
        text: messageInput.value.trim(),
        time: new Date().toLocaleString(),
        gradient: gradients[Math.floor(Math.random() * gradients.length)],
        image: goofyImages[Math.floor(Math.random() * goofyImages.length)]
    };

    posts.unshift(post);
    localStorage.setItem("posts", JSON.stringify(posts));

    messageInput.value = "";
    renderPosts();
});

function renderPosts() {
    postsContainer.innerHTML = "";

    posts.forEach((post) => {
        const div = document.createElement("div");
        div.className = "post";
        div.style.background = post.gradient;

        div.innerHTML = `
            <div class="post-content">
                <div class="name">${post.name}</div>
                <div class="time">${post.time}</div>
                <p>${post.text}</p>
            </div>
            <div class="post-image"></div>
        `;

        const img = div.querySelector(".post-image");
        img.style.backgroundImage = `url(${post.image})`;

        postsContainer.appendChild(div);
    });
}});

function escapeHTML(str) {
    return str.replace(/[&<>"']/g, m => ({
        '&':'&amp;',
        '<':'&lt;',
        '>':'&gt;',
        '"':'&quot;',
        "'":'&#39;'
    })[m]);
        }
