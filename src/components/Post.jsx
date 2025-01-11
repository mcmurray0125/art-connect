import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import moment from 'moment';

export default function MemoryCard ( {memory} ) {
  
  const formattedDate = moment(memory.date).format("MMMM Do, YYYY");

  return (
    <Card className='memory-card'>
      <Link to={`/memory/${memory.id}`} state={{data: memory}} >
        {memory.coverPhoto.length ? 
        <Card.Img src={memory.coverPhoto}/>
        :
        <div className='card-img' style={{background: 'linear-gradient(to right,#56efea,#d6cb81)', height: '300px'}}></div>
        }
        <Card.ImgOverlay className='p-0'>
          <div className='px-3 pb-2 d-flex justify-content-between w-100 align-items-baseline'>
            <Card.Title>{memory.title}</Card.Title>
            <Card.Text className='text-nowrap'>{formattedDate}</Card.Text>
          </div>
        </Card.ImgOverlay>
      </Link>
    </Card>
  )
}
