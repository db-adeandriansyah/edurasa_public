
import { FieldInputNumber, FieldInputText, ModalCustomInterface } from "./type";

const ModalInputTextProps : FieldInputText = {   
        id: 'overiding',
        key: 'name',
        label: 'Nama Lengkap',
        name: 'id_name',
        type: 'text',
        placeholder: 'Nama Lengkap Anda',
        autocomplete: 'name',
        tabIndex: -1,
        autoFocus: false,
        // accept: string,
        // className: 'string',
        value:'',
        onChange:(value:string)=>{console.log('hello')}
        
    };

const ModalInputNumberProps : FieldInputNumber = {   
        id: 'overidinge',
        key: 'name',
        label: 'Nama Lengkap ya',
        name: 'id',
        type: 'number',
        placeholder: 'Nama Lengkap Anda',
        autocomplete: 'name',
        tabIndex: -1,
        autoFocus: false,
        min:0,
        max:100,
        // accept: string,
        // className: 'string',
        value:0,
        onChange:(value:string)=>{console.log('hello')}
        
    };

/**
 * Props untuk contenType: form
 */
export const ModalConfigProps: ModalCustomInterface =  {
    title:'Modal Custom',
    // description: 'Deskripsi Default',
    open:false,
    setOpen:()=>{},
    contentType: 'form',
    
    contentFields:[
        // ModalInputTextProps
        // ...

    ],
    currentData:{},
    mode:'update',
    setCurrentData:()=>{},
    messageDelete:'',
    closeOnOutsideClick:true
    // onAdd:()=>{},
    // onUpdate:()=>{},
    // onDelete:()=>{},
} 

/**
 * @info buat config modal tipe form
 * @param override <ModalCustomInterface>
 * @returns ModalCustomInterface
 */
export function createModalConfig( override: Partial<ModalCustomInterface> ): ModalCustomInterface {
    console.log('harus immutable',ModalConfigProps,'\n override', override);
    return {
        ...ModalConfigProps,
        ...override,
        contentFields: (override.contentFields ?? ModalConfigProps.contentFields).map(field => ({ ...field })),
  };
}
