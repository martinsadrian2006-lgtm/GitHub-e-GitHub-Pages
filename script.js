/* ==============================
   EQUIPAMENTOS
================================ */

const equipamentos = [

    {
        id: 1,
        nome: "Notebook Dell",
        categoria: "Informática",
        descricao:
            "Notebook para aulas, trabalhos e apresentações."
    },

    {
        id: 2,
        nome: "Notebook Lenovo",
        categoria: "Informática",
        descricao:
            "Notebook para atividades escolares."
    },

    {
        id: 3,
        nome: "Notebook HP",
        categoria: "Informática",
        descricao:
            "Notebook para pesquisas e trabalhos."
    },

    {
        id: 4,
        nome: "Projetor Epson",
        categoria: "Audiovisual",
        descricao:
            "Projetor para apresentações e aulas."
    },

    {
        id: 5,
        nome: "Projetor BenQ",
        categoria: "Audiovisual",
        descricao:
            "Projetor para salas de aula e eventos."
    },

    {
        id: 6,
        nome: "Tablet Samsung",
        categoria: "Informática",
        descricao:
            "Tablet para pesquisas e atividades digitais."
    },

    {
        id: 7,
        nome: "Tablet Lenovo",
        categoria: "Informática",
        descricao:
            "Tablet para atividades escolares."
    },

    {
        id: 8,
        nome: "Caixa de Som",
        categoria: "Audiovisual",
        descricao:
            "Caixa de som para apresentações e eventos."
    },

    {
        id: 9,
        nome: "Microfone",
        categoria: "Audiovisual",
        descricao:
            "Microfone para apresentações e palestras."
    },

    {
        id: 10,
        nome: "Webcam",
        categoria: "Informática",
        descricao:
            "Webcam para aulas e reuniões online."
    },

    {
        id: 11,
        nome: "Câmera Digital",
        categoria: "Audiovisual",
        descricao:
            "Câmera para registros de atividades escolares."
    },

    {
        id: 12,
        nome: "Kit Arduino",
        categoria: "Laboratório",
        descricao:
            "Kit para atividades de programação e eletrônica."
    },

    {
        id: 13,
        nome: "Kit Robótica",
        categoria: "Laboratório",
        descricao:
            "Kit para projetos de robótica."
    },

    {
        id: 14,
        nome: "Multímetro",
        categoria: "Laboratório",
        descricao:
            "Equipamento para atividades de eletrônica."
    },

    {
        id: 15,
        nome: "Extensão Elétrica",
        categoria: "Laboratório",
        descricao:
            "Extensão para utilização de equipamentos."
    }

];


/* ==============================
   RESERVAS
================================ */

let reservas = [];


/* ==============================
   ELEMENTOS DA PÁGINA
================================ */

const listaEquipamentos =
    document.getElementById(
        "lista-equipamentos"
    );


const busca =
    document.getElementById(
        "busca"
    );


const categoria =
    document.getElementById(
        "categoria"
    );


const estadoVazio =
    document.getElementById(
        "estado-vazio"
    );


const selectEquipamento =
    document.getElementById(
        "equipamento"
    );


const formulario =
    document.getElementById(
        "form-reserva"
    );


const listaReservas =
    document.getElementById(
        "lista-reservas"
    );


const semReservas =
    document.getElementById(
        "sem-reservas"
    );


const campoData =
    document.getElementById(
        "data"
    );


/* ==============================
   DATA MÍNIMA
================================ */

const hoje = new Date();


const dataHoje =
    new Date(
        hoje.getTime()
        -
        hoje.getTimezoneOffset() * 60000
    )
    .toISOString()
    .split("T")[0];


campoData.min = dataHoje;


/* ==============================
   VERIFICAR RESERVA
================================ */

function estaReservado(
    equipamentoId,
    data,
    horario
) {

    return reservas.some(
        function (reserva) {

            return (
                reserva.equipamentoId ===
                equipamentoId

                &&

                reserva.data ===
                data

                &&

                reserva.horario ===
                horario
            );

        }
    );

}


/* ==============================
   MOSTRAR EQUIPAMENTOS
================================ */

function mostrarEquipamentos() {

    const texto =
        busca.value
            .toLowerCase()
            .trim();


    const filtro =
        categoria.value;


    listaEquipamentos.innerHTML = "";


    const resultados =
        equipamentos.filter(
            function (equipamento) {

                const nome =
                    equipamento.nome
                        .toLowerCase();


                const descricao =
                    equipamento.descricao
                        .toLowerCase();


                const encontrouTexto =
                    nome.includes(texto)
                    ||
                    descricao.includes(texto);


                const encontrouCategoria =
                    filtro === "todas"
                    ||
                    equipamento.categoria ===
                    filtro;


                return (
                    encontrouTexto
                    &&
                    encontrouCategoria
                );

            }
        );


    if (resultados.length === 0) {

        estadoVazio.hidden = false;

        return;

    }


    estadoVazio.hidden = true;


    resultados.forEach(
        function (equipamento) {

            const card =
                document.createElement(
                    "article"
                );


            card.className =
                "card";


            card.innerHTML = `

                <span class="status disponivel">
                    Disponível para reserva
                </span>

                <h3>
                    ${equipamento.nome}
                </h3>

                <p>
                    <strong>
                        Categoria:
                    </strong>

                    ${equipamento.categoria}
                </p>

                <p>
                    ${equipamento.descricao}
                </p>

                <button
                    type="button"
                    class="botao principal"
                >
                    Reservar equipamento
                </button>

            `;


            const botao =
                card.querySelector(
                    "button"
                );


            botao.addEventListener(
                "click",
                function () {

                    selectEquipamento.value =
                        equipamento.id;


                    document
                        .getElementById(
                            "reserva"
                        )
                        .scrollIntoView({
                            behavior:
                                "smooth"
                        });


                    selectEquipamento.focus();

                }
            );


            listaEquipamentos.appendChild(
                card
            );

        }
    );

}


