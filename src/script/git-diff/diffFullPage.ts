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
  const baseFile = getAnalyzedText({ jsonPath: basePath, isFullPage }) as string
  const targetFile = getAnalyzedText({
    jsonPath: targetPath,
    isFullPage,
  }) as string

  const startTime = performance.now()
  const diffs = [await getStringDiff(baseFile, targetFile)]
  console.log("diffFullPage: ", performance.now() - startTime, "ms")
  const diffString = diffs.join("")

  outputStringFile(outPath, diffString)
  return diffs
}
