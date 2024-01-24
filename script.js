gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});


// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();


var tl = gsap.timeline({
    scrollTrigger: {
        trigger: "#page1",
        scroller: "#main",
        start: "0% 0%",
        pin: true,
        // pinSpacing: false,
        end: "+=1500",
        // markers: true,
        scrub: 1.5
    }
})

tl.to("#page1 h1:nth-child(1)", {
    y: -300,
}, "anim")
tl.to("#page1 h1:nth-child(3)", {
    y: 300,
}, "anim")
tl.to("#page1 h1:nth-child(2)", {
    color: 'aqua',
    scale: 1.1
}, "anim")


var tl2 = gsap.timeline({
    scrollTrigger: {
        trigger: "#page2",
        scroller: "#main",
        start: "5% 0%",
        pin: true,
        // pinSpacing: false,
        end: "+=2000",
        // markers: true,
        scrub: 1.5
    }
})

gsap.set("#page2 #left", {
    xPercent: 40,
    yPercent: 0,
});

tl2.to("#page2 #left", {
        xPercent: 0,
        scale: 1,
    })
    .to("#page2 #right", {
        opacity: 1,
    }, "someLabel");

let video = document.getElementById('myVideo');
let page8 = document.getElementById('page5');
let page9 = document.getElementById('page9');

let isVideoPlaying = false;

let options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
};

let observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Video is in view
            if (!isVideoPlaying) {
                video.play();
                isVideoPlaying = true;
            }
        } else {
            // Video is out of view
            if (isVideoPlaying) {
                video.pause();
                isVideoPlaying = false;
            }
        }
    });
}, options);

observer.observe(page8);

window.addEventListener('load', () => {
    let page8Rect = page8.getBoundingClientRect();
    if (page8Rect.bottom > 0 && page8Rect.top < window.innerHeight) {
        video.play();
        isVideoPlaying = true;
    }
});


var texts = [
    "kya ho gya yr zaina",
    "please na be maan ja meri behen",
    "stop pressing no!",
    "please",
    "yr chahiye to ek chocolate le le lekin yr please no mt kar be",
    "please plaese plaese plaewese plaewsple",
    "Zainaaaa please na yr maan ja na"

];
var currentIndex = 0;
var button = document.getElementById('Yes');
var button2 = document.getElementById('No');
var myDiv = document.getElementById('right-2')
var image = document.querySelector('#something2 img')

document.getElementById('Yes').addEventListener('click', function() {
    if (currentIndex < texts.length) {
        myDiv.firstChild.nodeValue = texts[currentIndex];
        currentIndex++;
    } else {
        myDiv.firstChild.nodeValue = "ek last chance de de yr zaina please!";
        button.style.display = "none";
        image.style.display = "flex"
    }
});

button2.addEventListener('click', function() {
    myDiv.firstChild.nodeValue = "Thank you JIAN! Waise sahi me bta de agar chocolate chahiye to//"
    button.style.display = "none";
    button2.style.display = "none";
    image.style.display = "none";

})