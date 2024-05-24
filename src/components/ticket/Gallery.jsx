import React from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';

const Gallery = ({ evidence = [] }) => {

    return (
        <section className={`gallery mb-4 ${evidence.length ? '' : 'd-none'}`}>
            <h6>
                Archivos adjuntos
            </h6>

            <Splide aria-label="Evidence">
                {
                    evidence.map(({ data }, index) => {
                        return (
                            <SplideSlide key={index}>
                                <img className='w-100' src={`data:image/png;base64,${data}`} aria-hidden="true" />
                            </SplideSlide>
                        );
                    })
                }
                {/* <SplideSlide>
                    <img src="image1.jpg" alt="Image 1" />
                </SplideSlide>
                <SplideSlide>
                    <img src="image2.jpg" alt="Image 2" />
                </SplideSlide> */}
            </Splide>

        </section>
    );
}

export default Gallery;
