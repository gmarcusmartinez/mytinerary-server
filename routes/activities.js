const { Router } = require("express");
const { protect, authorize } = require("../middleware/auth");

const {
  getActivity,
  getActivities,
  createActivity,
  updateActivity,
  deleteActivity,
} = require("../controllers/activities");

const Activity = require("../models/Activity");
const advancedResults = require("../middleware/advancedResults");

const router = Router({ mergeParams: true });

router
  .route("/")
  .get(advancedResults(Activity), getActivities)
  .post(protect, authorize("publisher", "admin"), createActivity);

router
  .route("/:id")
  .get(getActivity)
  .put(protect, authorize("publisher", "admin"), updateActivity)
  .delete(protect, authorize("publisher", "admin"), deleteActivity);

module.exports = router;
