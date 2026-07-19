
/* ============================================================
   PROJECT AURORA
   script.js

   PART 1 / ?

   Core Initialization
   Config Loading
   DOM Setup
   Loader
   Hero
   Music System
============================================================ */


/* ============================================================
   WAIT FOR PAGE
============================================================ */
let musicStarted = false;
document.addEventListener(
    "DOMContentLoaded",
    () => {


        console.log(
            "❤️ Birthday Website Loaded"
        );


        initializeWebsite();


    }
);



/* ============================================================
   MAIN INITIALIZER
============================================================ */


function initializeWebsite(){


    loadConfig();


    setupLoader();


    setupHero();


    setupMusic();


}



/* ============================================================
   CONFIG DATA
============================================================ */


function loadConfig(){


    // Name

    const heroTitle =
        document.querySelector("#heroTitle");


    if(heroTitle){

        heroTitle.textContent =
            birthdayConfig.name + " ❤️";

    }



    // Subtitle

    const subtitle =
        document.querySelector("#heroSubtitle");


    if(subtitle){

        subtitle.textContent =
            birthdayConfig.subtitle;

    }



    // Hero image

    const heroImage =
        document.querySelector("#heroImage");


    if(heroImage){

        heroImage.src =
            birthdayConfig.heroImage;

    }



    // Story

    const story =
        document.querySelector("#storyContent");


    if(story){

        story.textContent =
            birthdayConfig.story;

    }



    // Letter

    const letter =
        document.querySelector("#letterText");


    if(letter){

        letter.textContent =
            birthdayConfig.letter;

    }



    // Ending

    const ending =
        document.querySelector("#endingMessage");


    if(ending){

        ending.textContent =
            birthdayConfig.ending;

    }



}



/* ============================================================
   LOADER
============================================================ */


function setupLoader(){


    const loader =
        document.querySelector("#loader");


    if(!loader)
        return;



    window.addEventListener(
        "load",
        ()=>{


            setTimeout(
                ()=>{


                    loader.style.opacity="0";


                    setTimeout(
                        ()=>{


                            loader.remove();


                        },
                        800
                    );


                },
                1200
            );


        }
    );

}



/* ============================================================
   HERO
============================================================ */


function setupHero(){


    const startButton =
        document.querySelector("#startButton");



    if(startButton){


        startButton.addEventListener(
            "click",
            ()=>{


                window.scrollTo({

                    top:
                    window.innerHeight,

                    behavior:
                    "smooth"

                });


                startMusic();

            }
        );


    }



    // Hero entrance animation


    if(
        typeof gsap !== "undefined"
    ){


        gsap.from(
            ".hero-content > *",
            {

                opacity:0,

                y:60,

                duration:1,

                stagger:.2,

                ease:
                "power3.out"

            }
        );


    }



}



/* ============================================================
   MUSIC SYSTEM
============================================================ */





function setupMusic(){


    const audio =
        document.querySelector("#music");


    const button =
        document.querySelector("#musicToggle");



    if(!audio)
        return;



    audio.src =
        birthdayConfig.music.file;



    const title =
        document.querySelector("#songTitle");


    const artist =
        document.querySelector("#songArtist");



    if(title){

        title.textContent =
            birthdayConfig.music.title;

    }


    if(artist){

        artist.textContent =
            birthdayConfig.music.artist;

    }



    if(button){


        button.addEventListener(
            "click",
            ()=>{


                toggleMusic();


            }
        );


    }



}



function startMusic(){


    const audio =
        document.querySelector("#music");


    if(!audio)
        return;



    audio.play()
    .then(()=>{


        musicStarted=true;


        updateMusicIcon();


    })
    .catch(
        error=>{

            console.log(
                "Music waiting for interaction"
            );

        }
    );


}



function toggleMusic(){


    const audio =
        document.querySelector("#music");



    if(!audio)
        return;



    if(audio.paused){


        audio.play();


    }
    else{


        audio.pause();


    }



    updateMusicIcon();


}



