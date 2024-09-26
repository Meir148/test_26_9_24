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
exports.getByStatus = exports.updateStatus = exports.deleteB = exports.getById = exports.getAll = exports.createBeeper = void 0;
const dal_1 = require("../DAL/dal");
//create beeper - no info is needed from the user
const createBeeper = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newBeeper = {
        id: Date.now(),
        status: 'manufactured',
        created_at: new Date(),
        latitude: 0,
        longitude: 0
    };
    yield (0, dal_1.saveBeeper)(newBeeper);
    res.status(201).json(newBeeper);
});
exports.createBeeper = createBeeper;
// get all beepers
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = yield (0, dal_1.getAllBeepers)();
    res.json(beepers);
});
exports.getAll = getAll;
//get beeper by id
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const beeper = yield (0, dal_1.getBeeperById)(parseInt(req.params.id));
    if (!beeper) {
        res.status(404).json({ message: 'Beeper not found' });
    }
    else {
        res.json(beeper);
    }
});
exports.getById = getById;
//delete a beeper
const deleteB = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, dal_1.deleteBeeper)(parseInt(req.params.id));
    console.log(`Deleted beeper with id ${req.params.id}`);
    res.status(204).send();
});
exports.deleteB = deleteB;
//update beeper status and coordinates than detonate it if status is deployed
const updateStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const beeper = yield (0, dal_1.getBeeperById)(parseInt(req.params.id));
    if (!beeper) {
        res.status(404).json({ message: 'not found' });
        return;
    }
    beeper.status = req.body.status;
    if (beeper.status === 'deployed') {
        beeper.latitude = req.body.latitude;
        beeper.longitude = req.body.longitude;
        setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
            beeper.status = 'detonated';
            beeper.detonated_at = new Date();
            yield (0, dal_1.updateBeeper)(beeper.id, beeper);
        }), 10000);
    }
    yield (0, dal_1.updateBeeper)(beeper.id, beeper);
    res.json(beeper);
});
exports.updateStatus = updateStatus;
//search beepers by their status
const getByStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const beepers = (yield (0, dal_1.getAllBeepers)()).filter(beeper => beeper.status === req.params.status);
    res.json(beepers);
});
exports.getByStatus = getByStatus;
