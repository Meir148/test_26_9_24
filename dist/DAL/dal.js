"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.deleteBeeper = exports.updateBeeper = exports.saveBeeper = exports.getBeeperById = exports.getAllBeepers = exports.beepers = void 0;
const fs = __importStar(require("fs/promises"));
//a list for storing beepers - in the type of Beeper
exports.beepers = [];
//loead the data
const showData = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield fs.readFile('./beepers.json', 'utf-8');
        return JSON.parse(data) || [];
    }
    catch (error) {
        console.error('error', error);
        return [];
    }
});
//save the data
const saveData = (data) => __awaiter(void 0, void 0, void 0, function* () {
    yield fs.writeFile('./beepers.json', JSON.stringify(data, null, 2));
});
//get all beepers
const getAllBeepers = () => __awaiter(void 0, void 0, void 0, function* () { return yield showData(); });
exports.getAllBeepers = getAllBeepers;
//get beeper by id
const getBeeperById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield showData();
    return beepers.find(beeper => beeper.id === id);
});
exports.getBeeperById = getBeeperById;
//save beeper
const saveBeeper = (beeper) => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield showData();
    beepers.push(beeper);
    yield saveData(beepers);
});
exports.saveBeeper = saveBeeper;
//update beeper for changimg the status
const updateBeeper = (id, updatedBeeper) => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield showData();
    const index = beepers.findIndex(beeper => beeper.id === id);
    if (index !== -1) {
        beepers[index] = updatedBeeper;
        yield saveData(beepers);
    }
});
exports.updateBeeper = updateBeeper;
//delete a beeper
const deleteBeeper = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = (yield showData()).filter(beeper => beeper.id !== id);
    yield saveData(beepers);
});
exports.deleteBeeper = deleteBeeper;
