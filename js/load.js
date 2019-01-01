'use strict';
// Подключенеи к серверу и загузка данных.
(function(){
    var URL='https://js.dump.academy/code-and-magick/data';  
    var Code={
      OK:200,
        BAD_REQUST: 400,
        UNATORIZED: 401,
        NOT_FOUND: 404
    };
    var XHR_TIMEOUT = 3000;
    window.load=function(onSuccess, onError){
       var xhr = new XMLHttpRequest();
        xhr.responseType='json';
          xhr.open('GET', URL);
        xhr.addEventListener('load', function(){
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
                   onError('Статус ответа: ' +xhr.status + ' ' + xhr.statusText);
            }
                       
        });
        
        xhr.addEventListener('error',function(){
           onError('Произошла ошибка соединения'); 
        });
        
        xhr.addEventListener('timeout',function(){
           onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс'); 
        });
        xhr.timeout=XHR_TIMEOUT;
      
        xhr.send();
    };
    
})();