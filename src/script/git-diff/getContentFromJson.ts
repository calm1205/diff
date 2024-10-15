import { readFileSync } from "fs"

interface AnalyzedJson {
  content: {
    pages: {
      items: {
        text: string
        bbox: [number, number]
        is_last_in_line: true
      }[]
    }[]
  }
}
interface GetContentFromJsonArgs {
  analyzedJsonPath: string
  isFullPage?: boolean
}

/**
 * MNTSQ-algoの解析結果のjsonファイル（<tenant>-<document_id>-analyzed.json）からドキュメントの本文を取得します。
 * 本文はページ区切りの配列で返却
 *
 * @param analyzedJsonPath 解析結果のjsonファイルへのrootPathからの相対パス e.g. "src/fixtures/pdf-analyzed.json"
 */
export const getContentFromJson = ({
  analyzedJsonPath,
  isFullPage = false,
}: GetContentFromJsonArgs): string[] => {
  const file = readFileSync(analyzedJsonPath, "utf8")
  const json = JSON.parse(file) as AnalyzedJson

  const pages = parseJson(json)

  return isFullPage ? [pages.join("")] : pages
}

/**
 * JSONから本文をpage区切りで取得
 */
const parseJson = (json: AnalyzedJson): string[] =>
  json.content.pages.map((page) =>
    page.items
      .map((item) => {
        if (item.is_last_in_line) return item.text + "\n"
        item.text
      })
      .join(""),
  )
