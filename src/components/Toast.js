import React from 'react'
import { ToastContainer, Toast} from 'react-bootstrap'

export default function ToastMessage({message, type, onCloseToast}) {
  return (
    <ToastContainer position='absolute' style={{top: "70px", right: '18px'}}>
      <Toast
        bg={type === 'error' ? 'danger' : 'success'}
        onClose={onCloseToast}
        show={!!message}
        delay={3000}
        autohide
      >
        <Toast.Header closeButton={false}>
          <strong>{type === 'error' ? 'Error' : 'Success'}</strong>
        </Toast.Header>
        <Toast.Body className={type === 'error' ? 'danger' : 'success'}>
          <strong>{message}</strong>
        </Toast.Body>
      </Toast>
    </ToastContainer>
  )
}
