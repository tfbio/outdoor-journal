import React, { useRef, useState } from 'react'
import { useAuth } from '../context/auth'
import { Container, Card, Form, Button, Navbar, Nav } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import ToastMessage from '../components/Toast'

export default function Signup() {
  const { signUp } = useAuth()
  const navigate = useNavigate()

  const [isLoading, setIsLoading] = useState(false)
  const [hasError, setHasError] = useState('')

  const nameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const confirmRef = useRef()

  async function handleSubmit(e) {
    e.preventDefault()
    setHasError('')
    setIsLoading(true)

    const name = nameRef.current.value
    const email = emailRef.current.value
    const password = passwordRef.current.value
    const confimrPassword = confirmRef.current.value

    if(password !== confimrPassword) {
      setHasError('Passwords must match.')
      setIsLoading(false)
      return
    }

    const errorResponse = await signUp(name, email, password)
    if(errorResponse !== undefined) {
      switch (errorResponse) {
        case 'auth/email-already-in-use':
          setHasError('This email is already in use.')
          break;
        
        case 'auth/invalid-email':
          setHasError('Entered email is invalid.')
          break;

        case 'auth/operation-not-allowed':
          setHasError('Could not register at this time, try again later.')
          break;

        case 'auth/weak-password':
          setHasError('Entered passowrd is not strong enough.')
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
        <ToastMessage message={hasError} type="error" onCloseToast={onCloseToast}/>
        <Card className='shadow w-100' style={{maxWidth: "560px"}}>
          <Card.Body>
            <h1>Register</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group id="name">
                <Form.Control type='text' className='mt-4' placeholder='Name' ref={nameRef} required/>
              </Form.Group> 
              <Form.Group id="email">
                <Form.Control type='email' className='mt-2' placeholder='Email' ref={emailRef} required/>
              </Form.Group>  
              <Form.Group id="password" className='mt-2'>
                <Form.Control type='password' placeholder='Password' ref={passwordRef} required/>
              </Form.Group>
              <Form.Group id="confirm-password" className='mt-2'>
                <Form.Control type='password' placeholder='Confirm Password' ref={confirmRef} required/>
              </Form.Group>  
              <Button className='bg-success mt-3' type="submit" disabled={isLoading} style={{minWidth: '120px'}}>
                {isLoading ? '...Loading' : 'Register'}
              </Button> 
            </Form>          
          </Card.Body>
        </Card>
        <div className='w-75 mt-2 text-center'>
          <Link style={{color: '#000'}} to='/signin'>Or Login in existing account</Link> 
        </div>
      </Container>
    </>
  )
}