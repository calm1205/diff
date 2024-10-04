export const getSplitLines = (unifiedFormat: string) => {
  const lines = unifiedFormat.split("\n")
  const trimLines = lines.slice(5)
  return trimLines
}
