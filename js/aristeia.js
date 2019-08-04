
// variables versus
var myCanvasArea;
var myBackground;
var logo1 = -1;
var logo2 = -1;
var modal;
var estilo=-1;
var versus=-1;
var fondo=-1;

var frag1=-1;
var frag2=-1;
var punt1=-1;
var punt2=-1;


var selEquipo1=[];
var selEquipo2=[];

var secciones=["selEstilos","selLogos","selBackground","selEquipos","selVersus","selPuntuacion","imagen","myCanvas"];
// variables escaleta
var mods=[];
var listaAristos=[];
var listaEquipo1, listaEquipo2,listaTemporal;

// variables generales
var rutaImg = '../images/';
//var rutaImg = 'images/';
var rutaLogo = rutaImg + 'logos/';

var mensajes = { 
    'no_estilo' : 'Debe seleccionar un estilo previamente',
    'enough_elments' : 'Debe seleccionar mas elementos para generar la imagen preliminar',
    'regenerar_panel' : 'Pulsar otra vez si no se generan algún componente',
 };

 var iModal, iSidenav,iTabs

 loadSelects('punt1');
 loadSelects('frag1');
 loadSelects('punt2');
 loadSelects('frag2');


M.AutoInit();



var modalElement=new M.Modal(document.getElementById("modal1"));
  document.addEventListener('DOMContentLoaded', function() {

    ocultarClase('panel');
    ocultarClase('escaleta');

  });


//Visible
function ver(id){
    document.getElementById(id).style="display:block";
}
//Oculto
function ocultar(id){
    document.getElementById(id).style="display:none";
}

//Ocultar Clase
function ocultarClase(clase){
    var elems = document.querySelectorAll('.'+ clase);
    for (i=0;i<elems.length; i++)
    {
        elems[i].hidden=true;
    }
}

//Ocultar Clase
function verClase(clase){
    var elems = document.querySelectorAll('.'+ clase);
    for (i=0;i<elems.length; i++)
    {
        elems[i].hidden=false;
    }
}

function initPanel(){
    verClase('panel');
    ocultarClase('main');
    ocultarClase('escaleta');
    loadEstilos();
    loadFondos();
    loadVersus();
    startPanel();

    loadPreview();

}

function initEscaleta(){
    verClase('escaleta');
    ocultarClase('main');
    ocultarClase('panel');
    loadExpansiones();	
	loadMods();

}



////////////////////////////////////////////////////////////
//              ACCIONES DE CARGA DE SECCIONES
////////////////////////////////////////////////////////////

function loadSelects(id)
{
    //Puntuaciones
    var selectList = document.getElementById(id);
  
    //Create and append the options
    for (var i = -1; i < 13; i++) {
        var option = document.createElement("option");
        option.value = i;
        option.text = (i<0) ? 'Seleccionar' : i;
        selectList.appendChild(option);
    }

}

//Carga de seccion Estilos
function loadEstilos(){
    let div=document.getElementById('estilos_disponibles');
    div.innerHTML="";
    
    for (var i=0;i<posEstilos.length;i++)
    {
        let div_img = document.createElement('div');
        div_img.setAttribute('class','col s6');
        let imgA = document.createElement('img');
        imgA.src=rutaImg + posEstilos[i].back.image;
        imgA.id="estilo_"+i
        imgA.setAttribute('onclick', 'selectEstilo('+i+');');
        imgA.setAttribute('class', 'nonSelected responsive-img');
        div_img.appendChild(imgA);
        div.appendChild(div_img);
    }

}

// Carga seccion Fondos
function loadFondos(){
  let div=document.getElementById('fondos_disponibles');
  
  for (var i=0;i<posFondos.length;i++)
  {
      let div_img = document.createElement('div');
      div_img.setAttribute('class','col s6 ');
      let imgA = document.createElement('img');
      imgA.src=rutaImg + posFondos[i].image;
      imgA.id="fondo_"+i
      imgA.setAttribute('onclick', 'selectFondo('+i+');');
      imgA.setAttribute('class', 'nonSelected responsive-img');
      div_img.appendChild(imgA);
      div.appendChild(div_img);
  }
  
}


