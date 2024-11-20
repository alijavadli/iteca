import { useEffect } from 'react'
import { useAtom } from 'jotai'
import {
    langAtom,
    exhibCodeAtom,
    currencyAtom,
    loadingAtom,
    exhibitionDataAtom,
    errorAtom
} from '../store/atoms'
import { getExhibitionData } from '../services/api'

export const useExhibitionData = () => {
    const [lang] = useAtom(langAtom)
    const [exhibCode] = useAtom(exhibCodeAtom)
    const [currency] = useAtom(currencyAtom)
    const [loading, setLoading] = useAtom(loadingAtom)
    const [data, setData] = useAtom(exhibitionDataAtom)
    const [error, setError] = useAtom(errorAtom)

    useEffect(() => {
        let mounted = true

        const fetchData = async () => {
            if (data) return

            try {
                setLoading(true)
                setError(null)
                const response = await getExhibitionData({
                    lang,
                    exhibCode,
                    currency
                })
                if (mounted) {
                    setData(response.data)
                }
            } catch (err) {
                if (mounted) {
                    setError(err.message)
                }
            } finally {
                if (mounted) {
                    setLoading(false)
                }
            }
        }

        fetchData()

        return () => {
            mounted = false
        }
    }, [lang, exhibCode, currency, data, setData, setError, setLoading])

    return { data, loading, error }
}