import React, { useState, useRef } from 'react'
import { useAuth } from '../context/auth'
import { Container, Card, Form, Button, Navbar, Nav } from 'react-bootstrap'
import ToastMessage from '../components/Toast'

export default function ForgotPassword() {
  const { passwordReset } = useAuth()

  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState('')
  const [hasSuccess, setHasSuccess] = useState('')

  const emailRef = useRef()

  async function handleSubmit(e) {
    e.preventDefault()
    const email = emailRef.current.value

    try {
      setHasError('')
      setIsLoading(true)
      await passwordReset(email)
      setHasSuccess('Check your email for steps to reset password')
    } catch (error) {
      setHasError('A problem when trying to reset.')
      console.log(error);
    } 
  }

  function onCloseError() {
    setHasError('')
    setIsLoading(false)
  }

  function onCloseSuccess() {
    setHasSuccess('')
    setIsLoading(false)
  }

  return (
    <>
      <Navbar bg='dark' className='shadow'>
        <Container>
          <Nav.Link href='/signin' className='text-white'>Back To Sign In</Nav.Link>
        </Container>
      </Navbar>
    
      <Container 
        className='mt-5 w-75 d-flex align-items-center justify-content-center flex-column'
        style={{minHeight: "80vh"}}
      >
        <ToastMessage message={hasError} type="error" onCloseToast={onCloseError} />
        <ToastMessage message={hasSuccess} type="success" onCloseToast={onCloseSuccess} />
        <Card className='shadow w-100' style={{maxWidth: "560px"}}>
          <Card.Body>
            <h1>Reset Password</h1>
            <Form onSubmit={handleSubmit} className='d-flex flex-column'>
              <Form.Group id="email">
                <Form.Control type='email' className='mt-4' placeholder='Email' ref={emailRef} required/>
              </Form.Group>  
              <Button className='bg-success mt-4 mb-3' type="submit" disabled={isLoading}>
                <strong>{isLoading ? '...Loading' : 'Submit'}</strong>
              </Button> 
            </Form>          
          </Card.Body>
        </Card>
      </Container>
    </>
  )
}
