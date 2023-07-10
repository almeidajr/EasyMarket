import { useCallback, useMemo, useState } from 'react'
import { useQueryClient } from 'react-query'

import { createNfce } from '../../services/createNfce'
import { QRCodeReader } from '../QRCodeReader'
import { SquaredContentModal } from '../SquaredContentModal'
import { Creating } from './Creating'
import { Failed } from './Failed'
import { Success } from './Success'

interface NfceRegistrationProps {
  onClose: () => void
  isOpen: boolean
}

type ResultStatus = 'reading' | 'creating' | 'success' | 'failed'
type ResultComponents = { [K in ResultStatus]: JSX.Element }

const urlValidator = (data: string) =>
  data.includes('gov.br')

export const NfceRegistration = ({
  onClose,
  isOpen,
}: NfceRegistrationProps) => {
  const [status, setStatus] = useState<ResultStatus>('reading')
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [nfceId, setNfceId] = useState<string>('')

  const queryClient = useQueryClient()

  const resetStatus = useCallback(() => {
    setStatus('reading')
    setErrorMessage('')
    setNfceId('')
  }, [])

  const handleError = useCallback((message: string) => {
    setErrorMessage(message)
    setStatus('failed')
  }, [])

  const onQrCodeRead = useCallback(
    async (data: string) => {
      setStatus('creating')

      if (!urlValidator(data)) {
        handleError('O QR Code não contém um URL válido para a operação.')
        return
      }

      try {
        const { id } = await createNfce(data)
        setNfceId(id)
      } catch {
        handleError('O servidor encontrou um erro ao processar os dados.')
        return
      }

      setStatus('success')
      queryClient.invalidateQueries('nfces')
    },
    [handleError, queryClient],
  )

  const handleClose = useCallback(() => {
    onClose()
    resetStatus()
  }, [onClose, resetStatus])

  const child = useMemo<ResultComponents>(() => {
    return {
      reading: <QRCodeReader onSuccess={onQrCodeRead} />,
      creating: <Creating />,
      success: <Success id={nfceId} onReset={resetStatus} />,
      failed: <Failed description={errorMessage} onReset={resetStatus} />,
    }
  }, [errorMessage, nfceId, onQrCodeRead, resetStatus])

  return (
    <SquaredContentModal
      destroyOnClose
      onCancel={handleClose}
      onOk={handleClose}
      title="QR Code"
      visible={isOpen}
    >
      {child[status]}
    </SquaredContentModal>
  )
}
