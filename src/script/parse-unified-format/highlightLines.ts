export const getHighlightLines = (
  originalLines: string[],
  modifiedLines: string[],
) => {
  const hOriginalLines: string[] = []
  const hModifiedLines: string[] = []

  originalLines.forEach((_, index) => {
    const originalLine = originalLines[index].trim()
    const modifiedLine = modifiedLines[index].trim()
    const commonParts = findCommonParts(originalLine, modifiedLine)

    const hOriginalLine = highlightDifferences(originalLine, commonParts)
    const hModifiedLine = highlightDifferences(modifiedLine, commonParts)
    if (originalLine === "") {
      hOriginalLines.push("")
    } else if (commonParts === originalLine) {
      hOriginalLines.push(originalLine)
    } else {
      hOriginalLines.push(hOriginalLine)
    }

    if (modifiedLine === "") {
      hModifiedLines.push("")
    } else if (commonParts === modifiedLine) {
      hModifiedLines.push(modifiedLine)
    } else {
      hModifiedLines.push(hModifiedLine)
    }
  })

  return { originalLines: hOriginalLines, modifiedLines: hModifiedLines }
}

const findCommonParts = (base: string, target: string) => {
  let commonParts = ""
  let baseIndex = 0
  let targetIndex = 0

  while (baseIndex < base.length && targetIndex < target.length) {
    if (base[baseIndex] === target[targetIndex]) {
      commonParts += base[baseIndex]
      baseIndex++
      targetIndex++
    } else {
      commonParts += " "
      // 異なる場合は、次の文字を比較
      // baseの現在の文字の次の位置を探索
      if (base.indexOf(target[targetIndex], baseIndex) !== -1) {
        baseIndex = base.indexOf(target[targetIndex], baseIndex)
      } else {
        baseIndex++ // baseがtargetに無ければ次へ
      }
      // targetの現在の文字の次の位置を探索
      if (target.indexOf(base[baseIndex], targetIndex) !== -1) {
        targetIndex = target.indexOf(base[baseIndex], targetIndex)
      } else {
        targetIndex++ // targetがbaseに無ければ次へ
      }
    }
  }

  return commonParts.replaceAll(/\s+/g, " ").trim()
}

const highlightDifferences = (base: string, common: string): string => {
  const commonWords = common.split(" ")

  let startIndex = 0
  let result = ""

  commonWords.forEach((commonWord) => {
    if (!commonWord) return
    const hitIndex = base.indexOf(commonWord)
    if (hitIndex !== -1) {
      result += `<span class="highlight">${base.slice(startIndex, hitIndex)}</span>${commonWord}`
      startIndex = hitIndex + commonWord.length
    }
  })

  return result || `<span class="highlight">${base}</span>`
}
