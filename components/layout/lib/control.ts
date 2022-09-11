// const model = [
//   [1, 2, 3],
//   [4, 5, 6],
//   [7, 8, 9],
// ] || 3*3

// params
// 1. 3 * 3 || 二维数组
import type { Control, LayoutProps } from '../type'
interface ControlEvent {
  realPosition: string,
  
}

class utils {
  // 屏幕坐标转换到表格坐标
  static postotabpos(x: number, y: number, cellwidth, cellheight) {
    console.log(~~(x / cellwidth) + 1,
      ~~(y / cellheight) + 1)
  }
  static init() {
    return new utils();
  }
}

function control(target: Control['target'], cfg: Control['cfg'] & LayoutProps, table: Control['table']) {
  const iscustom = cfg.iscustom;
  // utils.init()
  /** in case checkbox */
  let lastPoint = null;
  let [gcx, gcy] = [0, 0];
  const checked: [lastY: number, lastX: number, y: number, x: number][] = [];
  control.move(target, (e, cx, cy) => {
    gcx = cx;
    gcy = cy;
    let lastY, lastX, x, y;
    if (lastPoint) {
      [lastY, lastX] = lastPoint.split(',').map(i => i - 1);
      [y, x] = e.realPosition.split(",").map(i => +i - 1);
    }
    table.tableNx.map((els, indexY) =>
      els.map((item, indexX) => {
        if (iscustom && lastPoint) {
          /** r=right b=bottom l=left t=top */
          let rb = indexY >= lastY && indexY <= y && indexX >= lastX && indexX <= x;
          let lb = indexY >= lastY && indexY <= y && indexX <= lastX && indexX >= x;
          let rt = indexY <= lastY && indexY >= y && indexX >= lastX && indexX <= x;
          let lt = indexY <= lastY && indexY >= y && indexX <= lastX && indexX >= x;

          if ((lb || rb || rt || lt) && !item.isChecked) {
            item.classList.add('checked');
          } else if (!item.isChecked) {
            item.classList.remove('checked');
          }
        }
        if (!iscustom && !item.isChecked) {
          if (cx > item.offsetLeft && cy > item.offsetTop ) {
            item.classList.add('checked');
          } else {
            item.classList.remove('checked');

          }
        }
      })
    );
  });
  const random = () => {
    return `rgb(${~~(Math.random() * 255)}, ${~~(Math.random() * 255)}, ${~~(Math.random() * 255)})`
  }
  control.click(target, (e) => {
    const y_childrens:any = target.childNodes;
    /** non custom */
    if (!iscustom) {
      lastPoint = '1,1';
    }
    /** custom ⬇️ */
    if (!lastPoint) {
      lastPoint = e.realPosition;
      const [lastY, lastX] = lastPoint.split(',').map(i => i - 1)
      const [y, x] = e.realPosition.split(',').map(i => i - 1);
      y_childrens[y].childNodes[x].classList.add('checked');
      const pos: any = [lastY, lastX, y, x];
      checked.push(pos);
      cfg?.checkCallback?.(checked, pos);
      return
    }

    const [lastY, lastX] = lastPoint.split(',').map(i => i - 1)
    const [y, x] = e.realPosition.split(',').map(i => i - 1);
    const b = random();
    let minY = Math.min(lastY, y);
    let minX = Math.min(lastX, x);
    let maxY = Math.max(lastY, y);
    let maxX = Math.max(lastX, x);
    for (let i = 0; i <= maxY; i++) {
      if (i >= minY) {
        for (let j = 0; j <= maxX; j++) {
          const element = y_childrens[i].childNodes[j];
          // if(element.isChecked) {
          //   console.log('已有被选中')
          //   return;
          // }
          if (j >= minX) {
            element.isChecked = true;
            element.classList.add('checked');
          }
        }
      }
    }
    const pos: any = [lastY, lastX, y, x];
    checked.push(pos);
    const style = transfrom([maxY, maxX, minY, minX]);
    cfg?.checkCallback?.(checked, pos, style);
    lastPoint = null;
    // utils.postotabpos(gcx, gcy, cfg.cellwidth, cfg.cellheight)
  })

  function transfrom([maxY, maxX, minY, minX]: number[]):{[k: string]: keyof any} {
    let height = ((maxY - minY + 1) / cfg.row).toFixed(2);
    let width = ((maxX - minX + 1) / cfg.column).toFixed(2);
    let left = (minX /cfg.column).toFixed(2);
    let top = (minY /cfg.row).toFixed(2);
    return {
      left,
      top,
      height,
      width
    }
  }
}
control.move = (
  target: HTMLElement,
  callback: (
    e: MouseEvent & ControlEvent,
    cx: number,
    cy: number
  ) => unknown
) => {
  target.addEventListener("mousemove", (e: MouseEvent & ControlEvent) => {
    let originalRect: DOMRect = target.getClientRects()[0];
    let curx = ~~(e.x - originalRect.x);
    let cury = ~~(e.y - originalRect.y);
    callback(e, curx, cury);
  });
};

control.click = (target, callback) => {
  target.addEventListener("click", function (e) {
    callback(e);
  });
};


export {
  control
}