'use strict';
//Модуль взаимодействия с окном пользователя.
(function(){
    //Выбор элементов взаимодействия и описание констант
    var userDialog = document.querySelector('.setup');
    var diaologOpen=document.querySelector('.setup-open');
    var diaologClose= document.querySelector('.setup-close');
    var userNameFocus = document.querySelector('.setup-user-name');
    var dialogMoveHandler= userDialog.querySelector('.upload');
    var ESC_KECODE=27;
    var ENTER_KEYCODE=13;
    var DEFAULT_TOP_POSITION='80px';
    var DEFAULT_LEFT_POSITION='50%';
    
    dialogMoveHandler.addEventListener('mousedown',function(evt){
        evt.preventDefault();
        
        var startCoords={
            x: evt.clientX,
            y: evt.clientY
        };
        
     var dragged=false;
         
     var onMouseMove=function(moveEvt){
        moveEvt.preventDefault();
        dragged=true;
        
        var shift= {
            x: startCoords.x-moveEvt.clientX,
            y: startCoords.y-moveEvt.clientY
        };
        
        startCoords={
            x: moveEvt.clientX,
            y: moveEvt.clientY
        };
        
        userDialog.style.top=(userDialog.offsetTop-shift.y)+'px';
        userDialog.style.left=(userDialog.offsetLeft-shift.x)+'px';
    };
    
         var onMouseUp=function(upEvt){
            upEvt.preventDefault();
            
            document.removeEventListener('mousemove',onMouseMove);
            document.removeEventListener('mouseup',onMouseUp);
            
            if(dragged){
                var onClickPreventDefault = function(evt){
                    evt.preventDefault();
                    dialogMoveHandler.removeEventListener('click',onClickPreventDefault);
                };
                dialogMoveHandler.addEventListener('click',onClickPreventDefault);
            }
            
        };   
        
       document.addEventListener('mousemove',onMouseMove);
       document.addEventListener('mouseup',onMouseUp);
        
        });
    
    var setDeafulPosition=function(){
        userDialog.style.top=DEFAULT_TOP_POSITION;
        userDialog.style.left=DEFAULT_LEFT_POSITION;
    };
    
    var openPopup = function(){
    userDialog.classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
};


var closePopup=function(){
    userDialog.classList.add('hidden');
    document.removeEventListener('keydown',onPopupEscPress);
   
};

var onPopupEscPress= function(evt){
    if(evt.keyCode===ESC_KECODE){
        closePopup();
        setDeafulPosition();
    }
};


diaologOpen.addEventListener('click',function(){
   openPopup(); 
});
    
diaologOpen.addEventListener('keydown', function(evt){
   
     if(evt.keyCode===ENTER_KEYCODE){
         openPopup();
     }
});
    

diaologClose.addEventListener('click',function(){
  closePopup(); 
    setDeafulPosition();
});

diaologClose.addEventListener('keydown', function(evt){
       if(evt.keyCode===ENTER_KEYCODE){
           closePopup();
           setDeafulPosition();
   }
   
});

userNameFocus.addEventListener('focus',function(){
   document.removeEventListener('keydown', onPopupEscPress); 
});

userNameFocus.addEventListener('blur',function(){
   document.addEventListener('keydown', onPopupEscPress); 
});
    
  
    
    //Form validation; Валидация формы
    userNameFocus.addEventListener('invalid',function(){
       if(userNameFocus.validity.tooShort){
           userNameFocus.setCustomValidity('В имени должно быть минимум 2 символа');
       } else if (userNameFocus.validity.tooLong){
           userNameFocus.setCustomValidity('Имя должно быть не более 25 символов');
       }else if(userNameFocus.validity.valueMissing){
           userNameFocus.setCustomValidity('Ввидите имя');
       }else {
        userNameFocus.setCustomValidity('');
        }
    });
       
     var form = userDialog.querySelector('.setup-wizard-form');
     form.addEventListener('submit',function(evt){
        window.upload(new FormData(form),function(response,errorHandler){
            userDialog.classList.add('hidden');
        });
        evt.preventDefault();
    });
    
      
    var errorHandler= function(errorMessage){
      var node = document.createElement('div');
        node.style='z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
        node.style.position = 'absolute';
        node.style.left=0;
        node.style.right=0;
        node.style.fontSize = '30px';
        node.textContent=errorMessage;
        document.body.insertAdjacentElement('afterbegin', node);
    };
    //Смена аватарки
    var FILES_TYPE=['gif', 'jpeg','bmp','png', 'jpg'];
    var fileChoiser= document.querySelector('.upload input[type=file]');
    var preview = document.querySelector('.setup-user-pic');
    fileChoiser.addEventListener('change', function(){
        var file = fileChoiser.files[0];
        var fileName = file.name.toLocaleLowerCase();
        
        var matches = FILES_TYPE.some(function(it){
            return fileName.endsWith(it);
        });
        
        if(matches){
            var reader = new FileReader();
            reader.addEventListener('load', function(){
                preview.src=reader.result;
            });
            reader.readAsDataURL(file);
        }
    });
    
})();