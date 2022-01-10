// 选车三级菜单组件 
// 怎么乱 怎么来! 去骂鹏哥!!!
import Fetch from './fetch'
import './common.less'

const createEl = tag => document.createElement(tag);
const has = (p, v) => Reflect.has(p, v) && Reflect.get(p, v) || false;
const get = Reflect.get;
const set = Reflect.set;
const get_proto_ = Reflect.getPrototypeOf
const listener = (target, event, func, any) => { target.addEventListener(event, func, any) };
const setStyle = (target, obj) => {/**  target: HTMLElement, obj: Styletype<CSSStyleRule['style']>*/
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(target['style'], key) && obj[key] != "") {
            target['style'][key] = obj[key];
        }
    }
}
const localErr = () => {
    window.Spui.Message({
        type: "error", message: '自认倒霉吧!'
    })
}
const clearActiveToc = (s) => {
    [].forEach.call(document.querySelectorAll(s), node => {
        node.className = '';
    });
}
const updateActiveToc = (id) => {
    const currentNode = document.querySelectorAll(id)[0];
    if (currentNode) {
        clearActiveToc(id.indexOf('affix') > -1 ? '.constrast-affix a' : '.brands-container-core-bL span')
        currentNode.className = 'current';
    }
}
/**
 * 
 * @param {*} target 
 * @param {function(id)} idCals 
 */
const scroller = (target, idCals, scrollTarget, islocal = true) => {
    let i = 0;
    const handler = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (i < 10) {
            i++;
            return
        }
        i = 0;
        let lists = document.querySelectorAll(target);
        let filter = [...lists].filter((item) => {
            let top;
            if (islocal) {
                top = item.getBoundingClientRect().top
            } else {
                top = item.offsetTop - scrollTarget.scrollTop
            }

            return top > 0
        });
        filter[0] && updateActiveToc(idCals(filter[0].id))
    }
    listener(scrollTarget || window, 'scroll', handler)
}

/**
 * keys: breadCrumb、brands、container、curlevel、brandsEl、callbacks
 * mean: 面包屑父元素、一级菜单的数据、组件容器、当前处于的级别、el 、 就不告诉你
 */
const DISPOSE = new Map();/** dispose 不需要更改的数据*/

const _initCrumbs = [{ label: '品牌' }]

const breadCrumbs = new Proxy([], {
    get(target, p) {
        return get(target, p)
    },
    set(target, p, value) {
        get(DISPOSE, 'breadCrumb').innerHTML = '';
        get(DISPOSE, 'breadCrumb')._cs = new Array();
        set(target, p, value)
        breadCrumbsObevse(target, p, value);
        return get(target, p) || value + ''
    }
});


