var express = require("express");
var router = express.Router();
const controller = require("../controllers/Notes");

router.get("/notes/:user_id", controller.ReadNotes);
router.post("/notes", controller.CreateNotes);
router.delete("/notes/:id", controller.DeleteNotes);
router.put("/notes/:id", controller.UpdateNotes);
router.patch("/notes/:id", controller.UpdateTitle);
router.patch("/notes/color/:id", controller.UpdateColor);

module.exports = router;
