const docTitle = document.title;
window.addEventListener("blur", () => {
    document.title = "I'm waiting for you"
})
window.addEventListener("focus", () => {
    document.title = docTitle;
})


const script = document.createElement("script");
        script.src = "scrollreveal.min.js";
        script.onload = function () {
            const sr = ScrollReveal({
                origin: 'left',
                distance: '30px',
                duration: 1500,
                delay: 450,
                reset: false, 
            });

            sr.reveal('.navbar', { delay: 400 , origin:'top' });
            sr.reveal('.text-part1', { delay: 410, origin: 'left' });
            sr.reveal('.paragraph', { delay: 440 ,origin: 'left' });
            sr.reveal('.buttons', { delay: 470 ,origin: 'left'});
            sr.reveal('.icons-social', { delay: 500 });
            sr.reveal('.image', { delay: 500 ,origin: 'right'});

            sr.reveal('.image-about', { delay: 520,origin: 'left' });
            sr.reveal('.text-about', { delay: 520, origin:'right' });
            sr.reveal('.about-title', { delay: 530 });
            

            sr.reveal('.container', { delay: 510,origin: 'right' });
            sr.reveal('.container-2', { delay: 520, origin:'left' });
            sr.reveal('.skills-title', { delay: 530 });


            sr.reveal('.services-title', { delay: 530, });
            sr.reveal('.ser-btn', { delay: 510,origin: 'right' });
            sr.reveal('.small-title', { delay: 520, origin:'left' });
            sr.reveal('.project', { delay: 510,origin: 'right' });


            sr.reveal('.Contact-title', { delay: 530, });
            sr.reveal('.contact-section', { delay: 510, origin: 'right' });
            sr.reveal('.contact-img', { delay: 410, origin: 'bottom' });

        };

        document.head.appendChild(script);



const list = document.querySelector(".project");
const list_2 = document.querySelector(".project-2");
        
const left_btn = document.querySelector(".left-side"); 
const right_btn = document.querySelector(".right-side"); 

left_btn.addEventListener("click", () => {
    list.style.display = "flex";
    list_2.style.display = "none";
});
        
        
right_btn.addEventListener("click", () => {
    list.style.display = "none";
    list_2.style.display = "flex";
});


const err = document.querySelector(".error-txt"); 
const nameInput = document.querySelector(".name");
const emailInput = document.querySelector(".email");
const subjectInput = document.querySelector(".subject");

const emailErr = document.querySelector(".email + .error-txt");


document.querySelector("#sumbit").addEventListener("click", function() {
    if (nameInput.value.trim() === "") { 
        err.style.display = "flex";
    } else {
        err.style.display = "none"; 
    }
    if (emailInput.match(/^[^ ]+@[^ ]+\.[a-z]{2,3}/) === "") { 
        emailErr.style.display = "flex"; // Display the error message if email is empty
    } else {
        emailErr.style.display = "none"; // Hide the error message if email is not empty
    }
});