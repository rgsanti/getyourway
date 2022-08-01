import React from 'react';
import {Carousel} from 'react-bootstrap';
import '../../styles/carousel.css';

const CarouselSlider = () => {
  return(
    <>
    <Carousel>
      <Carousel.Item interval={1000}>
        <img
          className="slide"
          src="https://wallpapercave.com/wp/wp4492340.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
            <div className='text1'>
          <h3>Where to next?</h3>
          <p></p>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={1000}>
        <img
          className="slide"
          src="https://www.gannett-cdn.com/presto/2022/03/17/USAT/168be99c-b253-4e54-a999-996d21d7458a-GettyImages-1296147185.jpg"
          alt="Second slide"
        />
        <Carousel.Caption>
        <div className='text2'>
          <h3>Find your perfect trip today!</h3>
          <p></p>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={1000}>
        <img
          className="slide"
          src="https://cdn.theculturetrip.com/wp-content/uploads/2021/06/amalfi-coast.jpg"
          alt="Third slide"
        />
        <Carousel.Caption>
        <div className='text3'>
          <h3>Your next trip is waiting</h3>
          <p></p>
          </div>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </>
  )
}
export default CarouselSlider