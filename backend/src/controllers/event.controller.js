const Event = require("../models/event.model");

const createEvent = async (req, res) => {
  try {
    console.log("REQ BODY:", req.body);

    const event = await Event.create(req.body);

    res.status(201).json({
      success: true,
      message: "Event created successfully",
      data: event,
    });
  } catch (error) {
    console.log("ERROR:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

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

const getUpcomingEvents = async (req, res) => {
  try {
    const events = await Event.find({
      eventDate: { $gte: new Date() },
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

const updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Event updated",
      data: event,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Event deleted",
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