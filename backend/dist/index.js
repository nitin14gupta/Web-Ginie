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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_1 = __importDefault(require("./routes/auth"));
const prompts_1 = require("./ml/prompts"); // Assuming ml folder is at root level
const node_1 = require("./defaults/node");
const react_1 = require("./defaults/react");
const axios_1 = __importDefault(require("axios"));
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Connect to MongoDB
mongoose_1.default.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/webgenie')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));
// Deepseek API configuration
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';
const deepseekApi = axios_1.default.create({
    baseURL: DEEPSEEK_API_URL,
    headers: {
        'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
        'Content-Type': 'application/json'
    }
});
// Routes
app.use('/api/auth', auth_1.default);
// ML routes
app.post("/template", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const prompt = req.body.prompt;
        const response = yield deepseekApi.post('', {
            model: "deepseek-chat",
            messages: [{
                    role: 'system',
                    content: "Return either node or react based on what do you think this project should be. Only return a single word either 'node' or 'react'. Do not return anything extra"
                }, {
                    role: 'user',
                    content: prompt
                }],
            max_tokens: 200,
            temperature: 0.7
        });
        const answer = ((_a = response.data.choices[0].message.content) === null || _a === void 0 ? void 0 : _a.toLowerCase().trim()) || '';
        if (answer === "react") {
            res.json({
                prompts: [prompts_1.BASE_PROMPT, `Here is an artifact...${react_1.basePrompt}...`],
                uiPrompts: [react_1.basePrompt]
            });
            return;
        }
        if (answer === "node") {
            res.json({
                prompts: [`Here is an artifact...${react_1.basePrompt}...`],
                uiPrompts: [node_1.basePrompt]
            });
            return;
        }
        res.status(403).json({ message: "Invalid project type" });
    }
    catch (error) {
        console.error('Deepseek API error:', error);
        res.status(500).json({ error: 'AI processing failed' });
    }
}));
app.post("/chat", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const messages = req.body.messages;
        const response = yield deepseekApi.post('', {
            model: "deepseek-chat",
            messages: [{
                    role: 'system',
                    content: (0, prompts_1.getSystemPrompt)()
                }, ...messages],
            max_tokens: 8000,
            temperature: 0.7
        });
        res.json({
            response: response.data.choices[0].message.content
        });
    }
    catch (error) {
        console.error('Deepseek API error:', error);
        res.status(500).json({ error: 'Chat processing failed' });
    }
}));
// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!' });
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
