class Usuario {
    static contador = 1;

    constructor(id, nombre, correo, contraseña) {
        this.id = Usuario.formatoId(Usuario.contador++);
        this.nombre = nombre;
        this.correo = correo;
        this.contraseña = contraseña;
    }

    static formatoId(numero) {
        return numero.toString().padStart(4, "0");
    }
}

class Formulario {
    constructor() {
        this.nombre = document.getElementById("nombre");
        this.correo = document.getElementById("correo");
        this.contraseña = document.getElementById("contraseña");
        this.nombreIcon = document.getElementById("nombreIcon");
        this.correoIcon = document.getElementById("correoIcon");
        this.contraseñaIcon = document.getElementById("contraseñaIcon");
        this.formulario = document.getElementById("formulario");
    }

    validarNombre() {
        if (this.nombre.value.trim() === "") {
            this.mostrarIconoValidacion(this.nombreIcon, false);
            this.actualizarEstiloInput(this.nombre, false);
            return false;
        } else if (this.nombre.value.length < 3) {
            this.mostrarIconoValidacion(this.nombreIcon, false);
            this.actualizarEstiloInput(this.nombre, false);
            return false;
        } else {
            this.mostrarIconoValidacion(this.nombreIcon, true);
            this.actualizarEstiloInput(this.nombre, true);
            return true;
        }
    }

    validarCorreo() {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (this.correo.value.trim() === "") {
            this.mostrarIconoValidacion(this.correoIcon, false);
            this.actualizarEstiloInput(this.correo, false);
            return false;
        } else if (!regex.test(this.correo.value)) {
            this.mostrarIconoValidacion(this.correoIcon, false);
            this.actualizarEstiloInput(this.correo, false);
            return false;
        } else {
            this.mostrarIconoValidacion(this.correoIcon, true);
            this.actualizarEstiloInput(this.correo, true);
            return true;
        }
    }

    validarContraseña() {
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

        if (this.contraseña.value.trim() === "") {
            this.mostrarIconoValidacion(this.contraseñaIcon, false);
            this.actualizarEstiloInput(this.contraseña, false);
            return false;
        }

        if (!regex.test(this.contraseña.value)) {
            this.mostrarIconoValidacion(this.contraseñaIcon, false);
            this.actualizarEstiloInput(this.contraseña, false);
            return false;
        }

        this.mostrarIconoValidacion(this.contraseñaIcon, true);
        this.actualizarEstiloInput(this.contraseña, true);
        return true;
    }

    registrarUsuario() {
        const nombreValido = this.validarNombre();
        const correoValido = this.validarCorreo();
        const contraseñaValida = this.validarContraseña();

        this.actualizarEstiloInput(this.nombre, nombreValido);
        this.actualizarEstiloInput(this.correo, correoValido);
        this.actualizarEstiloInput(this.contraseña, contraseñaValida);

        if (!nombreValido) {
            alert(
                "El nombre no puede estar vacío y debe tener al menos 3 caracteres."
            );
        } else if (!correoValido) {
            alert("El correo no es válido.");
        } else if (!contraseñaValida) {
            alert(
                "La contraseña debe tener al menos 8 caracteres: una letra mayúscula, una letra minúscula y un número."
            );
        } else {
            const usuario = new Usuario(
                Date.now(),
                this.nombre.value,
                this.correo.value,
                this.contraseña.value
            );
            this.formulario.reset();
            this.tablaUsuarios.actualizarTabla(usuario);
        }
    }

    mostrarIconoValidacion(iconElement, esValido) {
        iconElement.innerHTML = esValido ? "✅" : "❌";
    }

    actualizarEstiloInput(input, esValido) {
        input.classList.remove("input-valid", "input-invalid");
        if (esValido) {
            input.classList.add("input-valid");
        } else {
            input.classList.add("input-invalid");
        }
    }
    resetearFormulario() {
        this.nombre.value = "";
        this.correo.value = "";
        this.contraseña.value = "";
        this.resetearIconoValidacion(this.nombreIcon);
        this.resetearIconoValidacion(this.correoIcon);
        this.resetearIconoValidacion(this.contraseñaIcon);
        this.actualizarEstiloInput(this.nombre, null);
        this.actualizarEstiloInput(this.correo, null);
        this.actualizarEstiloInput(this.contraseña, null);

        // Restablecer los estilos y los iconos de validación al estado inicial
        this.nombre.classList.remove("input-valid", "input-invalid");
        this.correo.classList.remove("input-valid", "input-invalid");
        this.contraseña.classList.remove("input-valid", "input-invalid");
    }

    resetearIconoValidacion(iconElement) {
        if (iconElement.textContent !== "") {
            iconElement.innerHTML = "";
        }
    }
}

class TablaUsuarios {
    constructor() {
        this.tabla = document.getElementById("tabla_usuarios");
        this.tablaBody = document.getElementById("tabla_body");
        this.cardContainer = document.getElementById("cardContainer");
        this.usuarios = [];
    }

    actualizarTabla(usuario) {
        this.usuarios.push(usuario);
        this.render();
        this.tabla.style.display = "table";
        this.mostrarCards();
    }

    render() {
        this.tablaBody.innerHTML = "";

        this.usuarios.forEach((usuario) => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
        <td>${usuario.id}</td>
        <td>${usuario.nombre}</td>
        <td>${usuario.correo}</td>
        <td>${usuario.contraseña ? usuario.contraseña : ""}</td>
      `;
            this.tablaBody.appendChild(fila);
        });
    }
    mostrarCards() {
        this.cardContainer.innerHTML = "";

        // Crear una card por cada usuario
        this.usuarios.forEach((usuario) => {
            const card = document.createElement("div");
            card.classList.add("user-card");

            const leftPart = document.createElement("div");
            leftPart.classList.add("row1");

            const labels = ["ID", "Nombre", "Correo", "Contraseña"];
            labels.forEach((label) => {
                const labelElement = document.createElement("div");
                labelElement.classList.add("label");
                labelElement.textContent = label;
                leftPart.appendChild(labelElement);
            });

            card.appendChild(leftPart);

            const rightPart = document.createElement("div");
            rightPart.classList.add("row2");

            const userData = [
                usuario.id,
                usuario.nombre,
                usuario.correo,
                usuario.contraseña || "",
            ];
            userData.forEach((data) => {
                const dataElement = document.createElement("div");
                dataElement.classList.add("data");
                dataElement.textContent = data;
                rightPart.appendChild(dataElement);
            });

            card.appendChild(rightPart);

            // Agregar la card al contenedor
            this.cardContainer.appendChild(card);
        });
    }
}

const formulario = new Formulario();
const tablaUsuarios = new TablaUsuarios();
formulario.tablaUsuarios = tablaUsuarios;

formulario.formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    formulario.registrarUsuario();
});

// botón de visualización de contraseña
const togglePassword = document.getElementById("togglePassword");
const contraseñaInput = document.getElementById("contraseña");

togglePassword.addEventListener("click", () => {
    const tipoActual = contraseñaInput.getAttribute("type");
    contraseñaInput.setAttribute(
        "type",
        tipoActual === "password" ? "text" : "password"
    );
    togglePassword.classList.toggle("fa-eye-slash");
});
