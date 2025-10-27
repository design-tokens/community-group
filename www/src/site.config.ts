import { GITHUB_URL } from './consts.js';

// cSpell:words linkedin, bluesky
export const menu = {
  header: [
    { path: '/technical-reports/', title: 'Technical Reports' },
    { path: '/contribute/', title: 'Contribute' },
    { path: '/blog/', title: 'Blog' },
    { path: '/about/', title: 'About' },
  ],
  about: [
    { path: '/technical-reports/', title: 'Technical Reports' },
    { path: '/faq/', title: 'FAQ' },
    { path: '/resources/', title: 'Resources' },
    { path: '/glossary/', title: 'Glossary' },
    { path: '/contribute/', title: 'Contribute' },
  ],
  learn: [
    { path: '/about/', title: 'About' },
    { path: '/blog/', title: 'Blog' },
    { path: '/press-kit/', title: 'Press kit' },
    { path: 'https://opencollective.com/design-tokens', title: 'Donate' },
  ],
  social: [
    {
      path: GITHUB_URL,
      title: 'GitHub',
      icon: 'github',
    },
    {
      path: 'https://www.w3.org/community/design-tokens',
      title: 'W3C Community Group',
      icon: 'w3c',
    },
    {
      path: 'https://www.linkedin.com/company/design-tokens-community-group',
      title: 'LinkedIn',
      icon: 'linkedin',
    },
    {
      path: 'https://x.com/DesignTokens',
      title: 'X (formerly Twitter)',
      icon: 'x',
    },
    {
      path: 'https://bsky.app/profile/designtokens.org',
      title: 'Bluesky',
      icon: 'bluesky',
    },
    {
      path: 'https://opencollective.com/design-tokens',
      title: 'OpenCollective',
      icon: 'open-collective',
    },
  ],
};
