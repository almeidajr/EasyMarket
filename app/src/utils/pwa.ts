import { Modal } from 'antd'

export const handleUpdate = (registration: ServiceWorkerRegistration) => {
  Modal.confirm({
    title: 'Uma nova versão está disponível',
    content: 'Deseja atualizar agora?',
    onOk: () => {
      registration.waiting?.postMessage({ type: 'SKIP_WAITING' })
      window.location.reload()
    },
  })
}
