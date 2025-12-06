/** Everything is an object in JS */
export function printType(node: unknown): string {
  return Array.isArray(node) ? 'Array' : typeof node;
}

/**
 * This is a simple merge function, but will throw some validation errors if
 * two schemas don’t align
 */
export function mergeTokens(a: unknown, b: unknown) {
  // Note: “null” probably shouldn’t happen but allow it, as it could be an
  // implementation detail upstream loading the tokens

  // Null/undefined: if one set is missing this tree, take the other
  if (a === null || a === undefined) {
    return b;
  }
  if (b === null || b === undefined) {
    return a;
  }

  // Mismatch: throw error (since null cases have been handled)
  if (typeof a !== typeof b || Array.isArray(a) !== Array.isArray(b)) {
    throw new Error(
      `Can’t merge type ${printType(a)} with type ${printType(b)}`,
    );
  }

  // Arrays: replace a -> b
  if (Array.isArray(a)) {
    return structuredClone(b);
  }

  // Objects: merge groups, replace tokens (unless they mismatch)
  if (typeof a === 'object' && typeof b === 'object') {
    if ('$type' in a && '$type' in b && a.$type !== b.$type) {
      throw new Error(`Can’t merge $type: ${a.$type} with $type: ${b.$type}`);
    }

    // Tokens: replace a -> b
    const isToken = '$value' in a;
    if (isToken) {
      // TODO: we’re not validating the token schema
      return structuredClone(b);
    }

    // Groups: merge keys
    const newGroup: any = {};
    const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
    for (const k of [...keys]) {
      newGroup[k] = mergeTokens(
        (a as Record<string, any>)[k],
        (b as Record<string, any>)[k],
      );
    }
    // TODO: $extensions may get a little weird, should that one be merged or not?
    return newGroup;
  }

  // Everything else: return b
  return b;
}

/** Get a flat array of IDs from a deeply-nested structure */
export function getTokenIDs(json: any): Set<string> {
  const ids = new Set<string>();
  function walk(node: unknown, path: string[] = []) {
    if (!node || typeof node !== 'object') {
      return;
    }
    for (const [k, v] of Object.entries(node)) {
      if (!v || typeof v !== 'object') {
        continue;
      }
      if (v.$value) {
        ids.add([...path, k].join('.'));
      } else {
        walk(v, [...path, k]);
      }
    }
  }
  walk(json);
  return ids;
}

/** Flatten deeply-nested JSON into key–value map */
export function flatten(json: any): Record<string, any> {
  const flat: Record<string, any> = {};
  function walk(node: unknown, path: string[] = []) {
    if (!node || typeof node !== 'object') {
      return;
    }
    for (const [k, v] of Object.entries(node)) {
      if (!v || typeof v !== 'object') {
        continue;
      }
      if (v.$value) {
        flat[[...path, k].join('.')] = v.$value;
      } else {
        walk(v, [...path, k]);
      }
    }
  }
  walk(json);
  return flat;
}

/**
 * Format design tokens spec JSON where $value is always on one line
 */
export function prettyJSON(json: any) {
  let formatted = JSON.stringify(json, undefined, 2);
  const replacements: [number, number, string][] = [];
  for (const match of formatted.matchAll(/\{[^{]+"\$value":/g) ?? []) {
    let bracketCount = 1;
    const start = match.index;
    let end = -1;
    for (let i = start + match[0].length; i < formatted.length; i++) {
      if (formatted[i] === '{') {
        bracketCount++;
        continue;
      }
      if (formatted[i] === '}') {
        bracketCount--;
        if (bracketCount === 0) {
          end = i;
        }
        continue;
      }
      if (end !== -1) {
        break;
      }
    }
    replacements.push([
      start,
      end,
      formatted
        .substring(start, end)
        .replace(/\n+\s+/g, ' ')
        .replace(/\[\s+/g, '[')
        .replace(/\s+]/g, ']'),
    ]);
  }
  for (const [start, end, replacement] of replacements.reverse()) {
    formatted = `${formatted.substring(0, start)}${replacement}${formatted.substring(end)}`;
  }

  // format $refs to be on one line
  formatted = formatted.replaceAll(
    /\n\s*"\$ref"\s*[^}]+/g,
    (match) => ` ${match.trim()} `,
  );
  return formatted.replace(/\n+?$/, '\n');
}

/**
 * For a tokens JSON string being displayed in DiffEditor, generated a
 * "original" and "modified" string from a list of modified IDs.
 * Requires precise prettyJSON() formatting to work (one token ID per line).
 */
export function diffTokens(
  tokensString: string,
  modifiedIDs: Set<string>,
): { original: string; modified: string } {
  let original = '';
  const lines = tokensString.split('\n');
  const tokenParts: string[] = [];
  for (const ln of lines) {
    const spaces = ln.indexOf('"');
    if (spaces > 0) {
      const i = (spaces - 2) / 2;
      tokenParts.splice(i);
      const [name] = ln.split(':');
      tokenParts.push(JSON.parse(name));
      const id = tokenParts.join('.');
      if (!modifiedIDs.has(id)) {
        original += `${ln}\n`;
      }
    } else {
      original += `${ln}\n`;
    }
  }
  return {
    original: original.replace(/\n+?$/, '\n'),
    modified: tokensString.replace(/\n+?$/, '\n'),
  };
}
