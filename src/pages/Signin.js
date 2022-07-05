import React, { useRef, useState } from 'react'
import { useAuth } from '../context/auth'
import { Link, useNavigate } from 'react-router-dom'
import { Container, Card, Form, Button, Navbar, Nav } from 'react-bootstrap'
import ToastMessage from '../components/Toast'

export default function Signin() {
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState('')

  const emailRef = useRef()
  const passwordRef = useRef()

  async function handleSubmit(e) {
    e.preventDefault()
    setIsLoading(true)
    setHasError('')

    const email = emailRef.current.value
    const password = passwordRef.current.value

    const errorResponse = await signIn(email, password)
    if(errorResponse !== undefined) {
      switch (errorResponse) {
        case 'auth/user-not-found':
          setHasError('This email is not yet registered.')
          break;
        
        case 'auth/wrong-password':
          setHasError('Entered wrong email/password combination.')
          break;
        
        case 'auth/invalid-email':
          setHasError('Entered email is invalid.')
          break;
      
        default:
          break;
      }
      setIsLoading(false)
    } else {
      navigate('/dashboard')
    } 
  }

  function onCloseToast() {
    setHasError('')
  }

  return (
    <>
      <Navbar bg='dark' className='shadow'>
        <Container>
          <Nav.Link href='/' className='text-white'>Back To Home</Nav.Link>
        </Container>
      </Navbar>
    
      <Container 
        className='mt-5 w-75 d-flex align-items-center justify-content-center flex-column'
        style={{minHeight: "80vh"}}
      >
        <ToastMessage message={hasError} type="error" onCloseToast={onCloseToast} />
        <Card className='shadow w-100' style={{maxWidth: "560px"}}>
          <Card.Body>
            <h1>Sign In</h1>
            <Form onSubmit={handleSubmit} className='d-flex flex-column'>
              <Form.Group id="email">
                <Form.Control type='email' className='mt-4' placeholder='Email' ref={emailRef} required/>
              </Form.Group>  
              <Form.Group id="password" className='mt-2'>
                <Form.Control type='password' placeholder='Password' ref={passwordRef} required/>
              </Form.Group>
              <Button className='bg-success mt-4 mb-3' type="submit" disabled={isLoading}>
                <strong>{isLoading ? '...Loading' : 'Sign In'}</strong>
              </Button> 
            </Form>          
          </Card.Body>
        </Card>
        <div className='w-75 mt-4 text-center'>
          <Link className='text-dark' to="/forgot-password">Forgot my password</Link>
        </div>
        <div className='w-75 mt-2 text-center'>
          <Link className='text-dark' to='/signup'>Register new account</Link> 
        </div>  
      </Container>
    </>
  )
}