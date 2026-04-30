import { Observer } from '../utils/observer';
import { createReactiveState } from '../utils/createReactiveState';
import { AppData } from '../types/AppData';
import { Channel } from '../types/channel';
import { User } from '../types/user';
import { Message } from '../types/message';
import { AppMemento } from '../utils/appMemento';

export class AppModel {
  public observer: Observer = new Observer();
  
  private state: { data: AppData; currentChannelId: string };

  constructor(initialData: AppData) {
    const rawState = {
      data: initialData,
      currentChannelId: "c-general"
    };

    this.state = createReactiveState(rawState, () => {
      this.observer.notify(this.state);
    });
  }

  getChannels(): Channel[] {
    return this.state.data.channels;
  }

  getUsers(): User[] {
    return this.state.data.users;
  }

  getCurrentChannel(): Channel {
    const channel = this.state.data.channels.find(c => c.id === this.state.currentChannelId);
    if (!channel) throw new Error(`Canal no encontrado.`);
    return channel;
  }

  setCurrentChannelId(id: string): void {
    const exists = this.state.data.channels.some(c => c.id === id);
    if (!exists) throw new Error(`Intento de navegar a canal inexistente: ${id}`);
    
    this.state.currentChannelId = id; 
  }

  addMessageToCurrentChannel(text: string): void {
    const newMessage: Message = {
      id: "m-" + Date.now().toString(),
      authorId: this.state.data.currentUser.id,
      text: text,
      time: new Date().toTimeString().slice(0, 5),
    };

    const updatedChannels = this.state.data.channels.map(channel => {
      if (channel.id === this.state.currentChannelId) {
        return { 
          ...channel, 
          messages: [...channel.messages, newMessage] 
        };
      }
      return channel;
    });

    this.state.data = {
      ...this.state.data,
      channels: updatedChannels
    };
  }
  createMemento(): AppMemento {
    return new AppMemento(this.state.data);
  }
  restoreMemento(memento: AppMemento): void {
    this.state.data = memento.getstate();
  }
}