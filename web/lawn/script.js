/* ============================================================
   LawnHero — site interactions
   Header / menu / reveals / about orbit / sliders /
   carousels / FAQ / forms / final CTA drift.
   ============================================================ */
(function(){
  'use strict';
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s,c)=> (c||document).querySelector(s);
  const $$ = (s,c)=> Array.prototype.slice.call((c||document).querySelectorAll(s));

  /* header */
  const header = $('#site-header');
  const onScrollH = ()=> header.classList.toggle('scrolled', scrollY > 40);
  addEventListener('scroll', onScrollH, {passive:true}); onScrollH();

  /* mobile menu */
  const mBtn=$('#menu-btn'), mMenu=$('#mobile-menu'), icO=$('#ic-o'), icC=$('#ic-c');
  mBtn.addEventListener('click', ()=>{
    const open = mMenu.classList.toggle('hidden')===false;
    mBtn.setAttribute('aria-expanded', open);
    icO.classList.toggle('hidden',open); icC.classList.toggle('hidden',!open);
  });
  $$('#mobile-menu a').forEach(a=>a.addEventListener('click',()=>{
    mMenu.classList.add('hidden'); icO.classList.remove('hidden'); icC.classList.add('hidden');
  }));

  /* hero uses static imagery */

  /* scroll reveals */
  const io = new IntersectionObserver(es=>es.forEach(e=>{
    if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
  }),{threshold:.12, rootMargin:'0px 0px -40px 0px'});
  $$('.rv').forEach(el=>io.observe(el));

  /* about — Lassie-style sticky growing circles */
  const aboutWrap=$('#about-scroll'), growImgs=$$('.grow-img');
  function aboutGrowTick(){
    if(!aboutWrap) return;
    if(reduced || innerWidth<1024){
      growImgs.forEach(g=>{ g.style.opacity='1'; g.style.transform='scale(1)'; });
      const st0=$('#about-center'); if(st0) st0.style.transform='';
      return;
    }
    const r=aboutWrap.getBoundingClientRect(), vh=innerHeight;
    const total=aboutWrap.offsetHeight - vh;
    const p=Math.min(1,Math.max(0,-r.top/Math.max(1,total)));
    const stage=$('#about-stage');
    const sw=stage?stage.clientWidth:1200, sh=stage?stage.clientHeight:640;
    const rx=Math.max(200,sw/2-70), ry=Math.max(200,sh/2-70);
    const sweep=110;
    growImgs.forEach(g=>{
      const s=parseFloat(g.dataset.s||'0'), e=parseFloat(g.dataset.e||'1');
      let l=Math.min(1,Math.max(0,(p-s)/Math.max(0.001,e-s)));
      l=1-Math.pow(1-l,3);
      const a=(parseFloat(g.dataset.a||'0')+p*sweep)*Math.PI/180;
      const ox=(Math.cos(a)*rx).toFixed(1), oy=(Math.sin(a)*ry).toFixed(1);
      g.style.opacity=l<0.02?'0':'1';
      g.style.transform='translate(-50%,-50%) translate('+ox+'px,'+oy+'px) scale('+(0.15+0.85*l).toFixed(3)+')';
    });
    const st=$('#about-center');
    if(st) st.style.transform='scale('+(0.96+0.04*Math.min(1,p*2)).toFixed(3)+')';
  }
  let tick=false;
  addEventListener('scroll', ()=>{ if(!tick){ tick=true; requestAnimationFrame(()=>{ aboutGrowTick(); stackTick(); ctaTick(); tick=false; }); } }, {passive:true});
  addEventListener('resize', ()=>{ aboutGrowTick(); stackTick(); });

  /* (services are static cards — no pinned scroll) */
  aboutGrowTick();

  /* before / after */
  const baWrap=$('#ba-wrap'), baBefore=$('#ba-before'),
        baLine=$('#ba-line'), baHandle=$('#ba-handle'), baRange=$('#ba-range');
  function setBA(p){ p=Math.min(96,Math.max(4,p));
    baBefore.style.clipPath='inset(0 '+(100-p)+'% 0 0)';
    baLine.style.left=p+'%'; baHandle.style.left=p+'%';
    if(document.activeElement!==baRange) baRange.value=Math.round(p);
  }
  setBA(50);
  baRange.addEventListener('input',()=>setBA(Number(baRange.value)));
  let baDrag=false;
  baWrap.addEventListener('pointerdown',e=>{ baDrag=true; try{baWrap.setPointerCapture(e.pointerId);}catch(_){} setBA((e.clientX-baWrap.getBoundingClientRect().left)/baWrap.getBoundingClientRect().width*100); });
  baWrap.addEventListener('pointermove',e=>{ if(baDrag) setBA((e.clientX-baWrap.getBoundingClientRect().left)/baWrap.getBoundingClientRect().width*100); });
  addEventListener('pointerup',()=>baDrag=false);

  /* stacked work cards — each new card slides over the last */
  const stacks=$$('.work-stack');
  function stackTick(){
    if(reduced || innerWidth<1024){ stacks.forEach(s=>{ s.style.transform=''; }); return; }
    stacks.forEach((card,i)=>{
      if(i===stacks.length-1){ card.style.transform=''; return; }
      const nextTop=stacks[i+1].getBoundingClientRect().top;
      const p=Math.min(1,Math.max(0,1-(nextTop-130)/(innerHeight*0.6)));
      card.style.transform='scale('+(1-0.05*p).toFixed(3)+')';
    });
  }
  const tTrack=$('#t-track');
  $('#t-prev').addEventListener('click',()=>tTrack.scrollBy({left:-tTrack.clientWidth*0.7,behavior:'smooth'}));
  $('#t-next').addEventListener('click',()=>tTrack.scrollBy({left:tTrack.clientWidth*0.7,behavior:'smooth'}));

  /* faq — one open at a time */
  const items=$$('.faq-item');
  items.forEach(it=>{
    $('.faq-q',it).addEventListener('click',()=>{
      const was=it.classList.contains('open');
      items.forEach(o=>o.classList.remove('open'));
      if(!was) it.classList.add('open');
    });
  });

  /* zip forms */
  $$('[data-zip-form]').forEach(form=>{
    const input=$('[data-zip-input]',form);
    const err=form.parentElement.querySelector('[data-zip-error]');
    input.addEventListener('input',()=>{ input.value=input.value.replace(/\D/g,'').slice(0,5); if(err)err.classList.add('hidden'); });
    form.addEventListener('submit',e=>{
      e.preventDefault();
      if(/^\d{5}$/.test(input.value.trim())){
        if(err)err.classList.add('hidden');
        const qz=$('#q-zip'); if(qz)qz.value=input.value.trim();
        $('#quote').scrollIntoView({behavior:reduced?'auto':'smooth'});
      } else { if(err)err.classList.remove('hidden'); input.focus(); }
    });
  });

  /* quote form */
  const qf=$('#quote-form');
  qf.addEventListener('submit',e=>{
    e.preventDefault();
    if(!qf.checkValidity()){ qf.reportValidity(); return; }
    const zip=$('#q-zip');
    if(!/^\d{5}$/.test(zip.value.trim())){ zip.focus(); zip.reportValidity(); return; }
    $('#quote-ok').classList.remove('hidden');
    qf.querySelector('button').innerHTML='Request Received ✓';
  });
  $('#q-zip').addEventListener('input',e=>{ e.target.value=e.target.value.replace(/\D/g,'').slice(0,5); });
  $('#q-phone').addEventListener('input',e=>{ e.target.value=e.target.value.replace(/[^\d()+.\- ]/g,''); });

  /* final cta slow drift */
  const ctaImg=$('#cta-img');
  function ctaTick(){
    if(!ctaImg || reduced) return;
    const r=ctaImg.getBoundingClientRect(), vh=innerHeight;
    const p=Math.min(1,Math.max(0,(vh - r.top)/ (vh + r.height)));
    ctaImg.style.transform='translateY('+((p-0.5)*30)+'px)';
  }
  ctaTick();
})();
