const chatMessages = document.getElementById('chatMessages');
const chatForm = document.getElementById('chatForm');
const chatInput = document.getElementById('chatInput');
const quickReplies = document.getElementById('quickReplies');
const newProjectBtn = document.getElementById('newProjectBtn');
const clearChatBtn = document.getElementById('clearChatBtn');
const previewCanvas = document.getElementById('previewCanvas');
const codeView = document.getElementById('codeView');

const tabs = document.querySelectorAll('.tab');
const previewTab = document.getElementById('previewTab');
const codeTab = document.getElementById('codeTab');

const wizardQuestions = [
  { key: 'projectName', prompt: 'Qual o nome do projeto?' },
  { key: 'problem', prompt: 'Qual problema principal este projeto resolve?' },
  { key: 'projectType', prompt: 'Tipo de iniciativa?', options: ['Greenfield', 'Brownfield'] },
  { key: 'hasPrd', prompt: 'Você já tem PRD?', options: ['Sim', 'Não'] },
  { key: 'needsPlaybook', prompt: 'Precisa de playbook operacional?', options: ['Sim', 'Não'] },
  { key: 'frontend', prompt: 'Stack frontend desejada?', options: ['React', 'Next.js', 'Vue', 'Outro'] },
  { key: 'backend', prompt: 'Stack backend desejada?', options: ['Node.js', 'Python', '.NET', 'Outro'] },
  { key: 'database', prompt: 'Banco de dados principal?', options: ['PostgreSQL', 'MySQL', 'MongoDB', 'Outro'] },
  { key: 'auth', prompt: 'Como será autenticação?', options: ['JWT/OAuth2', 'SSO', 'Sem autenticação'] },
  { key: 'integrations', prompt: 'Quais integrações externas são críticas?' },
  { key: 'deadline', prompt: 'Existe prazo ou marco importante?' },
];

const wizard = {
  active: false,
  step: 0,
  answers: {},
};

