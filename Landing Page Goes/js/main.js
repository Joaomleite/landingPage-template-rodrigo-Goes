
window.addEventListener('load',function(){



    slide();

    document.querySelector('#btnf').addEventListener('click',function(){
        
            if (ValidaCadastro()){
            alert('Mensagem Enviada!')
            document.querySelector('#formEmail').submit();

        };


    });

    document.querySelector('#mostrarMais').addEventListener('click',function(){

        MostrarMais();

    });

    document.querySelector('#mostrarMenos').addEventListener('click',function(){

        MostrarMenos();

    });

    document.querySelectorAll('.accordion__button').forEach(button =>{
        button.addEventListener('click', () =>{
            const accordionContent = button.nextElementSibling;

            button.classList.toggle('accordion__button--active');

            if (button.classList.contains('accordion__button--active')){
                accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
            } else {

                accordionContent.style.maxHeight = 0; 
            }

        });

    });

    document.addEventListener('scroll',function(){

        const rolagem= window.scrollY;
        const nav = document.querySelector('header');

        if (rolagem >= 100){

            nav.style = 'background-color: #15263e !important;';
        } else{

            nav.style = 'background-color: transparent !important;';
        }

    });

    document.querySelector('#btn-mobile').addEventListener('click',function(){
        
        const btn = document.querySelector('#btn-mobile');

        btn.classList.toggle('btn--active');
        const bar = document.querySelector('.nav-mobile ul');
        
        if(btn.classList.contains('btn--active')){
            btn.className ='fas fa-times btn--active'
            bar.style.maxHeight = bar.scrollHeight + 'px';
        } else {
            btn.className ='fas fa-bars'
            bar.style.maxHeight = 0;
        }
    });

    const menuItens = document.querySelectorAll('header a');

    menuItens.forEach(item =>{

        item.addEventListener('click', ScrollToId);

    });


 });

function ScrollToId(event){

    event.preventDefault();
    const element = event.target;
    const id = element.getAttribute('href');
    const to = document.querySelector(id).offsetTop - 20;
    smoothScrollTo(0,to, 1000);
}

/**
 * Smooth scroll animation
 * @param {int} endX: destination x coordinate
 * @param {int} endY: destination y coordinate
 * @param {int} duration: animation duration in ms
 */
function smoothScrollTo(endX, endY, duration) {
  const startX = window.scrollX || window.pageXOffset;
  const startY = window.scrollY || window.pageYOffset;
  const distanceX = endX - startX;
  const distanceY = endY - startY;
  const startTime = new Date().getTime();

  duration = typeof duration !== 'undefined' ? duration : 400;

  // Easing function
  const easeInOutQuart = (time, from, distance, duration) => {
    if ((time /= duration / 2) < 1) return distance / 2 * time * time * time * time + from;
    return -distance / 2 * ((time -= 2) * time * time * time - 2) + from;
  };

  const timer = setInterval(() => {
    const time = new Date().getTime() - startTime;
    const newX = easeInOutQuart(time, startX, distanceX, duration);
    const newY = easeInOutQuart(time, startY, distanceY, duration);
    if (time >= duration) {
      clearInterval(timer);
    }
    window.scroll(newX, newY);
  }, 1000 / 60); // 60 fps
};
  


function VerificaCampo(){

    email = document.querySelector('#e-mail').value;
    nome = document.querySelector('#nome').value;
    msg = document.querySelector('#msg').value;

    email2 = document.querySelector('#e-mail');
    msg2 = document.querySelector('#msg');
    nome2 = document.querySelector('#nome');

    var verificador = true;

    if ( email ==''){

        email2.style = 'border: 1px solid red';
        verificador = false;
    } 
    
    if(msg ==''){
        msg2.className = 'border-red';
        verificador = false;
    } else {
        msg2.className = 'border-gray';
        
    }
    
    if(nome ==''){

        nome2.className ='border-red';
        verificador = false;
    } else{
        nome2.className ='border-gray';
    }

    if (verificador == false){
        return false;
    } else {
        msg2.className = 'border-gray';
        nome2.className ='border-gray';
        email2.style = 'border: 1px solid #b6b6b6';
        return true;
    }
    

}




