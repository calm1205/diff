/**
 * 文言追加の部分をハイライト
 */
export const replaceAddition = (line: string) =>
  line
    .replaceAll(/\{\+/g, "<span class='highlight'>")
    .replaceAll(/\+\}/g, "</span>")
