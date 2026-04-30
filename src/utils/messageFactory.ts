/**
 * Patrón: Factory
 * Problema que resuelve: El modelo de dominio (AppModel) construye los mensajes manualmente, acoplándose a la lógica de generación de IDs y formato de fechas de la infraestructura.
 * Implementación: La clase MessageFactory centraliza y encapsula la creación de los mensajes a través del método estático create().
 */
export class MessageFactory {
  static create(text: string, authorId: string) {
    return {
      id: "m-" + Date.now().toString(),
      authorId: authorId,
      text: text,
      time: new Date().toTimeString().slice(0, 5),
    };
  }
}