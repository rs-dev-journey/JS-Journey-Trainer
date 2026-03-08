import 'normalize.css';
import './style.css';
import { createTestPage } from './pages/tests-page/ui/tests-page';

console.log('hi!');

document.body.append(createTestPage('user-1'));
