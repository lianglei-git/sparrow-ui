import type { Args2 } from '_utils/types'

type InitUi<T> = (modalNumber: [column: number, row: number], cfg: { cellHeight: number, cellWidth: number } & {}) => T;
type InitUiPro = {
  _container?: HTMLElement;
  initTable: (
    modalNumber: number[],
    cfg: { [k: string]: string | number }
  ) => any;
  table?: Array<Array<any>>;
  cell: (...style: number[]) => HTMLElement;
};
type Cx<K = undefined> = InitUi<K> & InitUiPro;
type CfgP = Args2<InitUi<undefined>, 1>;
type Container = HTMLElement & { table?: any, cfg?: CfgP };
type style_ = 'left' | 'top' | 'width' | 'height' | string;

type Control = {
  target: Container
  cfg: CfgP & {
    iscustom: boolean
  }
  table: any
}


interface LayoutProps extends CfgP {
  column: number
  row: number
  iscustom: boolean
  checkCallback?:(k: [startY:number, startX:number, endY:number, endX:number][], pos:number[], style?: {[k in style_]: keyof any}) => void
}

const Props: LayoutProps = {
  column: 6,
  row: 6,
  iscustom: false, /** custom mode */
  cellHeight: 60,
  cellWidth: 60,
}
export {
  Props,
  LayoutProps,
  Cx,
  CfgP,
  Container,
  Control
}