function updateMusicIcon(){


    const button =
        document.querySelector("#musicToggle");


    const audio =
        document.querySelector("#music");



    if(
        !button ||
        !audio
    )
    return;



    if(audio.paused){


        button.innerHTML =
        `<i class="fa-solid fa-play"></i>`;


    }
    else{


        button.innerHTML =
        `<i class="fa-solid fa-pause"></i>`;


    }



}
/* ============================================================
   PROJECT AURORA

   script.js

   PART 2 / ?

   Timeline
   Gallery
   Scroll Animations
============================================================ */



/* ============================================================
   TIMELINE GENERATOR
============================================================ */


function createTimeline(){


    const container =
        document.querySelector(
            "#timelineContainer"
        );


    if(!container)
        return;



    container.innerHTML="";



    birthdayConfig.timeline.forEach(
        item=>{


            const card =
            document.createElement(
                "div"
            );


            card.className =
            "timeline-item";



            card.innerHTML = `

                <div class="timeline-date">

                    ${item.date}

                </div>


                <div class="timeline-text">

                    ${item.text}

                </div>

            `;



            container.appendChild(card);



        }
    );



}





/* ============================================================
   GALLERY GENERATOR
============================================================ */


function createGallery(){


    const container =
        document.querySelector(
            "#galleryContainer"
        );



    if(!container)
        return;



    container.innerHTML="";



    birthdayConfig.gallery.forEach(
        photo=>{


            const item =
            document.createElement(
                "div"
            );



            item.className =
            "gallery-item";



            item.innerHTML = `


                <img
                src="${photo.image}"
                loading="lazy"
                alt="memory"
                >


                <div class="gallery-caption">

                    ${photo.caption}

                </div>


            `;



            container.appendChild(item);



        }
    );


    setupLightbox();

}





/* ============================================================
   WISH GENERATOR
============================================================ */


function createWishes(){


    const container =
    document.querySelector(
        "#wishContainer"
    );



    if(!container)
        return;



    container.innerHTML="";



    birthdayConfig.wishes.forEach(
        wish=>{


            const element =
            document.createElement(
                "div"
            );



            element.className =
            "wish";



            element.textContent =
            wish;



            container.appendChild(
                element
            );


        }
    );



}





/* ============================================================
   INITIALIZE CONTENT
============================================================ */


function generateContent(){


    createTimeline();


    createGallery();


    createWishes();


}





/* Run after config loaded */


generateContent();





/* ============================================================
   GSAP SCROLL SYSTEM
============================================================ */


function setupScrollAnimations(){


    if(
        typeof gsap === "undefined"
    )
    return;



    if(
        typeof ScrollTrigger === "undefined"
    )
    return;



    gsap.registerPlugin(
        ScrollTrigger
    );





    /* Timeline */


    gsap.utils.toArray(
        ".timeline-item"
    )
    .forEach(
        item=>{


            gsap.to(
                item,
                {


                    opacity:1,


                    y:0,


                    duration:1,


                    scrollTrigger:{


                        trigger:item,


                        start:
                        "top 80%",


                        toggleActions:
                        "play none none reverse"


                    }


                }
            );



        }
    );






    /* Gallery */


    gsap.utils.toArray(
        ".gallery-item"
    )
    .forEach(
        image=>{


            gsap.from(
                image,
                {

                    opacity:0,


                    y:80,


                    scale:.9,


                    duration:1,


                    scrollTrigger:{


                        trigger:image,


                        start:
                        "top 85%"


                    }

                }
            );


        }
    );






    /* Wishes */


    gsap.utils.toArray(
        ".wish"
    )
    .forEach(
        wish=>{


            gsap.to(
                wish,
                {

                    opacity:1,

                    y:0,

                    duration:1.2,


                    scrollTrigger:{


                        trigger:wish,


                        start:
                        "top 75%"


                    }


                }
            );


        }
    );



}





