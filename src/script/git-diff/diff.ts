import { getContentFromJson } from "./getContentFromJson"
import { getStringDiff } from "./getStringDiff"
import { outputStringFile } from "./outputStringFile"

interface DiffArgs {
  basePath: string
  targetPath: string
  outPath: string
}
type Diff = (args: DiffArgs) => Promise<string[]>

/**
 * analyzed.jsonファイルの差分を取得し、diff.tsファイルとして出力します。
 */
export const diff: Diff = async ({ basePath, targetPath, outPath }) => {
  const baseFile = getContentFromJson(basePath)
  const targetFile = getContentFromJson(targetPath)

  const pageLength = Math.max(baseFile.length, targetFile.length)

  const diffs = []
  for (let i = 0; i < pageLength; i++) {
    diffs.push(await getStringDiff(baseFile[i], targetFile[i]))
  }
  const diffString = diffs.join("")

  outputStringFile(outPath, diffString)
  return diffs
}
