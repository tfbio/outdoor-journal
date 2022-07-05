import React from 'react'
import { Container, Card, Form, Button, Navbar, Nav } from 'react-bootstrap'

export default function Home() {
  return (
    <>
      <Navbar bg='dark' className='shadow'>
        <Container>
          <Nav.Link href='#' className='text-white'>Back To Home</Nav.Link>
        </Container>
      </Navbar>
      <div>Home</div>
    </>
  )
}
