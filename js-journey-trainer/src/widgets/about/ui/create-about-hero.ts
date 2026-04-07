import createElement from '@/shared/lib/dom/create-element';
import type { AboutHeroContent } from '../model/types';
import './about-hero.css';

export function createAboutHero(hero: AboutHeroContent): HTMLElement {
  const section = createElement('section', { classList: ['about-hero'] });

  const content = createElement('div', { classList: ['about-hero__content'] });

  const brand = createElement('div', { classList: ['about-hero__brand'] });

  const logo = createElement('div', {
    textContent: hero.logoText,
    classList: ['about-hero__logo'],
  });
  logo.setAttribute('aria-hidden', 'true');

  const title = createElement('h1', { textContent: hero.title, classList: ['about-hero__title'] });

  const subtitle = createElement('p', {
    textContent: hero.subtitle,
    classList: ['about-hero__subtitle'],
  });

  const description = createElement('p', {
    textContent: hero.description,
    classList: ['about-hero__description'],
  });

  brand.append(logo, title);
  content.append(brand, subtitle, description);
  section.append(content);

  return section;
}
