import { AppModel } from '../models/AppModel';
import { AppMemento } from './appMemento';
import { Command } from './executor';

export class EditMessageCommand implements Command {
  private model: AppModel;
  private messageId: string;
  private newText: string;  
  private backup: AppMemento | null = null;

  constructor(model: AppModel, messageId: string, newText: string) {
    this.model = model;
    this.messageId = messageId;
    this.newText = newText;
  }

  execute(): void {
    this.backup = this.model.createMemento();
    this.model.editMessage(this.messageId, this.newText);
  }

  undo(): void {
    if (this.backup) {
      this.model.restoreMemento(this.backup);
    }
  }
}