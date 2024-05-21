let menuVisible = false;

function mostrarOcultarMenu() {
    var nav = document.getElementById("nav");
    if (nav.className === "") {
        nav.className = "responsive";
    } else {
        nav.className = "";
    }
}

function seleccionar() {
    var nav = document.getElementById("nav");
    nav.className = "";
}

// Función para el efecto de escribir el texto
const textSliderItems = ["Desarrollador Web", "Desarrollador de Escritorio", "Desarrollador de Aplicaciones"];
let textSliderIndex = 0;
let textSliderElement = document.getElementById("nombre");

function typeWriter(text, i, fnCallback) {
    if (i < text.length) {
        textSliderElement.innerHTML = text.substring(0, i + 1) + '<span aria-hidden="true"></span>';
        setTimeout(function() {
            typeWriter(text, i + 1, fnCallback);
        }, 100);
    } else if (typeof fnCallback == 'function') {
        setTimeout(fnCallback, 700);
    }
}

function startTextSliderAnimation(i) {
    if (typeof textSliderItems[i] == 'undefined') {
        setTimeout(function() {
            startTextSliderAnimation(0);
        }, 1000);
    } else {
        typeWriter(textSliderItems[i], 0, function() {
            startTextSliderAnimation((i + 1) % textSliderItems.length);
        });
    }
}

// Iniciar la animación al cargar el DOM
document.addEventListener('DOMContentLoaded', function() {
    startTextSliderAnimation(0);

    const telefonoInput = document.querySelector('.telefono');
    telefonoInput.addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9]/g, '');
    });

    const correoInput = document.querySelector('.correo');
    correoInput.addEventListener('input', function() {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(this.value)) {
            this.setCustomValidity('Por favor, ingrese un correo electrónico válido.');
        } else {
            this.setCustomValidity('');
        }
    });
});

function validarFormulario() {
    const telefonoInput = document.querySelector('.telefono');
    const correoInput = document.querySelector('.correo');
    const nombreInput = document.querySelector('input[name="nombre"]');
    const asuntoInput = document.querySelector('input[name="asunto"]');
    const mensajeTextarea = document.querySelector('textarea[name="mensaje"]');

    if (
        telefonoInput.value === '' ||
        correoInput.value === '' ||
        nombreInput.value === '' ||
        asuntoInput.value === '' ||
        mensajeTextarea.value === ''
    ) {
        alert('Por favor, complete todos los campos.');
        return false;
    }

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(correoInput.value)) {
        alert('Por favor, ingrese un correo electrónico válido.');
        return false;
    }

    const mensajeEnviado = document.getElementById('mensaje-enviado');
    mensajeEnviado.classList.remove('oculto');
    mensajeEnviado.classList.add('visible');

    setTimeout(() => {
        mensajeEnviado.classList.remove('visible');
        mensajeEnviado.classList.add('oculto');
    }, 3000);

    return false;
}

// Formulario envio 
const btn = document.getElementById('button');

document.getElementById('form')
 .addEventListener('submit', function(event) {
   event.preventDefault();

   btn.value = 'Enviando...';

   const serviceID = 'default_service';
   const templateID = 'template_wxk3wgj';

   emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Enviar Correo';
      // Mostrar modal en lugar de la alerta
      var myModal = new bootstrap.Modal(document.getElementById('contactModal'));
      myModal.show();
    }, (err) => {
      btn.value = 'Enviar Correo';
      alert(JSON.stringify(err));
    });
});
