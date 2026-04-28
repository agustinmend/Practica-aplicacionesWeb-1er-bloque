import { AppData} from '../types/AppData';
import { Channel } from '../types/channel';
import { User } from '../types/user';

type Subscriber = () => void;

export class AppModel {
  private subscribers: Subscriber[] = [];
  
  private state: { data: AppData; currentChannelId: string };

  constructor(initialData: AppData) {
    const rawState = {
      data: initialData,
      currentChannelId: "c-general"
    };

    this.state = this.createReactiveProxy(rawState);
  }

  subscribe(callback: Subscriber): void {
    this.subscribers.push(callback);
  }

  private notify(): void {
    this.subscribers.forEach(callback => callback());
  }
  
  private createReactiveProxy<T extends object>(target: T): T {
    const handler: ProxyHandler<any> = {
      get: (obj, prop) => {
        const val = Reflect.get(obj, prop);
        if (typeof val === 'object' && val !== null) {
          return new Proxy(val, handler);
        }
        return val;
      },
      set: (obj, prop, value) => {
        const result = Reflect.set(obj, prop, value);
        if (prop !== 'length') {
          this.notify();
        }
        return result;
      }
    };

    return new Proxy(target, handler);
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
    const channel = this.getCurrentChannel();
    channel.messages.push({
      id: "m-" + Date.now().toString(),
      authorId: this.state.data.currentUser.id,
      text: text,
      time: new Date().toTimeString().slice(0, 5),
    });
  }
}