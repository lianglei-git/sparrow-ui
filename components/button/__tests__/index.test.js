import '../index';
import {createEl} from '../../_utils/dom'

describe('sp-button', () => {
    let button = createEl('sp-button');
   
    it('type', () => {
        console.log(button['attr-type'])
        expect(button['attr-type']).toBe('default')
        document.body.append(button);
    }) 
  


})