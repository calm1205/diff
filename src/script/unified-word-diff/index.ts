import { unifiedWordDiffLicense } from "../../fixtures/unified-word-diff_license"
import { getSplitLineGroups } from "./getSplitLineGroups"
import { getSplitLines } from "./getSplitLines"

const splitLines = getSplitLines(unifiedWordDiffLicense)
export const splitLinesGroup = getSplitLineGroups(splitLines)
