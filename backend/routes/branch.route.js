const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const validateBranch= require('../middlewares/validate')
const {
  getBranchController,
  addBranchController,
  updateBranchController,
  deleteBranchController,
} = require("../controllers/branch.controller");

router.post('/', validateBranch, require('../controllers/branch.controller').addBranchController);


router.get("/", auth, getBranchController);
router.post("/", auth, addBranchController);
router.patch("/:id", auth, updateBranchController);
router.delete("/:id", auth, deleteBranchController);

module.exports = router;
