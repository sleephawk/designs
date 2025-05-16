/*
-- check big screen
-- wrap logo design page image and link within 1 link for the two main images
-- website works but javascript nav does not

*/

const backButton = document.querySelectorAll('.back');
const nextButton = document.querySelectorAll('.next');
const prevButton = document.querySelectorAll('.prev');
const backButtonAlt = document.querySelector('.back-alt');
const conceptImage = document.querySelectorAll('.concept-img');
const curtainArt = document.querySelectorAll('.curtain-art-img');
let navArray = [];
const transitionImage = document.querySelectorAll('.transition-img');
let sourceImgArr = ['/designs/images/album_covers/glass.png', '/designs/images/album_covers/jack.png','/designs/images/album_covers/discon.png', '/designs/images/album_covers/ego.png', '/designs/images/album_covers/george.png', '/designs/images/album_covers/L.png', '/designs/images/branding/crow.png', '/designs/images/star_square.png', '/designs/images/branding/aymee.png', '/designs/images/logos/orb.png','/designs/images/Merch/sticker_design.jpg', '/designs/images/album_covers/contours.png' ];
const curtainBody = document.querySelector('.curtain-body');
const zoomable = document.querySelectorAll('.zoomable');
let pageArr = ['1glass.html', '2malibu.html', '4your_L.html', '5discon.html', '6ego.html', '7castle.html', '8contours.html', '9george.html', '10spectre.html'];
const navContainer = document.querySelectorAll('.nav-container');
const footerTag = document.querySelectorAll('footer');

const eventArray = ['click', 'pointerdown']

document.querySelectorAll('head').forEach(head => {
  let linkTag = document.createElement('link');
  linkTag.rel = "stylesheet";
  linkTag.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css";
  head.appendChild(linkTag);
})



document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('img').forEach(img => {
    img.draggable = false;
    img.setAttribute('loading', 'lazy');
    img.addEventListener('contextmenu', (e)=>{
      e.preventDefault();
    })
  })
});

//shuffles the array of images for the about page.
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); //generates a random number then times it by index to make a position 1 greater than the index
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  setInterval(() => {
    const shuffledImages = shuffle([...sourceImgArr]); // Shuffle copy of source array
  
    transitionImage.forEach((img, index) => {
      img.src = shuffledImages[index]; // Assign one unique image per element
    });
  }, 2000);

const animationImage = document.querySelector('.animation-image') //this is for the logo on the contact page

if(animationImage) {
setTimeout(()=>{
    animationImage.style.backgroundImage = 'url(images/logos/animation/w2_animation.png)';}
  , 200);
setTimeout(()=>{
    animationImage.style.backgroundImage = 'url(images/logos/animation/w3_animation.png)';}
  , 400); }



  backButton.forEach(button => {
    eventArray.forEach(event => {
      button.addEventListener(event, () => {
        history.back();
      });
    });
  });
  

if (backButtonAlt) {
backButtonAlt.addEventListener('click', () => {
    history.back();
})};


conceptImage.forEach(img => {
  eventArray.forEach(event => {
    img.addEventListener(event, () =>{
        let feature = document.querySelector('.concepts-feature');
        let featureImage = feature.querySelector('img');
        featureImage.src = img.src;
    })
  })
  img.addEventListener('keydown', (e) => {
      if(e.key === 'Enter') {
        let feature = document.querySelector('.concepts-feature');
        let featureImage = feature.querySelector('img');
        featureImage.src = img.src;
      }
    })
  });

curtainArt.forEach(img => {
  eventArray.forEach(event => {
    img.addEventListener(event, () =>{
      let originalImage = document.querySelector('.curtain-art-og');
      let tempSrc = img.src;
      img.src = originalImage.src;
      originalImage.src = tempSrc;
    })
  })
}); // logic for the art - getting the original art and the source of the clicked and switching them


