export const trimUnifiedFormat = (unifiedFormat: string) => {
  const breakLineRegex = /\r?\n/

  // 最後の行を表現する行を削除
  const removeEndLine = unifiedFormat.replace(
    /\\ No newline at end of file/g,
    "",
  )

  const lines = removeEndLine.split(breakLineRegex)

  // 先頭4行を削除
  return lines.slice(3)
}
