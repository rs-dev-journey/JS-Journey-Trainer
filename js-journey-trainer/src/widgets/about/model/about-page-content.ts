import type { AboutPageContent } from './types';

export const aboutPageContent: AboutPageContent = {
  hero: {
    logoText: 'JS',
    title: 'JS Journey Trainer',
    subtitle: 'An Educational Platform for Practicing JavaScript Skills',
    description: 'Improve your JavaScript skills through interactive widgets and tests.',
  },

  featuresTitle: 'Our Features',

  features: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      description: 'Track your progress',
    },
    {
      id: 'practice',
      title: 'Practice',
      description: 'Learning widgets',
    },
    {
      id: 'quiz-tests',
      title: 'Quiz / Tests',
      description: 'Interactive quizzes',
    },
    {
      id: 'true-false',
      title: 'True / False',
      description: 'Quick knowledge check',
    },
    {
      id: 'async-sorter',
      title: 'Async Sorter',
      description: 'Asynchronous challenges',
    },
  ],

  teamTitle: 'Meet the Team',

  teamMembers: [
    {
      id: 'member-1',
      name: 'Valeria',
      githubUrl: 'https://github.com/lertti',
      githubLabel: 'GitHub',
    },
    {
      id: 'member-2',
      name: 'Evgeny',
      githubUrl: 'https://github.com/kupzov2000',
      githubLabel: 'GitHub',
    },
    {
      id: 'member-3',
      name: 'Sabina',
      githubUrl: 'https://github.com/SabinaBatrakova',
      githubLabel: 'GitHub',
    },
  ],
};
