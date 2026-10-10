document.addEventListener("DOMContentLoaded", async () => {

  const SUPABASE_URL =
    "https://xxeoeqxtkiorhzpgwmlr.supabase.co";

  const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_kTMNj8gACdB6woD-Eb_LhQ_CPxma8pB";

  const supabaseClient =
    window.supabase.createClient(
      SUPABASE_URL,
      SUPABASE_PUBLISHABLE_KEY
    );


    let allContacts = [];
    let currentCampaign = null;
    let currentContactFilter = "todos";
    let currentSearch = "";


  
  const CONTACTS_PER_PAGE = 10;
  let currentContactsPage = 1;
// =========================
  // ELEMENTOS
  // =========================

  const loginView =
    document.getElementById("login-view");

  const dashboardView =
    document.getElementById("dashboard-view");

  const loginForm =
    document.getElementById("login-form");

  const loginEmail =
    document.getElementById("login-email");

  const loginPassword =
    document.getElementById("login-password");

  const loginButton =
    document.getElementById("login-button");

  const loginStatus =
    document.getElementById("login-status");

  const logoutButton =
    document.getElementById("logout-button");

  const sessionEmail =
    document.getElementById("session-email");

  const topbarTitle =
    document.getElementById("topbar-title");

  const sidebar =
    document.getElementById("sidebar");

  const mobileMenuButton =
    document.getElementById("mobile-menu-button");

  const subscriberCount =
    document.getElementById("subscriber-count");

  const testEmail =
    document.getElementById("test-email");

  const testButton =
    document.getElementById("test-button");

  const testStatus =
    document.getElementById("test-status");

  const sendConfirmation =
    document.getElementById("send-confirmation");

  const sendButton =
    document.getElementById("send-button");

  const sendStatus =
    document.getElementById("send-status");

  const metricTotal =
    document.getElementById("metric-total");

  const metricEmail =
    document.getElementById("metric-email");

  const metricWhatsapp =
    document.getElementById("metric-whatsapp");

  const recentContacts =
    document.getElementById("recent-contacts");

  const contactsList =
    document.getElementById("contacts-list");

  const contactsSearch =
    document.getElementById("contacts-search");

  const contactsResultCount =
    document.getElementById("contacts-result-count");

  const contactsPagination =
    document.getElementById("contacts-pagination");

  const currentDate =
    document.getElementById("current-date");

  const historyList =
    document.getElementById("history-list");

  const contactModal =
    document.getElementById("contact-modal");

  const contactModalClose =
    document.getElementById("contact-modal-close");

  const metricCampaignName =
    document.getElementById("metric-campaign-name");
  
  const campaignTitleName =
    document.getElementById("campaign-title-name");
  
  const campaignSubject =
    document.getElementById("campaign-subject");

    const newCampaignButton =
    document.getElementById("new-campaign-button");
  
  const editCampaignButton =
    document.getElementById("edit-campaign-button");
  
  const campaignModal =
    document.getElementById("campaign-modal");
  
  const campaignModalClose =
    document.getElementById("campaign-modal-close");
  
  const campaignModalTitle =
    document.getElementById("campaign-modal-title");
  
  const campaignForm =
    document.getElementById("campaign-form");
  
  const campaignName =
    document.getElementById("campaign-name");
  
  const campaignSubjectInput =
    document.getElementById("campaign-subject-input");
  
  const campaignPreheader =
    document.getElementById("campaign-preheader");
  
  const campaignTitleInput =
    document.getElementById("campaign-title-input");
  
  const campaignMessageInput =
    document.getElementById("campaign-message-input");
  
  const campaignButtonText =
    document.getElementById("campaign-button-text");
  
  const campaignButtonUrl =
    document.getElementById("campaign-button-url");
  
  const campaignSaveButton =
    document.getElementById("campaign-save-button");
  
  const campaignFormStatus =
    document.getElementById("campaign-form-status");

  const whatsappTestPhone =
    document.getElementById("whatsapp-test-phone");

  const whatsappTestButton =
    document.getElementById("whatsapp-test-button");

  const whatsappTestStatus =
    document.getElementById("whatsapp-test-status");

  const whatsappSendConfirmation =
    document.getElementById("whatsapp-send-confirmation");

  const whatsappSendButton =
    document.getElementById("whatsapp-send-button");

  const whatsappSendStatus =
    document.getElementById("whatsapp-send-status");

  const clientRegisterForm =
    document.getElementById("client-register-form");

  const clientRegisterButton =
    document.getElementById("client-register-button");

  const clientRegisterStatus =
    document.getElementById("client-register-status");

  const clientName =
    document.getElementById("client-name");

  const clientPhone =
    document.getElementById("client-phone");

  const clientEmail =
    document.getElementById("client-email");

  const clientBusiness =
    document.getElementById("client-business");

  const clientProvider =
    document.getElementById("client-provider");

  const clientRooms =
    document.getElementById("client-rooms");

  const clientLocation =
    document.getElementById("client-location");

  const clientInterest =
    document.getElementById("client-interest");

  const clientMessage =
    document.getElementById("client-message");

  const clientAcceptEmail =
    document.getElementById("client-accept-email");

  const clientAcceptWhatsapp =
    document.getElementById("client-accept-whatsapp");


  // =========================
  // UTILIDADES
  // =========================

  function setStatus(
    element,
    message = "",
    type = ""
  ) {

    element.textContent = message;

    element.classList.remove(
      "success",
      "error"
    );

    if (type) {
      element.classList.add(type);
    }

  }


  function formatDate(
    value,
    includeTime = false
  ) {

    if (!value) {
      return "—";
    }

    const date =
      new Date(value);

    if (
      Number.isNaN(
        date.getTime()
      )
    ) {
      return "—";
    }

    const options = {
      day: "2-digit",
      month: "short",
      year: "numeric"
    };

    if (includeTime) {
      options.hour = "2-digit";
      options.minute = "2-digit";
    }

    return new Intl.DateTimeFormat(
      "es-MX",
      options
    ).format(date);

  }


  function safeText(
    value,
    fallback = "—"
  ) {

    if (
      value === null ||
      value === undefined ||
      String(value).trim() === ""
    ) {
      return fallback;
    }

    return String(value).trim();

  }


  function escapeHtml(
    value
  ) {

    return String(
      value ?? ""
    )
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  }


  function normalize(
    value
  ) {

    return String(
      value ?? ""
    )
      .normalize("NFD")
      .replace(
        /[\u0300-\u036f]/g,
        ""
      )
      .toLowerCase()
      .trim();

  }


  function showLogin() {

    loginView.classList.remove("hidden");
    dashboardView.classList.add("hidden");

  }


  function showDashboard(
    email = ""
  ) {

    loginView.classList.add("hidden");
    dashboardView.classList.remove("hidden");

    sessionEmail.textContent =
      email ||
      "Administrador MALAK";

  }


  async function getFunctionError(
    error
  ) {

    try {

      if (
        error?.context &&
        typeof error.context.json ===
          "function"
      ) {

        const details =
          await error.context.json();

        return (
          details?.error ||
          details?.message ||
          error.message
        );

      }

    } catch (_) {}

    return (
      error?.message ||
      "No se pudo completar la solicitud."
    );

  }


  async function invokeCampaign(
    body
  ) {

    const {
      data,
      error
    } =
      await supabaseClient
        .functions
        .invoke(
          "enviar-campana-malak",
          {
            body
          }
        );

    if (error) {

      throw new Error(
        await getFunctionError(
          error
        )
      );

    }

    if (
      !data ||
      data.success !== true
    ) {

      throw new Error(
        data?.error ||
        "La operación no pudo completarse."
      );

    }

    return data;

  }


  async function invokeWhatsapp(
    body
  ) {

    const {
      data,
      error
    } =
      await supabaseClient
        .functions
        .invoke(
          "enviar-whatsapp-malak",
          {
            body
          }
        );


    if (error) {

      throw new Error(
        await getFunctionError(
          error
        )
      );

    }


    if (
      !data ||
      data.success !== true
    ) {

      throw new Error(
        data?.error ||
        "No se pudo enviar el WhatsApp."
      );

    }


    return data;

  }


  // =========================
  // NAVEGACIÓN
  // =========================

  function goToSection(
    sectionName
  ) {

    document
      .querySelectorAll(
        ".app-section"
      )
      .forEach(
        (section) => {

          section
            .classList
            .toggle(
              "active",
              section.id ===
                `section-${sectionName}`
            );

        }
      );


    document
      .querySelectorAll(
        ".nav-item[data-section]"
      )
      .forEach(
        (button) => {

          button
            .classList
            .toggle(
              "active",
              button.dataset.section ===
                sectionName
            );

        }
      );


    const labels = {
      resumen: "Resumen",
      contactos: "Contactos",
      email: "Email",
      historial: "Historial",
      whatsapp: "WhatsApp",
      "registrar-cliente": "Registrar clientes"
    };


    topbarTitle.textContent =
      labels[sectionName] ||
      "MALAK";


    sidebar.classList.remove(
      "open"
    );


    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }


  document
    .querySelectorAll(
      ".nav-item[data-section]"
    )
    .forEach(
      (button) => {

        button.addEventListener(
          "click",
          () => {

            goToSection(
              button.dataset.section
            );

          }
        );

      }
    );


  document
    .querySelectorAll(
      "[data-go-section]"
    )
    .forEach(
      (button) => {

        button.addEventListener(
          "click",
          () => {

            goToSection(
              button.dataset.goSection
            );

          }
        );

      }
    );


  mobileMenuButton.addEventListener(
    "click",
    () => {

      sidebar.classList.toggle(
        "open"
      );

    }
  );


  // =========================
  // CONTACTOS
  // =========================

  async function loadContacts() {

    const {
      data,
      error
    } =
      await supabaseClient
        .from(
          "contactos_malak"
        )
        .select(`
          id,
          created_at,
          nombre,
          telefono,
          correo,
          negocio,
          proveedor,
          habitaciones,
          ubicacion,
          interes,
          mensaje,
          acepta_email,
          acepta_whatsapp,
          fecha_consentimiento,
          origen,
          activo
        `)
        .order(
          "created_at",
          {
            ascending: false
          }
        );


    if (error) {

      console.error(
        "Error cargando contactos:",
        error
      );

      allContacts = [];

      renderMetrics();
      renderRecentContacts();
      renderContacts();

      throw new Error(
        "No se pudieron cargar los contactos."
      );
    }


    allContacts =
      data || [];


    renderMetrics();
    renderRecentContacts();
    renderContacts();

  }


  function renderMetrics() {

    const activeContacts =
      allContacts.filter(
        (contact) =>
          contact.activo !== false
      );

    const emailContacts =
      activeContacts.filter(
        (contact) =>
          contact.acepta_email === true &&
          safeText(
            contact.correo,
            ""
          ) !== ""
      );

    const whatsappContacts =
      activeContacts.filter(
        (contact) =>
          contact.acepta_whatsapp === true &&
          safeText(
            contact.telefono,
            ""
          ) !== ""
      );


    metricTotal.textContent =
      String(
        activeContacts.length
      );

    metricEmail.textContent =
      String(
        emailContacts.length
      );

    metricWhatsapp.textContent =
      String(
        whatsappContacts.length
      );

    
    const whatsappSubscriberCount =
      document.getElementById(
        "whatsapp-subscriber-count"
      );

    if (whatsappSubscriberCount) {

      whatsappSubscriberCount.textContent =
        String(
          whatsappContacts.length
        );

    }

subscriberCount.textContent =
      String(
        emailContacts.length
      );

  }


  function renderRecentContacts() {

    const recent =
      allContacts
        .filter(
          (contact) =>
            contact.activo !== false
        )
        .slice(
          0,
          5
        );


    if (
      recent.length === 0
    ) {

      recentContacts.innerHTML =
        `
          <div class="empty-state compact">
            Aún no hay contactos registrados.
          </div>
        `;

      return;
    }


    recentContacts.innerHTML =
      recent
        .map(
          (contact) => {

            const channels = [];

            if (
              contact.acepta_email
            ) {
              channels.push(
                `<span class="mini-channel">Email</span>`
              );
            }

            if (
              contact.acepta_whatsapp
            ) {
              channels.push(
                `<span class="mini-channel">WhatsApp</span>`
              );
            }

            if (
              channels.length === 0
            ) {
              channels.push(
                `<span class="mini-channel">Contacto</span>`
              );
            }


            return `
              <div class="recent-contact">

                <div>
                  <strong>
                    ${escapeHtml(
                      safeText(
                        contact.nombre,
                        "Sin nombre"
                      )
                    )}
                  </strong>

                  <small>
                    ${escapeHtml(
                      safeText(
                        contact.negocio,
                        "Sin negocio"
                      )
                    )}
                    ·
                    ${escapeHtml(
                      formatDate(
                        contact.created_at
                      )
                    )}
                  </small>
                </div>

                <div class="recent-channels">
                  ${channels.join("")}
                </div>

              </div>
            `;

          }
        )
        .join("");

  }


  function contactMatchesSearch(
    contact
  ) {

    if (!currentSearch) {
      return true;
    }


    const haystack =
      normalize(
        [
          contact.nombre,
          contact.negocio,
          contact.correo,
          contact.telefono,
          contact.ubicacion,
          contact.interes
        ]
          .filter(Boolean)
          .join(" ")
      );


    return haystack.includes(
      currentSearch
    );

  }


  function contactMatchesFilter(
    contact
  ) {

    switch (
      currentContactFilter
    ) {

      case "email":
        return (
          contact.activo !== false &&
          contact.acepta_email === true
        );

      case "whatsapp":
        return (
          contact.activo !== false &&
          contact.acepta_whatsapp === true
        );

      case "inactivos":
        return (
          contact.activo === false
        );

      default:
        return true;

    }

  }


  function renderContactsPagination(
    totalResults,
    totalPages,
    startIndex,
    visibleCount
  ) {

    if (!contactsPagination) {
      return;
    }


    if (
      totalResults === 0 ||
      totalPages <= 1
    ) {

      contactsPagination.innerHTML = "";
      contactsPagination.classList.add(
        "hidden"
      );

      return;
    }


    contactsPagination.classList.remove(
      "hidden"
    );


    const firstVisible =
      startIndex + 1;

    const lastVisible =
      startIndex + visibleCount;


    const pageCandidates =
      [
        1,
        currentContactsPage - 1,
        currentContactsPage,
        currentContactsPage + 1,
        totalPages
      ]
        .filter(
          (page) =>
            page >= 1 &&
            page <= totalPages
        )
        .filter(
          (page, index, array) =>
            array.indexOf(page) === index
        )
        .sort(
          (a, b) => a - b
        );


    const pageParts = [];

    pageCandidates.forEach(
      (page, index) => {

        const previousPage =
          pageCandidates[index - 1];


        if (
          previousPage &&
          page - previousPage > 1
        ) {

          pageParts.push(
            `<span class="pagination-ellipsis" aria-hidden="true">…</span>`
          );

        }


        pageParts.push(
          `
            <button
              type="button"
              class="pagination-page ${page === currentContactsPage ? "active" : ""}"
              data-contacts-page="${page}"
              aria-label="Ir a la página ${page}"
              ${page === currentContactsPage ? 'aria-current="page"' : ""}
            >
              ${page}
            </button>
          `
        );

      }
    );


    contactsPagination.innerHTML =
      `
        <div class="pagination-summary">
          Mostrando
          <strong>${firstVisible}–${lastVisible}</strong>
          de
          <strong>${totalResults}</strong>
        </div>

        <div class="pagination-controls">

          <button
            type="button"
            class="pagination-nav"
            data-contacts-page="${currentContactsPage - 1}"
            ${currentContactsPage === 1 ? "disabled" : ""}
          >
            Anterior
          </button>

          <div class="pagination-pages">
            ${pageParts.join("")}
          </div>

          <button
            type="button"
            class="pagination-nav"
            data-contacts-page="${currentContactsPage + 1}"
            ${currentContactsPage === totalPages ? "disabled" : ""}
          >
            Siguiente
          </button>

        </div>
      `;


    contactsPagination
      .querySelectorAll(
        "[data-contacts-page]"
      )
      .forEach(
        (button) => {

          button.addEventListener(
            "click",
            () => {

              if (button.disabled) {
                return;
              }


              const nextPage =
                Number(
                  button.dataset.contactsPage
                );


              if (
                !Number.isInteger(nextPage) ||
                nextPage < 1 ||
                nextPage > totalPages ||
                nextPage === currentContactsPage
              ) {
                return;
              }


              currentContactsPage =
                nextPage;


              renderContacts();


              document
                .getElementById(
                  "section-contactos"
                )
                ?.scrollIntoView({
                  behavior: "smooth",
                  block: "start"
                });

            }
          );

        }
      );

  }


  function renderContacts() {

    const filtered =
      allContacts.filter(
        (contact) =>
          contactMatchesSearch(
            contact
          ) &&
          contactMatchesFilter(
            contact
          )
      );


    contactsResultCount.textContent =
      String(
        filtered.length
      );


    if (
      filtered.length === 0
    ) {

      currentContactsPage = 1;

      contactsList.innerHTML =
        `
          <div class="empty-state">
            No encontramos contactos con esos filtros.
          </div>
        `;

      renderContactsPagination(
        0,
        0,
        0,
        0
      );

      return;
    }


    const totalPages =
      Math.ceil(
        filtered.length /
        CONTACTS_PER_PAGE
      );


    if (
      currentContactsPage >
      totalPages
    ) {

      currentContactsPage =
        totalPages;

    }


    if (
      currentContactsPage < 1
    ) {

      currentContactsPage = 1;

    }


    const startIndex =
      (
        currentContactsPage - 1
      ) *
      CONTACTS_PER_PAGE;


    const pageContacts =
      filtered.slice(
        startIndex,
        startIndex +
        CONTACTS_PER_PAGE
      );


    contactsList.innerHTML =
      pageContacts
        .map(
          (contact) => {

            const emailClass =
              contact.acepta_email
                ? "active"
                : "";

            const whatsappClass =
              contact.acepta_whatsapp
                ? "active"
                : "";

            const active =
              contact.activo !== false;


            return `
              <article class="contact-row">

                <div class="contact-main">

                  <strong>
                    ${escapeHtml(
                      safeText(
                        contact.nombre,
                        "Sin nombre"
                      )
                    )}
                  </strong>

                  <span>
                    ${escapeHtml(
                      safeText(
                        contact.negocio,
                        "Sin negocio"
                      )
                    )}
                  </span>

                  <small>
                    ${escapeHtml(
                      safeText(
                        contact.correo,
                        "Sin correo"
                      )
                    )}
                    ·
                    ${escapeHtml(
                      safeText(
                        contact.telefono,
                        "Sin teléfono"
                      )
                    )}
                  </small>

                </div>


                <div class="channel-tags">

                  <span class="channel-tag ${emailClass}">
                    Email
                  </span>

                  <span class="channel-tag ${whatsappClass}">
                    WhatsApp
                  </span>

                </div>


                <div class="contact-date">
                  ${escapeHtml(
                    formatDate(
                      contact.created_at
                    )
                  )}
                </div>


                <div>
                  <span class="status-badge ${active ? "active" : "inactive"}">
                    ${active ? "Activo" : "Inactivo"}
                  </span>
                </div>


                <div>
                  <button
                    type="button"
                    class="row-button"
                    data-contact-id="${contact.id}"
                  >
                    Ver
                  </button>
                </div>

              </article>
            `;

          }
        )
        .join("");


    contactsList
      .querySelectorAll(
        "[data-contact-id]"
      )
      .forEach(
        (button) => {

          button.addEventListener(
            "click",
            () => {

              openContactModal(
                button.dataset.contactId
              );

            }
          );

        }
      );


    renderContactsPagination(
      filtered.length,
      totalPages,
      startIndex,
      pageContacts.length
    );

  }

  contactsSearch.addEventListener(
    "input",
    () => {

      currentSearch =
        normalize(
          contactsSearch.value
        );

      currentContactsPage = 1;

      renderContacts();

    }
  );


  document
    .querySelectorAll(
      "[data-contact-filter]"
    )
    .forEach(
      (button) => {

        button.addEventListener(
          "click",
          () => {

            currentContactFilter =
              button.dataset.contactFilter;


            document
              .querySelectorAll(
                "[data-contact-filter]"
              )
              .forEach(
                (item) =>
                  item.classList.remove(
                    "active"
                  )
              );


            button.classList.add(
              "active"
            );


            currentContactsPage = 1;

            renderContacts();

          }
        );

      }
    );


  // =========================
  // MODAL CONTACTO
  // =========================

  function openContactModal(
    contactId
  ) {

    const contact =
      allContacts.find(
        (item) =>
          String(item.id) ===
          String(contactId)
      );


    if (!contact) {
      return;
    }


    document.getElementById(
      "detail-name"
    ).textContent =
      safeText(
        contact.nombre,
        "Sin nombre"
      );


    document.getElementById(
      "detail-business"
    ).textContent =
      safeText(
        contact.negocio,
        "Sin negocio registrado"
      );


    document.getElementById(
      "detail-email"
    ).textContent =
      safeText(
        contact.correo,
        "Sin correo"
      );


    document.getElementById(
      "detail-phone"
    ).textContent =
      safeText(
        contact.telefono,
        "Sin teléfono"
      );


    document.getElementById(
      "detail-location"
    ).textContent =
      safeText(
        contact.ubicacion,
        "Sin ubicación"
      );


    document.getElementById(
      "detail-rooms"
    ).textContent =
      safeText(
        contact.habitaciones,
        "No indicado"
      );


    document.getElementById(
      "detail-interest"
    ).textContent =
      safeText(
        contact.interes,
        "No indicado"
      );


    document.getElementById(
      "detail-provider"
    ).textContent =
      safeText(
        contact.proveedor,
        "No indicado"
      );


    document.getElementById(
      "detail-email-consent"
    ).textContent =
      contact.acepta_email
        ? "Suscrito"
        : "No suscrito";


    document.getElementById(
      "detail-whatsapp-consent"
    ).textContent =
      contact.acepta_whatsapp
        ? "Suscrito"
        : "No suscrito";


    document.getElementById(
      "detail-status"
    ).textContent =
      contact.activo !== false
        ? "Activo"
        : "Inactivo";


    document.getElementById(
      "detail-message"
    ).textContent =
      safeText(
        contact.mensaje,
        "Sin mensaje."
      );


    document.getElementById(
      "detail-created"
    ).textContent =
      formatDate(
        contact.created_at,
        true
      );


    contactModal.classList.remove(
      "hidden"
    );

    document.body.style.overflow =
      "hidden";

  }


  function closeContactModal() {

    contactModal.classList.add(
      "hidden"
    );

    document.body.style.overflow =
      "";

  }


  contactModalClose.addEventListener(
    "click",
    closeContactModal
  );


  contactModal.addEventListener(
    "click",
    (event) => {

      if (
        event.target ===
        contactModal
      ) {
        closeContactModal();
      }

    }
  );


  document.addEventListener(
      "keydown",
      (event) => {
    
        if (
          event.key !== "Escape"
        ) {
          return;
        }
    
    
        if (
          !contactModal.classList.contains(
            "hidden"
          )
        ) {
    
          closeContactModal();
    
        }
    
    
        if (
          !campaignModal.classList.contains(
            "hidden"
          )
        ) {
    
          closeCampaignModal();
    
        }
    
      }
    );

  // =========================
  // HISTORIAL
  // =========================

  async function loadHistory() {

    const {
      data,
      error
    } =
      await supabaseClient
        .from(
          "envios_campana_malak"
        )
        .select(`
          id,
          created_at,
          canal,
          destinatario,
          estado,
          enviado_at,
          campanas_malak (
            nombre
          )
        `)
        .order(
          "created_at",
          {
            ascending: false
          }
        )
        .limit(
          50
        );


    if (error) {

      console.error(
        "Error cargando historial:",
        error
      );

      return;
    }


    const rows =
      data || [];


    if (
      rows.length === 0
    ) {

      historyList.innerHTML =
        `
          <div class="empty-state">
            Aún no hay envíos registrados en el historial.
          </div>
        `;

      return;
    }


    historyList.innerHTML =
      rows
        .map(
          (row) => {

            const campaign =
              row.campanas_malak?.nombre ||
              "Campaña";


            return `
              <div class="history-row">

                <strong>
                  ${escapeHtml(
                    campaign
                  )}
                </strong>

                <span>
                  ${escapeHtml(
                    safeText(
                      row.canal,
                      "—"
                    )
                  )}
                </span>

                <span>
                  ${escapeHtml(
                    safeText(
                      row.destinatario,
                      "—"
                    )
                  )}
                </span>

                <span>
                  ${escapeHtml(
                    safeText(
                      row.estado,
                      "—"
                    )
                  )}
                </span>

                <span>
                  ${escapeHtml(
                    formatDate(
                      row.enviado_at ||
                      row.created_at,
                      true
                    )
                  )}
                </span>

              </div>
            `;

          }
        )
        .join("");

  }

// =========================
// CAMPAÑA ACTUAL
// =========================

async function loadCurrentCampaign() {

  const {
    data,
    error
  } =
    await supabaseClient
      .from("campanas_malak")
      .select(`
        id,
        nombre,
        canal,
        estado,
        asunto,
        preheader,
        titulo,
        mensaje,
        texto_boton,
        url_boton,
        created_at,
        updated_at
      `)
      .eq("canal", "email")
      .neq("estado", "archivada")
      .order("created_at", {
        ascending: false
      })
      .limit(1)
      .maybeSingle();


  if (error) {

    console.error(
      "Error cargando campaña:",
      error
    );

    throw new Error(
      "No se pudo cargar la campaña actual."
    );
  }

  currentCampaign =
    data || null;


  if (!currentCampaign) {

    metricCampaignName.textContent =
      "Sin campaña";

    campaignTitleName.textContent =
      "Sin campaña activa";

    campaignSubject.textContent =
      "Crea una campaña para comenzar.";

    return;
  }


  metricCampaignName.textContent =
    currentCampaign.nombre;


  campaignTitleName.textContent =
    currentCampaign.nombre;


  campaignSubject.textContent =
    currentCampaign.asunto
      ? `“${currentCampaign.asunto}”`
      : "Sin asunto definido";

}

// =========================
// EDITOR DE CAMPAÑAS
// =========================

function openCampaignModal(
  mode = "new"
) {

  setStatus(
    campaignFormStatus,
    ""
  );


  campaignForm.dataset.mode =
    mode;


  if (
    mode === "edit" &&
    currentCampaign
  ) {

    campaignModalTitle.textContent =
      "Editar campaña";


    campaignName.value =
      currentCampaign.nombre || "";


    campaignSubjectInput.value =
      currentCampaign.asunto || "";


    campaignPreheader.value =
      currentCampaign.preheader || "";


    campaignTitleInput.value =
      currentCampaign.titulo || "";


    campaignMessageInput.value =
      currentCampaign.mensaje || "";


    campaignButtonText.value =
      currentCampaign.texto_boton || "";


    campaignButtonUrl.value =
      currentCampaign.url_boton || "";

  } else {

    campaignModalTitle.textContent =
      "Nueva campaña";


    campaignForm.reset();

  }


  campaignModal.classList.remove(
    "hidden"
  );


  document.body.style.overflow =
    "hidden";

}


function closeCampaignModal() {

  campaignModal.classList.add(
    "hidden"
  );


  document.body.style.overflow =
    "";

}


newCampaignButton.addEventListener(
  "click",
  () => {

    openCampaignModal(
      "new"
    );

  }
);


editCampaignButton.addEventListener(
  "click",
  () => {

    if (
      !currentCampaign
    ) {

      setStatus(
        sendStatus,
        "No hay una campaña para editar.",
        "error"
      );

      return;
    }


    openCampaignModal(
      "edit"
    );

  }
);


campaignModalClose.addEventListener(
  "click",
  closeCampaignModal
);


campaignModal.addEventListener(
  "click",
  (event) => {

    if (
      event.target ===
      campaignModal
    ) {

      closeCampaignModal();

    }

  }
);


campaignForm.addEventListener(
  "submit",
  async (event) => {

    event.preventDefault();


    setStatus(
      campaignFormStatus,
      ""
    );


    const mode =
      campaignForm.dataset.mode ||
      "new";


    const nombre =
      campaignName.value.trim();


    const asunto =
      campaignSubjectInput.value.trim();


    const preheader =
      campaignPreheader.value.trim();


    const titulo =
      campaignTitleInput.value.trim();


    const mensaje =
      campaignMessageInput.value.trim();


    const textoBoton =
      campaignButtonText.value.trim();


    const urlBoton =
      campaignButtonUrl.value.trim();


    if (
      !nombre ||
      !asunto
    ) {

      setStatus(
        campaignFormStatus,
        "El nombre y el asunto son obligatorios.",
        "error"
      );

      return;
    }


    campaignSaveButton.disabled =
      true;


    campaignSaveButton.textContent =
      "Guardando…";


    try {

      const {
        data: authData,
        error: authError
      } =
        await supabaseClient
          .auth
          .getUser();


      if (
        authError ||
        !authData.user
      ) {

        throw new Error(
          "Tu sesión ya no es válida."
        );

      }


      const campaignData = {

        nombre,

        canal:
          "email",

        estado:
          "borrador",

        asunto,

        preheader:
          preheader || null,

        titulo:
          titulo || null,

        mensaje:
          mensaje || null,

        texto_boton:
          textoBoton || null,

        url_boton:
          urlBoton || null,

        updated_at:
          new Date().toISOString()

      };


      if (
        mode === "edit"
      ) {

        if (
          !currentCampaign?.id
        ) {

          throw new Error(
            "No se encontró la campaña que deseas editar."
          );

        }


        const {
          error
        } =
          await supabaseClient
            .from(
              "campanas_malak"
            )
            .update(
              campaignData
            )
            .eq(
              "id",
              currentCampaign.id
            );


        if (error) {
          throw error;
        }


        setStatus(
          campaignFormStatus,
          "Campaña actualizada correctamente.",
          "success"
        );

      } else {

        campaignData.created_by =
          authData.user.id;


        const {
          error
        } =
          await supabaseClient
            .from(
              "campanas_malak"
            )
            .insert(
              campaignData
            );


        if (error) {
          throw error;
        }


        setStatus(
          campaignFormStatus,
          "Campaña creada correctamente.",
          "success"
        );

      }


      await loadCurrentCampaign();


      setTimeout(
        () => {

          closeCampaignModal();

        },
        700
      );


    } catch (error) {

      console.error(
        "Error guardando campaña:",
        error
      );


      setStatus(
        campaignFormStatus,
        error.message ||
        "No se pudo guardar la campaña.",
        "error"
      );

    } finally {

      campaignSaveButton.disabled =
        false;


      campaignSaveButton.textContent =
        "Guardar campaña";

    }

  }
);


  // =========================
  // EMAIL
  // =========================

  async function loadEmailStatus() {

    try {

      const data =
        await invokeCampaign({
          accion: "estado"
        });


      subscriberCount.textContent =
        String(
          data.suscriptores ?? 0
        );

    } catch (error) {

      setStatus(
        sendStatus,
        error.message,
        "error"
      );

    }

  }


  testButton.addEventListener(
    "click",
    async () => {

      const correo =
        testEmail.value
          .trim()
          .toLowerCase();


      setStatus(
        testStatus,
        ""
      );


      if (
        !correo ||
        !correo.includes("@")
      ) {

        setStatus(
          testStatus,
          "Escribe un correo válido para la prueba.",
          "error"
        );

        return;
      }


      testButton.disabled = true;
      testButton.textContent =
        "Enviando prueba…";


      try {

          const data =
          await invokeCampaign({
            accion: "prueba",
            to: correo,
            campana_id: currentCampaign?.id
          });


        setStatus(
          testStatus,
          data.message ||
          "Correo de prueba enviado.",
          "success"
        );

      } catch (error) {

        setStatus(
          testStatus,
          error.message,
          "error"
        );

      } finally {

        testButton.disabled = false;
        testButton.textContent =
          "Enviar correo de prueba";

      }

    }
  );


  sendConfirmation.addEventListener(
    "input",
    () => {

      sendButton.disabled =
        sendConfirmation.value
          .trim()
          .toUpperCase() !==
        "ENVIAR";

    }
  );


  sendButton.addEventListener(
    "click",
    async () => {

      const confirmation =
        sendConfirmation.value
          .trim()
          .toUpperCase();


      if (
        confirmation !==
        "ENVIAR"
      ) {

        setStatus(
          sendStatus,
          'Escribe "ENVIAR" para confirmar.',
          "error"
        );

        return;
      }


      const total =
        subscriberCount.textContent;


      const accepted =
        window.confirm(
          `Vas a enviar la campaña a ${total} suscriptor(es). ¿Deseas continuar?`
        );


      if (!accepted) {
        return;
      }


      setStatus(
        sendStatus,
        ""
      );


      sendConfirmation.disabled =
        true;

      sendButton.disabled =
        true;

      sendButton.textContent =
        "Enviando campaña…";


      try {

          const data =
           await invokeCampaign({
             accion: "enviar",
             confirmar: "ENVIAR",
             campana_id: currentCampaign?.id
          });


        setStatus(
          sendStatus,
          `${data.message} Enviados: ${data.enviados}.`,
          "success"
        );

        await loadCurrentCampaign();
        await loadHistory();

        sendConfirmation.value =
          "";

      } catch (error) {

        setStatus(
          sendStatus,
          error.message,
          "error"
        );

      } finally {

        sendConfirmation.disabled =
          false;

        sendButton.disabled =
          true;

        sendButton.textContent =
          "Enviar a todos los suscriptores";

      }

    }
  );


  // =========================
  // WHATSAPP · PRUEBA
  // =========================

  if (
    whatsappTestButton &&
    whatsappTestPhone &&
    whatsappTestStatus
  ) {

    whatsappTestButton.addEventListener(
      "click",
      async () => {

        const telefono =
          whatsappTestPhone.value
            .trim();

        const telefonoLimpio =
          telefono.replace(
            /\D/g,
            ""
          );


        setStatus(
          whatsappTestStatus,
          ""
        );


        if (
          telefonoLimpio.length < 10 ||
          telefonoLimpio.length > 15
        ) {

          setStatus(
            whatsappTestStatus,
            "Escribe un número de teléfono válido.",
            "error"
          );

          return;

        }


        whatsappTestButton.disabled =
          true;

        whatsappTestButton.textContent =
          "Enviando WhatsApp…";


        try {

          const data =
            await invokeWhatsapp({
              accion: "prueba",
              to: telefono
            });


          setStatus(
            whatsappTestStatus,
            data.message ||
            "WhatsApp de prueba enviado correctamente.",
            "success"
          );


        } catch (error) {

          console.error(
            "Error enviando WhatsApp de prueba:",
            error
          );


          setStatus(
            whatsappTestStatus,
            error.message ||
            "No se pudo enviar el WhatsApp de prueba.",
            "error"
          );


        } finally {

          whatsappTestButton.disabled =
            false;

          whatsappTestButton.textContent =
            "Enviar WhatsApp de prueba";

        }

      }
    );

  }


  // =========================
  // WHATSAPP · ENVÍO GENERAL
  // Preparado, pero bloqueado hasta
  // que Meta apruebe la plantilla.
  // =========================

  if (
    whatsappSendConfirmation &&
    whatsappSendButton &&
    whatsappSendStatus
  ) {

    whatsappSendConfirmation.addEventListener(
      "input",
      () => {

        whatsappSendButton.disabled =
          true;

        setStatus(
          whatsappSendStatus,
          "Se habilitará cuando temporada_alta_malak sea aprobada."
        );

      }
    );

  }


  // =========================
  // REGISTRAR CLIENTES
  // =========================

  if (
    clientRegisterForm &&
    clientRegisterButton &&
    clientRegisterStatus
  ) {

    clientRegisterForm.addEventListener(
      "submit",
      async (event) => {

        event.preventDefault();

        setStatus(
          clientRegisterStatus,
          ""
        );


        const nombre =
          clientName?.value.trim() || "";

        const telefono =
          clientPhone?.value.trim() || "";

        const correo =
          clientEmail?.value.trim() || "";

        const negocio =
          clientBusiness?.value.trim() || "";

        const proveedor =
          clientProvider?.value.trim() || "";

        const habitaciones =
          clientRooms?.value.trim() || "";

        const ubicacion =
          clientLocation?.value.trim() || "";

        const interes =
          clientInterest?.value || "";

        const mensaje =
          clientMessage?.value.trim() || "";

        const aceptaEmail =
          clientAcceptEmail?.checked || false;

        const aceptaWhatsApp =
          clientAcceptWhatsapp?.checked || false;


        if (
          !nombre ||
          !telefono ||
          !interes
        ) {

          setStatus(
            clientRegisterStatus,
            "Completa nombre, teléfono y producto de interés.",
            "error"
          );

          return;
        }


        if (
          aceptaEmail &&
          !correo
        ) {

          setStatus(
            clientRegisterStatus,
            "Escribe el correo del cliente para autorizar promociones por email.",
            "error"
          );

          clientEmail?.focus();

          return;
        }


        const fechaConsentimiento =
          (
            aceptaEmail ||
            aceptaWhatsApp
          )
            ? new Date().toISOString()
            : null;


        const registro = {
          nombre,
          telefono,
          correo:
            correo || null,
          negocio:
            negocio || null,
          proveedor:
            proveedor || null,
          habitaciones:
            habitaciones
              ? Number.parseInt(
                  habitaciones,
                  10
                )
              : null,
          ubicacion:
            ubicacion || null,
          interes,
          mensaje:
            mensaje || null,
          acepta_email:
            aceptaEmail,
          acepta_whatsapp:
            aceptaWhatsApp,
          fecha_consentimiento:
            fechaConsentimiento,
          origen:
            "registro_administrativo",
          activo:
            true
        };


        clientRegisterButton.disabled =
          true;

        clientRegisterButton.textContent =
          "Registrando…";


        setStatus(
          clientRegisterStatus,
          "Guardando cliente…"
        );


        try {

          const {
            error
          } =
            await supabaseClient
              .from(
                "contactos_malak"
              )
              .insert([
                registro
              ]);


          if (error) {
            throw error;
          }


          clientRegisterForm.reset();


          setStatus(
            clientRegisterStatus,
            "Cliente registrado correctamente.",
            "success"
          );


          try {

            await loadContacts();

          } catch (refreshError) {

            console.error(
              "El cliente se guardó, pero no se pudo actualizar la lista:",
              refreshError
            );

          }


        } catch (error) {

          console.error(
            "Error registrando cliente:",
            error
          );


          setStatus(
            clientRegisterStatus,
            error?.message ||
            "No se pudo registrar el cliente.",
            "error"
          );


        } finally {

          clientRegisterButton.disabled =
            false;

          clientRegisterButton.textContent =
            "Registrar cliente";

        }

      }
    );

  }


  // =========================
  // LOGIN / SESIÓN
  // =========================

  async function verifyAdmin() {

    const {
      data,
      error
    } =
      await supabaseClient
        .from(
          "admins_malak"
        )
        .select(
          "user_id"
        )
        .maybeSingle();


    if (
      error ||
      !data
    ) {

      throw new Error(
        "Este usuario no tiene acceso al panel de MALAK."
      );

    }

  }


  async function loadDashboardData() {

    setStatus(
      sendStatus,
      ""
    );


    await verifyAdmin();


    await Promise.all([
      loadContacts(),
      loadCurrentCampaign(),
      loadEmailStatus(),
      loadHistory()
    ]);

  }


  async function refreshSessionView() {

    const {
      data,
      error
    } =
      await supabaseClient
        .auth
        .getSession();


    if (
      error ||
      !data.session
    ) {

      showLogin();
      return;
    }


    showDashboard(
      data.session.user.email ||
      ""
    );


    try {

      await loadDashboardData();

    } catch (error) {

      console.error(
        error
      );

      await supabaseClient
        .auth
        .signOut();

      showLogin();

      setStatus(
        loginStatus,
        error.message,
        "error"
      );

    }

  }


  loginForm.addEventListener(
    "submit",
    async (event) => {

      event.preventDefault();


      setStatus(
        loginStatus,
        ""
      );


      const email =
        loginEmail.value
          .trim()
          .toLowerCase();


      const password =
        loginPassword.value;


      if (
        !email ||
        !password
      ) {

        setStatus(
          loginStatus,
          "Escribe tu correo y contraseña.",
          "error"
        );

        return;
      }


      loginButton.disabled =
        true;

      loginButton.textContent =
        "Entrando…";


      try {

        const {
          data,
          error
        } =
          await supabaseClient
            .auth
            .signInWithPassword({
              email,
              password
            });


        if (error) {
          throw error;
        }


        showDashboard(
          data.user?.email ||
          email
        );


        loginPassword.value =
          "";


        await loadDashboardData();

      } catch (error) {

        await supabaseClient
          .auth
          .signOut();


        showLogin();


        setStatus(
          loginStatus,
          error.message ||
          "No se pudo iniciar sesión.",
          "error"
        );

      } finally {

        loginButton.disabled =
          false;

        loginButton.textContent =
          "Entrar al panel";

      }

    }
  );


  logoutButton.addEventListener(
    "click",
    async () => {

      await supabaseClient
        .auth
        .signOut();


      allContacts = [];


      showLogin();

    }
  );


  supabaseClient
    .auth
    .onAuthStateChange(
      (_event, session) => {

        if (!session) {
          showLogin();
        }

      }
    );


  // =========================
  // FECHA
  // =========================

  currentDate.textContent =
    new Intl.DateTimeFormat(
      "es-MX",
      {
        day: "2-digit",
        month: "long",
        year: "numeric"
      }
    ).format(
      new Date()
    );


  // =========================
  // INICIO
  // =========================

  await refreshSessionView();

});
