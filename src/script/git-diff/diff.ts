import { writeFileSync } from "node:fs"
import { getContentFromJson } from "./getContentFromJson"
import { diffString } from "./diffString"

interface DiffArgs {
  basePath: string
  targetPath: string
  outPath: string
}
type Diff = (args: DiffArgs) => Promise<string[]>

export const diff: Diff = async ({ basePath, targetPath, outPath }) => {
  const baseFile = getContentFromJson(basePath)
  const targetFile = getContentFromJson(targetPath)

  const pageLength = Math.max(baseFile.length, targetFile.length)

  const diffs = []
  for (let i = 0; i < pageLength; i++) {
    diffs.push(await diffString(baseFile[i], targetFile[i]))
  }

  writeFileSync(outPath, diffs.join(""))

  return diffs
}
