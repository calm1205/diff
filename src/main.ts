import "./style.css"
import { sample } from "./script/sample"
import { trimUnifiedFormat } from "./script/trimUnifiedFormat"
import { unifiedFormat } from "./fixtures/unified-format"
import { splitUnifiedFormat } from "./script/splitUnifiedFormat"

// import { setupCounter } from "./counter.ts"

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <h1>diff</h1>
  </div>
`

sample()
const trimmed = trimUnifiedFormat(unifiedFormat)
console.log(splitUnifiedFormat(trimmed))

// setupCounter(document.querySelector<HTMLButtonElement>("#counter")!)
