import React, { useState } from 'react'
import { Container, Tabs, Tab, Button, Navbar, Nav } from 'react-bootstrap'
import { useAuth } from '../context/auth'
import ToastMessage from '../components/Toast'
import Routes from '../components/Routes'

export default function Dashboard() {
  const { authUser, logout } = useAuth()
  const username = authUser.displayName;
  console.log(username);

  const [hasError, setHasError] = useState('')

  async function handleLogout() {
    try {
      setHasError('')
      await logout()
    } catch (error) {
      setHasError('Problem when trying to properly logout.')
    }
  }

  function onCloseToast() {
    setHasError('')
  }

  return (
    <>
      <Navbar bg='dark' className='shadow'>
        <strong className='text-white ml-3'>Hello, {authUser.displayName}</strong>
        <Container className='d-flex justify-content-end'>
          <Nav.Link href='/update-profile' className='text-white'>Profile</Nav.Link>
          <Button variant='link' className='text-white mr-3 text-decoration-none' onClick={handleLogout}>
            Logout
          </Button>
        </Container>
      </Navbar>
      <Container style={{height: 'fit-content', maxWidth: '860px'}}>
        <ToastMessage hasError={hasError} onCloseToast={onCloseToast} />
        <Tabs defaultActiveKey="myRoutes" className='mt-5 mb-3'>
          <Tab title="Browser Routes" eventKey="allRoutes">
            <Routes title="Steep Overhang" grade="V4" location="True North Climbing" />
          </Tab>
          <Tab title="My Routes" eventKey="myRoutes">
            <Routes title="Steep Overhang" grade="V4" location="True North Climbing" />
            <Routes title="Steep Overhang 2" grade="V8" location="True North Climbing" />
          </Tab>
        </Tabs>   
      </Container>
    </>
  )
}
