import { describe, expect, it } from 'vitest';

import { menu } from './site.config';

describe('menu.social', () => {
  it('includes the official Discord community link', () => {
    expect(menu.social).toContainEqual({
      path: 'https://discord.gg/fkK6ZUXRkp',
      title: 'Discord',
      icon: 'discord',
    });
  });
});
