const express = require("express");

const router = express.Router();

const {
  createEvent,
  getAllEvents,
  getUpcomingEvents,
  getPastEvents,
  getSingleEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/event.controller");

router.post("/create", createEvent);

router.get("/", getAllEvents);

router.get("/upcoming", getUpcomingEvents);

router.get("/past", getPastEvents);

router.get("/:id", getSingleEvent);

router.put("/:id", updateEvent);

router.delete("/:id", deleteEvent);

module.exports = router;