require('dotenv').config();

const express  = require("express");
const mongoose = require("mongoose");
const cors     = require("cors");

const app = express();

app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://aastha-portfolio-ot2d.vercel.app'
  ]
}));

app.use(express.json());

mongoose.connect(process.env.MONGO_URL, {
  serverSelectionTimeoutMS: 30000,
  family: 4
})
  .then(() => console.log("✅ Connected to MongoDB Atlas!"))
  .catch((err) => console.log("❌ Failed:", err.message));

const contactSchema = new mongoose.Schema({
  name:    { type: String, required: true },
  email:   { type: String, required: true },
  message: { type: String, required: true },
  date:    { type: Date, default: Date.now }
});

const Contact = mongoose.model("Contact", contactSchema);

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newMessage = new Contact({ name, email, message });
    await newMessage.save();
    console.log("✅ Saved:", newMessage);
    res.json({ success: true, msg: "Message saved!" });
  } catch (error) {
    console.log("❌ Error:", error);
    res.json({ success: false, msg: "Something went wrong." });
  }
});

app.get("/messages", async (req, res) => {
  try {
    const allMessages = await Contact.find();
    res.json(allMessages);
  } catch (error) {
    res.json({ error: "Could not fetch." });
  }
});

app.delete("/messages/:id", async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.json({ success: true, msg: "Deleted." });
  } catch (error) {
    res.json({ success: false, msg: "Delete failed." });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`🚀 Server running on port ${process.env.PORT || 5000}`);
});