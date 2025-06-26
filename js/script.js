function cargarPromociones(){const n=document.querySelector(".promo-grid"),t=(n.innerHTML='<div class="loading">Cargando promociones...</div>',document.createElement("style"));t.textContent=`
    .loading {
      color: #FFC107;
      text-align: center;
      padding: 20px;
      font-size: 1.2rem;
    }
  `,document.head.appendChild(t),fetch("data/promociones.json").then(e=>{if(e.ok)return e.json();throw new Error("Error al cargar: "+e.status)}).then(e=>{n.innerHTML="",t.remove();const a=(new Date).getDay(),o=["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"],r=o[a];[...e].sort((e,t)=>{e=o.indexOf(e.dia),t=o.indexOf(t.dia);return(e-a+7)%7-(t-a+7)%7}).forEach(a=>{var e=document.createElement("div"),t=(e.className="promo-card",a.dia===r);let o="";a.imagenes&&0<a.imagenes.length&&(o=`
            <div class="promo-carousel">
              ${a.imagenes.map((e,t)=>`
                <img src="${e}" alt="${a.titulo}" loading="lazy" class="${0===t?"active":""}">
              `).join("")}
            </div>
          `),e.innerHTML=`
  ${a.destacado?'<span class="promo-badge destacado-badge">¡Destacado!</span>':""}
  ${t?'<span class="promo-badge hoy-badge">¡HOY!</span>':""}
  ${o}
  <div class="promo-content">
    <div class="promo-header">
      <span class="promo-day">${a.dia}</span>

        ${a.precio?`<span class="promo-price">${a.precio}</span>`:""}
    </div>

  

    <h3 class="promo-title">
      ${a.titulo}</h3>
      
    
    ${a.subtitulo?`<p class="promo-subtitle">${a.subtitulo}</p>`:""}
    <p class="promo-desc">${a.descripcion}</p>
  </div>
`,t&&(e.style.border="2px solid var(--accent)",e.style.boxShadow="0 0 15px rgba(255, 215, 0, 0.5)"),n.appendChild(e)}),inicializarCarruseles()}).catch(e=>{console.error("Error:",e),n.innerHTML=`
        <div class="error">
          <p>No se pudieron cargar las promociones</p>
          <small>${e.message}</small>
        </div>
      `;e=document.createElement("style");e.textContent=`
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
      `,document.head.appendChild(e)})}function inicializarCarruseles(){document.querySelectorAll(".promo-carousel").forEach(e=>{const t=e.querySelectorAll("img");let a=0,o;if(1<t.length){const r=()=>{t[a].classList.remove("active"),a=(a+1)%t.length,t[a].classList.add("active")};o=setInterval(r,3e3),e.addEventListener("mouseenter",()=>clearInterval(o)),e.addEventListener("mouseleave",()=>{o=setInterval(r,3e3)})}})}function cargarHamburguesasDesdeJSON(){const o=document.querySelector("#hamburguesas .menu-items");o.classList.add("menu-container"),o.innerHTML="",fetch("data/hamburguesas.json").then(e=>{if(e.ok)return e.json();throw new Error("No se pudo cargar el archivo JSON de hamburguesas.")}).then(e=>{e.forEach(e=>{var t=document.createElement("article"),a=(t.classList.add("card"),e.destacado&&e.badge?`<span class="card-badge">${e.badge}</span>`:"");t.innerHTML=`
          ${a}
          <img src="${e.imagen}" alt="${e.nombre}" class="card-img" loading="lazy">
          <div class="card-body">
            <h2 class="card-title">
              ${e.nombre}
              <span class="card-price">${e.precio}</span>
            </h2>
            ${e.subtitulo?`<p class="card-subtitle">${e.subtitulo}</p>`:""}
            <p class="card-description">${e.descripcion}</p>
          </div>
        `,o.appendChild(t)})}).catch(e=>{console.error("Error al cargar hamburguesas:",e),o.innerHTML='<p style="color: red;">Error al cargar el menú de hamburguesas.</p>'})}function crearBotonSubir(){const e=document.createElement("button");e.innerHTML="↑",e.id="btnArriba",e.ariaLabel="Volver arriba",e.title="Ir al inicio",document.body.appendChild(e),e.style.position="fixed",e.style.bottom="30px",e.style.right="30px",e.style.width="50px",e.style.height="50px",e.style.borderRadius="50%",e.style.backgroundColor="#FF8C00",e.style.color="#000",e.style.border="none",e.style.fontSize="1.5rem",e.style.cursor="pointer",e.style.display="none",e.style.zIndex="99",e.style.boxShadow="0 2px 10px rgba(0, 0, 0, 0.3)",e.style.transition="all 0.3s ease",window.addEventListener("scroll",()=>{e.style.display=300<window.scrollY?"block":"none"}),e.addEventListener("click",()=>{window.scrollTo({top:0,behavior:"smooth"})}),e.addEventListener("mouseenter",()=>{e.style.backgroundColor="#FFD700",e.style.transform="translateY(-3px)"}),e.addEventListener("mouseleave",()=>{e.style.backgroundColor="#FF8C00",e.style.transform="translateY(0)"})}function configurarAnimacionesScroll(){const t=new IntersectionObserver(e=>{e.forEach(e=>{e.isIntersecting&&(e.target.style.opacity=1,e.target.style.transform="translateY(0)",t.unobserve(e.target))})},{threshold:.1});document.querySelectorAll(".item, .section-header").forEach(e=>{t.observe(e)})}function mejorarBotones(){document.querySelectorAll(".cta-button").forEach(e=>{e.addEventListener("touchstart",()=>{e.style.transform="scale(0.95)"}),e.addEventListener("touchend",()=>{e.style.transform="scale(1)"}),e.addEventListener("mouseenter",()=>{e.style.transform="translateY(-3px)",e.style.boxShadow="0 5px 15px rgba(255, 140, 0, 0.4)"}),e.addEventListener("mouseleave",()=>{e.style.transform="translateY(0)",e.style.boxShadow="none"})})}document.addEventListener("DOMContentLoaded",()=>{cargarPromociones()}),gsap.registerPlugin(ScrollTrigger);let lastScrollY=0,isExpanded=!1;const contactFloat=document.querySelector(".contact-float"),contactFloatText=document.querySelector(".contact-float-text"),expandTl=gsap.timeline({paused:!0}),contractTl=gsap.timeline({paused:!0});function expandButton(){isExpanded||(contractTl.pause(),expandTl.restart(),isExpanded=!0)}function contractButton(){isExpanded&&(expandTl.pause(),contractTl.restart(),isExpanded=!1)}function handleScroll(){var e=window.scrollY;(!(e<100)&&e>lastScrollY?expandButton:contractButton)(),lastScrollY=e}expandTl.to(contactFloat,{width:"280px",paddingRight:"20px",duration:.4,ease:"power2.out"}).to(".contact-float-icon",{marginLeft:"20px",duration:.4,ease:"power2.out"},0).to(contactFloatText,{opacity:1,x:0,duration:.3,ease:"power2.out"},"-=0.2"),contractTl.to(contactFloatText,{opacity:0,x:10,duration:.2,ease:"power2.in"}).to(contactFloat,{width:"60px",paddingRight:"0px",duration:.3,ease:"power2.in"},"-=0.1").to(".contact-float-icon",{marginLeft:"15px",duration:.3,ease:"power2.in"},"-=0.3"),window.addEventListener("scroll",handleScroll,{passive:!0}),contactFloat.addEventListener("click",function(){var e="https://wa.me/9811930673?text="+encodeURIComponent("¡Hola! Me interesa hacer un pedido en Jada Burguer");window.open(e,"_blank")}),gsap.fromTo(contactFloat,{scale:0,opacity:0},{scale:1,opacity:1,duration:.5,ease:"back.out(1.7)",delay:1}),contactFloat.addEventListener("mouseenter",function(){gsap.to(this,{scale:1.05,duration:.2,ease:"power2.out"})}),contactFloat.addEventListener("mouseleave",function(){gsap.to(this,{scale:1,duration:.2,ease:"power2.out"})}),contractButton(),window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches&&document.documentElement.classList.add("dark"),window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",e=>{e.matches?document.documentElement.classList.add("dark"):document.documentElement.classList.remove("dark")}),document.addEventListener("DOMContentLoaded",()=>{cargarHamburguesasDesdeJSON(),crearBotonSubir(),configurarAnimacionesScroll(),mejorarBotones(),cargarPromociones();["logo.png","especial.jpg","hawaiana.jpg"].forEach(e=>{(new Image).src="img/"+e})});