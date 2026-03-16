import type { Question } from '@/entities/test';
import type { TestRunHeaderViewModel } from '../model/types';

export interface TestRunLayoutProps {
  title: string;
  headerViewModel: TestRunHeaderViewModel;
  currentQuestion: Question;
}

export interface TestRunHeaderControls {
  progressLabel: HTMLSpanElement;
  progressBar: HTMLDivElement;
  progressFill: HTMLDivElement;
}

export interface TestRunHeaderView {
  root: HTMLElement;
  controls: TestRunHeaderControls;
}

export interface TestRunLayoutControls extends TestRunHeaderControls {
  questionSection: HTMLElement;
  questionForm: HTMLFormElement;
}

export interface TestRunLayoutView {
  root: HTMLElement;
  controls: TestRunLayoutControls;
}