function MostrarMais(){

    var Outrosvideos = document.querySelector('#maisvideos');
    var MostrarMenos = document.querySelector('#mostrarMenos');
    var MostrarMais = document.querySelector('#mostrarMais');
    var MarginBottom = document.querySelector('#marginbaixo');

    Outrosvideos.style = 'display: block;';
    MostrarMenos.style = 'display: block;';
    MostrarMais.style = 'display: none;';
    MarginBottom.className = 'videoBox'
}

function MostrarMenos(){

    var Outrosvideos = document.querySelector('#maisvideos');
    var MostrarMenos = document.querySelector('#mostrarMenos');
    var MostrarMais = document.querySelector('#mostrarMais');
    var MarginBottom = document.querySelector('#marginbaixo');

    Outrosvideos.style = 'display: none;';
    MostrarMenos.style = 'display: none;';
    MostrarMais.style = 'display: block;';
    MarginBottom.className = 'videoBox marg-bottm'
}


function slide(){

const slideShowImages = document.querySelectorAll(".intro .slideshow-img");

const nextImageDelay= 5000;

let currentImageCounter= 0;

slideShowImages[currentImageCounter].style.opacity = 1;

setInterval(nextImage, nextImageDelay);

function nextImage() {

    //slideShowImages[currentImageCounter].style.opacity = 0;
    slideShowImages[currentImageCounter].style.zIndex = -2;
    const tempCounter= currentImageCounter;
    setTimeout(() =>{
        
        slideShowImages[tempCounter].style.opacity= 0 ;
    }, 1000);

    currentImageCounter = (currentImageCounter + 1) % slideShowImages.length;
    slideShowImages[currentImageCounter].style.opacity = 1;
    slideShowImages[currentImageCounter].style.zIndex = -1;

}}

function ValidaCadastro(){

    var email = document.querySelector('#e-mail').value;
    var msgErro = document.querySelector('#msg-error');
    msgErro.innerHTML = '';

    if (!VerificaCampo()){
        msgErro.innerHTML += '*Preencha todos os campos.<br>'
        return false;
    } else if ( !ValidaEmail(email)){
        msgErro.innerHTML += '*Seu E-mail é inválido.'
        return false;
    } else {

        return true;
    } 

  
}



function ValidaEmail(email){

    var procuraArroba = email.indexOf('@');
    var procuraPonto = email.indexOf('.')
    var email2 = document.querySelector('#e-mail');

    if (procuraArroba < 1){
        email2.style = 'border: 1px solid red';
        return false;

    } else if ( procuraArroba == email.length - 1){
        email2.style = 'border: 1px solid red';
        return false;
    } else if ( procuraPonto < 1){
        email2.style = 'border: 1px solid red';
        return false;
    } else if ( procuraPonto == email.length - 1){
        email2.style = 'border: 1px solid red';
        return false;
    } else {
        email2.style = 'border: 1px solid #b6b6b6';
        return true;
    }

}


/*function MostrarHistoria(id){
    var campo = document.querySelector('#' + id);
    var campo1 = document.querySelector('#inicio');
    var campo2 = document.querySelector('#meio');
    var campo3 = document.querySelector('#fim');
   
    var imgup = document.querySelector('#' + id + id);

    imgup.style ='display: block;';
    campo.style = 'display: none;';

    if (id == 'a' ){
        campo1.style ='padding-bottom: 1150px !important;';
    } 
    
    if (id == 'b'){
        campo2.style ='padding-bottom: 1050px !important;';
    }  
    
    if (id =='c'){
        campo3.style ='padding-bottom: 880px !important;';
    }
    
};*/ 


/*function MostrarMenosHistoria(id){

    var imgup = document.querySelector('#' + id);
    var campo1 = document.querySelector('#inicio');
    var campo2 = document.querySelector('#meio');
    var campo3 = document.querySelector('#fim');
    var aux = id.substring(0,1);
    var imgdown = document.querySelector('#' + aux);
    
   

    imgup.style = 'display: none;';
    imgdown.style = 'diplay: block !important;';

    if (id == 'aa' ){
        campo1.style ='height:350px !important;';
    } 
    
    if (id == 'bb'){
        campo2.style ='height:350px !important;';
    }  
    
    if (id =='cc'){
        campo3.style ='height:350px !important;';
    }

}; */