import { TargetLine } from "./alignmentLine"
import { cosineSimilarity } from "./cosineSimilarity"

interface ParingLine {
  score: number
  pareLineIndex: number
  targetLine: TargetLine
}

/**
 * とある２つの配列（[A1,A2,A3],[B1,B2]）の要素同士を比較
 * - A1 vs B1,
 * - A1 vs B2,
 * - A2 vs B1,
 * - A2 vs B2,
 * - A3 vs B1,
 * - A3 vs B2
 *
 * A側の各要素から見て最も類似度が高いB側の要素のindexと類似度を記録
 */
export const getParingLines = (
  baseLines: TargetLine[],
  targetLines: TargetLine[],
): ParingLine[] =>
  baseLines.map((baseLine) => {
    let maxScore = 0
    let pareLineIndex = 0
    targetLines.forEach((targetLine) => {
      const score = cosineSimilarity(baseLine.line, targetLine.line)
      if (score > maxScore) {
        maxScore = score
        pareLineIndex = targetLine.index
      }
    })

    return { score: maxScore, pareLineIndex, targetLine: baseLine }
  })
