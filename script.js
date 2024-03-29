var listaPeliculas = [];
var listaTrailers = [];
var listaNombresPeliculas = [];
var yearList = [];

function validarAnio(anio) {
  var regex = /^\d{4}$/;
  return regex.test(anio);
}

function validarURL(url) {
  var regex = /\.(jpeg|jpg|gif|png)$/i;
  return regex.test(url);
}

function agregarPelicula() {
  var nombrePelicula = document.getElementById('nombre').value;
  var anio = document.getElementById('year').value;
  var urlPelicula = document.getElementById('pelicula').value;
  var urlTrailer = document.getElementById('trailer').value;

  if (!validarAnio(anio)) {
    alert("Por favor ingresa un año válido de 4 dígitos.");
    return;
  }

  if (!validarURL(urlPelicula)) {
    alert("Por favor ingresa una URL de imagen válida (jpeg, jpg, gif, png).");
    return;
  }

  if (urlTrailer.includes("https://youtu.be/")) {
    alert("Por favor ingresa una URL de trailer válida. <br> No agregar https://youtu.be/ ");
    return;
  }

  document.getElementById('mensajeDeError').innerHTML = '';
  listaPeliculas.push(urlPelicula);
  listaTrailers.push(urlTrailer);
  listaNombresPeliculas.push(nombrePelicula);
   yearList.push(anio);

  limpiarCampos();
  recargarPeliculas();
}

    function recargarPeliculas() {
      var elementoListaPeliculas = document.getElementById('listaPeliculas');
      elementoListaPeliculas.innerHTML = '';
      
      for (var i = 0; i < listaPeliculas.length; i++) {
        
        var peliculaImagen = `
          <img src="${listaPeliculas[i]}" style="width: 30%;" onclick="mostrarTrailer('${listaTrailers[i]}')">
          <p>${listaNombresPeliculas[i]} <br> Año: ${yearList[i]}</p>
          <a href="#" onclick="mostrarTrailer('${listaTrailers[i]}')" style="color: white;">Ver trailer</a>
        `;
        elementoListaPeliculas.innerHTML += `
          <div>
        ${peliculaImagen}
        <div id="trailer${i}" style="display: none;">
          <iframe width="560" height="315" src="https://www.youtube.com/embed/${listaTrailers[i]}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
      </div>`;
      }
    }

    function mostrarTrailer(trailerURL) {
      var trailers = document.querySelectorAll('[id^="trailer"]');
      trailers.forEach(trailer => {
        trailer.style.display = "none";
      });
      var index = listaTrailers.indexOf(trailerURL);
      document.getElementById("trailer" + index).style.display = "block";
    }

    function eliminarPelicula() {
      var nombreEliminar = document.getElementById("nombreEliminar").value;
      var index = listaNombresPeliculas.indexOf(nombreEliminar);
      if (index === -1) {
        window.alert("La película escrita no se encuentra en el catálogo");
      } else {
        listaPeliculas.splice(index, 1);
        listaTrailers.splice(index, 1);
        listaNombresPeliculas.splice(index, 1);
        yearList.splice(index, 1);
        recargarPeliculas();
      }
    }

    function limpiarCampos() {
      document.getElementById('nombre').value = '';
      document.getElementById('year').value = '';
      document.getElementById('pelicula').value = '';
      document.getElementById('trailer').value = '';
    }