// Carga Seccion Puntuaciones
function loadPuntaciones(){
  let div=document.getElementById('puntuaciones_disponibles');
  
  for (var i=0;i<posEstilos.length;i++)
  {
      let div_img = document.createElement('div');
      div_img.setAttribute('class','col m6 s12');
      let imgA = document.createElement('img');
      imgA.src=rutaImg + posEstilos[i].back.image;
      imgA.id="estilo_"+i
      imgA.setAttribute('width','50%');
      imgA.setAttribute('onclick', 'selectEstilo('+i+');');
      imgA.setAttribute('class', 'nonSelected responsive-img');
      div_img.appendChild(imgA);
      div.appendChild(div_img);
  }
  
}

// Carga seccion Versus
function loadVersus(){
  let div=document.getElementById('versus_disponibles');
  
  for (var i=0;i<posVersus.length;i++)
  {
      let div_img = document.createElement('div');
      div_img.setAttribute('class','col s4');
      let imgA = document.createElement('img');
      imgA.src=rutaImg + posVersus[i].image;
      imgA.id="versus_"+i
      //imgA.setAttribute('width','30%');
      imgA.setAttribute('onclick', 'selectVersus('+i+');');
      imgA.setAttribute('class', 'nonSelected responsive-img');
      div_img.appendChild(imgA);
      div.appendChild(div_img);
  }
  
}

function loadPreview(){
  document.getElementById('imagen').innerHTML="";
  if (estilo < 0) {
    
    document.getElementById('panel-message').innerHTML=mensajes['no_estilo'];
    ocultar('botonera');

  }
  else 
  {   
    if (panelElements())
    {
      ver('botonera');

      document.getElementById('panel-message').innerHTML=mensajes['regenerar_panel'];
     
      updatePanel();
    }
    else {
      document.getElementById('panel-message').innerHTML=mensajes['enough_elments'];
    }

  }
}



// Generar selector de aristos por equipo
function loadSelector(team){
    
    let lista;
    
    if (team == 1 )
        lista = selEquipo1;
    else
        lista = selEquipo2;
    
    modal('<h2 class="textoPortada">Equipo '+team+'</h2>','');
    for (var i=0;i<Aristos.length;i++)
    {
        let imgA = document.createElement('img');
        imgA.src=rutaImg + Aristos[i].Image;
        imgA.setAttribute('onclick', 'addAristoTeam('+i+', '+team+');');
        imgA.setAttribute('class', 'nonSelected');
        
        if (lista.indexOf(i) > -1)  { imgA.setAttribute('class', 'selected') }
    
        //div.appendChild(imgA);
        modal(imgA,'append');
    }

}

//Selector  de logos 
function loadLogos(team){
    
     
    if (team == 1 )
        logo = logo1;
    else
        logo = logo2;
    
    modal('<h2 class="textoPortada">Equipo '+team+'</h2>','');
    for (var i=0;i<Logos.length;i++)
    {
        let imgA = document.createElement('img');
        imgA.src=rutaLogo + Logos[i].Image;
        imgA.setAttribute('onclick', 'addLogo('+i+', '+team+');');
        imgA.setAttribute('class', 'nonSelected listalogos');
        imgA.setAttribute('alt', Logos[i].Name);
        imgA.setAttribute('title', Logos[i].Name);
        
        if (logo == i )  { imgA.setAttribute('class', 'selected listalogos') }

        modal(imgA,'append');
    }

    
}

function loadTeam(team){
    let div = document.getElementById('equipo'+team);
    let lista;
    
    if (team == 1 )
        lista = selEquipo1;
    else
        lista = selEquipo2;
        
    div.innerHTML='';
    
    for (var i=0;i<lista.length;i++)
    {
        let divA = document.createElement('div');
        divA.setAttribute('class', 'col s3');
        let imgA = document.createElement('img');
        imgA.src=rutaImg + Aristos[lista[i]].Image;
        imgA.setAttribute('class', 'responsive-img');
        divA.appendChild(imgA);
        div.appendChild(divA);

    }
};

function modal(message, tipo){
    let div = document.getElementById('modalContent');
    if (tipo == 'append')
    {     
        div.appendChild(message);
    }
    else{
        div.innerHTML=message;
    }
    ver('modalContent');
    //ver('myModal');
}



function loadExpansiones(){


	for (i=0;i<Expansiones.length;i++)
	{

		var contenido=
		'<label><input type="checkbox" name="exps[]" class="filled-in checkexpansion">'+
		'<span>'+Expansiones[i].Name+'</span></label>';

        
    	var item = document.createElement('p');
    	item.innerHTML = contenido;
		document.getElementById("expansiones").append( item );

	}    
    
};

