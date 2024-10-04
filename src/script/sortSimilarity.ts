import { TargetLine } from "./alignmentLine"

import { getParingLines } from "./paringLines"

export const sortSimilarity = (targetLines: TargetLine[]) => {
  const addLines = targetLines.filter((line) => line.type === "+")
  const delLines = targetLines.filter((line) => line.type === "-")

  const tightLines = addLines.length > delLines.length ? addLines : delLines
  const looseLines = addLines.length > delLines.length ? delLines : addLines

  const paringLines = getParingLines(tightLines, looseLines)

  // scoreが最も低いものはpareLineが無いものとする
  paringLines.sort((a, b) => b.score - a.score).at(-1)!.pareLineIndex = NaN
  const sortedIndexLines = paringLines.sort(
    (a, b) => a.targetLine.index - b.targetLine.index,
  )

  const sortedLines: string[] = []
  sortedIndexLines.forEach((paringLine) => {
    const type = paringLine.targetLine.type
    const reverseType = type === "+" ? "-" : "+"

    if (isNaN(paringLine.pareLineIndex)) {
      // 必ず - を先に追加
      type === "-"
        ? sortedLines.push(paringLine.targetLine.line)
        : sortedLines.push(reverseType)
      type === "+"
        ? sortedLines.push(paringLine.targetLine.line)
        : sortedLines.push(reverseType)
    } else {
      const pareLine = looseLines.find(
        ({ index }) => index === paringLine.pareLineIndex,
      )!.line

      // 必ず - を先に追加
      type === "-"
        ? sortedLines.push(paringLine.targetLine.line)
        : sortedLines.push(pareLine)
      type === "+"
        ? sortedLines.push(paringLine.targetLine.line)
        : sortedLines.push(pareLine)
    }
  })

  return sortedLines
}

// console.log(
//   sortSimilarity([
//     {
//       index: 0,
//       type: "-",
//       line: "吾輩はここで始めて人間というものを見た。",
//     },
//     {
//       index: 1,
//       type: "-",
//       line: "しかもあとで聞くとそれは書生という人間中で一番獰悪どうあくな種族であったそうだ。",
//     },
//     {
//       index: 2,
//       type: "+",
//       line: "吾輩はここで始めてニンゲンというものを見た。",
//     },
//     {
//       index: 3,
//       type: "+",
//       line: "insert",
//     },
//     {
//       index: 4,
//       type: "+",
//       line: "しかもあとで聞くとそれは書生というニンゲン中で一番獰悪どうあくな種族であったそうだ。",
//     },
//   ]),
// )
