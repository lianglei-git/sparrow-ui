import { ensureValuePrecision, ensureValueInRange } from './_utils'


let clacMethds: any = {
    getSliderStart() {
        let rect = this.props.ctxTarget?.getBoundingClientRect();
        let vertical = this.props.vertical;
        let reverse = this.props.reverse;
        if (vertical) {
            return reverse ? rect.bottom : rect.top;
        }
        return window.pageXOffset + (reverse ? rect.right : rect.left);
    },
    getSliderLength() {
        const slider = this.props.ctxTarget;
        if (!slider) {
            return 0;
        }
        const coords = slider.getBoundingClientRect();
        return this.props.vertical ? coords.height : coords.width;
    },
    calcValue(offset: number) {
        const { vertical, min, max } = this.props;
        const ratio = Math.abs(Math.max(offset, 0) / this.getSliderLength());
        const value = vertical ? (1 - ratio) * (max - min) + min : ratio * (max - min) + min;
        return value;
    },
    trimAlignValue(v: number, nextProps: any = {}) {
        if (v === null) {
            return null;
        }

        const mergedProps = { ...this.props, ...nextProps };
        const val = ensureValueInRange(v, mergedProps);
        return ensureValuePrecision(val, mergedProps);
    }
}
// const set_proto_ = Reflect.setPrototypeOf;
// const get_proto_ = Reflect.getPrototypeOf;
// set_proto_(calcValueByPos, Object.freeze({...get_proto_(calcValueByPos), ...clacMethds}))

export const CalcValueByPos = function <T>(args: T): void {
    let { reverse = false, position } = this.props = (args as any);
    const sign = reverse ? -1 : +1;
    const pixelOffset = sign * (position - this.getSliderStart());
    const nextValue = this.trimAlignValue(this.calcValue(pixelOffset));
    this.props._change({value: nextValue})
} as any
for (let k in clacMethds) {
    CalcValueByPos.prototype[k] = clacMethds[k]
}