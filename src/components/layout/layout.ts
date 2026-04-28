import template from './layout.hbs?raw';
import Handlebars from 'handlebars';

export class LayoutComponent {
  private container: HTMLElement;
  private compiledTemplate: HandlebarsTemplateDelegate;

  constructor(containerId: string) {
    const el = document.getElementById(containerId);
    if (!el) throw new Error(`Contenedor ${containerId} no encontrado en el DOM.`);
    this.container = el;
    this.compiledTemplate = Handlebars.compile(template);
  }

  render(): void {
    this.container.innerHTML = this.compiledTemplate({});
  }
}