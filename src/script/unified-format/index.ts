import { unifiedFormatLicense } from "../../fixtures/unified-format_license"
import { alignmentLine } from "./alignmentLine"
import { getHighlightLines } from "./highlightLines"
import { splitUnifiedFormat } from "./splitUnifiedFormat"
import { trimUnifiedFormat } from "./trimUnifiedFormat"

export const getDiffLines = () => {
  // const trimmed = trimUnifiedFormat(unifiedFormat)
  const trimmed = trimUnifiedFormat(unifiedFormatLicense)

  const alignmentLines = alignmentLine(trimmed, true) // アラインメント一致
  // const alignmentLines = alignmentLine(trimmed, false) // アラインメント不一致

  const splitLines = splitUnifiedFormat(alignmentLines)
  const highlightLines = getHighlightLines(
    splitLines.originalLines,
    splitLines.modifiedLines,
  )

  return highlightLines
}
