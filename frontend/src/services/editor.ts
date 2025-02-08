import api from '@/lib/api';
import { FileStructure, TerminalCommand } from '@/types/editor';

export class EditorService {
  static async getInitialFiles(): Promise<FileStructure[]> {
    const response = await api.get('/editor/files');
    return response.data;
  }

  static async executeCommand(command: string): Promise<{
    output: string[];
    error?: string;
  }> {
    const response = await api.post('/editor/command', { command });
    return response.data;
  }

  static async createFile(path: string, content: string): Promise<FileStructure> {
    const response = await api.post('/editor/files', { path, content });
    return response.data;
  }

  static async updateFile(path: string, content: string): Promise<FileStructure> {
    const response = await api.put(`/editor/files/${encodeURIComponent(path)}`, { content });
    return response.data;
  }

  static async deleteFile(path: string): Promise<void> {
    await api.delete(`/editor/files/${encodeURIComponent(path)}`);
  }

  static async moveFile(oldPath: string, newPath: string): Promise<FileStructure> {
    const response = await api.post('/editor/files/move', { oldPath, newPath });
    return response.data;
  }

  static async searchFiles(query: string): Promise<FileStructure[]> {
    const response = await api.get(`/editor/files/search?q=${encodeURIComponent(query)}`);
    return response.data;
  }

  static async getFileContent(path: string): Promise<string> {
    const response = await api.get(`/editor/files/${encodeURIComponent(path)}/content`);
    return response.data.content;
  }
} 