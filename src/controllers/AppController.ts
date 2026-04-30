import { AppModel } from '../models/AppModel';
import { Router } from '../router';
import { LayoutComponent } from '../components/layout/layout';
import { SidebarComponent } from '../components/sidebar/sidebar';
import { ChatComponent } from '../components/chat/chat';
import { MembersComponent } from '../components/members/members';
import { Executor } from '../utils/executor';
import { SendMessageCommand } from '../utils/sendMessageCommand';
import { EditMessageCommand } from '../utils/editMessageCommand';

export class AppController {
  private model: AppModel;
  private router: Router;
  private executor : Executor;
  private sidebar: SidebarComponent;
  private chat: ChatComponent;
  private members: MembersComponent;

  constructor(model: AppModel) {
    this.model = model;
    this.executor = new Executor();
    const layout = new LayoutComponent('app-root');
    layout.render();

    this.sidebar = new SidebarComponent('sidebar-container');
    this.chat = new ChatComponent('chat-container');
    this.members = new MembersComponent('members-container');

    this.sidebar.setOnChannelClick((channelId: string) => {
      this.router.navigate(`/c/${channelId}`);
    });

    this.chat.setOnSendMessage((text: string) => {
      const command = new SendMessageCommand(this.model, text);
      this.executor.execute(command);
    });

    this.chat.setOnEditMessage((messageId: string, text: string) => {
      const command = new EditMessageCommand(this.model, messageId, text);
      this.executor.execute(command);
    });

    this.model.observer.subscribe(() => {
      this.updateAllViews();
    });

    this.router = new Router((channelId) => {
      try {
        this.model.setCurrentChannelId(channelId);
      } catch (e) {
        console.warn("Ruta inválida, volviendo al general");
        this.router.navigate("/c/c-general");
      }
    });

    this.router.handleCurrentRoute();
    document.addEventListener("keydown", (e : KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'z') {
        e.preventDefault();
        this.executor.undoLast();
      }
    });
  }

  private updateAllViews(): void {
    this.updateSidebarView();
    this.updateChatView();
    this.updateMembersView();
  }

  private updateSidebarView(): void {
    const currentChannel = this.model.getCurrentChannel();
    const channelsView = this.model.getChannels().map(c => ({
      ...c,
      isActive: c.id === currentChannel.id
    }));
    this.sidebar.render({ channels: channelsView });
  }

  private updateChatView(): void {
    const ch = this.model.getCurrentChannel();
    const users = this.model.getUsers();

    const messagesView = ch.messages.map(m => {
      const author = users.find(u => u.id === m.authorId);
      if (!author) throw new Error(`Usuario ${m.authorId} no encontrado`);
      return {
        id: m.id,
        authorName: author.name,
        authorAvatar: author.avatar,
        time: m.time,
        text: m.text
      };
    });

    this.chat.render({
      channelName: ch.name,
      channelTopic: ch.topic,
      memberCount: ch.members.length,
      messages: messagesView
    });
  }

  private updateMembersView(): void {
    const ch = this.model.getCurrentChannel();
    const users = this.model.getUsers();
    
    const membersData = ch.members.map(memberId => {
       const u = users.find(user => user.id === memberId);
       if (!u) throw new Error(`Miembro ${memberId} no encontrado`);
       return u;
    });

    this.members.render({ members: membersData });
  }
  
}