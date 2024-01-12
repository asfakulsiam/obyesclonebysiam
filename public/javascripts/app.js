'use strict';
// ------------------------- //


// loader animation


function loaderAnimation() {
    setTimeout(() => {
        document.body.style.overflow = '';
    }, 7000);
    
    const tl = gsap.timeline();

tl.from('.line h1', {
    y: 100,
    stagger: 0.2,
    duration: .5,
    delay: .5
})
tl.from('.line .line-counter, .line h2', {
    opacity: 0,
    duration: .6,
    onStart: () => {
        // loader timer
        let counterElm = document.querySelector('#counter-elm');
        let counter = 0;

        setInterval(() => {
            if (counter < 100) {
                counterElm.innerHTML = ++counter;
            } else {
                counter = 100;
            }
        }, 33);
    }
})
tl.from('#loader p', {
    opacity: 0,
})
tl.to('#loader', {
    y: '-100%',
    duration: .5,
    delay: 4,
    onEnd: () => {
        tl.from('#page-one', {
            y: 1600,
            duration: .3,
            ease: Power4.out,
            onEnd: () => {
                tl.to('#loader', {
                    display: 'none'
                })
            }
        })
    }
});
document.body.style.overflow = 'hidden';
}


loaderAnimation()



