import { sortSimilarity } from "./sortSimilarity"

export interface TargetLine {
  index: number
  type: "+" | "-"
  line: string
}

/**
 * -と+が連続する塊の行を類似度を元に入れ替える
 */
export const alignmentLine = (lines: string[]) => {
  // 並べ替える対象の行
  const targetLineGroups: TargetLine[] = []
  const isNeedSort = () => {
    return (
      targetLineGroups.find(({ type }) => type === "-") &&
      targetLineGroups.find(({ type }) => type === "+")
    )
  }

  const alignedLines: string[] = []

  lines.forEach((line, index) => {
    switch (line.charAt(0)) {
      case "-":
        targetLineGroups.push({ index, type: "-", line })
        break
      case "+":
        targetLineGroups.push({ index, type: "+", line })
        break
      default:
        if (isNeedSort()) {
          // 並べ替え
          const sortedLines = sortSimilarity(targetLineGroups)
          alignedLines.push(...sortedLines)
          alignedLines.push(line)
          targetLineGroups.length = 0
        } else {
          alignedLines.push(...targetLineGroups.map(({ line }) => line))
          alignedLines.push(line)
        }
        break
    }
  })

  return alignedLines
}
