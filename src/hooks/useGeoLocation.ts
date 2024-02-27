import { useState, useEffect } from 'react'
import { GeoLocationType, LocationType } from '../types/page/UserMainType'

export const useGeoLocation = (options = {}): GeoLocationType => {
  const [location, setLocation] = useState<LocationType>()
  const [error, setError] = useState('')

  const handleSuccess = (pos: GeolocationPosition) => {
    const { latitude, longitude }: LocationType = pos.coords

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