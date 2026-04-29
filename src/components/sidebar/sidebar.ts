import template from './sidebar.hbs?raw';
import Handlebars from 'handlebars';
import { Channel } from '../../types/channel';

interface ChannelViewModel {
  channel : Channel;
  isActive : boolean;
}
export class SidebarComponent {
  private container: HTMLElement;
  private compiledTemplate: HandlebarsTemplateDelegate;
  
  private onChannelClickHandler: (channelId: string) => void = () => {};

  constructor(containerId: string) {
    const el = document.getElementById(containerId);
    if (!el) throw new Error(`Contenedor ${containerId} ausente.`);
    this.container = el;
    this.compiledTemplate = Handlebars.compile(template);

    this.container.addEventListener('click', (e: Event) => {
      const target = e.target as HTMLElement;
      const li = target.closest('.channel-list__item') as HTMLElement | undefined;
      
      if (li) {
        const id = li.getAttribute('data-channel-id');
        if (id && id !== "") {
           this.onChannelClickHandler(id as string);
        }
      }
    });
  }

  setOnChannelClick(handler: (channelId: string) => void): void {
    this.onChannelClickHandler = handler;
  }

  render(state: ChannelViewModel): void {
    this.container.innerHTML = this.compiledTemplate(state);
  }
}