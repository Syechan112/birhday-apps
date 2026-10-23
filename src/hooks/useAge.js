import { useMemo } from 'react'
import { calculateAge } from '../utils/calculateAge'

export function useAge(birthDate) {
  return useMemo(() => {
    if (!birthDate) return null
    return calculateAge(birthDate)
  }, [birthDate])
}