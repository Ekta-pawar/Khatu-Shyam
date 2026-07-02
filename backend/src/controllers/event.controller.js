const Event = require("../models/event.model");
const cloudinary = require("../config/cloudinary");

const uploadToCloudinary = (fileBuffer, mimetype) => {
  const b64 = Buffer.from(fileBuffer).toString("base64");
  const dataURI = `data:${mimetype};base64,${b64}`;
  return cloudinary.uploader.upload(dataURI, {
    folder: "khatu-shyam/events",
  });
};

// ========================= CREATE EVENT =========================

const createEvent = async (req, res) => {
  try {
    let image = "";

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, req.file.mimetype);
      image = result.secure_url;
    }

    const event = await Event.create({
      title: req.body.title,
      shortDescription: req.body.shortDescription,
      fullDescription: req.body.fullDescription,
      image,
      eventDate: req.body.eventDate,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
      location: req.body.location,
      category: req.body.category,
    });

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      data: event,
    });
  } catch (error) {
    console.error("Create event error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================= GET ALL EVENTS =========================

const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find().sort({ eventDate: 1 });

    res.status(200).json({
      success: true,
      count: events.length,
      data: events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================= UPCOMING =========================

const getUpcomingEvents = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const events = await Event.find({
      eventDate: { $gte: today },
    });

    res.status(200).json({
      success: true,
      data: events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================= PAST =========================

const getPastEvents = async (req, res) => {
  try {
    const events = await Event.find({
      eventDate: { $lt: new Date() },
    });

    res.status(200).json({
      success: true,
      data: events,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================= SINGLE EVENT =========================

const getSingleEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      data: event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================= UPDATE EVENT =========================

const updateEvent = async (req, res) => {
  try {
    let updateData = { ...req.body };

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, req.file.mimetype);
      updateData.image = result.secure_url;
    }

    const event = await Event.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Event updated successfully",
      data: event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ========================= DELETE EVENT =========================

const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Event deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createEvent,
  getAllEvents,
  getUpcomingEvents,
  getPastEvents,
  getSingleEvent,
  updateEvent,
  deleteEvent,
};
