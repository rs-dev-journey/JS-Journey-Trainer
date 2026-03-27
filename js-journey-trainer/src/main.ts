import 'normalize.css';
import './style.css';

import { startApp } from './app';

const root = document.createElement('div');
root.id = 'app';
document.body.append(root);

void startApp(root);
