/* app.js - SPA offline enhanced for Ong da PAZ v2 */
const pages = {
  home: `
  <section class="hero-banner">
    <div class="banner-content">
      <h2>Juntos pela Transformação Social</h2>
      <p>Desde 2015, a <strong>Ong da PAZ</strong> atua levando educação, acolhimento e dignidade a milhares de famílias.</p>
      <div class="banner-buttons">
        <button class="btn" onclick="navigate('projects')">Conheça Nossos Projetos</button>
        <button class="btn secondary" onclick="navigate('contact')">Seja Voluntário</button>
      </div>
    </div>
  </section>

  <section class="hero">
    <div class="grid cards-blue">
      <div class="card card-blue">
        <div class="icon-wrap">💡</div>
        <h3>Nossa Missão</h3>
        <p>Promover bem-estar e oportunidades para comunidades em vulnerabilidade.</p>
      </div>
      <div class="card card-blue">
        <div class="icon-wrap">🌍</div>
        <h3>Nossa Visão</h3>
        <p>Comunidades resilientes e com autonomia social e econômica.</p>
      </div>
      <div class="card card-blue">
        <div class="icon-wrap">🤝</div>
        <h3>Nossos Valores</h3>
        <p>Empatia, transparência e colaboração.</p>
      </div>
    </div>
  </section>
`,

  about: `
    <section class="card">
      <h3>Sobre a Ong da PAZ</h3>
      <p>
        A <strong>Ong da PAZ</strong> é uma organização sem fins lucrativos fundada com o propósito de 
        <strong>promover dignidade, oportunidades e esperança</strong> para comunidades em situação de vulnerabilidade social.
        Acreditamos que cada pessoa tem o direito a uma vida plena, com acesso à educação, alimentação e acolhimento.
      </p>

      <p>Desde nossa criação, atuamos em três pilares principais:</p>
      <ul>
        <li><strong>Educação:</strong> programas de reforço escolar, oficinas culturais e inclusão digital para jovens e adultos.</li>
        <li><strong>Alimentação:</strong> distribuição de cestas básicas, refeições comunitárias e hortas sustentáveis.</li>
        <li><strong>Acolhimento:</strong> apoio psicológico, assistência emergencial e programas de reinserção social.</li>
      </ul>

      <p>Com o apoio de voluntários, parceiros e doadores, já conseguimos impactar mais de <strong>5.000 famílias</strong> em diferentes comunidades.
      Nosso trabalho é guiado por valores de <em>empatia, transparência e solidariedade</em>.</p>

      <div class="about-quote">
        <blockquote>“A paz não é apenas a ausência de conflito, mas a presença de justiça, empatia e ação.”</blockquote>
        <cite>— Equipe Ong da PAZ</cite>
      </div>

      <div class="about-impact">
        <h4>Nosso Impacto</h4>
        <div class="impact-stats">
          <div><strong>+5.000</strong><span>Famílias atendidas</span></div>
          <div><strong>+1.200</strong><span>Crianças apoiadas</span></div>
          <div><strong>+300</strong><span>Voluntários ativos</span></div>
        </div>
      </div>

      <div class="about-chart">
        <h4>Crescimento do Impacto (Famílias Atendidas)</h4>
        <canvas id="impactChart" width="700" height="320"></canvas>
      </div>
    </section>`,
  projects: `
    <section>
      <h3>Nossos Projetos</h3>
      <p class="lead">Conheça algumas das iniciativas que transformam vidas diariamente.</p>
      <div class="grid projects-grid" style="margin-top:18px">
        <div class="card project-card">
          <div class="project-image" style="background-image:url('./img/projeto-educacao.jpg');"></div>
          <div class="project-content">
            <div class="icon-wrap">📚</div>
            <h3>Educação</h3>
            <p>Oficinas de reforço escolar, inclusão digital e programas de leitura.</p>
          </div>
        </div>
        <div class="card project-card">
          <div class="project-image" style="background-image:url('./img/projeto-alimentacao.jpg');"></div>
          <div class="project-content">
            <div class="icon-wrap">🥗</div>
            <h3>Alimentação</h3>
            <p>Distribuição de cestas básicas e hortas comunitárias sustentáveis.</p>
          </div>
        </div>
        <div class="card project-card">
          <div class="project-image" style="background-image:url('./img/projeto-acolhimento.jpg');"></div>
          <div class="project-content">
            <div class="icon-wrap">🏠</div>
            <h3>Acolhimento</h3>
            <p>Atendimento emergencial, abrigo e suporte psicológico.</p>
          </div>
        </div>
      </div>
    </section>`,
  contact: `
    <section class="form">
      <h3>Fale conosco</h3>
      <form id="contactForm" novalidate>
        <div class="field">
         
          <input class="input" name="name" id="name" placeholder=" " required>
          <label class="label" for="name">  Nome</label>
          <div class="error-message" aria-live="polite"></div>
        </div>
        <div class="field">
         
          <input class="input" type="email" name="email" id="email" placeholder=" " required>
          <label class="label" for="email">  Email</label>
          <div class="error-message" aria-live="polite"></div>
        </div>
        <div class="field">
          
          <textarea class="input" name="message" id="message" rows="4" placeholder=" " required></textarea>
          <label class="label" for="message">  Mensagem</label>
          <div class="error-message" aria-live="polite"></div>
        </div>
        <div style="display:flex;gap:10px;align-items:center">
          <button class="btn" type="submit">Enviar Mensagem</button>
          <button type="button" class="btn secondary" onclick="document.getElementById('contactForm').reset()">Limpar</button>
        </div>
      </form>
    </section>`
};

