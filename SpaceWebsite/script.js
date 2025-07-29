const items = document.querySelectorAll('.carousel-item');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const dotsContainer = document.querySelector('.carousel-dots');

let current = 0;
let interval;

items.forEach((_, idx) => {
    const dot = document.createElement('span');
    dot.classList.add('carousel-dot');
    if(idx === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(idx));
    dotsContainer.appendChild(dot);
})

const dots = document.querySelectorAll('.carousel-dot');


function showSlide(idx){
    items.forEach((item, i) => {
        item.classList.toggle('active', i === idx);
        dots[i].classList.toggle('active', i === idx);
    })
    current = idx;
}

function nextSlide() {
    showSlide((current + 1) % items.length);
  }
  function prevSlide() {
    showSlide((current - 1 + items.length) % items.length);
  }
  function goToSlide(idx) {
    showSlide(idx);
    resetInterval();
  }
  
  nextBtn.addEventListener('click', () => { nextSlide(); resetInterval(); });
  prevBtn.addEventListener('click', () => { prevSlide(); resetInterval(); });
  
  function resetInterval() {
    clearInterval(interval);
    interval = setInterval(nextSlide, 8000);
  }
  interval = setInterval(nextSlide, 8000);