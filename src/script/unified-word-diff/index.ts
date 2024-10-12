import { getSplitLineGroups } from "./getSplitLineGroups"
import { diff } from "@/fixtures/1.no-diff/diff"

const splitLines = diff.split("\n")
export const splitLinesGroup = getSplitLineGroups(splitLines)
