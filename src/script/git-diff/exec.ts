import { diff } from "./diff"
import { getRootPath } from "@/src/script/lib"

const rootDir = getRootPath()
const dir = "8.doc-diff"

const diffResult = await diff({
  basePath: `${rootDir}fixtures/${dir}/doc-analyzed.json`,
  targetPath: `${rootDir}fixtures/${dir}/diff-analyzed.json`,
  outPath: `${rootDir}fixtures/${dir}/diff.ts`,
})
console.log(diffResult)
