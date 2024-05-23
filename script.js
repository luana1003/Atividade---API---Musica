//***VARIÁVEIS: INPUT DO USUÁRIO, BOTÃO DE PESQUISA, ÁREA DE DADOS DO ARTISTAS e VARIÁVEL COM O LINK DA API, RESPECTIVAMENTE***
const artistDataArea = document.getElementById("main__section__artists__area");
const userInput = document.getElementById("id_input");
const searchButton = document.getElementById("search__button"); 
const labelNomeArtista = document.querySelector("#nome__artista");
const urlAPI = "https://my-json-server.typicode.com/CallMeIkuyo/fakeapi";


//***TROCANDO A COR DE FUNDO DO HEADER QUANDO A PÁGINA É ROLADA***
window.addEventListener("scroll", function(){
    let cabecalho = document.querySelector("header")
    cabecalho.classList.toggle("rolagem", window.scrollY > 0)
})


//***CONFIGURANDO O BOTÃO DE PESQUISA, INTEGRANDO-O COM A API***
searchButton.addEventListener("click", () => {
  const artistName = userInput.value.trim();
  labelNomeArtista.innerText = "";
  fetch(`${urlAPI}/db`)
    .then(response => response.json())
    .then(data => {
      showArtistData(data, artistName);
    })
    .catch(error => {
      console.error('Erro ao buscar dados:', error);
      labelNomeArtista.innerText = "Erro ao buscar dados!";
    });
});



//***FUNÇÃO PARA MOSTRAR OS DADOS DO ARTISTA NA TELA***
function showArtistData(data, artistName) {
  let found = false;
  for (let i = 0; i < data.artistas.length; i++) {
    if (data.artistas[i].nome.toLowerCase() === artistName.toLowerCase()) {
      artistDataArea.style.display = "block";
      labelNomeArtista.innerText = `Nome: ${data.artistas[i].nome}\n\nIdade: ${data.artistas[i].idade}\n\nNacionalidade: ${data.artistas[i].nacionalidade}\n\nGênero musical: ${data.artistas[i].genero}\n\nMúsica famosa: ${data.artistas[i].musica_famosa}`;
      found = true;
      break;
    }
  }

  if (!found) {
    artistDataArea.style.display = "block";
    labelNomeArtista.innerText = "Nenhum resultado!";
  }
}