/* Delay because GSAP loads externally */


window.addEventListener(
    "load",
    ()=>{


        setTimeout(
            ()=>{


                setupScrollAnimations();


            },
            500
        );


    }
);
/* ============================================================
   PROJECT AURORA

   script.js

   PART 3 / ?

   Hearts
   Cursor
   Particles
   Letter
   Music Progress
============================================================ */



/* ============================================================
   FLOATING HEARTS
============================================================ */


function createFloatingHeart(){


    const container =
    document.querySelector(
        "#heartContainer"
    );


    if(!container)
        return;



    const heart =
    document.createElement(
        "div"
    );


    heart.className =
    "floating-heart";



    const hearts = [

        "❤️",
        "💗",
        "💕",
        "💖",
        "✨"

    ];



    heart.innerHTML =
    hearts[
        Math.floor(
            Math.random()
            *
            hearts.length
        )
    ];



    heart.style.left =
    Math.random()*100+"%";



    heart.style.fontSize =
    (15+
    Math.random()*35)
    +"px";



    heart.style.animationDuration =
    (5+
    Math.random()*5)
    +"s";



    container.appendChild(
        heart
    );



    setTimeout(
        ()=>{

            heart.remove();

        },
        10000
    );


}



function startHearts(){


    setInterval(
        createFloatingHeart,
        800
    );


}




window.addEventListener(
    "load",
    startHearts
);





/* ============================================================
   CURSOR GLOW
============================================================ */


function setupCursor(){


    const glow =
    document.querySelector(
        "#cursorGlow"
    );



    if(!glow)
        return;



    document.addEventListener(
        "mousemove",
        e=>{


            glow.style.left =
            e.clientX+"px";


            glow.style.top =
            e.clientY+"px";



        }
    );



}



window.addEventListener(
    "load",
    setupCursor
);





/* ============================================================
   BACKGROUND PARTICLES
============================================================ */


function createParticles(){


    const container =
    document.querySelector(
        ".particles"
    );



    if(!container)
        return;



    for(
        let i=0;
        i<45;
        i++
    ){


        const particle =
        document.createElement(
            "span"
        );



        particle.className =
        "particle";



        particle.style.left =
        Math.random()*100+"%";



        particle.style.top =
        Math.random()*100+"%";



        particle.style.animationDuration =
        (
            8+
            Math.random()*12
        )
        +"s";



        particle.style.animationDelay =
        (
            Math.random()*5
        )
        +"s";



        container.appendChild(
            particle
        );

    }


}



window.addEventListener(
    "load",
    createParticles
);





/* ============================================================
   LOVE LETTER OPENING
============================================================ */


function setupLetter(){


    const envelope =
    document.querySelector(
        ".envelope"
    );



    if(!envelope)
        return;



    envelope.addEventListener(
        "click",
        ()=>{


            envelope.classList.toggle(
                "open"
            );



        }
    );


}



window.addEventListener(
    "load",
    setupLetter
);





/* ============================================================
   MUSIC PROGRESS BAR
============================================================ */


function setupMusicProgress(){


    const audio =
    document.querySelector(
        "#music"
    );


    const bar =
    document.querySelector(
        "#progressBar"
    );



    if(
        !audio ||
        !bar
    )
    return;



    audio.addEventListener(
        "timeupdate",
        ()=>{


            if(
                !audio.duration
            )
            return;



            const percent =
            (
                audio.currentTime /
                audio.duration
            )
            *
            100;



            bar.style.width =
            percent+"%";



        }
    );



}



window.addEventListener(
    "load",
    setupMusicProgress
);
/* ============================================================
   PROJECT AURORA

   script.js

   PART 4 / ?

   Gift
   Confetti
   Final Reveal
   Advanced Interactions
============================================================ */



/* ============================================================
   GIFT SURPRISE
============================================================ */



