import '../index';
import { createEl } from '../../_utils/dom';
jest.setTimeout(10000);

let sto = (time) => Promise.resolve(res => setTimeout(res, time))

function fetchData() {
    return new Promise((res) => {
        let button = createEl('sp-button');
        button.onload = () => res(button)
        document.body.append(button);
    })
}

describe('sp-button', () => {


    it('load', async () => {
        let target = await fetchData();
        target.onclick = async () => {
            target['attr-shape'] = 'circle';
            target['attr-loading'] = 'true';
            await sto(1000).then(() => {
               target['attr-loading'] = 'false'
            })
        }
          expect(target['attr-type']).toBe(null);
          expect(target['attr-size']).toBe(null);
          expect(target['attr-shape']).toBe(null);

        // click --- 
        target.click();
        expect([...target.classList].includes('sp-button-shape--circle')).toBeTruthy();
        expect(target['attr-loading']).toBe('true');
        await sto(1200).then(() => {
            expect(target['attr-loading']).toBe('false');
        })


        // await expect(fetchData()).resolves.toBe('default')
        // return fetchData().then((target) => {
        //     expect(target['attr-type']).toBe('default');
        //     done()
        // })
    })
    // test('type', () => {
    //         button['attr-type'] = 'primary';
    //         expect(button['attr-type']).toBe('primarysss');
    // }) 
})