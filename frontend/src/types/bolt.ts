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
  id: number;
  title: string;
  description: string;
  status: 'completed' | 'pending' | 'in-progress' | 'failed';
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
  onStepComplete?: (stepId: number) => void;
}

export interface FileItem {
  name: string;
  type: 'file' | 'folder';
  path: string;
  content?: string;
  children?: FileItem[];
}

export interface FileViewerProps {
  file: ParsedFile | null;
  onClose: () => void;
}

export interface CodeEditorProps {
  file: FileItem | null;
}

export interface FileExplorerProps {
  files: FileItem[];
  onFileSelect: (file: FileItem) => void;
}

export interface TabViewProps {
  activeTab: 'code' | 'preview';
  onTabChange: (tab: 'code' | 'preview') => void;
}

export interface PreviewFrameProps {
  files: FileItem[];
  webContainer: any; // Using any for WebContainer type as it's from an external package
}

export interface StepsListProps {
  steps: Step[];
  currentStep: number;
  onStepClick: (stepId: number) => void;
} 