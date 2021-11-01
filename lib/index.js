var named = (function (exports) {
    'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    const runIFELSE = sets => {
      let _arr = new Array();

      for (let [is, fn = () => true] of sets) {
        if (is) {
          if (fn()) {
            _arr.push(true);

            break;
          }

          _arr.push(false);
        }
      }

      if (!_arr.includes(false)) {
        return true;
      }
    };

    let _globalThis;

    const getGlobalThis = () => {
      return _globalThis || (_globalThis = typeof globalThis !== 'undefined' ? globalThis : typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : {});
    };
    const sto = (fn, time = 16) => {
      let t = setTimeout(() => __awaiter(void 0, void 0, void 0, function* () {
        yield fn();
        clearTimeout(t);
      }), time);
      return t;
    };
    const isObject = tar => Object.prototype.toString.call(tar) === '[object Object]';
    const has = (target, key) => Reflect.has(target, key);

    const tuple = (...args) => args;

    const ButtonTypes = tuple('default', 'primary', 'dashed', 'text', 'link');
    const ButtonSizes = tuple('middle', 'small', 'mini');
    const ButtonShapes = tuple('circle', 'default', 'round');
    const ButtonHTMLTypes = tuple('submit', 'button', 'reset');

    const buttonProps = () => ({
      type: ButtonTypes,
      size: ButtonSizes,
      shape: ButtonShapes,
      htmltype: ButtonHTMLTypes,
      disabled: Boolean,
      loading: Boolean || {
        delay: Number
      }
    });

    const baseprops = {
      type: 'default',
      size: 'middle',
      shape: 'default',
      htmltype: 'button',
      disabled: 'false',
      loading: false
    };

    const $el = el => document.querySelectorAll(el);
    const createEl = (tag, type = 'createElement') => document[type](tag);
    const setStyle = (target, obj) => {
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(target['style'], key) && obj[key] != "") {
          // console.log('设置了::::', key, obj[key]);
          target['style'][key] = obj[key];
        }
      }
    };
    const getProps = target => {
      let attributes = target.attributes;

      let _o = new Array(attributes.length).fill(null).reduce((obj, _, index) => {
        let prop = attributes.item(index);
        obj[prop['nodeName']] = prop['value'];
        return obj;
      }, {});

      return _o;
    };
    const defineEl = (props, Element) => {
      var _a;

      let _corel = null;
      let is = runIFELSE(new Set([[props.tag.indexOf('-') == -1, () => {
        // 这里后续会替换成 用我们本组件内的提示
        alert('请检查 tag 参数！');
      }], [customElements.get(props.tag), () => {
        alert('已经存在了这个标签，bro');
        return false;
      }]]));
      if (!is) return; //props?.observedAttributes

      let getAttribute = (target, observedAttributes) => {
        if (observedAttributes) {
          observedAttributes.forEach(attr => {
            Object.defineProperty(target, 'attr-' + attr, {
              enumerable: false,
              configurable: false,

              get() {
                // if (_corel) {
                return target.getAttribute(attr); // }
                // return 'empty!'
              },

              set(val) {
                // console.log(val, attr)
                target.setAttribute(attr, val);
                _corel[attr] = val;
              }

            });
          });
        }
      };

      let wishClass = name => {
        var _a;

        return {
          [name]: (_a = class extends HTMLElement {
            constructor() {
              super();
              props.shadow ? this.attachShadow({
                mode: props.shadow
              }) : '';
              new Proxy(this, {});
              _corel = this;
              getAttribute(this, props === null || props === void 0 ? void 0 : props.observedAttributes);
            }

            connectedCallback() {
              var _a, _b;

              props.connectedCallback.bind(this)() || (() => {});

              (_b = (_a = this).onload) === null || _b === void 0 ? void 0 : _b.call(_a);
            }

            disconnectedCallback() {
              var _a;

              ((_a = props.disconnectedCallback) === null || _a === void 0 ? void 0 : _a.bind(this)()) || (() => {});
            }

            attributeChangedCallback(name, oldValue, newValue) {
              var _a;

              (_a = props.attributeChangedCallback) === null || _a === void 0 ? void 0 : _a.bind(this)(name, oldValue, newValue);
            }

          }, _a.target = _a, _a)
        }[name];
      };

      let HTMl = wishClass(props.tag);
      Reflect.has(props, 'getConstructor') && ((_a = props.getConstructor) === null || _a === void 0 ? void 0 : _a.bind(undefined)(HTMl));
      HTMl.observedAttributes = (props === null || props === void 0 ? void 0 : props.observedAttributes) || [];
      getAttribute(HTMl.target, props === null || props === void 0 ? void 0 : props.observedAttributes);
      window.customElements.define(props.tag, Element || HTMl);
      return HTMl;
    };

    const listener = (target, event, func) => {
      target.addEventListener(event, func);
    };

    const typePropsObj = buttonProps();

    const changeProps = (elconstr, props) => {
      let includes = ['shape', 'size', 'type', 'disabled'];

      for (let key in props) {
        runIFELSE(new Set([[includes.includes(key), () => {
          if (typePropsObj[key] instanceof Array) {
            for (let i = 0; i < elconstr.classList.length; i++) {
              let classname = elconstr.classList.item(i);
              typePropsObj[key].map(i => classname == 'sp-button-' + i && elconstr.classList.toggle(classname));
            }
          }

          if (props[key] == 'true') elconstr.classList['add']('sp-button-' + key);else if (props[key] == 'false') elconstr.classList['remove']('sp-button-' + key);else elconstr.classList['toggle']('sp-button-' + props[key]);
        }], [key == 'loading', () => {
          if (!props[key] || props[key] == 'false') {
            if (elconstr.loadinEl) {
              elconstr.loadinEl.classList.remove('sp-icon', 'sp-icon-loading');
              elconstr.classList.remove('is-loading');
              elconstr.loadinEl = null;
            }
          } else {
            if (elconstr.loadinEl === null) {
              elconstr.loadinEl = createEl('span');
              elconstr.classList.add('is-loading');
              elconstr.loadinEl.classList.add('sp-icon', 'sp-icon-loading');
              elconstr.insertBefore(elconstr.loadinEl, elconstr.firstChild);
            }
          }
        }]]));
      }
    };

    var button = // 为了避免冲突引发问题， 动态获取 标签属性要通过（attr-name）来获取 
    defineEl({
      tag: 'sp-button',
      observedAttributes: Object.keys(typePropsObj),

      connectedCallback() {
        let self = this;
        this.loadinEl = null;
        this.className = 'sp-button';
        let _style = {};
        let handler = {
          set(target, key, value) {
            let d = Reflect.set(target, key, value);
            setStyle(self, {
              [key]: value
            });
            return d;
          }

        };
        let target = new Proxy(_style, handler);
        setStyle(this, target);
        let attributesObj = Object.assign({}, getProps(this));

        for (let k1 in typePropsObj) {
          let k1v = attributesObj[k1];
          let k2v = typePropsObj[k1];
          runIFELSE(new Set([[k2v instanceof Array, () => {
            if (!k2v.includes(k1v)) {
              attributesObj[k1] = baseprops[k1];
              self['attr-' + k1] = baseprops[k1];
            }
          }], [k1 == 'disabled', () => {
            attributesObj[k1] = k1v || 'false';
            self['attr-disabled'] = k1v || 'false';
          }]]));
        }

        changeProps(this, attributesObj);

        function adapderEmpty(childNodes) {
          let copty = [...childNodes];
          copty.shift();
          if (copty.length == 0) return true;else {
            let is = true;

            for (let i = 0; i < copty.length; i++) {
              if (copty[i].tag) {
                is = false;
                break;
              } else {
                copty[i].nodeValue.trim().length > 0 && (is = false);
                break;
              }
            }

            return is;
          }
        }

        if (this.loadinEl && adapderEmpty(this.childNodes)) {
          this.classList.add('empty-loading');
        }
      },

      attributeChangedCallback(name, _, newval) {
        changeProps(this, {
          [name]: newval
        });
      },

      getConstructor(target) {
        console.log(target);
      }

    });

    // export * from "./button"

    var index = /*#__PURE__*/Object.freeze({
        __proto__: null,
        'default': button
    });

    let zIndex = 2000;

    const getIndex = () => {
      return zIndex;
    };

    const setIndex = (i = 1) => {
      zIndex += i;
      return zIndex;
    };

    const messageTypeslProps = () => ({
      visible: false,
      type: 'success'  ,
      message: '',
      duration: 3000,
      showclose: false,
      center: false,
      offset: 20,
      beforeClose: () => {},
      style: undefined,
      className: ''
    });

    class MessageBase {
      constructor() {
        this.setup = function () {
          let allEls = $el('sp-message');
          let propsOffset = parseInt(this.attrs.offset) || 20;
          let top = [...allEls].reduce((total, el) => {
            el['attr-visible'] == 'true' && (total += el.offsetHeight + propsOffset);
            return total;
          }, propsOffset);
          this['attr-visible'] = 'true';
          setStyle(this, {
            top: top + 'px',
            zIndex: getIndex() + ''
          });
        };

        this.initView = function () {
          this.className = 'sp-message sp-message-' + this.attrs.type;
          this.id = 'sp-message__' + getIndex();
          let iconEl = createEl('span'),
              contentEl = createEl('div'),
              closeEl = createEl('span'),
              t = null;
          contentEl.innerHTML = this.attrs.message;
          iconEl.className = 'sp-icon sp-icon-' + this.attrs.type;
          closeEl.className = 'sp-icon sp-icon-close';
          contentEl.className = 'sp-message-content';
          this.appendChild(iconEl);
          this.appendChild(contentEl);
          this.attrs.showclose == 'true' && this.appendChild(closeEl);

          if (+this.attrs.duration > 0) {
            t = sto(() => {
              this['attr-visible'] = false;
            }, +this.attrs.duration);
          }

          closeEl.onclick = () => {
            t > 0 && clearTimeout(t);
            this['attr-visible'] = false;
          };

          setStyle(contentEl, {
            justifyContent: this.attrs.center == 'true' ? 'center' : ''
          });
        };

        let self = this;
        defineEl({
          tag: 'sp-message',
          observedAttributes: Object.keys(messageTypeslProps()),

          connectedCallback() {
            this.attrs = getProps(this);
            this.attrs = Object.assign(Object.assign({}, messageTypeslProps()), this.attrs);

            this.close = () => {
              this['attr-visible'] = false;
            };

            sto(() => {
              self.initView.call(this);
            });
            this.setup = self.setup.bind(this);
          },

          attributeChangedCallback(...args) {
            let [key, _, newval] = args;
            let elAlls = Array.from($el('sp-message'));
            runIFELSE.call(this, new Set([[key == 'visible', () => {
              var _a;

              let offsetHeight = this.offsetHeight;
              newval && setIndex();

              if (newval == 'false') {
                this.classList.add('sp-message-fade-leave');

                let _index = elAlls.findIndex(i => i.id == this.id);

                this.beforeClose && this.beforeClose();
                elAlls.forEach((element, i) => {
                  if (i >= _index) {
                    setStyle(element, {
                      top: parseInt(element.style.top, 10) - offsetHeight - 20 + 'px'
                    });
                  }
                });
                (_a = this.beforeDistroy) === null || _a === void 0 ? void 0 : _a.call(this);
                sto(() => this.remove(), 290);
              } else {
                this.classList.add('sp-message-fade-enter');
                sto(() => this.classList.add('sp-message-fade-enter-active'));
              }
            }]]));
          }

        });
      }

    }

    function Message(params = messageTypeslProps()) {
      let props = Object.assign(Object.assign({}, messageTypeslProps()), params);
      delete props.visible;
      let t = createEl('sp-message');
      runIFELSE(new Set([[has(props, 'beforeClose'), () => {
        t.beforeClose = props.beforeClose;
        delete props.beforeClose;
      }], [has(params, 'style'), () => {
        setStyle(t, params.style);
        delete props.style;
      }], [has(params, 'className'), () => {
        t.classList.add(params.className);
        delete params.className;
      }]]));

      for (let k in props) {
        t[`attr-${k}`] = props[k] + '';
      }

      document.body.appendChild(t);
      t.setup();
      let p = new Promise(r => {
        t.beforeDistroy = () => r(t);
      });
      return Object.assign(p, t);
    }

    ['info', 'success', 'error', 'loading'].forEach(type => {
      Message[type] = (options, args) => {
        if (isObject(options)) {
          return Message(Object.assign(Object.assign({}, options), {
            type
          }));
        }

        return Message(Object.assign({
          type,
          message: options
        }, args));
      };
    });

    Message.closeAll = () => {
      let allEls = $el('sp-message');
      [...allEls].forEach(el => {
        el['attr-visible'] = false;
      });
    };
    new MessageBase();

    const modaTypeslProps = () => ({
      title: String,
      closable: Boolean,
      appendbody: Boolean,
      visible: Boolean,
      class: String || Array,
      classname: String || Array,
      center: Boolean,
      modal: Boolean,
      canceltext: String,
      oktext: String,
      footer: String || Boolean
    }); // 如果需要在一个 Dialog 内部嵌套另一个 Dialog，需要使用 append-to-body 属性。


    const modalProps = {
      title: '提示',
      closable: 'true',
      appendbody: 'false',
      visible: 'false',
      class: '',
      classname: '',
      center: 'true',
      modal: 'true',
      canceltext: '取消',
      oktext: '确认',
      footer: 'true',
      setslotstyle: ''
    };

    // 现在还没办法做到改变外部依赖的数据
    // 打算通过原型注入api e.target
    // 已经实现了多个弹窗叠加功能 
    // 2021-10-7 已完成基本的功能
    // 下一步开始优化代码、单元测试、md文档、动态attr兼容 

    const spButtonCss = `
  .sp-modal-footer{
    box-sizing: border-box;
    display: flex;
    width: 100%;
    justify-content: flex-end;
    align-items: center;
  }
  `;
    const keys = Object.keys(modaTypeslProps());

    const cancelClick = function () {
      this.onClose && this.onClose();
    };

    class Modal {
      constructor() {
        this.initView = function () {
          {
            setIndex();
          }
          let content = createEl('main'),
              headerL = createEl('span'),
              headerR = createEl('span'),
              header = createEl('header'),
              template = createEl('template'),
              mock = createEl('div'),
              footer = createEl('footer'),
              footerCancel = createEl('sp-button'),
              footerOk = createEl('sp-button');
          let nodes = Array.from(this.children);
          let slots = ['footer', 'header', 'content'];
          let slotObj = nodes.reduce((obj, i) => {
            let slot = i.getAttribute('slot');
            if (slots.includes(slot)) obj[slot] = slot;
            return obj;
          }, Object.create(null));
          this.zIndex = getIndex();
          this.className = 'sp-modal' + ' sp-modal' + (getIndex() - 2000) + ' ' + this.attrs.class;
          content.className = 'sp-modal-content';
          headerR.className = this.attrs.closable == 'false' ? '' : 'sp-icon sp-icon-close';
          mock.className = 'sp-modal-mock sp-modal-mock-' + getIndex();
          header.className = 'sp-modal-header';
          footer.className = 'sp-modal-footer-active';
          headerL.innerHTML = this.attrs.title;
          footerCancel.innerHTML = this.attrs.canceltext;
          footerOk.innerHTML = this.attrs.oktext;
          header.setAttribute('slot', 'header');
          footer.setAttribute('slot', 'footer');
          header.appendChild(headerL);
          header.appendChild(headerR);
          footer.appendChild(footerCancel);
          footer.appendChild(footerOk);
          footerCancel.onclick = cancelClick.bind(this);

          footerOk.onclick = _ => {
            var _a, _b;

            (_a = this === null || this === void 0 ? void 0 : this.onOk) === null || _a === void 0 ? void 0 : _a.call(this, ((_b = this === null || this === void 0 ? void 0 : this.onOk) === null || _b === void 0 ? void 0 : _b.length) > 0 ? _ : null);
          };

          template.innerHTML = `
        <style>${spButtonCss}${this.attrs.setslotstyle}</style>
        <slot name="header"></slot> 
        <slot name="content">按照格式书写</slot>
        <slot name="footer" class="sp-modal-footer"></slot>
        `;
          setStyle(this, {
            zIndex: String(getIndex()),
            marginTop: this.attrs.center == 'false' ? '15vh' : 'auto',
            display: 'none'
          });
          setStyle(mock, {
            zIndex: String(getIndex() - 1),
            display: 'none'
          });
          listener(headerR, 'click', cancelClick.bind(this));
          !(slotObj === null || slotObj === void 0 ? void 0 : slotObj.header) && this.insertBefore(header, this.firstChild);
          this.attrs.footer !== 'null' && !Reflect.has(slotObj, 'footer') && this.appendChild(footer);
          this.shadowRoot.appendChild(template.content.cloneNode(true));

          if (this.attrs.modal !== 'false') {
            document.body.appendChild(mock);
            mock.onclick = cancelClick.bind(this);
          }

          if (this.attrs.visible == 'true') {
            setStyle(this, {
              display: 'block'
            });
            setStyle(mock, {
              display: 'block'
            });
          }

          return {
            header,
            headerL,
            headerR,
            mock
          };
        };

        let self = this;
        defineEl({
          tag: 'sp-modal',
          observedAttributes: keys,
          shadow: 'open',

          connectedCallback() {
            this.attrs = getProps(this);
            this.attrs = Object.assign(Object.assign({}, modalProps), this.attrs);

            if (this.attrs.appendbody == 'true') {
              this.remove();
              this['attr-appendbody'] = 'false';
              document.body.appendChild(this);
            } else {
              sto(() => {
                this.useAllEls = self.initView.call(this);
                self.defineReactive(keys, this);
              }); // 初始化视图
            }
          },

          attributeChangedCallback(...args) {
            let [key, _, newval] = args;
            runIFELSE.call(this, new Set([[key == 'visible', () => {
              console.log(newval);
              newval && setIndex();
              if (this.useAllEls) self._fadeami(newval, this);
            }], [key == 'center', () => {
              setStyle(this, {
                marginTop: newval == 'false' ? '15vh' : 'auto'
              });
            }]]));
          }

        });
      }

      defineReactive(keys, el) {
        // let includes = <T extends string>(k: T) => keys.includes(k);
        keys.map(i => {
          Object.defineProperty(el, i, {
            enumerable: false,

            get() {
              return this['_' + i];
            },

            set(v) {
              this.setAttribute(i, v);
              return this['_' + i] = v;
            }

          });
        }); // el.pro = new Proxy(el, {
        //     get(t, k, v) {
        //         return Reflect.get(t, k ,v)
        //     },
        //     set(t, k: string, v) {
        //         includes(k) && (el['attr-' + k] = v);
        //         return Reflect.set(t, k, v)
        //     }
        // })
      }

      _fadeami(newkey, self) {
        var _a, _b, _c;

        if (newkey == 'true') {
          setStyle(self, {
            display: 'block',
            zIndex: String(getIndex() + 1)
          });
          setStyle((_a = self.useAllEls) === null || _a === void 0 ? void 0 : _a.mock, {
            display: 'block',
            zIndex: String(getIndex())
          });
          self.classList.add('sp-modal-enter-active');
          (_b = self.useAllEls) === null || _b === void 0 ? void 0 : _b.mock.classList.add('sp-modal-mock-enter-active');
          sto(() => {
            var _a;

            self.classList.remove('sp-modal-enter-active');
            (_a = self.useAllEls) === null || _a === void 0 ? void 0 : _a.mock.classList.remove('sp-modal-mock-enter-active');
          }, 290);
        } else {
          self.classList.add('sp-modal-leave-active');
          (_c = self.useAllEls) === null || _c === void 0 ? void 0 : _c.mock.classList.add('sp-modal-mock-leave-active');
          sto(() => {
            var _a, _b;

            setStyle(self, {
              display: 'none'
            });
            setStyle((_a = self.useAllEls) === null || _a === void 0 ? void 0 : _a.mock, {
              display: 'none'
            });
            self.classList.remove('sp-modal-leave-active');
            (_b = self.useAllEls) === null || _b === void 0 ? void 0 : _b.mock.classList.remove('sp-modal-mock-leave-active');
          }, 290);
        }
      }

      static config(params) {
        let _p = Object.assign(Object.assign({}, modalProps), params);

        let dialog = createEl('sp-modal');
        let content;
        let footerhtml;

        if ('bodyhtml' in _p) {
          content = createEl('div');
          content.setAttribute('slot', 'content');

          if (typeof _p.bodyhtml == 'string') {
            content.innerHTML = _p.bodyhtml;
          } else {
            // content.appendChild(_p.bodyhtml)
            throw Error('请传入相应类型');
          }

          dialog.appendChild(content);
        }

        if ('footerhtml' in _p) {
          footerhtml = createEl('div');
          footerhtml.setAttribute('slot', 'footer');

          if (typeof _p.footerhtml == 'string') {
            footerhtml.innerHTML = _p.footerhtml;
          } else {
            // footerhtml.appendChild(_p.footerhtml)
            throw Error('请传入相应类型');
          }

          dialog.appendChild(footerhtml);
        }

        keys.map(k => {
          if (Reflect.has(_p, k)) {
            // @ts-ignore
            dialog.setAttribute(k, _p[k]);
          }
        });

        dialog.onOk = (_p === null || _p === void 0 ? void 0 : _p.onOk) || (() => {
          dialog['attr-visible'] = false;
        });

        dialog.onClose = (_p === null || _p === void 0 ? void 0 : _p.onClose) || (() => {
          dialog['attr-visible'] = false;
        });

        document.body.appendChild(dialog);
        return {
          show(v) {
            dialog['attr-visible'] = v;
          },

          setBodyHtml(html) {
            if (typeof html == 'string') {
              content.innerHTML = html;
            }
          },

          setFooterHtml(html) {
            if (typeof html == 'string') {
              footerhtml.innerHTML = html;
            }
          },

          __$: dialog
        };
      }

    } // (window as any).modal = Modal.config({
    new Modal();

    var alert$1 = (() => {
      console.log(19999123);
    })();

    var alert$2 = /*#__PURE__*/Object.freeze({
        __proto__: null,
        'default': alert$1
    });

    /// 这里引用 和 抛出组件
    const Spui = {
      Modal,
      Message
    };
    getGlobalThis().Spui = Spui;

    exports.Message = Message;
    exports.Modal = Modal;
    exports.alert = alert$2;
    exports.button = index;
    exports['default'] = Spui;

    Object.defineProperty(exports, '__esModule', { value: true });

    return exports;

}({}));
//# sourceMappingURL=index.js.map
