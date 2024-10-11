import { diff } from "./diff"
import { getRootPath } from "@/src/script/lib"

const diffResult = await diff({
  basePath: getRootPath() + "fixtures/1.no-diff/docx-analyzed.json",
  targetPath: getRootPath() + "fixtures/1.no-diff/pdf-analyzed.json",
  outPath: getRootPath() + "fixtures/1.no-diff/diff.txt",
})
console.log(diffResult)
