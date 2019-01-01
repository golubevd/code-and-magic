'use strict';
//Модуль отрисовки персонажа
(function(){
// Выбор блоков отрисовки    
var similarListElement = document.querySelector('.setup-similar-list');
var similarElement = document.querySelector('.setup-similar');
var similarWizardTemplate =document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
//Функция отрисовки одного персонажа
    var renderWizard = function(wizard){
    var wizardElement = similarWizardTemplate.cloneNode(true);
    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    
    return wizardElement;
};
  //Глобальная функция отрисовки персонажей(4) или количество меньше 4.  
    window.render=function(data){
    var takeNumber = data.length > 4 ? 4 : data.length;
    similarListElement.innerHTML = '';
    for (var i = 0; i < takeNumber; i++) {
      similarListElement.appendChild(renderWizard(data[i]));
    }
      
    similarElement.classList.remove('hidden');   

}; 
    
})();