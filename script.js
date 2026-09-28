let reservaAtual = null;

function selecionar(equipamento) {
    document.getElementById("equipamento").value = equipamento;

    document.getElementById("nome").focus();
}

document.getElementById("formulario").addEventListener("submit", function(event) {

    event.preventDefault();

    let nome = document.getElementById("nome").value;
    let equipamento = document.getElementById("equipamento").value;
    let data = document.getElementById("data").value;

    if (nome === "" || equipamento === "" || data === "") {
        document.getElementById("mensagem").textContent =
            "Preencha todos os campos.";
        return;
    }

    reservaAtual = {
        nome: nome,
        equipamento: equipamento,
        data: data
    };

    document.getElementById("mensagem").textContent =
        "Reserva realizada com sucesso!";

    mostrarReserva();

    document.getElementById("formulario").reset();
});

function mostrarReserva() {

    document.getElementById("reserva").innerHTML = `
        <p><strong>Nome:</strong> ${reservaAtual.nome}</p>
        <p><strong>Equipamento:</strong> ${reservaAtual.equipamento}</p>
        <p><strong>Data:</strong> ${reservaAtual.data}</p>
    `;

    document.getElementById("cancelar").hidden = false;
}

function cancelarReserva() {

    let confirmar = confirm("Deseja cancelar a reserva?");

    if (confirmar) {

        reservaAtual = null;

        document.getElementById("reserva").innerHTML =
            "<p>Nenhuma reserva realizada.</p>";

        document.getElementById("cancelar").hidden = true;

        document.getElementById("mensagem").textContent =
            "Reserva cancelada.";
    }
}