function createView() {
    let container = createEl('div'),
        brands = createEl('div'),
        bL = createEl('div'),
        bR = createEl('div'),
        loading = createEl('sp-loading'),
        breadCrumb = createEl('sp-breadcrumb');
    container.className = 'brands-container';
    brands.className = 'brands-container-core';
    bL.className = 'brands-container-core-bL';
    bR.className = 'brands-container-core-bR';
    breadCrumb.setAttribute('separator-class', 'sp-icon-right');
    container.lastBrandsItems = null; // 一级菜单临时变量
    container.loading = loading
    get(DISPOSE, 'isloading') ? container.append(loading): null;
    container.onclick = e => {
        e.preventDefault()
        e.stopPropagation()
    }
    document.body.append(container);
    set(DISPOSE, 'brandsEl', brands)
    const _render = () => {
        // container.innerHTML = ''
        brands.innerHTML = ''
        for (let [key, value] of Object.entries(get(DISPOSE, 'brands'))) {
            let l = createEl('span'),
                r = createEl('div');
            r.className = 'brands-container-core-bR__r';
            l.textContent = key;
            l.setAttribute('nv', key + 'key')
            l.onclick = () => {
                updateActiveToc(`.brands-container-core-bL span[nv="${key + 'key'}"]`);
                bR.scrollTop = document.getElementById(key + 'key').offsetTop - 60
            }
            if (Array.isArray(value)) {
                value.map((el, index) => {
                    let childItem = createEl('span');
                    childItem.id = key + 'key'
                    childItem.classList = 'smart'
                    childItem.textContent = `${el.penname} ${el.name}`;
                    childItem.onclick = itemEvent => {
                        el.label = el.name;
                        __before_brandsItemClick(itemEvent, el, index)
                        if (breadCrumb.children.length >= 2) {
                            breadCrumbs.reset().push(..._initCrumbs, el)
                        } else {
                            breadCrumbs.push(el)
                        }
                        __after_brandsItemClick(itemEvent, el, index)

                    }
                    r.append(childItem)
                })
            } else {
                let t = createEl('span')
                t.textContent = value;
                r.append(t)
            }
            bL && bL.append(l)
            bR.append(r)
        }
        brands.append(bL, bR)
        container.append(breadCrumb, brands);
    }
    // if (has(DISPOSE, 'brands')) {
    //     if(level == 1) {
    //         scroller('.smart', id => `.brands-container-core-bL span[nv="${id}"]`, bR, false);
    //         _render()
    //         updateActiveToc(`.brands-container-core-bL span[nv="Akey"]`);
    //     } else if(level == 2) {

    //     } else {

    //     }
    // } 
    return new Promise(牛逼 => {
        (0, Fetch.getBrands)({
            res(data) {
                scroller('.smart', id => `.brands-container-core-bL span[nv="${id}"]`, bR, false);
                set(DISPOSE, 'breadCrumb', breadCrumb)
                set(DISPOSE, 'brands', data);
                breadCrumbs.reset().push(..._initCrumbs);
                _render()
                set(DISPOSE, 'container', container);
                updateActiveToc(`.brands-container-core-bL span[nv="Akey"]`);
                container.loading['attr-status'] = false
                牛逼();
            },
            localErr
        })
    })
}

function levelMoveView(level, data) {
    const tcStyle = createEl('div');
    tcStyle.className = 'level' + level;
    if (level == 2) {
        data.map(item1 => {
            let ul = createEl('ul'),
                h3 = createEl('h3');
            h3.textContent = item1.brandName
            ul.append(h3)
            item1.styleList.map((item2, index2) => {
                let li = createEl('li');
                li.textContent = item2.styleName;
                li.onclick = (e) => {
                    level2Click(e, item2, index2)
                }
                ul.append(li)
            });
            tcStyle.append(ul)
        })
    } else {
        data.map(item1 => {
            let ul = createEl('ul'),
                h3 = createEl('h3');
            h3.textContent = item1.key
            ul.append(h3)
            item1.value.map((item2) => {
                item2.value.map((item3, index3) => {
                    let li = createEl('li');
                    li.textContent = item3.modelName;
                    li.onclick = (e) => {
                        level3Click(e, item3, index3)
                    }
                    ul.append(li)
                })
            });
            tcStyle.append(ul)
        })
    }

    get(DISPOSE, 'brandsEl').append(tcStyle)
}

function someBreadCrumbsClick(_event) {
    set(DISPOSE, 'curlevel', event.target._level - 1)
    breadCrumbs.splice(event.target._level, breadCrumbs.length);
    if (event.target._level == 1) {
        document.querySelector('.level2') && document.querySelector('.level2').remove()
        document.querySelector('.level3') && document.querySelector('.level3').remove()
    }
    if (event.target._level == 2) {
        document.querySelector('.level3') && document.querySelector('.level3').remove()
    }
    has(DISPOSE, 'callbacks').onBreadCrumbsClick && has(DISPOSE, 'callbacks').onBreadCrumbsClick(_event, event.target._level)
}

function breadCrumbsObevse(t, p, v) {
    t._map((item, index) => {
        let _item = createEl('sp-breadcrumb-item');
        _item.textContent = item.label || item.name;
        _item._level = index + 1;
        if (index < get(DISPOSE, 'curlevel') && +t.length > 1) {
            listener(_item, 'click', someBreadCrumbsClick);
            _item.classList.add('active')
        }
        get(DISPOSE, 'breadCrumb').append(_item);
        get(DISPOSE, 'breadCrumb')._cs.push(_item)
    })

}

