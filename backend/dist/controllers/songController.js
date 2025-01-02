"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchSongs = void 0;
const songService_1 = require("../services/songService");
const fetchSongs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const songs = yield (0, songService_1.getSongs)();
        res.json({ songs });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch songs' });
    }
});
exports.fetchSongs = fetchSongs;
