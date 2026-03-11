// LISTA DE PALAVRAS
const palavras = [
    "gato","cachorro","tigre","leao","zebra","macaco","elefante","girafa",
    "cavalo","vaca","ovelha","porco","coelho","rato","hamster","leopardo",
    "hiena","panda","urso","raposa","lobo","camelo","canguru","ornitorrinco",
    "baleia","tubarao","golfinho","foca","pinguim","aguia","coruja",
    "galinha","galo","pato","peru"
    ]
    
    // VARIÁVEIS
    let palavraSecreta = ""
    let palavraOculta = []
    let tentativasRestantes = 6
    let letrasUsadas = []
    
    // ELEMENTOS HTML
    const palavraElemento = document.querySelector(".palavra")
    const input = document.querySelector("#letra")
    const botaoTentar = document.querySelector(".tentar")
    const tentativasTexto = document.querySelector(".status strong")
    const letrasUsadasTexto = document.querySelector(".letras")
    const botaoComecar = document.querySelector(".comecar")
    
    // INICIAR JOGO
    function iniciarJogo(){
    
        palavraSecreta = palavras[Math.floor(Math.random() * palavras.length)].toUpperCase()
    
        palavraOculta = []
    
        for(let i = 0; i < palavraSecreta.length; i++){
            palavraOculta.push("_")
        }
    
        tentativasRestantes = 6
        letrasUsadas = []
    
        atualizarTela()
    }
    
    // ATUALIZAR TELA
    function atualizarTela(){
    
        palavraElemento.innerHTML = ""
    
        palavraOculta.forEach(letra => {
            const span = document.createElement("span")
            span.textContent = letra
            palavraElemento.appendChild(span)
        })
    
        tentativasTexto.textContent = tentativasRestantes
        letrasUsadasTexto.textContent = letrasUsadas.join(" ")
    }
    
    // VERIFICAR LETRA
    function tentarLetra(){
    
        const letra = input.value.toUpperCase()
    
        input.value = ""
    
        if(letra === "" || !/[A-Z]/.test(letra)){
            return
        }
    
        if(letrasUsadas.includes(letra)){
            alert("Você já usou essa letra!")
            return
        }
    
        letrasUsadas.push(letra)
    
        if(palavraSecreta.includes(letra)){
    
            for(let i = 0; i < palavraSecreta.length; i++){
    
                if(palavraSecreta[i] === letra){
                    palavraOculta[i] = letra
                }
    
            }
    
        }else{
    
            tentativasRestantes--
    
        }
    
        verificarFim()
        atualizarTela()
    }
    
    // VERIFICAR FIM DO JOGO
    function verificarFim(){
    
        if(!palavraOculta.includes("_")){
            alert("🎉 Você venceu!")
            input.disabled = true
            botaoTentar.disabled = true
        }
    
        if(tentativasRestantes === 0){
            alert("❌ Você perdeu! A palavra era: " + palavraSecreta)
            input.disabled = true
            botaoTentar.disabled = true
        }
    }
    
    // EVENTOS
    botaoTentar.addEventListener("click", tentarLetra)
    
    botaoComecar.addEventListener("click", () => {
    
        input.disabled = false
        botaoTentar.disabled = false
    
        iniciarJogo()
    })