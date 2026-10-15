/* Coli — the Bogotá SEO guide (scripted assistant, no outside AI). Voice in/out via the browser. */
(function(){
  'use strict';
  var d=document, LANG=(d.documentElement.lang||'es').indexOf('en')===0?'en':'es';
  var WA='17202496588';
  var P=LANG==='es'?'':'/en';
  var U={ /* page URLs per language */
    es:{seo:'/posicionamiento-web-bogota/',local:'/seo-local-bogota/',gbp:'/perfil-de-empresa-en-google/',web:'/diseno-de-paginas-web-bogota/',shop:'/tiendas-virtuales/',ads:'/pauta-digital/',social:'/manejo-de-redes-sociales/',agents:'/agentes-de-ia-para-empresas/',wa:'/chatbot-para-whatsapp/',auto:'/automatizacion-de-procesos/',ai:'/posicionamiento-en-ia/',audit:'/auditoria-seo-gratis/',how:'/como-funciona/',steph:'/stephany/',tools:'/herramientas-gratis/',contact:'/contacto/',privacy:'/politica-de-privacidad/'},
    en:{seo:'/en/bogota-seo/',local:'/en/local-seo-bogota/',gbp:'/en/google-business-profile/',web:'/en/web-design-bogota/',shop:'/en/online-stores/',ads:'/en/google-and-facebook-ads/',social:'/en/social-media-management/',agents:'/en/ai-agents-for-business/',wa:'/en/whatsapp-chatbot/',auto:'/en/business-process-automation/',ai:'/en/ai-search-visibility/',audit:'/en/free-seo-audit/',how:'/en/how-it-works/',steph:'/en/stephany/',tools:'/en/free-tools/',contact:'/en/contact/',privacy:'/en/privacy-policy/'}
  }[LANG];

  var BIRD='<svg viewBox="0 0 64 64" aria-hidden="true"><path d="M21 39l-13 7 4-11z" fill="#3B6BE0"/><path d="M19 38c4-10 14-15 22-13 4 1 6 4 5 7-1 5-8 9-16 10-5 1-9 0-11-4z" fill="#1D3FA6"/><path d="M39 27.5c3.5-.5 6.5 1.5 7 4.5-2.5 2-5.5 2-8.5.6z" fill="#D2283C"/><circle cx="44" cy="25" r="6.2" fill="#1D3FA6"/><path d="M49.5 23.4L63 19.5l-12.6 6.7z" fill="#172033"/><circle cx="45.6" cy="23.8" r="1.8" fill="#fff"/><circle cx="46" cy="23.8" r=".9" fill="#172033"/><path class="wing" d="M29 32c-5-10-3-21 6-27 2.5 10 .5 19-6 27z" fill="#F6C21B"/></svg>';

  var S={
    es:{
      name:'Coli',role:'Asistente de Bogotá SEO',online:'En línea · Responde al instante',
      hint:'¿Le muestro cómo conseguir más clientes?',
      ph:'Escriba su pregunta…',send:'Enviar',mic:'Hablar',speak:'Leer en voz alta',close:'Cerrar',
      note:'Coli es un asistente automático. Para algo puntual, Stephany le atiende por WhatsApp.',
      hello:'¡Hola! Soy Coli, el colibrí de Bogotá SEO.\nAyudo a negocios con un producto o servicio buenísimo a que la gente los encuentre, se enamore de lo que hacen y les escriba. ¿Por dónde empezamos?',
      menu:['Que me encuentren en Google','Necesito una página web','Agentes de IA y WhatsApp','¿Cómo funciona?','¿Cuánto cuesta?','Hablar con Stephany'],
      found:'Que lo encuentren es el paso 1. Trabajamos tres frentes:\n• Su Perfil de Empresa en Google (lo que la gente aún llama "Google Mi Negocio") para salir en Maps.\n• Posicionamiento web (SEO) para que su página aparezca cuando buscan lo que usted vende.\n• Visibilidad en IA, para que ChatGPT o Gemini puedan recomendarlo.\nNo prometemos el primer puesto: nadie honesto puede. Sí hacemos el trabajo serio que Google premia.',
      foundL:[['Posicionamiento web',U.seo],['Google Maps y SEO local',U.local],['Perfil de Empresa',U.gbp]],
      web:'Cuando la gente llega, su página tiene que mostrar en segundos por qué su negocio es especial: su historia, sus fotos reales, lo que lo hace diferente y un botón de WhatsApp a la mano.\nHacemos desde páginas sencillas hasta tiendas virtuales y desarrollos a la medida, pensadas primero para el celular.',
      webL:[['Diseño de páginas web',U.web],['Tiendas virtuales',U.shop]],
      agents:'Los agentes de IA hacen el trabajo repetitivo para que usted tenga tiempo para vivir y para lo que de verdad importa:\n• Responden de inmediato por WhatsApp y le pasan los casos a una persona.\n• Organizan archivos, arman reportes y hacen seguimiento a cotizaciones.\n• Piden reseñas, recuerdan facturas y le mandan un resumen diario.\nTodo con control de calidad: usted aprueba antes de que algo importante salga.',
      agentsL:[['Agentes de IA',U.agents],['Chatbot para WhatsApp',U.wa],['Automatización',U.auto]],
      how:'Así funciona, en 4 pasos:\n1. Encontrado: aparece en Google, Maps y la IA.\n2. Impresiona: su página muestra lo que lo hace increíble.\n3. Convierte: la visita se vuelve un WhatsApp, una llamada o una cotización.\n4. Tiempo libre: los agentes de IA se encargan de lo repetitivo.\n¿Quiere que revisemos en qué paso está su negocio?',
      howL:[['Ver el recorrido completo',U.how]],
      price:'Depende de lo que su negocio necesite: cuántas páginas, si vende en línea, cuánta pauta, qué agentes. Por eso preferimos cotizar a la medida y sin compromiso.\nPara páginas a la medida también existe un programa de suscripción para ser dueño de su página.\nY a los clientes fieles a veces les regalamos marketing adicional como agradecimiento (no se inscriba esperando marketing gratis 😉).',
      steph:'Stephany nació en Colombia y creció en Bogotá. Hoy vive en Estados Unidos, pero su familia y su corazón siguen allá. Su meta es traer las herramientas de publicidad e IA más poderosas del mundo a su tierra.\nLe atiende en español por WhatsApp.',
      stephL:[['Conocer su historia',U.steph]],
      audit:'Con gusto. La auditoría SEO es gratis y sin compromiso: revisamos cómo aparece su negocio en Google, en Maps y en la IA, qué tan rápida es su página en el celular y si está convirtiendo visitas en mensajes.',
      auditL:[['Pedir auditoría gratis',U.audit]],
      tools:'Tenemos herramientas gratis: un diagnóstico de visibilidad, una calculadora de clientes perdidos por WhatsApp, un generador de mensajes para WhatsApp Business y un creador de enlaces de WhatsApp.',
      toolsL:[['Ir a las herramientas',U.tools]],
      social:'Manejamos redes sociales y pauta en Google, Facebook e Instagram, siempre conectadas a su WhatsApp y a su página para que los "me gusta" se vuelvan clientes.',
      socialL:[['Pauta digital',U.ads],['Redes sociales',U.social]],
      offer:'¿Quiere que Stephany y el equipo le preparen una propuesta gratis? Solo le tomo 4 datos.',
      yes:'Sí, quiero mi propuesta',no:'Ahora no',wa:'Escribir por WhatsApp',
      q:[['nombre','¿Cómo se llama usted?'],['negocio','¿Cómo se llama su negocio y a qué se dedica?'],['whatsapp','¿A qué número de WhatsApp o celular le escribimos? (con indicativo, ej. +57 300…)'],['necesidad','Último: ¿qué le gustaría lograr? (más clientes, página nueva, WhatsApp automático…)']],
      badphone:'Ese número se ve incompleto. ¿Me lo escribe de nuevo con el indicativo?',
      consent:'Al enviar, usted autoriza el tratamiento de sus datos según nuestra política de privacidad (Ley 1581 de 2012). ¿Lo envío?',
      sendit:'Sí, enviar',cancel:'Cancelar',
      sent:'¡Listo! Ya le llegó al equipo. Stephany o alguien del equipo le escribe por WhatsApp en cuanto pueda.\nSi prefiere adelantar, escríbanos ahora:',
      fail:'Uy, no pude enviarlo. Escríbanos directo por WhatsApp y le atendemos:',
      thanks:'¡Con mucho gusto! ¿Algo más en lo que le ayude?',
      unknown:'Esa no me la sé todavía, pero Stephany sí. Mientras tanto, esto le puede servir:',
      mainmenu:'Ver opciones',
      wamsg:'Hola Stephany, vengo de bogotaseo.com y quiero más información.',
      noMic:'Su navegador no permite dictar por voz. Puede escribir su pregunta.'
    },
    en:{
      name:'Coli',role:'Bogotá SEO assistant',online:'Online · Replies instantly',
      hint:'Want me to show you how to get more customers?',
      ph:'Type your question…',send:'Send',mic:'Speak',speak:'Read aloud',close:'Close',
      note:'Coli is an automated assistant. For anything specific, Stephany answers on WhatsApp.',
      hello:'Hi! I\'m Coli, the Bogotá SEO hummingbird.\nI help businesses with a great product or service get found, show people what makes them special, and turn visits into messages. Where should we start?',
      menu:['Get found on Google','I need a website','AI agents & WhatsApp','How does it work?','How much does it cost?','Talk to Stephany'],
      found:'Getting found is step 1. We work on three fronts:\n• Your Google Business Profile (still called "Google Mi Negocio" by many) so you show up on Maps.\n• Website SEO so your site appears when people search for what you sell.\n• AI visibility, so ChatGPT or Gemini can recommend you.\nWe never promise the #1 spot; no honest agency can. We do the serious work Google rewards.',
      foundL:[['Bogotá SEO',U.seo],['Google Maps & local SEO',U.local],['Business Profile',U.gbp]],
      web:'When people land, your site has to show in seconds why your business is special: your story, your real photos, what makes you different, and a WhatsApp button within reach.\nWe build everything from simple sites to online stores and custom builds, designed phone-first.',
      webL:[['Web design',U.web],['Online stores',U.shop]],
      agents:'AI agents handle the repetitive work so you have time to live and focus on what matters:\n• They reply instantly on WhatsApp and hand cases to a person.\n• They organize files, build reports and follow up on quotes.\n• They request reviews, send invoice reminders and email you a daily summary.\nAll with quality control: you approve before anything important goes out.',
      agentsL:[['AI agents',U.agents],['WhatsApp chatbot',U.wa],['Automation',U.auto]],
      how:'Here\'s how it works, in 4 steps:\n1. Found: you show up on Google, Maps and AI.\n2. Wow: your site shows what makes you amazing.\n3. Convert: the visit becomes a WhatsApp chat, a call or a quote request.\n4. Free time: AI agents handle the repetitive work.\nWant us to check which step your business is on?',
      howL:[['See the full journey',U.how]],
      price:'It depends on what your business needs: how many pages, whether you sell online, how much ad spend, which agents. That\'s why we quote custom and with no obligation.\nCustom websites can also go through a subscribe-to-own program.\nAnd loyal clients sometimes get bonus marketing as a thank-you (don\'t sign up expecting free marketing 😉).',
      steph:'Stephany was born in Colombia and grew up in Bogotá. She lives in the United States now, but her family and her heart are still there. Her goal is to bring the world\'s most powerful advertising and AI tools to her hometown.\nShe answers in Spanish and English on WhatsApp.',
      stephL:[['Read her story',U.steph]],
      audit:'Happy to. The SEO audit is free and comes with no obligation: we review how your business shows up on Google, Maps and AI, how fast your site loads on a phone, and whether visits are turning into messages.',
      auditL:[['Request a free audit',U.audit]],
      tools:'We have free tools: a visibility checkup, a lost-customers-on-WhatsApp calculator, a WhatsApp Business message generator and a WhatsApp link builder.',
      toolsL:[['Go to the tools',U.tools]],
      social:'We manage social media and ads on Google, Facebook and Instagram, always connected to your WhatsApp and website so likes turn into customers.',
      socialL:[['Google & Facebook ads',U.ads],['Social media',U.social]],
      offer:'Want Stephany and the team to prepare a free proposal? I just need 4 details.',
      yes:'Yes, I want my proposal',no:'Not now',wa:'Message on WhatsApp',
      q:[['nombre','What\'s your name?'],['negocio','What\'s your business called and what does it do?'],['whatsapp','Which WhatsApp or phone number should we message? (with country code, e.g. +57 300…)'],['necesidad','Last one: what would you like to achieve? (more customers, a new site, automated WhatsApp…)']],
      badphone:'That number looks incomplete. Could you type it again with the country code?',
      consent:'By sending, you authorize the processing of your data under our privacy policy (Colombian Law 1581 of 2012). Shall I send it?',
      sendit:'Yes, send',cancel:'Cancel',
      sent:'Done! The team has it. Stephany or someone on the team will message you on WhatsApp as soon as they can.\nIf you\'d like to get started now, message us:',
      fail:'Oops, I couldn\'t send that. Message us directly on WhatsApp:',
      thanks:'My pleasure! Anything else I can help with?',
      unknown:'I don\'t know that one yet, but Stephany does. Meanwhile, this might help:',
      mainmenu:'See options',
      wamsg:'Hi Stephany, I found you on bogotaseo.com and would like more information.',
      noMic:'Your browser doesn\'t support voice input. You can type your question.'
    }
  }[LANG];

  var waLink='https://wa.me/'+WA+'?text='+encodeURIComponent(S.wamsg);

  /* build UI */
  var tab=d.createElement('button');tab.id='coli-tab';tab.type='button';
  tab.setAttribute('aria-label',S.name+' — '+S.role);tab.setAttribute('aria-expanded','false');tab.setAttribute('aria-controls','coli');
  tab.innerHTML=BIRD+'<span class="dot"></span>';
  var hint=d.createElement('div');hint.id='coli-hint';hint.textContent=S.hint;
  var box=d.createElement('section');box.id='coli';box.setAttribute('aria-label',S.name);box.setAttribute('role','dialog');
  box.innerHTML='<div class="coli__head">'+BIRD+'<div><b>'+S.name+' · '+S.role+'</b><small><i></i>'+S.online+'</small></div><div class="coli__tools">'+
    '<button type="button" class="spk" aria-pressed="false" title="'+S.speak+'" aria-label="'+S.speak+'"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16 8.5a5 5 0 010 7M18.5 6a8.5 8.5 0 010 12"/></svg></button>'+
    '<button type="button" class="x" aria-label="'+S.close+'">×</button></div></div>'+
    '<div class="coli__prog" aria-hidden="true"><i></i></div><div class="coli__msgs" aria-live="polite"></div>'+
    '<form class="coli__foot"><label class="vh" for="coli-in">'+S.ph+'</label><input id="coli-in" type="text" autocomplete="off" maxlength="300" placeholder="'+S.ph+'">'+
    '<button type="button" class="mic" aria-label="'+S.mic+'" title="'+S.mic+'"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0014 0M12 18v3"/></svg></button>'+
    '<button type="submit" aria-label="'+S.send+'"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 20.5l18-8.5L3 3.5l2.5 7L15 12l-9.5 1.5z"/></svg></button></form>'+
    '<div class="coli__note">'+S.note+'</div>';
  d.body.appendChild(hint);d.body.appendChild(box);d.body.appendChild(tab);

  var msgs=box.querySelector('.coli__msgs'), inp=box.querySelector('#coli-in'), prog=box.querySelector('.coli__prog i');
  var spkBtn=box.querySelector('.spk'), micBtn=box.querySelector('.mic');
  var st={open:false,started:false,cap:-1,lead:{},speak:false};

  function scroll(){msgs.scrollTop=msgs.scrollHeight;}
  function esc(t){return String(t).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c];});}
  function add(text,who){var m=d.createElement('div');m.className='m m--'+who;m.textContent=text;msgs.appendChild(m);scroll();return m;}
  function say(text,delay){
    return new Promise(function(res){
      var t=d.createElement('div');t.className='typing';t.innerHTML='<span></span><span></span><span></span>';msgs.appendChild(t);scroll();
      setTimeout(function(){t.remove();add(text,'bot');speakOut(text);res();},delay||Math.min(500+text.length*6,1500));
    });
  }
  function chips(list){
    var c=d.createElement('div');c.className='chips';
    list.forEach(function(it){
      var el;
      if(it.href){el=d.createElement('a');el.href=it.href;el.textContent=it.t;if(it.wa){el.className='wa';el.target='_blank';el.rel='noopener';}}
      else{el=d.createElement('button');el.type='button';el.textContent=it.t;el.addEventListener('click',function(){c.remove();add(it.t,'me');it.fn();});}
      c.appendChild(el);
    });
    msgs.appendChild(c);scroll();
  }
  function links(arr){return arr.map(function(a){return{t:a[0]+' →',href:a[1]};});}
  function menu(){chips(S.menu.map(function(t,i){return{t:t,fn:[found,web,agents,how,price,steph][i]};}));}
  function after(arr){chips(links(arr||[]).concat([{t:S.yes,fn:startCap},{t:S.mainmenu,fn:function(){menu();}}]));}
  function topic(key){return function(){say(S[key]).then(function(){after(S[key+'L']);});};}
  var found=topic('found'),web=topic('web'),agents=topic('agents'),how=topic('how'),steph=function(){say(S.steph).then(function(){chips(links(S.stephL).concat([{t:S.wa,href:waLink,wa:true},{t:S.mainmenu,fn:menu}]));});};
  function price(){say(S.price).then(function(){say(S.offer,700).then(function(){chips([{t:S.yes,fn:startCap},{t:S.wa,href:waLink,wa:true},{t:S.no,fn:menu}]);});});}

  /* lead capture */
  function setProg(){var n=st.cap<0?0:st.cap;prog.style.width=(st.cap<0?0:Math.round(n/S.q.length*100))+'%';}
  function startCap(){st.cap=0;st.lead={};setProg();say(S.q[0][1]);}
  function capture(v){
    var k=S.q[st.cap][0];
    if(k==='whatsapp'&&v.replace(/\D/g,'').length<7){say(S.badphone);return;}
    st.lead[k]=v.slice(0,300);st.cap++;setProg();
    if(st.cap<S.q.length){say(S.q[st.cap][1]);return;}
    st.cap=-2;
    say(S.consent).then(function(){chips([{t:S.sendit,fn:submitLead},{t:S.cancel,fn:function(){st.cap=-1;setProg();menu();}}]);});
  }
  function submitLead(){
    st.cap=-1;
    var data={nombre:st.lead.nombre,negocio:st.lead.negocio,whatsapp:st.lead.whatsapp,mensaje:st.lead.necesidad,origen:'Chat Coli',pagina:location.href,idioma:LANG,
      _subject:(LANG==='es'?'Nuevo lead (Coli) bogotaseo.com — ':'New lead (Coli EN) bogotaseo.com — ')+(st.lead.negocio||''),_template:'table',_captcha:'false'};
    var ep='https://formsubmit.co/ajax/'+atob('aW5mbw==')+'@'+atob('ZXlldG9hZC5jb20=');
    fetch(ep,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify(data)})
      .then(function(r){if(!r.ok)throw 0;prog.style.width='100%';return say(S.sent);})
      .then(function(){chips([{t:S.wa,href:waLink,wa:true},{t:S.mainmenu,fn:menu}]);})
      .catch(function(){say(S.fail).then(function(){chips([{t:S.wa,href:waLink,wa:true}]);});});
  }

  /* free text routing */
  var R=[
    [/precio|cu[aá]nto|costo|cuesta|vale|tarifa|price|cost|how much/i,price],
    [/stephany|humano|persona|asesor|human|person|someone/i,steph],
    [/agente|ia\b|inteligencia|automat|bot|chatbot|whatsapp|ai\b|agent|robot/i,agents],
    [/p[aá]gina|web|sitio|tienda|ecommerce|shopify|wordpress|website|store/i,web],
    [/auditor|revis|diagn[oó]stico|audit|check/i,function(){say(S.audit).then(function(){after(S.auditL);});}],
    [/herramienta|calculadora|tool|calculator/i,function(){say(S.tools).then(function(){after(S.toolsL);});}],
    [/pauta|anuncio|ads|facebook|instagram|redes|social|tiktok|publicidad|advert/i,function(){say(S.social).then(function(){after(S.socialL);});}],
    [/google|seo|maps|mapa|posicion|buscador|encontr|aparecer|rank|found|search/i,found],
    [/c[oó]mo funciona|proceso|pasos|how|work|process|steps/i,how],
    [/gracias|thank|chévere|excelente|great/i,function(){say(S.thanks).then(menu);}],
    [/hola|buenas|buenos|hello|hi\b|hey/i,function(){say(S.hello).then(menu);}]
  ];
  function route(v){
    if(st.cap>=0){capture(v);return;}
    for(var i=0;i<R.length;i++){if(R[i][0].test(v)){R[i][1]();return;}}
    say(S.unknown).then(function(){chips([{t:S.wa,href:waLink,wa:true}].concat(links(S.howL)).concat([{t:S.mainmenu,fn:menu}]));});
  }
  box.querySelector('form').addEventListener('submit',function(e){
    e.preventDefault();var v=inp.value.trim();if(!v)return;inp.value='';add(v,'me');route(v);
  });

  /* voice out */
  function pickVoice(){
    if(!('speechSynthesis' in window))return null;
    var vs=speechSynthesis.getVoices(),want=LANG==='es'?['es-CO','es-US','es-MX','es-419','es']:['en-US','en'];
    for(var i=0;i<want.length;i++){for(var j=0;j<vs.length;j++){if(vs[j].lang&&vs[j].lang.replace('_','-').indexOf(want[i])===0)return vs[j];}}
    return null;
  }
  function speakOut(t){
    if(!st.speak||!('speechSynthesis' in window))return;
    try{speechSynthesis.cancel();var u=new SpeechSynthesisUtterance(t.replace(/[•→😉]/g,''));var v=pickVoice();if(v)u.voice=v;u.lang=v?v.lang:(LANG==='es'?'es-CO':'en-US');u.rate=1.02;speechSynthesis.speak(u);}catch(e){}
  }
  spkBtn.addEventListener('click',function(){st.speak=!st.speak;spkBtn.setAttribute('aria-pressed',st.speak?'true':'false');if(!st.speak&&'speechSynthesis' in window)speechSynthesis.cancel();});

  /* voice in */
  var SR=window.SpeechRecognition||window.webkitSpeechRecognition, rec=null;
  micBtn.addEventListener('click',function(){
    if(!SR){say(S.noMic);return;}
    if(rec){try{rec.stop();}catch(e){}return;}
    rec=new SR();rec.lang=LANG==='es'?'es-CO':'en-US';rec.interimResults=false;rec.maxAlternatives=1;
    micBtn.classList.add('rec');
    rec.onresult=function(e){var t=e.results[0][0].transcript;inp.value='';add(t,'me');route(t);};
    rec.onend=function(){micBtn.classList.remove('rec');rec=null;};
    rec.onerror=function(){micBtn.classList.remove('rec');rec=null;};
    try{rec.start();}catch(e){micBtn.classList.remove('rec');rec=null;}
  });

  /* open/close */
  function open(){
    st.open=true;box.classList.add('open');tab.setAttribute('aria-expanded','true');hint.classList.remove('on');tab.querySelector('.dot').classList.remove('on');
    if(!st.started){st.started=true;say(S.hello,700).then(menu);}
    setTimeout(function(){inp.focus({preventScroll:true});},250);
  }
  function close(){st.open=false;box.classList.remove('open');tab.setAttribute('aria-expanded','false');if('speechSynthesis' in window)speechSynthesis.cancel();tab.focus();}
  tab.addEventListener('click',function(){st.open?close():open();});
  box.querySelector('.x').addEventListener('click',close);
  d.addEventListener('keydown',function(e){if(e.key==='Escape'&&st.open)close();});
  d.querySelectorAll('[data-open-coli]').forEach(function(b){b.addEventListener('click',function(e){e.preventDefault();open();});});

  /* gentle nudge after 14s, once per session */
  try{if(!sessionStorage.getItem('coli_hint')){setTimeout(function(){if(!st.open){hint.classList.add('on');tab.querySelector('.dot').classList.add('on');sessionStorage.setItem('coli_hint','1');setTimeout(function(){hint.classList.remove('on');},9000);}},14000);}}catch(e){}
  hint.addEventListener('click',open);
})();
