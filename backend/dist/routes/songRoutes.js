"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const songController_1 = require("../controllers/songController");
const router = (0, express_1.Router)();
router.get('/', songController_1.fetchSongs);
exports.default = router;
