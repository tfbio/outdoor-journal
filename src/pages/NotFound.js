import React from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'

export default function NotFound() {
  return (
    <>
      <Navbar bg='dark' className='shadow'>
        <Container>
          <Nav.Link href='/' className='text-white'>Back To Home</Nav.Link>
        </Container>
      </Navbar>
      <Container className='w-100'>
        <h1>Not Found</h1>
      </Container>
    </>
  )
}
