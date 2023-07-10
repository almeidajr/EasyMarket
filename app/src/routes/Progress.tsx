import nprogress from 'nprogress'
import { useEffect, useLayoutEffect } from 'react'

interface ProgressProps {
  children: JSX.Element
}

export const Progress = ({ children }: ProgressProps) => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0)
    nprogress.start()
  })
  useEffect(() => {
    nprogress.done()
  })

  return children
}
