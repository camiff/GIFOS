/*este codigo es para el menu hamburguesa para que se forme la cruz*/
const menuBtn = document.querySelector('.menu-btn');
let menuOpen = false;
menuBtn.addEventListener('click', ()=> {
    if(!menuOpen) {
        menuBtn.classList.add('open');
        menuOpen=true;
        document.getElementById('search-bar').style.zIndex = '0';
    }
    else {
        menuBtn.classList.remove('open');
        menuOpen=false;
        document.getElementById('search-bar').style.zIndex = '1000';
    }
})

/*este codigo es para que el menu se abra y cierre*/
const navBar = document.querySelector('.menu');
menuBtn.addEventListener('click', () => {
  navBar.classList.toggle('toggle');
});

/*sticky la barra de navegacion*/
const searchBarSticky = document.getElementById('search-bar');
const sectionOne = document.querySelector(".hero_img");
const header = document.getElementById('header');
const hero = document.getElementById('hero');

const sectionOneOptions = {
  rootMargin: "-100px 0px 0px 0px"
};

const sectionOneObserver = new IntersectionObserver(function(
  entries,
  sectionOneObserver
) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
        searchBarSticky.classList.add("nav-scrolled");
        
    } else {
        searchBarSticky.classList.remove("nav-scrolled");
    }
  });
},
sectionOneOptions);

sectionOneObserver.observe(sectionOne);