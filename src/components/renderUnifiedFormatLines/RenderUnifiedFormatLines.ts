import "./style.css"

const classHighlight = (line: string) => {
  if (line.includes(`+`)) return "render-lines-highlight-add"
  if (line.includes(`-`)) return "render-lines-highlight-delete"
  return ""
}

export const RenderUnifiedFormatLines = (
  element: HTMLElement,
  highlightLines: {
    originalLines: string[]
    modifiedLines: string[]
  },
) => {
  element.innerHTML = highlightLines.originalLines
    .map(
      (_, index) => `
      <div class="render-lines-wrap">
        <p class="render-lines-paragraph original">
          <span class="render-lines-index">${index}</span>
          <span class="${classHighlight(highlightLines.originalLines[index])}">
            ${highlightLines.originalLines[index] || "&nbsp;"}
          </span>
        </p>
        <p class="render-lines-paragraph modified">
          <span class="render-lines-index">${index}</span>
          <span class="${classHighlight(highlightLines.modifiedLines[index])}">
            ${highlightLines.modifiedLines[index] || "&nbsp;"}
          </span>
        </p>
      </div>
      `,
    )
    .join("")
}
