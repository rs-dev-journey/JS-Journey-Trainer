import createElement from '@/shared/lib/dom/create-element';
import type { AboutFeature } from '../model/types';
import './about-features.css';

function createSectionHeader(title: string): HTMLDivElement {
  const header = createElement('div', {
    classList: ['about-section-header'],
  });

  const leftLine = createElement('span', {
    classList: ['about-section-header__line'],
    attributes: {
      ariaHidden: 'true',
    },
  });

  const heading = createElement('h2', {
    textContent: title,
    classList: ['about-section-header__title'],
  });
  heading.id = 'about-features-title';

  const rightLine = createElement('span', {
    classList: ['about-section-header__line'],
    attributes: {
      ariaHidden: 'true',
    },
  });

  header.append(leftLine, heading, rightLine);

  return header;
}

function createFeatureCard(feature: AboutFeature): HTMLLIElement {
  const item = createElement('li', {
    classList: ['about-features__item'],
  });

  const article = createElement('article', {
    classList: ['feature-card'],
  });

  const title = createElement('h3', {
    classList: ['feature-card__title'],
    textContent: feature.title,
  });

  const description = createElement('p', {
    classList: ['feature-card__description'],
    textContent: feature.description,
  });

  article.append(title, description);
  item.append(article);

  return item;
}

export function createAboutFeatures(title: string, features: AboutFeature[]): HTMLElement {
  const section = createElement('section', { classList: ['about-features'] });
  section.setAttribute('aria-labelledby', 'about-features-title');

  const header = createSectionHeader(title);

  const list = createElement('ul', { classList: ['about-features__list'] });

  for (const feature of features) {
    list.append(createFeatureCard(feature));
  }

  section.append(header, list);

  return section;
}