/* ==============================
   PREENCHER EQUIPAMENTOS
================================ */

function preencherEquipamentos() {

    selectEquipamento.innerHTML = `

        <option value="">
            Selecione um equipamento
        </option>

    `;


    equipamentos.forEach(
        function (equipamento) {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                equipamento.id;


            option.textContent =
                equipamento.nome
                +
                " — "
                +
                equipamento.categoria;


            selectEquipamento.appendChild(
                option
            );

        }
    );

}


/* ==============================
   MOSTRAR RESERVAS
================================ */

function mostrarReservas() {

    listaReservas.innerHTML = "";


    if (reservas.length === 0) {

        semReservas.hidden = false;

        return;

    }


    semReservas.hidden = true;


    reservas.forEach(
        function (reserva) {

            const equipamento =
                equipamentos.find(
                    function (item) {

                        return (
                            item.id ===
                            reserva.equipamentoId
                        );

                    }
                );


            const div =
                document.createElement(
                    "article"
                );


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
                        ${formatarData(
                            reserva.data
                        )}
                    </p>

                    <p>
                        Horário:
                        ${reserva.horario}
                    </p>

                </div>

                <button
                    type="button"
                    class="botao-cancelar"
                >
                    Cancelar reserva
                </button>

            `;


            const botao =
                div.querySelector(
                    "button"
                );


            botao.addEventListener(
                "click",
                function () {

                    cancelarReserva(
                        reserva.id
                    );

                }
            );


            listaReservas.appendChild(
                div
            );

        }
    );

}


/* ==============================
   FORMATAR DATA
================================ */

function formatarData(data) {

    const partes =
        data.split("-");


    return (
        partes[2]
        +
        "/"
        +
        partes[1]
        +
        "/"
        +
        partes[0]
    );

}


/* ==============================
   CANCELAR RESERVA
================================ */

function cancelarReserva(id) {

    const reserva =
        reservas.find(
            function (item) {

                return item.id === id;

            }
        );


    if (!reserva) {

        return;

    }


    const equipamento =
        equipamentos.find(
            function (item) {

                return (
                    item.id ===
                    reserva.equipamentoId
                );

            }
        );


    const confirmar =
        window.confirm(
            "Deseja cancelar a reserva de "
            +
            equipamento.nome
            +
            "?"
        );


    if (!confirmar) {

        return;

    }


    reservas =
        reservas.filter(
            function (item) {

                return item.id !== id;

            }
        );


    atualizarTela();


    alert(
        "Reserva cancelada com sucesso!"
    );

}


/* ==============================
   FAZER RESERVA
================================ */

formulario.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        if (!formulario.checkValidity()) {

            formulario.reportValidity();

            return;

        }


        const equipamentoId =
            Number(
                selectEquipamento.value
            );


        const nome =
            document
                .getElementById(
                    "nome"
                )
                .value
                .trim();


        const data =
            campoData.value;


        const horario =
            document
                .getElementById(
                    "horario"
                )
                .value;


        /* VALIDAÇÃO DO NOME */

        if (nome.length < 3) {

            alert(
                "Digite um nome com pelo menos 3 caracteres."
            );

            document
                .getElementById(
                    "nome"
                )
                .focus();

            return;

        }


        /* VALIDAÇÃO DA DATA */

        if (data < dataHoje) {

            alert(
                "Escolha uma data igual ou posterior à data atual."
            );

            campoData.focus();

            return;

        }


        /* VERIFICAR CONFLITO */

        if (
            estaReservado(
                equipamentoId,
                data,
                horario
            )
        ) {

            alert(
                "Esse equipamento já está reservado para essa data e horário."
            );

            return;

        }


        /* CRIAR RESERVA */

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


        /* LIMPAR */

        formulario.reset();


        campoData.min =
            dataHoje;


        /* ATUALIZAR */

        atualizarTela();


        /* CONFIRMAÇÃO */

        alert(
            "Reserva realizada com sucesso!"
        );


        /* IR PARA RESERVAS */

        document
            .getElementById(
                "minhas-reservas"
            )
            .scrollIntoView({
                behavior:
                    "smooth"
            });

    }
);


/* ==============================
   LIMPAR FORMULÁRIO
================================ */

formulario.addEventListener(
    "reset",
    function () {

        setTimeout(
            function () {

                campoData.min =
                    dataHoje;

            },
            0
        );

    }
);


/* ==============================
   PESQUISA
================================ */

busca.addEventListener(
    "input",
    mostrarEquipamentos
);


/* ==============================
   FILTRO
================================ */

categoria.addEventListener(
    "change",
    mostrarEquipamentos
);


/* ==============================
   ATUALIZAR TELA
================================ */

function atualizarTela() {

    preencherEquipamentos();

    mostrarEquipamentos();

    mostrarReservas();

}


/* ==============================
   INICIAR SISTEMA
================================ */

atualizarTela();
