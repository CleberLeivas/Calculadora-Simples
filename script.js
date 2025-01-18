document.addEventListener("DOMContentLoaded", function () {
    document.getElementById('valor').focus();

    // // Configuração do flatpickr
    // flatpickr("#data", {
    //     dateFormat: "d-m-Y", // Define o formato da data
    //     allowInput: true // Permite a entrada manual da data
    // });

    // Adicionar registro
    document.getElementById("formRegistro").addEventListener("submit", function (event) {
        event.preventDefault(); // Evita que o formulário seja enviado

        // Captura os valores do formulário
        var valor = document.getElementById("valor").value;
        // var data = document.getElementById("data").value;

        // Validação de entrada
        if (isNaN(valor) || valor.trim() === "" || parseFloat(valor) <= 0) {
            alert("Por favor, insira um valor numérico válido.");
            return;
        }
        
        // Adiciona os valores à tabela
        var tabela = document.getElementById("tabelaRegistros").getElementsByTagName("tbody")[0];
        var newRow = tabela.insertRow();
        var cell1 = newRow.insertCell(0);
        var cell2 = newRow.insertCell(1);
        // var cell3 = newRow.insertCell(2);
        cell1.innerHTML = tabela.rows.length;
        cell2.innerHTML = parseFloat(valor).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
        // cell3.innerHTML = data;

        // Limpa os campos do formulário
        document.getElementById("valor").value = "";
        // document.getElementById("data").value = "";

        setTimeout(function() {
            document.getElementById('valor').focus();
        }, 100); // Atraso de 100 milissegundos
        
    });

    // Calcular totais
    document.getElementById("btnCalcular").addEventListener("click", function () {
        calcularTotal();
    });
});

function calcularTotal() {
    var tabela = document.getElementById("tabelaRegistros").getElementsByTagName("tbody")[0];
    var total = 0;

    // Calcula o total dos valores na tabela
    for (var i = 0; i < tabela.rows.length; i++) {
        var valorTexto = tabela.rows[i].cells[1].innerText.replace(/[^\d,-]/g, '').replace(',', '.');
        total += parseFloat(valorTexto);
    }

    // Calcula os dízimos, primícias e ofertas
    var dizimo = total * 0.10;
    var primicia = (total / 30) * 1; // Ajuste conforme necessário
    var oferta = total * 0.05;

    // Atualiza o conteúdo da div com o total
    var totalContainer = document.getElementById("totalContainer");
    totalContainer.innerHTML = "Total: " + total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

    // Seleciona as divs para exibir os resultados
    var resultadoDizimo = document.getElementById("resultadoDizimo");
    var resultadoPrimicia = document.getElementById("resultadoPrimicia");
    var resultadoOferta = document.getElementById("resultadoOferta");
    var somaDosTotais = document.getElementById("somaDosTotais");

    // Atualiza o conteúdo de cada div com o resultado do cálculo
    resultadoDizimo.textContent = "Seu Dízimo será de: " + dizimo.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    resultadoPrimicia.textContent = "Sua Primícia será de: " + primicia.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    resultadoOferta.textContent = "Sua Oferta será de: " + oferta.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

    // Calcula a soma dos totais
    var somaTotal = dizimo + primicia + oferta;

    // Exibe a soma dos totais
    somaDosTotais.textContent = "Soma dos Totais: " + somaTotal.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

