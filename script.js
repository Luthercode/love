
// Efeito de corações flutuando ao clicar em qualquer botão
function createHeart(x, y, emoji = '💖') {
  const heart = document.createElement('div');
  heart.className = 'heart';
  heart.textContent = emoji;
  heart.style.left = `${x - 20}px`;
  heart.style.top = `${y - 20}px`;
  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 2200);
}
// função simples de confete — cria pequenos elementos .confetti animados
function launchConfetti(amount = 24) {
  try {
    const colors = ['#ff5da2', '#ffd166', '#8ad9ff', '#c770f0', '#7ef0a3'];
    for (let i = 0; i < amount; i++) {
      const c = document.createElement('div');
      c.className = 'confetti';
      const size = 6 + Math.random() * 12;
      c.style.width = `${size}px`;
      c.style.height = `${Math.round(size + 4)}px`;
      c.style.background = colors[i % colors.length];
      c.style.left = `${Math.random() * 100}vw`;
      c.style.top = `${-10 - Math.random() * 20}vh`;
      c.style.transform = `rotate(${Math.random() * 360}deg)`;
      c.style.opacity = '0.95';
      c.style.zIndex = 99999;
      c.style.pointerEvents = 'none';
      c.style.animation = `confettiFall ${2 + Math.random() * 2}s linear forwards`;
      document.body.appendChild(c);
      setTimeout(() => c.remove(), 5200);
    }
  } catch (e) { /* silencioso se algo falhar */ }
}
document.querySelectorAll('button').forEach(btn => {
  btn.addEventListener('click', e => {
    createHeart(e.clientX, e.clientY);
  });
});


// Easter egg: pressione "Y" para mensagem secreta
window.addEventListener('keydown', e => {
  if (e.key.toLowerCase() === 'y') {
    alert('Yuna, você é meu segredo mais bonito! �');
  }
});

function fuja() {
  var botaoNao = document.querySelector('.btn-nao');
  var larguraJanela = window.innerWidth;
  var alturaJanela = window.innerHeight;
  // Limites para não colar nas bordas (margem de 12px)
  var maxX = Math.max(12, larguraJanela - botaoNao.offsetWidth - 12);
  var maxY = Math.max(12, alturaJanela - botaoNao.offsetHeight - 12);
  var aleatorioX = 12 + Math.random() * (maxX - 12);
  var aleatorioY = 12 + Math.random() * (maxY - 12);
  // Suaviza o movimento
  botaoNao.style.transition = 'left 0.25s ease, top 0.25s ease';
  botaoNao.style.left = aleatorioX + 'px';
  botaoNao.style.top = aleatorioY + 'px';
}

