const initCarousel = () => {
  const arrowLeft = document.querySelector('.carousel__arrow_left');
  const arrowRight = document.querySelector('.carousel__arrow_right');
  const transBlock = document.querySelector('.carousel__inner');
  const slides = Array.from(document.querySelectorAll('.carousel__slide'));
  const slideBlockWidth = transBlock.offsetWidth;
  let offset = 0;

  //убираем левую стрелку у первого слайда
  if(offset === 0) {
    arrowLeft.style.display = 'none'
  }

  //правая стрелка
  arrowRight.addEventListener("click", () => {
    arrowLeft.style.display = '';
    offset++;

    if(offset < slides.length) {
      transBlock.style.transform =  `translateX(-${offset * slideBlockWidth}px)`;
    }

    //убираем правую стрелку у последнего слайда
    if(offset === slides.length - 1) {
      arrowRight.style.display = 'none';
    }
  });

  //левая стрелка
  arrowLeft.addEventListener("click", () => {
    offset--;
    arrowRight.style.display = '';

    if(offset >= 0){
      transBlock.style.transform =  `translateX(-${offset * slideBlockWidth}px)`;
    }

    //убираем левую стрелку у первого слайда
    if(offset === 0) {
      arrowLeft.style.display = 'none';
    }
  });
}

