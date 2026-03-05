import 'normalize.css';
import './style.css';

import { renderLoginPage } from './pages/auth';

const root = document.createElement('div');
root.id = 'app';
document.body.append(root);

renderLoginPage(root);
