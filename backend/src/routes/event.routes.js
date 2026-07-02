
const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload.middleware");
const { isAuthenticated } = require("../middleware/auth.middleware");

const {
  createEvent,
  getAllEvents,
  getUpcomingEvents,
  getPastEvents,
  getSingleEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/event.controller");

// ================= CREATE EVENT =================
router.post(
  "/create",
  isAuthenticated,
  upload.single("image"),
  createEvent
);

// ================= GET ALL EVENTS =================
router.get("/", getAllEvents);

// ================= UPCOMING EVENTS =================
router.get("/upcoming", getUpcomingEvents);

// ================= PAST EVENTS =================
router.get("/past", getPastEvents);

// ================= GET SINGLE EVENT =================
router.get("/:id", getSingleEvent);

// ================= UPDATE EVENT =================
router.put(
  "/:id",
  isAuthenticated,
  upload.single("image"),
  updateEvent
);

// ================= DELETE EVENT =================
router.delete("/:id", isAuthenticated, deleteEvent);

module.exports = router;