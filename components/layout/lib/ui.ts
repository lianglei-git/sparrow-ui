import { createEl } from '../../_utils/dom';
import type { Cx, Container, CfgP } from '../type'

const uiStyle = (style:any) => `
.sp-layout_cell {
  background: rgba(0,0,0,.2);
  width: fit-content;
  transition: 0.5s;
  padding: 5px
}
.sp-layout_cell_core {
  height: 100%;
  width: 100%;
  border-radius: 3px;
  background: #ff4d37
}
.sp-layout_cell.checked .sp-layout_cell_core  {
  background: #0eb661
}
${style}
`

const initUi: Cx<[Container, HTMLElement]> = (modalNumber, cfg: CfgP) => {
  // if (initUi._container) initUi._container.remove();
  let container: Container = createEl("div");
  const styleEl = createEl('style');
  let table = initUi.table = initUi.initTable(modalNumber, cfg || {});
  container.className = 'sp-layout_container'
  container.style.position = 'relative';
  styleEl.innerHTML = cfg.cellstyle || uiStyle(`.sp-layout_cell {
    width: ${cfg.cellwidth - 5 * 2}px;
    height: ${cfg.cellheight - 5 * 2}px;
  }`);
  container.table = table;
  container.cfg = cfg;
  // container.append(styleEl);
  table.appendEls.map((el: HTMLElement) => container.append(el));
  // document.body.append(container);
  return [container, styleEl]
}

initUi.cell = (width, height) => {
  let el = document.createElement("div");
  el.className = 'sp-layout_cell'
  // el.style.width = width - 5 * 2 + 'px';
  // el.style.height = height - 5 * 2 + 'px';
  el.innerHTML = `<div class='sp-layout_cell_core'></div>`
  return el;
};

initUi.initTable = (modalNumber, cfg) => {
  let rowNumber = modalNumber[0];
  let cellNumber = modalNumber[1];

  const width = +cfg.cellwidth
  const height = +cfg.cellheight
  const array = <T extends number>(length: T) => new Array(length).fill(1)

  return array(cellNumber).reduce(
    (table, _, index) => {

      let cells = document.createElement("div");
      // cells.className = 'sp-layout_cell';
      cells.style.display = 'flex';
      table.tableNx.push(
        array(rowNumber).map((__, idx) => {
          let _cellEl: any = initUi.cell();
          _cellEl.position = (index + 1) * width + "," + (idx + 1) * height;
          _cellEl.realPosition = `${index + 1},${idx + 1}`
          _cellEl.onclick = e => {
            e.position = (index + 1) * width + "," + (idx + 1) * height;
            e.realPosition = `${index + 1},${idx + 1}`
          }
          _cellEl.onmousemove = e => {
            e.position = (index + 1) * width + "," + (idx + 1) * height;
            e.realPosition = `${index + 1},${idx + 1}`
          }
          cells.append(_cellEl);
          return _cellEl;
        })
      );
      table.appendEls.push(cells);
      return table;
    },
    { tableNx: [], appendEls: [] }
  );
};

export {
  initUi
}