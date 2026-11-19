// Draws Markdown's mermaid code blocks, which Raindown renders as <pre lang="mermaid">, as diagrams.
// Mermaid only loads on a page that has one.
document.addEventListener('DOMContentLoaded', async () => {
  const blocks = document.querySelectorAll('pre[lang="mermaid"]');
  if (blocks.length === 0) return;

  const { default: mermaid } = await import('https://cdn.jsdelivr.net/npm/mermaid@11.4.1/dist/mermaid.esm.min.mjs');
  mermaid.initialize({ startOnLoad: false, theme: 'dark' });

  const diagrams = [...blocks].map((block) => {
    const diagram = document.createElement('div');
    diagram.className = 'mermaid';
    diagram.textContent = block.textContent;
    block.replaceWith(diagram);
    return diagram;
  });
  await mermaid.run({ nodes: diagrams });
});
