import template from './members.hbs?raw';
import Handlebars from 'handlebars';
import { User } from '../../types/user';

export interface MembersState {
  members: User[];
}

export class MembersComponent {
  private container: HTMLElement;
  private compiledTemplate: HandlebarsTemplateDelegate;

  constructor(containerId: string) {
    const el = document.getElementById(containerId);
    if (!el) throw new Error(`Contenedor ${containerId} ausente.`);
    this.container = el;
    this.compiledTemplate = Handlebars.compile(template);
  }

  render(state: MembersState): void {
    this.container.innerHTML = this.compiledTemplate(state);
  }
}