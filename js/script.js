const steps = document.querySelectorAll('.timeline-step');
const images = document.querySelectorAll('.feature-visual img');

steps.forEach((step, index) => {
  const clickableItems = [step.querySelector('.dot'), step.querySelector('.step-title')];

  clickableItems.forEach(item => {
    item.addEventListener('click', () => {
      if (step.classList.contains('active'))
        return;

      steps.forEach(s => s.classList.remove('active'));
      images.forEach(img => img.classList.remove('active-img'));

      step.classList.add('active');
      images[index].classList.add('active-img');
    });
  });
});
  // Amazon Keyword Strategy end 








//   Question section start


document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
        const currentContent = header.nextElementSibling;
        
        header.classList.toggle('active');
        currentContent.classList.toggle('active');

        document.querySelectorAll('.accordion-header').forEach(otherHeader => {
            if (otherHeader !== header) {
                otherHeader.classList.remove('active');
                otherHeader.nextElementSibling.classList.remove('active');
            }
        });
    });
});

//   Question section end











  // wrapper start


const contentBlocks = document.querySelectorAll('.content-block');
const displayImage = document.getElementById('dynamic-image');
const scrollContainer = document.querySelector('.content-column');

const options = {
  root: scrollContainer, 
  threshold: 0.7 
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const newImgSrc = entry.target.getAttribute('data-img');
      
      if (displayImage.src.includes(newImgSrc)) return;

      displayImage.style.opacity = 0;
      
      setTimeout(() => {
        displayImage.src = newImgSrc;
        displayImage.style.opacity = 1;
      }, 300);
    }
  });
}, options);

contentBlocks.forEach(block => observer.observe(block));

  // wrapper end


















 // case study start

document.addEventListener('DOMContentLoaded', () => {
    const caseStudySection = document.querySelector('.case-study');
    const mainContainer = document.querySelector('.case-study-main-container');
    const carouselWrapper = document.querySelector('.carousel-wrapper');
    const cards = document.querySelectorAll('.case-study-container');
    
    if (!caseStudySection || !mainContainer || !carouselWrapper || cards.length === 0) return;

    const getCardWidth = () => {
        return cards[0].offsetWidth + 20; 
    };
    
    const totalCards = cards.length;
    
    function updateCarouselPosition() {
        const cardWidth = getCardWidth();
        const sectionTop = caseStudySection.offsetTop;
        const sectionHeight = caseStudySection.offsetHeight;
        const scrollPosition = window.pageYOffset;
        
        const startScroll = sectionTop;
        const endScroll = sectionTop + sectionHeight - window.innerHeight;
        
        if (scrollPosition >= startScroll && scrollPosition <= endScroll) {
            const scrollProgress = (scrollPosition - startScroll) / (endScroll - startScroll);
            
            const maxTranslate = (totalCards - 1) * cardWidth;
            const translateX = -(scrollProgress * maxTranslate);
            
            mainContainer.style.transform = `translateX(${translateX}px)`;
        } else if (scrollPosition < startScroll) {
            mainContainer.style.transform = 'translateX(0px)';
        } else if (scrollPosition > endScroll) {
            const maxTranslate = (totalCards - 1) * cardWidth;
            mainContainer.style.transform = `translateX(-${maxTranslate}px)`;
        }
    }

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateCarouselPosition();
                ticking = false;
            });
            ticking = true;
        }
    });

    updateCarouselPosition();

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            updateCarouselPosition();
        }, 100);
    });

    const statNumbers = document.querySelectorAll('.growth-percentage h2');
    statNumbers.forEach(stat => {
        stat.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        stat.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

});