// Ativa o efeito de fugir ao passar o mouse após o DOM estar pronto
document.addEventListener('DOMContentLoaded', function() {
  var btnSim = document.querySelector('.btn-sim');
  var btnNao = document.querySelector('.btn-nao');
  // iniciar timer de amor (se existir no index)
  initLoveTimer();
  // iniciar dedicatórias (painel discreto)
  initDedicatorias();
  if (btnSim && btnNao) {
    // Pega posição do botão Sim na tela com scroll compensado
    var rectSim = btnSim.getBoundingClientRect();
    // Forçar reflow para garantir medidas corretas do btnNao
    void btnNao.offsetWidth;
    var naoRect = btnNao.getBoundingClientRect();
    // Para position: fixed, usar coordenadas relativas à viewport (rectSim)
    var initialLeft = rectSim.right + 10; // pequeno espaçamento à direita do botão Sim
  // centro vertical alinhado; aplicar pequena correção para ajustar diferenças de render
  var initialTop = rectSim.top + (rectSim.height / 2) - (naoRect.height / 2) - 6; // nudge -6px
    // Garantir dentro da viewport (margem 12px)
    initialLeft = Math.min(Math.max(12, initialLeft), window.innerWidth - naoRect.width - 12);
    initialTop = Math.min(Math.max(12, initialTop), window.innerHeight - naoRect.height - 12);
    btnNao.style.left = initialLeft + 'px';
    btnNao.style.top = initialTop + 'px';
    // Adiciona evento de fugir
    btnNao.addEventListener('mouseenter', fuja);
    // reajustar se a janela for redimensionada para manter alinhamento
    window.addEventListener('resize', function(){
      var r = btnSim.getBoundingClientRect();
      var nr = btnNao.getBoundingClientRect();
      var l = Math.min(Math.max(12, r.right + 10), window.innerWidth - nr.width - 12);
  var t = Math.min(Math.max(12, r.top + (r.height/2) - (nr.height/2) - 6), window.innerHeight - nr.height - 12);
      btnNao.style.left = l + 'px';
      btnNao.style.top = t + 'px';
    });
    // Faz o botão Sim redirecionar para o link do YouTube
    btnSim.addEventListener('click', function(e) {
      // confetti celebration
      launchConfetti(28);
      // pequenos corações já criados pelo handler global
      setTimeout(()=> window.location.href = 'https://www.youtube.com/watch?v=oRvND-r57Us', 900);
    });
  }

  // ---- raposa animada: spawn periódico ---------------------------------
  // cria uma raposa que atravessa a tela usando assets/fox.gif se existir.
  // respeita prefer-reduced-motion
  (function initFox() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return; // não rodar animações pesadas

    const foxSrc = 'assets/fox.gif';

    // checa se o arquivo existe (fetch HEAD). Se não, ignora silenciosamente.
    fetch(foxSrc, { method: 'HEAD' }).then(res => {
      if (!res.ok) return; // arquivo não disponível

      function spawnFox() {
        const img = document.createElement('img');
        img.src = foxSrc;
        img.alt = 'Raposa brincando';
        img.className = 'fox';

        // escolher direção aleatória
        const reverse = Math.random() > 0.5;
        if (reverse) {
          img.classList.add('reverse');
          img.style.left = 'calc(100vw + 260px)';
        }

        // duração e atraso levemente randômicos para variar
        const dur = 6 + Math.random() * 6; // 6s..12s
        img.style.setProperty('--fox-dur', dur + 's');

        document.body.appendChild(img);

        // forçar reflow para garantir que a classe de animação seja aplicada
        void img.offsetWidth;
        img.classList.add('active', 'hop');

        // se for reverse, animamos transform em sentido oposto
        if (reverse) {
          img.style.transform = 'scaleX(-1)';
        }

        // remover ao terminar a animação
        const removeAfter = dur * 1000 + 1000;
        setTimeout(() => {
          img.classList.remove('active');
          img.classList.remove('hop');
          img.addEventListener('transitionend', () => img.remove(), { once: true });
          // garantir remoção caso transitionend não dispare
          setTimeout(() => img.remove(), 1200);
        }, removeAfter);
      }

      // spawn inicial aleatório (5..20s) e depois a cada 18..36s
      setTimeout(function schedule() {
        spawnFox();
        const next = 18000 + Math.random() * 18000;
        setTimeout(schedule, next);
      }, 5000 + Math.random() * 15000);
    }).catch(() => { /* ignora se fetch falhar */ });
  })();

  // -- auto-play music if flagged from start.html ---------------------
  // util: garante instância única do áudio
  function getOrCreateMusic(){
    let music = document.getElementById('bg-music');
    if(!music){
      music = document.createElement('audio');
      music.id = 'bg-music';
  music.src = 'assets/musica/d4vd - here with me (legendado) [6T0Q73HwbFY].mp3';
      music.loop = true;
  music.volume = 0.05; // volume ajustado para 5%
      document.body.appendChild(music);
    }
    return music;
  }

  (function resumeMusic(){
    try{
      const shouldPlay = localStorage.getItem('yuna_play_music');
      if(!shouldPlay) return;
      // remover flag para não reiniciar em reloads
      localStorage.removeItem('yuna_play_music');
      // obter/crear único áudio e tocar
      const music = getOrCreateMusic();
      music.play().catch(()=>{/* autoplay bloqueado, usuário precisa interagir */});

      // tecla 'm' para pausar/tocar
      window.addEventListener('keydown', e=>{
        if(e.key.toLowerCase()==='m'){
          if(music.paused) music.play(); else music.pause();
        }
      });
    }catch(e){ /* ignorar falhas de storage */ }
  })();

  // toggle de legendas removido a pedido

  // (Legendas removidas a pedido)

  // if no start flag, show a blurred overlay with CTA to start music
  (function startOverlay(){
    // Only show overlay on the main index page to avoid duplicates on other pages
    try{
      const isIndex = location.pathname.endsWith('index.html') || document.title === 'Yuna -' || location.pathname === '/';
      if(!isIndex) return;
      const hasFlag = localStorage.getItem('yuna_play_music');
      const alreadyAudio = !!document.getElementById('bg-music');
      if(hasFlag || alreadyAudio) return; // já haverá música ou será iniciada pelo flag
    }catch(e){ /* ignore */ }

    // create overlay
    const overlay = document.createElement('div'); overlay.className='start-overlay';
    const card = document.createElement('div'); card.className='start-card';
    card.innerHTML = `<h2>Yuna</h2><p>Clique para começar</p><button class="btn-dark btn-start">Começar</button>`;
    overlay.appendChild(card);
    document.body.appendChild(overlay);

    const btn = card.querySelector('.btn-start');
    btn.addEventListener('click', ()=>{
      const music = getOrCreateMusic();
      music.play().catch(()=>{});
      overlay.remove();
    });
  })();
  // audio feature removed (user will add music manually)

  // diary feature removed

  // ---------------- cursor follower -------------------------------
  (function cursorFollower(){
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  // só ativar cursor custom em dispositivos com ponteiro fino (desktop)
  if(!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  const c = document.createElement('div'); c.className='fancy-cursor'; document.body.appendChild(c);
  // marcar body para esconder cursor nativo via CSS
  document.documentElement.classList.add('has-fancy-cursor');
  let mx = window.innerWidth/2, my = window.innerHeight/2;
  window.addEventListener('mousemove', e=>{ mx=e.clientX; my=e.clientY; c.style.left = mx+'px'; c.style.top = my+'px'; });
  // subtle pulse on click
  window.addEventListener('click', ()=>{ c.style.transform = 'translate(-50%, -50%) scale(1.18)'; setTimeout(()=> c.style.transform='translate(-50%, -50%) scale(0.95)', 140); });
  // clean up when leaving page (avoid sticky class)
  window.addEventListener('pagehide', ()=>{ document.documentElement.classList.remove('has-fancy-cursor'); c.remove(); });
  })();
});


