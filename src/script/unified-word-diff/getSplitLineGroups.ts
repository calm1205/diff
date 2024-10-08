/**
 * git diff --word-diffのparse関数
 *
 * 修正前(originalLines)と修正後(modifiedLines)に分割する。
 *
 * git diffの出力では追加部分は{+...+}で囲まれ、削除部分は[-...-]で囲まれる。
 *
 * 修正を以下の3つのケースに分ける。
 * 1. 文全体が{+ , +}で囲まれている場合は文の追加
 * 2. 文全体が[- , -]で囲まれている場合は文の削除
 * 3. 文の途中が{+ , +}や[-, -]で囲まれている場合は文の修正
 *
 * 行アラインメントを揃えるために1,2のケースは修正されていない方に空行を挿入する。
 *
 */
export const getSplitLineGroups = (lines: string[]) => {
  const originalLines: string[] = []
  const modifiedLines: string[] = []

  lines.forEach((line) => {
    if (isInsertLine(line)) {
      originalLines.push("[--]") // 空行を挿入
      modifiedLines.push(line)
    } else if (isDeleteLine(line)) {
      originalLines.push(line)
      modifiedLines.push("{++}") // 空行を挿入
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
  return /^\{\+[^\{]*\}$/.test(line) // {+...+}
}
function isDeleteLine(line: string) {
  return /^\[-[^\[]*\]$/.test(line) // [-...-]
}
function isModified(line: string) {
  return /(\{\+|\[-)/.test(line) // {+ or [- を含むか
}
function removeAddition(line: string) {
  return line.replaceAll(/\{\+[^\{\+]*?\+\}/g, "") // {+, +} を削除
}
function removeDeletion(line: string) {
  return line.replaceAll(/\[-[^\[-]*?-\]/g, "") // [- , -] を削除
}
