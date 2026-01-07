// server/models/Course.js
const mongoose = require('mongoose');

// Define Lesson Schema (Videos, Text, etc.)
const LessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  type: { type: String, enum: ['video', 'text', 'quiz'], default: 'text' },
  content: { type: String, default: '' } // URL for video or text content
});

// Define Module Schema (Groups of Lessons)
const ModuleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  lessons: [LessonSchema]
});

// Define Main Course Schema
const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  isPublished: { type: Boolean, default: false }, // For "Draft" vs "Live" status
  instructor: { type: String, default: "Demo Instructor" }, // Placeholder for Profile connection
  curriculum: [ModuleSchema], // <--- The crucial part for saving your lessons!
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Course', CourseSchema);