(() => {

  /* ==================================================
     MENÚ MÓVIL
  ================================================== */

  const menuToggle =
    document.querySelector(".catalog-menu-toggle");

  const mainNav =
    document.getElementById("catalog-main-nav");


  function closeMenu() {

    if (!menuToggle || !mainNav) return;

    mainNav.classList.remove("mobile-open");

    menuToggle.setAttribute(
      "aria-expanded",
      "false"
    );

    menuToggle.setAttribute(
      "aria-label",
      "Abrir menú"
    );

  }


  if (menuToggle && mainNav) {

    menuToggle.addEventListener(
      "click",
      () => {

        const open =
          mainNav.classList.toggle(
            "mobile-open"
          );

        menuToggle.setAttribute(
          "aria-expanded",
          String(open)
        );

        menuToggle.setAttribute(
          "aria-label",
          open
            ? "Cerrar menú"
            : "Abrir menú"
        );

      }
    );


    mainNav
      .querySelectorAll("a")
      .forEach(link => {

        link.addEventListener(
          "click",
          closeMenu
        );

      });


    window.addEventListener(
      "resize",
      () => {

        if (
          window.innerWidth > 1000
        ) {

          closeMenu();

        }

      }
    );

  }



  /* ==================================================
     NAVEGACIÓN STICKY DE COLECCIONES
  ================================================== */

  const jumpLinks =
    [
      ...document.querySelectorAll(
        ".collection-jump a"
      )
    ];


  const sections =
    [
      ...document.querySelectorAll(
        ".collection-section[id]"
      )
    ];


  if (
    "IntersectionObserver" in window &&
    jumpLinks.length &&
    sections.length
  ) {

    const linkById =
      new Map(

        jumpLinks.map(
          link => [

            link
              .getAttribute("href")
              .slice(1),

            link

          ]
        )

      );


    const observer =
      new IntersectionObserver(
        entries => {

          entries.forEach(
            entry => {

              if (
                !entry.isIntersecting
              ) {

                return;

              }


              jumpLinks.forEach(
                link => {

                  link
                    .classList
                    .remove(
                      "is-active"
                    );

                }
              );


              const link =
                linkById.get(
                  entry.target.id
                );


              if (link) {

                link
                  .classList
                  .add(
                    "is-active"
                  );

              }

            }
          );

        },
        {
          rootMargin:
            "-28% 0px -60% 0px",

          threshold:0
        }
      );


    sections.forEach(
      section =>
        observer.observe(
          section
        )
    );

  }



  /* ==================================================
     CONSTRUIR GALERÍAS DESDE EL HTML
     No hay que duplicar las imágenes en JavaScript.
  ================================================== */

  const galleries = {};


  sections.forEach(
    section => {

      const key =
        section.id;


      const indexLabel =
        section
          .querySelector(
            ".collection-index"
          )
          ?.textContent
          ?.trim() ||
        key;


      const title =
        indexLabel
          .replace(
            /^\d+\s*·\s*/,
            ""
          );


      const buttons =
        [
          ...section
            .querySelectorAll(
              ".product-image-button"
            )
        ];


      galleries[key] = {

        title,

        images:
          buttons.map(
            button => ({

              src:
                button.dataset.image ||
                button
                  .querySelector("img")
                  ?.getAttribute("src") ||
                "",

              alt:
                button.dataset.title ||
                button
                  .querySelector("img")
                  ?.getAttribute("alt") ||
                title

            })
          )

      };

    }
  );



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
     ZOOM
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
     RENDER
  ================================================== */

  function renderGallery() {

    const images =
      activeGallery?.images ||
      [];


    resetZoom();


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


    galleryThumbs.innerHTML =

      images
        .map(
          (item,index) => `

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

          `
        )
        .join("");


    galleryThumbs
      .querySelectorAll(
        ".gallery-thumb"
      )
      .forEach(
        button => {

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

        }
      );


    const activeThumb =
      galleryThumbs.querySelector(
        ".gallery-thumb.is-active"
      );


    if (activeThumb) {

      activeThumb.scrollIntoView({
        behavior:"smooth",
        block:"nearest",
        inline:"center"
      });

    }

  }



  /* ==================================================
     ABRIR / CERRAR
  ================================================== */

  function openGallery(
    key,
    opener,
    startIndex = 0
  ) {

    const gallery =
      galleries[key];


    if (!gallery) return;


    activeGallery =
      gallery;


    activeIndex =
      Math.min(
        Math.max(
          Number(startIndex) || 0,
          0
        ),
        Math.max(
          gallery.images.length - 1,
          0
        )
      );


    lastFocused =
      opener ||
      document.activeElement;


    galleryTitle.textContent =
      gallery.title;


    renderGallery();


    modal
      .classList
      .add(
        "is-open"
      );


    modal.setAttribute(
      "aria-hidden",
      "false"
    );


    document.body
      .classList
      .add(
        "gallery-open"
      );


    modal
      .querySelector(
        ".gallery-close"
      )
      ?.focus();

  }


  function closeGallery() {

    modal
      .classList
      .remove(
        "is-open"
      );


    modal.setAttribute(
      "aria-hidden",
      "true"
    );


    document.body
      .classList
      .remove(
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

  document
    .querySelectorAll(
      ".gallery-trigger"
    )
    .forEach(
      button => {

        button.addEventListener(
          "click",
          () => {

            openGallery(
              button.dataset.gallery,
              button,
              0
            );

          }
        );

      }
    );



  /* ==================================================
     TARJETAS DE PRODUCTO
     Abren la misma galería en la imagen seleccionada.
  ================================================== */

  document
    .querySelectorAll(
      ".product-image-button"
    )
    .forEach(
      button => {

        button.addEventListener(
          "click",
          () => {

            openGallery(
              button.dataset.gallery,
              button,
              button.dataset.index
            );

          }
        );

      }
    );



  /* ==================================================
     CERRAR
  ================================================== */

  modal
    .querySelectorAll(
      "[data-gallery-close]"
    )
    .forEach(
      button => {

        button.addEventListener(
          "click",
          closeGallery
        );

      }
    );



  /* ==================================================
     ANTERIOR / SIGUIENTE
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
        activeGallery
          .images
          .length - 1

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


  galleryImageWrap.addEventListener(
    "click",
    event => {

      if (
        event.target ===
        galleryImage
      ) {

        galleryZoom.click();

      }

    }
  );



  /* ==================================================
     SWIPE MÓVIL
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
        !event.changedTouches.length ||
        galleryImageWrap
          .classList
          .contains(
            "is-zoomed"
          ) ||
        !activeGallery
          ?.images
          ?.length
      ) {

        return;

      }


      const difference =
        event
          .changedTouches[0]
          .clientX -
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

        if (
          event.key ===
          "Escape"
        ) {

          closeMenu();

        }

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


})();