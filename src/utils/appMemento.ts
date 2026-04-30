/**
 * Patrón: Memento
 * Problema que resuelve: Imposibilidad de revertir el estado de la aplicación a un punto anterior
 * Implementación: La clase AppMemento almacena un snapshot inmutable de AppData. AppModel actúa como Originator y SendMessageCommand actúa como el Caretaker que guarda este snapshot antes de mutar el modelo.
 */
import { AppData } from '../types/AppData';

export class AppMemento {
    private readonly state: string;
    constructor(state: AppData) {
        this.state = JSON.stringify(state);
    }
    getstate(): AppData {
        return JSON.parse(this.state);
    }
}