function loadMods(){

	for (i=0;i<Mods.length;i++)
	{

		var contenido=
        '<label><input type="checkbox" name="'+Mods[i].Name+'" class="filled-in checkmod">'+
		'<span>'+Mods[i].Name+'</span></label>';

    	var item = document.createElement('p');
    	item.innerHTML = contenido;
		document.getElementById("mods").append( item );

	}    
};




////////////////////////////////////////////////////////////
//              ACCIONES DE SELECCION
////////////////////////////////////////////////////////////

//Seleccion de estilo
function selectEstilo(id){
	estilo=id;
	
	for(var i=0;i<posEstilos.length;i++)
	{
	    let imgA=document.getElementById("estilo_"+i);
	    if (i==id)
	        imgA.className ='selected responsive-img';
	    else
	        imgA.className = 'nonSelected responsive-img';
	}

    loadPreview();
}

//Seleccion Fondo
function selectFondo(id){
  fondo = id;
  for(var i=0;i<posFondos.length;i++)
  {
      let imgA=document.getElementById("fondo_"+i);
      if (i==id)
          imgA.className ='selected responsive-img';
      else
          imgA.className = 'nonSelected responsive-img';
  }
  //eliminamos el fondo
  document.getElementById('img_id3').src=rutaImg + posFondos[fondo].image;
  ver('img_id3');
  document.getElementById('id3').value="";

  loadPreview();

}

//Seleccion Versus
function selectVersus(id){
	versus = id;
	for(var i=0;i<posVersus.length;i++)
	{
	    let imgA=document.getElementById("versus_"+i);
	    if (i==id)
	        imgA.className ='selected responsive-img';
	    else
	        imgA.className = 'nonSelected responsive-img';
	}
    loadPreview();
}


//Asignacion de Puntuacion
function setPunt1(id){
    punt1 = id;
    loadPreview();
}
function setPunt2(id){
    punt2 = id;
    loadPreview();
}

// Asignacion de Frags
function setFrag1(id){
    frag1 = id;
    loadPreview();
}
function setFrag2(id){
    frag2 = id;
    loadPreview();
}


// A単adir Aristo al equipo
function addAristoTeam(id, team){
    let lista;
    
    if (team == 1 )
        lista = selEquipo1;
    else
        lista = selEquipo2;
    
  	if (lista.indexOf(id) < 0) 
    	lista.push(id);
    else{
        lista.splice(lista.indexOf(id),1);
    }
    
    while (lista.length > 4){
        lista.shift();    
    }
    
    if (team == 1 )
    selEquipo1=lista;
    else
    selEquipo2=lista;
	if (lista.length < 4)
    {
        loadSelector(team);
    }else {
        modalElement.close();
    }
    loadPreview();
    loadTeam(team);
}

//Asignacion de Logo
function addLogo(id,team)
{
    if (team == 1 )
        logo1 = id;
    else
        logo2 = id;
    
    //ocultar('modal1');
    modalElement.close();

    let preview = document.getElementById('img_id'+team); //Seleccionamos la img del equipo
    preview.src = rutaLogo + Logos[id].Image;
    ver('img_id'+team);
    loadPreview();
     
}



// Cargar imagen de file input
function loadComponente( team ){
  let preview = document.getElementById('img_'+team); //Seleccionamos la img del equipo
  let file    = document.getElementById(team).files[0]; //Seleccionamos el fichero del img
  let reader  = new FileReader();

  //check Extension
   if (fileValidation(file.name))
   {
     reader.onloadend = function () {
        this.image = new Image();
        this.image.src = reader.result;
        preview.src = reader.result;
        
      }
      if (file) {
        reader.readAsDataURL(file); //reads the data as a URL
        ver('img_'+team);
      } else {
        preview.src = "";
      }
   }else{
       document.getElementById(team).value="";
   }

   loadPreview();
}

////////////////////////////////////////////////////////////
//              ACCIONES DE VALIDACION
////////////////////////////////////////////////////////////

//Compreuba la extension del fichero subido
// TODO : validar tamaño imagen
function fileValidation(filename){
   
  var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
  if(!allowedExtensions.exec(filename)){
      modal('<h2 class="textoPortada">Please upload file having extensions .jpeg/.jpg/.png/.gif only.</h2>');
      return false;
  }else{
     return true;
  }
}

