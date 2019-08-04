
var myCanvasArea;
var myBackground;
var logo1;
var logo2;
var modal;
var estilo;
var versus;
var fondo=-1;

var frag1=-1;
var frag2=-1;
var punt1=-1;
var punt2=-1;

var selEquipo1=[];
var selEquipo2=[];
var secciones=["selEstilos","selLogos","selBackground","selEquipos","selVersus","selPuntuacion","imagen","myCanvas"];
var rutaImg = 'images/';
var rutaLogo = rutaImg + 'logos/';


////////////////////////////////////////////////////////////
//              ACCIONES DE Visualizacion
////////////////////////////////////////////////////////////


//Visible
function ver(id){
	document.getElementById(id).style="display:block";
}
//Oculto
function ocultar(id){
	document.getElementById(id).style="display:none";
}
//Logia de secciones
function GoTo (seccion) {
    if (secciones.indexOf(seccion) < 0)
    {
        alert("Seccion no valida");
        return -1;
    }
    if (seccion === "selLogos") {
        //if (typeof(estilo) == 'undefined')
        if (estilo == null)
            alert("Debe escoger un estilo");
        else
        {
           // startPanel();
            preloadImages(estilo)
            ocultarTodas();
            ver(seccion);
        }
    }else
    {
        ocultarTodas();
        ver(seccion);
    }
}

//Ocultar todas las secciones
function ocultarTodas() {
    for (var i=0;i<secciones.length;i++)
        ocultar(secciones[i]);
}

//Ventana Modal
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
    ver('myModal');
}


////////////////////////////////////////////////////////////
//              ACCIONES DE CARGA DE SECCIONES
////////////////////////////////////////////////////////////

//Carga de seccion Estilos
function loadEstilos(){
    let div=document.getElementById('estilos_disponibles');
    
    for (var i=0;i<posEstilos.length;i++)
    {
        let div_img = document.createElement('div');
        div_img.setAttribute('class','divsmedio');
        let imgA = document.createElement('img');
        imgA.src=rutaImg + posEstilos[i].back.image;
        imgA.id="estilo_"+i
        imgA.setAttribute('width','50%');
        imgA.setAttribute('onclick', 'selectEstilo('+i+');');
        imgA.setAttribute('class', 'nonSelected');
        div_img.appendChild(imgA);
        div.appendChild(div_img);
    }

    //Forzamos el boton deshabilitado
    document.getElementById("btnEstilo").disabled = true;
}

// Carga Seccion Puntuaciones
function loadPuntaciones(){
    let div=document.getElementById('puntuaciones_disponibles');
    
    for (var i=0;i<posEstilos.length;i++)
    {
        let div_img = document.createElement('div');
        div_img.setAttribute('class','divsmedio');
        let imgA = document.createElement('img');
        imgA.src=rutaImg + posEstilos[i].back.image;
        imgA.id="estilo_"+i
        imgA.setAttribute('width','50%');
        imgA.setAttribute('onclick', 'selectEstilo('+i+');');
        imgA.setAttribute('class', 'nonSelected');
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
        div_img.setAttribute('class','divsmedio');
        let imgA = document.createElement('img');
        imgA.src=rutaImg + posVersus[i].image;
        imgA.id="versus_"+i
        imgA.setAttribute('width','30%');
        imgA.setAttribute('onclick', 'selectVersus('+i+');');
        imgA.setAttribute('class', 'nonSelected');
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
        div_img.setAttribute('class','divsmedio');
        let imgA = document.createElement('img');
        imgA.src=rutaImg + posFondos[i].image;
        imgA.id="fondo_"+i
        imgA.setAttribute('width','30%');
        imgA.setAttribute('onclick', 'selectFondo('+i+');');
        imgA.setAttribute('class', 'nonSelected');
        div_img.appendChild(imgA);
        div.appendChild(div_img);
    }
    
}




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
	        imgA.className ='selected';
	    else
	        imgA.className = 'nonSelected';
	}
	startPanel();
    document.getElementById("btnEstilo").disabled = false;
	//preloadImages(id);
}

//Seleccion Versus
function selectVersus(id){
	versus = id;
	for(var i=0;i<posVersus.length;i++)
	{
	    let imgA=document.getElementById("versus_"+i);
	    if (i==id)
	        imgA.className ='selected';
	    else
	        imgA.className = 'nonSelected';
	}
	
}

//Seleccion Fondo
function selectFondo(id){
    fondo = id;
    for(var i=0;i<posFondos.length;i++)
    {
        let imgA=document.getElementById("fondo_"+i);
        if (i==id)
            imgA.className ='selected';
        else
            imgA.className = 'nonSelected';
    }
    //eliminamos el fondo
    document.getElementById('img_id3').src=rutaImg + posFondos[fondo].image;
    ver('img_id3');
    document.getElementById('id3').value="";

}


// Generar selector de aristos por equipo
function loadSelector(team){
    
    let lista;
    
    if (team == 1 )
        lista = selEquipo1;
    else
        lista = selEquipo2;
    
    //let div = document.getElementById('modalContent');
    //div.innerHTML='';
	//div.innerHTML='<h2 class="textoPortada">Equipo '+team+'</h2>';
    modal('<h2 class="textoPortada">Equipo '+team+'</h2>');
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
    /*
    ver('modalContent');
    ver('myModal');*/
    
}

