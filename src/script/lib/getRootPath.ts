import { fileURLToPath } from "url"
import { dirname, join } from "path"

/**
 * 実行したファイルの絶対パスを取得
 */
export const getRootPath = () => {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = dirname(__filename)
  return join(__dirname, "../../../")
}