function setupGift(){


    const button =
    document.querySelector(
        "#giftButton"
    );


    const secret =
    document.querySelector(
        "#secret"
    );


    const gift =
    document.querySelector(
        "#giftBox"
    );



    if(
        !button ||
        !secret
    )
    return;



    button.addEventListener(
        "click",
        ()=>{


            secret.classList.add(
                "show"
            );



            secret.scrollIntoView({

                behavior:"smooth"

            });



        }
    );



    if(gift){


        gift.addEventListener(
            "click",
            ()=>{


                gift.classList.add(
                    "open"
                );



                launchConfetti();



                showFinalMessage();


            }
        );


    }


}



window.addEventListener(
    "load",
    setupGift
);


// ==========================================
// FINAL GIFT SURPRISE
// ==========================================
const giftBox =
document.querySelector("#giftBox");


if(giftBox){

    giftBox.addEventListener(
        "click",
        ()=>{
            console.log("🎁 Gift clicked");

            giftBox.classList.add(
                "opening"
            );


            setTimeout(()=>{


                const surprise =
                document.createElement("div");


                surprise.className =
                "final-surprise";


                surprise.innerHTML = `

                    <div class="surprise-card">


                        <button class="close-surprise">
                            ×
                        </button>


                        <h2>
                            ❤️ Happy Birthday Jojety❤️
                        </h2>


                        <p>
                            My favorite gift is
                            every moment I spend with you.
                        </p>


                        <img src="images/7.jpeg">


                    </div>

                `;


                document.body.appendChild(
                    surprise
                );
                    console.log("Popup created", surprise);


                const closeButton =
                surprise.querySelector(
                    ".close-surprise"
                );


                closeButton.onclick = ()=>{


                    surprise.classList.remove(
                        "show"
                    );


                    setTimeout(()=>{

                        surprise.remove();

                    },500);


                };


                surprise.onclick = (e)=>{

                    if(e.target === surprise){

                        surprise.remove();

                    }

                };


                setTimeout(()=>{

                    surprise.classList.add(
                        "show"
                    );

                },100);


            },1200);


        }
    );

}
/* ============================================================
   CONFETTI SYSTEM
============================================================ */


function launchConfetti(){



    const amount = 120;



    for(
        let i=0;
        i<amount;
        i++
    ){


        createConfettiPiece();


    }



}



function createConfettiPiece(){


    const piece =
    document.createElement(
        "span"
    );



    piece.className =
    "confetti-piece";



    const colors = [

        "#ff4f88",
        "#ffffff",
        "#ffd369",
        "#9b5cff"

    ];



    piece.style.background =
    colors[
        Math.floor(
            Math.random()
            *
            colors.length
        )
    ];



    piece.style.left =
    Math.random()*100+"vw";



    piece.style.top =
    "-20px";



    piece.style.width =
    (5+
    Math.random()*10)
    +"px";



    piece.style.height =
    (5+
    Math.random()*10)
    +"px";



    piece.style.position =
    "fixed";



    piece.style.zIndex =
    "9999";



    piece.style.borderRadius =
    "3px";



    document.body.appendChild(
        piece
    );



    const duration =
    2000+
    Math.random()*3000;



    piece.animate(

        [

            {
                transform:
                "translateY(0) rotate(0deg)",
                opacity:1
            },


            {
                transform:
                `
                translateY(100vh)
                rotate(720deg)
                `,
                opacity:0
            }

        ],

        {

            duration:duration,

            easing:
            "cubic-bezier(.25,.46,.45,.94)"

        }


    );



    setTimeout(
        ()=>{

            piece.remove();

        },
        duration
    );


}






/* ============================================================
   FINAL MESSAGE
============================================================ */


function showFinalMessage(){


    const ending =
    document.querySelector(
        "#ending"
    );



    if(!ending)
    return;



    if(
        typeof gsap !== "undefined"
    ){



        gsap.to(
            ending,
            {

                scale:1.03,

                duration:.8,

                yoyo:true,

                repeat:1,

                ease:
                "power2.inOut"


            }
        );



    }



}





