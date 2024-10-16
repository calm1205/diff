import { getRootPath } from "@/src/script/lib"
// import { diffByPage } from "./diffByPage"
import { diffFullPage } from "./diffFullPage"

const rootDir = getRootPath()

// const dir = "1.no-diff"
// const dir = "2.word-diff"
// const dir = "3.line-diff"
// const dir = "4.switch-line-diff"
// const dir = "5.100-page-diff"
const dir = "6.large-diff"
// const dir = "7.page-break-diff"
// const dir = "8.doc-diff"
// const dir = "9.eng-diff"

const basePath = `${rootDir}fixtures/${dir}/docx-analyzed.json`
const targetPath = `${rootDir}fixtures/${dir}/diff2-analyzed.json`
const outPath = `${rootDir}fixtures/${dir}/diff.ts`

/**
 * ページごとにdiffを取得します。
 *
 * fileA vs fileA'の場合
 * fileA(p1) vs fileA'(p1)
 * fileA(p2) vs fileA'(p2)
 * ...
 */
// await diffByPage({ basePath, targetPath, outPath })

/**
 * ページ全体でdiffを取得します。
 *
 * fileA vs fileA'の場合
 * fileA(p1~pn) vs fileA'(p1~pn)
 */
await diffFullPage({ basePath, targetPath, outPath })
