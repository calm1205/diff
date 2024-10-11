/**
 * 削除された行の部分をハイライト
 */
export const replaceDeletion = (line: string) =>
  line
    .replaceAll(/\[-/g, "<span class='highlight'>")
    .replaceAll(/-\]/g, "</span>")