//Selector  de logos 
function loadLogos(team){
    
    let lista;
    
    if (team == 1 )
        logo = logo1;
    else
        logo = logo2;
    
    //let div = document.getElementById('modalContent');
    //div.innerHTML='';
    //div.innerHTML='<h2 class="textoPortada">Equipo '+team+'</h2>';
    modal('<h2 class="textoPortada">Equipo '+team+'</h2>');
    for (var i=0;i<Logos.length;i++)
    {
        let imgA = document.createElement('img');
        imgA.src=rutaLogo + Logos[i].Image;
        imgA.setAttribute('onclick', 'addLogo('+i+', '+team+');');
        imgA.setAttribute('class', 'nonSelected listalogos');
        imgA.setAttribute('alt', Logos[i].Name);
        imgA.setAttribute('title', Logos[i].Name);
        
        if (logo == i )  { imgA.setAttribute('class', 'selected listalogos') }
    
        //div.appendChild(imgA);
        modal(imgA,'append');
    }
    /*
    ver('modalContent');
    ver('myModal');*/
    
}

//Asignacion de Puntuacion
function setPunt1(id){
    punt1 = id;
}
function setPunt2(id){
    punt2 = id;
}

// Asignacion de Frags
function setFrag1(id){
    frag1 = id;
}
function setFrag2(id){
    frag2 = id;
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
    }else { ocultar('myModal');}

}

//Asignacion de Logo
function addLogo(id,team)
{
    if (team == 1 )
        logo1 = id;
    else
        logo2 = id;
    
    ocultar('myModal');

    let preview = document.getElementById('img_id'+team); //Seleccionamos la img del equipo
    preview.src = rutaLogo + Logos[id].Image;
    ver('img_id'+team);
     
}



//************************//
// Funcionalidad canvas			
//************************//
// Primera configuracion del canvas
function startPanel() {
	myCanvasArea = loadCanvas('myCanvas');
}


// Genera el canvas
function loadCanvas(id) {
    
    let canvas;
    let div = document.getElementById(id); 
    
    if (document.getElementById('CanvasLayer') === null)
    {
	    canvas = document.createElement('canvas');
	    canvas.id = "CanvasLayer";

	    div.appendChild(canvas);
    }
    else
       canvas = document.getElementById('CanvasLayer');
    
    canvas.width  = posEstilos[estilo].back.h;
    canvas.height = posEstilos[estilo].back.w;
    canvas.style.zIndex   = 8;
    //canvas.style.border   = "1px solid";
    canvas.context = canvas.getContext("2d");
    
	return canvas;
}

function cleanCanvas() {
    let canvas1=document.getElementById('CanvasLayer');
    let ctx=canvas1.getContext("2d");
    //ctx.clearRect(0, 0, canvas1.width, canvas1.height);
    ctx.clearRect(0, 0, myCanvasArea.width, myCanvasArea.height);

}


 

// Carga un componente en el canvas
function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }else {
	    //this.image = new Image();
        this.image = color;
	}
    this.width = width;
    this.height = height;
    this.speedX = 0;
    this.speedY = 0;    
    this.x = x;
    this.y = y;    
    this.update = function() {
        ctx = myCanvasArea.context;
        if (type == "image") {
            ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.width, this.height);
        }else if (type == "file") 
		{
			ctx.drawImage(this.image, 
                this.x, 
                this.y,
                this.width, this.height);
		}
		else{
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    };
}

//Actualizar el canvas
function updatePanel() { 
    ocultar('modalContent');
    ver('myCanvas'); 
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
/*
                drawLogos();
            
                drawAristos();
              
                drawVersus();
               
                //drawFront();
                
                drawPuntuacion();*/

	
}

//Dibuja el Fondo en el canvas
function drawFondo(){
    let logo;
    let preview;
    let x,y;

    preview = document.getElementById('img_id3'); 
  
    //Seleccionamos la img del equipo
    if (preview.src.length > 1000)
    {
        background = new Image();
        background.src = preview.src;
        myBackground = new component(posEstilos[estilo].back.h, posEstilos[estilo].back.w, logo, posEstilos[estilo].back.x, posEstilos[estilo].back.x, "file");
        myBackground.update();
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
    let fontFamily = '"SFSportsNight"';
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

//************************//
// Fichero Generado			
//************************//
//Funcion para descargar el fichero genrado
function download() {
var download = document.getElementById("download");
var image = document.getElementById("CanvasLayer").toDataURL("image/png")
    .replace("image/png", "image/octet-stream");
download.setAttribute("href", image);

}


function init(){
    loadEstilos();
    loadVersus();
    loadFondos();
    ocultar('preloadFont');
}

function preloadImages(id){
    for (var i=0;i<Aristos.length;i++)
    {
        let imgA = document.createElement('img');
        imgA.src=rutaImg + posEstilos[id].imgPref + Aristos[i].Image;
        imgA.setAttribute('style', 'display:none');
        
    }
}


function fileValidation(filename){
   
    var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
    if(!allowedExtensions.exec(filename)){
        modal('<h2 class="textoPortada">Please upload file having extensions .jpeg/.jpg/.png/.gif only.</h2>');
        return false;
    }else{
       return true;
    }
}

