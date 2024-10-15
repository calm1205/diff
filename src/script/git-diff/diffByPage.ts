import { getAnalyzedText } from "./lib/getAnalyzedText"
import { getStringDiff } from "./lib/getStringDiff"
import { outputStringFile } from "./lib/outputStringFile"

interface DiffByPageArgs {
  basePath: string
  targetPath: string
  outPath: string
}
type DiffByPage = (args: DiffByPageArgs) => Promise<string[]>

/**
 * ２つのanalyzed.jsonファイルからテキストを抽出
 * 差分をpage毎に取得し、diff.tsファイルとして出力
 */
export const diffByPage: DiffByPage = async ({
  basePath,
  targetPath,
  outPath,
}) => {
  const baseFile = getAnalyzedText({ jsonPath: basePath })
  const targetFile = getAnalyzedText({ jsonPath: targetPath })

  const pageLength = Math.max(baseFile.length, targetFile.length)

  const diffs = []
  const startTime = performance.now()
  for (let i = 0; i < pageLength; i++) {
    diffs.push(await getStringDiff(baseFile[i] || "", targetFile[i] || ""))
  }
  console.log("diffByPage: ", performance.now() - startTime, "ms")
  const diffString = diffs.join("")

  outputStringFile(outPath, diffString)
  return diffs
}
