// server/routes/courseRoutes.js
const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

// GET: Get all courses
router.get('/', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET: Get a SINGLE course by ID
router.get('/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST: Create a new course
router.post('/', async (req, res) => {
  const course = new Course({
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    // Defaults for isPublished and curriculum will be handled by the Schema
  });

  try {
    const newCourse = await course.save();
    res.status(201).json(newCourse);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT: Update a course by ID (Handles Title, Price, Status, AND Curriculum)
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // We update everything sent in the body
    // { new: true } returns the updated document
    const updatedCourse = await Course.findByIdAndUpdate(
      id,
      req.body, 
      { new: true } 
    );

    if (!updatedCourse) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.json(updatedCourse);

  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ message: "Server Error during update" });
  }
});

// DELETE: Delete a course by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);
    if (!deletedCourse) return res.status(404).json({ message: "Course not found" });
    res.json({ message: "Course deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;