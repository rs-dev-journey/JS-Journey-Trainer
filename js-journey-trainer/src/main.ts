import 'normalize.css';
import './style.css';
import { createTestRunPage } from './pages/test-run-page';

console.log('hi!');

document.body.append(createTestRunPage());
