export default class Base {
    baseName:string
    isinit:boolean
    public _setClassName(root: HTMLElement | any, classesarr: string | string[] = []) {
        if(!this.isinit) {
            this.baseName = root.className;
        }
        this.isinit = true
        let basename = root.tagName.toLocaleLowerCase();
        let classList = [
            this.baseName,
            basename,
            root?.['attr-classname'] || root?.attrs?.['classname'],
            ...(typeof classesarr == 'string' ? [classesarr] : classesarr)
        ];
        root.className = classList.join(' ');
    }


    public getRootClassName(root: HTMLElement | any, classesarr: string | string[] = []) {
        if(!this.isinit) {
            this.baseName = root.className;
        }
        this.isinit = true
        let basename = root.tagName.toLocaleLowerCase();
        let classList = [
            this.baseName,
            basename,
            root?.['attr-classname'] || root?.attrs?.['classname'],
            ...(typeof classesarr == 'string' ? [classesarr] : classesarr)
        ];
       return classList.join(' ');
    }
}