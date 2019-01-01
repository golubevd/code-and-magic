'use strict';
//Модуль отисвки похожих персонажей
(function(){
    var coatColor;
    var eyesColor;
    var wizards = [];
 //Функция подсчета балов. Чем больше цветов у персонажа совпадают тем выше его бал.   
    var getRank=function(wizard){
        var rank=0;
        if(wizard.colorCoat===coatColor){
            rank+=2;
        }
        if(wizard.colorEyes===eyesColor){
            rank+=1;
        }
        return rank;
    };
   //Сортировка по имени. 
    var namesComparator= function(left, right){
        if(left >right){
            return 1;
        }else if(left< right){
            return -1;
        }else{
            return 0;
        }
    };
  //Обновление оьртсовки персонажей на странице. 
    var updateWizards=function(){
        //отрисовка по баллам
           render(wizards.slice().sort(function(left,right){
            var rankDriff=getRank(right)- getRank(left);
            if(rankDriff===0){
                rankDriff=wizards.indexOf(left)-wizards.indexOf(right);
            }
            return rankDriff;
        }));
            
      //Функция сортировка если совпадает цвет глаз и куртки
        var sameCoatAndEyesWizards= wizards.filter(function(it){
            return it.colorCoat===coatColor && it.colorEyes===eyesColor;
        });
      //Функция сортировка если совпадает цвет  куртки  
        var sameCoatWizards=wizards.filter(function(it){
            return it.colorCoat===coatColor;
        });
        //Функция сортировка если совпадает цвет глаз 
         var sameEyesWizards=wizards.filter(function(it){
            return it.colorEyes===eyesColor;
        });
       //Фильтрация персонажей согласно получееных данных 
        var filteredWizards=sameCoatAndEyesWizards;
        filteredWizards=filteredWizards.concat(sameCoatWizards);
        filteredWizards=filteredWizards.concat(sameEyesWizards);
        filteredWizards=filteredWizards.concat(wizards);
        
       //Орисовка уникальных персонажей не похожих ни на кого. 
        var uniqueWizards = filteredWizards.filter(function(it,i){
            return filteredWizards.indexOf(it)===i;
        });
        
        render(uniqueWizards);
    };
//Отрисовка персонаже по цвету куртки
   window.wizardCustomization.wizard.onCoatChange=window.debounce(function(color){
        coatColor=color;
        updateWizards();
    });
 //Отрисовка персонаже по цвету глаз
    window.wizardCustomization.wizard.onEyesChange=window.debounce(function(color){
        eyesColor=color;
        updateWizards();
    });
    
    // Получение списка персонажей с сервера и отрисовка   
    var sH = function(data){
        wizards=data;
        render(wizards);
         console.log(wizards);
    };   
    
   

   //Обработчик ошибки 
        var errorHandler= function(errorMessage){
        var node = document.createElement('div');
        node.style='z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
            node.classList.add('error');
        node.style.position = 'absolute';
        node.style.left=0;
        node.style.right=0;
        node.style.fontSize = '30px';
        node.textContent=errorMessage;
        document.body.insertAdjacentElement('afterbegin', node);
    };
    
    window.load(sH,errorHandler);
       
})();