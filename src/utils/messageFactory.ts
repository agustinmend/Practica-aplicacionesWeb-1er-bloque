/**
 * Patrón: Factory
 * Problema que resuelve: El modelo construye los mensajes manualmente, acoplandose a la logica de generacion de IDs y formato de fechas de la infraestructura.
 * Implementación: La clase MessageFactory centraliza y encapsula la creacion de los mensajes a traves del metodo estatico create().
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