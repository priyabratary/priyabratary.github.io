/* AirHero: reusable SVG icons and viewport counters. No runtime dependencies. */
const paths = {
 arrow:'<path d="M3 12h17M14 5l7 7-7 7"/>',
 chevron:'<path d="m6 9 6 6 6-6"/>', menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',
 phone:'<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.8 2.1Z"/>',
 shield:'<path d="M12 3 3 7v5c0 5 9 9 9 9s9-4 9-9V7l-9-4Z"/><path d="m8 12 3 3 5-6"/>',
 check:'<path d="m5 12 4 4L19 6"/>',
 snowflake:'<path d="M12 2v20M3.3 7l17.4 10M3.3 17 20.7 7M9 4l3 3 3-3M9 20l3-3 3 3M3.7 10.6l4-1.1-1.1-4M17.4 18.5l-1.1-4 4-1.1M6.6 18.5l1.1-4-4-1.1M20.3 10.6l-4-1.1 1.1-4"/>',
 flame:'<path d="M13 2c1 6-4 6-3 10 1-1 3-2 3-4 5 3 7 6 5 10-2 4-10 5-13 0-3-5 3-9 4-13 0 4 1 5 1 5 1-3 3-4 3-8Z"/>',
 fan:'<circle cx="12" cy="12" r="2"/><path d="M12 10C5 8 8 1 12 2c3 1 4 4 2 8M14 12c2-7 9-4 8 0-1 3-4 4-8 2M12 14c7 2 4 9 0 8-3-1-4-4-2-8M10 12c-2 7-9 4-8 0 1-3 4-4 8-2"/>',
 wind:'<path d="M3 8h12a3 3 0 1 0-3-3M2 12h17a3 3 0 1 1-3 3M4 16h5a3 3 0 1 1-3 3"/>',
 vent:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 8h10M7 12h10M7 16h10"/>',
 wrench:'<path d="M14.7 6.3a5 5 0 0 0-6.4 6.4l-5.4 5.4a2.1 2.1 0 0 0 3 3l5.4-5.4a5 5 0 0 0 6.4-6.4l-3 3-3-3 3-3Z"/>',
 clock:'<circle cx="12" cy="12" r="9"/><path d="M12 6v6l4 3M18 3l2 2"/>',
 document:'<path d="M14 2H5v20h14V7l-5-5Z"/><path d="M14 2v6h5M8 12h8M8 16h6"/>',
 badge:'<path d="m12 2 3 2 3 .5.5 3 2 3-2 3-.5 3-3 .5-3 2-3-2-3-.5-.5-3-2-3 2-3 .5-3 3-.5 3-2Z"/><path d="m8 10 3 3 5-5"/>',
 heart:'<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0l-1 1-1-1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/>',
 siren:'<path d="M6 17v-5a6 6 0 0 1 12 0v5M5 17h14v4H5zM12 1v2M3 5l2 2M1 12h2M21 12h2M19 7l2-2M12 9v4"/>'
 ,thermostat:'<path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0Z"/><path d="M12 12v5"/>'
 ,refresh:'<path d="M20 6v5h-5M4 18v-5h5"/><path d="M6.1 9a7 7 0 0 1 11.4-2.6L20 11M4 13l2.5 4.6A7 7 0 0 0 17.9 15"/>'
 ,droplet:'<path d="M12 2s6 6.5 6 12a6 6 0 0 1-12 0c0-5.5 6-12 6-12Z"/>'
 ,volume:'<path d="M11 5 6 9H2v6h4l5 4V5ZM15 9a4 4 0 0 1 0 6M18 6a8 8 0 0 1 0 12"/>'
 ,bolt:'<path d="m13 2-8 12h7l-1 8 8-12h-7l1-8Z"/>'
 ,search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>'
};
document.querySelectorAll('[data-icon]').forEach(el => { el.innerHTML=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="${el.classList.contains('icon-circle') ? '' : 'h-full w-full'}">${paths[el.dataset.icon] || paths.check}</svg>`; });

const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
class AirCounter extends HTMLElement {
 connectedCallback() {
  this.valueEl=this.querySelector('strong');
  this.target=Number(this.getAttribute('target')); this.decimals=Number(this.getAttribute('decimals')||0); this.suffix=this.getAttribute('suffix')||'';
  this.setAttribute('aria-label',`${this.format(this.target)} ${this.getAttribute('label')}`);
  this.valueEl.setAttribute('aria-hidden','true'); this.querySelector('span').setAttribute('aria-hidden','true');
  if(reducedMotion.matches || !('IntersectionObserver' in window))return;
  this.observer=new IntersectionObserver(entries=>{if(entries.some(e=>e.isIntersecting)){this.observer.disconnect();this.animateValue();}},{threshold:.3});
  this.observer.observe(this);
 }
 format(value){return value.toLocaleString('en-US',{minimumFractionDigits:this.decimals,maximumFractionDigits:this.decimals})+this.suffix;}
 animateValue(){let started;const tick=now=>{started??=now;const progress=Math.min((now-started)/1600,1);const eased=1-Math.pow(1-progress,3);const value=this.decimals?this.target*eased:Math.floor(this.target*eased);this.valueEl.textContent=this.format(value);if(progress<1)this.frame=requestAnimationFrame(tick);};this.valueEl.textContent=this.format(0);this.frame=requestAnimationFrame(tick);}
 disconnectedCallback(){this.observer?.disconnect();cancelAnimationFrame(this.frame);}
}
customElements.define('air-counter',AirCounter);
if(!reducedMotion.matches && 'IntersectionObserver' in window){
 document.documentElement.classList.add('motion-enabled');
 document.querySelectorAll('[data-heading]').forEach(el=>{if(!el.querySelector('.line')){const inner=el.innerHTML;el.innerHTML=`<span class="line"><span>${inner}</span></span>`;}});
 document.querySelectorAll('.service-item,.benefit').forEach((el,i)=>el.style.setProperty('--delay',`${i%6*70}ms`));
 const revealObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('revealed');revealObserver.unobserve(entry.target);}});},{threshold:.12});
 document.querySelectorAll('[data-reveal],[data-heading]').forEach(el=>revealObserver.observe(el));
}else{document.querySelectorAll('[data-reveal],[data-heading]').forEach(el=>el.classList.add('revealed'));}
const toggle=document.getElementById('menu-toggle'), menu=document.getElementById('mobile-nav');
function closeMenu(restoreFocus=false){menu.hidden=true;toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation');if(restoreFocus)toggle.focus();}
toggle.addEventListener('click',()=>{const isOpen=toggle.getAttribute('aria-expanded')==='true';menu.hidden=isOpen;toggle.setAttribute('aria-expanded',String(!isOpen));toggle.setAttribute('aria-label',isOpen?'Open navigation':'Close navigation');});
menu.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!menu.hidden)closeMenu(true);});
document.addEventListener('click',e=>{if(!menu.hidden&&!menu.contains(e.target)&&!toggle.contains(e.target))closeMenu();});
window.matchMedia('(min-width:1024px)').addEventListener('change',e=>{if(e.matches)closeMenu();});
