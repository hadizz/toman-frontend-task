import { useSearchParams } from 'react-router-dom'

const useColumnFilterSearchParams = () => {
  const [searchParams, setSearchParams] = useSearchParams()

  const getParamValues = (param: string): string[] => {
    const values = searchParams.get(param)
    return values ? values.split(',') : []
  }

  const setParam = (param: string, values: string[]) => {
    if (values.length > 0) {
      searchParams.set(param, values.join(','))
    } else {
      searchParams.delete(param)
    }
    setSearchParams(searchParams)
  }

  return {
    getParamValues,
    setParam,
    searchParams,
    setSearchParams,
  }
}

export default useColumnFilterSearchParams
