// cSpell:words figma
import { describe, expect, it } from 'vitest';
import figmaSds from './examples/figma-sds.js';
import githubPrimer from './examples/github-primer.js';
import { prettyJSON } from './utils.js';

describe('prettyJSON', () => {
  describe('Figma SDS', () => {
    it.each(Object.entries(figmaSds))('%s', (_, contents) => {
      const result = prettyJSON(JSON.parse(contents));
      expect(result).toMatchSnapshot();
      expect(() => JSON.parse(result)).not.toThrowError();
    });
  });

  describe('GitHub Primer', () => {
    it.each(Object.entries(githubPrimer))('%s', (_, contents) => {
      const result = prettyJSON(JSON.parse(contents));
      expect(result).toMatchSnapshot();
      expect(() => JSON.parse(result)).not.toThrowError();
    });
  });
});