const app = document.getElementById('app');
const loader = document.getElementById('loader');
const toastContainer = document.getElementById('toast-container');

function navigate(page){
  showLoader(true);
  app.classList.add('fade-out');
  setTimeout(()=>{
    app.innerHTML = pages[page] || pages.home;
    app.classList.remove('fade-out');
    showLoader(false);
    if(page === 'contact') initForm();
    if(page === 'about') setTimeout(renderImpactChart, 300);
  },350);
}

function showLoader(show){
  if(show){ loader.classList.remove('hidden'); } else { loader.classList.add('hidden'); }
}

function initForm(){
  const form = document.getElementById('contactForm');
  if(!form) return;
  try{
    const prev = JSON.parse(localStorage.getItem('ong.contact')||'null');
    if(prev){ form.name.value = prev.name||''; form.email.value = prev.email||''; form.message.value = prev.message||''; }
  }catch(e){}
  form.addEventListener('input', e=> validateField(e.target));
  form.addEventListener('submit', e=>{
    e.preventDefault();
    const ok = validateForm(form);
    if(!ok){ showToast('Por favor corrija os campos em vermelho', 'error'); return; }
    showToast('Enviando...', 'info');
    setTimeout(()=>{
      const payload = { name:form.name.value.trim(), email:form.email.value.trim(), message:form.message.value.trim(), sentAt:new Date().toISOString() };
      localStorage.setItem('ong.contact', JSON.stringify(payload));
      form.reset();
      showToast('Mensagem enviada com sucesso! ✅', 'success');
    },900);
  });
}

function validateField(field){
  if(!field) return;
  const val = field.value.trim();
  const err = field.parentElement.querySelector('.error-message');
  field.classList.remove('error','success');
  err.textContent='';
  if(!val){ field.classList.add('error'); err.textContent='Campo obrigatório'; return false; }
  if(field.type==='email' && !/^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(val)){ field.classList.add('error'); err.textContent='Email inválido'; return false; }
  if(field.name==='message' && val.length<10){ field.classList.add('error'); err.textContent='Mínimo 10 caracteres'; return false; }
  field.classList.add('success');
  return true;
}

function validateForm(form){
  let ok = true;
  form.querySelectorAll('[required]').forEach(f=>{ if(!validateField(f)) ok=false; });
  return ok;
}

function showToast(text, type='info'){
  const t = document.createElement('div');
  t.className = 'toast';
  const icon = { success:'✅', error:'❌', info:'ℹ️' }[type]||'';
  t.innerHTML = `<div style="font-size:18px">${icon}</div><div><strong style="display:block">${text}</strong></div>`;
  toastContainer.appendChild(t);
  setTimeout(()=>{ t.style.opacity='0'; setTimeout(()=>t.remove(),400); }, 3000);
}