//creates a dew element for each zoomable element that makes it appear over everything
zoomable.forEach(img =>{
  img.tabIndex = 0;
  function createCloneOverlay(){
    let overlay = document.createElement('div');
      overlay.id = 'image-overlay';
      overlay.setAttribute('role', 'dialog')
      overlay.setAttribute('aria-modal', 'true');
      overlay.style.display = 'flex';
      overlay.style.position = 'fixed';
      overlay.style.justifyContent = 'center';
      overlay.style.alignItems  ='center';
      overlay.style.left = '0';
      overlay.style.top = '0';
      overlay.style.width = '100%';
      overlay.style.height = '100%';
      overlay.style.zIndex = '1200';
      overlay.style.overflow = 'scroll';
      const imageClone = img.cloneNode(); //clones the node itself, the image with the class 'zoomable'
      imageClone.alt = img.alt;
      imageClone.className = img.className;
      imageClone.setAttribute('loading', 'lazy');
      imageClone.role = 'dialog';
      imageClone.ariaModal = 'true';
      if (window.matchMedia("(max-width: 650px)").matches) {  
        imageClone.style.maxHeight= '80vh';
        imageClone.style.maxWidth= '80vh';
      } else {
        imageClone.style.maxHeight= '100vh';
        imageClone.style.maxWidth= '100vh';
        imageClone.style.width = 'auto';};
      imageClone.style.cursor = 'zoom-out';
      if (imageClone.classList.contains('alt-background')) {   
        overlay.style.backgroundColor = 'rgba(0,0,0,0.8)';
      } else if (imageClone.classList.contains('full-black-background')) {
        overlay.style.backgroundColor = "black";
      } else if (imageClone.classList.contains('green-background')) {
        overlay.style.backgroundColor = "#425d62";
      } else if (imageClone.classList.contains('full-white-background')) {
        overlay.style.backgroundColor = "white";
      } else {
        overlay.style.backgroundColor = 'rgba(255,255,255,0.95)';
      }
      imageClone.addEventListener('contextmenu', (e) =>{
        e.preventDefault();
      })
      overlay.appendChild(imageClone);
      overlay.addEventListener('click', () => {
        document.body.removeChild(overlay);
      })
      document.body.appendChild(overlay);
      function handleKeydown(e) { // function to allow us to press escpae to exit
        if (e.key === "Escape") { 
          document.body.removeChild(overlay);
          document.removeEventListener("keydown", handleKeydown); // cleanup
        }
      }
      
      document.addEventListener("keydown", handleKeydown);
    
    };
  
function handleEnterZoomable(e) {
  if (e.key === 'Enter' && !document.getElementById('image-overlay')) {
    createCloneOverlay();
  }
}
  img.addEventListener('keydown', handleEnterZoomable);
  eventArray.forEach(event => {
    img.addEventListener(event, () =>{
      createCloneOverlay();
      })
    })
  }); //end of the zoomable logic



function nextPage() {
  let currentPage = window.location.pathname.split('/').pop();
  let currentIndex = pageArr.indexOf(currentPage);
  if(currentIndex !== -1) {
    window.location.href = pageArr[(currentIndex + 1) % pageArr.length];

  }
}; //next button for specifically the album covers page

function prevPage() {
  let currentPage = window.location.pathname.split('/').pop();
  let currentIndex = pageArr.indexOf(currentPage);
  if(currentIndex !== -1) {
    window.location.href = pageArr[(currentIndex - 1 + pageArr.length) % pageArr.length];
  } else {
    window.location.href = pageArr[pageArr.length - 1];
  }
}; //prev button for specifically the album covers page

nextButton.forEach(button => {
  eventArray.forEach(event => {
      button.addEventListener(event, () =>{
        nextPage();
    })
  })
});
prevButton.forEach(button => {
  eventArray.forEach(event => {
      button.addEventListener(event, () =>{
        prevPage();
    })
  })
});


  
/*---------------------------------------------------------------------------*/
/*INJECT FOOTER*/
/*---------------------------------------------------------------------------*/