// ---------------- love timer -------------------------------
function initLoveTimer(){
  const el = document.getElementById('love-timer');
  if(!el) return;
  const startAttr = el.getAttribute('data-start');
  const start = startAttr ? new Date(startAttr) : null;
  if(!start || isNaN(start.getTime())) return;

  const ids = {
    anos: document.getElementById('lt-anos'),
    meses: document.getElementById('lt-meses'),
    dias: document.getElementById('lt-dias'),
  horas: document.getElementById('lt-horas'),
    min: document.getElementById('lt-min'),
    seg: document.getElementById('lt-seg'),
  };

  function diffParts(from, to){
    // calcular anos/meses/dias exatos no calendário
    let years = to.getFullYear() - from.getFullYear();
    let months = to.getMonth() - from.getMonth();
    let days = to.getDate() - from.getDate();

    if (days < 0) {
      const prevMonth = new Date(to.getFullYear(), to.getMonth(), 0).getDate();
      months -= 1;
      days += prevMonth;
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    // minutos e segundos restantes (baseado em diferença total)
  const diffMs = to - new Date(from.getFullYear()+years, from.getMonth()+months, from.getDate()+days, from.getHours(), from.getMinutes(), from.getSeconds());
  let remaining = Math.max(0, Math.floor(diffMs/1000));
  const sec = remaining % 60; remaining = Math.floor(remaining/60);
  const minOnly = remaining % 60; remaining = Math.floor(remaining/60);
  const hoursOnly = remaining % 24;

  return { years, months, days, horas: hoursOnly, min: minOnly, sec };
  }

  function tick(){
    const now = new Date();
    const p = diffParts(start, now);
    if(ids.anos) ids.anos.textContent = p.years;
    if(ids.meses) ids.meses.textContent = p.months;
    if(ids.dias) ids.dias.textContent = p.days;
  if(ids.horas) ids.horas.textContent = String(p.horas).padStart(2,'0');
  if(ids.min) ids.min.textContent = String(p.min).padStart(2,'0');
  if(ids.seg) ids.seg.textContent = String(p.sec).padStart(2,'0');
  }
  tick();
  setInterval(tick, 1000);

  // animar cor do número de anos em RGB (HSL cycling)
  const anosEl = ids.anos;
  if(anosEl){
    let hue = 0;
    function colorTick(){
      hue = (hue + 1.2) % 360; // velocidade do ciclo
      // cor viva com brilho
      anosEl.style.color = `hsl(${hue} 95% 60%)`;
      anosEl.style.textShadow = `0 0 18px hsla(${hue} 95% 60% / .55), 0 0 34px hsla(${(hue+40)%360} 90% 55% / .35)`;
      requestAnimationFrame(colorTick);
    }
    colorTick();
  }
}

// --- partículas flutuantes neon + parallax ---
(function() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const count = 18;
  const particles = [];
  for (let i=0;i<count;i++){
    const p = document.createElement('div');
    p.className = 'particle';
    p.style.left = Math.random()*100 + 'vw';
    p.style.top = Math.random()*100 + 'vh';
    p.style.opacity = (0.25+Math.random()*0.75).toString();
    p.style.transform = `scale(${0.5+Math.random()*1.2})`;
    document.body.appendChild(p);
    particles.push(p);
    // float animation
    (function anim(el, delay){
      const dur = 6000 + Math.random()*8000;
      el.animate([
        { transform: el.style.transform + ' translateY(0px)' },
        { transform: el.style.transform + ' translateY(' + (20+Math.random()*60) + 'px)' }
      ], { duration: dur, iterations: Infinity, direction: 'alternate', easing: 'ease-in-out', delay: Math.random()*1000 });
    })(p, i*100);
  }

  // subtle parallax with mouse
  window.addEventListener('mousemove', function(e){
    const cx = e.clientX / window.innerWidth - 0.5;
    const cy = e.clientY / window.innerHeight - 0.5;
    particles.forEach((p, i)=>{
      const depth = (i%6)/6; // 0..0.83
      p.style.transform = `translate3d(${cx*20*depth}px, ${cy*12*depth}px, 0)`;
    });
  });
})();

