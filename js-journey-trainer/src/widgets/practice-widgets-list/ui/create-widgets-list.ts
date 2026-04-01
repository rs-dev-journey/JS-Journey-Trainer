import createElement from '@/shared/lib/dom/create-element';
import { widgetsConfig } from '../model/widgets-config';
import { createWidgetCard } from './create-widget-card';
import './widgets-list.css';

export function createWidgetsList(): HTMLElement {
  const widgetsList = createElement('section', { classList: ['practice-list'] });

  widgetsConfig.forEach((config) => widgetsList.append(createWidgetCard(config)));

  return widgetsList;
}
