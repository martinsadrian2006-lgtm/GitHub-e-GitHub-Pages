const equipamentos = [

    {
        id: 1,
        nome: "Notebook Dell",
        categoria: "Informática",
        descricao: "Notebook para aulas e trabalhos."
    },

    {
        id: 2,
        nome: "Projetor Epson",
        categoria: "Audiovisual",
        descricao: "Projetor para apresentações."
    },

    {
        id: 3,
        nome: "Tablet Samsung",
        categoria: "Informática",
        descricao: "Tablet para atividades e pesquisas."
    },

    {
        id: 4,
        nome: "Caixa de Som",
        categoria: "Audiovisual",
        descricao: "Caixa de som para apresentações."
    },

    {
        id: 5,
        nome: "Kit Arduino",
        categoria: "Laboratório",
        descricao: "Kit para atividades de programação."
    },

    {
        id: 6,
        nome: "Webcam",
        categoria: "Informática",
        descricao: "Webcam para aulas online."
    }

];


let reservas = [];


const listaEquipamentos =
    document.getElementById("lista-equipamentos");

const busca =
    document.getElementById("busca");

const categoria =
    document.getElementById("categoria");

const estadoVazio =
    document.getElementById("estado-vazio");

const selectEquipamento =
    document.getElementById("equipamento");

const formulario =
    document.getElementById("form-reserva");

const listaReservas =
    document.getElementById("lista-reservas");

const semReservas =
    document.getElementById("sem-reservas");


/* VERIFICA SE O EQUIPAMENTO ESTÁ RESERVADO */

function estaReservado(id) {

    return reservas.some(function(reserva) {

        return reserva.equipamentoId === id;

    });

}


/* MOSTRAR EQUIPAMENTOS */

function mostrarEquipamentos() {

    const texto =
        busca.value.toLowerCase();

    const filtro =
        categoria.value;


    listaEquipamentos.innerHTML = "";


    const resultados =
        equipamentos.filter(function(equipamento) {

            const nome =
                equipamento.nome.toLowerCase();

            const descricao =
                equipamento.descricao.toLowerCase();


            const encontrouTexto =
                nome.includes(texto) ||
                descricao.includes(texto);


            const encontrouCategoria =
                filtro === "todas" ||
                equipamento.categoria === filtro;


            return encontrouTexto &&
                   encontrouCategoria;

        });


    if (resultados.length === 0) {

        estadoVazio.style.display = "block";

        return;

    }


    estadoVazio.style.display = "none";


    resultados.forEach(function(equipamento) {

        const reservado =
            estaReservado(equipamento.id);


        const card =
            document.createElement("div");

        card.className = "card";


        card.innerHTML = `

            <h3>${equipamento.nome}</h3>

            <p>
                ${equipamento.categoria}
            </p>

            <p>
                ${equipamento.descricao}
            </p>

            <p class="${reservado ? "reservado" : "disponivel"}">

                ${reservado ? "Reservado" : "Disponível"}

            </p>

            <button
                type="button"
                ${reservado ? "disabled" : ""}
            >
                ${reservado ? "Indisponível" : "Reservar"}
            </button>

        `;


        const botao =
            card.querySelector("button");


        if (!reservado) {

            botao.addEventListener(
                "click",
                function() {

                    selectEquipamento.value =
                        equipamento.id;

                    document
                        .getElementById("reserva")
                        .scrollIntoView({
                            behavior: "smooth"
                        });

                }
            );

        }


        listaEquipamentos.appendChild(card);

    });

}


/* PREENCHER SELECT */

function preencherEquipamentos() {

    selectEquipamento.innerHTML = `

        <option value="">
            Selecione um equipamento
        </option>

    `;


    equipamentos.forEach(function(equipamento) {

        if (!estaReservado(equipamento.id)) {

            const option =
                document.createElement("option");

            option.value =
                equipamento.id;

            option.textContent =
                equipamento.nome;

            selectEquipamento.appendChild(option);

        }

    });

}


/* MOSTRAR RESERVAS */

function mostrarReservas() {

    listaReservas.innerHTML = "";


    if (reservas.length === 0) {

        semReservas.style.display =
            "block";

        return;

    }


    semReservas.style.display =
        "none";


    reservas.forEach(function(reserva) {

        const equipamento =
            equipamentos.find(function(item) {

                return item.id ===
                    reserva.equipamentoId;

            });


        const div =
            document.createElement("div");

        div.className =
            "reserva";


        div.innerHTML = `

            <div>

                <strong>
                    ${equipamento.nome}
                </strong>

                <p>
                    Responsável:
                    ${reserva.nome}
                </p>

                <p>
                    Data:
                    ${reserva.data}
                </p>

                <p>
                    Horário:
                    ${reserva.horario}
                </p>

            </div>

            <button
                class="botao-cancelar"
                type="button"
            >
                Cancelar reserva
            </button>

        `;


        const botao =
            div.querySelector("button");


        botao.addEventListener(
            "click",
            function() {

                cancelarReserva(
                    reserva.id
                );

            }
        );


        listaReservas.appendChild(div);

    });

}


/* CANCELAR RESERVA */

function cancelarReserva(id) {

    const confirmar =
        confirm(
            "Deseja cancelar esta reserva?"
        );


    if (!confirmar) {

        return;

    }


    reservas =
        reservas.filter(function(reserva) {

            return reserva.id !== id;

        });


    atualizarTela();

}


/* FAZER RESERVA */

formulario.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        const equipamentoId =
            Number(
                selectEquipamento.value
            );


        const nome =
            document
                .getElementById("nome")
                .value
                .trim();


        const data =
            document
                .getElementById("data")
                .value;


        const horario =
            document
                .getElementById("horario")
                .value;


        if (!equipamentoId ||
            !nome ||
            !data ||
            !horario) {

            alert(
                "Preencha todos os campos."
            );

            return;

        }


        if (nome.length < 3) {

            alert(
                "Digite um nome válido."
            );

            return;

        }


        if (estaReservado(equipamentoId)) {

            alert(
                "Esse equipamento já está reservado."
            );

            return;

        }


        const novaReserva = {

            id: Date.now(),

            equipamentoId:
                equipamentoId,

            nome:
                nome,

            data:
                data,

            horario:
                horario

        };


        reservas.push(
            novaReserva
        );


        formulario.reset();


        atualizarTela();


        alert(
            "Reserva realizada com sucesso!"
        );

    }
);


/* ATUALIZAR A PÁGINA */

function atualizarTela() {

    preencherEquipamentos();

    mostrarEquipamentos();

    mostrarReservas();

}


/* PESQUISA */

busca.addEventListener(
    "input",
    mostrarEquipamentos
);


/* FILTRO */

categoria.addEventListener(
    "change",
    mostrarEquipamentos
);


/* INICIAR */

atualizarTela();
