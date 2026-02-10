"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = require("../services/auth");
const router = (0, express_1.Router)();
router.post("/register", async (req, res) => {
    const { email, password, confirmPassword } = req.body;
    const result = await (0, auth_1.register)(email, password, confirmPassword);
    return res.status(201).json(result);
});
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const result = await (0, auth_1.login)(email, password);
    return res.status(200).json(result);
});
exports.default = router;