//Comprueba que hay elementos suficientes para generar el panel
function panelElements(){
  let resultado = 0;
  // Check estilo
  if (estilo < 0) { return false; }

  // Check fondo
  if (fondo > -1 || document.getElementById('img_id3').src.length > 1000) { resultado++; }

  // Check Logo 1
  if (logo1 > -1 || document.getElementById('img_id1').src.length > 1000) { resultado++; }

  // Check Logo 2
  if (logo2 > -1 || document.getElementById('img_id2').src.length > 1000) { resultado++; } 

  // Check Aristos
  if (selEquipo1.length > 0) { resultado++;}
  if (selEquipo2.length > 0) { resultado++;}

  // Check Puntuacion
  if (punt1 > 0 || frag1 > 0 || punt2 > 0 || frag2 > 0 ) { resultado++;}

  //alert(resultado);
  return ( resultado > 1 ) ? true : false;

}

////////////////////////////////////////////////////////////
//              ACCIONES DE CANVAS
////////////////////////////////////////////////////////////

// Primera configuracion del canvas
function startPanel() {
	myCanvasArea = loadCanvas('myCanvas');
}

//Actualizar el canvas
function updatePanel() { 
    //ocultar('modalContent');
    //ver('myCanvas'); 
    drawLogoText('1',0,0);

    cleanCanvas() ;

    drawFondo();
    for (var i=0;i<posEstilos[estilo].orden.length;i++)
    {
        switch(posEstilos[estilo].orden[i]) {
            case 'Logos':
                drawLogos();
                break;
            case 'Aristos':
                drawAristos();
                break;
            case 'Versus':
                drawVersus();
                break; 
            case 'Front':
                drawFront();
                break; 
            case 'Puntuacion':
                drawPuntuacion();
                break; 
        }   
    }

	
}

//Dibuja el Fondo en el canvas
function drawFondo(){
    let background;
    let preview;
    let x,y;

    preview = document.getElementById('img_id3'); 
    //Seleccionamos la img del equipo
    if (preview.src.length > 1000)
    {
        background = new Image();
        background.src = preview.src;
        myBackground = new component(posEstilos[estilo].back.h, posEstilos[estilo].back.w, background, posEstilos[estilo].back.x, posEstilos[estilo].back.x, "file");
        myBackground.update();
        alert('det')
    }
    else
    {
        //Seleccion predefinida 
        if(fondo == -1){fondo = estilo;}
        
        myBackground = new component(posEstilos[estilo].back.h, posEstilos[estilo].back.w, rutaImg + posFondos[fondo].image, posEstilos[estilo].back.x, posEstilos[estilo].back.y, "image");
        myBackground.update();
    
    }

}

//Carga Versus en el canvas
function drawVersus(){
    if (versus > -1)
    {
        let versusComponent;
        let x,y;
        x=posEstilos[estilo].vs.x - posEstilos[estilo].vs.w / 2;
        y=posEstilos[estilo].vs.y - posEstilos[estilo].vs.h / 2; 
        versusComponent = new component(posEstilos[estilo].vs.w, posEstilos[estilo].vs.h, rutaImg +  posVersus[versus].image, x, y, "image");
        versusComponent.update();
    }
}

function drawLogoText(text,x,y,size = 120,color='white', stroke = 'black' )
{

    let context = myCanvasArea.context;
    let fontSize = size+'px ';
    let fontFamily = 'SFSportsNight';
    context.font   = fontSize + fontFamily;
    context.lineCap = "round";
    context.strokeStyle = stroke;
    context.lineWidth = 20;
    context.strokeText(text, x, y);
    context.fillStyle = color;
    context.fillText(text, x, y)
    
}


