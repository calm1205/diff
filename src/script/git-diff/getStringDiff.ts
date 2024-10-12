import { unlinkSync, writeFileSync } from "node:fs"
import { getRootPath } from "../lib"
import { execGitDiff } from "./execGitDiff"

/**
 * 2つの文字列の差分を取得
 */
export const getStringDiff = async (
  baseString: string,
  targetString: string,
) => {
  const tmpBaseFilePath = getRootPath() + "baseFile.txt"
  const tmpTargetFilePath = getRootPath() + "targetFile.txt"

  writeFileSync(tmpBaseFilePath, baseString)
  writeFileSync(tmpTargetFilePath, targetString)

  const diff = await execGitDiff({
    baseFilePath: tmpBaseFilePath,
    targetFilePath: tmpTargetFilePath,
  })

  unlinkSync(tmpBaseFilePath)
  unlinkSync(tmpTargetFilePath)

  const trimmedDiff = removeGitDiffHeader(diff)
  return trimmedDiff || baseString
}

const removeGitDiffHeader = (diff: string) =>
  diff.replace(/^diff[\s\S]+\n@@.*\n/, "")
