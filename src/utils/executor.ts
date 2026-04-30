export interface Command {
  execute(): void;
  undo(): void;
}

/**
 * Patrón: Memento
 * Problema que resuelve: Imposibilidad de mantener un registro ordenado de las acciones del usuario para revertir estados (Undo).
 * Implementación: La clase History encapsula la pila de comandos y mementos exponiendo métodos estrictos push() y pop().
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
 * Implementación: La clase Executor actúa como el Invoker central. Recibe objetos Command y ejecuta su método execute().
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