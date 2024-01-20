'use strict';
// ------------------------- //


// loader animation
const magnet = document.querySelector('.magnet');
const navLink = document.querySelectorAll('.nav-link a');
const navButtons = document.querySelectorAll('.nav-bar .nav-button button');
// loader animations
function loaderAnimation() {
    setTimeout(() => {
        document.body.style.overflow = '';
    }, 7000);

    const tl = gsap.timeline();

    tl.from('.line h1', {
        y: 110,
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

// mousemove 
function mouseMove() {
    window.addEventListener('mousemove', (e) => {
        let rect = magnet.getBoundingClientRect();
        let y = e.clientX - rect.width / 2 + 3;
        let x = e.clientY - rect.height / 2 - 8;
        magnet.style.top = `${x}px`;
        magnet.style.left = `${y}px`;
    });
}

// magnetic hover effect for a single element
function magneticHover(elem) {
    let rect = elem.getBoundingClientRect();
    let elemWidth = magnet.getBoundingClientRect();
    let newMagnetWidth = elemWidth.width + rect.width / 4;

    elem.addEventListener('mousemove', (e) => {
        let x = e.clientX;
        let y = e.clientY;

        let moveX = x - rect.left - rect.width / 2;
        let moveY = y - rect.top - rect.height / 2;

        elem.children[0].style.transform = `matrix(1, 0, 0, 1, ${moveX * 0.8}, ${moveY * 0.8})`;
        magnet.style.width = `${newMagnetWidth}px`;
        magnet.style.height = `${newMagnetWidth}px`;

        magnet.style.transition = 'width 0.3s ease, height 0.3s ease';
    });

    elem.addEventListener('mouseout', () => {
        elem.children[0].style.transform = '';
        magnet.style.width = ``;
        magnet.style.height = ``;

        // Remove transition properties
        elem.children[0].style.transition = '';
        magnet.style.transition = 'width 0.3s ease, height 0.3s ease';
    });
}

// func for multiple elements
function multiMagnet(varName) {
    varName.forEach((elem) => {
        magneticHover(elem);
    });
}














// call the func here
loaderAnimation();
mouseMove();
multiMagnet(navLink);
multiMagnet(navButtons);





