import template from './chat.hbs?raw';
import Handlebars from 'handlebars';
import { ChatState } from '../../types/views';

export class ChatComponent {
  private container: HTMLElement;
  private observer: MutationObserver;
  private compiledTemplate: HandlebarsTemplateDelegate;

  private onSendMessage: (text: string) => void = () => {};
  private onEditMessage: (id: string, text: string) => void = () => {};

  constructor(containerId: string) {
    const el = document.getElementById(containerId);
    if (!el) throw new Error(`Contenedor ${containerId} ausente.`);
    
    this.container = el;
    this.compiledTemplate = Handlebars.compile(template);

    this.observer = new MutationObserver(this.handleMutations.bind(this));

    this.setupEventListeners();
  }

  setOnSendMessage(handler: (text: string) => void): void { this.onSendMessage = handler; }
  setOnEditMessage(handler: (id: string, text: string) => void): void { this.onEditMessage = handler; }

  private setupEventListeners(): void {
    this.container.addEventListener('click', (e: Event) => {
      if ((e.target as HTMLElement).id === 'composer-send') this.send();
    });

    this.container.addEventListener('keydown', (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      
      if (target.id === 'composer-input' && e.key === 'Enter') {
        this.send();
      }
      
      if (target.hasAttribute('contenteditable') && e.key === 'Enter') {
        e.preventDefault();
        target.blur();
      }
    });

    this.container.addEventListener('dblclick', (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('message__text')) {
        target.setAttribute('contenteditable', 'true');
        target.focus();
      }
    });
  }

  private send(): void {
    const input = this.container.querySelector('#composer-input') as HTMLInputElement;
    const text = input?.value.trim();
    if (text) {
      this.onSendMessage(text);
      if (input) input.value = ""; 
    }
  }

  private handleMutations(mutations: MutationRecord[]): void {
    for (const mutation of mutations) {
      if (mutation.type !== 'characterData' && mutation.type !== 'childList') continue;

      const node = mutation.target.nodeType === Node.TEXT_NODE ? mutation.target.parentElement : mutation.target;
      const target = node as HTMLElement;

      if (target?.classList.contains('message__text') && target.getAttribute('contenteditable') === 'true') {
        const id = target.getAttribute('data-message-id');
        const newText = target.textContent?.trim();
        
        if (id && newText) {
          this.onEditMessage(id, newText);
        }
      }
    }
  }

  render(state: ChatState): void {
    this.observer.disconnect();

    this.container.innerHTML = this.compiledTemplate(state);
    this.scrollToBottom();

    this.observer.observe(this.container, { characterData: true, childList: true, subtree: true });
  }

  private scrollToBottom(): void {
    const section = this.container.querySelector('#messages');
    if (section) section.scrollTop = section.scrollHeight;
  }
}