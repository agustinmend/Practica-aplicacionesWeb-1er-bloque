import template from './chat.hbs?raw';
import Handlebars from 'handlebars';

export interface MessageView {
  authorName: string;
  authorAvatar: string;
  time: string;
  text: string;
}

export interface ChatState {
  channelName: string;
  channelTopic: string;
  memberCount: number;
  messages: MessageView[];
}

export class ChatComponent {
  private container: HTMLElement;
  private compiledTemplate: HandlebarsTemplateDelegate;
  
  private onSendMessageHandler: (text: string) => void = () => {};

  constructor(containerId: string) {
    const el = document.getElementById(containerId);
    if (!el) throw new Error(`Contenedor ${containerId} ausente.`);
    this.container = el;
    this.compiledTemplate = Handlebars.compile(template);

    this.container.addEventListener('click', (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.id === 'composer-send') {
        this.extractAndSendMessage();
      }
    });

    this.container.addEventListener('keydown', (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      if (target.id === 'composer-input' && e.key === 'Enter') {
        this.extractAndSendMessage();
      }
    });
  }

  setOnSendMessage(handler: (text: string) => void): void {
    this.onSendMessageHandler = handler;
  }

  private extractAndSendMessage(): void {
    const input = this.container.querySelector('#composer-input') as HTMLInputElement | undefined;
    if (!input) return;

    const text = input.value.trim();
    if (text !== "") {
      this.onSendMessageHandler(text);
      input.value = ""; 
    }
  }

  render(state: ChatState): void {
    this.container.innerHTML = this.compiledTemplate(state);
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    const messagesSection = this.container.querySelector('#messages');
    if (messagesSection) {
      messagesSection.scrollTop = messagesSection.scrollHeight;
    }
  }
}