//Carga Aristos en el canvas
function drawAristos (){
    
    let aristo,x,y;

    if (selEquipo1.length > 0) 
    {
        for (var i=0;i<selEquipo1.length;i++){
            j=i%selEquipo1.length; //Posicionar al primero encima
            j=i;
            x = posEstilos[estilo].team1.x - posEstilos[estilo].team1.w / 2 ;
            y = posEstilos[estilo].team1.y - posEstilos[estilo].team1.h / 2 ;
            pos=j* (posEstilos[estilo].team1.w + posEstilos[estilo].team1.gapx) + x;
            let temp = new component(posEstilos[estilo].team1.w, posEstilos[estilo].team1.h, rutaImg + posEstilos[estilo].imgPref + Aristos[selEquipo1[j]].Image, pos, y, "image");
            temp.update();
        }
    }

    if (selEquipo2.length > 0) 
    {
        for (var i=0;i<selEquipo2.length;i++){
            j=i%selEquipo2.length;
            j=i;
            x = posEstilos[estilo].team2.x - posEstilos[estilo].team2.w / 2 ;
            y = posEstilos[estilo].team2.y - posEstilos[estilo].team2.h / 2 ;
            pos=j*(posEstilos[estilo].team2.w + posEstilos[estilo].team2.gapx) + x;

            let temp = new component(posEstilos[estilo].team2.w, posEstilos[estilo].team2.h, rutaImg + posEstilos[estilo].imgPref +  Aristos[selEquipo2[j]].Image, pos, y, "image");
            temp.update();       
        }
    }
    
}

//puntuacion
function drawPuntuacion()
{
    let puntComponent,x,y,text;
    if (punt1 > -1)
    {
        //let imagen = rutaImg + punt1 + '.png';
        size=posEstilos[estilo].punt1.size;
        x = posEstilos[estilo].punt1.x ;
        y = posEstilos[estilo].punt1.y + size / 2 ;
        if(punt1.length=1) {text=' '+punt1}
        drawLogoText(text,x,y,size,'black','white');
        if (frag1 > -1)
        {
            // Guion
            x = posEstilos[estilo].punt1.x  ;
            y = posEstilos[estilo].punt1.y + size / 2 ;
            pos= (size + size*0.4 ) + x;
            drawLogoText('-',pos,y,size,'black','white');
            

            // frags
           
            x = posEstilos[estilo].punt1.x  ;
            y = posEstilos[estilo].punt1.y + size / 2 ;
            pos=(2*size+ size*0.2 ) + x;
            drawLogoText(frag1,pos,y,size,'red','white');
        }
    }

    if (punt2 > -1)
    {

        size=posEstilos[estilo].punt2.size;
        x = posEstilos[estilo].punt2.x ;
        y = posEstilos[estilo].punt2.y + size / 2 ;
        if(punt2.length=1) {text=' '+punt2}
        drawLogoText(text,x,y,size,'black','white');
        if (frag2 > -1)
        {
            // Guion
            x = posEstilos[estilo].punt2.x  ;
            y = posEstilos[estilo].punt2.y + size / 2 ;
            pos= (size + size*0.4 ) + x;
            drawLogoText('-',pos,y,size,'black','white');
            

            // frags
           
            x = posEstilos[estilo].punt2.x  ;
            y = posEstilos[estilo].punt2.y + size / 2 ;
            pos=(2*size+ size*0.2 ) + x;
            drawLogoText(frag2,pos,y,size,'red','white');
        }
    }

}

