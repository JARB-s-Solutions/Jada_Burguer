// Promociones por día 
function cargarPromociones() {
  const promoContainer = document.querySelector('.promo-grid');

  // Mostrar mensaje de carga
  promoContainer.innerHTML = '<div class="loading">Cargando promociones...</div>';

  // Estilo para el mensaje de carga
  const loadingStyle = document.createElement('style');
  loadingStyle.textContent = `
    .loading {
      color: #FFC107;
      text-align: center;
      padding: 20px;
      font-size: 1.2rem;
    }
  `;
  document.head.appendChild(loadingStyle);

  fetch('data/promociones.json')
    .then(response => {
      if (!response.ok) throw new Error(`Error al cargar: ${response.status}`);
      return response.json();
    })
    .then(promociones => {
      // Limpiar mensaje de carga
      promoContainer.innerHTML = '';
      loadingStyle.remove();

      const hoy = new Date().getDay();
      const diasSemana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
      const diaActualNombre = diasSemana[hoy];

      // Ordenar promociones
      const promocionesOrdenadas = [...promociones].sort((a, b) => {
        const indexA = diasSemana.indexOf(a.dia);
        const indexB = diasSemana.indexOf(b.dia);
        const diffA = (indexA - hoy + 7) % 7;
        const diffB = (indexB - hoy + 7) % 7;
        return diffA - diffB;
      });

      promocionesOrdenadas.forEach(promo => {
        const promoCard = document.createElement('div');
        promoCard.className = 'promo-card';
        const esHoy = promo.dia === diaActualNombre;

        let carruselHTML = '';
        if (promo.imagenes && promo.imagenes.length > 0) {
          carruselHTML = `
            <div class="promo-carousel">
              ${promo.imagenes.map((img, i) => `
                <img src="${img}" alt="${promo.titulo}" loading="lazy" class="${i === 0 ? 'active' : ''}">
              `).join('')}
            </div>
          `;
        }
promoCard.innerHTML = `
  ${promo.destacado ? '<span class="promo-badge destacado-badge">¡Destacado!</span>' : ''}
  ${esHoy ? '<span class="promo-badge hoy-badge">¡HOY!</span>' : ''}
  ${carruselHTML}
  <div class="promo-content">
    <div class="promo-header">
      <span class="promo-day">${promo.dia}</span>

        ${promo.precio ? `<span class="promo-price">${promo.precio}</span>` : ''}
    </div>

  

    <h3 class="promo-title">
      ${promo.titulo}</h3>
      
    
    ${promo.subtitulo ? `<p class="promo-subtitle">${promo.subtitulo}</p>` : ''}
    <p class="promo-desc">${promo.descripcion}</p>
  </div>
`;
      if (esHoy) {
          promoCard.style.border = '2px solid var(--accent)';
          promoCard.style.boxShadow = '0 0 15px rgba(255, 215, 0, 0.5)';
        }

        promoContainer.appendChild(promoCard);
      });

      inicializarCarruseles();
    })
    .catch(error => {
      console.error('Error:', error);
      promoContainer.innerHTML = `
        <div class="error">
          <p>No se pudieron cargar las promociones</p>
          <small>${error.message}</small>
        </div>
      `;
      const errorStyle = document.createElement('style');
      errorStyle.textContent = `
        .error {
          color: #FF6B6B;
          text-align: center;
          padding: 20px;
          border: 1px solid #FF6B6B;
          border-radius: 8px;
        }
        .error small {
          color: #CCC;
          font-size: 0.8rem;
        }
      `;
      document.head.appendChild(errorStyle);
    });
}

function inicializarCarruseles() {
  document.querySelectorAll('.promo-carousel').forEach(carrusel => {
    const imagenes = carrusel.querySelectorAll('img');
    let currentIndex = 0;
    let intervalo;

    if (imagenes.length > 1) {
      const cambiarImagen = () => {
        imagenes[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % imagenes.length;
        imagenes[currentIndex].classList.add('active');
      };

      intervalo = setInterval(cambiarImagen, 3000);

      carrusel.addEventListener('mouseenter', () => clearInterval(intervalo));
      carrusel.addEventListener('mouseleave', () => {
        intervalo = setInterval(cambiarImagen, 3000);
      });
    }
  });
}

//  llamar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
  cargarPromociones();
});


