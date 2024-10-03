interface FreqMap {
  [key: string]: number
}

function termFrequency(str: string) {
  const words = str.split("")
  const freqMap: FreqMap = {}
  words.forEach((word) => {
    freqMap[word] = (freqMap[word] || 0) + 1
  })
  return freqMap
}

function cosineSimilarity(freqMap1: FreqMap, freqMap2: FreqMap) {
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

const str1 = "吾輩は猫である"
const str2 = "吾輩は人間である"
// const str2 = "どこで生れたかとんと見当けんとうがつかぬ。";

const freqMap1 = termFrequency(str1)
const freqMap2 = termFrequency(str2)

const similarity = cosineSimilarity(freqMap1, freqMap2)
console.log("Cosine Similarity:", similarity)
