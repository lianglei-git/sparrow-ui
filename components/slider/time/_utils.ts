

function bindAll(fns: string[], context: any) {
    fns.forEach((fn) => {
        if (!context[fn]) {
            return
        }
        context[fn] = context[fn].bind(context)
    })
}
function pauseEvent(e: any) {
    e.stopPropagation();
    e.preventDefault();
}

function getMousePosition(vertical: boolean, e: MouseEvent) {
    return vertical ? e.clientY : e.pageX;
}

function getHandleCenterPosition(vertical: boolean, handle: HTMLElement) {
    const coords = handle.getBoundingClientRect();
    return vertical
        ? coords.top + coords.height * 0.5
        : window.pageXOffset + coords.left + coords.width * 0.5;
}

function getPrecision(step: number) {
    const stepString = step.toString();
    let precision = 0;
    if (stepString.indexOf('.') >= 0) {
        precision = stepString.length - stepString.indexOf('.') - 1;
    }
    return precision;
}

function getClosestPoint(val: number, { marks, step, min, max }: any) {
    const points = Object.keys(marks).map(parseFloat);
    if (step != null) {
        const baseNum = 10 ** getPrecision(step);
        const maxSteps = Math.floor((max * baseNum - min * baseNum) / (step * baseNum));
        const steps = Math.min((val - min) / step, maxSteps);
        const closestStep = Math.round(steps) * step + min;
        points.push(closestStep);
    }
    const diffs = points.map(point => Math.abs(val - point));
    return points[diffs.indexOf(Math.min(...diffs))];
}

function ensureValueInRange(val: number, { max, min }: { max: number; min: number }) {
    if (val <= min) {
        return min;
    }
    if (val >= max) {
        return max;
    }
    return val;
}
function ensureValuePrecision(val: number, props: any) {
    const { step } = props;
    const closestPoint = isFinite(getClosestPoint(val, props)) ? getClosestPoint(val, props) : 0; // eslint-disable-line
    return step === null ? closestPoint : parseFloat(closestPoint.toFixed(getPrecision(step)));
}

export {
    bindAll,
    pauseEvent,
    getHandleCenterPosition,
    getMousePosition,
    ensureValuePrecision,
    ensureValueInRange
}