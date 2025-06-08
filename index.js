function locomotiveanimation(params) {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector(".main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy(".main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
    });



    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

}

function Loader(e) {
    var tl = gsap.timeline()


    tl.from(".line h1", {
        y: 150,
        stagger: 0.25,
        duration: 0.6,
        delay: 0.5,
    })

    tl.from('#line1-part1,.line h2 ', {
        opacity: 0,
        duration: 3,
        onStart: function () {
            let count = 0;
            setInterval(
                function (e) {
                    count++;
                    if (count <= 100) {
                        document.querySelector('#line1-part1 h5').innerHTML = count
                    }
                    else {
                    }
                }, 35)
        }
    })


    tl.to('.loader', {
        opacity: 0,
        duration: 1.3,
    })


    tl.from(".page1", {
        y: 1600,
        delay: 0.2,
        opacity: 0,
        ease: Power4,
        duration: 0.5,
    })

    tl.to(".loader", {
        display: "none"
    })

    tl.from("nav", {
        opacity: 0
    })

    tl.from(".hero h1", {
        y: 150,
        stagger: 0.2,
    })
    tl.from(".hero, .page2", {
        opacity: 0
    })
    
}
window.addEventListener('load',()=>{    
    Loader();
})

function Cursoranimation() {


    document.addEventListener("mousemove", function (e) {
        gsap.to(".crsr", {
            top: e.y,
            left: e.x
        })
    })

    Shery.makeMagnet("nav h4,.imgs img");
}

function sherys() {
    Shery.imageEffect(".small-imgs-container , .big-imgs-container", {
        style: 5, //Select Style
        // debug: true, // Debug Panel
        config: { "a": { "value": 1.15, "range": [0, 30] }, "b": { "value": 0.75, "range": [-1, 1] }, "zindex": { "value": -9996999, "range": [-9999999, 9999999] }, "aspect": { "value": 0.7142856656288648 }, "ignoreShapeAspect": { "value": true }, "shapePosition": { "value": { "x": 0, "y": 0 } }, "shapeScale": { "value": { "x": 0.5, "y": 0.5 } }, "shapeEdgeSoftness": { "value": 0, "range": [0, 0.5] }, "shapeRadius": { "value": 0, "range": [0, 2] }, "currentScroll": { "value": 0 }, "scrollLerp": { "value": 0.07 }, "gooey": { "value": true }, "infiniteGooey": { "value": false }, "growSize": { "value": 4, "range": [1, 15] }, "durationOut": { "value": 1, "range": [0.1, 5] }, "durationIn": { "value": 1.5, "range": [0.1, 5] }, "displaceAmount": { "value": 0.5 }, "masker": { "value": false }, "maskVal": { "value": 1, "range": [1, 5] }, "scrollType": { "value": 0 }, "geoVertex": { "range": [1, 64], "value": 1 }, "noEffectGooey": { "value": true }, "onMouse": { "value": 1 }, "noise_speed": { "value": 0.61, "range": [0, 10] }, "metaball": { "value": 0.49, "range": [0, 2] }, "discard_threshold": { "value": 0.49, "range": [0, 1] }, "antialias_threshold": { "value": 0, "range": [0, 0.1] }, "noise_height": { "value": 0.5, "range": [0, 2] }, "noise_scale": { "value": 10, "range": [0, 100] } },
        gooey: true
    });
}

function videoplayer() {
    let video = document.querySelector(".video-container")
    let player = document.querySelector(".player")
    let image = document.querySelector(".video-container>img")
    let vid = document.querySelector(".video-container>video")
    video.addEventListener("mouseenter", function (e) {
        video.addEventListener("mousemove", function (e) {
            gsap.to(".crsr",{
                opacity:0,
            })
            gsap.to(".player", {
                left: e.x - 500,
                top: e.y - 300,
            })

        })
        video.addEventListener('mouseleave',function (e) {
            gsap.to(".crsr",{
                opacity:1,
            })
            gsap.to(".player", {
                left: "90%",
                top: "-10%",
            })            
        })
    })

video.addEventListener('click', function(){
   if(vid.paused){
       image.style.opacity = "0"
       vid.play();
    }
    else{
        vid.pause();
        image.style.opacity = "1"
    }
})
}

sherys();
videoplayer();
Cursoranimation();
locomotiveanimation();



document.addEventListener("mousemove",function (e) {
    gsap.to(".flag", {
        x: e.x,
         y: e.y
    })
})
document.querySelector("#web").addEventListener("mouseenter",function (e) {
    gsap.to(".flag", {
       opacity: 1,
    })
})

document.querySelector("#web").addEventListener("mouseleave",function (e) {
    gsap.to(".flag", {
       opacity: 0,
    })
})
