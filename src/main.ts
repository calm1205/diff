import "./style.css"
import { setupContainer } from "./components/container/Container"

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <main>
    <h1>diff</h1>
    <div id="container"></div>
  </main>
`

setupContainer(document.querySelector<HTMLElement>("#container")!)