// reveal on scroll
function revealOnScroll(){
  const els = document.querySelectorAll('.textos p');
  els.forEach((el, i)=>{
    if (!el.classList.contains('reveal')) el.classList.add('reveal');
  });
  function check(){
    els.forEach(el=>{
      const rect = el.getBoundingClientRect();
      if(rect.top < window.innerHeight - 80){ el.classList.add('is-visible') }
    });
  }
  check();
  window.addEventListener('scroll', check);
}
revealOnScroll();

// tooltip for footer link
const footerLink = document.getElementById('btn-ir-segunda');
if (footerLink){
  const tip = document.createElement('div');
  tip.className = 'tooltip';
  tip.textContent = 'Clique para uma surpresa :)';
  document.body.appendChild(tip);
  footerLink.addEventListener('mousemove', e=>{
    tip.style.left = e.clientX + 'px';
    tip.style.top = e.clientY + 'px';
    tip.classList.add('active');
  });
  footerLink.addEventListener('mouseleave', ()=> tip.classList.remove('active'));
}

// ---------------- dedicatórias (painel) -------------------------------
function initDedicatorias(){
  const openBtn = document.getElementById('btn-open-dedic');
  const panel = document.getElementById('dedic-panel');
  const overlay = document.getElementById('dedic-overlay');
  const list = document.getElementById('dedic-list');
  if(!openBtn || !panel || !overlay || !list) return;

  const KEY = 'yuna_dedic_list_v1';
  const getAll = () => { try{ return JSON.parse(localStorage.getItem(KEY) || '[]'); }catch{ return [] } };
  const setAll = (arr) => { try{ localStorage.setItem(KEY, JSON.stringify(arr)); }catch{} };

  function render(){
    const arr = getAll();
    list.innerHTML = '';
    if(arr.length === 0){
      // Não mostra nada se não houver dedicatórias
      return;
    }
    arr.forEach(item=>{
      const li = document.createElement('li');
      li.className = 'dedic-item';
      const t = document.createElement('div'); t.className = 't'; t.textContent = item.title || '(sem título)';
      const d = document.createElement('div'); d.className = 'd'; d.textContent = item.text || '';
      li.appendChild(t); li.appendChild(d);
      list.appendChild(li);
    });
  }

  function open(){ panel.classList.add('open'); panel.setAttribute('aria-hidden','false'); overlay.hidden = false; openBtn.classList.add('stick'); }
  function close(){ panel.classList.remove('open'); panel.setAttribute('aria-hidden','true'); overlay.hidden = true; openBtn.classList.remove('stick'); }

  // usar o mesmo botão para abrir/fechar (toggle)
  openBtn.addEventListener('click', ()=>{
    if(panel.classList.contains('open')){ close(); }
    else { open(); }
  });
  overlay.addEventListener('click', close);
  window.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') close(); });

  render();
}