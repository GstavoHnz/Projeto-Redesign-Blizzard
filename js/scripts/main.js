

const slide_thumbnail = new Swiper(".slide-thumbnail", {
  slidesPerView: 5,
  direction: 'vertical',
  spaceBetween: 20,
  watchSlidesProgress: true, //Propriedade que fica escutando o slide.
  breakpoints:{ //Responsivo
    320: {
      direction: 'horizontal',
    },
    1150: {
      direction: 'vertical',
    }
  }
});

const progressSlide = document.querySelector('.js-progress');

var slide_hero = new Swiper(".slide-principal", {
  effect: 'fade',
  thumbs: {
    swiper: slide_thumbnail,
  },
  autoplay: { //Propriedade para o slide passar sozinho.
    delay: 5000,
    disableOnInteraction: false //Propriedade para não interromper o "AutoPlay" do slide.
  },
  on:{
    init: function(){
      progressSlide.classList.remove('animate');
      progressSlide.classList.remove('active');
      progressSlide.classList.add('animate');
      progressSlide.classList.add('active');
    },
    slideChangeTransitionStart: function(){
      progressSlide.classList.remove('animate');
      progressSlide.classList.remove('active');
      progressSlide.classList.add('active');
    },
    slideChangeTransitionEnd: function(){
      progressSlide.classList.add('animate');
    }
  }
});

//Selecionando os itens da Lista
const allfilters = document.querySelectorAll('.js-nav-games li a');
const tabPane = document.querySelectorAll('.tab-pane-games');

//Evento de Click
allfilters.forEach((filter, index) => {
  filter.addEventListener('click', (event) => {
    event.preventDefault();
    
    //Removendo o active
    allfilters.forEach(item => {
      item.classList.remove('active');
    })

    //Removendo o active das tabs
    tabPane.forEach(tab => {
      tab.classList.remove('active');
    })

    tabPane[index].classList.add('active');

    //Adicionando a classe:Active no click
    filter.classList.add('active');


  })
})

//Abrindo o Modal
const btnOpenModal = document.querySelector('.js-open-modal');
//Fechando Modal
const btnCloseModal = document.querySelector('.js-close');

btnOpenModal.addEventListener('click', (event) => {
  event.preventDefault();
  let html = document.documentElement;
  html.classList.add('show-modal');
})


btnCloseModal.addEventListener('click', () => {
  let html = document.documentElement;
  html.classList.remove('show-modal');
})

//Funcão de menu dropdown

const btnMenu = document.querySelectorAll('.js-btn-menu');
const menuSite = document.querySelectorAll('.js-menu');

btnMenu.forEach((btn, index) => {
  btn.addEventListener('click', (event) => {
    event.preventDefault();
    
    menuSite.forEach(itemMenu => {
      itemMenu.classList.remove('active');
      itemMenu.addEventListener('mouseleave', () => {
        itemMenu.classList.remove('active'); 
        btnMenu.forEach(itemBtn => {
          itemBtn.classList.remove('active');
        }) 
      })
    })  

    btnMenu.forEach(itemBtn => {
      itemBtn.classList.remove('active');
    })

    btn.classList.add('active');
    menuSite[index].classList.add('active');
  })
})