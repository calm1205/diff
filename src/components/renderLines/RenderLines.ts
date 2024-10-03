import "./style.css"

const classHighlight = (line: string) => {
  if (line.includes(">+<")) {
    return "render-lines-highlight-add"
  }
  if (line.includes(">-<")) {
    return "render-lines-highlight-delete"
  }
  return ""
}

export const RenderLines = (element: HTMLElement, lines: string[]) => {
  element.innerHTML = `
    <div>
      ${lines
        .map(
          (line, index) => `
        <p class="render-lines-paragraph">
          <span class="render-lines-index">${index}</span>
          <span class="${classHighlight(line)}">
            ${line || "&nbsp;"}
          </span>
        </p>
        `,
        )
        .join("")}
    </div>
  `
}