/* ============================================================
   SMOOTH SECTION OBSERVER
============================================================ */


function setupRevealObserver(){


    const elements =
    document.querySelectorAll(
        "section"
    );



    const observer =
    new IntersectionObserver(

        entries=>{


            entries.forEach(
                entry=>{


                    if(
                        entry.isIntersecting
                    ){


                        entry.target
                        .classList
                        .add(
                            "visible"
                        );


                    }


                }
            );


        },


        {

            threshold:.15

        }


    );



    elements.forEach(
        section=>{


            observer.observe(
                section
            );


        }
    );



}



window.addEventListener(
    "load",
    setupRevealObserver
);





/* ============================================================
   MOBILE TOUCH EFFECT
============================================================ */


function setupMobileTouch(){


    if(
        window.innerWidth > 768
    )
    return;



    document
    .querySelectorAll(
        ".gallery-item"
    )
    .forEach(
        item=>{


            item.addEventListener(
                "touchstart",
                ()=>{


                    item.classList.add(
                        "active"
                    );


                }
            );



        }
    );



}



window.addEventListener(
    "load",
    setupMobileTouch
);
/* ============================================================
   PROJECT AURORA

   script.js

   PART 5 / ?

   Parallax
   Image Effects
   Blur Transitions
   Lazy Loading
   Music Fade
============================================================ */



/* ============================================================
   HERO PARALLAX
============================================================ */


function setupHeroParallax(){


    const image =
    document.querySelector(
        "#heroImage"
    );


    if(!image)
        return;



    window.addEventListener(
        "scroll",
        ()=>{


            const scroll =
            window.scrollY;



            image.style.transform =
            `
            scale(1.15)
            translateY(${scroll * 0.18}px)
            `;



        }
    );



}



window.addEventListener(
    "load",
    setupHeroParallax
);





/* ============================================================
   IMAGE REVEAL
============================================================ */


function setupImageReveal(){


    const images =
    document.querySelectorAll(
        ".gallery-item img"
    );



    const observer =
    new IntersectionObserver(

        entries=>{


            entries.forEach(
                entry=>{


                    if(
                        entry.isIntersecting
                    ){


                        entry.target
                        .classList
                        .add(
                            "loaded"
                        );


                        observer.unobserve(
                            entry.target
                        );


                    }


                }
            );


        },

        {
            threshold:.2
        }

    );



    images.forEach(
        img=>{

            observer.observe(img);

        }
    );



}



window.addEventListener(
    "load",
    setupImageReveal
);





/* ============================================================
   SECTION BLUR TRANSITION
============================================================ */


function setupBlurTransition(){


    const sections =
    document.querySelectorAll(
        "section"
    );



    const observer =
    new IntersectionObserver(

        entries=>{


            entries.forEach(
                entry=>{


                    if(
                        entry.isIntersecting
                    ){


                        entry.target
                        .style.filter =
                        "blur(0px)";



                    }
                    else{


                        entry.target
                        .style.filter =
                        "blur(6px)";


                    }



                }
            );


        },

        {
            threshold:.1
        }

    );



    sections.forEach(
        section=>{


            section.style.transition =
            "filter 1s ease";



            observer.observe(
                section
            );


        }
    );



}



window.addEventListener(
    "load",
    setupBlurTransition
);





/* ============================================================
   LAZY IMAGE LOADING
============================================================ */


function setupLazyImages(){


    const images =
    document.querySelectorAll(
        "img"
    );



    images.forEach(
        img=>{


            img.loading =
            "lazy";



        }
    );


}



window.addEventListener(
    "load",
    setupLazyImages
);





/* ============================================================
   MUSIC FADE SYSTEM
============================================================ */


