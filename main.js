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
    Swal.fire({
        //En la parte del name, en el link de la api, el name es un apartado principal, entonces solo se debe colocar name
        title: `${res.name}`,
        text: 'Modal with a custom image.',
        
        //Donde aparece el ? es un condiciona, si la imagen aparece la coloca, sino coloca la de por default
        imageUrl: `${(img) ? img:defaultImg}`,
        html:
        //Se hace el mapeo porque son varios datos, deseo hacer iteración y que me genere nuevos datos sin alterar el inicial, se usa map
        //Los input serán de tipo rango y en la parte del valor sera de los datos mapeados, 
        //Los labels mostraran el numero y luego la caracteristica, HP y attack, etc
        //Que los una con el .join en el HTML
        `
        <form>
            ${res.stats.map(data =>`
            <div>
                <input type="range" value="${data.base_stat}" name="${data.stat.name}"/>
                <label data-name="${data.stat.name}">
                    <b>${data.base_stat}</b>
                    ${data.stat.name}
                </label>
            </div>
            `).join("")}
            <input type="submit" value="Enviar"/>
        </form>
        `,
        //Imagenes al 80%
        imageWidth: "80%",
        imageHeight: "80%",
      })
      let myContainer = document.querySelector("#swal2-html-container");
      myContainer.addEventListener("input", (e)=>{
        let myLabel=e.target.nextElementSibling;
        myLabel.innerHTML=`<b>${e.target.value}</b> ${myLabel.dataset.name}`
      })  
})


//Todas las acciones relacionadas con el boton addEventListener de los pokemones
