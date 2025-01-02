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
exports.createRoom = exports.getRooms = void 0;
const roomService_1 = require("../services/roomService");
const getRooms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rooms = yield (0, roomService_1.fetchRooms)();
        res.json({ rooms });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch rooms' });
    }
});
exports.getRooms = getRooms;
const createRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const room = yield (0, roomService_1.createNewRoom)(req.body);
        res.status(201).json({ room });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to create room' });
    }
});
exports.createRoom = createRoom;
