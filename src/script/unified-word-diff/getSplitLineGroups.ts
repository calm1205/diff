export const getSplitLineGroups = (lines: string[]) => {
  const originalLines: string[] = []
  const modifiedLines: string[] = []

  lines.forEach((line) => {
    if (isInsertLine(line)) {
      originalLines.push("[--]")
      modifiedLines.push(line)
    } else if (isDeleteLine(line)) {
      originalLines.push(line)
      modifiedLines.push("{++}")
    } else if (isModified(line)) {
      originalLines.push("[--]" + removeAddition(line))
      modifiedLines.push("{++}" + removeDeletion(line))
    } else {
      originalLines.push(line)
      modifiedLines.push(line)
    }
  })

  return { originalLines, modifiedLines }
}

function isInsertLine(line: string) {
  return /^\{\+[^\{]*\}$/.test(line)
}
function isDeleteLine(line: string) {
  return /^\[-[^\[]*\]$/.test(line)
}
function isModified(line: string) {
  return /(\{\+|\[-)/.test(line)
}
function removeAddition(line: string) {
  return line.replaceAll(/\{\+[^\{\+]*?\+\}/g, "")
}
function removeDeletion(line: string) {
  return line.replaceAll(/\[-[^\[-]*?-\]/g, "")
}