footerTag.forEach(foot => {
  const container = document.createElement('div');
  container.classList.add('footer-container');

  const logoLink = document.createElement('a');
  logoLink.href = "/designs/index.html";

  const logoImg = document.createElement('img');
  logoImg.loading = "lazy";
  logoImg.src="/designs/images/logos/sh logo.png";
  logoImg.alt = "logo for Sleephawk Designs - an abstract logo featuring a crow silhouette inside an egg shape, with waves extending from the top, symbolizing a dreamlike and visionary concept. This is a small icon version of it for the footer.";

  logoLink.appendChild(logoImg);
  container.appendChild(logoLink);

  const ul = document.createElement('ul');
  const links = [
    { text: 'Home', href: '/designs/index.html', aria: 'Go to home page' },
    { text: 'Contact', href: '/designs/contact.html', aria: 'Go to contact page' },
    { text: 'About', href: '/designs/about.html', aria: 'Go to about page' },
    { text: 'Instagram', href: 'https://www.instagram.com/designs_sleephawk/', aria: 'Go to sleephawk designs instagram', external: true }
  ];

  links.forEach(linkData => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    a.textContent = linkData.text;
    a.href = linkData.href;
    a.setAttribute('aria-label', linkData.aria);
    if (linkData.external) {
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    }
    li.appendChild(a);
    ul.appendChild(li);
  });

  container.appendChild(ul);
  foot.appendChild(container);
});



    /*----------------------------------------------------------------------------------*/
    // NAV OBJECT CODE
    // to add, simply put a name and link, and then a set of
    // dropdown objects if needed with the same format
    /*----------------------------------------------------------------------------------*/ 

    navArray = [
      {
        menu: true,
        link: '/designs/images/SVG/bars_white.svg'
      },
      {name: 'Home',
      link: '/designs/index.html',
      aria: 'Go to home page'},
      {name: 'About',
      link: '/designs/about.html',
      aria: 'Go to about page'},
      {name: 'Album Covers',
        link: '/designs/album_covers/0album_covers.html',
        aria: 'Go to album covers page',
        dropDownLinks: [
        {name: 'Sleephawk: Collage',
        link: '/designs/album_covers/1glass.html',
        aria: 'Go to the first collage page: Sleephawk-Glass'
        },
        {name: 'Sleephawk: 3D',
        link: '/designs/album_covers/5discon.html',
        aria: 'Go to the first 3D page: Sleephawk-Disconnected'
        },
        {name: 'Sleephawk: Pen & Paint',
        link: '/designs/album_covers/9george.html',
        aria: 'Go to the pen and paint page: Sleephawk-George Harrison'
        },
        {name: 'King Compass',
        link: '/designs/album_covers/8contours.html',
        aria: 'Go to the King Compass cover design page'
        },
        {name: 'Jack Rosies',
        link: '/designs/album_covers/7castle.html',
        aria: 'Go to the Jack Rosies cover design page'
        },
        {name: 'Snoozecrow',
        link: '/designs/album_covers/10spectre.html',
        aria: 'Go to the Snoozecrow cover design page'
        },
        ]
      },
      {name: 'Merch Design',
        link: '/designs/merch_design/merch_design.html',
        aria: 'Go to the merch design page',
        dropDownLinks: [
        {name: 'Aymee Weir',
        link: '/designs/merch_design/merch_design.html',
        aria: 'Go to the merch design page'
        },
        {name: 'Curtain Up!',
        link: '/designs/branding/curtain_up.html#t-shirts',
        aria: 'Go to the merch section of the Curtain Up! page'
        }
        ]
      },
      {name: 'Logo Design',
        link: '/designs/logo_design/logo_design.html',
        aria: 'Go to the logo design page',
        dropDownLinks: [
        {name: 'Barber & Harris Lutes',
        link: '/designs/logo_design/b&h.html',
        aria: 'Go to the Barber & Harris Lutes logo page '
        },
        {name: 'Sleephawk Designs',
        link: '/designs/logo_design/sh_logo.html',
        aria: 'Go to the Sleephawk Designs logo page'
        },
        {name: 'Concepts',
        link: '/designs/logo_design/concepts.html',
        aria: 'Go to the concept logo design page'
        }
        ]
      },
      {name: 'Digital Art & Branding',
        link: '/designs/branding/branding.html',
        aria: 'Got to the digital art and branding page',
        dropDownLinks: [

        {name: 'Curtain Up!',
        link: '/designs/branding/curtain_up.html',
        aria: 'Go to the Curtain Up! Drama and Magic design page'
        },
        {name: 'Barber & Harris Lutes',
          link: '/designs/logo_design/b&h.html',
          aria: 'Go to the Barber & Harris Lutes logo page'
          },
        {name: 'Aymee Weir',
          link: '/designs/merch_design/merch_design.html',
          aria: 'Go to the merch design page'
          },
        {name: 'Snoozecrow',
          link: '/designs/branding/snoozecrow.html',
          aria: 'Go to the snoozecrow cartoon vector art page'
          },
        {name: 'Nouveau Star',
          link: '/designs/branding/star.html',
          aria: 'Go to the digital art nouveau star page'
          },
        {name: 'Sleephawk Designs',
          link: '/designs/logo_design/sh_logo.html',
          aria: 'Go to the Sleephawk Designs logo page'
          },
        
        ]
      },
      {name: 'Contact',
      link: '/designs/contact.html',
      aria: 'Go to the contact page'
      }
    ];
  


