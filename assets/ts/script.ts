const tecla = document.getElementsByClassName('tecla');
const display = document.getElementById('display') as HTMLDivElement;

var startValue: number;
var operation: string;
var lastValue: number;

var clear: number = 0;

function changeDisplay(valor: string) : void{
  if(operation){
    
    if(clear === 0){
      display.innerHTML = valor;
      clear = 1;
      
    } else{
      if(display.textContent){
        if(display.textContent.length < 16){
          display.innerHTML += valor;          
        }
      } 
    }  
    

  }else{
    if(display.textContent === '0'){
      display.innerHTML = valor;
    }  
    else
    if(display.textContent){
      if(display.textContent.length < 16){
        display.innerHTML += valor;
      }
    } 
  }       
  if(display.textContent){
    ajustSizeDisplay(display.textContent);
  }
}

function ajustSizeDisplay(texto: string){
  if(texto.length >= 8) display.style.fontSize = '50px';  
  if(texto.length >= 10) display.style.fontSize = '40px';
  if(texto.length >= 13) display.style.fontSize = '30px';   
}

function clearDisplay(disp: HTMLDivElement) : void{
  disp.innerHTML = '0';
  disp.style.fontSize = '65px';
}

function teclasClick(li: Element){
  if(li.classList.contains('tecla-numerica')){
    if(li.textContent){

      changeDisplay(li.textContent);
    }
  }
  else if(li.classList.contains('tecla-divisao')){
    
    startValue = Number(display.textContent);
    operation = '/';
    clear = 0;
  }
  else if(li.classList.contains('tecla-igualdade')){
    let result: string;
    
    if(operation === '/'){

      console.log(operation + '\n primeiro valor: ' + startValue + '\n segundo valor' + Number(display.textContent))

      let total: number = startValue / Number(display.textContent);
      var valorDisplay: string;

      operation = '';
      clear = 0;
      display.innerHTML = total.toString();

     
      if(total.toString().length >= 13){
        valorDisplay = total.toString().substring(0,10);
        console.log(valorDisplay);
      }
     
      ajustSizeDisplay(valorDisplay);
    }
     
  }
  else 
  if (li.textContent === "C"){
    clearDisplay(display);
  }
}

function addClickAndLis(teste: HTMLCollection) : void{
  for(let i = 0; i < tecla.length; i++){
    teste[i].addEventListener('click', function (){
      
    
      teclasClick(teste[i]);
    });    
  }
}

addClickAndLis(tecla);