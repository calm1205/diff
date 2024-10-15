import { writeFileSync } from "node:fs"

/**
 * export diff = `...` の形式で差分を出力
 */
export const outputStringFile = (outPath: string, diffString: string) => {
  writeFileSync(outPath, `export const diff = \`${diffString}\``)
}