// case study  end














     window.addEventListener('beforeunload', function() {
            window.scrollTo(0, 0);
        })

        function isVisibleAtLeast(el, percent = 60) {
            const rect = el.getBoundingClientRect();
            const winH = window.innerHeight;
            const winW = window.innerWidth;

            const visibleHeight = Math.max(0, Math.min(rect.bottom, winH) - Math.max(rect.top, 0));
            const visibleWidth = Math.max(0, Math.min(rect.right, winW) - Math.max(rect.left, 0));

            const visibleArea = visibleWidth * visibleHeight;
            const totalArea = rect.width * rect.height;

            if (totalArea === 0) return false;

            return (visibleArea / totalArea) >= (percent / 100);
        }

        const container = document.querySelector('.transparent-div');
        const listingSection = document.querySelector('.listing-optimization');

        const panels = [
            document.querySelector('.campaign-optimization-container'),
            document.querySelector('.increase-sales-container'),
            document.querySelector('.keyword-research-container'),
            document.querySelector('.reduce-acos-container'),
            document.querySelector('.weekly-reporting-container')
        ];

        const screenWidth = window.innerWidth;

        let currentY = [0, 0, 0, 0, 0];
        let targets;

        if (screenWidth < 768) {
            targets = [-600, -1130, -1680, -2200, -2750];
        } else if (screenWidth >= 768 && screenWidth <= 1024) {
            targets = [-373, -700, -1010, -1350, -1680];
        } else if (screenWidth > 1024 && screenWidth <= 1440) {
            targets = [-630, -1190, -1740, -2300, -2860];
        } else {
            targets = [-932, -1760, -2592, -3418, -4250];
        }

        let activeIndex = -1;
        let isHijacking = false;
        let lastScrollY = window.scrollY;
        let sectionStartScroll = 0;
        let isInSection = false;

        function lockScroll() {
            document.body.style.overflow = 'hidden';
        }

        function unlockScroll() {
            document.body.style.overflow = 'scroll';
        }

        function handleScroll(delta) {
            const speed = 3.0;

            if (activeIndex === -1 && delta > 0) {
                activeIndex = 0;
            }

            if (activeIndex >= 0 && activeIndex < panels.length) {
                if (delta > 0) currentY[activeIndex] -= Math.abs(delta) * speed;
                else currentY[activeIndex] += Math.abs(delta) * speed;

                currentY[activeIndex] = Math.max(targets[activeIndex], Math.min(1200, currentY[activeIndex]));

                const scale = currentY[activeIndex] <= targets[activeIndex] + 20 ? 1.0 : 1.05;
                const opacity = currentY[activeIndex] <= targets[activeIndex] + 200 ? 1.0 : 0;

                panels[activeIndex].style.transform = `translateY(${currentY[activeIndex]}px) translateZ(100px) scale(${scale})`;

                if (currentY[activeIndex] <= targets[activeIndex] + 20 &&
                    delta > 0 &&
                    activeIndex < panels.length - 1) {
                    activeIndex++;
                }

                if (delta < 0 && currentY[activeIndex] > 400) {
                    if (activeIndex > 0) activeIndex--;
                }
            }

            if (activeIndex === panels.length - 1 &&
                currentY[activeIndex] <= targets[activeIndex] + 20 &&
                delta > 0) {
                isHijacking = false;
                unlockScroll();
                return false; 
            }

            if (delta < 0) {
                const firstPanelY = currentY[0];
                if (firstPanelY >= 580) {
                    isHijacking = false;
                    activeIndex = -1;
                    unlockScroll();
                    return false; 
                }
            }

            return false; 
        }


        document.addEventListener("wheel", function(e) {
            const rect = container.getBoundingClientRect();
            const inView = isVisibleAtLeast(listingSection, 80);
            if (inView && !isHijacking && e.deltaY > 0 && activeIndex !== panels.length - 1) {
                isHijacking = true;
                lockScroll();
                sectionStartScroll = window.scrollY;
                e.preventDefault();
            }

            if (inView && !isHijacking && e.deltaY < 0 && activeIndex !== 0 && activeIndex !== -1) {
                const lastY = currentY[currentY.length - 1];
                const fullyVisibleFromBottom = rect.bottom <= window.innerHeight + 600 && rect.top >= 0;
                if (lastY < 600 && fullyVisibleFromBottom) {
                    isHijacking = true;
                    lockScroll();
                    e.preventDefault();
                }
            }

            if (isHijacking) {
                e.preventDefault();
                e.stopPropagation();

                handleScroll(e.deltaY);


            }
        }, {
            passive: false,
            capture: true
        });

        let touchStartY = 0;
        let touchLastY = 0;

        document.addEventListener("touchstart", (e) => {
            touchStartY = e.touches[0].clientY;
            touchLastY = touchStartY;
        }, {
            passive: false,
            capture: true
        });

        document.addEventListener("touchmove", (e) => {
            const rect = container.getBoundingClientRect();
            const inView = rect.top <= window.innerHeight && rect.bottom >= 0;

            if (touchStartY === 0) return;

            const y = e.touches[0].clientY;
            const delta = touchLastY - y;
            touchLastY = y;

            if (inView && !isHijacking && delta > 0) {
                isHijacking = true;
                lockScroll();
                sectionStartScroll = window.scrollY;
            }

            if (inView && !isHijacking && delta < 0) {
                const lastY = currentY[currentY.length - 1];
                const fullyVisibleFromBottom = rect.bottom <= window.innerHeight && rect.top >= 0;
                if (lastY < 600 && fullyVisibleFromBottom) {
                    isHijacking = true;
                    lockScroll();
                }
            }

            if (isHijacking) {
                e.preventDefault();
                e.stopPropagation();

                const shouldRelease = handleScroll(delta);

                if (shouldRelease && delta > 0) {
                    window.scrollTo(0, sectionStartScroll + listingSection.offsetHeight);
                }
            }
        }, {
            passive: false,
            capture: true
        });

        document.addEventListener("touchend", () => {
            touchStartY = 0;
            touchLastY = 0;
        }, {
            capture: true
        });