/* for help with CSS, the structure is:
#navbar            (nav)
      nav-ul           (ul)
        nav-link          (li) 
            a               (a) // this is for if there is no dropdown
        nav-link          (li)
          drop-down-ul      (ul) // this is where of course there is a dropdown menu
              link-list-tag     (li)
                 link-a-tag        (a)
*/

  
/*-------------------------------------------------------------*/
// NAVBAR LOGIC
/*-------------------------------------------------------------*/

navContainer.forEach(nav =>{ /* this is each bar on each page*/ 
  const navUl = document.createElement('ul');
  navUl.classList.add('nav-ul');
  nav.appendChild(navUl);
      navArray.forEach((nav) => { /*the nav in this case is each object in the array*/
        if (nav.menu) {

/*-------------adding the menu bars*/
          let menuButton = document.createElement('img');
          menuButton.src = nav.link;
          menuButton.tabIndex = 0;
          menuButton.classList.add('menu-button');
          function toggleRotate() {
            if (!menuButton.classList.contains('rotate')) {
              menuButton.classList.add('rotate');
              navUl.classList.add('toggled-nav-ul');
              menuButton.style.top = '10px'; 
              } else {
              menuButton.classList.remove('rotate');
              navUl.classList.remove('toggled-nav-ul');
              menuButton.style.top = '0';
            }
          };
          function toggleNavLink() {
            document.querySelectorAll('.nav-link').forEach(nav =>{
              if(!nav.classList.contains('toggled-nav-link')) {
                nav.classList.add('toggled-nav-link');
              
              } else {
                nav.classList.remove('toggled-nav-link');
              };
              document.addEventListener('click', (e) => {
                const isClickInside = navUl.contains(e.target);
                if (!isClickInside) {
                  nav.classList.remove('toggled-nav-link');
                  menuButton.classList.remove('rotate');
                  navUl.classList.remove('toggled-nav-ul');
                  menuButton.style.top = '0';
                }
              })
            })
          };
          function handleEnterNav(e) {
            if(e.key === 'Enter') {
              toggleRotate();
              toggleNavLink();

            }
          };
          function handleEscapeNav(e) {
            if(e.key === 'Escape' && menuButton.classList.contains('rotate')) {
              toggleRotate();
              toggleNavLink();
            }
          };
          
          menuButton.addEventListener('keydown', handleEnterNav);
          menuButton.addEventListener('keydown', handleEscapeNav);
          menuButton.addEventListener('pointerdown', () =>{
            toggleRotate();
            toggleNavLink();
              });
              
          navUl.appendChild(menuButton);
/*------------------------*/
        } else {
        let navTitle = document.createElement('li');
        navTitle.classList.add('nav-link');
        let navTitleLink = document.createElement('a');
        navTitleLink.textContent = nav.name;
        navTitleLink.setAttribute('aria-label', nav.aria);
        navTitleLink.href = (nav.link);
        navUl.appendChild(navTitle);
        navTitle.appendChild(navTitleLink);
        if (nav.dropDownLinks) {
          let navDropdownUl = document.createElement('ul');
          navDropdownUl.classList.add('drop-down-ul')
          navTitle.appendChild(navDropdownUl);
          nav.dropDownLinks.forEach(ddlink => {
            let linkListTag = document.createElement('li');
            linkListTag.classList.add('link-list-tag')
            let linkATag = document.createElement('a');
            linkATag.classList.add('link-a-tag');
            linkATag.textContent = ddlink.name;
            linkATag.href = ddlink.link;
            linkATag.setAttribute('aria-label', ddlink.aria);
            linkListTag.appendChild(linkATag);
            navDropdownUl.appendChild(linkListTag);
          });
        } //ddlink callback end


        
      } // nav.menu conditional end
  })
});





