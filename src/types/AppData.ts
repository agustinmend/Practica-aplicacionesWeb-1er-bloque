import { Channel } from "./channel";
import { CurrentUser } from "./currentUser";
import { User } from "./user";
import { WorkSpace } from "./workspace";

export interface AppData {
  currentUser: CurrentUser;
  workspace: WorkSpace;
  channels: Channel[];
  users: User[];
}
