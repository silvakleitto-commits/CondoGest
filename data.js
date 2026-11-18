/**
 * CondoGest - Camada de Dados e Estado (LocalStorage)
 * Pré-carregado com dados realistas de demonstração (idênticos ao escopo do projeto)
 * e pronto para adicionar/editar/excluir registros durante os testes.
 */

const STORAGE_KEY = 'condogest_prod_db_v6';

const INITIAL_DATA = {
  session: {
    isLoggedIn: false,
    activeRole: null, // 'resident' | 'admin'
    loginChoiceRole: 'resident'
  },
  currentUser: {
    resident: {
      name: 'Eduardo',
      fullName: 'Eduardo Cardoso',
      cpf: '348.921.650-00',
      email: 'eduardo@email.com',
      unit: 'Apto. 101 - Torre A',
      condoId: 'condo-1',
      condoName: 'Ed. Solar das Flores'
    },
    admin: {
      name: 'Eduardo',
      fullName: 'Eduardo Cardoso',
      cpf: '348.921.650-00',
      role: 'Gestor / Administradora',
      email: 'admin@condogest.com.br',
      dateLabel: 'Gestão Operacional Ativa'
    }
  },
  condos: [
    {
      id: 'condo-1',
      name: 'Ed. Solar das Flores',
      city: 'São Paulo - SP',
      address: 'Av. Paulista, 1420 - Bela Vista, São Paulo - SP',
      units: 120,
      status: 'Ativo',
      syndic: 'Carlos Alberto Mendes',
      conformity: 92.9
    },
    {
      id: 'condo-2',
      name: 'Condomínio Vista Verde',
      city: 'Santo André - SP',
      address: 'Rua das Figueiras, 850 - Jardim, Santo André - SP',
      units: 96,
      status: 'Ativo',
      syndic: 'Fernanda Lima',
      conformity: 88.5
    },
    {
      id: 'condo-3',
      name: 'Ed. Prime Residence',
      city: 'São Caetano - SP',
      address: 'Av. Goiás, 2100 - Barcelona, São Caetano do Sul - SP',
      units: 90,
      status: 'Ativo',
      syndic: 'Roberto Almeida',
      conformity: 85.0
    },
    {
      id: 'condo-4',
      name: 'Condomínio Boa Vista',
      city: 'São Paulo - SP',
      address: 'Rua Vergueiro, 3100 - Vila Mariana, São Paulo - SP',
      units: 72,
      status: 'Em atenção',
      syndic: 'Patrícia Souza',
      conformity: 74.0
    },
    {
      id: 'condo-5',
      name: 'Ed. Parque das Águas',
      city: 'Guarulhos - SP',
      address: 'Av. Paulo Faccini, 540 - Macedo, Guarulhos - SP',
      units: 88,
      status: 'Ativo',
      syndic: 'Marcos Vinícius',
      conformity: 91.0
    },
    {
      id: 'condo-6',
      name: 'Residencial Horizonte',
      city: 'São Bernardo - SP',
      address: 'Av. Kennedy, 1120 - Anchieta, São Bernardo do Campo - SP',
      units: 64,
      status: 'Ativo',
      syndic: 'Juliana Costa',
      conformity: 89.2
    }
  ],
  boletos: [
    {
      id: 'bol-1',
      month: 'Outubro/2026 — Condomínio + Aluguel',
      type: 'Taxa Condominial + Aluguel',
      dueDate: '10/10/2026',
      amount: 680.00,
      status: 'Em atraso',
      unit: 'Apto. 101 - Torre A',
      barcode: '10492 58963 13000 100043 00000 037523 7 94440000068000',
      receiptId: null,
      breakdown: [
        { label: 'Cota Condominial Ordinária', value: 480.00 },
        { label: 'Fundo de Reserva (10%)', value: 48.00 },
        { label: 'Água / Gás Individualizado', value: 112.00 },
        { label: 'Encargos de Atraso', value: 40.00 }
      ]
    },
    {
      id: 'bol-2',
      month: 'Setembro/2026 — Condomínio + Aluguel',
      type: 'Taxa Condominial + Aluguel',
      dueDate: '10/09/2026',
      amount: 680.00,
      status: 'Em atraso',
      unit: 'Apto. 101 - Torre A',
      barcode: '10492 58963 13000 100043 00000 037523 7 94440000068001',
      receiptId: null,
      breakdown: [
        { label: 'Cota Condominial Ordinária', value: 480.00 },
        { label: 'Fundo de Reserva (10%)', value: 48.00 },
        { label: 'Água / Gás Individualizado', value: 152.00 }
      ]
    },
    {
      id: 'bol-3',
      month: 'Agosto/2026 — Taxa Condominial',
      type: 'Taxa Condominial',
      dueDate: '10/08/2026',
      paidDate: '08/08/2026',
      amount: 680.00,
      status: 'Pago',
      unit: 'Apto. 101 - Torre A',
      barcode: '10492 58963 13000 100043 00000 037523 7 94440000068002',
      receiptId: 'COMP-20260808-9921',
      breakdown: [
        { label: 'Cota Condominial Ordinária', value: 528.00 },
        { label: 'Água / Gás Individualizado', value: 152.00 }
      ]
    },
    {
      id: 'bol-4',
      month: 'Julho/2026 — Taxa Condominial',
      type: 'Taxa Condominial',
      dueDate: '10/07/2026',
      paidDate: '09/07/2026',
      amount: 680.00,
      status: 'Pago',
      unit: 'Apto. 101 - Torre A',
      barcode: '10492 58963 13000 100043 00000 037523 7 94440000068003',
      receiptId: 'COMP-20260709-7742',
      breakdown: [
        { label: 'Cota Condominial Ordinária', value: 528.00 },
        { label: 'Água / Gás Individualizado', value: 152.00 }
      ]
    }
  ],
  tickets: [
    {
      id: '#CH-3247',
      title: 'Manutenção de elevador',
      category: 'Elevadores',
      description: 'Elevador social da Torre A apresentando ruído ao parar no 4º andar e demora no fechamento da porta.',
      date: '15/10/2026',
      shortDate: '15/10',
      status: 'Aberto',
      priority: 'Alta',
      condoName: 'Ed. Solar das Flores',
      unit: 'Apto. 402 - Torre A',
      author: 'Marcos Oliveira',
      visibleToResident: true,
      linkedPendingId: 'pend-1',
      photos: [{ caption: 'Painel do elevador social' }],
      history: [
        { date: '15/10/2026 08:30', text: 'Chamado aberto pelo morador e convertido em Pendência Urgente para a gestão.' }
      ]
    },
    {
      id: '#CH-2847',
      title: 'Vazamento na garagem',
      category: 'Hidráulica / Infiltração',
      description: 'Identificado gotejamento constante na tubulação superior próxima à vaga 14 do subsolo 1.',
      date: '15/10/2026',
      shortDate: '15/10',
      status: 'Em andamento',
      priority: 'Média',
      condoName: 'Condomínio Vista Verde',
      unit: 'Apto. 101 - Torre A',
      author: 'Eduardo Cardoso',
      visibleToResident: true,
      linkedPendingId: 'pend-2',
      photos: [{ caption: 'Tubulação no teto do subsolo 1' }],
      history: [
        { date: '15/10/2026 09:15', text: 'Chamado registrado pelo morador Eduardo.' },
        { date: '15/10/2026 10:40', text: 'Administradora acionou a equipe de manutenção predial (Em andamento).' }
      ]
    },
    {
      id: '#CH-2810',
      title: 'Troca de lâmpadas no corredor',
      category: 'Iluminação / Elétrica',
      description: 'Duas lâmpadas de LED queimadas no corredor de acesso às escadas de emergência do 2º andar.',
      date: '10/10/2026',
      shortDate: '10/10',
      status: 'Aberto',
      priority: 'Baixa',
      condoName: 'Ed. Prime Residence',
      unit: 'Apto. 204',
      author: 'Eduardo Cardoso',
      visibleToResident: true,
      linkedPendingId: 'pend-3',
      photos: [],
      history: [
        { date: '10/10/2026 11:00', text: 'Solicitação enviada para a zeladoria.' }
      ]
    },
    {
      id: '#CH-2792',
      title: 'Regulagem do portão da garagem',
      category: 'Segurança / Portaria',
      description: 'Motor do portão principal precisava de lubrificação no trilho e ajuste de fim de curso.',
      date: '03/10/2026',
      shortDate: '03/10',
      status: 'Concluído',
      priority: 'Média',
      condoName: 'Ed. Solar das Flores',
      unit: 'Apto. 101 - Torre A',
      author: 'Eduardo Cardoso',
      visibleToResident: true,
      linkedPendingId: null,
      photos: [],
      history: [
        { date: '03/10/2026 09:00', text: 'Chamado aberto pelo morador.' },
        { date: '04/10/2026 15:30', text: 'Manutenção realizada e testada pela equipe técnica. Chamado concluído!' }
      ]
    }
  ],
  inspections: [
    {
      id: 'vist-1',
      condoName: 'Ed. Solar das Flores',
      type: 'Vistoria periódica',
      date: '15/10/2026',
      time: '09:00',
      status: 'Pendente',
      inspector: 'Eduardo Cardoso',
      observations: 'Verificar especialmente o sistema de exaustão da churrasqueira, quadro de comando dos elevadores e iluminação de emergência das escadarias.',
      photos: [
        { id: 'ph-1', area: 'Elevadores', caption: 'Quadro de manutenção do Elevador Social', date: '15/10/2026 09:12', tag: 'Pendência' },
        { id: 'ph-2', area: 'Garagens', caption: 'Demarcação de vagas e extintores do Subsolo 1', date: '15/10/2026 09:20', tag: 'Conforme' },
        { id: 'ph-3', area: 'Piscina', caption: 'Casa de bombas e tratamento químico cristalino', date: '15/10/2026 09:35', tag: 'Conforme' },
        { id: 'ph-4', area: 'Hall de entrada', caption: 'Recepção principal, controle biométrico e piso', date: '15/10/2026 09:42', tag: 'Conforme' }
      ],
      checklist: [
        { id: 'chk-1', name: 'Hall de entrada', category: 'Áreas comuns', checked: true, rating: 'Ótimo', note: 'Limpeza e iluminação impecáveis.' },
        { id: 'chk-2', name: 'Elevadores', category: 'Áreas comuns', checked: true, rating: 'Regular', note: 'Ruído no elevador social no 4º andar (Pendência gerada).' },
        { id: 'chk-3', name: 'Escada de emergência', category: 'Áreas comuns', checked: true, rating: 'Bom', note: 'Corrimãos firmes, portas corta-fogo desobstruídas.' },
        { id: 'chk-4', name: 'Garagens', category: 'Áreas comuns', checked: false, rating: 'Regular', note: 'Pequena infiltração próxima à tubulação da vaga 14.' },
        { id: 'chk-5', name: 'Salão de festas', category: 'Áreas comuns', checked: true, rating: 'Ótimo', note: 'Pronto para uso.' },
        { id: 'chk-6', name: 'Playground', category: 'Áreas comuns', checked: true, rating: 'Bom', note: 'Brinquedos revisados.' },
        { id: 'chk-7', name: 'Piscina', category: 'Áreas comuns', checked: true, rating: 'Ótimo', note: 'pH e cloro dentro dos padrões.' },
        { id: 'chk-8', name: 'Área de lazer e jardins', category: 'Áreas comuns', checked: true, rating: 'Bom', note: 'Jardins aparados e lixeiras organizadas.' }
      ]
    },
    {
      id: 'vist-2',
      condoName: 'Condomínio Vista Verde',
      type: 'Vistoria mensal preventiva',
      date: '15/10/2026',
      time: '10:30',
      status: 'Concluída',
      inspector: 'Eduardo Cardoso',
      observations: 'Vistoria mensal concluída com 100% dos itens verificados nas bombas de recalque e fachada.',
      photos: [
        { id: 'ph-201', area: 'Fachada', caption: 'Pintura externa e iluminação em bom estado', date: '15/10/2026 10:35', tag: 'Conforme' }
      ],
      checklist: [
        { id: 'chk-21', name: 'Hall de entrada', category: 'Áreas comuns', checked: true, rating: 'Ótimo', note: 'Tudo em ordem.' },
        { id: 'chk-22', name: 'Elevadores', category: 'Áreas comuns', checked: true, rating: 'Bom', note: 'Funcionamento normal.' },
        { id: 'chk-23', name: 'Escada de emergência', category: 'Áreas comuns', checked: true, rating: 'Ótimo', note: 'Sinalização fotoluminescente OK.' },
        { id: 'chk-24', name: 'Garagens', category: 'Áreas comuns', checked: true, rating: 'Bom', note: 'Portões automáticos revisados.' }
      ]
    },
    {
      id: 'vist-3',
      condoName: 'Ed. Prime Residence',
      type: 'Inspeção Técnica de Elevadores',
      date: '16/10/2026',
      time: '14:00',
      status: 'Pendente',
      inspector: 'Eduardo Cardoso',
      observations: 'Inspeção acompanhada pela empresa conservadora de elevadores.',
      photos: [],
      checklist: [
        { id: 'chk-31', name: 'Casa de Máquinas', category: 'Técnico', checked: true, rating: 'Bom', note: 'Cabos de tração inspecionados.' },
        { id: 'chk-32', name: 'Iluminação de Emergência', category: 'Técnico', checked: false, rating: 'Regular', note: 'Trocar duas lâmpadas no corredor.' }
      ]
    }
  ],
  pendings: [
    {
      id: 'pend-1',
      title: 'Elevador social com ruído no 4º andar',
      subtitle: 'Acionar assistência técnica urgente para ajuste da porta e freio',
      condoName: 'Ed. Solar das Flores',
      date: '15/10',
      priority: 'Urgente',
      status: 'Em análise',
      origin: 'Vistoria / Chamado #CH-3247',
      linkedTicketId: '#CH-3247'
    },
    {
      id: 'pend-2',
      title: 'Infiltração na tubulação da garagem',
      subtitle: 'Necessita reparo hidráulico próximo à vaga 14 do subsolo 1',
      condoName: 'Condomínio Vista Verde',
      date: '15/10',
      priority: 'Média',
      status: 'Em análise',
      origin: 'Chamado #CH-2847',
      linkedTicketId: '#CH-2847'
    },
    {
      id: 'pend-3',
      title: 'Substituição de lâmpadas queimadas',
      subtitle: 'Corredor de acesso às escadas de emergência do 2º andar',
      condoName: 'Ed. Prime Residence',
      date: '14/10',
      priority: 'Baixa',
      status: 'Em análise',
      origin: 'Chamado #CH-2810',
      linkedTicketId: '#CH-2810'
    },
    {
      id: 'pend-4',
      title: 'Pintura e reparo de trinca no hall',
      subtitle: 'Massa corrida e acabamento acrílico na parede lateral da recepção',
      condoName: 'Condomínio Boa Vista',
      date: '13/10',
      priority: 'Baixa',
      status: 'Resolvida',
      origin: 'Vistoria periódica',
      linkedTicketId: null
    }
  ],
  documents: [
    {
      id: 'doc-1',
      title: 'Regulamento Interno do Condomínio',
      category: 'Regulamentos',
      size: 'PDF · 1,2 MB',
      updatedAt: 'Jan/2026',
      summary: 'Dispõe sobre as normas de convivência, horários de silêncio (22h às 08h), uso das áreas comuns, regras para mudanças, obras nas unidades e penalidades aplicáveis.'
    },
    {
      id: 'doc-2',
      title: 'Ata da Última Assembleia Geral Ordinária',
      category: 'Atas',
      size: 'PDF · 850 KB',
      updatedAt: '25/09/2026',
      summary: 'Aprovação das contas do semestre anterior, eleição do conselho fiscal, aprovação da modernização do CFTV e manutenção preventiva dos elevadores.'
    },
    {
      id: 'doc-3',
      title: 'Manual do Morador e Boas Práticas',
      category: 'Regulamentos',
      size: 'PDF · 2,4 MB',
      updatedAt: 'Edição 2026',
      summary: 'Guia prático de boas-vindas aos condôminos: cadastro na portaria, recebimento de encomendas, coleta seletiva de resíduos e contatos de emergência.'
    },
    {
      id: 'doc-4',
      title: 'Balancete e Prestação de Contas Mensal',
      category: 'Atas',
      size: 'PDF · 800 KB',
      updatedAt: 'Setembro/2026',
      summary: 'Demonstrativo financeiro completo de receitas, despesas ordinárias, saldo do Fundo de Reserva e índice de adimplência do condomínio.'
    }
  ],
  spaces: [
    {
      id: 'space-1',
      name: 'Salão de Festas Gourmet',
      subtitle: 'Capacidade: 60 pessoas · 10h às 23h',
      fee: 'R$ 150,00 (Taxa de limpeza)',
      rules: 'Inclui cozinha gourmet equipada, mesas, cadeiras e ar-condicionado.',
      reservations: [
        { date: '24/10/2026', unit: 'Apto. 302 - Torre B', resident: 'Camila Rocha' }
      ]
    },
    {
      id: 'space-2',
      name: 'Churrasqueira Coberta',
      subtitle: 'Capacidade: 20 pessoas · 09h às 22h',
      fee: 'R$ 60,00 (Taxa de limpeza)',
      rules: 'Equipada com grelha inox, freezer horizontal e pia de apoio.',
      reservations: [
        { date: '20/10/2026', unit: 'Apto. 101 - Torre A', resident: 'Eduardo Cardoso' }
      ]
    },
    {
      id: 'space-3',
      name: 'Quadra Poliesportiva',
      subtitle: 'Horário: 07h às 22h',
      fee: 'Gratuito (Reserva de 2h por unidade)',
      rules: 'Uso obrigatório de calçado adequado. Iluminação em LED automatizada.',
      reservations: []
    }
  ],
  notices: [
    {
      id: 'not-1',
      title: 'Manutenção preventiva do elevador social',
      dateLabel: 'Hoje, 14:30 às 16:30',
      category: 'Manutenção',
      content: 'Informamos que hoje, das 14h30 às 16h30, o elevador social da Torre A passará por manutenção preventiva programada. O elevador de serviço permanecerá operando normalmente.'
    },
    {
      id: 'not-2',
      title: 'Encontro e Confraternização no Salão Gourmet',
      dateLabel: 'Sábado, às 19h',
      category: 'Evento Social',
      content: 'Convidamos todos os moradores para a nossa confraternização no Salão de Festas e Pátio Central! Teremos comidas típicas, música ambiente e espaço recreativo infantil.'
    },
    {
      id: 'not-3',
      title: 'Novo Regulamento Interno disponível',
      dateLabel: 'Publicado pela Administração',
      category: 'Administração',
      content: 'O novo Regulamento Interno atualizado na última assembleia já está disponível para consulta na aba Documentos do sistema CondoGest.'
    }
  ]
};

function loadDB() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const fresh = JSON.parse(JSON.stringify(INITIAL_DATA));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
      return fresh;
    }
    const parsed = JSON.parse(raw);
    if (!parsed.session) {
      parsed.session = { isLoggedIn: false, activeRole: null, loginChoiceRole: 'resident' };
    }
    return parsed;
  } catch (e) {
    console.error('Erro ao carregar dados do LocalStorage:', e);
    return JSON.parse(JSON.stringify(INITIAL_DATA));
  }
}

function saveDB(db) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  } catch (e) {
    console.error('Erro ao salvar dados no LocalStorage:', e);
  }
}

function resetDB() {
  const fresh = JSON.parse(JSON.stringify(INITIAL_DATA));
  localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
  return fresh;
}

window.CondoData = {
  loadDB,
  saveDB,
  resetDB
};
