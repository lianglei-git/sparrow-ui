

export default class SlotBase {
    $$style: string
    constructor(props: any) {
        this.$$style = props.$$style || ''
    }

    public _setClassName(root: HTMLElement | any) {
        let basename = root.tagName.toLocaleLowerCase();
        root.$$placement = root?.['attr-placement'] || root?.attrs?.['placement']
        let classList = [
            basename,
            root?.['attr-classname'] || root?.attrs?.['classname'],
            '_-_' + root.$$placement,
            // (root?.['append-to-body'] || root?.attrs?.['append-to-body']) == 'true' ? 'is-fixed' : ''
            (root?.fullscreen || root?.attrs?.fullscreen) == 'true' ? 'is-fixed' : ''
        ];
        root.className = classList.join(' ');
    }

    public _template(root: HTMLElement | any) {
        return `
        <style>${this.$$style}${root.attrs.setslotstyle}</style>
        <slot name="header"></slot> 
        <slot name="content"></slot>
        `
    }

    public _showContentType(root: any, slots: string[]) {
        let nodes: HTMLElement | any[] = Array.from(root.children);
        let slotObj = nodes.reduce((obj, i) => {
            let slot = i.getAttribute('slot')
            if (slots.includes(slot)) obj[slot] = slot
            return obj
        }, Object.create(null))
        return slotObj[slots[0]] || false
    }
}