function drawPuntuacion2(){
    let puntComponent,x,y;
    if (punt1 > -1)
    {
        let imagen = rutaImg + punt1 + '.png';
        x = posEstilos[estilo].punt1.x - posEstilos[estilo].punt1.w / 2 ;
        y = posEstilos[estilo].punt1.y - posEstilos[estilo].punt1.h / 2 ;
        puntComponent = new component(posEstilos[estilo].punt1.w, posEstilos[estilo].punt1.h, imagen, x, y, "image");
        puntComponent.update();
        if (frag1 > -1)
        {
            // Guion
            x = posEstilos[estilo].punt1.x - posEstilos[estilo].punt1.w / 2 ;
            y = posEstilos[estilo].punt1.y - posEstilos[estilo].punt1.h / 2 ;
            pos=(posEstilos[estilo].punt1.w + posEstilos[estilo].punt1.gapx) + x;
            puntComponent = new component(posEstilos[estilo].punt1.w, posEstilos[estilo].punt1.h, rutaImg  + 'guion.png', pos, y, "image");
            puntComponent.update();

            // frags
            let frags = rutaImg + frag1 + '_rojo.png';
            x = posEstilos[estilo].punt1.x - posEstilos[estilo].punt1.w / 2 ;
            y = posEstilos[estilo].punt1.y - posEstilos[estilo].punt1.h / 2 ;
            pos=2*(posEstilos[estilo].punt1.w + posEstilos[estilo].punt1.gapx) + x;
            puntComponent = new component(posEstilos[estilo].punt1.w, posEstilos[estilo].punt1.h, frags, pos, y, "image");
            puntComponent.update();
        }
    }

    if (punt2 > -1)
    {
        let imagen = rutaImg + punt2 + '.png';
        x = posEstilos[estilo].punt2.x - posEstilos[estilo].punt2.w / 2 ;
        y = posEstilos[estilo].punt2.y - posEstilos[estilo].punt2.h / 2 ;
        puntComponent = new component(posEstilos[estilo].punt2.w, posEstilos[estilo].punt2.h, imagen, x, y, "image");
        puntComponent.update();
        if (frag2 > -1)
        {
            // Guion
            x = posEstilos[estilo].punt2.x - posEstilos[estilo].punt2.w / 2 ;
            y = posEstilos[estilo].punt2.y - posEstilos[estilo].punt2.h / 2 ;
            pos=(posEstilos[estilo].punt2.w + posEstilos[estilo].punt2.gapx) + x;
            puntComponent = new component(posEstilos[estilo].punt2.w, posEstilos[estilo].punt2.h, rutaImg  + 'guion.png', pos, y, "image");
            puntComponent.update();

            // frags
            let frags = rutaImg + frag2 + '_rojo.png';
            x = posEstilos[estilo].punt2.x - posEstilos[estilo].punt2.w / 2 ;
            y = posEstilos[estilo].punt2.y - posEstilos[estilo].punt2.h / 2 ;
            pos=2*(posEstilos[estilo].punt2.w + posEstilos[estilo].punt2.gapx) + x;
            puntComponent = new component(posEstilos[estilo].punt2.w, posEstilos[estilo].punt2.h, frags, pos, y, "image");
            puntComponent.update();
        }
    }

}

//Carga front
function drawFront(){

    let frontComponent;
    frontComponent = new component(posEstilos[estilo].front.w, posEstilos[estilo].front.h, rutaImg +  posEstilos[estilo].front.image, posEstilos[estilo].front.x, posEstilos[estilo].front.y, "image");
    frontComponent.update();
}


//Carga Logos en el canvas
function drawLogos(){

    let logo;
    let preview;
    let x,y;

    // LOGO 1
    preview = document.getElementById('img_id1'); //Seleccionamos la img del equipo
    if (preview.src.length > 1000)
    {
  	    logo = new Image();
	    logo.src = preview.src;
        x=posEstilos[estilo].logo1.x - posEstilos[estilo].logo1.w / 2;
        y=posEstilos[estilo].logo1.y - posEstilos[estilo].logo1.h / 2;
	    tmp_logo1 = new component(posEstilos[estilo].logo1.w, posEstilos[estilo].logo1.h, logo, x, y, "file");
	    tmp_logo1.update();
    }    
    else
    {
        //Seleccion predefinida 
        if(logo1 > -1){
            x=posEstilos[estilo].logo1.x - posEstilos[estilo].logo1.w / 2;
            y=posEstilos[estilo].logo1.y - posEstilos[estilo].logo1.h / 2;
            tmp_logo1 = new component(posEstilos[estilo].logo1.h, posEstilos[estilo].logo1.w, rutaLogo + Logos[logo1].Image, x, y, "image");
            tmp_logo1.update();
        }
    }
    
	preview = document.getElementById('img_id2'); //Seleccionamos la img del equipo
	if (preview.src.length > 1000)
    {
      	logo = new Image();
    	logo.src = preview.src;
        x=posEstilos[estilo].logo2.x - posEstilos[estilo].logo2.w / 2;
        y=posEstilos[estilo].logo2.y - posEstilos[estilo].logo2.h / 2;
    	tmp_logo2 = new component(posEstilos[estilo].logo2.w, posEstilos[estilo].logo2.h, logo, x, y,"file");
    	tmp_logo2.update();
    }else
    {
        //Seleccion predefinida 
        if(logo2 > -1){
            x=posEstilos[estilo].logo2.x - posEstilos[estilo].logo2.w / 2;
            y=posEstilos[estilo].logo2.y - posEstilos[estilo].logo2.h / 2;
            tmp_logo2 = new component(posEstilos[estilo].logo2.h, posEstilos[estilo].logo2.w, rutaLogo + Logos[logo2].Image, x, y, "image");
            tmp_logo2.update();
        }
    }

}

