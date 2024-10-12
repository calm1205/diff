import { getSplitLineGroups } from "./getSplitLineGroups"
// import { diff } from "@/fixtures/1.no-diff/diff"
// import { diff } from "@/fixtures/2.word-diff/diff"
// import { diff } from "@/fixtures/3.line-diff/diff"
// import { diff } from "@/fixtures/4.switch-line-diff/diff"
// import { diff } from "@/fixtures/5.100-page-diff/diff"
// import { diff } from "@/fixtures/6.large-diff/diff"
// import { diff } from "@/fixtures/7.page-break-diff/diff"
import { diff } from "@/fixtures/8.doc-diff/diff"
// import { diff } from "@/fixtures/9.eng-diff/diff"

const splitLines = diff.split("\n")
export const splitLinesGroup = getSplitLineGroups(splitLines)
