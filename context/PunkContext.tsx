import axios from 'axios'
import React, { createContext, useContext, useEffect, useState } from 'react'

const InitialState = {
  data: [],
  loading: false,
  pageCount: 1,
  filters: {
    beer_name: '',
    abv_gt: '',
    abv_lt: '',
    ibu_gt: '',
    ibu_lt: '',
    ebc_gt: '',
    ebc_lt: '',
  },
  qualities: {
    abv_gt: '',
    abv_lt: '',
    ibu_gt: '',
    ibu_lt: '',
    ebc_gt: '',
    ebc_lt: '',
  },
  handleSearchChange: () => {},
  handleQualityChange: () => {},
  handleQualityDelete: () => {},
  handleQualitiesSet: () => {},
  handleKeyDown: () => {},
  createFilter: () => {},
  handlePageChange: () => {},
}

interface QualitiesOptions {
  abv_gt?: string
  abv_lt?: string
  ibu_gt?: string
  ibu_lt?: string
  ebc_gt?: string
  ebc_lt?: string
}

interface FiltersOptions extends QualitiesOptions {
  beer_name?: string
}

interface IPunkContext {
  data: any[]
  loading: boolean
  pageCount: number
  filters: FiltersOptions
  qualities: QualitiesOptions
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleQualityChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleQualityDelete: ({
    name,
    value,
  }: {
    name: string
    value: string
  }) => void
  handleQualitiesSet: () => void
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void
  createFilter: (filters: FiltersOptions) => void
  handlePageChange: (e: boolean) => void
}

const PunkContext = createContext<IPunkContext>(InitialState)

export const PunkProvider = ({ children }) => {
  const [data, setData] = useState(InitialState.data)
  const [loading, setLoading] = useState(InitialState.loading)
  const [pageCount, setPageCount] = useState(InitialState.pageCount)
  const [query, setQuery] = useState('')

  const initQualitiesState = {
    abv_gt: '',
    abv_lt: '',
    ibu_gt: '',
    ibu_lt: '',
    ebc_gt: '',
    ebc_lt: '',
  }

  const [filters, setFilters] = useState({
    beer_name: '',
    ...initQualitiesState,
  })

  const [qualities, setQualities] = useState(initQualitiesState)

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const result = await axios(
        `https://api.punkapi.com/v2/beers?page=${pageCount}&per_page=12${query}`,
      )
      setLoading(false)
      setData(result.data)
    }

    fetchData()
  }, [query, pageCount])

  const handleSearchChange = e => {
    const { name, value } = e.target
    const formatedValue = value.replaceAll(' ', '_')
    setFilters(prevState => ({
      ...prevState,
      [name]: formatedValue,
    }))
  }

  const handleQualityChange = e => {
    const { name, value } = e
    setQualities(prevState => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleQualityDelete = e => {
    const { name, value } = e
    setQualities(prevState => ({
      ...prevState,
      [name]: value,
    }))
    setFilters(prevState => ({
      ...prevState,
      [name]: value,
    }))
    createFilter({
      ...filters,
      [name]: value,
    })
  }

  const createFilter = filters => {
    let filter = ''
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== '') {
        filter += `&${key}=${value}`
      }
    })
    setQuery(filter)
    setPageCount(1)
  }

  const handleQualitiesSet = () => {
    setFilters(prevState => ({
      ...prevState,
      ...qualities,
    }))
    createFilter({ ...filters, ...qualities })
  }

  const handleKeyDown = event => {
    if (event.key === 'Enter') {
      createFilter(filters)
    }
  }

  const handlePageChange = add => {
    const val = add ? 1 : -1
    const newPageCount = pageCount + val
    newPageCount > 0 ? setPageCount(newPageCount) : setPageCount(1)
  }

  const contextPayload = {
    data,
    pageCount,
    loading,
    filters,
    qualities,
    handleSearchChange,
    handleQualityChange,
    handleQualityDelete,
    handleQualitiesSet,
    handleKeyDown,
    handlePageChange,
    createFilter,
  }

  return (
    <PunkContext.Provider value={contextPayload}>
      {children}
    </PunkContext.Provider>
  )
}

export const usePunk = () => useContext(PunkContext)
