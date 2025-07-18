import { ModalCustomInterface } from "./type";

export const DefaultConfigModal: ModalCustomInterface = {
    title:'Modal Interactive Field',
    open:false,
    setOpen:(open:boolean)=>!open,
    contentFields:[],
    contentType:'form',
    closeOnOutsideClick:false,
    mode:'update'
}; 

export const createConfigModal = (overriding:Partial<ModalCustomInterface>): ModalCustomInterface  =>{
    return {
        ...DefaultConfigModal,
        ...overriding,
        contentFields: (overriding.contentFields ?? DefaultConfigModal.contentFields).map(field => ({ ...field }))
    }
}