function fadeMusicIn(){


    const audio =
    document.querySelector(
        "#music"
    );



    if(!audio)
        return;



    audio.volume = 0;



    let volume = 0;



    const fade =
    setInterval(
        ()=>{


            volume += .03;



            if(volume >= 1){


                volume = 1;


                clearInterval(
                    fade
                );


            }



            audio.volume =
            volume;



        },

        100

    );


}




function fadeMusicOut(){


    const audio =
    document.querySelector(
        "#music"
    );



    if(!audio)
        return;



    let volume =
    audio.volume;



    const fade =
    setInterval(
        ()=>{


            volume -= .03;



            if(volume <=0){


                volume=0;


                audio.pause();


                clearInterval(
                    fade
                );


            }



            audio.volume =
            volume;



        },

        100

    );


}






/* ============================================================
   PERFORMANCE MODE
============================================================ */


function enablePerformance(){


    document
    .querySelectorAll(
        "img"
    )
    .forEach(
        img=>{


            img.decoding =
            "async";


        }
    );



}



window.addEventListener(
    "load",
    enablePerformance
);
/* ============================================================
   PROJECT AURORA

   script.js

   PART 6 / ?

   Typewriter
   Advanced Animations
   Player Controls
   Mobile / NFC Polish
============================================================ */



/* ============================================================
   TYPEWRITER LETTER
============================================================ */


function setupTypewriter(){


    const letter =
    document.querySelector(
        "#letterText"
    );


    if(!letter)
        return;



    const text =
    birthdayConfig.letter;



    letter.textContent = "";



    let index = 0;



    function write(){


        if(index < text.length){


            letter.textContent +=
            text.charAt(index);



            index++;



            setTimeout(
                write,
                35
            );


        }


    }



    const observer =
    new IntersectionObserver(

        entries=>{


            entries.forEach(
                entry=>{


                    if(
                        entry.isIntersecting
                    ){


                        write();


                        observer.disconnect();


                    }


                }
            );


        },

        {
            threshold:.5
        }

    );



    observer.observe(
        letter
    );



}



window.addEventListener(
    "load",
    setupTypewriter
);





/* ============================================================
   ADVANCED GSAP SCENES
============================================================ */


function setupAdvancedScenes(){


    if(
        typeof gsap === "undefined"
    )
    return;



    if(
        typeof ScrollTrigger === "undefined"
    )
    return;



    gsap.registerPlugin(
        ScrollTrigger
    );




    // Hero zoom


    gsap.to(
        "#heroImage",
        {


            scale:1,


            scrollTrigger:{


                trigger:"#hero",


                start:"top top",


                end:"bottom top",


                scrub:true


            }



        }
    );






    // Story card


    gsap.from(
        ".glass",
        {


            y:100,

            opacity:0,


            duration:1,


            scrollTrigger:{


                trigger:"#story",


                start:"top 70%"


            }



        }
    );






    // Letter


    gsap.from(
        ".envelope",
        {


            scale:.8,


            opacity:0,


            duration:1.2,


            scrollTrigger:{


                trigger:"#letterSection",


                start:"top 70%"


            }



        }
    );



}



window.addEventListener(
    "load",
    ()=>{


        setTimeout(
            setupAdvancedScenes,
            800
        );


    }
);





/* ============================================================
   MUSIC CONTROLS
============================================================ */


function setupPlayerControls(){


    const audio =
    document.querySelector(
        "#music"
    );



    if(!audio)
        return;



    audio.addEventListener(
        "play",
        ()=>{


            const card =
            document.querySelector(
                ".music-card"
            );



            if(card)

                card.classList.add(
                    "playing"
                );


        }
    );



    audio.addEventListener(
        "pause",
        ()=>{


            const card =
            document.querySelector(
                ".music-card"
            );



            if(card)

                card.classList.remove(
                    "playing"
                );


        }
    );



}



window.addEventListener(
    "load",
    setupPlayerControls
);





/* ============================================================
   KEYBOARD SUPPORT
============================================================ */


