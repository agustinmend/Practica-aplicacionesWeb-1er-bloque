export interface Command {
  execute(): void;
  undo(): void;
}
/**
 * Patrón: Memento
 * Problema que resuelve: Imposibilidad de revertir el estado de la aplicación a un punto anterior
 * Implementación: La clase AppMemento almacena un snapshot inmutable de AppData. AppModel actúa como Originator y SendMessageCommand actúa como el Caretaker que guarda este snapshot antes de mutar el modelo.
 */
export class History {
  private commands: Command[] = [];
  
  push(cmd: Command): void {
    this.commands.push(cmd);
  }
  
  pop(): Command | undefined {
    return this.commands.pop();
  }
}

/**
 * Patrón: Command
 * Problema que resuelve: El controlador ejecuta mutaciones directas y rígidas sobre el modelo.
 * Implementación: La clase Executor actua como el Invoker central. Recibe objetos Command y ejecuta su metodo execute().
 */
export class Executor {
  private history = new History();

  execute(command: Command): void {
    command.execute();
    this.history.push(command);
  }

  undoLast(): void {
    const cmd = this.history.pop();
    if (cmd) {
      cmd.undo();
    }
  }
}