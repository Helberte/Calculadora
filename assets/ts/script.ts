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
  else if(li.classList.contains('tecla-virgula')){
    if(li.textContent){
      if(!display.textContent?.includes(',')){
        console.log('contém virgula');
        display.innerHTML += ',';
      }      
    }
  }
  else if(li.classList.contains('tecla-divisao')){
    
    startValue = Number(display.textContent?.replace(',','.'));
    operation = '/';
    clear = 0;
  }
  else if(li.classList.contains('tecla-multipli')){
    
    startValue = Number(display.textContent?.replace(',','.'));
    operation = 'x';
    clear = 0;
  }
  else if(li.classList.contains('tecla-subtracao')){
    
    startValue = Number(display.textContent?.replace(',','.'));
    operation = '-';
    clear = 0;
  }
  else if(li.classList.contains('tecla-adicao')){
    
    startValue = Number(display.textContent?.replace(',','.'));
    operation = '+';
    clear = 0;
  }
  else if(li.classList.contains('tecla-igualdade')){
   
    if(operation === '/'){
      display.innerHTML = realizaOperacao('/').replace('.',',');          
      ajustSizeDisplay((display.textContent) ? display.textContent : '');
    }
    else
    if(operation === 'x'){   
      display.innerHTML = realizaOperacao('x').replace('.',',');          
      ajustSizeDisplay((display.textContent) ? display.textContent : '');
    }
    else
    if(operation === '-'){   
      display.innerHTML = realizaOperacao('-').replace('.',',');          
      ajustSizeDisplay((display.textContent) ? display.textContent : '');
    }
    else
    if(operation === '+'){   
      display.innerHTML = realizaOperacao('+').replace('.',',');          
      ajustSizeDisplay((display.textContent) ? display.textContent : '');
    }
  }
  else if(li.classList.contains('tecla-porcentagem')){

    if(operation){
      
      if(operation === 'x'){   
        display.innerHTML = realizaOperacao('x-%').replace('.',',');          
        ajustSizeDisplay((display.textContent) ? display.textContent : '');
      }
      else
      if(operation === '+'){   
        display.innerHTML = realizaOperacao('+-%').replace('.',',');          
        ajustSizeDisplay((display.textContent) ? display.textContent : '');
      }
      else
      if(operation === '-'){   
        display.innerHTML = realizaOperacao('--%').replace('.',',');          
        ajustSizeDisplay((display.textContent) ? display.textContent : '');
      }

    }else{
      display.innerHTML = realizaOperacao('%').replace('.',',');          
      ajustSizeDisplay((display.textContent) ? display.textContent : '');
    }    
  }
  else 
  if (li.textContent === "C"){
    operation = '';
    clear = 0;
    clearDisplay(display);
  }
}

function realizaOperacao(operador: string) : string{
  let total: number;
 
  operation = '';
  clear = 0; 

  switch (operador) {
    case '/':      
      total = startValue / Number(display.textContent?.replace(',','.'));           
      return (String(total).length >= 13) ? String(total).substring(0,16) : String(total);        
    case 'x':
      total = startValue * Number(display.textContent?.replace(',','.'));     
      return (String(total).length >= 13) ? String(total).substring(0,16) : String(total);  
    case '-':
      total = startValue - Number(display.textContent?.replace(',','.'));     
      return (String(total).length >= 13) ? String(total).substring(0,16) : String(total);
    case '+':
      total = startValue + Number(display.textContent?.replace(',','.'));     
      return (String(total).length >= 13) ? String(total).substring(0,16) : String(total);
    case '%':      
      total = Number(display.textContent?.replace(',','.')) / 100; 
      return (String(total).length >= 13) ? String(total).substring(0,16) : String(total);

    case 'x-%': // representa quando for uma operação do tipo 160 x 2%
      let valor2: number = Number(display.textContent?.replace(',','.'));  
      total = (valor2 / 100) * startValue;
      return (String(total).length >= 13) ? String(total).substring(0,16) : String(total);

    case '+-%':
      let adicaoValor2: number = Number(display.textContent?.replace(',','.'));  
      let resultParcial: number = (adicaoValor2 / 100) * startValue;
      total = startValue + resultParcial;
      return (String(total).length >= 13) ? String(total).substring(0,16) : String(total);

    case '--%':
      let subtracaoValor2: number = Number(display.textContent?.replace(',','.'));  
      let resultParcialSubtracao: number = (subtracaoValor2 / 100) * startValue;
      total = startValue - resultParcialSubtracao;

      return (String(total).length >= 13) ? String(total).substring(0,16) : String(total);
    default:
      return '';  
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