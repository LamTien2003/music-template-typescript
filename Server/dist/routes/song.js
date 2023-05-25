"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const song_1 = require("../controllers/song");
const router = (0, express_1.Router)();
router.post('/', song_1.createSong);
router.get('/', song_1.getAllSong);
exports.default = router;
