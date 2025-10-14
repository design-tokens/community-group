/**
 * @name kebabify
 * @description Convert string to kebab case
 * @param {String} string The string to convert
 * @return {String} The kebab cased string
 * @see {@link https://www.geeksforgeeks.org/how-to-convert-a-string-into-kebab-case-using-javascript/|Source}
 */
export const kebabify = (string: string): string => {
  return string
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
};

/**
 * @name isLinkAbsolute
 * @description Determine if a link redirects to an external site
 * @param {String} path The url
 * @return {Boolean} If the link is external
 */
export const isLinkAbsolute = (path: string) => path.startsWith('https://');