// Carga las hamburguesas en el menú
function cargarHamburguesasDesdeJSON() {
  const contenedor = document.querySelector('#hamburguesas .menu-items');
  contenedor.classList.add('menu-container');
  contenedor.innerHTML = '';

  fetch('data/hamburguesas.json')
    .then(response => {
      if (!response.ok) {
        throw new Error('No se pudo cargar el archivo JSON de hamburguesas.');
      }
      return response.json();
    })
    .then(hamburguesas => {
      hamburguesas.forEach(hamburguesa => {
        const card = document.createElement('article');
        card.classList.add('card');

        const badgeHTML = hamburguesa.destacado && hamburguesa.badge
          ? `<span class="card-badge">${hamburguesa.badge}</span>`
          : '';

        const subtitleHTML = hamburguesa.subtitulo
          ? `<p class="card-subtitle">${hamburguesa.subtitulo}</p>`
          : '';


        card.innerHTML = `
          ${badgeHTML}
          <img src="${hamburguesa.imagen}" alt="${hamburguesa.nombre}" class="card-img" loading="lazy">
          <div class="card-body">
            <h2 class="card-title">
              ${hamburguesa.nombre}
              <span class="card-price">${hamburguesa.precio}</span>
            </h2>
            ${subtitleHTML}
            <p class="card-description">${hamburguesa.descripcion}</p>
          </div>
        `;

        contenedor.appendChild(card);
      });
    })
    .catch(error => {
      console.error('Error al cargar hamburguesas:', error);
      contenedor.innerHTML = '<p style="color: red;">Error al cargar el menú de hamburguesas.</p>';
    });
}
// === BOTÓN DE "IR ARRIBA" ===
function crearBotonSubir() {
  const botonArriba = document.createElement("button");
  botonArriba.innerHTML = "↑";
  botonArriba.id = "btnArriba";
  botonArriba.ariaLabel = "Volver arriba";
  botonArriba.title = "Ir al inicio";
  document.body.appendChild(botonArriba);

  // Estilos del botón
  botonArriba.style.position = "fixed";
  botonArriba.style.bottom = "30px";
  botonArriba.style.right = "30px";
  botonArriba.style.width = "50px";
  botonArriba.style.height = "50px";
  botonArriba.style.borderRadius = "50%";
  botonArriba.style.backgroundColor = "#FF8C00";
  botonArriba.style.color = "#000";
  botonArriba.style.border = "none";
  botonArriba.style.fontSize = "1.5rem";
  botonArriba.style.cursor = "pointer";
  botonArriba.style.display = "none";
  botonArriba.style.zIndex = "99";
  botonArriba.style.boxShadow = "0 2px 10px rgba(0, 0, 0, 0.3)";
  botonArriba.style.transition = "all 0.3s ease";

  // Mostrar/ocultar al hacer scroll
  window.addEventListener("scroll", () => {
    botonArriba.style.display = window.scrollY > 300 ? "block" : "none";
  });

  // Scroll suave al hacer clic
  botonArriba.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Efecto hover
  botonArriba.addEventListener("mouseenter", () => {
    botonArriba.style.backgroundColor = "#FFD700";
    botonArriba.style.transform = "translateY(-3px)";
  });

  botonArriba.addEventListener("mouseleave", () => {
    botonArriba.style.backgroundColor = "#FF8C00";
    botonArriba.style.transform = "translateY(0)";
  });
}

// === ANIMACIONES AL SCROLL ===
function configurarAnimacionesScroll() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = "translateY(0)";
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.item, .section-header').forEach(el => {
    observer.observe(el);
  });
}

