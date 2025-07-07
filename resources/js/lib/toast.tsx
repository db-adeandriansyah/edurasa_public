import { toast } from "sonner"


export const showSuccess = (message: string) => {
  toast.success(
    'Berhasil ✅',
    {
    // title: 'Berhasil ✅',
    description: message,
    // variant: 'default',
    
    closeButton:true,
    // descriptionClassName:'bg-green-300/50'
    // classNames:{description:'bg-green-300/50',title:'bg-skye-600'}
  })
}

export const showError = (message: string) => {
  toast.error(
    'Terjadi Kesalahan ❌',
    {
    // title: 'Terjadi Kesalahan ❌',
    description: message,
    // variant: 'destructive',\
    closeButton:true,
    // descriptionClassName:'bg-red-300/50'
    
  })
}
