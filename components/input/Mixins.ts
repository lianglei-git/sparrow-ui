// 好一个上层建筑！
import InputCommon from './Common';
class MixinSet {
    Common: InputCommon
    // static supRoot: any
    supRoot: any
    // static instance: any
    constructor(Common: InputCommon, supRoot: any) {
        this.Common = Common;
        this.supRoot = supRoot;
    }


    value(v: string) {
        this.Common[this.supRoot['attrs']['type'] as InputCommon['type']].value = v
        this.Common['supValues'].inputValues = v
    }

    // static getInstance(supRoot: any, Common:InputCommon) {

    //     if(MixinSet.supRoot == supRoot ){
    //         MixinSet.instance =  new MixinSet(Common);
    //     }

    //     return MixinSet.instance
    // }
}


export default MixinSet