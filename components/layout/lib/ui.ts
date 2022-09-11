import type { Cx, Container, CfgP } from '../type'

const initUi: Cx<Container> = (modalNumber, cfg: CfgP) => {
  // if (initUi._container) initUi._container.remove();
  let container: Container = initUi._container = document.createElement("div");
  let table = initUi.table = initUi.initTable(modalNumber, cfg || {});

  container.style.background = "rgba(0,0,0,.2)";
  container.style.width = "fit-content";
  container.style.position = "relative";
  container.table = table;
  container.cfg = cfg;
  table.appendEls.map((el: HTMLElement) => container.append(el));
  // document.body.append(container);
  return container
}

initUi.cell = (width, height) => {
  let el = document.createElement("div");
  el.style.width = width - 5 * 2 + 'px';
  el.style.height = height - 5 * 2 + 'px';
  el.style.padding = "5px";
  el.style.transition = "0.5s";
  // let tmp = document.createElement("div");
  // // el.style.boxSizing = 'border-box'
  el.style.background = "#ccc";
  el.innerHTML = `<div style='background:red;height:100%;width:100%'></div>`
  return el;
};

initUi.initTable = (modalNumber, cfg) => {
  let rowNumber = modalNumber[0];
  let cellNumber = modalNumber[1];

  const width = +cfg.cellWidth
  const height = +cfg.cellHeight
  const array = <T extends number>(length: T) => new Array(length).fill(1)

  return array(cellNumber).reduce(
    (table, _, index) => {

      let cells = document.createElement("div");
      cells.style.display = "flex";

      table.tableNx.push(
        array(rowNumber).map((__, idx) => {
          let _cellEl: any = initUi.cell(width, height);
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