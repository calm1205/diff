import { getAnalyzedText } from "./lib/getAnalyzedText"
import { getStringDiff } from "./lib/getStringDiff"
import { outputStringFile } from "./lib/outputStringFile"

interface DiffFullPageArgs {
  basePath: string
  targetPath: string
  outPath: string
}
type DiffFullPage = (args: DiffFullPageArgs) => Promise<string[]>

/**
 * ２つのanalyzed.jsonファイルからテキストを抽出
 * 差分を一括取得し、diff.tsファイルとして出力
 */
export const diffFullPage: DiffFullPage = async ({
  basePath,
  targetPath,
  outPath,
}) => {
  const isFullPage = true
  const baseFile = getAnalyzedText({ jsonPath: basePath, isFullPage })
  const targetFile = getAnalyzedText({ jsonPath: targetPath, isFullPage })

  const startTime = performance.now()
  const diffs = [await getStringDiff(baseFile[0], targetFile[0])]
  console.log("diffFullPage: ", performance.now() - startTime, "ms")
  const diffString = diffs.join("")

  outputStringFile(outPath, diffString)
  return diffs
}
