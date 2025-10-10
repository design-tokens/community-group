export default function transform() {
  return function transformer(tree) {
    const toc = [];
    let last;
    for (const n of tree.children) {
      if (n.tagName !== 'h2' && n.tagName !== 'h3') {
        continue;
      }
      const next = {
        ...n,
        title: n.children
          .filter((c) => c.type === 'text')
          .map((c) => c.value)
          .join(' '),
        children: [],
      };
      // if this is a subitem, append to current parent
      if (n.tagName === 'h3' && last) {
        last.children.push(next);
      }
      // otherwise, add new top-level item
      else {
        toc.push(next);
      }
      if (n.tagName === 'h2') {
        last = next;
      }
    }

    if (!toc.length) {
      return;
    }

    tree.children.push({
      type: 'element',
      tagName: 'div',
      properties: { class: 'toc' },
      children: [
        {
          type: 'element',
          tagName: 'h4',
          children: [{ type: 'text', value: 'Contents' }],
        },
        {
          type: 'element',
          tagName: 'ol',
          children: toc.map((item) => ({
            type: 'element',
            tagName: 'li',
            children: [
              {
                type: 'element',
                tagName: 'a',
                properties: { href: `#${item.properties?.id}` },
                children: [{ type: 'text', value: item.title }],
              },
              ...(item.children.length
                ? [
                    {
                      type: 'element',
                      tagName: 'ol',
                      children: item.children.map((subitem) => ({
                        type: 'element',
                        tagName: 'li',
                        children: [
                          {
                            type: 'element',
                            tagName: 'a',
                            properties: { href: `#${subitem.properties?.id}` },
                            children: [{ type: 'text', value: subitem.title }],
                          },
                        ],
                      })),
                    },
                  ]
                : []),
            ],
          })),
        },
      ],
    });
  };
}
