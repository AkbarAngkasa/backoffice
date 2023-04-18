import React, { useEffect, useRef } from 'react'
import Lottie from 'lottie-web';

export default function NotFoundAnimation() {
    const container = useRef(null);
    
    useEffect(() => {
        Lottie.loadAnimation({
            container: container.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: require('../../assets/animations/notfound-animation.json')
        })
        return () => {
            Lottie.destroy();
        };
    })

  return (
        <>
            <div className='container w-full mx-auto' ref={container}></div>
        </>
    )
}