document.addEventListener(
    "keydown",
    e=>{


        const audio =
        document.querySelector(
            "#music"
        );



        if(
            e.code === "Space"
        ){


            e.preventDefault();



            if(audio){


                toggleMusic();


            }


        }



    }
);





/* ============================================================
   IPHONE / NFC POLISH
============================================================ */


function setupMobileExperience(){


    // Prevent accidental zoom on buttons


    document
    .querySelectorAll(
        "button"
    )
    .forEach(
        button=>{


            button.addEventListener(
                "touchstart",
                ()=>{


                    button.style.transform =
                    "scale(.96)";


                }
            );



            button.addEventListener(
                "touchend",
                ()=>{


                    button.style.transform =
                    "";


                }
            );



        }
    );



}



window.addEventListener(
    "load",
    setupMobileExperience
);





/* ============================================================
   FINAL INIT MESSAGE
============================================================ */


console.log(
`
❤️ Project Aurora Ready

Website:
Birthday Experience

NFC:
Compatible

Status:
Running
`
);
/* ============================================================
   PROJECT AURORA

   script.js

   PART 7 / ?

   Lightbox
   Double Tap Hearts
   Cinematic Mode
   Memory Effects
============================================================ */



/* ============================================================
   IMAGE LIGHTBOX
============================================================ */

function setupLightbox(){


    const images =
    document.querySelectorAll(
        ".gallery-item img"
    );


    if(!images.length)
        return;



    let overlay =
    document.querySelector(
        ".image-lightbox"
    );



    if(!overlay){

        overlay =
        document.createElement(
            "div"
        );


        overlay.className =
        "image-lightbox";


        overlay.innerHTML = `

            <img src="" alt="memory">

            <button class="close-lightbox">
                ×
            </button>

        `;


        document.body.appendChild(
            overlay
        );

    }



    const preview =
    overlay.querySelector(
        "img"
    );


    const close =
    overlay.querySelector(
        ".close-lightbox"
    );



    images.forEach(
        img=>{


            img.onclick = ()=>{


                preview.src =
                img.src;


                overlay.classList.add(
                    "active"
                );


                document.body.style.overflow =
                "hidden";


            };


        }
    );



function closeLightbox(){

    overlay.classList.remove(
        "active"
    );


    document.body.style.overflow =
    "";


}


close.onclick = ()=>{

    closeLightbox();

};



overlay.onclick = (e)=>{


    if(e.target === overlay){

        closeLightbox();

    }


};

}




/* ============================================================
   DOUBLE TAP HEART EFFECT
============================================================ */


function setupDoubleTap(){


    const gallery =
    document.querySelector(
        "#galleryContainer"
    );



    if(!gallery)
        return;



    let lastTap = 0;



    gallery.addEventListener(
        "touchend",
        e=>{


            const now =
            Date.now();



            if(
                now - lastTap <
                350
            ){


                const touch =
                e.changedTouches[0];



                createTapHeart(

                    touch.clientX,

                    touch.clientY

                );


            }



            lastTap = now;



        }
    );



}



function createTapHeart(
    x,
    y
){


    const heart =
    document.createElement(
        "div"
    );



    heart.className =
    "tap-heart";



    heart.innerHTML =
    "❤️";



    heart.style.left =
    x+"px";



    heart.style.top =
    y+"px";



    document.body.appendChild(
        heart
    );



    setTimeout(
        ()=>{


            heart.remove();


        },
        1200
    );



}



window.addEventListener(
    "load",
    setupDoubleTap
);





/* ============================================================
   CINEMATIC NIGHT MODE
============================================================ */


function setupNightMode(){


    const button =
    document.querySelector(
        "#nightMode"
    );



    if(!button)
        return;



    button.addEventListener(
        "click",
        ()=>{


            document.body
            .classList
            .toggle(
                "night-mode"
            );



        }
    );



}



window.addEventListener(
    "load",
    setupNightMode
);





/* ============================================================
   MEMORY COUNTER
============================================================ */


