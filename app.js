/**
 * CondoGest - Sistema Web de Gestão Condominial
 * Layout de Site Normal (Sem moldura de celular), com:
 * 1) Portal de Login Inicial (Escolha Gestor ou Inquilino)
 * 2) Menu Lateral + Topo + Área de Conteúdo Responsiva
 * 3) Banco de Dados Limpo para preenchimento manual nos testes locais
 */

const AppState = {
  db: window.CondoData.loadDB(),
  viewMode: 'resident', // 'resident' | 'admin'

  // Telas atuais
  residentScreen: 'res-home', // 'res-home','res-boletos','res-pendencias','res-novo-chamado','res-meus-chamados','res-documentos','res-reservas'
  adminScreen: 'adm-dashboard', // 'adm-dashboard','adm-condominios','adm-agenda','adm-vistoria','adm-pendencias','adm-chamados','adm-relatorio'

  // Abas internas
  boletosTab: 'Todos',
  finPendingsTab: 'Em aberto',
  myTicketsTab: 'Todos',
  docsTab: 'Todos',
  reservasTab: 'Reservas',

  condosTab: 'Todos',
  condosSearch: '',
  activeInspectionId: null,
  vistoriaTab: 'Checklist',
  admPendingsTab: 'Todas',
  admTicketsTab: 'Todos',
  admTicketsSearch: '',
  relatorioTab: 'Resumo',

  draftPhotos: [],
  activeModal: null
};

