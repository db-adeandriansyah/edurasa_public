// hooks/useApi.ts
import { useState } from 'react'
import { showError, showSuccess } from '@/lib/toast'

/**
 * @info gunakan hook ini untuk pemanggilan apiGet/apiPost/apiPut/apiDelete
 * @example:
 * const { request, loading } = useApi()

    const handleSubmit = async () => {
    //apiPost diambil dari @lib/api;
    await request(() => apiPost('/api/siswa', formData), {
        successMessage: 'Siswa berhasil disimpan!',
        errorMessage: 'Gagal menyimpan data.',
        onSuccess: (data) => console.log(data),
    })
    }

 * @returns [request, loading]hooks
 */
export const useApi = () => {
  const [loading, setLoading] = useState(false)

  const request = async <T>(
    //fn disini adalah apiPost|apiGet|apiPut| yang ada @lib/api
    fn: () => Promise<T>,
        //resolve dari promis ini berupa infromasi: onSuccess (callback) , onError (callback),
        //successMessage (string optional), errorMessage(string optional)
        {
        onSuccess,
        onError,
        successMessage,
        errorMessage,
        }: {
        onSuccess?: (data: T) => void
        onError?: (err: any) => void
        successMessage?: string
        errorMessage?: string
        } = {}
    ) => {
        // di sini kode sedang dijalankan
        // atur loading true biar bisa dipake di komponen animasi/spinner
        setLoading(true)
        try {
            const result = await fn()
            //jika successMessage dipanggil, maka tampilkan showSuccess milik toast
            if (successMessage) showSuccess(successMessage)
            // onSuccess adalah callback untuk mengambil data hasil resolve promise
            // data yang berhasil dari resolve promise dipanggil disini, contoh kode saat dipanggil:
            //  onSuccess: (data) => console.log(data) atau  onSuccess: (data) => setChangeData(data)
            if (onSuccess) onSuccess(result);
            // kode-kode di atas seharusnya memang ditempatkan di pemanggil.
            return result
        } catch (err: any) {
            if (errorMessage) showError(errorMessage)
            if (onError) onError(err)
            throw err
        } finally {
            setLoading(false)
        }
    }

    return { request, loading }
    }
