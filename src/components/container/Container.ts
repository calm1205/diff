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
  const alignmentLines = alignmentLine(trimmed, true) // アラインメント一致
  // const alignmentLines = alignmentLine(trimmed, false) // アラインメント不一致
  const splitLines = splitUnifiedFormat(alignmentLines)
  const highlightLines = getHighlightLines(
    splitLines.originalLines,
    splitLines.modifiedLines,
  )

  const containerElement =
    element.querySelector<HTMLDivElement>(".container-main")!
  // RenderLines(containerElement, splitLines) // 通常の表示
  RenderLines(containerElement, highlightLines) // 単語ハイライト表示
}
