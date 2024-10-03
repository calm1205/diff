import { unifiedFormat } from "../../fixtures/unified-format"
import { alignmentLine } from "../../script/alignmentLine"
import { splitUnifiedFormat } from "../../script/splitUnifiedFormat"
import { trimUnifiedFormat } from "../../script/trimUnifiedFormat"
import { RenderLines } from "../renderLines/RenderLines"
import "./style.css"

export const setupContainer = (element: HTMLElement) => {
  element.innerHTML = `
    <main class="container-main">
      <div class="original"></div>
      <div class="modified"></div>
    </main>
  `

  const trimmed = trimUnifiedFormat(unifiedFormat)
  const alignmentLines = alignmentLine(trimmed)
  const { originalLines, modifiedLines } = splitUnifiedFormat(alignmentLines)

  const originalElement = element.querySelector<HTMLDivElement>(".original")!
  const modifiedElement = element.querySelector<HTMLDivElement>(".modified")!
  RenderLines(originalElement, originalLines)
  RenderLines(modifiedElement, modifiedLines)
}
