import { useCallback } from 'react'
import QrReader from 'react-qr-reader'

interface QRCodeReaderProps {
  onSuccess?: (data: string) => void
}

export const QRCodeReader = ({ onSuccess }: QRCodeReaderProps) => {
  const onScan = useCallback(
    (data: string | null) => {
      if (data) {
        onSuccess?.(data)
      }
    },
    [onSuccess],
  )

  return (
    <QrReader
      delay={1000}
      onError={(err) => console.error(err)}
      onScan={onScan}
    />
  )
}
