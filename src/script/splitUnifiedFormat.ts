/**
 * unified diffをoriginalLinesとmodifiedLinesに分割
 */
export const splitUnifiedFormat = (lines: string[]) => {
  const originalLines: string[] = []
  const modifiedLines: string[] = []

  lines.forEach((line) => {
    const firstChar = line.charAt(0)

    switch (firstChar) {
      case "-": // '-' 行は元のファイルにのみ存在する
        originalLines.push(line.slice(1).trim())
        break
      case "+": // '+' 行は変更後のファイルにのみ存在する
        modifiedLines.push(line.slice(1).trim())
        break
      default: // 変更のない行は両方のファイルにそのまま追加
        originalLines.push(line.trim())
        modifiedLines.push(line.trim())
        break
    }
  })

  return { originalLines, modifiedLines }
}
