import AdapterReact from '../_utils/adapterReact';


const Collapse = props => AdapterReact.createElement('sp-collapse', props);
const CollapsePanel = props => AdapterReact.createElement('sp-collapse-panel', props);

// const Demo = () => {
    // return <Collapse  active-index='2'>
    //     <CollapsePanel  index='1' title='This is panel header 1'>
    //     A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.
    //     </CollapsePanel>
    //     <CollapsePanel  index='2' title='This is panel header 2'>
    //         <div>
    //         A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest in many households across the world.
    //         </div>
    //     </CollapsePanel>
    // </Collapse>
// }

Collapse.CollapsePanel = CollapsePanel;
export default Collapse;
export {
    Collapse,
    CollapsePanel
}