// Cargar imagen de file input
function loadComponente( team ){
   let preview = document.getElementById('img_'+team); //Seleccionamos la img del equipo
   let file    = document.getElementById(team).files[0]; //Seleccionamos el fichero del img
   let reader  = new FileReader();

   //check Extension
    if (fileValidation(file.name))
    {
    	reader.onloadend = function () {
    	   this.image = new Image();
    	   this.image.src = reader.result;
           preview.src = reader.result;
           loadPreview();
       }
       if (file) {
    	   reader.readAsDataURL(file); //reads the data as a URL
           ver('img_'+team);
       } else {
    	   preview.src = "";
       }
    }else{
        document.getElementById(team).value="";

    }

}

function test(){
    var c1 = document.createElement('canvas');
    //var c1 = document.getElementById('inner');
    var ctx1 = c1.getContext('2d');
    c1.widht=950;
    c1.height=830;

    let context = myCanvasArea.context;

    //ctx1.fillStyle = "#FF0000";
    //ctx1.fillRect(50,50,100,100);*/

    /*
    var c2 = document.getElementById('outer');
    var ctx2 = c2.getContext('2d');


    //ctx2.fillRect(0,0,200,100);
    c2.width=1280;
    c2.height=800;
    ctx2.fillRect(0,0,1280,800);
    /*ctx2.drawImage(c1,0,0,100,100);
    ctx2.drawImage(c1,100,0,100,100);
    ctx2.drawImage(c1,0,100,100,100);
    ctx2.drawImage(c1,100,100,100,100);*/
    /*
    var imageObj = new Image();

    imageObj.onload = function() {
    // draw cropped image
    var sourceX = 200;
    var sourceY = 100;
    var sourceWidth = 300;
    var sourceHeight = 120;
    var destWidth = sourceWidth;
    var destHeight = sourceHeight;
    var destX = c2.width / 2 - destWidth / 2;
    var destY = c2.height / 2 - destHeight / 2;
    //var destX = 800;
    //var destY = 800;
    var destX = 0;
    var destY = 100;
    //ctx2.translate(sourceWidth, 0);
    //ctx2.scale(-1, 1);
    //ctx2.drawImage(imageObj, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);
    ctx2.drawImage(imageObj, sourceX, sourceY, sourceWidth, sourceHeight);
    };
    imageObj.src = "images/pinups/pinup_kozmo.png";*/

    /*
    var imageObj2 = new Image();

    imageObj2.onload = function() {
    // draw cropped image
    var sourceX = 200;
    var sourceY = 100;
    var sourceWidth = 300;
    var sourceHeight = 120;
    var destWidth = sourceWidth;
    var destHeight = sourceHeight;
    var destX = c1.width / 2 - destWidth / 2;
    var destY = c1.height / 2 - destHeight / 2;
    //var destX = 800;
    //var destY = 800;
    //var destX = 0;
    //var destY = 0;



    ctx1.translate(sourceWidth, 0);
    ctx1.scale(-1, 1);
    ctx1.drawImage(imageObj2, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);
    //ctx1.drawImage(imageObj2, sourceX, sourceY, sourceWidth, sourceHeight);
    ctx2.drawImage(c1,140,-220,280,800);
    c1.style="display:none";
    };
    imageObj2.src = "images/pinups/pinup_kozmo.png";

    */


    // Create an image element
    var img = document.createElement('IMG');

    // When the image is loaded, draw it
    img.onload = function () {

    // Save the state, so we can undo the clipping
    ctx1.save();


    // Create a circle
    ctx1.beginPath();
    ctx1.arc(206, 177, 174, 0, Math.PI * 2, false);

    // Clip to the current path
    //ctx1.clip();


    ctx1.drawImage(img, -280, -60,650,830);


    // Undo the clipping
    ctx1.restore();
    //diaRect (ctx1, 120, 500, 100, 300, true, 2);
    }

    // Specify the src to load the image
    img.src = "images/pinups/pinup_kozmo.png";

    //roundRect(ctx1, 10,120, 200, 120, 50, false,true);
    //diaRect (ctx1, 10,120, 250, 300, false,true);
    //diaRect (ctx1, 10, 120, 200, 300, true, 2);
    diaRect (ctx1, 120, 500, 300, 600, true, 2);
    context.drawImage(c1,300,300,300,300);
}
//************************//
// Fichero Generado			
//************************//
//Funcion para descargar el fichero genrado
function downloadImage() {
var download = document.getElementById("download");
var image = document.getElementById("CanvasLayer").toDataURL("image/png").replace("image/png", "image/octet-stream");
download.setAttribute("href", image);

}

