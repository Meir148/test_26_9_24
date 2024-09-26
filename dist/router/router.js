"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controller_1 = require("../controllers/controller");
const router = express_1.default.Router();
router.post('/', controller_1.createBeeper);
router.get('/', controller_1.getAll);
router.get('/:id', controller_1.getById);
router.put('/:id/status', controller_1.updateStatus);
router.delete('/:id', controller_1.deleteB);
router.get('/status/:status', controller_1.getByStatus);
exports.default = router;
