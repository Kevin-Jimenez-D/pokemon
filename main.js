/* //Una prueba
let myPikachu = document.querySelector("#myPikachu");
    
myPikachu.addEventListener("click", async()=>{
    Swal.fire('Any fool can use a computer');
})
*/


//Mismo nombre de la variable que en el HTML para no confundirme
let myPikachu = document.querySelector("#myPikachu");

//Es el boton donde saldrán los demas pokemones
let pokemones= document.querySelector("#pokemones");

myPikachu.addEventListener("click", async()=>{
    //De la pagina "https://pokeapi.co/" por defecto aparece pokemon y en /ditto se coloca pikachu
    //Traiga la peticion, por ejemplo 202, lo convierte a JSON y traiga esos datos
    let res= await (await fetch("https://pokeapi.co/api/v2/pokemon/pikachu")).json();

    //En la pagina "https://pokeapi.co/" se va al apartado sprites -> front_default -> la imagen del pikachu
    let img= res.sprites.front_default;
    let defaultImg = "https://media.tenor.com/OPhGGLtFqLQAAAAC/pokeball.gif";

    // lo del swal es lo de la página "https://sweetalert2.github.io/"
    //En la parte del name, en el link de la api, el name es un apartado principal, entonces solo se debe colocar name
    //Donde aparece el ? es un condiciona, si la imagen aparece la coloca, sino coloca la de por default
    //Se hace el mapeo porque son varios datos, deseo hacer iteración y que me genere nuevos datos sin alterar el inicial, se usa map
    //Los input serán de tipo rango y en la parte del valor sera de los datos mapeados, 
    //Los labels mostraran el numero y luego la caracteristica, HP y attack, etc
    //Salto de linea con br y que los una con el .join en el HTML
    //Imagenes al 80%
    Swal.fire({
        title: `${res.name}`,
        text: 'Modal with a custom image.',
        imageUrl: `${(img) ? img:defaultImg}`,
        html:
        `
        ${res.stats.map(data =>`
        <input type="range" value="${data.base_stat}">
        <label>
            <b>${data.base_stat}</b>
            <b>${data.stat.name}</b>
        </label>
        <br>`).join("")}
        `,
        imageWidth: "80%",
        imageHeight: "80%",
      })
})


//Todas las acciones relacionadas con el boton addEventListener de los pokemones
