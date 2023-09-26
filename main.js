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
    //Son 1017 pokemons
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
pokemones.addEventListener("click", async()=>{
    //De la pagina "https://pokeapi.co/" por defecto aparece pokemon y en /ditto se coloca pikachu
    //Traiga la peticion, por ejemplo 202, lo convierte a JSON y traiga esos datos
    //Son 1017 pokemons, si se le cambia el ultimo / por el numero, trae cada uno de los pokemons
    //Que empiece por defecto en 1
    let res= await (await fetch("https://pokeapi.co/api/v2/pokemon/5")).json();

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
            <input id="enviarJSON" type="submit" value="Enviar"/>
        </form>
        `,
        //Imagenes al 80%
        imageWidth: "80%",
        imageHeight: "80%",
      })
      //Esa id es la que selecciono en el HTML, cuando me alumbre el di que contiene la barrita de rango, el numero y la habilidad
      let myContainer = document.querySelector("#swal2-html-container");
      //Cuando detecte como un cambio en el input
      myContainer.addEventListener("input", (e)=>{

        //Cambia el elemento hermano, por eso el nextElementSibling
        let myLabel=e.target.nextElementSibling;

        //Que se agregue al HTML su valor y a que caracteristica pertenen, vida, ataque, etc, esto son los valores que van cambiando
        myLabel.innerHTML=`<b>${e.target.value}</b> ${myLabel.dataset.name}`

        console.log(res.name);               //Guarda el nombre
        console.log(myLabel.dataset.name);   //Guarda el nombre de la habilidad
        console.log(e.target.value);         //Guarda el valor de la habilidad como numerico

        //let mockapi = "https://6512485eb8c6ce52b3957baa.mockapi.io/pokemon"




        let enviarJSON = document.querySelector("#enviarJSON");
        //coloco mousedown para ver que si esta en la consola, pero en realidad solo sera click
        enviarJSON.addEventListener("mousedown",async()=>{
        /*
        console.log(res.name);
        console.log(res.stats);
        console.log(res.stats[0]);   //es del 0 al 5
        */
        console.log(res.name);               //Guarda el nombre
        console.log(myLabel.dataset.name);   //Guarda el nombre de la habilidad
        console.log(e.target.value);         //Guarda el valor de la habilidad como numerico

        const dataToSend = {
            name: res.name,  // Nombre del Pokémon
        };
    
        // Recorre las características y sus valores
        res.stats.forEach(data => {
            const statName = data.stat.name;
            const statValue = parseFloat(myContainer.querySelector(`input[name='${statName}']`).value);
            
            // Agrega la característica y su valor al objeto de datos a enviar
            dataToSend[statName] = statValue;
        });
    
        // URL de la API MockAPI
        const mockapiUrl = "https://6512485eb8c6ce52b3957baa.mockapi.io/pokemon";
    
        // Configuración para la solicitud POST
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dataToSend),
        };
    
        try {
            // Envía los datos al servidor MockAPI
            const response = await fetch(mockapiUrl, requestOptions);
    
            if (response.ok) {
                // Si la solicitud fue exitosa, muestra un mensaje
                Swal.fire("Éxito", "Datos enviados correctamente a MockAPI", "success");
            } else {
                // Si hubo un error en la solicitud, muestra un mensaje de error
                Swal.fire("Error", "Error al enviar los datos a MockAPI", "error");
            }
        } catch (error) {
            // En caso de error en la solicitud, muestra un mensaje de error
            Swal.fire("Error", "Error al enviar los datos a MockAPI", "error");
        }
        })

    })  
})