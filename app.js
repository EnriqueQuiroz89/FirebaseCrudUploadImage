// Initialize Cloud Firestore through Firebase
firebase.initializeApp({
    apiKey: "AIzaSyC7IxVax8cZ5eLwEhlHE5leNVlX7TBUIQ0",
    authDomain: "firestorecrud-f8226.firebaseapp.com",
    projectId: "firestorecrud-f8226"
  });
  
  var db = firebase.firestore();


function guardar(){
/*para pasar los datos de los input a las variables
ocupamos el DOM */

  var nombre = document.getElementById('nombre').value;
  var apellido = document.getElementById('apellido').value;
  var fecha = document.getElementById('fecha').value;

 //aAgregar Documentos
 //Si tu quieres una nueva coleccion basta con cambiar el nombre

 db.collection("personas").add({
    first: nombre,
    last: apellido,
    born: fecha        })
.then(function(docRef){ /*Aqui se indica que pasara si hay exito*/

  console.log("Document written ID ",docRef.id);
  /**Limpiamos los campos de los input*/
      document.getElementById('nombre').value='';
      document.getElementById('apellido').value= '';
      document.getElementById('fecha').value='';    
  
                  })
.catch(function(error){  /*Aqui se indica que pasara si hay falla*/
console.error("Error adding docuemnt: ", error)
});

}

//leer documentos
var tabla = document.getElementById('tabla');


 /*Aqui se reemplazo el get() por snapshot()*/
 /**Snapshot debe eeliminar el then*/
 db.collection("personas").onSnapshot((querySnapshot) => {
  //Se limpia la tabla antes de renderizar los elementos una vez mas
  tabla.innerHTML= ''
  
  querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().first}`);
      
      ;
        /**Aqui vamos ir pintado los docuemntos uno a uno */
      tabla.innerHTML +=
      `<tr>
          <th scope="row">${doc.id}</th>
          <td>${doc.data().first}</td>
          <td>${doc.data().last}</td>
          <td>${doc.data().born}</td>
          <td><button class="btn btn-danger" onclick="eliminar('${doc.id}')">Eliminar</button></td>
          <td><button class="btn btn-warning" onclick="editar('${doc.id}','${doc.data().first}','${doc.data().last}','${doc.data().born}')">Editar</button></td>
        </tr> `   /**Aqui arriba enviamos 4 parametros */
     })
});

//borrar documentos
// el parametro id determina que fila se va a eliminar
function eliminar(id){
db.collection("personas").doc(id).delete().then(function() {
  console.log("Document successfully deleted!");
}).catch(function(error) {
  console.error("Error removing document: ", error);
});
}


 //funcion para editar 

function editar(id, nombre, apellido , fecha){

  document.getElementById('nombre').value=  nombre;
  document.getElementById('apellido').value= apellido ;
  document.getElementById('fecha').value=  fecha;  

  //las lineas producen que el texto del boton se cambie
  var boton = document.getElementById('boton');
  boton.innerHTML = 'Guardar cambios'

  //Al hacer click en el boton lo que esta en los campos reemplazara lo que exista en tal documento
boton.onclick = function() // Esto es una funcion anonima
              {

                var updateDocument = db.collection("personas").doc(id);

                var nombre = document.getElementById('nombre').value;
                var apellido = document.getElementById('apellido').value;
                var fecha = document.getElementById('fecha').value; 



                // Set the "capital" field of the city 'DC'
                return updateDocument.update({
                  first: nombre,
                  last: apellido,
                  born: fecha     
                })
                .then(function() {
                    console.log("Document successfully updated!");
                    boton.innerHTML= 'Guardar ';
              

                      /**Limpiamos los campos de los input*/
                 document.getElementById('nombre').value='';
                 document.getElementById('apellido').value= '';
                 document.getElementById('fecha').value='';    

                })
                .catch(function(error) {
                    // The document probably doesn't exist.
                    console.error("Error updating document: ", error);
                });
                 



              };


  

}

