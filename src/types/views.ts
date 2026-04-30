export interface MessageView {
  id: string;
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