/* Theme */
const themeBtn = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('ong.theme') || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
document.documentElement.setAttribute('data-theme', savedTheme);
themeBtn.textContent = savedTheme==='dark' ? '☀️' : '🌙';
themeBtn.addEventListener('click', ()=>{
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const next = current==='light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('ong.theme', next);
  themeBtn.textContent = next==='dark' ? '☀️' : '🌙';
});

/* nav binding */
document.querySelectorAll('.nav-btn').forEach(b=> b.addEventListener('click', ()=> navigate(b.dataset.page)));

/* initial render */
document.getElementById('year').textContent = new Date().getFullYear();
navigate('home');

// === Gráfico aprimorado com gradiente, eixos e tooltip ===
function renderImpactChart() {
  const canvas = document.getElementById('impactChart');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const data = {
    labels: ['2020', '2021', '2022', '2023', '2024'],
    values: [800, 1500, 2600, 3800, 5000],
  };

  const padding = 50;
  const chartHeight = canvas.height - padding * 2;
  const chartWidth = canvas.width - padding * 2;
  const barWidth = (chartWidth / data.values.length) - 30;
  const maxVal = Math.max(...data.values) * 1.1;

  const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim();
  const textColor = getComputedStyle(document.documentElement).getPropertyValue('--text').trim();
  const mutedColor = getComputedStyle(document.documentElement).getPropertyValue('--muted').trim();

  let progress = 0;
  let tooltip = { active: false, x: 0, y: 0, value: 0, label: '' };

  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // linhas de grade
    ctx.strokeStyle = mutedColor + "33";
    ctx.lineWidth = 1;
    const lines = 5;
    for (let i = 0; i <= lines; i++) {
      const y = padding + (chartHeight / lines) * i;
      ctx.beginPath();
      ctx.moveTo(padding, y);
      ctx.lineTo(canvas.width - padding, y);
      ctx.stroke();
    }

    // eixos
    ctx.strokeStyle = mutedColor;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.stroke();

    // gradiente
    const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
    grad.addColorStop(0, accent);
    grad.addColorStop(1, "#66b3ff");

    ctx.font = "14px Inter";
    ctx.textAlign = "center";

    data.values.forEach((v, i) => {
      const x = padding + i * (barWidth + 30) + 10;
      const barHeight = (v / maxVal) * chartHeight * progress;
      const y = canvas.height - padding - barHeight;

      ctx.fillStyle = grad;
      ctx.fillRect(x, y, barWidth, barHeight);

      // label eixo X
      ctx.fillStyle = textColor;
      ctx.fillText(data.labels[i], x + barWidth / 2, canvas.height - padding + 20);
    });

    // tooltip
    if (tooltip.active) {
      const { x, y, label, value } = tooltip;
      ctx.fillStyle = "rgba(0,0,0,0.75)";
      ctx.beginPath();
      // rounded rect polyfill
      const rx = x - 50, ry = y - 50, rw = 100, rh = 35, r = 8;
      ctx.moveTo(rx + r, ry);
      ctx.arcTo(rx + rw, ry, rx + rw, ry + rh, r);
      ctx.arcTo(rx + rw, ry + rh, rx, ry + rh, r);
      ctx.arcTo(rx, ry + rh, rx, ry, r);
      ctx.arcTo(rx, ry, rx + rw, ry, r);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = "#fff";
      ctx.font = "13px Inter";
      ctx.textAlign = "center";
      ctx.fillText(`${label}: ${value}`, x, y - 28);
    }

    if (progress < 1) {
      progress += 0.02;
      requestAnimationFrame(draw);
    }
  };

  // interatividade
  canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    tooltip.active = false;

    data.values.forEach((v, i) => {
      const x = padding + i * (barWidth + 30) + 10;
      const barHeight = (v / maxVal) * chartHeight;
      const y = canvas.height - padding - barHeight;
      if (mouseX >= x && mouseX <= x + barWidth && mouseY >= y && mouseY <= canvas.height - padding) {
        tooltip = { active: true, x: x + barWidth / 2, y, value: v, label: data.labels[i] };
      }
    });
    draw();
  });
  draw();
}
