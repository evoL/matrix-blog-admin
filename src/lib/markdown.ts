import MarkdownIt from "markdown-it";

export function convertToHtml(markdown) {
  const md = new MarkdownIt();
  return md.render(markdown);
}
