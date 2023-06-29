import "./root.css";
import "./header.css";
import "./main.css";

import { renderHeader } from "./header";
import { renderMain } from "./results";

function render() {
  renderHeader();
  renderMain();
}

render();
