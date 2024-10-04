import "./style.css"

const classHighlight = (line: string) => {
  if (line.includes(`+`)) return "render-lines-highlight-add"
  if (line.includes(`-`)) return "render-lines-highlight-delete"
  return ""
}

export const RenderLines = (
  element: HTMLElement,
  highlightLines: {
    hOriginalLines: string[]
    hModifiedLines: string[]
  },
) => {
  element.innerHTML = highlightLines.hOriginalLines
    .map(
      (_, index) => `
      <div class="render-lines-wrap">
        <p class="render-lines-paragraph original">
          <span class="render-lines-index">${index}</span>
          <span class="${classHighlight(highlightLines.hOriginalLines[index])}">
            ${highlightLines.hOriginalLines[index] || "&nbsp;"}
          </span>
        </p>
        <p class="render-lines-paragraph modified">
          <span class="render-lines-index">${index}</span>
          <span class="${classHighlight(highlightLines.hModifiedLines[index])}">
            ${highlightLines.hModifiedLines[index] || "&nbsp;"}
          </span>
        </p>
      </div>
      `,
    )
    .join("")
}