function level2Click(e, item, index) {
    set(DISPOSE, 'curlevel', 2);
    has(DISPOSE, 'callbacks').onLevel2 && has(DISPOSE, 'callbacks').onLevel2(e, item, index);
    get(DISPOSE, 'container').loading['attr-status'] = true;
    breadCrumbs.push({
        label: item.styleName,
        level: 2,
        brandId: item.brandId
    });
    (0, Fetch.tcModel)({
        res(data) {
            get(DISPOSE, 'container').loading['attr-status'] = false;
            levelMoveView(3, data)

        },
        localErr,
        data: {
            styleId: item.id
        }
    })
}

function level3Click(e, item, index) {
    let res = has(DISPOSE, 'callbacks').onLevel3 && has(DISPOSE, 'callbacks').onLevel3(e, item, index)
    !res && (get(DISPOSE, 'container').style.display = 'none')

}
function __before_brandsItemClick(e, item, index) {
    get(DISPOSE, 'curlevel') !== 1 && set(DISPOSE, 'curlevel', 1)
    let lastItems = get(DISPOSE, 'container').lastBrandsItems;
    lastItems != null && lastItems.classList.remove('active')
    set(get(DISPOSE, 'container'), 'lastBrandsItems', e.target)
    e.target.classList.add('active');
}
function __after_brandsItemClick(e, item, index) {
    has(DISPOSE, 'callbacks').onLevel1 && has(DISPOSE, 'callbacks').onLevel1(e, item, index);
    get(DISPOSE, 'container').loading['attr-status'] = true;

    (0, Fetch.tcStyle)({
        res(data) {
            get(DISPOSE, 'container').loading['attr-status'] = false;
            levelMoveView(2, data)
        },
        localErr,
        data: {
            brandId: item.firmBrandId || item.id
        }
    })
}

function getTargetRect(target) {
    return target !== window
        ? target.getBoundingClientRect()
        : { top: 0, height: window.innerHeight }
}

listener(document.body, 'click', e => {
    get(DISPOSE, 'container') && (get(DISPOSE, 'container').style.display = 'none')
})



/**placement top | bottom*/
function changePositionRect(placement, position, {
    offsetX,
    offsetY
}) {
    let conditions = new Set([
        [placement == 'top'],
        [placement == 'left'],
        [placement == 'bottom', () => {
            let scrolltop = document.querySelector('html').scrollTop || 0
            let scrollLeft = document.querySelector('html').scrollLeft || 0
            setStyle(get(DISPOSE, 'container'), {
                top: scrolltop + position.y + offsetY + 'px',
                left: position.left + scrollLeft - offsetX + 'px',
                position: 'absolute',
                display: 'block'
            })

        }],
        [placement == 'right'],
    ])

    for (let [is, fn = () => { }] of conditions) {
        is && fn()
    }

}


function init({
    target = window,
    placement = 'bottom',
    once = true,
    offsetX = 0,
    offsetY = 0,
    isloading = true,
    callbacks = {},
}) {
    set(DISPOSE, 'callbacks', callbacks);
    set(DISPOSE, 'isloading', isloading);
    get(DISPOSE, 'isloading');
    const cal = () => {
        let rect = getTargetRect(target);
        changePositionRect(placement, rect, {
            offsetX,
            offsetY
        })
    }
    once ? createView().then(cal) : cal()

}



Reflect.setPrototypeOf(breadCrumbs, Object.assign(get_proto_(breadCrumbs), {
    'reset'() {
        this.length = 0;
        return this
    },
    _map(callback) {
        if (this.map) return this.map(callback);
        let _i = undefined;
        for (_i of this) {
            callback(_i, this[_i], this)
        }
        _i = null
    }
}))

window.brandsinit = init;
export {
    init,
    scroller,
    updateActiveToc,
    clearActiveToc
}