import { SelectProps as Props, SelectTypes as Types } from './type'
import { $el, createEl, defineEl, getProps, listener, setStyle } from '../_utils/dom' // setStyle
import Base from '../_utils/Base'
import InputCommon from '../input/Common';
import { setIndex } from '../common';
import { throws } from 'assert';



function scrollIntoView(container, selected) {
  
    if (!selected) {
      container.scrollTop = 0;
      return;
    }
  
    const offsetParents = [];
    let pointer = selected.offsetParent;
    while (pointer && container !== pointer && container.contains(pointer)) {
      offsetParents.push(pointer);
      pointer = pointer.offsetParent;
    }
    const top = selected.offsetTop + offsetParents.reduce((prev, curr) => (prev + curr.offsetTop), 0);
    const bottom = top + selected.offsetHeight;
    const viewRectTop = container.scrollTop;
    const viewRectBottom = viewRectTop + container.clientHeight;
    
    let scrollTop = null;
    if (top < viewRectTop) {
      scrollTop = top;
    } else if (bottom > viewRectBottom) {
      scrollTop = bottom - container.clientHeight;
    }
    return scrollTop;
  }



  function getScrollTop(target) {
    const scrollParents = [target]
    let pointer = target.parentNode;
    console.time('a')
    while (pointer) {
        scrollParents.push(pointer);
        pointer = pointer.parentNode;
    }
    console.log(scrollParents,'scrollParents')
    let scroll = scrollParents.reduce((prev, curr) => (prev + (curr.scrollTop || 0)), 0)
    console.timeEnd('a')
    console.log(scroll)
  }

  window.getScrollTop = getScrollTop;

  window.scrollIntoView = scrollIntoView;
  

class Search extends Base {
    context: this
    constructor() {
        super()
        const context = this;
        defineEl({
            tag: 'sp-select',
            observedAttributes: Object.keys(Props),
            connectedCallback() {
                this.inited = false;
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
                if(!this.inited) return;
                const [k, ov, nv] = args;
                if(k === 'value') {
                    let idx = this.downOptions.findIndex(i => i.value == nv);
                    if(idx !== -1) {
                        let item = this.drop_down_container_warp_view?.childNodes[idx - 1];
                        this.itemClick(item, item, this.downOptions, idx - 1)
                    }
                }
            },
            disconnectedCallback() {
                try {
                    this.drop_down_container.remove();
                }catch(_) {
        
                }
            }
        })
    }





    async initView(root: HTMLElement | any, args: any, _Common: InputCommon) {
        let { ipt, prefix, suffix, allowClear, addonBefore, showCountEl, addonAfter } = args


        /************ drop-down-container ************/
        let downOptions = [{
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

        if(root.downOptions) {
            downOptions = root.downOptions
        }

        let drop_down_container = createEl('div');
        let drop_down_container_warp = createEl('div');
        let drop_down_container_warp_view = createEl('ul');

        drop_down_container.className = 'sp-drop_down_container';
        drop_down_container_warp.className = 'sp-drop_down_container_warp';
        drop_down_container_warp_view.className = 'sp-drop_down_container_warp_view';

        drop_down_container_warp.append(drop_down_container_warp_view);
        drop_down_container.append(drop_down_container_warp);

        
        root.drop_down_container_warp_view = drop_down_container_warp_view;

        const itemClick = root.itemClick = (view_item, e, options, index) => {
            drop_down_container_warp_view.childNodes.forEach(item => item.classList.remove('active'))
            view_item.classList.add('active');
            root?.change?.(view_item, e, options[index]);
        }

        // Symbol.asyncIterator
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
                listener(view_item, 'click', e => {
                    itemClick(view_item, e, options, index - 1)
                })
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

        // add target class active
        function addActive() {
            (<HTMLElement>prefix).classList.add('active');
            drop_down_container.classList.add('active');
            root.isActive = true;
            let zIndex = setIndex();
            setStyle(drop_down_container, { zIndex })
            raf();
        }



        function removeActive() {
            prefix.classList.remove('active');
            drop_down_container.classList.remove('active');
            root.isActive = false;
            setIndex(-1)
        }

        // remove target active class
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

        const setDrop_down_containerPosition = (left = 0, top = 0) => {
            let t = root.getBoundingClientRect();
            setStyle(drop_down_container, {
                left: t.left + left + 'px',
                top: t.top + t.height + top + 'px',
            })
        }
        
        setDrop_down_containerPosition();

        root.change = (target, e,  v) => {
            // e.stopPropagation();
            ipt.value = v.label
            console.log(v);
        }

        var raf = () => {
           
        }
        
                
        // document.body.addEventListener('wheel', () => {
        //     setDrop_down_containerPosition();
        // })

        // listener(document.body, 'scroll', (e) => {
        //     setDrop_down_containerPosition
        // })

        // is append document.body
        if(true) {
            document.body.append(drop_down_container);
            raf = () => {
                if( root.isActive ) {
                    setDrop_down_containerPosition();
                    window.requestAnimationFrame(raf)
                }
            }
        }

        if(root.attrs.value !== '') {
            let idx = downOptions.findIndex(i => i.value == root.attrs.value);
            if(idx !== -1) {
                let item = drop_down_container_warp_view?.childNodes[idx - 1];
                itemClick(item, item, downOptions, idx - 1)
            }
        }


        root.drop_down_container = drop_down_container;

        //  drop_down_container 默认注入select里， 可以选择注入到body里面去
        root.append(ipt, prefix);
        root.inited = true;   

    }
}


export default new Search()