import { BoltAction, BoltArtifact, ParsedFile, ProjectSetup, Step } from '@/types/bolt';

function parseXMLString(xmlString: string): Document {
  const parser = new DOMParser();
  return parser.parseFromString(xmlString, 'text/xml');
}

function extractAttributes(element: Element): Record<string, string> {
  const attributes: Record<string, string> = {};
  for (const attr of element.attributes) {
    attributes[attr.name] = attr.value;
  }
  return attributes;
}

function parseAction(actionElement: Element): BoltAction {
  const { type, filePath } = extractAttributes(actionElement);
  return {
    type: type as 'shell' | 'file',
    filePath,
    content: actionElement.textContent || '',
  };
}

export function parseArtifact(xmlString: string): BoltArtifact {
  const doc = parseXMLString(xmlString);
  const artifactElement = doc.querySelector('boltArtifact');
  
  if (!artifactElement) {
    throw new Error('Invalid artifact XML: missing boltArtifact element');
  }

  const { id, title } = extractAttributes(artifactElement);
  const actionElements = artifactElement.querySelectorAll('boltAction');
  const actions = Array.from(actionElements).map(parseAction);

  return { id, title, actions };
}

export function processArtifact(artifact: BoltArtifact): ProjectSetup {
  const files: ParsedFile[] = [];
  const commands: string[] = [];
  const steps: Step[] = [];

  artifact.actions.forEach((action, index) => {
    if (action.type === 'file' && action.filePath) {
      files.push({
        path: action.filePath,
        content: action.content.trim(),
      });

      steps.push({
        id: `file-${index}`,
        title: `Creating ${action.filePath}`,
        status: 'pending',
      });
    } else if (action.type === 'shell') {
      commands.push(action.content.trim());
      
      steps.push({
        id: `cmd-${index}`,
        title: 'Running command',
        status: 'pending',
        command: action.content.trim(),
      });
    }
  });

  return { files, commands, steps };
}

export function generateSteps(projectSetup: ProjectSetup): Step[] {
  return [
    {
      id: 'setup',
      title: 'Project Setup',
      status: 'pending',
    },
    ...projectSetup.steps,
    {
      id: 'complete',
      title: 'Setup Complete',
      status: 'pending',
    },
  ];
} 