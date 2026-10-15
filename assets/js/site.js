/* Bogotá SEO — site behavior */
(function(){
  'use strict';
  var d=document, h=d.documentElement;
  h.classList.remove('no-js');
  var LANG=h.lang && h.lang.indexOf('en')===0 ? 'en' : 'es';

  /* mobile drawer */
  var drawer=d.getElementById('drawer'), burger=d.querySelector('.burger');
  function setDrawer(open){
    if(!drawer)return;
    drawer.classList.toggle('open',open);
    if(burger)burger.setAttribute('aria-expanded',open?'true':'false');
    d.body.style.overflow=open?'hidden':'';
    if(open){var c=drawer.querySelector('.drawer__close');if(c)c.focus();}
  }
  if(burger)burger.addEventListener('click',function(){setDrawer(true);});
  if(drawer){
    drawer.addEventListener('click',function(e){
      if(e.target.closest('.drawer__close')||e.target.classList.contains('drawer__bg'))setDrawer(false);
      if(e.target.closest('a'))setDrawer(false);
    });
  }
  d.addEventListener('keydown',function(e){if(e.key==='Escape'){setDrawer(false);closeDrops();}});

  /* desktop dropdowns (click + keyboard) */
  function closeDrops(except){
    d.querySelectorAll('.nav li.open').forEach(function(li){if(li!==except){li.classList.remove('open');var b=li.querySelector('.nav__btn');if(b)b.setAttribute('aria-expanded','false');}});
  }
  d.querySelectorAll('.nav__btn').forEach(function(b){
    b.addEventListener('click',function(e){
      e.stopPropagation();
      var li=b.parentElement, open=!li.classList.contains('open');
      closeDrops(li);li.classList.toggle('open',open);b.setAttribute('aria-expanded',open?'true':'false');
    });
  });
  d.addEventListener('click',function(e){if(!e.target.closest('.nav'))closeDrops();});

  /* remember language choice (no auto-redirect) */
  d.querySelectorAll('.lang a,[data-setlang]').forEach(function(a){
    a.addEventListener('click',function(){try{localStorage.setItem('bs_lang',a.getAttribute('hreflang')||a.dataset.setlang||'');}catch(e){}});
  });

  /* reveal on scroll */
  var els=d.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(en){en.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target);}});},{rootMargin:'0px 0px -8% 0px'});
    els.forEach(function(el){io.observe(el);});
  } else els.forEach(function(el){el.classList.add('in');});

  /* auto-tag cards/sections for reveal */
  d.querySelectorAll('main .card, main .steps>li, main .stat, main .fig, main .journey__step').forEach(function(el,i){
    if(el.classList.contains('reveal'))return;
    el.classList.add('reveal');
    el.style.transitionDelay=Math.min((i%4)*70,210)+'ms';
    if(io)io.observe(el); else el.classList.add('in');
  });

  /* year */
  d.querySelectorAll('[data-year]').forEach(function(el){el.textContent=new Date().getFullYear();});

  /* ---------- Forms → FormSubmit (address assembled in the browser) ---------- */
  function endpoint(){
    var u=atob('aW5mbw=='), dm=atob('ZXlldG9hZC5jb20=');
    return 'https://formsubmit.co/ajax/'+u+'@'+dm;
  }
  var T={
    es:{sending:'Enviando…',err:'No pudimos enviar. Intente de nuevo o escríbanos por WhatsApp.',phone:'Revise el número de celular o WhatsApp.',consent:'Por favor acepte el tratamiento de datos.',need:'Complete los campos obligatorios.'},
    en:{sending:'Sending…',err:'We could not send that. Please try again or message us on WhatsApp.',phone:'Please check the phone or WhatsApp number.',consent:'Please accept the data policy.',need:'Please complete the required fields.'}
  }[LANG];
  var loadT=Date.now();
  d.querySelectorAll('form.js-lead').forEach(function(f){
    f.addEventListener('submit',function(e){
      e.preventDefault();
      var msg=f.querySelector('.form__msg'), btn=f.querySelector('button[type=submit]');
      function say(t,c){if(msg){msg.textContent=t;msg.className='form__msg '+(c||'');}}
      // honeypots + time trap: bots get a silent fake success
      var hp1=f.querySelector('[name=_honey]'), hp2=f.querySelector('[name=website_url]');
      if((hp1&&hp1.value)||(hp2&&hp2.value)||Date.now()-loadT<3000){f.reset();say(LANG==='es'?'¡Gracias!':'Thank you!','ok');return;}
      var ok=true,first=null;
      f.querySelectorAll('[required]').forEach(function(i){if(i.type!=='checkbox'&&!i.value.trim()){ok=false;first=first||i;}});
      if(!ok){say(T.need,'err');first.focus();return;}
      var cb=f.querySelector('input[type=checkbox][required]');
      if(cb&&!cb.checked){say(T.consent,'err');cb.focus();return;}
      var ph=f.querySelector('[name=whatsapp]');
      if(ph&&ph.value.replace(/\D/g,'').length<7){say(T.phone,'err');ph.focus();return;}
      var txt=(f.querySelector('[name=mensaje]')||{}).value||'';
      if(/(viagra|casino|crypto airdrop|seo backlinks cheap|bit\.ly|porn)/i.test(txt)){f.reset();say(LANG==='es'?'¡Gracias!':'Thank you!','ok');return;}
      var data={};
      new FormData(f).forEach(function(v,k){if(k!=='website_url')data[k]=v;});
      data._subject=(LANG==='es'?'Nuevo contacto bogotaseo.com — ':'New lead bogotaseo.com (EN) — ')+(data.negocio||data.nombre||'');
      data._template='table';data._captcha='false';data.pagina=location.href;data.idioma=LANG;
      if(btn){btn.disabled=true;btn.dataset.t=btn.textContent;btn.textContent=T.sending;}
      fetch(endpoint(),{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(data)})
        .then(function(r){if(!r.ok)throw 0;location.href=f.dataset.thanks||(LANG==='es'?'/gracias/':'/en/thank-you/');})
        .catch(function(){say(T.err,'err');if(btn){btn.disabled=false;btn.textContent=btn.dataset.t;}});
    });
  });
})();