function setupMemoryCounter(){


    const counter =
    document.querySelector(
        "#memoryCount"
    );



    if(!counter)
        return;



    counter.textContent =
    birthdayConfig.gallery.length
    +
    " Beautiful Memories ❤️";



}



window.addEventListener(
    "load",
    setupMemoryCounter
);





/* ============================================================
   REMOVE UNUSED ANIMATIONS
============================================================ */


function cleanup(){


    window.addEventListener(
        "pagehide",
        ()=>{


            const audio =
            document.querySelector(
                "#music"
            );



            if(audio){


                audio.pause();


            }



        }
    );


}



cleanup();/* ============================================================
   PROJECT AURORA

   script.js

   PART 8 / FINAL

   Final Optimization
   iOS Support
   Error Protection
   Experience Startup
============================================================ */



/* ============================================================
   SAFE IMAGE CHECK
============================================================ */


function setupImageProtection(){


    document
    .querySelectorAll(
        "img"
    )
    .forEach(
        img=>{


            img.addEventListener(
                "error",
                ()=>{


                    console.warn(
                        "Missing image:",
                        img.src
                    );


                    img.style.display =
                    "none";


                }
            );


        }
    );


}



window.addEventListener(
    "load",
    setupImageProtection
);





/* ============================================================
   AUDIO ERROR PROTECTION
============================================================ */


function setupAudioProtection(){


    const audio =
    document.querySelector(
        "#music"
    );



    if(!audio)
        return;



    audio.addEventListener(
        "error",
        ()=>{


            console.warn(
                "Music file not found"
            );


        }
    );



}



window.addEventListener(
    "load",
    setupAudioProtection
);





/* ============================================================
   IOS SAFARI FIXES
============================================================ */


function setupIOS(){


    const isIOS =
    /iPad|iPhone|iPod/
    .test(
        navigator.userAgent
    );



    if(
        !isIOS
    )
    return;



    document.body
    .classList
    .add(
        "ios-device"
    );



    // Fix viewport height


    const setHeight =
    ()=>{


        document.documentElement
        .style
        .setProperty(

            "--vh",

            `${window.innerHeight * .01}px`

        );


    };



    setHeight();



    window.addEventListener(
        "resize",
        setHeight
    );



}



setupIOS();





/* ============================================================
   START EXPERIENCE BUTTON
============================================================ */


function setupExperienceStart(){


    const button =
    document.querySelector(
        "#startButton"
    );



    if(!button)
        return;



    button.addEventListener(
        "click",
        ()=>{


            document.body
            .classList
            .add(
                "experience-started"
            );



            startMusic();



        }
    );



}



window.addEventListener(
    "load",
    setupExperienceStart
);





/* ============================================================
   PRELOAD IMPORTANT ASSETS
============================================================ */


function preloadAssets(){


    const assets = [

        birthdayConfig.heroImage,

        ...birthdayConfig.gallery
        .map(
            item=>item.image
        )

    ];



    assets.forEach(
        src=>{


            const img =
            new Image();



            img.src =
            src;


        }
    );


}



window.addEventListener(
    "load",
    preloadAssets
);





/* ============================================================
   FINAL READY CHECK
============================================================ */


function finalCheck(){


    const checks = {


        config:
        typeof birthdayConfig
        !==
        "undefined",


        music:
        !!document.querySelector(
            "#music"
        ),


        hero:
        !!document.querySelector(
            "#heroImage"
        ),


        gallery:
        !!document.querySelector(
            "#galleryContainer"
        )


    };



    console.table(
        checks
    );



}



window.addEventListener(
    "load",
    ()=>{


        setTimeout(
            finalCheck,
            1500
        );


    }
);





console.log(
`
=================================

   PROJECT AURORA ❤️

   Birthday Experience Loaded

   NFC Ready

=================================
`
);
// ============================================
// PREMIUM PHOTO VIEWER
// ============================================

