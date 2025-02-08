export interface BoltAction {
  type: 'shell' | 'file';
  filePath?: string;
  content: string;
}

export interface BoltArtifact {
  id: string;
  title: string;
  actions: BoltAction[];
}

export interface Step {
  id: string;
  title: string;
  status: 'completed' | 'pending' | 'failed';
  command?: string;
  output?: string[];
}

export interface ParsedFile {
  path: string;
  content: string;
}

export interface ProjectSetup {
  files: ParsedFile[];
  commands: string[];
  steps: Step[];
}

export interface SearchPanelProps {
  onSearch: (value: string) => void;
  steps?: Step[];
  onStepComplete?: (stepId: string) => void;
}

export interface CodeEditorProps {
  isVisible: boolean;
  onClose: () => void;
  files?: ParsedFile[];
  onFileChange?: (path: string, content: string) => void;
} 