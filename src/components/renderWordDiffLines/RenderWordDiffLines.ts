import "./style.css"

function hasModifiedWord(line: string) {
  if (line.includes(`{+`) || line.includes(`[-`)) return "hasChange"
  return ""
}
function replaceAddition(line: string) {
  return line
    .replaceAll(/\{\+/g, "<span class='highlight'>")
    .replaceAll(/\+\}/g, "</span>")
}
function replaceDeletion(line: string) {
  return line
    .replaceAll(/\[-/g, "<span class='highlight'>")
    .replaceAll(/-\]/g, "</span>")
}

export const RenderWordDiffLines = (
  element: HTMLElement,
  lineGroups: {
    originalLines: string[]
    modifiedLines: string[]
  },
) => {
  const { originalLines, modifiedLines } = lineGroups

  element.innerHTML = originalLines
    .map(
      (_, index) => `
      <div class="render-lines-wrap">
        <p class="render-lines-paragraph original">
          <span class="render-lines-index">${index}</span>
          <span class="${hasModifiedWord(originalLines[index])}">
            ${replaceDeletion(originalLines[index])}
          </span>
        </p>
        <p class="render-lines-paragraph modified">
          <span class="render-lines-index">${index}</span>
          <span class="${hasModifiedWord(modifiedLines[index])}">
            ${replaceAddition(modifiedLines[index])}
          </span>
        </p>
      </div>
      `,
    )
    .join("")
}
