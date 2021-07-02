'use strict'
const tabs = document.querySelectorAll('.tabheader__item') , 
    tabsContent = document.querySelectorAll('.tabcontent') ,
    tabheaderItems = document.querySelector('.tabheader__items');

tabs.forEach(function(item){
    item.classList.remove('tabheader__item_active');
})
function hideTabContent(){
    tabsContent.forEach(item => {
        item.style.display = "none";
    });
}
function showTabContent(i = 0){
    tabsContent[i].style.display = "block";
    tabs[i].classList.add('tabheader__item_active');
}
hideTabContent();
showTabContent();
tabheaderItems.addEventListener('click' , (event) => {
    const target = event.target;
    if(target && target.classList.contains('tabheader__item')){
        tabs.forEach(function(item,i){
            if(target == item){             
                hideTabContent();
                showTabContent(i);
            }else{
                item.classList.remove('tabheader__item_active');
            }
        })
    }
})

//modal
const buttons = document.querySelectorAll('[data-modal="modal"]'),
      modalElem = document.querySelector('.modal'),
      footer = document.querySelector('.footer');
      
function openModal(){
    modalElem.classList.toggle('open');
    document.body.style.overflow = 'hidden';
    clearInterval(interval);
}

function closeElem(){
    modalElem.classList.remove('open');
    document.body.style.overflow = 'auto';
}
closeElem();

buttons.forEach((element , i )=> {
    element.addEventListener('click' ,openModal)
});


modalElem.addEventListener('click' , (event) => {
    if(event.target===modalElem || event.target.getAttribute('data-close')==''){
        closeElem();
    }
})
document.addEventListener('keydown' , (e) => {
    if(e.code =="Escape") {
        closeElem();
    }
})
// const interval = setTimeout(openModal , 30000);

////////////  Timer   ////////////
const deadline = new Date('Thu Jule 22 2021 00:00:00');
function getTimeRemaining(endtime){
    const t = Date.parse(deadline)-Date.parse(new Date()),
        days = Math.floor(t / (1000 * 60 * 60 *24)),
        hours = Math.floor(t / (1000 * 60 * 60 ) % 24),
        minutes = Math.floor(t / (1000 * 60  ) % 60),
        seconds = Math.floor(t / (1000) % 60);
        return{
            'total' : t,
            'days' : days,
            'hours' : hours,
            'minutes' : minutes,
            'seconds' : seconds
        }
}
function getZero(number){
    if(number < 10){
        return `0${number}`;
    }else{
        return number;
    }
}
function setClock(selector,endtime){
    const timer = document.querySelector(selector),
          days = timer.querySelector('#days'),
          hours = timer.querySelector('#hours'),
          minutes = timer.querySelector('#minutes'),
          seconds = timer.querySelector('#seconds');
          const timeInterval = setInterval(updateClock,1000);
          updateClock();

    function updateClock(){
        const t = getTimeRemaining(endtime);
        days.innerHTML = getZero(t.days);
        hours.innerHTML = getZero(t.hours);
        minutes.innerHTML = getZero(t.minutes);
        seconds.innerHTML = getZero(t.seconds);
        if(t < 0){
            clearInterval(timeInterval);
        }
    }             
}
setClock('.timer',deadline);

////////////  Post info   ////////////
const forms = document.querySelectorAll('form'),
      message = {
          load : 'Загрузка',
          success : 'Успешно',
          fail : 'Провал'
      }

forms.forEach(item => {
    postMessage(item);
})

function postMessage(form){
    form.addEventListener('submit' , (e) => {
        e.preventDefault();

        const statusMessage = document.createElement('div');
        console.log(message.load);
        form.append(statusMessage);
        const formData = new FormData(form);
        const obj = {};
        formData.forEach((value,key) => {
            obj[key] = value;
        })
        fetch('server.php',{
            method : 'POST',
            headers : {
                'Content-type' : 'application/json'
            },
            body : JSON.stringify(obj) 
        })
        .then(data => data.text())
        .then(data => {
            
            showThanksModal(message.success);
            statusMessage.remove();
            closeElem();

        }).catch(() => {
            showThanksModal(message.fail);
        }).finally(()=> {
            form.reset();
        })
        
    })
}

/////////////////  slide ////////////////////