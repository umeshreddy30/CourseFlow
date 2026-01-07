const Course = require('../models/Course');

// @desc    Create a new course
// @route   POST /api/courses
exports.createCourse = async (req, res) => {
  try {
    const { title, description, price } = req.body;
    
    const newCourse = await Course.create({ 
        title,
        description,
        price
    });
    
    res.status(201).json(newCourse);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// @desc    Get all courses
// @route   GET /api/courses
exports.getAllCourses = async (req, res) => {
  try {
    // .find() is the MongoDB way to get everything
    const courses = await Course.find().sort({ createdAt: -1 });
    res.json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};