////////////////////////////////////////////////////////////
//              ACCIONES DE ESCALETA
////////////////////////////////////////////////////////////


function generarEscaleta(){

    let numJugadores = 4;
    let zlavin,petiso,full;



    //Rellenamos lista aristos
    availableAristos();
    availableMods();
    error="";
    
	zlavin = ( mods.includes('Zlavin') ) ? 1 : 0;
	petiso = ( mods.includes('Petiso') ) ? 1 : 0;
	full = ( mods.includes('Full Random') ) ? 1 : 0;
	// Check de numero de jugadores por mod

    
    
	if ( (zlavin == 1) && (petiso == 1) && (listaAristos.length < numJugadores*4)  )
    {
        error= "No se puede aplicar el Mod Zlavin junto con el Mod Petiso. Insuficiente numero de aristos " ;
        petiso =0;
        if (zlavin == 1 && listaAristos.length < numJugadores*2)
        {
            zlavin = 0;
        }
        
    }
    else if ((zlavin == 1) && (listaAristos.length < numJugadores*2) )
    {
        error= "No se puede aplicar el Mod Zlavin. Insuficiente número de aristos ";
        zlavin = 0;
    }
    else if ( (petiso == 1)  && (listaAristos.length < numJugadores*4) ) {
        error= "No se puede aplicar el Mod Petiso. Insuficiente número de aristos";
        petiso = 0;
    }

    if (petiso == 1) 
    { 
        numJugadores = numJugadores*2; 
    }

    if (error.length > 0) { alert(error); }


 	if (zlavin == 1)
    {
        
          //zlavin
        listaTemporal = shuffle(listaAristos); 
        listaEquipo1= listaTemporal.slice(0,numJugadores);
        listaEquipo2= listaTemporal.slice(numJugadores,numJugadores*2);
    }
    else{
        listaEquipo1 = shuffle(listaAristos).slice(0,numJugadores); 
        listaEquipo2 = shuffle(listaAristos).slice(0,numJugadores); 
    }

    // Clear divs
    document.getElementById("equipo_verde").innerHTML=''
    document.getElementById("equipo_naranja").innerHTML='';

    listaEquipo1.forEach( function(aristo, index){
    	let div_img = document.createElement('p');
    	
    	div_img.className="div_team col s6 m6"
        div_img.setAttribute("id", "team1_"+index);
        

    	let img_div = document.createElement('img');
    	img_div.src = rutaImg + aristo.Image;
    	img_div.className = "img_team responsive-img";

    	if ( (petiso == 1) && (index%2 == 1) )
    	{
    		img_div.className = "img_team2 responsive-img";	
    		let t = index -1;
    		document.getElementById('team1_' + t).append(img_div);

    	}
    	else
    	{
    		div_img.append(img_div);
    		document.getElementById("equipo_verde").append(div_img);
    	}
    	

    });
    listaEquipo2.forEach( function(aristo,index){
    	let div_img = document.createElement('p');
    	
    	div_img.className="div_team col s6 m6"
    	div_img.setAttribute("id", "team2_"+index);

    	let img_div = document.createElement('img');
    	img_div.src = rutaImg + aristo.Image;
    	img_div.className = "img_team responsive-img";

    	if ( (petiso == 1) && (index%2 == 1) )
    	{
    		img_div.className = "img_team2 responsive-img";	
    		let t = index -1;
    		document.getElementById('team2_' + t).append(img_div);

    	}
    	else
    	{
    		div_img.append(img_div);
            document.getElementById("equipo_naranja").append(div_img);
            
    	}
    	

    });


}


function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function availableAristos(){
    listaAristos=[];
    var elems = document.querySelectorAll('.checkexpansion');
    elems.forEach(function(expItem,index){
        if (expItem.checked) {
            Aristos.forEach(function(aristo){
                if (aristo.expansion == Expansiones[index].Id) { listaAristos.push(aristo);}
            });
        };        

    });
}

function availableMods(){
    mods=[];
    var elems = document.querySelectorAll('.checkmod');
    elems.forEach(function(mod){
        if (mod.checked) { mods.push(mod.name);}
    });
        
}

function checkAll(clase){
    var elems = document.querySelectorAll('.' + clase);
    elems.forEach(function(item){
        item.checked=true;
    });

}