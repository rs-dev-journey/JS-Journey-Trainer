import { aboutPageContent } from '../model/about-page-content';
import { createAboutFeatures } from './create-about-features';
import { createAboutHero } from './create-about-hero';
import { createAboutTeam } from './create-about-team';

export function createAboutWidget() {
  const container = document.createElement('div');
  container.className = 'about-page__container';

  const hero = createAboutHero(aboutPageContent.hero);
  const features = createAboutFeatures(aboutPageContent.featuresTitle, aboutPageContent.features);
  const team = createAboutTeam(aboutPageContent.teamTitle, aboutPageContent.teamMembers);

  container.append(hero, features, team);

  return container;
}
