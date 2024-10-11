import { unifiedWordDiffLicense } from "@/fixtures/unified-word-diff_license"
import { getSplitLineGroups } from "./getSplitLineGroups"

const splitLines = unifiedWordDiffLicense.split("\n")
export const splitLinesGroup = getSplitLineGroups(splitLines)
