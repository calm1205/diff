import { getContentFromJson } from "./getContentFromJson"
import { getStringDiff } from "./getStringDiff"
import { outputStringFile } from "./outputStringFile"

interface DiffByPageArgs {
  basePath: string
  targetPath: string
  outPath: string
}
type DiffByPage = (args: DiffByPageArgs) => Promise<string[]>

/**
 * analyzed.jsonファイルの差分を取得し、diff.tsファイルとして出力します。
 */
export const diffByPage: DiffByPage = async ({
  basePath,
  targetPath,
  outPath,
}) => {
  const baseFile = getContentFromJson({ analyzedJsonPath: basePath })
  const targetFile = getContentFromJson({ analyzedJsonPath: targetPath })

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
