import React from 'react'
import { Badge, Card } from 'react-bootstrap'

//sanitize output

export default function Routes({title, location, grade}) {
  let color
  switch (grade) {
    case 'V0':
      color = 'success'
      break;
    case 'V1':
      color = 'success'
      break;
    case 'V2':
      color = 'success'
      break;

    case 'V3':
      color = 'warning'
      break;
    case 'V4':
      color = 'warning'
      break;

    case 'V5':
      color = 'primary'
      break;
    case 'V6':
      color = 'primary'
      break;

    case 'V7':
      color = 'info'
      break;
    case 'V8':
      color = 'info'
      break;

    case 'V9+':
      color = 'danger'
      break;  
  
    default:
      color = 'secondary'
      break;
  }

  return (
    <Card className='mb-3'>
      <Card.Body style={{padding: '18px 38px 4px 38px'}}>
        <strong>{title}</strong>
        <Badge bg={color} className='ml-3'>{grade}</Badge>
        <p>{location ? location : 'Not specified'}</p>
      </Card.Body>
    </Card>
  )
}