function addMessage(text, role = 'agent') {
  const message = document.createElement('div');
  message.className = `msg ${role === 'user' ? 'msg-user' : 'msg-agent'}`;
  message.textContent = text;
  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function setQuickReplies(options = []) {
  quickReplies.innerHTML = '';
  options.forEach((option) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = option;
    button.addEventListener('click', () => handleUserInput(option));
    quickReplies.appendChild(button);
  });
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function askWizardQuestion() {
  const question = wizardQuestions[wizard.step];
  if (!question) {
    finishWizard();
    return;
  }

  addMessage(question.prompt, 'agent');
  setQuickReplies(question.options || []);
}

function startWizard() {
  wizard.active = true;
  wizard.step = 0;
  wizard.answers = {};
  addMessage('Vamos iniciar o novo projeto com governança por documentação. Responda as perguntas a seguir.', 'agent');
  askWizardQuestion();
}

function suggestAgents(answers) {
  const agents = ['@pm', '@po', '@architect', '@dev', '@qa', '@devops'];
  if ((answers.frontend || '').toLowerCase().includes('react') || (answers.frontend || '').toLowerCase().includes('next')) {
    agents.push('@ux-design-expert');
  }
  if ((answers.database || '').toLowerCase().includes('postgre') || (answers.database || '').toLowerCase().includes('mysql')) {
    agents.push('@data-engineer');
  }
  return [...new Set(agents)];
}

function generateArtifacts(answers) {
  const requiredDocs = [
    'Project Brief',
    'PRD',
    'Arquitetura Full Stack',
    'Plano de Entrega (milestones)',
    'Matriz de Riscos',
  ];

  if ((answers.needsPlaybook || '').toLowerCase() === 'sim') {
    requiredDocs.push('Playbook Operacional');
  }

  const agentPlan = suggestAgents(answers);

  const previewHtml = `
    <div class="preview-card">
      <h3>${escapeHtml(answers.projectName || 'Novo Projeto')}</h3>
      <p><strong>Problema:</strong> ${escapeHtml(answers.problem || '-')}</p>
      <p><strong>Tipo:</strong> ${escapeHtml(answers.projectType || '-')}</p>
      <p><strong>Frontend:</strong> ${escapeHtml(answers.frontend || '-')}</p>
      <p><strong>Backend:</strong> ${escapeHtml(answers.backend || '-')}</p>
      <p><strong>Database:</strong> ${escapeHtml(answers.database || '-')}</p>
      <p><strong>Prazo:</strong> ${escapeHtml(answers.deadline || '-')}</p>
    </div>
    <div class="preview-card">
      <h3>Documentação Inicial Obrigatória</h3>
      <ul>${requiredDocs.map((doc) => `<li>${escapeHtml(doc)}</li>`).join('')}</ul>
    </div>
    <div class="preview-card">
      <h3>Agentes Sugeridos</h3>
      <p>${agentPlan.join(', ')}</p>
    </div>
  `;

  const codeArtifact = {
    project: answers.projectName,
    classification: {
      type: answers.projectType,
      has_prd: answers.hasPrd,
      needs_playbook: answers.needsPlaybook,
    },
    stack: {
      frontend: answers.frontend,
      backend: answers.backend,
      database: answers.database,
      auth: answers.auth,
    },
    documentation: requiredDocs,
    agents: agentPlan,
    next_steps: [
      'Gerar PRD estruturado com requisitos funcionais e não funcionais',
      'Definir arquitetura e contratos de API',
      'Planejar backlog por épicos/stories com critérios de aceite',
      'Iniciar implementação full stack após aprovação documental',
    ],
  };

  previewCanvas.innerHTML = previewHtml;
  codeView.textContent = JSON.stringify(codeArtifact, null, 2);
}

function finishWizard() {
  wizard.active = false;
  setQuickReplies([]);
  generateArtifacts(wizard.answers);

  addMessage('Classificação concluída. Gere agora PRD/playbook e só depois avance para construção com agentes e skills.', 'agent');
}

function handleWizardInput(text) {
  const question = wizardQuestions[wizard.step];
  if (!question) {
    return;
  }

  wizard.answers[question.key] = text;
  wizard.step += 1;
  askWizardQuestion();
}

function handleUserInput(text) {
  if (!text.trim()) {
    return;
  }

  addMessage(text, 'user');

  if (wizard.active) {
    handleWizardInput(text.trim());
    return;
  }

  if (/novo projeto|criar projeto|iniciar projeto/i.test(text)) {
    startWizard();
    return;
  }

  addMessage('Posso te ajudar melhor iniciando o modo "Novo Projeto Guiado" para classificar escopo, documentação e stack.', 'agent');
}

chatForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const text = chatInput.value;
  chatInput.value = '';
  handleUserInput(text);
});

newProjectBtn.addEventListener('click', () => {
  startWizard();
});

clearChatBtn.addEventListener('click', () => {
  chatMessages.innerHTML = '';
  quickReplies.innerHTML = '';
  wizard.active = false;
  wizard.step = 0;
  wizard.answers = {};
  addMessage('Conversa limpa. Quando quiser, clique em "Novo Projeto Guiado".', 'agent');
});

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((item) => item.classList.remove('active'));
    tab.classList.add('active');
    const target = tab.dataset.tab;
    previewTab.classList.toggle('active', target === 'preview');
    codeTab.classList.toggle('active', target === 'code');
  });
});

addMessage('Bem-vindo ao AIOS Studio. Clique em "Novo Projeto Guiado" para iniciar a coleta classificatória do projeto.', 'agent');
previewCanvas.innerHTML = '<div class="preview-card"><h3>Sem projeto classificado</h3><p>Inicie o fluxo guiado para gerar preview e artefato técnico.</p></div>';
codeView.textContent = '{\n  "status": "aguardando_classificacao"\n}';
