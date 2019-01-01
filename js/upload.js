'use strict';
//Модуль передачи данных на сервер
(function(){
     var URL='https://js.dump.academy/code-and-magick';
       var Code={
      OK:200,
        BAD_REQUST: 400,
        UNATORIZED: 401,
        NOT_FOUND: 404
    };
  window.upload= function(data, onSuccess,onError){
     var xhr = new XMLHttpRequest(data,onSuccess);
      xhr.responseType='json';
      xhr.addEventListener('load',function(){
        
          switch(xhr.status){
              case Code.OK:
               onSuccess(xhr.response);
                  break;
                   case Code.BAD_REQUST:
                    onError(' Неверый запрос');
                    break;
                case Code.UNATORIZED:
                   onError('Пользователь не авторизован');
                    break;
                case Code.NOT_FOUND:
                    onError('Страница не найдена');
                    break;
           
                   default:
            onError('Произошла ошибка: ' + xhr.status + ' ' + xhr.statusText);
          }
           
         
      });
      
      xhr.addEventListener('error',function(){
           onError('Произошла ошибка соединения'); 
        });
        
        xhr.addEventListener('timeout',function(){
           onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс'); 
        });
      
      xhr.open('POST',URL);
      xhr.send(data);
  };  
    
})();