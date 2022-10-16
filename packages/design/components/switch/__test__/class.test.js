import '../index'
import { createEl } from '../../_utils/dom';

describe('sp-switch :: classname', () => {
    it('basename', () => {
        let el = createEl('sp-switch');
        el.className = 'custom-one';
        document.body.append(el)
        expect(el.className).toBe('custom-one sp-switch')
        el['attr-disabled'] = 'true'
        expect(el.className).toBe('custom-one sp-switch is-disabled')
    })
})