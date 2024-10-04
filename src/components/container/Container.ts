// import { getDiffLines } from "../../script/unified-format"
// import { RenderUnifiedFormatLines } from "../renderUnifiedFormatLines/RenderUnifiedFormatLines"
import { splitLinesGroup } from "../../script/unified-word-diff"
import { RenderWordDiffLines } from "../renderWordDiffLines/RenderWordDiffLines"
import "./style.css"

export const setupContainer = (element: HTMLElement) => {
  element.innerHTML = `
    <main class="container-main">
    </main>
  `

  const containerElement =
    element.querySelector<HTMLDivElement>(".container-main")!

  // RenderUnifiedFormatLines(containerElement, getDiffLines())
  RenderWordDiffLines(containerElement, splitLinesGroup)
}
