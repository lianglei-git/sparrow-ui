import { SelectProps as Props, SelectTypes as Types } from './type'
import { $el, createEl, defineEl, getProps, listener } from '../_utils/dom' // setStyle
import Base from '../_utils/Base'
import InputCommon from '../input/Common';


class Search extends Base {
    context: this
    constructor() {
        super()
        const context = this;
        defineEl({
            tag: 'sp-select',
            observedAttributes: Object.keys(Props),
            connectedCallback() {
                (this.attrs as Partial<Types>) = getProps(this);
                this.attrs = { ...Props, ...this.attrs };
                const that = this;
                this.setAttribute('hidefocus', true)
                this.setAttribute('tabindex', 0);
                this.attrs['prefix'] = 'sp-icon-arrow-up'
                this.attrs['type'] = 'search'
                this.core = new InputCommon({
                    root: this,
                    callback(args: any) {
                        context.initView(that, args, this)
                    }
                })
            },
            attributeChangedCallback(...args: any) {
                console.log(args);
            }
        })
    }





    async initView(root: HTMLElement | any, args: any, _Common: InputCommon) {
        let { ipt, prefix, suffix, allowClear, addonBefore, showCountEl, addonAfter } = args


        /************ drop-down-container ************/
        const downOptions = [{
            value: '选项1',
            label: '黄金糕'
        }, {
            value: '选项2',
            label: '双皮奶'
        }, {
            value: '选项3',
            label: '蚵仔煎'
        }, {
            value: '选项4',
            label: '龙须面'
        }, {
            value: '选项5',
            label: '北京烤鸭'
        }]


        let drop_down_container = createEl('div');
        let drop_down_container_warp = createEl('div');
        let drop_down_container_warp_view = createEl('ul');

        drop_down_container.className = 'sp-drop_down_container';
        drop_down_container_warp.className = 'sp-drop_down_container_warp';
        drop_down_container_warp_view.className = 'sp-drop_down_container_warp_view';

        drop_down_container_warp.append(drop_down_container_warp_view);
        drop_down_container.append(drop_down_container_warp);

        //    Symbol.asyncIterator
        function* iteratorCreateEvery(_options) {
            const options = _options;

            /** default label */
            const createDefaultItemContent = (optionItemData) => {
                // drop_down_container_warp_view_item_content
                const view_item_content = createEl('span');
                view_item_content.textContent = optionItemData.label
                return view_item_content
            }

            for (let index = 0, length = options.length; index < length;) {
                // drop_down_container_warp_view_item
                const view_item = createEl('li');
                view_item.className = 'sp-drop_down_container_warp_view_item'
                if (/** default Conetnt (!label)*/ true) {
                    view_item.append(createDefaultItemContent(options[index]))
                }

                yield Promise.resolve(view_item);
                index++;
            }
        }

        for await (const item of iteratorCreateEvery(downOptions)) {
            drop_down_container_warp_view.append(item);
        }
    
        root.isActive = false;

        function addActive() {
            (<HTMLElement>prefix).classList.add('active');
            drop_down_container.classList.add('active');
            root.isActive = true;
        }

        function removeActive() {
            prefix.classList.remove('active');
            drop_down_container.classList.remove('active');
            root.isActive = false;
        }

        function removeClick() {
            let p:any = listener(document.body, 'click', (e: Event) => {
                removeActive();
                p.remove();
            })
        }

        listener(prefix, 'click', (e: Event) => {
            e.preventDefault();
            e.stopPropagation();
            root.isActive ? removeActive() : addActive();
            removeClick();
        })

        listener(root, 'click', (e: Event) => {
            e.preventDefault();
            e.stopPropagation();
            addActive();
            removeClick();
        })

        //  drop_down_container 默认注入select里， 可以选择注入到body里面去
        root.append(ipt, prefix, drop_down_container);

    }
}


export default new Search()