import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import { BASE_PROMPT, getSystemPrompt } from './ml/prompts'; // Assuming ml folder is at root level
import {basePrompt as nodeBasePrompt} from './defaults/node';
import {basePrompt as reactBasePrompt} from './defaults/react';
import OpenAI from 'openai';

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/webgenie')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Add OpenAI initialization
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Routes
app.use('/api/auth', authRoutes);

// ML routes
app.post("/template", async (req, res) => {
    try {
        const prompt = req.body.prompt;
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{
                role: 'system',
                content: "Return either node or react based on what do you think this project should be. Only return a single word either 'node' or 'react'. Do not return anything extra"
            }, {
                role: 'user', 
                content: prompt
            }],
            max_tokens: 200,
        });

        const answer = completion.choices[0].message.content?.toLowerCase().trim() || '';
        
        if (answer === "react") {
            res.json({
                prompts: [BASE_PROMPT, `Here is an artifact...${reactBasePrompt}...`],
                uiPrompts: [reactBasePrompt]
            });
            return;
        }

        if (answer === "node") {
            res.json({
                prompts: [`Here is an artifact...${reactBasePrompt}...`],
                uiPrompts: [nodeBasePrompt]
            });
            return;
        }

        res.status(403).json({ message: "Invalid project type" });
    } catch (error) {
        console.error('OpenAI error:', error);
        res.status(500).json({ error: 'AI processing failed' });
    }
});

app.post("/chat", async (req, res) => {
    try {
        const messages = req.body.messages;
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [{
                role: 'system',
                content: getSystemPrompt()
            }, ...messages],
            max_tokens: 8000,
        });

        res.json({
            response: completion.choices[0].message.content
        });
    } catch (error) {
        console.error('OpenAI error:', error);
        res.status(500).json({ error: 'Chat processing failed' });
    }
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something broke!' });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
