import api from '@/lib/api';
import { BoltArtifact, ParsedFile } from '@/types/bolt';
import { CompilerService } from './compiler';

export interface CodeResponse {
  response: string;
  prompts: string[];
  uiPrompts: string[];
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export class CodeService {
  static async getTemplate(prompt: string): Promise<CodeResponse> {
    const response = await api.post('/template', { prompt });
    return response.data;
  }

  static async chat(messages: ChatMessage[]): Promise<CodeResponse> {
    const response = await api.post('/chat', { messages });
    return response.data;
  }

  static async compileAndPreview(files: Record<string, string>): Promise<string> {
    // Convert files record to ParsedFile array
    const parsedFiles: ParsedFile[] = Object.entries(files).map(([name, content]) => ({
      path: name,
      content
    }));

    // Compile the files
    const compilation = await CompilerService.compile(parsedFiles);
    
    // Generate preview HTML
    return CompilerService.generatePreview(compilation);
  }

  static async executeCode(code: string): Promise<any> {
    try {
      // Create a temporary file structure for execution
      const files: ParsedFile[] = [
        {
          path: 'script.js',
          content: code
        }
      ];

      // Compile and execute
      const compilation = await CompilerService.compile(files);
      if (compilation.errors.length > 0) {
        throw new Error(compilation.errors.join('\n'));
      }

      // Return the compiled JavaScript
      return compilation.js;
    } catch (error) {
      console.error('Code execution error:', error);
      throw error;
    }
  }
} 