// === MEJORA DE INTERACCIÓN PARA BOTONES ===
function mejorarBotones() {
  document.querySelectorAll('.cta-button').forEach(button => {
    // Efecto al tocar (móviles)
    button.addEventListener('touchstart', () => {
      button.style.transform = 'scale(0.95)';
    });

    button.addEventListener('touchend', () => {
      button.style.transform = 'scale(1)';
    });

    // Efecto al pasar el mouse (desktop)
    button.addEventListener('mouseenter', () => {
      button.style.transform = 'translateY(-3px)';
      button.style.boxShadow = '0 5px 15px rgba(255, 140, 0, 0.4)';
    });

    button.addEventListener('mouseleave', () => {
      button.style.transform = 'translateY(0)';
      button.style.boxShadow = 'none';
    });
  });
}


// Registrar ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Variables
let lastScrollY = 0;
let isExpanded = false;
const contactFloat = document.querySelector('.contact-float');
const contactFloatText = document.querySelector('.contact-float-text');

// Timeline para las animaciones
const expandTl = gsap.timeline({ paused: true });
const contractTl = gsap.timeline({ paused: true });

// Configurar animaciones
expandTl
  .to(contactFloat, {
    width: "280px",
    paddingRight: "20px",
    duration: 0.4,
    ease: "power2.out"
  })
  .to(".contact-float-icon", {
    marginLeft: "20px",
    duration: 0.4,
    ease: "power2.out"
  }, 0)
  .to(contactFloatText, {
    opacity: 1,
    x: 0,
    duration: 0.3,
    ease: "power2.out"
  }, "-=0.2");

contractTl
  .to(contactFloatText, {
    opacity: 0,
    x: 10,
    duration: 0.2,
    ease: "power2.in"
  })
  .to(contactFloat, {
    width: "60px",
    paddingRight: "0px",
    duration: 0.3,
    ease: "power2.in"
  }, "-=0.1")
  .to(".contact-float-icon", {
    marginLeft: "15px",
    duration: 0.3,
    ease: "power2.in"
  }, "-=0.3");

// Función para expandir el botón
function expandButton() {
  if (!isExpanded) {
    contractTl.pause();
    expandTl.restart();
    isExpanded = true;
  }
}

// Función para contraer el botón
function contractButton() {
  if (isExpanded) {
    expandTl.pause();
    contractTl.restart();
    isExpanded = false;
  }
}

// Detectar dirección del scroll
function handleScroll() {
  const currentScrollY = window.scrollY;

  // Si estamos en el top, contraer siempre
  if (currentScrollY < 100) {
    contractButton();
  } else {
    // Detectar dirección del scroll
    if (currentScrollY > lastScrollY) {
      // Scrolling hacia abajo - expandir
      expandButton();
    } else {
      // Scrolling hacia arriba - contraer
      contractButton();
    }
  }

  lastScrollY = currentScrollY;
}

// Event listeners
window.addEventListener('scroll', handleScroll, { passive: true });

// Click handler para el botón
contactFloat.addEventListener('click', function () {
  const phoneNumber = "9811930673"; // Reemplaza con tu número
  const message = "¡Hola! Me interesa hacer un pedido en Jada Burguer";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
});

// Animación inicial del botón (fade in)
gsap.fromTo(contactFloat,
  {
    scale: 0,
    opacity: 0
  },
  {
    scale: 1,
    opacity: 1,
    duration: 0.5,
    ease: "back.out(1.7)",
    delay: 1
  }
);

// Animación de hover mejorada
contactFloat.addEventListener('mouseenter', function () {
  gsap.to(this, {
    scale: 1.05,
    duration: 0.2,
    ease: "power2.out"
  });
});

contactFloat.addEventListener('mouseleave', function () {
  gsap.to(this, {
    scale: 1,
    duration: 0.2,
    ease: "power2.out"
  });
});

// Inicializar estado
contractButton();

// Configurar dark mode
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.documentElement.classList.add('dark');
}
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
  if (event.matches) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
});
// === INICIALIZACIÓN ===
document.addEventListener('DOMContentLoaded', () => {
  cargarHamburguesasDesdeJSON();
  crearBotonSubir();
  configurarAnimacionesScroll();
  mejorarBotones();
  cargarPromociones(); // Cargar promociones al inicio


  // Precarga de imágenes importantes
  const preloadImages = ['logo.png', 'especial.jpg', 'hawaiana.jpg'];
  preloadImages.forEach(img => {
    const image = new Image();
    image.src = `img/${img}`;
  });
});