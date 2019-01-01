'use strict';
//Модуль переноса вещей в рюкзак.
(function(){
    // Выбор блоков взаимодействия  
    var dragItem= document.querySelector('.setup-artifacts-shop');
    var dropField= document.querySelector('.setup-artifacts');
    var buyItm=null;
    
    dragItem.addEventListener('dragstart',function(evt){
        if(evt.target.tagName.toLocaleLowerCase()==='img'){
            buyItm=evt.target.cloneNode(true);
            evt.dataTransfer.setData('text/plain',evt.target.alt);
            dropField.style.outline='2px dashed red';
        }
    });
    
    dropField.addEventListener('dragover', function(evt){
        dropField.style.outline='';
        evt.preventDefault();
        return false;
    });
    
    dropField.addEventListener('drop',function(evt){
       evt.target.style.backgroundColor='';
        dropField.style.outline='';
        if(evt.target.hasChildNodes()||evt.target.src===buyItm.src){
            evt.target.style.backgroundColor='red';
        }else{
            evt.target.appendChild(buyItm);
        }
        evt.preventDefault();
    });
    
    dropField.addEventListener('dragenter',function(evt){
       evt.target.style.backgroundColor='yellow';
        if(evt.target.hasChildNodes()||evt.target.src===buyItm.src){
            evt.target.style.backgroundColor='red';
        }
    });
    
    dropField.addEventListener('dragleave',function(evt){
       evt.target.style.backgroundColor='';
        evt.preventDefault();
    });
 
})();