interface FreqMap {
  [key: string]: number
}

const termFrequency = (str: string) => {
  const words = str.split("")
  const freqMap: FreqMap = {}
  words.forEach((word) => {
    freqMap[word] = (freqMap[word] || 0) + 1
  })
  return freqMap
}

export const cosineSimilarity = (str1: string, str2: string) => {
  const freqMap1 = termFrequency(str1)
  const freqMap2 = termFrequency(str2)
  const allWords = new Set([...Object.keys(freqMap1), ...Object.keys(freqMap2)])
  let dotProduct = 0
  let magnitude1 = 0
  let magnitude2 = 0

  allWords.forEach((word) => {
    const freq1 = freqMap1[word] || 0
    const freq2 = freqMap2[word] || 0
    dotProduct += freq1 * freq2
    magnitude1 += freq1 * freq1
    magnitude2 += freq2 * freq2
  })

  return dotProduct / (Math.sqrt(magnitude1) * Math.sqrt(magnitude2))
}
