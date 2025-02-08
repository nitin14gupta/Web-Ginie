import { Step, ProjectSetup } from '@/types/bolt';

export class StepManager {
  private steps: Step[];
  private currentStepIndex: number;
  private onStepUpdate: (steps: Step[]) => void;

  constructor(steps: Step[], onStepUpdate: (steps: Step[]) => void) {
    this.steps = steps;
    this.currentStepIndex = 0;
    this.onStepUpdate = onStepUpdate;
  }

  private updateStep(index: number, updates: Partial<Step>) {
    this.steps = this.steps.map((step, i) => 
      i === index ? { ...step, ...updates } : step
    );
    this.onStepUpdate(this.steps);
  }

  async executeStep(index: number): Promise<boolean> {
    const step = this.steps[index];
    if (!step) return false;

    try {
      if (step.command) {
        // Execute command and capture output
        // This is a placeholder - actual implementation would depend on your backend
        const output = [`Running command: ${step.command}`, 'Command completed successfully'];
        this.updateStep(index, { status: 'completed', output });
      } else {
        // Mark non-command steps as completed
        this.updateStep(index, { status: 'completed' });
      }
      return true;
    } catch (error) {
      this.updateStep(index, { 
        status: 'failed',
        output: [error instanceof Error ? error.message : 'Unknown error']
      });
      return false;
    }
  }

  async executeAll(): Promise<boolean> {
    for (let i = 0; i < this.steps.length; i++) {
      const success = await this.executeStep(i);
      if (!success) return false;
    }
    return true;
  }

  getCurrentStep(): Step | null {
    return this.steps[this.currentStepIndex] || null;
  }

  getSteps(): Step[] {
    return this.steps;
  }

  reset() {
    this.steps = this.steps.map(step => ({ ...step, status: 'pending', output: undefined }));
    this.currentStepIndex = 0;
    this.onStepUpdate(this.steps);
  }
} 