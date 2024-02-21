import { useState, useEffect } from 'react'
import { GeoLocation, locationInfo } from '../types/page/userMainType'

export const useGeoLocation = (options = {}): GeoLocation => {
  const [location, setLocation] = useState<locationInfo>()
  const [error, setError] = useState('')

  const handleSuccess = (pos: GeolocationPosition) => {
    const { latitude, longitude }: locationInfo = pos.coords

    setLocation({
      latitude,
      longitude,
    })
  }

  const handleError = (err: GeolocationPositionError) => {
    setError(err.message)
  }

  useEffect(() => {
    const { geolocation } = navigator

    if (!geolocation) {
      setError('Geolocation is not supported.')
      return
    }

    geolocation.getCurrentPosition(handleSuccess, handleError, options)
  }, [options])

  return { location, error }
}