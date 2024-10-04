// import { unifiedFormat } from "../../fixtures/unified-format"
import { unifiedFormatLicense } from "../../fixtures/unified-format_license"
import { alignmentLine } from "../../script/alignmentLine"
import { getHighlightLines } from "../../script/highlightLines"
import { splitUnifiedFormat } from "../../script/splitUnifiedFormat"
import { trimUnifiedFormat } from "../../script/trimUnifiedFormat"
import { RenderLines } from "../renderLines/RenderLines"
import "./style.css"

export const setupContainer = (element: HTMLElement) => {
  element.innerHTML = `
    <main class="container-main">
    </main>
  `

  // const trimmed = trimUnifiedFormat(unifiedFormat)
  const trimmed = trimUnifiedFormat(unifiedFormatLicense)
  const alignmentLines = alignmentLine(trimmed)
  const { originalLines, modifiedLines } = splitUnifiedFormat(alignmentLines)
  const highlightLines = getHighlightLines(originalLines, modifiedLines)

  const containerElement =
    element.querySelector<HTMLDivElement>(".container-main")!
  RenderLines(containerElement, highlightLines)
}
