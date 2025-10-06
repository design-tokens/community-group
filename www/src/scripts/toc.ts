const content =
  typeof document !== 'undefined'
    ? document.querySelector('.md-content')
    : undefined;

const THRESHOLD_Y = 0.15; // % of window screen to accept the next heading (0.1 = 10%)

let currentI = 0;
let ys: number[] = [];

function debounce(cb: (...args: any[]) => void, timeout: number): typeof cb {
  let t: number | undefined;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => {
      cb(...args);
    }, timeout) as unknown as number;
  };
}

function calculateYs() {
  if (!content) {
    return;
  }
  ys = [];
  for (const el of content.querySelectorAll('h2,h3')) {
    // skip over ToC heading
    if (el.parentElement!.classList.contains('toc')) {
      continue;
    }
    ys.push(window.scrollY + el.getBoundingClientRect().y);
  }
}

function highlightNavItem(index = 0) {
  if (!content) {
    return;
  }
  content.querySelectorAll('.toc a').forEach((el, i) => {
    if (i === index) {
      el.setAttribute('aria-current', 'location');
    } else {
      el.removeAttribute('aria-current');
    }
  });
}

calculateYs();

highlightNavItem();

if (typeof globalThis.addEventListener === 'function') {
  globalThis.addEventListener('scroll', () => {
    let nextI = 0;
    if (window.scrollY >= 0.3 * window.innerHeight) {
      for (let i = 1; i < ys.length; i++) {
        if (window.scrollY + THRESHOLD_Y * window.innerHeight < ys[i]) {
          break;
        }
        nextI = i;
      }
    }
    if (nextI !== currentI) {
      currentI = nextI;
      highlightNavItem(currentI);
    }
  });

  globalThis.addEventListener(
    'resize',
    debounce(() => calculateYs(), 50),
  );
}
