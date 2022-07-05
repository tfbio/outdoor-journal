import React, { useState, useRef } from 'react'
import { useAuth } from '../context/auth'
import { Container, Card, Form, Button, Navbar, Nav } from 'react-bootstrap'
import ToastMessage from '../components/Toast'

export default function UpdateProfile() {
  const { authUser, updateUser, changePassword } = useAuth()

  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState('')
  const [hasSuccess, setHasSuccess] = useState('')

  const nameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const confirmRef = useRef()
  
  async function handleUpdateProfile(e) {
    e.preventDefault()
    setHasError('')
    setIsLoading(true)
    
    const name = nameRef.current.value
    const email = emailRef.current.value

    const errorResponse = await updateUser(name, email)
  }

  async function handlePasswordChange(e) {
    e.preventDefault()
    setHasError('')
    setIsLoading(true)

    const password = passwordRef.current.value
    const confimrPassword = confirmRef.current.value

    if(password !== confimrPassword) {
      setHasError('Passwords must match.')
      setIsLoading(false)
      return
    }

    const errorResponse = await changePassword(password)
    if(errorResponse !== undefined) {
      switch (errorResponse) {
        case 'auth/requires-recent-login':
          setHasError('Requires a recent login to proceed this action.')
          break;

        case 'auth/weak-password':
          setHasError('Entered passowrd is not strong enough.')
          break;
      
        default:
          break;
      }
      setIsLoading(false)
    }
  }
  
  function onCloseError() {
    setHasError('')
  }

  function onCloseSuccess() {
    setHasSuccess('')
  }

  return (
    <>
      <Navbar bg='dark' className='shadow'>
        <Container>
          <Nav.Link href='/dashboard' className='text-white'>Back To Dashboard</Nav.Link>
        </Container>
      </Navbar>
    
      <Container 
        className='mt-2 w-75 d-flex align-items-center justify-content-center flex-column'
        style={{minHeight: "80vh"}}
      >
        <ToastMessage message={hasError} type="error" onCloseToast={onCloseError} />
        <ToastMessage message={hasSuccess} type="success" onCloseToast={onCloseSuccess} />
        <Card className='shadow w-100 mt-3 mb-5' style={{maxWidth: "560px"}}>
          <Card.Body>
            <h1>Update your Profile</h1>
            <Form onSubmit={handleUpdateProfile} className='d-flex flex-column'>
              <Form.Group id="name">
                <Form.Control 
                  type='text' 
                  className='mt-4' 
                  placeholder='Name'
                  ref={nameRef} 
                  defaultValue={authUser.displayName}
                  required
                />
              </Form.Group>
              <Form.Group id="email">
                <Form.Control 
                  type='email'
                  className='mt-4'
                  placeholder='Email'
                  ref={emailRef}
                  defaultValue={authUser.email}
                  required
                />
              </Form.Group>  
              <Button className='bg-success mt-4 mb-3' type="submit" disabled={isLoading}>
                <strong>{isLoading ? '...Loading' : 'Update'}</strong>
              </Button> 
            </Form>          
          </Card.Body>
        </Card>

        <Card className='shadow w-100' style={{maxWidth: "560px"}}>
          <Card.Body>
            <h1>Change your Password</h1>
            <Form onSubmit={handlePasswordChange} className='d-flex flex-column'>
              <Form.Group id="password">
                <Form.Control 
                  type='password' 
                  className='mt-4' 
                  placeholder='New Passowrd'
                  ref={passwordRef} 
                  required
                />
              </Form.Group>
              <Form.Group id="confirm-password">
                <Form.Control 
                  type='password'
                  className='mt-4'
                  placeholder='Confirm new password'
                  ref={confirmRef}
                  required
                />
              </Form.Group>  
              <Button className='bg-success mt-4 mb-3' type="submit" disabled={isLoading}>
                <strong>{isLoading ? '...Loading' : 'Confirm'}</strong>
              </Button> 
            </Form>          
          </Card.Body>
        </Card>
      </Container>
    </>
  )
}
