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
exports.createNewRoom = exports.fetchRooms = void 0;
const fetchRooms = () => __awaiter(void 0, void 0, void 0, function* () {
    // Simulated data or database fetch logic
    return [{ id: 1, name: 'Room A' }, { id: 2, name: 'Room B' }];
});
exports.fetchRooms = fetchRooms;
const createNewRoom = (data) => __awaiter(void 0, void 0, void 0, function* () {
    // Simulated room creation logic
    return Object.assign({ id: Date.now() }, data);
});
exports.createNewRoom = createNewRoom;
