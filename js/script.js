let veiculos = [
    {id: 1, nome: "", modelo: "", placa: "", periodo: 0, numero: 0, horario: 0},
    {id: 2, nome: "", modelo: "", placa: "", periodo: 0, numero: 0, horario: 0},
    {id: 3, nome: "", modelo: "", placa: "", periodo: 0, numero: 0, horario: 0},
    {id: 4, nome: "", modelo: "", placa: "", periodo: 0, numero: 0, horario: 0}
]

const nome = document.querySelector('#nome');
const modelo = document.querySelector('#modelo');
const placa = document.querySelector('#placa');
const periodo = document.querySelector('#periodo');
const alertar = document.querySelector('#alertar');
const mensagem = document.querySelector('#mensagem');
const vaga1 = document.querySelector('#vaga1-link');
const vaga2 = document.querySelector('#vaga2-link');
const vaga3 = document.querySelector('#vaga3-link');
const vaga4 = document.querySelector('#vaga4-link');

let conteudo;
let vagaN;
let vagaD = 0; 
let placas = [];
let permissao = [];
let permitido = true;  

function verificarVaga(v) {
    for (var i = 0; i < v.length; i++) {
      if(v[i] == placa.value)
        permitido = false
    }
  }

function vagaEs(x) {
    vagaD = x;
    if (vagaD == 1) {
        vagaN = document.querySelector('#vaga1')
        conteudo = vaga1
        vaga1.style.background = "#dc3545";
        vaga2.style.background = "#f8d7da";
        vaga3.style.background = "#f8d7da";
        vaga4.style.background = "#f8d7da";
    } else if (vagaD == 2) {
        vagaN = document.querySelector('#vaga2')
        conteudo = vaga2
        vaga2.style.background = "#dc3545";
        vaga1.style.background = "#f8d7da";
        vaga3.style.background = "#f8d7da";
        vaga4.style.background = "#f8d7da";
    } else if (vagaD == 3) {
        vagaN = document.querySelector('#vaga3')
        conteudo = vaga3
        vaga3.style.background = "#dc3545";
        vaga1.style.background = "#f8d7da";
        vaga2.style.background = "#f8d7da";
        vaga4.style.background = "#f8d7da";
    } else if (vagaD == 4) {
        vagaN = document.querySelector('#vaga4')
        conteudo = vaga4
        vaga4.style.background = "#dc3545";
        vaga1.style.background = "#f8d7da";
        vaga3.style.background = "#f8d7da";
        vaga2.style.background = "#f8d7da";
    }
}

function reservar() {
    let data = moment();
    data.add(periodo.value, "minutes")
    verificarVaga(placas);
    let VagaHTML =  '<a href="#" class="col-12 col-sm-12 col-md-6 col-lg-6 col-xl-3 list-group-item list-group-item-action h-100">' +
                    `<h3 class="m-1">Vaga ${vagaD}</h3>` +
                    '<hr>' +
                    '<p class="m-0">Nome</p>' +
                    `<small><strong>${nome.value}</strong></small>` + 
                    '<p class="m-0">Modelo do veículo</p>' + 
                    `<small><strong>${modelo.value}</strong></small>` +
                    '<p class="m-0">Placa do veículo</p>' +
                    `<small><strong>${placa.value}</strong></small>` + 
                    '<p class="m-0">Período</p>' +
                    `<small><strong>${periodo.value/60} hora(s)</strong></small>` + 
                    '<hr>' + 
                    '<p class="m-0">Hórario de saída</p>' + `<small><strong> ${data.format("DD/MM/YYYY")}</strong></small></br>`+
                    `<small><strong>${data.format("HH:mm")} hrs</strong></small>` +
                    '</a>';
    if (nome.value.length == 0) {
        Swal.fire({
            icon: 'error',
            title: 'Erro!',
            text: 'Digite o seu nome!',
        })
    } else if (modelo.value.length == 0) {
        Swal.fire({
            icon: 'error',
            title: 'Erro!',
            text: 'Digite o modelo do veículo!',
        })
    }else if (placa.value.length == 0) {
        Swal.fire({
            icon: 'error',
            title: 'Erro!',
            text: 'Digite a placa do veículo!',
        })
    }else if (periodo.value == 0) {
        Swal.fire({
            icon: 'error',
            title: 'Erro!',
            text: 'Selecione um período!',
        })
    } else if (placas.length == 4) {
        Swal.fire({
            icon: 'error',
            title: 'Erro!',
            text: 'Nenhuma vaga disponivel!',
        })
    } else if (vagaD == 0) {
        Swal.fire({
            icon: 'error',
            title: 'Erro!',
            text: 'Selecione uma vaga!',
        })
    } else if (permissao[vagaD] == true) {
        Swal.fire({
            icon: 'error',
            title: 'Erro!',
            text: 'Está vaga já esta sendo utilizada!',
        })
    } else if (permitido == false) {
        Swal.fire({
            icon: 'error',
            title: 'Erro!',
            html: `O veículo da placa <b>${placa.value}</b> já está em uma vaga!`,
        })
        permitido = true;
    } else {
        conteudo.style.display = "none";
        let posicao = vagaD - 1;
        veiculos[posicao].nome = nome.value;
        veiculos[posicao].modelo = modelo.value;
        veiculos[posicao].placa = placa.value;
        veiculos[posicao].periodo = Number(periodo.value/60);
        veiculos[posicao].numero = vagaD;
        veiculos[posicao].horario = data.format("HH:mm");
        permissao[veiculos[posicao].numero] = true;
        placas.push(veiculos[posicao].placa);
        vagaN.innerHTML = VagaHTML;
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: `A vaga ${vagaD} foi reservado com sucesso!`,
            showConfirmButton: false,
            timer: 2500
          })
        vagaD, posicao = 0;
    }
}