const Icons = {
  buildingLogo: `<svg width="32" height="32" viewBox="0 0 48 48" fill="none">
    <path d="M8 40V18L22 10V40" stroke="white" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M22 40V14L38 20V40" stroke="#93c5fd" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M4 40H44" stroke="white" stroke-width="3.2" stroke-linecap="round"/>
  </svg>`,
  back: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>`,
  logout: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>`,
  home: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9.5L12 3l9 6.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1V9.5z"/></svg>`,
  barcode: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M3 5v14M7 5v14M11 5v14M15 5v14M19 5v14M21 5v14"/></svg>`,
  calendar: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
  wrench: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
  doc: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>`,
  megaphone: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>`,
  pool: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 16c2-1 4-1 6 0s4 1 6 0 4-1 6 0"/><path d="M2 20c2-1 4-1 6 0s4 1 6 0 4-1 6 0"/><path d="M7 12V4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v8"/></svg>`,
  check: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  copy: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>`,
  camera: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>`,
  chevronRight: `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`,
  clipboard: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/></svg>`,
  building: `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="9" y1="6" x2="9" y2="6.01"/><line x1="15" y1="6" x2="15" y2="6.01"/><line x1="9" y1="10" x2="9" y2="10.01"/><line x1="15" y1="10" x2="15" y2="10.01"/><line x1="9" y1="14" x2="9" y2="14.01"/><line x1="15" y1="14" x2="15" y2="14.01"/><path d="M9 22v-4h6v4"/></svg>`
};

function showToast(msg) {
  const existing = document.querySelector('.toast-notification');
  if (existing) existing.remove();

  const el = document.createElement('div');
  el.className = 'toast-notification';
  el.innerHTML = `<span>✓</span> <span>${msg}</span>`;
  document.body.appendChild(el);
  setTimeout(() => {
    if (el.parentNode) el.remove();
  }, 3200);
}

function formatBRL(val) {
  return Number(val || 0).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function todayFormatted() {
  return new Date().toLocaleDateString('pt-BR');
}

/* ==========================================================================
   Autenticação e Controle de Sessão
   ========================================================================== */
function selectLoginRole(role) {
  AppState.db.session.loginChoiceRole = role;
  window.CondoData.saveDB(AppState.db);
  renderAll();
}

function formatCPFMask(input) {
  let v = input.value.replace(/\D/g, '').slice(0, 11);
  if (v.length > 9) {
    v = v.replace(/(\d{3})(\d{3})(\d{3})(\d{1,2})/, '$1.$2.$3-$4');
  } else if (v.length > 6) {
    v = v.replace(/(\d{3})(\d{3})(\d{1,3})/, '$1.$2.$3');
  } else if (v.length > 3) {
    v = v.replace(/(\d{3})(\d{1,3})/, '$1.$2');
  }
  input.value = v;
}

function handleUnifiedLoginSubmit(e) {
  e.preventDefault();
  const role = AppState.db.session.loginChoiceRole || 'resident';
  const cpfInput = document.getElementById('loginCpfInput');
  const cpf = (cpfInput ? cpfInput.value.trim() : '') || '348.921.650-00';

  if (role === 'resident') {
    AppState.db.currentUser.resident = {
      name: 'Eduardo',
      fullName: `Eduardo Cardoso (${cpf})`,
      cpf,
      email: 'eduardo@email.com',
      unit: 'Apto. 101 - Torre A',
      condoId: 'condo-1',
      condoName: AppState.db.condos[0]?.name || 'Ed. Solar das Flores'
    };
    AppState.viewMode = 'resident';
    AppState.residentScreen = 'res-home';
  } else {
    AppState.db.currentUser.admin = {
      name: 'Eduardo',
      fullName: `Eduardo Cardoso (${cpf})`,
      cpf,
      role: 'Gestor / Administradora',
      email: 'admin@condogest.com.br',
      dateLabel: new Date().toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: 'long', year: 'numeric' })
    };
    AppState.viewMode = 'admin';
    AppState.adminScreen = 'adm-dashboard';
  }

  AppState.db.session.isLoggedIn = true;
  AppState.db.session.activeRole = role;
  window.CondoData.saveDB(AppState.db);

  showToast(`Acesso liberado (${cpf})!`);
  renderAll();
}

function logoutSession() {
  AppState.db.session.isLoggedIn = false;
  AppState.db.session.activeRole = null;
  AppState.activeModal = null;
  window.CondoData.saveDB(AppState.db);
  showToast('Você saiu da conta.');
  renderAll();
}

function switchProfileRole(role) {
  AppState.db.session.activeRole = role;
  AppState.viewMode = role;
  window.CondoData.saveDB(AppState.db);
  renderAll();
}

function navigateResident(screen) {
  AppState.viewMode = 'resident';
  AppState.residentScreen = screen;
  AppState.activeModal = null;
  renderAll();
}

function navigateAdmin(screen) {
  AppState.viewMode = 'admin';
  AppState.adminScreen = screen;
  AppState.activeModal = null;
  renderAll();
}

function resetDemoData() {
  if (!confirm('Deseja restaurar todos os dados iniciais de demonstração do sistema?')) {
    return;
  }
  const currentRole = AppState.viewMode;
  AppState.db = window.CondoData.resetDB();
  AppState.db.session.isLoggedIn = true;
  AppState.db.session.activeRole = currentRole;
  window.CondoData.saveDB(AppState.db);
  AppState.activeModal = null;
  showToast('Dados iniciais de demonstração restaurados!');
  renderAll();
}

/* ==========================================================================
   Renderizador Principal do Site Web
   ========================================================================== */
function renderAll() {
  const root = document.getElementById('appRoot');
  const isLoggedIn = AppState.db.session && AppState.db.session.isLoggedIn;

  // 1) Se não estiver logado -> Mostra a Página de Login Web em Tela Cheia
  if (!isLoggedIn) {
    root.innerHTML = renderWebLoginPage();
    return;
  }

  // 2) Se estiver logado -> Mostra o Sistema Web Normal (Sidebar + Header + Conteúdo)
  const isRes = AppState.viewMode === 'resident';
  const currentUser = isRes ? AppState.db.currentUser.resident : AppState.db.currentUser.admin;

  root.innerHTML = `
    <div class="web-app-layout">
      <!-- Menu Lateral (Sidebar) -->
      <aside class="web-sidebar">
        <div>
          <div class="sidebar-brand">
            <div class="sidebar-brand-logo">${Icons.buildingLogo}</div>
            <div>
              <h2>CondoGest</h2>
              <span>${isRes ? 'Portal do Condômino' : 'Painel da Administradora'}</span>
            </div>
          </div>

          <nav class="sidebar-nav">
            ${isRes ? renderResidentSidebarLinks() : renderAdminSidebarLinks()}
          </nav>
        </div>

        <div class="sidebar-footer">
          <div class="sidebar-user-box">
            <strong>${currentUser.fullName || currentUser.name || 'Usuário'}</strong>
            <span>${isRes ? `${currentUser.unit} · ${currentUser.condoName}` : currentUser.role}</span>
          </div>

          <button class="sidebar-link" onclick="resetDemoData()" style="color:#93c5fd;">
            🔄 Restaurar Dados Iniciais
          </button>

          <button class="sidebar-link" onclick="logoutSession()">
            ${Icons.logout} Sair / Trocar Perfil
          </button>
        </div>
      </aside>

      <!-- Área Principal do Site -->
      <div class="web-main-area">
        <header class="web-topbar">
          <div class="web-topbar-left">
            <h1>${isRes ? getResidentPageHeading() : getAdminPageHeading()}</h1>
            <p>${isRes
              ? `${currentUser.fullName || 'Condômino'}`
              : `Gestão Condominial — ${currentUser.dateLabel || todayFormatted()}`
            }</p>
          </div>

          <div class="web-topbar-right">
            <div class="role-pill-switch" title="Alternar visão para testar a integração">
              <button class="role-pill-btn res ${isRes ? 'active' : ''}" onclick="switchProfileRole('resident')">
                🏠 Visão Inquilino
              </button>
              <button class="role-pill-btn adm ${!isRes ? 'active' : ''}" onclick="switchProfileRole('admin')">
                🏢 Visão Gestor
              </button>
            </div>

            <button class="btn-outline-sm" onclick="logoutSession()">
              ${Icons.logout} Sair
            </button>
          </div>
        </header>

        <main class="web-content-container">
          ${isRes ? renderResidentViewport() : renderAdminViewport()}
        </main>
      </div>

      <!-- Navegação Inferior apenas quando aberto em telas pequenas de smartphone -->
      <nav class="mobile-bottom-nav">
        ${isRes ? renderResidentMobileNav() : renderAdminMobileNav()}
      </nav>
    </div>

    ${AppState.activeModal ? renderModal(AppState.activeModal) : ''}
  `;
}

function renderResidentSidebarLinks() {
  const s = AppState.residentScreen;
  const items = [
    ['res-home', Icons.home, 'Página Inicial'],
    ['res-boletos', Icons.barcode, 'Meus Boletos'],
    ['res-pendencias', Icons.barcode, 'Pendências Financeiras'],
    ['res-novo-chamado', Icons.wrench, 'Abrir Chamado'],
    ['res-meus-chamados', Icons.clipboard, 'Meus Chamados'],
    ['res-documentos', Icons.doc, 'Documentos'],
    ['res-reservas', Icons.calendar, 'Reservas e Comunicados']
  ];
  return `
    <div class="sidebar-section-label">Menu do Condômino</div>
    ${items.map(([id, icon, label]) => `
      <button class="sidebar-link res-theme ${s === id ? 'active' : ''}" onclick="navigateResident('${id}')">
        ${icon} <span>${label}</span>
      </button>
    `).join('')}
  `;
}

function renderAdminSidebarLinks() {
  const s = AppState.adminScreen;
  const items = [
    ['adm-dashboard', Icons.home, 'Dashboard Geral'],
    ['adm-condominios', Icons.building, 'Condomínios'],
    ['adm-agenda', Icons.calendar, 'Agenda de Vistorias'],
    ['adm-vistoria', Icons.clipboard, 'Executar Vistoria'],
    ['adm-pendencias', Icons.wrench, 'Pendências'],
    ['adm-chamados', Icons.megaphone, 'Chamados de Moradores'],
    ['adm-relatorio', Icons.doc, 'Relatórios em PDF']
  ];
  return `
    <div class="sidebar-section-label">Menu da Gestão</div>
    ${items.map(([id, icon, label]) => `
      <button class="sidebar-link ${s === id ? 'active' : ''}" onclick="navigateAdmin('${id}')">
        ${icon} <span>${label}</span>
      </button>
    `).join('')}
  `;
}

function renderResidentMobileNav() {
  const s = AppState.residentScreen;
  return `
    <button class="mobile-nav-btn ${s === 'res-home' ? 'active' : ''}" onclick="navigateResident('res-home')">${Icons.home}<span>Início</span></button>
    <button class="mobile-nav-btn ${s === 'res-boletos' || s === 'res-pendencias' ? 'active' : ''}" onclick="navigateResident('res-boletos')">${Icons.barcode}<span>Boletos</span></button>
    <button class="mobile-nav-btn ${s === 'res-reservas' ? 'active' : ''}" onclick="navigateResident('res-reservas')">${Icons.calendar}<span>Reservas</span></button>
    <button class="mobile-nav-btn ${s === 'res-meus-chamados' || s === 'res-novo-chamado' ? 'active' : ''}" onclick="navigateResident('res-meus-chamados')">${Icons.wrench}<span>Chamados</span></button>
    <button class="mobile-nav-btn ${s === 'res-documentos' ? 'active' : ''}" onclick="navigateResident('res-documentos')">${Icons.doc}<span>Docs</span></button>
  `;
}

function renderAdminMobileNav() {
  const s = AppState.adminScreen;
  return `
    <button class="mobile-nav-btn ${s === 'adm-dashboard' ? 'active' : ''}" onclick="navigateAdmin('adm-dashboard')">${Icons.home}<span>Painel</span></button>
    <button class="mobile-nav-btn ${s === 'adm-condominios' ? 'active' : ''}" onclick="navigateAdmin('adm-condominios')">${Icons.building}<span>Prédios</span></button>
    <button class="mobile-nav-btn ${s === 'adm-agenda' || s === 'adm-vistoria' ? 'active' : ''}" onclick="navigateAdmin('adm-agenda')">${Icons.clipboard}<span>Vistorias</span></button>
    <button class="mobile-nav-btn ${s === 'adm-pendencias' ? 'active' : ''}" onclick="navigateAdmin('adm-pendencias')">${Icons.wrench}<span>Pendências</span></button>
    <button class="mobile-nav-btn ${s === 'adm-chamados' || s === 'adm-relatorio' ? 'active' : ''}" onclick="navigateAdmin('adm-chamados')">${Icons.megaphone}<span>Chamados</span></button>
  `;
}

function getResidentPageHeading() {
  const map = {
    'res-home': 'Área do Condômino',
    'res-boletos': 'Meus Boletos e Faturas',
    'res-pendencias': 'Minhas Pendências Financeiras',
    'res-novo-chamado': 'Abrir Novo Chamado',
    'res-meus-chamados': 'Meus Chamados e Solicitações',
    'res-documentos': 'Documentos do Condomínio',
    'res-reservas': 'Reservas de Espaços e Comunicados'
  };
  return map[AppState.residentScreen] || 'Portal do Condômino';
}

function getAdminPageHeading() {
  const map = {
    'adm-dashboard': 'Painel Executivo da Gestão',
    'adm-condominios': 'Condomínios Administrados',
    'adm-agenda': 'Agenda de Vistorias',
    'adm-vistoria': 'Execução de Vistoria e Checklist',
    'adm-pendencias': 'Controle de Pendências e Não-Conformidades',
    'adm-chamados': 'Central de Chamados dos Moradores',
    'adm-relatorio': 'Relatório Consolidado de Vistoria'
  };
  return map[AppState.adminScreen] || 'Painel da Administradora';
}

/* ==========================================================================
   PÁGINA DE LOGIN INICIAL WEB (ENXUTA: APENAS CPF E SENHA)
   ========================================================================== */
function renderWebLoginPage() {
  const role = AppState.db.session.loginChoiceRole || 'resident';
  const isRes = role === 'resident';

  return `
    <div class="web-login-wrapper">
      <!-- Coluna Institucional Esquerda -->
      <div class="web-login-hero">
        <div class="hero-brand">
          <div class="hero-brand-icon">${Icons.buildingLogo}</div>
          <div>
            <h1>CondoGest</h1>
            <p>Condomínios mais simples.</p>
          </div>
        </div>

        <div class="hero-middle">
          <h2>Uma plataforma, duas experiências integradas.</h2>
          <p>
            Centralize a gestão condominial em um único sistema web. A equipe administrativa controla vistorias, checklists, pendências e manutenção, enquanto os moradores consultam boletos, reservam espaços e abrem chamados com transparência total.
          </p>

          <div class="hero-pillars">
            <div class="hero-pillar-card">
              <h4>🏢 Para o Gestor</h4>
              <p>Dashboard executivo, vistorias com checklist e fotos, controle de pendências e geração de relatórios em PDF.</p>
            </div>
            <div class="hero-pillar-card">
              <h4>🏠 Para o Inquilino</h4>
              <p>Segunda via de boletos, controle de pendências financeiras, reserva de áreas comuns, documentos e abertura de chamados.</p>
            </div>
          </div>
        </div>

        <div style="font-size:12.5px;color:#64748b;">
          © CondoGest — Plataforma Web de Gestão Condominial
        </div>
      </div>

      <!-- Coluna Direita: Formulário de Acesso Enxuto (CPF + Senha) -->
      <div class="web-login-form-side">
        <div class="web-login-card">
          <div style="text-align:center;margin-bottom:20px;">
            <h2 style="font-size:22px;font-weight:800;">Acesse sua conta</h2>
            <p style="font-size:13px;color:#94a3b8;margin-top:4px;">Selecione seu perfil e informe seu CPF e senha</p>
          </div>

          <div class="role-choice-grid">
            <div class="role-choice-card resident ${isRes ? 'selected' : ''}" onclick="selectLoginRole('resident')">
              <div class="role-emoji">🏠</div>
              <div class="role-title">Sou Inquilino</div>
              <div class="role-sub">Morador / Condômino</div>
            </div>

            <div class="role-choice-card admin ${!isRes ? 'selected' : ''}" onclick="selectLoginRole('admin')">
              <div class="role-emoji">🏢</div>
              <div class="role-title">Sou Gestor</div>
              <div class="role-sub">Administradora / Síndico</div>
            </div>
          </div>

          <form class="login-form-box" onsubmit="handleUnifiedLoginSubmit(event)">
            <div class="input-with-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              <input
                type="text"
                id="loginCpfInput"
                placeholder="CPF (000.000.000-00)"
                maxlength="14"
                oninput="formatCPFMask(this)"
                required
              />
            </div>

            <div class="input-with-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              <input type="password" id="loginPassInput" placeholder="Senha" required />
            </div>

            <button type="submit" class="btn-primary-blue" style="margin-top:6px;background:${isRes ? 'linear-gradient(180deg,#10b981,#059669)' : 'linear-gradient(180deg,#2563eb,#1d4ed8)'}">
              Entrar como ${isRes ? 'Inquilino' : 'Gestor'}
            </button>
          </form>
        </div>
      </div>
    </div>
  `;
}

/* ==========================================================================
   VISÃO DO INQUILINO / CONDÔMINO
   ========================================================================== */
function renderResidentViewport() {
  switch (AppState.residentScreen) {
    case 'res-home': return renderResHome();
    case 'res-boletos': return renderResBoletos();
    case 'res-pendencias': return renderResPendencias();
    case 'res-novo-chamado': return renderResNovoChamado();
    case 'res-meus-chamados': return renderResMeusChamados();
    case 'res-documentos': return renderResDocumentos();
    case 'res-reservas': return renderResReservas();
    default: return renderResHome();
  }
}

function renderResHome() {
  const openBoletos = AppState.db.boletos.filter(b => b.status !== 'Pago');

  return `
    ${openBoletos.length > 0 ? `
      <div class="app-card clickable" style="background:linear-gradient(135deg,#eff6ff,#dbeafe);border-color:#bfdbfe;margin-bottom:22px;" onclick="navigateResident('res-pendencias')">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
          <div>
            <span style="font-size:11.5px;font-weight:700;color:#1d4ed8;text-transform:uppercase;">Aviso Financeiro</span>
            <h4 style="font-size:16px;font-weight:800;color:#0f172a;margin-top:2px;">Você possui ${openBoletos.length} boleto(s) em aberto</h4>
            <p style="font-size:13px;color:#334155;">Clique aqui para visualizar o código de barras ou regularizar.</p>
          </div>
          <span class="status-badge overdue">Ver faturas</span>
        </div>
      </div>
    ` : ''}

    <div class="section-header-row">
      <h3>Serviços do Condomínio</h3>
      <button class="btn-solid-sm" onclick="navigateResident('res-novo-chamado')">
        + Abrir novo chamado / ocorrência
      </button>
    </div>

    <div class="shortcut-grid">
      <div class="shortcut-card" onclick="navigateResident('res-boletos')">
        <div class="shortcut-icon blue">${Icons.barcode}</div>
        <span>Boletos</span>
      </div>
      <div class="shortcut-card" onclick="AppState.reservasTab='Reservas'; navigateResident('res-reservas')">
        <div class="shortcut-icon green">${Icons.calendar}</div>
        <span>Reservas</span>
      </div>
      <div class="shortcut-card" onclick="navigateResident('res-meus-chamados')">
        <div class="shortcut-icon amber">${Icons.wrench}</div>
        <span>Meus Chamados</span>
      </div>
      <div class="shortcut-card" onclick="navigateResident('res-documentos')">
        <div class="shortcut-icon purple">${Icons.doc}</div>
        <span>Documentos</span>
      </div>
      <div class="shortcut-card" onclick="AppState.reservasTab='Comunicados'; navigateResident('res-reservas')">
        <div class="shortcut-icon red">${Icons.megaphone}</div>
        <span>Comunicados</span>
      </div>
      <div class="shortcut-card" onclick="navigateResident('res-pendencias')">
        <div class="shortcut-icon teal">${Icons.pool}</div>
        <span>Pendências Fin.</span>
      </div>
    </div>

    <div class="section-header-row">
      <h3>Comunicados recentes</h3>
      <button class="link-btn" onclick="AppState.reservasTab='Comunicados'; navigateResident('res-reservas')">Ver todos os comunicados</button>
    </div>

    ${AppState.db.notices.length === 0 ? `
      <div class="empty-state-box">
        <div class="empty-icon">📢</div>
        <h4>Nenhum comunicado publicado</h4>
        <p>Os avisos publicados pela administração aparecerão aqui.</p>
      </div>
    ` : `
      <div class="cards-grid-list">
        ${AppState.db.notices.map(n => `
          <div class="app-card clickable" onclick="openNoticeModal('${n.id}')">
            <div class="notice-item">
              <div class="notice-left">
                <div class="notice-icon-box" style="background:#dbeafe;color:#1d4ed8">📢</div>
                <div class="notice-info">
                  <h4>${n.title}</h4>
                  <p>${n.category} · ${n.dateLabel}</p>
                </div>
              </div>
              ${Icons.chevronRight}
            </div>
          </div>
        `).join('')}
      </div>
    `}
  `;
}

function renderResBoletos() {
  const tabs = ['Todos', 'Em aberto', 'Pagos'];
  const filtered = AppState.db.boletos.filter(b => {
    if (AppState.boletosTab === 'Em aberto') return b.status !== 'Pago';
    if (AppState.boletosTab === 'Pagos') return b.status === 'Pago';
    return true;
  });

  return `
    <div class="section-header-row">
      <div class="filter-tabs" style="margin-bottom:0;">
        ${tabs.map(t => `
          <button class="filter-pill ${AppState.boletosTab === t ? 'active' : ''}" onclick="AppState.boletosTab='${t}'; renderAll();">${t}</button>
        `).join('')}
      </div>
      <div style="display:flex;gap:10px;">
        <button class="btn-outline-sm" onclick="navigateResident('res-pendencias')">Ver Pendências em Atraso</button>
        <button class="btn-solid-sm" onclick="openNewBoletoModal()">+ Lançar Boleto</button>
      </div>
    </div>

    ${filtered.length === 0 ? `
      <div class="empty-state-box">
        <div class="empty-icon">📄</div>
        <h4>Nenhum boleto cadastrado</h4>
        <p>Adicione uma cobrança de condomínio ou aluguel para testar a consulta e pagamento.</p>
        <button class="btn-solid-sm" onclick="openNewBoletoModal()">+ Adicionar Boleto</button>
      </div>
    ` : `
      <div class="cards-grid-list">
        ${filtered.map(b => {
          const isPaid = b.status === 'Pago';
          return `
            <div class="app-card">
              <div class="boleto-header-row">
                <div>
                  <div class="boleto-month">${b.month}</div>
                  <div class="boleto-due">Vencimento: ${b.dueDate}</div>
                </div>
                <span class="status-badge ${isPaid ? 'paid' : 'open'}">
                  ${isPaid ? '✓ Pago' : '● ' + b.status}
                </span>
              </div>

              <div class="boleto-amount-row">
                <div class="boleto-price">${formatBRL(b.amount)}</div>
                <button class="link-btn" onclick="openBoletoDetailModal('${b.id}')">Ver detalhes</button>
              </div>

              ${!isPaid ? `
                <div class="boleto-actions-row">
                  <button class="btn-outline-sm" onclick="copyBarcode('${b.barcode}')">
                    ${Icons.copy} Copiar código
                  </button>
                  <button class="btn-solid-sm" onclick="openBoletoDetailModal('${b.id}')">
                    Pagar
                  </button>
                </div>
              ` : `
                <div style="margin-top:12px;padding-top:10px;border-top:1px dashed #e2e8f0;display:flex;justify-content:space-between;align-items:center;font-size:12px;color:#059669;">
                  <span>Pago em ${b.paidDate}</span>
                  <button class="link-btn" onclick="openBoletoDetailModal('${b.id}')">Ver Comprovante</button>
                </div>
              `}
            </div>
          `;
        }).join('')}
      </div>
    `}
  `;
}

function renderResPendencias() {
  const overdueList = AppState.db.boletos.filter(b => b.status !== 'Pago');
  const paidList = AppState.db.boletos.filter(b => b.status === 'Pago');
  const totalOverdue = overdueList.reduce((acc, item) => acc + Number(item.amount || 0), 0);
  const listToRender = AppState.finPendingsTab === 'Em aberto' ? overdueList : paidList;

  return `
    <div class="overdue-alert-banner">
      <div>
        <div class="label">Total em aberto / atraso</div>
        <div class="big-total">
          <span>${formatBRL(totalOverdue)}</span>
          ${totalOverdue > 0 ? '<span>⚠️</span>' : ''}
        </div>
        <div class="sub-count">
          ${overdueList.length > 0 ? `${overdueList.length} boleto(s) pendente(s) de pagamento` : 'Nenhuma pendência financeira!'}
        </div>
      </div>

      ${overdueList.length > 0 ? `
        <button class="btn-primary-blue" style="width:auto;" onclick="payAllOverdueBoletos()">
          Quitar Tudo Agora (${formatBRL(totalOverdue)})
        </button>
      ` : ''}
    </div>

    <div class="section-header-row">
      <div class="filter-tabs" style="margin-bottom:0;">
        <button class="filter-pill ${AppState.finPendingsTab === 'Em aberto' ? 'active' : ''}" onclick="AppState.finPendingsTab='Em aberto'; renderAll();">
          Em aberto (${overdueList.length})
        </button>
        <button class="filter-pill ${AppState.finPendingsTab === 'Pagos' ? 'active' : ''}" onclick="AppState.finPendingsTab='Pagos'; renderAll();">
          Pagos (${paidList.length})
        </button>
      </div>
      <button class="btn-outline-sm" onclick="openNewBoletoModal()">+ Lançar Boleto</button>
    </div>

    ${listToRender.length === 0 ? `
      <div class="empty-state-box">
        <div class="empty-icon">✅</div>
        <h4>Nenhum registro nesta aba</h4>
        <p>Todas as cobranças estão em dia ou ainda não foram lançadas.</p>
      </div>
    ` : `
      <div class="cards-grid-list">
        ${listToRender.map(b => `
          <div class="app-card clickable" onclick="openBoletoDetailModal('${b.id}')">
            <div class="boleto-header-row">
              <div>
                <div class="boleto-month">${b.month}</div>
                <div class="boleto-due">Vencimento: ${b.dueDate}</div>
              </div>
              <span class="status-badge ${b.status === 'Pago' ? 'paid' : 'overdue'}">
                ${b.status === 'Pago' ? '✓ Pago' : '🔔 ' + b.status}
              </span>
            </div>
            <div class="boleto-amount-row">
              <div class="boleto-price">${formatBRL(b.amount)}</div>
              ${Icons.chevronRight}
            </div>
          </div>
        `).join('')}
      </div>
    `}

    <div class="tip-card-green">
      <div style="font-size:26px;">🛡️</div>
      <div>
        <h5>Mantenha seus pagamentos em dia</h5>
        <p>Evite juros e multas e contribua para um condomínio melhor para todos.</p>
      </div>
    </div>
  `;
}

function renderResNovoChamado() {
  return `
    <div class="form-card-container">
      <form onsubmit="submitNewResidentTicket(event)">
        <div class="form-group">
          <label class="form-label">Categoria da Solicitação</label>
          <select id="newTicketCategory" class="form-control" required>
            <option value="">Selecione uma categoria</option>
            <option value="Hidráulica / Infiltração">Hidráulica / Infiltração</option>
            <option value="Elevadores">Elevadores</option>
            <option value="Iluminação / Elétrica">Iluminação / Elétrica</option>
            <option value="Segurança / Portaria">Segurança / Portaria</option>
            <option value="Limpeza e Conservação">Limpeza e Conservação</option>
            <option value="Barulho / Convivência">Barulho / Convivência</option>
            <option value="Outros">Outros</option>
          </select>
        </div>

        <div class="form-group">
          <label class="form-label">Título do Problema</label>
          <input type="text" id="newTicketTitle" class="form-control" placeholder="Ex: Vazamento na garagem" required />
        </div>

        <div class="form-group">
          <label class="form-label">Descrição Detalhada</label>
          <textarea id="newTicketDesc" class="form-control" placeholder="Descreva o problema e a localização exata..." required></textarea>
        </div>

        <div class="form-group">
          <label class="form-label">Fotografias (opcional)</label>
          <div class="photo-upload-dropzone" onclick="document.getElementById('realPhotoInput').click()">
            <div style="color:#64748b;margin-bottom:6px;">${Icons.camera}</div>
            <div style="font-size:13.5px;font-weight:600;color:#334155;">Clique para anexar fotos</div>
            <div style="font-size:12px;color:#94a3b8;margin-top:2px;">Selecione imagens do seu computador ou celular</div>
          </div>
          <input type="file" id="realPhotoInput" accept="image/*" style="display:none;" onchange="handleFilePhotoSelect(event)" />

          ${AppState.draftPhotos.length > 0 ? `
            <div class="photo-preview-strip">
              ${AppState.draftPhotos.map((p, idx) => `
                <div class="photo-thumb-item" onclick="removeDraftPhoto(${idx})" title="Clique para remover">
                  📷 ${p.caption} ✕
                </div>
              `).join('')}
            </div>
          ` : ''}
        </div>

        <div style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:10px;padding:12px 14px;margin-bottom:18px;font-size:12.5px;color:#1e40af;">
          <strong>🔄 Integração Automática:</strong> Ao registrar este chamado, uma Pendência é criada automaticamente para o Gestor acompanhar até a conclusão.
        </div>

        <button type="submit" class="btn-primary-blue">
          Enviar chamado para a Administradora
        </button>
      </form>
    </div>
  `;
}

function handleFilePhotoSelect(e) {
  const file = e.target.files && e.target.files[0];
  const name = file ? file.name.slice(0, 22) : `Foto ${AppState.draftPhotos.length + 1}`;
  AppState.draftPhotos.push({ caption: name });
  showToast('Foto anexada!');
  renderAll();
}

function removeDraftPhoto(idx) {
  AppState.draftPhotos.splice(idx, 1);
  renderAll();
}

function submitNewResidentTicket(e) {
  e.preventDefault();
  const category = document.getElementById('newTicketCategory').value;
  const title = document.getElementById('newTicketTitle').value.trim();
  const description = document.getElementById('newTicketDesc').value.trim();
  if (!title) return;

  const num = 1000 + AppState.db.tickets.length + 1;
  const newTicketId = `#CH-${num}`;
  const newPendingId = `pend-${Date.now()}`;
  const user = AppState.db.currentUser.resident;
  const today = todayFormatted();

  const newTicket = {
    id: newTicketId,
    title,
    category: category || 'Manutenção Geral',
    description,
    date: today,
    shortDate: today.slice(0, 5),
    status: 'Aberto',
    priority: category === 'Elevadores' || category === 'Hidráulica / Infiltração' ? 'Alta' : 'Média',
    condoName: user.condoName || 'Meu Condomínio',
    unit: user.unit || 'Unidade 101',
    author: user.fullName || 'Morador',
    visibleToResident: true,
    linkedPendingId: newPendingId,
    photos: [...AppState.draftPhotos],
    history: [
      { date: today, text: 'Chamado aberto pelo condômino e convertido em Pendência para a gestão.' }
    ]
  };

  const newPending = {
    id: newPendingId,
    title,
    subtitle: description.slice(0, 70),
    condoName: user.condoName || 'Meu Condomínio',
    date: today.slice(0, 5),
    priority: newTicket.priority === 'Alta' ? 'Urgente' : 'Média',
    status: 'Em análise',
    origin: `Chamado ${newTicketId}`,
    linkedTicketId: newTicketId
  };

  AppState.db.tickets.unshift(newTicket);
  AppState.db.pendings.unshift(newPending);
  window.CondoData.saveDB(AppState.db);

  AppState.draftPhotos = [];
  AppState.residentScreen = 'res-meus-chamados';
  showToast(`Chamado ${newTicketId} enviado com sucesso!`);
  renderAll();
}

