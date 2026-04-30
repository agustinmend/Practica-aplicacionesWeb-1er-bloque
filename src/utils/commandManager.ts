import { Command } from "./command";

export class CommandManager {
    private history: Command[] = [];
    executeCommand(command: Command): void {
        command.execute();
        this.history.push(command);
    }
    undoLats(): void {
        const lastCommand = this.history.pop();
        if (lastCommand) {
            lastCommand.undo();
        }
    }
}