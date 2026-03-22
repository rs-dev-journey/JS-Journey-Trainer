import 'normalize.css';
import './style.css';
import { renderHeader } from './widgets/header';

console.log('hi!');

const bootstrap = () => {
  const root = document.body;
  renderHeader(root);

  console.log('Header initialized 🚀');
};

document.addEventListener('DOMContentLoaded', bootstrap);
