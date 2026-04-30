/**
 * Patrón: Command
 * Problema que resuelve: El controlador (AppController) está fuertemente acoplado a las mutaciones directas del modelo, ejecutando addMessageToCurrentChannel directamente. Esto impide registrar un historial de acciones y hace imposible deshacer operaciones (Undo).
 * Implementación: SendMessageCommand encapsula la petición de enviar un mensaje en un objeto independiente. Actúa como Caretaker: antes de ejecutar la mutación en el receptor (AppModel), solicita un AppMemento para guardar el estado previo y permitir la reversión en el método undo().
 */
import { AppModel } from '../models/AppModel';
import { AppMemento } from './appMemento';
import { Command } from './executor';
export class SendMessageCommand implements Command {
    private model: AppModel;
    private text: string;
    private backup: AppMemento | null = null;

    constructor(model: AppModel, text: string) {
        this.model = model;
        this.text = text;
    }

    execute(): void {
        this.backup = this.model.createMemento();
        this.model.addMessageToCurrentChannel(this.text);
    }

    undo(): void {
        if (this.backup) {
            this.model.restoreMemento(this.backup);
        }
    }
}