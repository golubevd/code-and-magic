'use strict';
//Модуль описания главного персонажа
(function(){
  var setup = document.querySelector('.setup');   
//Объявление констант
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян','Мария','Кристоф','Виктор','Юлия','Люпита','Вашингтон'];
var WIZARD_SURNAME = ['да Мария','Верон','Мирабелла','Вальц','Онопко','Топольницкая','Нионго','Ирвинг'];
var COAT_COLOR=['rgb(101, 137, 164)','rgb(241, 43, 107)','rgb(146, 100, 161)','rgb(56, 159, 117)','rgb(215, 210, 55)','rgb(0, 0, 0)'];
var EYES_COLOR=['black', 'red', 'blue', 'yellow','green'];
var FIREBALL_COLOR=['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5','#e6e848'];
var WIZADS_COUNT=4;

//Объявление элементов взаимодействия
var wizardEyesColor= document.querySelector('.wizard-eyes');
var wizardCoatColor= document.querySelector('.wizard-coat');
var wizardFireballColor= document.querySelector('.setup-fireball-wrap');
  //Объект, хранит цвета глаз и куртки для похожих персонажей  
    var wizardF = {
    onEyesChange: function () {},
    onCoatChange: function () {}
  };
    
//Функция случайнй генерации елементов    
var generateWizardElements=function(arr){
    var randomElement=Math.floor(Math.random()*arr.length);
   return arr[randomElement];
   
};
//Обработчик события на изменение цвета куртки персонажа при клике
var onWiazrdCoatClick= function(){
    colorizeElement(COAT_COLOR,wizardCoatColor,'coat-color');
};
//Обработчик события на изменение цвета глаз персонажа при клике
var onWiazrdEyesClick= function(){
    colorizeElement(EYES_COLOR,wizardEyesColor,'eyes-color');
};
//Обработчик события на изменение цвета фаербола персонажа при клике
var onWiazrdFireballClick= function(){
     colorizeElement(FIREBALL_COLOR,wizardFireballColor);
};
    
    
//Вызов обработчиков событий
wizardCoatColor.addEventListener('click',onWiazrdCoatClick);
wizardEyesColor.addEventListener('click',onWiazrdEyesClick);
wizardFireballColor.addEventListener('click',onWiazrdFireballClick);

//Функция передачи значений в соответствующие поле input в зависимости от выброного цвета
var setInputColorValue=function(inputName, colorValue){
  var setup=document.querySelector('.setup-wizard-appearance');
    var inputs=setup.querySelectorAll('input');
    for(var i=0;i<inputs.length;i++){
        if(inputs[i].name===inputName){
            inputs[i].value=colorValue;
        }
    }
};

//Функция изменения цвета персонажа. 
   var colorizeElement=function(color,colorizeElem,inputName){
        var newColor=generateWizardElements(color);
        colorizeElem.style.fill=newColor;
        setInputColorValue(inputName,newColor);
       if(colorizeElem===wizardCoatColor){
           wizardF.onCoatChange(newColor);
       }
       
       if(colorizeElem===wizardEyesColor){
          wizardF.onEyesChange(newColor);
       }
        if(colorizeElem===wizardFireballColor){
          colorizeElem.style.background=newColor;  
          colorizeElem.querySelector('input').value=newColor;
        }
                
    };
   //Глобальный объект, хранит и передает цвета похожих персонажей       
    window.wizardCustomization = {
    wizard: wizardF
  };
    
    
})();

