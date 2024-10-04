import { getDiffLines } from "../../script/unified-format"
import { RenderLines } from "../renderLines/RenderLines"
import "./style.css"

export const setupContainer = (element: HTMLElement) => {
  element.innerHTML = `
    <main class="container-main">
    </main>
  `

  const highlightLines = getDiffLines()

  const containerElement =
    element.querySelector<HTMLDivElement>(".container-main")!
  // RenderLines(containerElement, splitLines) // 通常の表示
  RenderLines(containerElement, highlightLines) // 単語ハイライト表示
}
