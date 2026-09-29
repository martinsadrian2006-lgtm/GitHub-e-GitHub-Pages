const equipamentos = [

    {
        id: 1,
        nome: "Notebook Dell",
        categoria: "Informática"
    },

    {
        id: 2,
        nome: "Notebook Lenovo",
        categoria: "Informática"
    },

    {
        id: 3,
        nome: "Projetor Epson",
        categoria: "Audiovisual"
    },

    {
        id: 4,
        nome: "Projetor BenQ",
        categoria: "Audiovisual"
    },

    {
        id: 5,
        nome: "Tablet Samsung",
        categoria: "Informática"
    },

    {
        id: 6,
        nome: "Tablet Lenovo",
        categoria: "Informática"
    },

    {
        id: 7,
        nome: "Caixa de Som",
        categoria: "Audiovisual"
    },

    {
        id: 8,
        nome: "Microfone",
        categoria: "Audiovisual"
    },

    {
        id: 9,
        nome: "Webcam",
        categoria: "Informática"
    },

    {
        id: 10,
        nome: "Câmera Digital",
        categoria: "Audiovisual"
    },

    {
        id: 11,
        nome: "Kit Arduino",
        categoria: "Laboratório"
    },

    {
        id: 12,
        nome: "Kit Robótica",
        categoria: "Laboratório"
    },

    {
        id: 13,
        nome: "Multímetro",
        categoria: "Laboratório"
    },

    {
        id: 14,
        nome: "Extensão Elétrica",
        categoria: "Laboratório"
    }

];


let reservas = [];


const listaEquipamentos =
    document.getElementById(
        "lista-equipamentos"
    );

const busca =
    document.getElementById("busca");

const categoria =
    document.getElementById("categoria");

const semEquipamentos =
    document.getElementById(
        "sem-equipamentos"
    );

const equipamentoSelect =
    document.getElementById(
        "equipamento"
    );

const formulario =
    document.getElementById(
        "formulario"
    );

const dataInput =
    document.getElementById("data");

const horarioSelect =
    document.getElementById(
        "horario"
    );

const listaReservas =
    document.getElementById(
        "lista-reservas"
    );

const semReservas =
    document.getElementById(
        "sem-reservas"
    );


/* DATA DE HOJE */

const hoje =
    new Date()
        .toISOString()
        .split("T")[0];

dataInput.min = hoje;


/* VERIFICAR CONFLITO */

function jaReservado(
    equipamento,
    data,
    horario
) {

    return reservas.some(
        function(reserva) {

            return (
                reserva.equipamento ===
                equipamento &&

                reserva.data ===
                data &&

                reserva.horario ===
                horario
            );

        }
    );

}


/* MOSTRAR EQUIPAMENTOS */

function mostrarEquipamentos() {

    const texto =
        busca.value
            .toLowerCase();

    const filtro =
        categoria.value;


    listaEquipamentos.innerHTML = "";


    const encontrados =
        equipamentos.filter(
            function(item) {

                const nome =
                    item.nome
                        .toLowerCase();

                const nomeOk =
                    nome.includes(texto);

                const categoriaOk =
                    filtro === "todas" ||
                    item.categoria === filtro;


                return (
                    nomeOk &&
                    categoriaOk
                );

            }
        );


    semEquipamentos.hidden =
        encontrados.length > 0;


    encontrados.forEach(
        function(item) {

            const div =
                document.createElement(
                    "div"
                );

            div.className =
                "equipamento";


            div.innerHTML = `

                <h3>
                    ${item.nome}
                </h3>

                <p>
                    ${item.categoria}
                </p>

                <button
                    type="button"
                >
                    Reservar
                </button>

            `;


            div
                .querySelector("button")
                .addEventListener(
                    "click",
                    function() {

                        equipamentoSelect.value =
                            item.id;

                        document
                            .getElementById(
                                "reserva"
                            )
                            .scrollIntoView({
                                behavior:
                                    "smooth"
                            });

                        equipamentoSelect.focus();

                    }
                );


            listaEquipamentos.appendChild(
                div
            );

        }
    );

}


/* PREENCHER SELECT */

function preencherEquipamentos() {

    equipamentoSelect.innerHTML = `

        <option value="">
            Escolha um equipamento
        </option>

    `;


    equipamentos.forEach(
        function(item) {

            const option =
                document.createElement(
                    "option"
                );


            option.value =
                item.id;


            option.textContent =
                item.nome;


            equipamentoSelect.appendChild(
                option
            );

        }
    );

}


/* MOSTRAR RESERVAS */

function mostrarReservas() {

    listaReservas.innerHTML = "";


    semReservas.hidden =
        reservas.length > 0;


    reservas.forEach(
        function(reserva) {

            const equipamento =
                equipamentos.find(
                    function(item) {

                        return (
                            item.id ===
                            reserva.equipamento
                        );

                    }
                );


            const div =
                document.createElement(
                    "div"
                );


            div.className =
                "reserva";


            div.innerHTML = `

                <div>

                    <strong>
                        ${equipamento.nome}
                    </strong>

                    <p>
                        Nome:
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
                    class="cancelar"
                >
                    Cancelar
                </button>

            `;


            div
                .querySelector(".cancelar")
                .addEventListener(
                    "click",
                    function() {

                        cancelar(
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


/* FORMATAR DATA */

function formatarData(data) {

    const partes =
        data.split("-");


    return (
        partes[2]
        + "/"
        + partes[1]
        + "/"
        + partes[0]
    );

}


/* CANCELAR */

function cancelar(id) {

    const confirmar =
        confirm(
            "Deseja cancelar esta reserva?"
        );


    if (!confirmar) {

        return;

    }


    reservas =
        reservas.filter(
            function(reserva) {

                return reserva.id !== id;

            }
        );


    atualizar();

    alert(
        "Reserva cancelada."
    );

}


/* FAZER RESERVA */

formulario.addEventListener(
    "submit",
    function(event) {

        event.preventDefault();


        if (!formulario.checkValidity()) {

            formulario.reportValidity();

            return;

        }


        const equipamento =
            Number(
                equipamentoSelect.value
            );


        const nome =
            document
                .getElementById("nome")
                .value
                .trim();


        const data =
            dataInput.value;


        const horario =
            horarioSelect.value;


        if (nome.length < 3) {

            alert(
                "Digite um nome válido."
            );

            return;

        }


        if (data < hoje) {

            alert(
                "Escolha uma data válida."
            );

            return;

        }


        if (
            jaReservado(
                equipamento,
                data,
                horario
            )
        ) {

            alert(
                "Esse equipamento já está reservado para essa data e horário."
            );

            return;

        }


        reservas.push({

            id: Date.now(),

            equipamento:
                equipamento,

            nome:
                nome,

            data:
                data,

            horario:
                horario

        });


        formulario.reset();

        dataInput.min = hoje;


        atualizar();


        alert(
            "Reserva realizada com sucesso!"
        );

    }
);


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


/* ATUALIZAR */

function atualizar() {

    preencherEquipamentos();

    mostrarEquipamentos();

    mostrarReservas();

}


/* INICIAR */

atualizar();
