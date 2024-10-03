import { lines } from "./diff.dummy.js"

const parseDiff = (lines: string[]) => {
  const originalFile: string[] = []
  const modifiedFile: string[] = []

  let deletionCount = 0
  let additionCount = 0

  lines.forEach((line) => {
    const firstChar = line.charAt(0)

    switch (firstChar) {
      case "-": // '-' 行は元のファイルにのみ存在する
        deletionCount++
        originalFile.push(line.slice(1).trim())
        break
      case "+": // '+' 行は変更後のファイルにのみ存在する
        additionCount++
        if (additionCount > deletionCount) {
          // 追加行が削除行より多い場合は元のファイルに空行を追加
          originalFile.push("")
          deletionCount = 0
          additionCount = 0
        }
        modifiedFile.push(line.slice(1).trim())
        break
      default: // 変更のない行は両方のファイルにそのまま追加
        originalFile.push(line.trim())
        modifiedFile.push(line.trim())
        break
    }
  })

  return { originalFile, modifiedFile }
}

console.log(parseDiff(lines))
