const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const STORIES_FILE = path.join(__dirname, "stories.json");
const USERS_FILE = path.join(__dirname, "users.json");

// Create files if not exist
if (!fs.existsSync(STORIES_FILE)) {
  fs.writeFileSync(STORIES_FILE, "[]");
}

if (!fs.existsSync(USERS_FILE)) {
  fs.writeFileSync(USERS_FILE, "[]");
}

/* =========================
   STORY ROUTES
========================= */

app.get("/stories", (req, res) => {
  const data = JSON.parse(fs.readFileSync(STORIES_FILE));
  res.json(data);
});

app.post("/add-story", (req, res) => {
  const data = JSON.parse(fs.readFileSync(STORIES_FILE));

  const newStory = {
    id: Date.now(),
    ...req.body
  };

  data.push(newStory);
  fs.writeFileSync(STORIES_FILE, JSON.stringify(data, null, 2));

  res.json({ success: true, message: "Story added successfully" });
});

/* =========================
   AUTH ROUTES
========================= */

// Register
app.post("/register", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.json({ success: false, message: "All fields required" });
  }

  const users = JSON.parse(fs.readFileSync(USERS_FILE));

  const userExists = users.find(u => u.username === username);

  if (userExists) {
    return res.json({ success: false, message: "User already exists" });
  }

  users.push({
    id: Date.now(),
    username,
    password
  });

  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));

  res.json({
    success: true,
    message: `Account created successfully. Welcome ${username}!`,
    username: username
  });
});

// Login
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const users = JSON.parse(fs.readFileSync(USERS_FILE));

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (!user) {
    return res.json({ success: false, message: "Invalid username or password" });
  }

  res.json({
    success: true,
    message: `Login successful. Welcome ${username}!`,
    username: username
  });
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
