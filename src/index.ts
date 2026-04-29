import './styles/avatar.css';
import './styles/base.css';
import './styles/channel-list.css';
import './styles/chat.css';
import './styles/composer.css';
import './styles/dm-list.css';
import './styles/members-panel.css';
import './styles/message.css';
import './styles/sidebar.css';
import './styles/workspace-bar.css';
import { loadData } from './api';
import { AppModel } from './models/AppModel';
import { AppController } from './controllers/AppController';
import { AppData } from './types/AppData';
import Handlebars from 'handlebars';
import messagePartial from './components/chat/message.hbs?raw';

Handlebars.registerPartial('message', messagePartial);
async function bootstrap() {
  try {
    const data: AppData = await loadData();
    
    const model = new AppModel(data);
    
    new AppController(model);
    
  } catch (error) {
    console.error("Error crítico al iniciar la aplicación:", error);
    document.getElementById('app-root')!.innerHTML = "<h1>Error al cargar la aplicación</h1>";
  }
}

document.addEventListener("DOMContentLoaded", bootstrap);