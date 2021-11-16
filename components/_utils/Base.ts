export default class Base {
    public _setClassName(root: HTMLElement | any, classesarr: string | string[] = []) {
        let basename = root.tagName.toLocaleLowerCase();
        let classList = [
            root.className,
            basename,
            root?.['attr-classname'] || root?.attrs?.['classname'],
            ...(typeof classesarr == 'string' ? [classesarr] : classesarr)
        ];
        root.className = classList.join(' ');
    }
}