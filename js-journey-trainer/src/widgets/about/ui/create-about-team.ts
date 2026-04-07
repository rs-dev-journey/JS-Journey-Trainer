import createElement from '@/shared/lib/dom/create-element';
import type { AboutTeamMember } from '../model/types';
import githubIcon from '../images/github.png';
import './about-team.css';

function createSectionHeader(title: string): HTMLElement {
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
    attributes: {
      id: 'about-team-title',
    },
  });

  const rightLine = createElement('span', {
    classList: ['about-section-header__line'],
    attributes: {
      ariaHidden: 'true',
    },
  });

  header.append(leftLine, heading, rightLine);

  return header;
}

function createGithubLink(member: AboutTeamMember): HTMLAnchorElement {
  const icon = createElement('img', {
    classList: ['team-card__link-icon'],
    attributes: { src: githubIcon, alt: 'github-logo' },
  });

  const text = createElement('span', {
    classList: ['team-card__link-text'],
    textContent: member.githubLabel,
  });

  const link = createElement('a', {
    classList: ['team-card__link'],
    attributes: {
      href: member.githubUrl,
      target: '_blank',
      rel: 'noopener noreferrer',
    },
  });
  link.setAttribute('aria-label', `${member.name} GitHub profile`);

  link.append(icon, text);

  return link;
}

function createTeamCard(member: AboutTeamMember): HTMLLIElement {
  const item = createElement('li', {
    classList: ['about-team__item'],
  });

  const article = createElement('article', {
    classList: ['team-card'],
  });

  const name = createElement('h3', {
    classList: ['team-card__name'],
    textContent: member.name,
  });

  const link = createGithubLink(member);

  article.append(name, link);
  item.append(article);

  return item;
}

export function createAboutTeam(title: string, members: AboutTeamMember[]): HTMLElement {
  const section = createElement('section', { classList: ['about-team'] });
  section.setAttribute('aria-labelledby', 'about-team-title');

  const header = createSectionHeader(title);

  const list = createElement('ul', {
    classList: ['about-team__list'],
  });

  for (const member of members) {
    list.append(createTeamCard(member));
  }

  section.append(header, list);

  return section;
}
