import { getContentFromJson } from "./getContentFromJson"
import { getStringDiff } from "./getStringDiff"
import { outputStringFile } from "./outputStringFile"

interface DiffFullPageArgs {
  basePath: string
  targetPath: string
  outPath: string
}
type DiffFullPage = (args: DiffFullPageArgs) => Promise<string[]>

export const diffFullPage: DiffFullPage = async ({
  basePath,
  targetPath,
  outPath,
}) => {
  const isFullPage = true
  const baseFile = getContentFromJson({
    analyzedJsonPath: basePath,
    isFullPage,
  })
  const targetFile = getContentFromJson({
    analyzedJsonPath: targetPath,
    isFullPage,
  })

  const startTime = performance.now()
  const diffs = [await getStringDiff(baseFile[0], targetFile[0])]
  console.log("diffFullPage: ", performance.now() - startTime, "ms")
  const diffString = diffs.join("")

  outputStringFile(outPath, diffString)
  return diffs
}
