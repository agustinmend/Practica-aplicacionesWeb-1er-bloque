import DATA_URL from '../mock/data.json?url';
import { AppData} from './types/AppData';
import { Channel } from './types/channel';
import { User } from './types/user';

export async function loadData(): Promise<AppData> {
  const res = await fetch(DATA_URL);
  if (!res.ok) {
    throw new Error(`Error HTTP: ${res.status}`);
  }
  return res.json();
}

export async function getChannels(): Promise<Channel[]> {
  const data = await loadData();
  return data.channels;
}

export async function getUsers(): Promise<User[]> {
  const data = await loadData();
  return data.users;
}