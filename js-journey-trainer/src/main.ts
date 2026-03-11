import 'normalize.css';
import './style.css';

console.log('hi!');
import { DashboardService } from '@/widgets/dashboard';

const bootstrap = async () => {
    try {
        await DashboardService.init();

        console.log('Dashboard successfully initialized 🐫');
        
    } catch (error) {
        console.error('App start error:', error);
    }
};

document.addEventListener('DOMContentLoaded', bootstrap);