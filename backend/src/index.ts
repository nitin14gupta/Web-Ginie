import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import { BASE_PROMPT, getSystemPrompt } from './ml/prompts'; // Assuming ml folder is at root level
import { ContentBlock, TextBlock } from "@anthropic-ai/sdk/resources";
import {basePrompt as nodeBasePrompt} from './defaults/node';
import {basePrompt as reactBasePrompt} from './defaults/react';
import Anthropic from "@anthropic-ai/sdk";

dotenv.config();

const app = express();
const anthropic = new Anthropic();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/webgenie')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
app.use('/api/auth', authRoutes);

// ML routes
app.post("/template", async (req, res) => {
    const prompt = req.body.prompt;
    const response = await anthropic.messages.create({
        messages: [{
            role: 'user', content: prompt
        }],
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 200,
        system: "Return either node or react based on what do you think this project should be. Only return a single word either 'node' or 'react'. Do not return anything extra"
    });

    const answer = (response.content[0] as TextBlock).text; // react or node
    if (answer == "react") {
        res.json({
            prompts: [BASE_PROMPT, `Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
            uiPrompts: [reactBasePrompt]
        });
        return;
    }

    if (answer === "node") {
        res.json({
            prompts: [`Here is an artifact that contains all files of the project visible to you.\nConsider the contents of ALL files in the project.\n\n${reactBasePrompt}\n\nHere is a list of files that exist on the file system but are not being shown to you:\n\n  - .gitignore\n  - package-lock.json\n`],
            uiPrompts: [nodeBasePrompt]
        });
        return;
    }

    res.status(403).json({ message: "You can't access this" });
    return;
});

app.post("/chat", async (req, res) => {
    const messages = req.body.messages;
    const response = await anthropic.messages.create({
        messages: messages,
        model: 'claude-3-5-sonnet-20241022',
        max_tokens: 8000,
        system: getSystemPrompt()
    });

    console.log(response);

    res.json({
        response: (response.content[0] as TextBlock)?.text
    });
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
