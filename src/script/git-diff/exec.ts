import { getRootPath } from "@/src/script/lib"
import { diffByPage } from "./diffByPage"
import { diffFullPage } from "./diffFullPage"

const rootDir = getRootPath()

const dir = "5.100-page-diff"
// const dir = "6.large-diff"

const basePath = `${rootDir}fixtures/${dir}/docx-analyzed.json`
const targetPath = `${rootDir}fixtures/${dir}/diff2-analyzed.json`
const outPath = `${rootDir}fixtures/${dir}/diff.ts`

// await diffByPage({ basePath, targetPath, outPath })
await diffFullPage({ basePath, targetPath, outPath })