function renderResMeusChamados() {
  const myTickets = AppState.db.tickets;
  const openCount = myTickets.filter(t => t.status !== 'Concluído').length;

  const filtered = myTickets.filter(t => {
    if (AppState.myTicketsTab === 'Em aberto') return t.status !== 'Concluído';
    if (AppState.myTicketsTab === 'Concluídos') return t.status === 'Concluído';
    return true;
  });

  return `
    <div class="section-header-row">
      <div class="filter-tabs" style="margin-bottom:0;">
        <button class="filter-pill ${AppState.myTicketsTab === 'Todos' ? 'active' : ''}" onclick="AppState.myTicketsTab='Todos'; renderAll();">
          Todos (${myTickets.length})
        </button>
        <button class="filter-pill ${AppState.myTicketsTab === 'Em aberto' ? 'active' : ''}" onclick="AppState.myTicketsTab='Em aberto'; renderAll();">
          Em aberto (${openCount})
        </button>
        <button class="filter-pill ${AppState.myTicketsTab === 'Concluídos' ? 'active' : ''}" onclick="AppState.myTicketsTab='Concluídos'; renderAll();">
          Concluídos
        </button>
      </div>
      <button class="btn-solid-sm" onclick="navigateResident('res-novo-chamado')">+ Novo Chamado</button>
    </div>

    ${filtered.length === 0 ? `
      <div class="empty-state-box">
        <div class="empty-icon">🔧</div>
        <h4>Nenhum chamado registrado</h4>
        <p>Abra um chamado para reportar problemas ou solicitar manutenção no condomínio.</p>
        <button class="btn-solid-sm" onclick="navigateResident('res-novo-chamado')">+ Abrir Chamado</button>
      </div>
    ` : `
      <div class="cards-grid-list">
        ${filtered.map(t => {
          let badgeClass = 'info';
          let badgeIcon = '⏳';
          if (t.status === 'Em andamento') { badgeClass = 'open'; badgeIcon = '🔔'; }
          if (t.status === 'Concluído') { badgeClass = 'paid'; badgeIcon = '✓'; }

          return `
            <div class="app-card clickable" onclick="openTicketModal('resident', '${t.id}')">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
                <span style="font-size:12.5px;font-weight:700;color:#64748b;">${t.id}</span>
                <span class="status-badge ${badgeClass}">${badgeIcon} ${t.status}</span>
              </div>
              <h4 style="font-size:15px;font-weight:700;color:#0f172a;">${t.title}</h4>
              <p style="font-size:13px;color:#475569;margin-top:4px;">${t.description.slice(0, 80)}${t.description.length > 80 ? '...' : ''}</p>
              <div style="margin-top:12px;padding-top:10px;border-top:1px solid #f1f5f9;display:flex;justify-content:space-between;font-size:12px;color:#64748b;">
                <span>${t.category}</span>
                <span>Aberto em ${t.date}</span>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `}
  `;
}

function renderResDocumentos() {
  const tabs = ['Todos', 'Regulamentos', 'Atas'];
  const filtered = AppState.db.documents.filter(d => {
    if (AppState.docsTab === 'Todos') return true;
    return d.category === AppState.docsTab;
  });

  return `
    <div class="section-header-row">
      <div class="filter-tabs" style="margin-bottom:0;">
        ${tabs.map(t => `
          <button class="filter-pill ${AppState.docsTab === t ? 'active' : ''}" onclick="AppState.docsTab='${t}'; renderAll();">${t}</button>
        `).join('')}
      </div>
      <button class="btn-solid-sm" onclick="openNewDocumentModal()">+ Adicionar Documento</button>
    </div>

    ${filtered.length === 0 ? `
      <div class="empty-state-box">
        <div class="empty-icon">📁</div>
        <h4>Nenhum documento cadastrado</h4>
        <p>Adicione regulamentos internos, atas de assembleia ou prestações de contas.</p>
        <button class="btn-solid-sm" onclick="openNewDocumentModal()">+ Cadastrar Documento</button>
      </div>
    ` : `
      <div class="cards-grid-list">
        ${filtered.map(doc => `
          <div class="app-card clickable" onclick="openDocumentModal('${doc.id}')">
            <div class="notice-item">
              <div class="notice-left">
                <div class="notice-icon-box" style="background:#dbeafe;color:#1d4ed8">
                  ${Icons.doc}
                </div>
                <div class="notice-info">
                  <h4>${doc.title}</h4>
                  <p>${doc.category} · ${doc.size} · ${doc.updatedAt}</p>
                </div>
              </div>
              ${Icons.chevronRight}
            </div>
          </div>
        `).join('')}
      </div>
    `}
  `;
}

function renderResReservas() {
  return `
    <div class="section-header-row">
      <div class="filter-tabs" style="margin-bottom:0;">
        <button class="filter-pill ${AppState.reservasTab === 'Reservas' ? 'active' : ''}" onclick="AppState.reservasTab='Reservas'; renderAll();">
          Áreas Comuns e Reservas (${AppState.db.spaces.length})
        </button>
        <button class="filter-pill ${AppState.reservasTab === 'Comunicados' ? 'active' : ''}" onclick="AppState.reservasTab='Comunicados'; renderAll();">
          Mural de Comunicados (${AppState.db.notices.length})
        </button>
      </div>

      ${AppState.reservasTab === 'Reservas' ? `
        <button class="btn-solid-sm" onclick="openNewSpaceModal()">+ Cadastrar Área Comum</button>
      ` : `
        <button class="btn-solid-sm" onclick="openNewNoticeModal()">+ Publicar Comunicado</button>
      `}
    </div>

    ${AppState.reservasTab === 'Reservas' ? (
      AppState.db.spaces.length === 0 ? `
        <div class="empty-state-box">
          <div class="empty-icon">📅</div>
          <h4>Nenhuma área comum cadastrada</h4>
          <p>Cadastre espaços como Salão de Festas, Churrasqueira ou Quadra para agendar reservas.</p>
          <button class="btn-solid-sm" onclick="openNewSpaceModal()">+ Cadastrar Área Comum</button>
        </div>
      ` : `
        <div class="cards-grid-list">
          ${AppState.db.spaces.map(sp => `
            <div class="app-card" style="display:flex;gap:16px;align-items:center;">
              <div style="width:72px;height:72px;border-radius:12px;background:linear-gradient(135deg,#2563eb,#1d4ed8);display:flex;align-items:center;justify-content:center;font-size:28px;flex-shrink:0;color:#fff;">
                🏛️
              </div>
              <div style="flex:1;">
                <h4 style="font-size:15px;font-weight:700;color:#0f172a;">${sp.name}</h4>
                <p style="font-size:12.5px;color:#64748b;margin:3px 0 6px;">${sp.subtitle} · ${sp.fee}</p>
                <p style="font-size:12px;color:#059669;margin-bottom:10px;">${sp.reservations.length} reserva(s) agendada(s)</p>
                <button class="btn-solid-sm" onclick="openSpaceReserveModal('${sp.id}')">
                  Agendar Reserva
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      `
    ) : (
      AppState.db.notices.length === 0 ? `
        <div class="empty-state-box">
          <div class="empty-icon">📢</div>
          <h4>Nenhum comunicado publicado</h4>
          <p>Publique avisos de manutenção, assembleias ou eventos para os moradores.</p>
          <button class="btn-solid-sm" onclick="openNewNoticeModal()">+ Novo Comunicado</button>
        </div>
      ` : `
        <div class="cards-grid-list">
          ${AppState.db.notices.map(n => `
            <div class="app-card clickable" onclick="openNoticeModal('${n.id}')">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">
                <span class="status-badge info">${n.category}</span>
                <span style="font-size:12px;color:#64748b;">${n.dateLabel}</span>
              </div>
              <h4 style="font-size:15px;font-weight:700;color:#0f172a;margin-bottom:6px;">${n.title}</h4>
              <p style="font-size:13px;color:#475569;line-height:1.5;">${n.content}</p>
            </div>
          `).join('')}
        </div>
      `
    )}
  `;
}

/* ==========================================================================
   VISÃO DO GESTOR / ADMINISTRADORA
   ========================================================================== */
function renderAdminViewport() {
  switch (AppState.adminScreen) {
    case 'adm-dashboard': return renderAdmDashboard();
    case 'adm-condominios': return renderAdmCondominios();
    case 'adm-agenda': return renderAdmAgenda();
    case 'adm-vistoria': return renderAdmVistoria();
    case 'adm-pendencias': return renderAdmPendencias();
    case 'adm-chamados': return renderAdmChamados();
    case 'adm-relatorio': return renderAdmRelatorio();
    default: return renderAdmDashboard();
  }
}

function renderAdmDashboard() {
  const totalCondos = AppState.db.condos.length;
  const totalUnits = AppState.db.condos.reduce((acc, c) => acc + Number(c.units || 0), 0);
  const totalInspections = AppState.db.inspections.length;
  const doneInspections = AppState.db.inspections.filter(i => i.status === 'Concluída').length;
  const pendInspections = totalInspections - doneInspections;

  const activeTickets = AppState.db.tickets.filter(t => t.status !== 'Concluído').length;
  const openBoletos = AppState.db.boletos.filter(b => b.status !== 'Pago').length;
  const totalBoletos = AppState.db.boletos.length;
  const defaultRate = totalBoletos > 0 ? Math.round((openBoletos / totalBoletos) * 100) + '%' : '0%';
  const activePendings = AppState.db.pendings.filter(p => p.status !== 'Resolvida').length;

  return `
    <div class="kpi-grid-2x3">
      <div class="kpi-card" onclick="navigateAdmin('adm-condominios')">
        <div class="kpi-top">🏢 Condomínios</div>
        <div class="kpi-number">${totalCondos}</div>
        <div class="kpi-sub pos">Gerenciar carteira →</div>
      </div>

      <div class="kpi-card" onclick="navigateAdmin('adm-condominios')">
        <div class="kpi-top">🔑 Unidades</div>
        <div class="kpi-number">${totalUnits}</div>
        <div class="kpi-sub">Total administrado</div>
      </div>

      <div class="kpi-card" onclick="navigateAdmin('adm-agenda')">
        <div class="kpi-top">📋 Vistorias</div>
        <div class="kpi-number">${totalInspections}</div>
        <div class="kpi-sub">
          <span style="color:#059669;">✓ ${doneInspections} concluídas</span>
          <span style="color:#d97706;">⏳ ${pendInspections} pendentes</span>
        </div>
      </div>

      <div class="kpi-card" onclick="navigateAdmin('adm-chamados')">
        <div class="kpi-top">🔧 Chamados Ativos</div>
        <div class="kpi-number">${activeTickets}</div>
        <div class="kpi-sub">Total registrado: ${AppState.db.tickets.length}</div>
      </div>

      <div class="kpi-card" onclick="openNewBoletoModal()">
        <div class="kpi-top">📄 Boletos em Aberto</div>
        <div class="kpi-number">${openBoletos}</div>
        <div class="kpi-sub" style="color:#2563eb;">+ Emitir novo boleto</div>
      </div>

      <div class="kpi-card">
        <div class="kpi-top">📊 Inadimplência</div>
        <div class="kpi-number">${defaultRate}</div>
        <div class="kpi-sub">Sobre boletos lançados</div>
      </div>

      <div class="kpi-card" onclick="navigateAdmin('adm-pendencias')">
        <div class="kpi-top">⚠️ Pendências</div>
        <div class="kpi-number">${activePendings}</div>
        <div class="kpi-sub">Aguardando solução</div>
      </div>

      <div class="kpi-card" onclick="navigateAdmin('adm-relatorio')">
        <div class="kpi-top">📑 Relatórios PDF</div>
        <div class="kpi-number">${doneInspections}</div>
        <div class="kpi-sub pos">Consultar laudos →</div>
      </div>
    </div>

    <div class="section-header-row">
      <h3>Cadastros Rápidos da Administradora</h3>
    </div>

    <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:12px;">
      <button class="btn-outline-sm" style="padding:14px;" onclick="openNewCondoModal()">🏢 + Cadastrar Condomínio</button>
      <button class="btn-outline-sm" style="padding:14px;" onclick="openNewInspectionModal()">📋 + Agendar Vistoria</button>
      <button class="btn-outline-sm" style="padding:14px;" onclick="openNewPendingModal()">⚠️ + Registrar Pendência</button>
      <button class="btn-outline-sm" style="padding:14px;" onclick="openNewBoletoModal()">📄 + Emitir Boleto</button>
      <button class="btn-outline-sm" style="padding:14px;" onclick="openNewNoticeModal()">📢 + Publicar Comunicado</button>
      <button class="btn-outline-sm" style="padding:14px;" onclick="openNewSpaceModal()">🏛️ + Cadastrar Área Comum</button>
      <button class="btn-outline-sm" style="padding:14px;" onclick="openNewDocumentModal()">📁 + Publicar Documento</button>
    </div>
  `;
}

function renderAdmCondominios() {
  const condos = AppState.db.condos.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(AppState.condosSearch.toLowerCase()) ||
                          c.city.toLowerCase().includes(AppState.condosSearch.toLowerCase());
    if (!matchesSearch) return false;
    if (AppState.condosTab === 'Ativos') return c.status === 'Ativo';
    if (AppState.condosTab === 'Inativos') return c.status !== 'Ativo';
    return true;
  });

  return `
    <div class="section-header-row">
      <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;flex:1;">
        <input
          type="text"
          class="form-control"
          style="max-width:340px;"
          placeholder="🔍 Buscar condomínio ou cidade..."
          value="${AppState.condosSearch}"
          oninput="AppState.condosSearch = this.value; renderAll();"
        />
        <div class="filter-tabs" style="margin-bottom:0;">
          <button class="filter-pill ${AppState.condosTab === 'Todos' ? 'active' : ''}" onclick="AppState.condosTab='Todos'; renderAll();">
            Todos (${AppState.db.condos.length})
          </button>
          <button class="filter-pill ${AppState.condosTab === 'Ativos' ? 'active' : ''}" onclick="AppState.condosTab='Ativos'; renderAll();">
            Ativos
          </button>
        </div>
      </div>

      <button class="btn-solid-sm" onclick="openNewCondoModal()">+ Novo Condomínio</button>
    </div>

    ${condos.length === 0 ? `
      <div class="empty-state-box">
        <div class="empty-icon">🏢</div>
        <h4>Nenhum condomínio cadastrado</h4>
        <p>Cadastre os prédios e condomínios administrados para gerenciar unidades e vistorias.</p>
        <button class="btn-solid-sm" onclick="openNewCondoModal()">+ Cadastrar Primeiro Condomínio</button>
      </div>
    ` : `
      <div class="cards-grid-list">
        ${condos.map(c => `
          <div class="app-card clickable" onclick="openCondoDetailModal('${c.id}')">
            <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;">
              <div style="display:flex;align-items:center;gap:14px;">
                <div class="shortcut-icon blue" style="flex-shrink:0;">${Icons.building}</div>
                <div>
                  <h4 style="font-size:15px;font-weight:700;color:#0f172a;">${c.name}</h4>
                  <p style="font-size:12.5px;color:#64748b;">${c.city}</p>
                  <p style="font-size:12.5px;font-weight:600;color:#334155;margin-top:3px;">${c.units} unidades · Síndico: ${c.syndic}</p>
                </div>
              </div>
              <span class="status-badge ${c.status === 'Ativo' ? 'paid' : 'open'}">${c.status}</span>
            </div>
          </div>
        `).join('')}
      </div>
    `}
  `;
}

function renderAdmAgenda() {
  const inspections = AppState.db.inspections;

  return `
    <div class="section-header-row">
      <h3>Programação de Inspeções Prediais</h3>
      <button class="btn-solid-sm" onclick="openNewInspectionModal()">+ Agendar Nova Vistoria</button>
    </div>

    ${inspections.length === 0 ? `
      <div class="empty-state-box">
        <div class="empty-icon">📋</div>
        <h4>Nenhuma vistoria agendada</h4>
        <p>Agende uma vistoria para preencher o checklist, anexar fotos de campo e gerar laudos.</p>
        <button class="btn-solid-sm" onclick="openNewInspectionModal()">+ Agendar Vistoria</button>
      </div>
    ` : `
      <div class="cards-grid-list">
        ${inspections.map(ins => `
          <div class="app-card clickable" onclick="openInspectionScreen('${ins.id}')">
            <div class="timeline-item">
              <div class="timeline-hour">${ins.time}</div>
              <div style="flex:1;">
                <h4 style="font-size:15px;font-weight:700;color:#0f172a;">${ins.condoName}</h4>
                <p style="font-size:12.5px;color:#64748b;">${ins.type} · Data: ${ins.date}</p>
                <p style="font-size:12px;color:#475569;margin-top:2px;">Responsável: ${ins.inspector}</p>
              </div>
              <span class="status-badge ${ins.status === 'Concluída' ? 'paid' : 'open'}">${ins.status}</span>
            </div>
          </div>
        `).join('')}
      </div>
    `}
  `;
}

function openInspectionScreen(insId) {
  AppState.activeInspectionId = insId;
  AppState.adminScreen = 'adm-vistoria';
  renderAll();
}

function renderAdmVistoria() {
  const ins = AppState.db.inspections.find(i => i.id === AppState.activeInspectionId) || AppState.db.inspections[0];

  if (!ins) {
    return `
      <div class="empty-state-box">
        <div class="empty-icon">📋</div>
        <h4>Nenhuma vistoria selecionada</h4>
        <p>Agende uma vistoria para iniciar o preenchimento do checklist e registro fotográfico.</p>
        <button class="btn-solid-sm" onclick="openNewInspectionModal()">+ Agendar Vistoria Agora</button>
      </div>
    `;
  }

  const tabs = [
    { key: 'Checklist', label: `Checklist (${ins.checklist.length})` },
    { key: 'Fotos', label: `Fotos (${ins.photos.length})` },
    { key: 'Observações', label: 'Observações de Campo' }
  ];

  return `
    <div class="app-card" style="margin-bottom:20px;">
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px;">
        <div style="display:flex;gap:14px;align-items:center;">
          <div class="shortcut-icon blue">${Icons.building}</div>
          <div>
            <h4 style="font-size:17px;font-weight:800;color:#0f172a;">${ins.condoName}</h4>
            <p style="font-size:13px;color:#1d4ed8;font-weight:600;">${ins.type} · 📅 ${ins.date} às ${ins.time} · 👤 ${ins.inspector}</p>
          </div>
        </div>
        <div style="display:flex;gap:10px;align-items:center;">
          <span class="status-badge ${ins.status === 'Concluída' ? 'paid' : 'open'}">${ins.status}</span>
          <button class="btn-outline-sm" onclick="navigateAdmin('adm-relatorio')">Ver Relatório PDF</button>
        </div>
      </div>
    </div>

    <div class="section-header-row">
      <div class="filter-tabs" style="margin-bottom:0;">
        ${tabs.map(t => `
          <button class="filter-pill ${AppState.vistoriaTab === t.key ? 'active' : ''}" onclick="AppState.vistoriaTab='${t.key}'; renderAll();">
            ${t.label}
          </button>
        `).join('')}
      </div>

      ${AppState.vistoriaTab === 'Checklist' ? `
        <button class="btn-outline-sm" onclick="openAddChecklistItemModal('${ins.id}')">+ Adicionar Item ao Checklist</button>
      ` : AppState.vistoriaTab === 'Fotos' ? `
        <button class="btn-outline-sm" onclick="openAddVistoriaPhotoModal('${ins.id}')">📷 + Adicionar Foto</button>
      ` : ''}
    </div>

    ${AppState.vistoriaTab === 'Checklist' ? `
      <div>
        ${ins.checklist.map(item => `
          <div class="checklist-row" onclick="toggleChecklistItem('${ins.id}', '${item.id}')">
            <div class="checklist-left">
              <div class="chk-box ${item.checked ? 'checked' : ''}">
                ${item.checked ? Icons.check : ''}
              </div>
              <div>
                <div style="font-size:14px;font-weight:600;color:#0f172a;">${item.name}</div>
                ${item.note ? `<div style="font-size:12px;color:#64748b;">${item.note}</div>` : ''}
              </div>
            </div>
            <span class="status-badge ${item.checked ? 'paid' : 'open'}">
              ${item.checked ? '✓ Verificado' : 'Pendente'}
            </span>
          </div>
        `).join('')}
      </div>
    ` : ''}

    ${AppState.vistoriaTab === 'Fotos' ? (
      ins.photos.length === 0 ? `
        <div class="empty-state-box">
          <div class="empty-icon">📷</div>
          <h4>Nenhuma foto adicionada nesta vistoria</h4>
          <p>Registre fotos das áreas vistoriadas para compor o relatório final.</p>
          <button class="btn-solid-sm" onclick="openAddVistoriaPhotoModal('${ins.id}')">📷 Adicionar Foto</button>
        </div>
      ` : `
        <div class="cards-grid-list">
          ${ins.photos.map(ph => `
            <div class="app-card" style="display:flex;justify-content:space-between;align-items:center;">
              <div>
                <span style="font-size:11.5px;font-weight:700;color:#1d4ed8;">${ph.area}</span>
                <h4 style="font-size:14px;font-weight:700;color:#0f172a;margin:3px 0;">${ph.caption}</h4>
                <p style="font-size:12px;color:#64748b;">${ph.date}</p>
              </div>
              <span class="status-badge ${ph.tag === 'Pendência' ? 'overdue' : 'paid'}">${ph.tag}</span>
            </div>
          `).join('')}
        </div>
      `
    ) : ''}

    ${AppState.vistoriaTab === 'Observações' ? `
      <div class="form-card-container">
        <div class="form-group">
          <label class="form-label">Laudo e Observações de Campo</label>
          <textarea class="form-control" rows="5" placeholder="Digite aqui todas as observações técnicas da vistoria..." oninput="updateInspectionObs('${ins.id}', this.value)">${ins.observations}</textarea>
        </div>
        <button class="btn-outline-sm" onclick="openNewPendingModal('${ins.condoName}')">
          ⚠️ Registrar Não-Conformidade / Pendência desta Vistoria
        </button>
      </div>
    ` : ''}

    <div class="Dual-action-footer">
      <button class="btn-outline-sm" style="flex:1;height:44px;" onclick="saveInspectionDraft()">
        Salvar Rascunho
      </button>
      <button class="btn-primary-blue" style="flex:1;height:44px;" onclick="completeInspection('${ins.id}')">
        ✓ Concluir Vistoria
      </button>
    </div>
  `;
}

function toggleChecklistItem(insId, chkId) {
  const ins = AppState.db.inspections.find(i => i.id === insId);
  if (!ins) return;
  const item = ins.checklist.find(c => c.id === chkId);
  if (item) {
    item.checked = !item.checked;
    window.CondoData.saveDB(AppState.db);
    renderAll();
  }
}

function updateInspectionObs(insId, val) {
  const ins = AppState.db.inspections.find(i => i.id === insId);
  if (ins) {
    ins.observations = val;
    window.CondoData.saveDB(AppState.db);
  }
}

function saveInspectionDraft() {
  window.CondoData.saveDB(AppState.db);
  showToast('Progresso da vistoria salvo!');
}

function completeInspection(insId) {
  const ins = AppState.db.inspections.find(i => i.id === insId);
  if (ins) {
    ins.status = 'Concluída';
    ins.checklist.forEach(c => { c.checked = true; });
    window.CondoData.saveDB(AppState.db);
  }
  showToast('Vistoria concluída! Relatório gerado.');
  AppState.adminScreen = 'adm-relatorio';
  renderAll();
}

function renderAdmPendencias() {
  const all = AppState.db.pendings;
  const urgentCount = all.filter(p => p.priority === 'Urgente' && p.status !== 'Resolvida').length;
  const resolvedCount = all.filter(p => p.status === 'Resolvida').length;

  const filtered = all.filter(p => {
    if (AppState.admPendingsTab === 'Urgentes') return p.priority === 'Urgente' && p.status !== 'Resolvida';
    if (AppState.admPendingsTab === 'Em análise') return p.status !== 'Resolvida';
    if (AppState.admPendingsTab === 'Resolvidas') return p.status === 'Resolvida';
    return true;
  });

  return `
    <div class="section-header-row">
      <div class="filter-tabs" style="margin-bottom:0;">
        <button class="filter-pill ${AppState.admPendingsTab === 'Todas' ? 'active' : ''}" onclick="AppState.admPendingsTab='Todas'; renderAll();">
          Todas (${all.length})
        </button>
        <button class="filter-pill ${AppState.admPendingsTab === 'Em análise' ? 'active' : ''}" onclick="AppState.admPendingsTab='Em análise'; renderAll();">
          Em aberto
        </button>
        <button class="filter-pill ${AppState.admPendingsTab === 'Urgentes' ? 'active' : ''}" onclick="AppState.admPendingsTab='Urgentes'; renderAll();">
          ❗ Urgentes (${urgentCount})
        </button>
        <button class="filter-pill ${AppState.admPendingsTab === 'Resolvidas' ? 'active' : ''}" onclick="AppState.admPendingsTab='Resolvidas'; renderAll();">
          Resolvidas (${resolvedCount})
        </button>
      </div>
      <button class="btn-solid-sm" onclick="openNewPendingModal()">+ Nova Pendência</button>
    </div>

    ${filtered.length === 0 ? `
      <div class="empty-state-box">
        <div class="empty-icon">⚠️</div>
        <h4>Nenhuma pendência encontrada</h4>
        <p>Problemas identificados nas vistorias ou chamados abertos por moradores aparecem aqui.</p>
        <button class="btn-solid-sm" onclick="openNewPendingModal()">+ Registrar Pendência</button>
      </div>
    ` : `
      <div class="cards-grid-list">
        ${filtered.map(p => {
          let badgeClass = 'open';
          if (p.priority === 'Urgente') badgeClass = 'overdue';
          if (p.priority === 'Baixa') badgeClass = 'info';
          if (p.status === 'Resolvida') badgeClass = 'paid';

          return `
            <div class="app-card clickable" onclick="openPendingDetailModal('${p.id}')">
              <div style="display:flex;justify-content:space-between;align-items:flex-start;">
                <div>
                  <h4 style="font-size:15px;font-weight:700;color:#0f172a;">${p.title}</h4>
                  <p style="font-size:13px;color:#475569;margin-top:4px;">${p.subtitle}</p>
                  <p style="font-size:12px;color:#64748b;margin-top:8px;">🏢 ${p.condoName} · Origem: ${p.origin}</p>
                </div>
                <div style="display:flex;flex-direction:column;align-items:flex-end;gap:8px;">
                  <span class="status-badge ${badgeClass}">
                    ${p.status === 'Resolvida' ? '✓ Resolvida' : p.priority}
                  </span>
                  <span style="font-size:11.5px;color:#94a3b8;">${p.date}</span>
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `}
  `;
}

function renderAdmChamados() {
  const filtered = AppState.db.tickets.filter(t => {
    const matchesSearch = t.title.toLowerCase().includes(AppState.admTicketsSearch.toLowerCase()) ||
                          t.id.toLowerCase().includes(AppState.admTicketsSearch.toLowerCase()) ||
                          t.condoName.toLowerCase().includes(AppState.admTicketsSearch.toLowerCase());
    if (!matchesSearch) return false;
    if (AppState.admTicketsTab === 'Abertos') return t.status === 'Aberto';
    if (AppState.admTicketsTab === 'Em andamento') return t.status === 'Em andamento';
    return true;
  });

  return `
    <div class="section-header-row">
      <div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap;flex:1;">
        <input
          type="text"
          class="form-control"
          style="max-width:320px;"
          placeholder="🔍 Buscar chamados..."
          value="${AppState.admTicketsSearch}"
          oninput="AppState.admTicketsSearch = this.value; renderAll();"
        />
        <div class="filter-tabs" style="margin-bottom:0;">
          <button class="filter-pill ${AppState.admTicketsTab === 'Todos' ? 'active' : ''}" onclick="AppState.admTicketsTab='Todos'; renderAll();">
            Todos (${AppState.db.tickets.length})
          </button>
          <button class="filter-pill ${AppState.admTicketsTab === 'Abertos' ? 'active' : ''}" onclick="AppState.admTicketsTab='Abertos'; renderAll();">
            Abertos
          </button>
          <button class="filter-pill ${AppState.admTicketsTab === 'Em andamento' ? 'active' : ''}" onclick="AppState.admTicketsTab='Em andamento'; renderAll();">
            Em andamento
          </button>
        </div>
      </div>

      <button class="btn-solid-sm" onclick="openAdminNewTicketModal()">+ Novo Chamado</button>
    </div>

    ${filtered.length === 0 ? `
      <div class="empty-state-box">
        <div class="empty-icon">🛠️</div>
        <h4>Nenhum chamado registrado</h4>
        <p>Solicitações enviadas pelos moradores ou ordens de serviço internas aparecerão aqui.</p>
        <button class="btn-solid-sm" onclick="openAdminNewTicketModal()">+ Abrir Chamado</button>
      </div>
    ` : `
      <div class="cards-grid-list">
        ${filtered.map(t => {
          let badgeClass = 'info';
          let label = t.priority;
          if (t.status === 'Concluído') { badgeClass = 'paid'; label = '✓ Concluído'; }
          else if (t.status === 'Em andamento') { badgeClass = 'open'; label = 'Em andamento'; }
          else if (t.priority === 'Alta') { badgeClass = 'overdue'; label = 'Prioridade Alta'; }

          return `
            <div class="app-card clickable" onclick="openTicketModal('admin', '${t.id}')">
              <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
                <span style="font-size:12.5px;font-weight:700;color:#64748b;">${t.id} · ${t.category}</span>
                <span class="status-badge ${badgeClass}">${label}</span>
              </div>
              <h4 style="font-size:15px;font-weight:700;color:#0f172a;">${t.title}</h4>
              <p style="font-size:13px;color:#475569;margin-top:4px;">${t.description}</p>
              <div style="display:flex;justify-content:space-between;align-items:center;margin-top:12px;padding-top:10px;border-top:1px solid #f1f5f9;font-size:12px;color:#64748b;">
                <span>🏢 ${t.condoName} (${t.unit})</span>
                <span>📅 ${t.date}</span>
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `}
  `;
}

function renderAdmRelatorio() {
  const ins = AppState.db.inspections.find(i => i.id === AppState.activeInspectionId) || AppState.db.inspections[0];

  if (!ins) {
    return `
      <div class="empty-state-box">
        <div class="empty-icon">📑</div>
        <h4>Nenhum relatório disponível</h4>
        <p>Agende e conclua uma vistoria para gerar o relatório técnico consolidado em PDF.</p>
        <button class="btn-solid-sm" onclick="openNewInspectionModal()">+ Agendar Vistoria</button>
      </div>
    `;
  }

  const totalItems = ins.checklist.length;
  const checkedItems = ins.checklist.filter(c => c.checked).length;
  const conformity = totalItems > 0 ? Math.round((checkedItems / totalItems) * 100) : 100;
  const condoPendings = AppState.db.pendings.filter(p => p.condoName === ins.condoName);

  return `
    <div class="app-card" style="margin-bottom:20px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:14px;">
      <div style="display:flex;align-items:center;gap:14px;">
        <div class="shortcut-icon blue">${Icons.building}</div>
        <div>
          <h4 style="font-size:17px;font-weight:800;color:#0f172a;">${ins.condoName}</h4>
          <p style="font-size:13px;color:#1d4ed8;font-weight:600;">${ins.type} · Realizada em ${ins.date} às ${ins.time}</p>
        </div>
      </div>
      <div style="display:flex;gap:10px;align-items:center;">
        <span class="status-badge ${ins.status === 'Concluída' ? 'paid' : 'open'}">${ins.status}</span>
        <button class="btn-solid-sm" onclick="exportInspectionReportPDF()">📄 Exportar / Imprimir PDF</button>
      </div>
    </div>

    <div class="kpi-grid-2x3">
      <div class="kpi-card">
        <div class="kpi-top">✓ Itens Verificados</div>
        <div class="kpi-number">${checkedItems} / ${totalItems}</div>
        <div class="kpi-sub">Checklist da vistoria</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-top">⚠️ Pendências Encontradas</div>
        <div class="kpi-number" style="color:#d97706;">${condoPendings.length}</div>
        <div class="kpi-sub">Vinculadas ao condomínio</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-top">📊 Índice de Conformidade</div>
        <div class="kpi-number" style="color:#059669;">${conformity}%</div>
        <div class="kpi-sub">Resultado geral</div>
      </div>
      <div class="kpi-card">
        <div class="kpi-top">👤 Responsável Técnico</div>
        <div class="kpi-number" style="font-size:18px;margin-top:12px;">${ins.inspector}</div>
        <div class="kpi-sub">${ins.date}</div>
      </div>
    </div>

    ${ins.observations ? `
      <div class="app-card" style="margin-bottom:20px;">
        <h4 style="font-size:14px;font-weight:700;margin-bottom:6px;">Observações Técnicas</h4>
        <p style="font-size:13.5px;color:#334155;line-height:1.5;">${ins.observations}</p>
      </div>
    ` : ''}

    <div class="section-header-row">
      <h3>Fotos Anexadas (${ins.photos.length})</h3>
    </div>
    ${ins.photos.length === 0 ? `<p style="font-size:13px;color:#64748b;margin-bottom:20px;">Nenhuma foto registrada nesta vistoria.</p>` : `
      <div class="cards-grid-list" style="margin-bottom:20px;">
        ${ins.photos.map(p => `
          <div class="app-card">
            <div style="font-size:11.5px;font-weight:700;color:#1d4ed8;">${p.area}</div>
            <div style="font-size:14px;font-weight:700;color:#0f172a;margin:3px 0;">${p.caption}</div>
            <div style="font-size:12px;color:#64748b;">${p.date} · <strong>${p.tag}</strong></div>
          </div>
        `).join('')}
      </div>
    `}
  `;
}

/* ==========================================================================
   Modais de Criação e Detalhes (Centralizados na Tela)
   ========================================================================== */
function closeModal() {
  AppState.activeModal = null;
  renderAll();
}

function renderModal(modalObj) {
  return `
    <div class="modal-backdrop" onclick="if(event.target===this) closeModal()">
      <div class="modal-sheet">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
          <h3 style="font-size:17px;font-weight:800;color:#0f172a;">${modalObj.title}</h3>
          <button class="back-icon-btn" onclick="closeModal()">✕</button>
        </div>
        ${modalObj.html}
      </div>
    </div>
  `;
}

function openNewBoletoModal() {
  AppState.activeModal = {
    title: 'Emitir / Cadastrar Boleto',
    html: `
      <div class="form-group">
        <label class="form-label">Mês de Referência / Descrição</label>
        <input type="text" id="newBolMonth" class="form-control" placeholder="Ex: Novembro/2026 - Taxa Condominial" />
      </div>
      <div class="form-group">
        <label class="form-label">Data de Vencimento</label>
        <input type="text" id="newBolDue" class="form-control" placeholder="Ex: 10/11/2026" value="10/11/2026" />
      </div>
      <div class="form-group">
        <label class="form-label">Valor (R$)</label>
        <input type="number" step="0.01" id="newBolAmount" class="form-control" placeholder="Ex: 680.00" />
      </div>
      <div class="form-group">
        <label class="form-label">Status Inicial</label>
        <select id="newBolStatus" class="form-control">
          <option value="Em aberto">Em aberto</option>
          <option value="Em atraso">Em atraso</option>
          <option value="Pago">Pago</option>
        </select>
      </div>
      <button class="btn-primary-blue" onclick="saveNewBoleto()">Salvar Boleto</button>
    `
  };
  renderAll();
}

function saveNewBoleto() {
  const month = document.getElementById('newBolMonth').value.trim();
  const dueDate = document.getElementById('newBolDue').value.trim() || todayFormatted();
  const amount = parseFloat(document.getElementById('newBolAmount').value) || 0;
  const status = document.getElementById('newBolStatus').value;
  if (!month) return;

  AppState.db.boletos.unshift({
    id: 'bol-' + Date.now(),
    month,
    type: 'Cobrança Condominial',
    dueDate,
    paidDate: status === 'Pago' ? todayFormatted() : null,
    amount,
    status,
    unit: AppState.db.currentUser.resident.unit || 'Unidade 101',
    barcode: '10492 58963 13000 100043 00000 037523 7 ' + Math.floor(10000000000000 + Math.random() * 89999999999999),
    receiptId: 'COMP-' + Date.now(),
    breakdown: [{ label: month, value: amount }]
  });
  window.CondoData.saveDB(AppState.db);
  closeModal();
  showToast('Boleto cadastrado com sucesso!');
}

function openNewDocumentModal() {
  AppState.activeModal = {
    title: 'Publicar Documento',
    html: `
      <div class="form-group">
        <label class="form-label">Título do Documento</label>
        <input type="text" id="newDocTitle" class="form-control" placeholder="Ex: Regimento Interno / Ata de Assembleia" />
      </div>
      <div class="form-group">
        <label class="form-label">Categoria</label>
        <select id="newDocCat" class="form-control">
          <option value="Regulamentos">Regulamentos</option>
          <option value="Atas">Atas</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Resumo / Conteúdo</label>
        <textarea id="newDocSummary" class="form-control" placeholder="Descreva o conteúdo do documento..."></textarea>
      </div>
      <button class="btn-primary-blue" onclick="saveNewDocument()">Salvar Documento</button>
    `
  };
  renderAll();
}

function saveNewDocument() {
  const title = document.getElementById('newDocTitle').value.trim();
  const category = document.getElementById('newDocCat').value;
  const summary = document.getElementById('newDocSummary').value.trim() || 'Documento oficial do condomínio.';
  if (!title) return;

  AppState.db.documents.unshift({
    id: 'doc-' + Date.now(),
    title,
    category,
    size: 'PDF',
    updatedAt: todayFormatted(),
    summary
  });
  window.CondoData.saveDB(AppState.db);
  closeModal();
  showToast('Documento publicado!');
}

function openNewSpaceModal() {
  AppState.activeModal = {
    title: 'Cadastrar Área Comum',
    html: `
      <div class="form-group">
        <label class="form-label">Nome do Espaço</label>
        <input type="text" id="newSpName" class="form-control" placeholder="Ex: Salão de Festas / Churrasqueira" />
      </div>
      <div class="form-group">
        <label class="form-label">Capacidade / Horário</label>
        <input type="text" id="newSpSub" class="form-control" placeholder="Ex: Capacidade 50 pessoas" />
      </div>
      <div class="form-group">
        <label class="form-label">Taxa de Reserva</label>
        <input type="text" id="newSpFee" class="form-control" placeholder="Ex: R$ 100,00 ou Gratuito" value="Gratuito" />
      </div>
      <button class="btn-primary-blue" onclick="saveNewSpace()">Cadastrar Espaço</button>
    `
  };
  renderAll();
}

function saveNewSpace() {
  const name = document.getElementById('newSpName').value.trim();
  const subtitle = document.getElementById('newSpSub').value.trim() || 'Área comum do condomínio';
  const fee = document.getElementById('newSpFee').value.trim() || 'Gratuito';
  if (!name) return;

  AppState.db.spaces.push({
    id: 'sp-' + Date.now(),
    name,
    subtitle,
    fee,
    rules: 'Respeitar as normas de horário e limpeza do condomínio.',
    reservations: []
  });
  window.CondoData.saveDB(AppState.db);
  closeModal();
  showToast(`Espaço "${name}" cadastrado!`);
}

function openNewNoticeModal() {
  AppState.activeModal = {
    title: 'Publicar Comunicado',
    html: `
      <div class="form-group">
        <label class="form-label">Título do Aviso</label>
        <input type="text" id="newNotTitle" class="form-control" placeholder="Ex: Manutenção programada dos elevadores" />
      </div>
      <div class="form-group">
        <label class="form-label">Categoria</label>
        <input type="text" id="newNotCat" class="form-control" placeholder="Ex: Manutenção / Assembleia / Aviso" value="Comunicado" />
      </div>
      <div class="form-group">
        <label class="form-label">Mensagem</label>
        <textarea id="newNotContent" class="form-control" placeholder="Escreva os detalhes do comunicado..."></textarea>
      </div>
      <button class="btn-primary-blue" onclick="saveNewNotice()">Publicar Comunicado</button>
    `
  };
  renderAll();
}

function saveNewNotice() {
  const title = document.getElementById('newNotTitle').value.trim();
  const category = document.getElementById('newNotCat').value.trim() || 'Aviso';
  const content = document.getElementById('newNotContent').value.trim();
  if (!title) return;

  AppState.db.notices.unshift({
    id: 'not-' + Date.now(),
    title,
    dateLabel: todayFormatted(),
    category,
    content: content || title
  });
  window.CondoData.saveDB(AppState.db);
  closeModal();
  showToast('Comunicado publicado!');
}

function openAddChecklistItemModal(insId) {
  AppState.activeModal = {
    title: 'Novo Item no Checklist',
    html: `
      <div class="form-group">
        <label class="form-label">Nome da Área / Item</label>
        <input type="text" id="newChkName" class="form-control" placeholder="Ex: Casa de bombas / Portaria / Extintores" />
      </div>
      <div class="form-group">
        <label class="form-label">Observação (opcional)</label>
        <input type="text" id="newChkNote" class="form-control" placeholder="Ex: Verificar pressão e validade" />
      </div>
      <button class="btn-primary-blue" onclick="saveNewChecklistItem('${insId}')">Adicionar ao Checklist</button>
    `
  };
  renderAll();
}

function saveNewChecklistItem(insId) {
  const ins = AppState.db.inspections.find(i => i.id === insId);
  const name = document.getElementById('newChkName').value.trim();
  const note = document.getElementById('newChkNote').value.trim();
  if (!ins || !name) return;

  ins.checklist.push({
    id: 'chk-' + Date.now(),
    name,
    category: 'Geral',
    checked: false,
    rating: 'Bom',
    note
  });
  window.CondoData.saveDB(AppState.db);
  closeModal();
  showToast('Item adicionado ao checklist!');
}

function openAddVistoriaPhotoModal(insId) {
  AppState.activeModal = {
    title: 'Registrar Foto na Vistoria',
    html: `
      <div class="form-group">
        <label class="form-label">Ambiente / Local</label>
        <input type="text" id="phAreaInput" class="form-control" placeholder="Ex: Garagem / Elevador / Fachada" />
      </div>
      <div class="form-group">
        <label class="form-label">Legenda da Foto</label>
        <input type="text" id="phCaptionInput" class="form-control" placeholder="Ex: Pintura concluída ou infiltração no teto" />
      </div>
      <div class="form-group">
        <label class="form-label">Classificação</label>
        <select id="phTagInput" class="form-control">
          <option value="Conforme">Conforme</option>
          <option value="Pendência">Pendência / Irregularidade</option>
        </select>
      </div>
      <button class="btn-primary-blue" onclick="saveVistoriaPhoto('${insId}')">Salvar Registro Fotográfico</button>
    `
  };
  renderAll();
}

function saveVistoriaPhoto(insId) {
  const ins = AppState.db.inspections.find(i => i.id === insId);
  if (!ins) return;
  const area = document.getElementById('phAreaInput').value.trim() || 'Área Comum';
  const caption = document.getElementById('phCaptionInput').value.trim() || 'Registro fotográfico';
  const tag = document.getElementById('phTagInput').value;

  ins.photos.unshift({
    id: 'ph-' + Date.now(),
    area,
    caption,
    date: todayFormatted() + ' ' + new Date().toTimeString().slice(0, 5),
    tag
  });
  window.CondoData.saveDB(AppState.db);
  closeModal();
  showToast('Foto registrada na vistoria!');
}

function openNewPendingModal(defaultCondo = '') {
  AppState.activeModal = {
    title: 'Registrar Nova Pendência',
    html: `
      <div class="form-group">
        <label class="form-label">Problema / Item</label>
        <input type="text" id="pendTitleInput" class="form-control" placeholder="Ex: Vazamento casa de máquinas" />
      </div>
      <div class="form-group">
        <label class="form-label">Descrição / Providência</label>
        <input type="text" id="pendSubInput" class="form-control" placeholder="Ex: Acionar empresa de manutenção" />
      </div>
      <div class="form-group">
        <label class="form-label">Condomínio</label>
        <input type="text" id="pendCondoInput" class="form-control" value="${defaultCondo || AppState.db.condos[0]?.name || ''}" placeholder="Nome do condomínio" />
      </div>
      <div class="form-group">
        <label class="form-label">Prioridade</label>
        <select id="pendPrioInput" class="form-control">
          <option value="Urgente">Urgente</option>
          <option value="Média" selected>Média</option>
          <option value="Baixa">Baixa</option>
        </select>
      </div>
      <button class="btn-primary-blue" onclick="saveManualPending()">Salvar Pendência</button>
    `
  };
  renderAll();
}

function saveManualPending() {
  const title = document.getElementById('pendTitleInput').value.trim();
  const subtitle = document.getElementById('pendSubInput').value.trim() || 'Aguardando manutenção';
  const condoName = document.getElementById('pendCondoInput').value.trim() || 'Condomínio';
  const priority = document.getElementById('pendPrioInput').value;
  if (!title) return;

  AppState.db.pendings.unshift({
    id: 'pend-' + Date.now(),
    title,
    subtitle,
    condoName,
    date: todayFormatted().slice(0, 5),
    priority,
    status: 'Em análise',
    origin: 'Cadastro manual / Vistoria',
    linkedTicketId: null
  });
  window.CondoData.saveDB(AppState.db);
  closeModal();
  showToast('Pendência registrada!');
}

function copyBarcode(code) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(code).catch(() => {});
  }
  showToast('Linha digitável copiada!');
}

function openBoletoDetailModal(boletoId) {
  const b = AppState.db.boletos.find(x => x.id === boletoId);
  if (!b) return;
  AppState.activeModal = {
    title: `Fatura ${b.month}`,
    html: `
      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;padding:14px;margin-bottom:14px;">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <span style="font-size:12.5px;color:#64748b;">Unidade: <strong>${b.unit}</strong></span>
          <span class="status-badge ${b.status === 'Pago' ? 'paid' : 'overdue'}">${b.status}</span>
        </div>
        <div style="font-size:24px;font-weight:800;color:#0f172a;margin:6px 0;">${formatBRL(b.amount)}</div>
        <div style="font-size:12px;color:#475569;">Vencimento: ${b.dueDate}</div>
      </div>

      <div style="margin-top:10px;background:#f1f5f9;padding:12px;border-radius:8px;font-family:monospace;font-size:12px;word-break:break-all;color:#1e293b;">
        ${b.barcode}
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:14px;">
        <button class="btn-outline-sm" onclick="copyBarcode('${b.barcode}')">${Icons.copy} Copiar Código</button>
        ${b.status !== 'Pago' ? `
          <button class="btn-solid-sm" onclick="paySingleBoleto('${b.id}')">✓ Marcar como Pago</button>
        ` : `
          <button class="btn-solid-sm" onclick="showToast('Comprovante ${b.receiptId} baixado!')">Baixar Recibo</button>
        `}
      </div>
    `
  };
  renderAll();
}

function paySingleBoleto(boletoId) {
  const b = AppState.db.boletos.find(x => x.id === boletoId);
  if (b) {
    b.status = 'Pago';
    b.paidDate = todayFormatted();
    b.receiptId = 'COMP-' + Date.now();
    window.CondoData.saveDB(AppState.db);
  }
  closeModal();
  showToast('Boleto quitado com sucesso!');
}

function payAllOverdueBoletos() {
  AppState.db.boletos.forEach(b => {
    if (b.status !== 'Pago') {
      b.status = 'Pago';
      b.paidDate = todayFormatted();
      b.receiptId = 'COMP-PIX-' + Date.now();
    }
  });
  window.CondoData.saveDB(AppState.db);
  showToast('Todas as faturas pendentes foram marcadas como pagas!');
  renderAll();
}

function openTicketModal(side, ticketId) {
  const t = AppState.db.tickets.find(x => x.id === ticketId);
  if (!t) return;

  const isAdmin = side === 'admin' || AppState.viewMode === 'admin';
  AppState.activeModal = {
    title: `${t.id} — ${t.title}`,
    html: `
      <div style="display:flex;justify-content:space-between;margin-bottom:10px;">
        <span class="status-badge info">${t.category}</span>
        <span class="status-badge ${t.status === 'Concluído' ? 'paid' : 'open'}">${t.status}</span>
      </div>
      <p style="font-size:13.5px;color:#334155;line-height:1.5;margin-bottom:12px;">${t.description}</p>
      <div style="font-size:12px;color:#64748b;margin-bottom:14px;">
        <div>🏢 <strong>Condomínio:</strong> ${t.condoName} (${t.unit})</div>
        <div>👤 <strong>Solicitante:</strong> ${t.author} · ${t.date}</div>
      </div>

      <h5 style="font-size:12.5px;font-weight:700;color:#0f172a;margin-bottom:6px;">Histórico de Atendimento</h5>
      <div style="background:#f8fafc;border-radius:8px;padding:10px;margin-bottom:14px;max-height:130px;overflow-y:auto;">
        ${t.history.map(h => `
          <div style="font-size:12px;margin-bottom:6px;padding-bottom:6px;border-bottom:1px solid #e2e8f0;">
            <strong style="color:#1d4ed8;">${h.date}:</strong> ${h.text}
          </div>
        `).join('')}
      </div>

      ${isAdmin ? `
        <div style="border-top:1px solid #e2e8f0;padding-top:12px;">
          <label class="form-label">Atualizar Status do Chamado</label>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
            <button class="btn-outline-sm" onclick="updateTicketStatus('${t.id}', 'Em andamento')">🔧 Em andamento</button>
            <button class="btn-solid-sm" style="background:#059669;" onclick="updateTicketStatus('${t.id}', 'Concluído')">✓ Concluir Chamado</button>
          </div>
        </div>
      ` : ''}
    `
  };
  renderAll();
}

function updateTicketStatus(ticketId, newStatus) {
  const t = AppState.db.tickets.find(x => x.id === ticketId);
  if (!t) return;
  t.status = newStatus;
  t.history.push({
    date: todayFormatted(),
    text: `Status alterado pelo Gestor para "${newStatus}".`
  });

  if (t.linkedPendingId) {
    const p = AppState.db.pendings.find(x => x.id === t.linkedPendingId);
    if (p) {
      p.status = newStatus === 'Concluído' ? 'Resolvida' : 'Em análise';
    }
  }

  window.CondoData.saveDB(AppState.db);
  closeModal();
  showToast(`Chamado ${t.id} atualizado para "${newStatus}"!`);
}

function openPendingDetailModal(pendId) {
  const p = AppState.db.pendings.find(x => x.id === pendId);
  if (!p) return;
  AppState.activeModal = {
    title: `Pendência: ${p.title}`,
    html: `
      <p style="font-size:14px;font-weight:600;color:#0f172a;">${p.subtitle}</p>
      <p style="font-size:12.5px;color:#64748b;margin:8px 0 16px;line-height:1.6;">
        Condomínio: <strong>${p.condoName}</strong><br/>
        Origem: <strong>${p.origin}</strong><br/>
        Prioridade: <strong>${p.priority}</strong>
      </p>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
        <button class="btn-outline-sm" onclick="closeModal()">Fechar</button>
        <button class="btn-solid-sm" style="background:#059669;" onclick="resolvePendingItem('${p.id}')">✓ Marcar Resolvida</button>
      </div>
    `
  };
  renderAll();
}

function resolvePendingItem(pendId) {
  const p = AppState.db.pendings.find(x => x.id === pendId);
  if (p) {
    p.status = 'Resolvida';
    if (p.linkedTicketId) {
      const t = AppState.db.tickets.find(x => x.id === p.linkedTicketId);
      if (t) {
        t.status = 'Concluído';
        t.history.push({ date: todayFormatted(), text: 'Pendência resolvida pela equipe de gestão.' });
      }
    }
    window.CondoData.saveDB(AppState.db);
  }
  closeModal();
  showToast('Pendência marcada como resolvida!');
}

function openDocumentModal(docId) {
  const doc = AppState.db.documents.find(d => d.id === docId);
  if (!doc) return;
  AppState.activeModal = {
    title: doc.title,
    html: `
      <div style="font-size:12px;color:#64748b;margin-bottom:10px;">${doc.category} · ${doc.updatedAt}</div>
      <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;padding:14px;font-size:13.5px;color:#334155;line-height:1.55;margin-bottom:16px;">
        ${doc.summary}
      </div>
      <button class="btn-primary-blue" onclick="closeModal()">Fechar</button>
    `
  };
  renderAll();
}

function openNoticeModal(noticeId) {
  const n = AppState.db.notices.find(x => x.id === noticeId);
  if (!n) return;
  AppState.activeModal = {
    title: n.title,
    html: `
      <div style="font-size:12px;color:#2563eb;font-weight:700;margin-bottom:10px;">${n.category} · ${n.dateLabel}</div>
      <p style="font-size:14px;color:#334155;line-height:1.6;margin-bottom:18px;">${n.content}</p>
      <button class="btn-primary-blue" onclick="closeModal()">Entendi</button>
    `
  };
  renderAll();
}

function openSpaceReserveModal(spaceId) {
  const sp = AppState.db.spaces.find(x => x.id === spaceId);
  if (!sp) return;
  AppState.activeModal = {
    title: `Reservar ${sp.name}`,
    html: `
      <p style="font-size:13px;color:#475569;margin-bottom:10px;">${sp.subtitle} — Taxa: <strong>${sp.fee}</strong></p>
      <div class="form-group">
        <label class="form-label">Escolha a Data da Reserva</label>
        <input type="date" id="reserveDateInput" class="form-control" required />
      </div>
      <div style="margin-bottom:14px;font-size:12px;color:#64748b;">
        <strong>Reservas agendadas (${sp.reservations.length}):</strong>
        ${sp.reservations.map(r => `<div>• ${r.date} — ${r.unit} (${r.resident})</div>`).join('') || '<div>Nenhuma data reservada ainda.</div>'}
      </div>
      <button class="btn-primary-blue" onclick="confirmSpaceReservation('${sp.id}')">
        Confirmar Reserva
      </button>
    `
  };
  renderAll();
}

function confirmSpaceReservation(spaceId) {
  const sp = AppState.db.spaces.find(x => x.id === spaceId);
  const dateInput = document.getElementById('reserveDateInput');
  const rawDate = dateInput && dateInput.value ? dateInput.value : todayFormatted();
  const formatted = rawDate.includes('-') ? rawDate.split('-').reverse().join('/') : rawDate;
  const user = AppState.db.currentUser.resident;

  if (sp) {
    sp.reservations.push({
      date: formatted,
      unit: user.unit || 'Unidade 101',
      resident: user.fullName || 'Morador'
    });
    window.CondoData.saveDB(AppState.db);
  }
  closeModal();
  showToast(`Reserva de ${sp.name} confirmada para ${formatted}!`);
}

function openCondoDetailModal(condoId) {
  const c = AppState.db.condos.find(x => x.id === condoId);
  if (!c) return;
  AppState.activeModal = {
    title: c.name,
    html: `
      <p style="font-size:13px;color:#475569;margin-bottom:12px;">📍 ${c.address}</p>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px;font-size:13px;">
        <div style="background:#f8fafc;padding:10px;border-radius:8px;">Unidades: <strong>${c.units}</strong></div>
        <div style="background:#f8fafc;padding:10px;border-radius:8px;">Síndico: <strong>${c.syndic}</strong></div>
        <div style="background:#f8fafc;padding:10px;border-radius:8px;">Status: <strong>${c.status}</strong></div>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;">
        <button class="btn-outline-sm" onclick="closeModal(); openNewInspectionModal('${c.name}');">Agendar Vistoria</button>
        <button class="btn-solid-sm" style="background:#dc2626;" onclick="deleteCondo('${c.id}')">Excluir Condomínio</button>
      </div>
    `
  };
  renderAll();
}

function deleteCondo(condoId) {
  AppState.db.condos = AppState.db.condos.filter(c => c.id !== condoId);
  window.CondoData.saveDB(AppState.db);
  closeModal();
  showToast('Condomínio removido.');
}

function openNewCondoModal() {
  AppState.activeModal = {
    title: 'Cadastrar Condomínio',
    html: `
      <div class="form-group">
        <label class="form-label">Nome do Condomínio</label>
        <input type="text" id="newCondoName" class="form-control" placeholder="Ex: Ed. Solar das Flores" />
      </div>
      <div class="form-group">
        <label class="form-label">Cidade / Endereço</label>
        <input type="text" id="newCondoCity" class="form-control" placeholder="Ex: São Paulo - SP" />
      </div>
      <div class="form-group">
        <label class="form-label">Quantidade de Unidades</label>
        <input type="number" id="newCondoUnits" class="form-control" placeholder="Ex: 120" />
      </div>
      <div class="form-group">
        <label class="form-label">Síndico / Responsável</label>
        <input type="text" id="newCondoSyndic" class="form-control" placeholder="Nome do síndico" />
      </div>
      <button class="btn-primary-blue" onclick="saveNewCondo()">Salvar Condomínio</button>
    `
  };
  renderAll();
}

function saveNewCondo() {
  const name = document.getElementById('newCondoName').value.trim();
  const city = document.getElementById('newCondoCity').value.trim() || 'Não informado';
  const units = parseInt(document.getElementById('newCondoUnits').value, 10) || 0;
  const syndic = document.getElementById('newCondoSyndic').value.trim() || 'Administração';
  if (!name) return;

  AppState.db.condos.unshift({
    id: 'condo-' + Date.now(),
    name,
    city,
    address: city,
    units,
    status: 'Ativo',
    syndic,
    conformity: 100
  });
  window.CondoData.saveDB(AppState.db);
  closeModal();
  showToast(`Condomínio "${name}" cadastrado!`);
}

function openNewInspectionModal(defaultCondo = '') {
  const hasCondos = AppState.db.condos.length > 0;
  AppState.activeModal = {
    title: 'Agendar Nova Vistoria',
    html: `
      <div class="form-group">
        <label class="form-label">Condomínio</label>
        ${hasCondos ? `
          <select id="newInsCondo" class="form-control">
            ${AppState.db.condos.map(c => `<option value="${c.name}" ${c.name === defaultCondo ? 'selected' : ''}>${c.name}</option>`).join('')}
          </select>
        ` : `
          <input type="text" id="newInsCondo" class="form-control" placeholder="Digite o nome do condomínio" value="${defaultCondo}" />
        `}
      </div>
      <div class="form-group">
        <label class="form-label">Tipo de Vistoria</label>
        <input type="text" id="newInsType" class="form-control" placeholder="Ex: Vistoria periódica / Elevadores / Garagem" value="Vistoria periódica" />
      </div>
      <div class="form-group">
        <label class="form-label">Data</label>
        <input type="text" id="newInsDate" class="form-control" value="${todayFormatted()}" />
      </div>
      <div class="form-group">
        <label class="form-label">Horário</label>
        <input type="time" id="newInsTime" class="form-control" value="09:00" />
      </div>
      <button class="btn-primary-blue" onclick="saveNewInspection()">Confirmar Agendamento</button>
    `
  };
  renderAll();
}

function saveNewInspection() {
  const condoName = document.getElementById('newInsCondo').value.trim() || 'Condomínio';
  const type = document.getElementById('newInsType').value.trim() || 'Vistoria periódica';
  const date = document.getElementById('newInsDate').value.trim() || todayFormatted();
  const time = document.getElementById('newInsTime').value || '09:00';

  const newIns = {
    id: 'vist-' + Date.now(),
    condoName,
    type,
    date,
    time,
    status: 'Pendente',
    inspector: AppState.db.currentUser.admin.fullName || 'Gestor',
    observations: '',
    photos: [],
    checklist: [
      { id: 'c1-' + Date.now(), name: 'Hall de entrada', category: 'Áreas comuns', checked: false, rating: 'Bom', note: '' },
      { id: 'c2-' + Date.now(), name: 'Elevadores', category: 'Áreas comuns', checked: false, rating: 'Bom', note: '' },
      { id: 'c3-' + Date.now(), name: 'Escada de emergência', category: 'Áreas comuns', checked: false, rating: 'Bom', note: '' },
      { id: 'c4-' + Date.now(), name: 'Garagens', category: 'Áreas comuns', checked: false, rating: 'Bom', note: '' },
      { id: 'c5-' + Date.now(), name: 'Salão de festas / Lazer', category: 'Áreas comuns', checked: false, rating: 'Bom', note: '' }
    ]
  };

  AppState.db.inspections.unshift(newIns);
  AppState.activeInspectionId = newIns.id;
  window.CondoData.saveDB(AppState.db);
  closeModal();
  showToast(`Vistoria em ${condoName} agendada!`);
}

function openAdminNewTicketModal() {
  AppState.activeModal = {
    title: 'Abrir Chamado',
    html: `
      <div class="form-group">
        <label class="form-label">Condomínio</label>
        <input type="text" id="admTicketCondo" class="form-control" placeholder="Nome do condomínio" value="${AppState.db.condos[0]?.name || ''}" />
      </div>
      <div class="form-group">
        <label class="form-label">Título da Solicitação / Manutenção</label>
        <input type="text" id="admTicketTitle" class="form-control" placeholder="Ex: Manutenção portão automático" />
      </div>
      <div class="form-group">
        <label class="form-label">Descrição</label>
        <textarea id="admTicketDesc" class="form-control" placeholder="Detalhes do serviço..."></textarea>
      </div>
      <div class="form-group">
        <label class="form-label">Prioridade</label>
        <select id="admTicketPrio" class="form-control">
          <option value="Alta">Alta</option>
          <option value="Média" selected>Média</option>
          <option value="Baixa">Baixa</option>
        </select>
      </div>
      <button class="btn-primary-blue" onclick="saveAdminNewTicket()">Registrar Chamado</button>
    `
  };
  renderAll();
}

function saveAdminNewTicket() {
  const condoName = document.getElementById('admTicketCondo').value.trim() || 'Condomínio';
  const title = document.getElementById('admTicketTitle').value.trim();
  const description = document.getElementById('admTicketDesc').value.trim() || title;
  const priority = document.getElementById('admTicketPrio').value;
  if (!title) return;

  const today = todayFormatted();
  const id = `#CH-${1000 + AppState.db.tickets.length + 1}`;
  AppState.db.tickets.unshift({
    id,
    title,
    category: 'Manutenção Predial',
    description,
    date: today,
    shortDate: today.slice(0, 5),
    status: 'Aberto',
    priority,
    condoName,
    unit: 'Administração',
    author: AppState.db.currentUser.admin.fullName || 'Gestor',
    visibleToResident: true,
    linkedPendingId: null,
    photos: [],
    history: [{ date: today, text: 'Chamado aberto pelo Gestor.' }]
  });
  window.CondoData.saveDB(AppState.db);
  closeModal();
  showToast(`Chamado ${id} registrado!`);
}

function exportInspectionReportPDF() {
  showToast('Abrindo impressão / salvar como PDF...');
  setTimeout(() => {
    window.print();
  }, 400);
}

window.addEventListener('DOMContentLoaded', () => {
  if (AppState.db.session && AppState.db.session.isLoggedIn && AppState.db.session.activeRole) {
    AppState.viewMode = AppState.db.session.activeRole;
  }
  renderAll();
});
