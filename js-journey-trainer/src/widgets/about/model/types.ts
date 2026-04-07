export interface AboutHeroContent {
  logoText: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface AboutFeature {
  id: string;
  title: string;
  description: string;
}

export interface AboutTeamMember {
  id: string;
  name: string;
  githubUrl: string;
  githubLabel: string;
}

export interface AboutPageContent {
  hero: AboutHeroContent;
  featuresTitle: string;
  features: AboutFeature[];
  teamTitle: string;
  teamMembers: AboutTeamMember[];
}
