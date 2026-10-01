(() => {

    /* ==================================================
       GALERÍAS
    ================================================== */
  
    const galleries = {
  
      protectores: {
  
        title:
          "Protectores de Almohada",
  
        images: [
  
          {
            src:
              "./img/catalogo/protectores-almohada/protector almohada.jpeg",
  
            alt:
              "Protector de almohada MALAK"
          }
  
        ]
  
      }
  
    };
  
  
    /* ==================================================
       MENÚ MÓVIL
    ================================================== */
  
    const menuToggle =
      document.querySelector(
        ".protector-menu-toggle"
      );
  
  
    const nav =
      document.querySelector(
        ".protector-nav"
      );
  
  
    if (
      menuToggle &&
      nav
    ) {
  
      menuToggle.addEventListener(
        "click",
        () => {
  
          const open =
            nav.classList.toggle(
              "mobile-open"
            );
  
  
          menuToggle.setAttribute(
            "aria-expanded",
            String(open)
          );
  
        }
      );
  
  
      nav
        .querySelectorAll("a")
        .forEach(link => {
  
          link.addEventListener(
            "click",
            () => {
  
              nav.classList.remove(
                "mobile-open"
              );
  
  
              menuToggle.setAttribute(
                "aria-expanded",
                "false"
              );
  
            }
          );
  
        });
  
    }
  
  
  
    /* ==================================================
       ELEMENTOS GALERÍA
    ================================================== */
  
    const modal =
      document.getElementById(
        "galleryModal"
      );
  
  
    const galleryTitle =
      document.getElementById(
        "galleryTitle"
      );
  
  
    const galleryImage =
      document.getElementById(
        "galleryImage"
      );
  
  
    const galleryEmpty =
      document.getElementById(
        "galleryEmpty"
      );
  
  
    const galleryCounter =
      document.getElementById(
        "galleryCounter"
      );
  
  
    const galleryThumbs =
      document.getElementById(
        "galleryThumbs"
      );
  
  
    const galleryPrev =
      document.getElementById(
        "galleryPrev"
      );
  
  
    const galleryNext =
      document.getElementById(
        "galleryNext"
      );
  
  
    const galleryZoom =
      document.getElementById(
        "galleryZoom"
      );
  
  
    const galleryImageWrap =
      document.getElementById(
        "galleryImageWrap"
      );
  
  
  
    /* ==================================================
       VALIDACIÓN
    ================================================== */
  
    if (
      !modal ||
      !galleryTitle ||
      !galleryImage ||
      !galleryEmpty ||
      !galleryCounter ||
      !galleryThumbs ||
      !galleryPrev ||
      !galleryNext ||
      !galleryZoom ||
      !galleryImageWrap
    ) {
  
      return;
  
    }
  
  
  
    /* ==================================================
       ESTADO
    ================================================== */
  
    let activeGallery =
      null;
  
  
    let activeIndex =
      0;
  
  
    let lastFocused =
      null;
  
  
    let touchStartX =
      0;
  
  
  
    /* ==================================================
       RESET ZOOM
    ================================================== */
  
    function resetZoom() {
  
      galleryImageWrap
        .classList
        .remove(
          "is-zoomed"
        );
  
  
      galleryZoom.textContent =
        "Ampliar";
  
  
      galleryZoom.setAttribute(
        "aria-label",
        "Ampliar imagen"
      );
  
    }
  
  
  
    /* ==================================================
       RENDER GALERÍA
    ================================================== */
  
    function renderGallery() {
  
      const images =
        activeGallery?.images ||
        [];
  
  
      resetZoom();
  
  
  
      /* ================================================
         SIN IMÁGENES
      ================================================ */
  
      if (!images.length) {
  
        galleryImage.hidden =
          true;
  
  
        galleryImage.removeAttribute(
          "src"
        );
  
  
        galleryImage.alt =
          "";
  
  
        galleryEmpty.hidden =
          false;
  
  
        galleryCounter.textContent =
          "";
  
  
        galleryThumbs.innerHTML =
          "";
  
  
        galleryPrev.hidden =
          true;
  
  
        galleryNext.hidden =
          true;
  
  
        galleryZoom.hidden =
          true;
  
  
        return;
  
      }
  
  
  
      /* ================================================
         CON IMÁGENES
      ================================================ */
  
      galleryEmpty.hidden =
        true;
  
  
      galleryImage.hidden =
        false;
  
  
      galleryZoom.hidden =
        false;
  
  
  
      const current =
        images[activeIndex];
  
  
  
      galleryImage.src =
        current.src;
  
  
      galleryImage.alt =
        current.alt ||
        activeGallery.title;
  
  
  
      galleryCounter.textContent =
        `${activeIndex + 1} de ${images.length}`;
  
  
  
      galleryPrev.hidden =
        images.length <= 1;
  
  
      galleryNext.hidden =
        images.length <= 1;
  
  
  
      /* ================================================
         MINIATURAS
      ================================================ */
  
      galleryThumbs.innerHTML =
  
        images
          .map(
            (item,index) => {
  
              return `
  
                <button
                  class="gallery-thumb ${index === activeIndex ? "is-active" : ""}"
                  type="button"
                  data-index="${index}"
                  aria-label="Ver imagen ${index + 1}"
                >
  
                  <img
                    src="${item.src}"
                    alt=""
                  >
  
                </button>
  
              `;
  
            }
          )
          .join("");
  
  
  
      galleryThumbs
        .querySelectorAll(
          ".gallery-thumb"
        )
        .forEach(button => {
  
          button.addEventListener(
            "click",
            () => {
  
              activeIndex =
                Number(
                  button.dataset.index
                );
  
  
              renderGallery();
  
            }
          );
  
        });
  
    }
  
  
  
    /* ==================================================
       ABRIR GALERÍA
    ================================================== */
  
    function openGallery(
      key,
      opener
    ) {
  
      const gallery =
        galleries[key];
  
  
      if (!gallery) {
  
        return;
  
      }
  
  
      activeGallery =
        gallery;
  
  
      activeIndex =
        0;
  
  
      lastFocused =
        opener ||
        document.activeElement;
  
  
      galleryTitle.textContent =
        gallery.title;
  
  
      renderGallery();
  
  
      modal.classList.add(
        "is-open"
      );
  
  
      modal.setAttribute(
        "aria-hidden",
        "false"
      );
  
  
      document.body.classList.add(
        "gallery-open"
      );
  
  
      const closeButton =
        modal.querySelector(
          ".gallery-close"
        );
  
  
      if (closeButton) {
  
        closeButton.focus();
  
      }
  
    }
  
  
  
    /* ==================================================
       CERRAR GALERÍA
    ================================================== */
  
    function closeGallery() {
  
      modal.classList.remove(
        "is-open"
      );
  
  
      modal.setAttribute(
        "aria-hidden",
        "true"
      );
  
  
      document.body.classList.remove(
        "gallery-open"
      );
  
  
      resetZoom();
  
  
      activeGallery =
        null;
  
  
      activeIndex =
        0;
  
  
      if (
        lastFocused &&
        typeof lastFocused.focus ===
        "function"
      ) {
  
        lastFocused.focus();
  
      }
  
    }
  
  
  
    /* ==================================================
       BOTONES "VER IMÁGENES"
    ================================================== */
  
    function bindGalleryButtons() {
  
      document
        .querySelectorAll(
          ".gallery-trigger"
        )
        .forEach(button => {
  
          button.addEventListener(
            "click",
            () => {
  
              openGallery(
                button.dataset.gallery,
                button
              );
  
            }
          );
  
        });
  
    }
  
  
  
    /* ==================================================
       CERRAR
    ================================================== */
  
    modal
      .querySelectorAll(
        "[data-gallery-close]"
      )
      .forEach(button => {
  
        button.addEventListener(
          "click",
          closeGallery
        );
  
      });
  
  
  
    /* ==================================================
       ANTERIOR
    ================================================== */
  
    galleryPrev.addEventListener(
      "click",
      () => {
  
        if (
          !activeGallery
          ?.images
          ?.length
        ) {
  
          return;
  
        }
  
  
        activeIndex =
  
          activeIndex === 0
  
            ? activeGallery
                .images
                .length - 1
  
            : activeIndex - 1;
  
  
        renderGallery();
  
      }
    );
  
  
  
    /* ==================================================
       SIGUIENTE
    ================================================== */
  
    galleryNext.addEventListener(
      "click",
      () => {
  
        if (
          !activeGallery
          ?.images
          ?.length
        ) {
  
          return;
  
        }
  
  
        activeIndex =
  
          activeIndex ===
          activeGallery.images.length - 1
  
            ? 0
  
            : activeIndex + 1;
  
  
        renderGallery();
  
      }
    );
  
  
  
    /* ==================================================
       ZOOM
    ================================================== */
  
    galleryZoom.addEventListener(
      "click",
      () => {
  
        if (
          !activeGallery
          ?.images
          ?.length
        ) {
  
          return;
  
        }
  
  
        const zoomed =
  
          galleryImageWrap
            .classList
            .toggle(
              "is-zoomed"
            );
  
  
        galleryZoom.textContent =
  
          zoomed
            ? "Reducir"
            : "Ampliar";
  
  
        galleryZoom.setAttribute(
  
          "aria-label",
  
          zoomed
            ? "Reducir imagen"
            : "Ampliar imagen"
  
        );
  
      }
    );
  
  
  
    /* ==================================================
       ZOOM AL TOCAR LA IMAGEN
    ================================================== */
  
    galleryImageWrap.addEventListener(
      "click",
      event => {
  
        if (
          event.target !==
          galleryImage
        ) {
  
          return;
  
        }
  
  
        if (
          !activeGallery
          ?.images
          ?.length
        ) {
  
          return;
  
        }
  
  
        galleryZoom.click();
  
      }
    );
  
  
  
    /* ==================================================
       SWIPE
    ================================================== */
  
    galleryImageWrap.addEventListener(
      "touchstart",
      event => {
  
        if (
          !event.touches.length
        ) {
  
          return;
  
        }
  
  
        touchStartX =
          event
            .touches[0]
            .clientX;
  
      },
      {
        passive:true
      }
    );
  
  
    galleryImageWrap.addEventListener(
      "touchend",
      event => {
  
        if (
          !event.changedTouches.length
        ) {
  
          return;
  
        }
  
  
        if (
          galleryImageWrap
            .classList
            .contains(
              "is-zoomed"
            )
        ) {
  
          return;
  
        }
  
  
        if (
          !activeGallery
          ?.images
          ?.length
        ) {
  
          return;
  
        }
  
  
        const touchEndX =
          event
            .changedTouches[0]
            .clientX;
  
  
        const difference =
          touchEndX -
          touchStartX;
  
  
        if (
          Math.abs(
            difference
          ) < 45
        ) {
  
          return;
  
        }
  
  
        if (
          difference > 0
        ) {
  
          galleryPrev.click();
  
        }
  
        else {
  
          galleryNext.click();
  
        }
  
      },
      {
        passive:true
      }
    );
  
  
  
    /* ==================================================
       TECLADO
    ================================================== */
  
    document.addEventListener(
      "keydown",
      event => {
  
        if (
          !modal
            .classList
            .contains(
              "is-open"
            )
        ) {
  
          return;
  
        }
  
  
        if (
          event.key ===
          "Escape"
        ) {
  
          closeGallery();
  
          return;
  
        }
  
  
        if (
          event.key ===
          "ArrowLeft"
        ) {
  
          galleryPrev.click();
  
        }
  
  
        if (
          event.key ===
          "ArrowRight"
        ) {
  
          galleryNext.click();
  
        }
  
      }
    );
  
  
  
    /* ==================================================
       INICIAR
    ================================================== */
  
    bindGalleryButtons();
  
  
  })();