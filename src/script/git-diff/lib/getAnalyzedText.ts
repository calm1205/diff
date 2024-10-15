import { readFileSync } from "fs"

interface AnalyzedJson {
  content: {
    pages: {
      items: {
        text: string
        is_last_in_line: true
      }[]
    }[]
  }
}
interface GetAnalyzedTextArgs {
  jsonPath: string
  isFullPage?: boolean
}

/**
 * MNTSQ-algoの解析結果のjsonファイル（<tenant>-<document_id>-analyzed.json）からドキュメントの本文を取得します。
 * 本文はページ区切りの配列で返却
 *
 * @param jsonPath 解析結果のjsonファイルへのrootPathからの相対パス e.g. "src/fixtures/pdf-analyzed.json"
 */
export const getAnalyzedText = ({
  jsonPath,
  isFullPage = false,
}: GetAnalyzedTextArgs): string | string[] => {
  const file = readFileSync(jsonPath, "utf8")
  const json = JSON.parse(file) as AnalyzedJson
  const pages = parseJson(json)

  return isFullPage ? pages.join("") : pages
}

/**
 * JSONから本文をpage区切りで取得
 */
const parseJson = (json: AnalyzedJson): string[] =>
  json.content.pages.map(({ items }) =>
    items
      .map(({ is_last_in_line, text }) =>
        is_last_in_line ? `${text}\n` : text,
      )
      .join(""),
  )
