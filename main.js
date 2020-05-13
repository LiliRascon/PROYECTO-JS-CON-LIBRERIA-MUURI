//inicializando la libreria muuri para mi grid

// redondeo  -  booleano
// Valor por defecto: true.
// Cuando truelas dimensiones de los elementos se redondearán automáticamente para los cálculos de diseño utilizando Math.round(). Establecer para falseusar dimensiones precisas. En la práctica, desearía deshabilitar esto si está utilizando valores de dimensión relativos para elementos (%, em, rem, etc.). Si ha definido las dimensiones del elemento con valores de píxeles (px), se recomienda que deje esto activado.
const grid = new Muuri('.grid', {
   layout: {
      rounding: false
   }
});
//aqui hago una funcion que se ejecuta cuando la ventana carga completamente hago esto para utilizar un metodo de Muuri, de aquí me voy a la documentación de la librería Muuri, exactamente a Grid Metods y buscamos unos que se llama grid.refreshItems() que es es que voy a usar, que para lo que sirve es que vuelve a calcular el tamaño de cada uno de los elementos para que sea adaptable a dispositivos (responsive)
window.addEventListener('load', () => {
   grid.refreshItems().layout(); // este metodo es para 
   document.getElementById('grid').classList.add('imagenes-cargadas');

   //ahora voy agragar el código para la parte de filtrado
   //lo primero que haré es acceder a cada uno de ellos (todos, naturaleza, etc) y les quiero poner un eventlistener 
   // lo que hago es declarar una constante que se llame enlaces y con document.querySelectorAll accedo a todos por el id categorias y que sean los enlaces o sea las a.   de esta forma le digo a mi index.html quiero que me traigas del identificador id categorias todos los enlaces  y los guardo dentro de la variable enlace

   const enlaces = document.querySelectorAll('#categorias a');
   // ahora como ya los tengo en una lista, lo que puedo hacer es iterar sobre ellos , con un ciclo foreach, y dentro de ese metodo foreach le puedo passar una funcion  de tipo flecha de ES6, y dentro del parentesis pongo el elemento de cada uno de los enlaces, y le digo, por cada uno de los enlaces, quiero que me ejecutes el codigo que te paso dentro de la funcion

   enlaces.forEach((elemento) => {
      //console.log(elemento);
      elemento.addEventListener('click', (evento) => {
         evento.preventDefault();// con esto evito el comportamiento que tiene por defecto el navegador
         //console.log(evento.target);//esto lo hago para saber que está accediendo al elemento de categorias que estoy clickando
         //y hago eso para poner un classList y agregar la clase activo
         enlaces.forEach((enlace) => enlace.classList.remove('activo'));
         evento.target.classList.add('activo');
         //ahora lo que tengo que hacer es revisar cada categoría y quitarle la clase activo puesto que solo lo debe llevar uno, y lo hago con un remove, esto lo hago antes de agregar la clase por eso lo pondré mas arriba, justo antes de classList.add y le voy a decir, busca en enlaces, y para cada enlace quitale la clase activo.


         //ahora voy hacer el filtrado con la libreria, para esto existe otro metodo que me trae la categoria, tenemos el metodo grid.filter este nos trae los elementos que cumplen con la caracteristica que nosotros queremos por ejemplo
         const categoria = evento.target.innerHTML.toLowerCase();
         categoria === 'todos' ? grid.filter('[data-categoria]') : grid.filter(`[data-categoria="${categoria}"]`);
         //console.log(categoria);
      });
   });

   // Agregamos el listener para la barra de busqueda
      //grid.filter nos permite mostrar solo los elementos que cumplan con las caracteristicas "item.getElement().dataSet.etiquetas.includes(busqueda)" por eso es que le pasamos una funcion, la funcion debe llevar el parametro de item, que lo que hace es que por cada uno de los items, de los item de la grid obvio, y ejecuta el siguiente codigo "item.getElement().dataSet.etiquetas.includes(busqueda)", y esto significa, accede a la imagen(item), al elemento de la imagen(getElement) despues obtenemos el dataset de las etiquetas y si las etiquetas incluyen(includes) la busqueda que justo teniamos antes "const busqueda = evento.target.value;" entonces la va mostrar

	document.querySelector('#barra-busqueda').addEventListener('input', (evento) => {
		const busqueda = evento.target.value;
		grid.filter( (item) => item.getElement().dataset.etiquetas.includes(busqueda) );
	});
  
 
  


   //agrego un listener para las imagenes
   const overlay = document.getElementById('overlay');
	document.querySelectorAll('.grid .item img').forEach((elemento) => {


		elemento.addEventListener('click', () => {
			const ruta = elemento.getAttribute('src');
			const descripcion = elemento.parentNode.parentNode.dataset.descripcion;

			overlay.classList.add('activo');
			document.querySelector('#overlay img').src = ruta;
			document.querySelector('#overlay .descripcion').innerHTML = descripcion;
		});
   });
   //eventListener del boton de cerrar
   document.querySelector('#btn-cerrar-popup').addEventListener('click', () => {
      overlay.classList.remove('activo');
   });

   //eventListener también para el overlay por si clickan fuera del boton
   //lo hago con un ternario para controlar que si clicka en la imagen no se cierre unicamente cuando presiona lo negro del overlay
   //pongo un id porque overlay si tiene id y la imagen no tiene, si hago un console log veré como me trae solo el overlay y no la img o txt
   overlay.addEventListener('click', (e) => {
      e.target.id === overlay ? overlay.classList.remove('activo') : '';      
   });

 });

