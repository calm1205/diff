import "./style.css"

export const RenderLines = (element: HTMLElement, lines: string[]) => {
  element.innerHTML = `
    <div>
      ${lines
        .map(
          (line, index) => `
        <p class="render-lines-paragraph">
          <span class="render-lines-index">${index}</span>
          ${line || "&nbsp;"}
        </p>
        `,
        )
        .join("")}
    </div>
  `
}
