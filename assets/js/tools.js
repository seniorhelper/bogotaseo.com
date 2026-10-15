/* Bogotá SEO — free tools (all run in the browser; nothing is sent anywhere) */
(function(){
  'use strict';
  var d=document, LANG=(d.documentElement.lang||'es').indexOf('en')===0?'en':'es';
  var L=LANG==='es';
  function $(s,c){return (c||d).querySelector(s);}
  function fmt(n){try{return new Intl.NumberFormat(L?'es-CO':'en-US',{maximumFractionDigits:0}).format(Math.round(n));}catch(e){return String(Math.round(n));}}
  function copyBtn(btn,getText){
    btn.addEventListener('click',function(){
      var t=getText();var done=function(){var o=btn.textContent;btn.textContent=L?'¡Copiado!':'Copied!';setTimeout(function(){btn.textContent=o;},1600);};
      if(navigator.clipboard&&navigator.clipboard.writeText){navigator.clipboard.writeText(t).then(done,function(){fallback(t);done();});}else{fallback(t);done();}
    });
  }
  function fallback(t){var ta=d.createElement('textarea');ta.value=t;ta.style.position='fixed';ta.style.opacity='0';d.body.appendChild(ta);ta.select();try{d.execCommand('copy');}catch(e){}ta.remove();}

  /* 1. Visibility checkup */
  var quiz=$('#t-quiz');
  if(quiz){
    var ans={};
    quiz.querySelectorAll('li').forEach(function(li,i){
      li.querySelectorAll('button').forEach(function(b){
        b.addEventListener('click',function(){
          li.querySelectorAll('button').forEach(function(x){x.setAttribute('aria-pressed','false');});
          b.setAttribute('aria-pressed','true');ans[i]=b.classList.contains('y');
        });
      });
    });
    $('#t-quiz-go').addEventListener('click',function(){
      var items=quiz.querySelectorAll('li'),n=items.length,yes=0,miss=[];
      items.forEach(function(li,i){if(ans[i])yes++;else miss.push(li);});
      var pct=Math.round(yes/n*100),res=$('#t-quiz-res');
      $('#t-quiz-score').textContent=pct+'%';
      res.querySelector('.meter i').style.width=pct+'%';
      var msg;
      if(pct>=80)msg=L?'¡Muy bien! Su base está sólida. El siguiente paso suele ser contenido, reseñas constantes y agentes de IA que le ahorren tiempo.':'Great! Your foundation is solid. The next step is usually content, steady reviews and AI agents that save you time.';
      else if(pct>=50)msg=L?'Va por buen camino, pero está dejando clientes sobre la mesa. Empiece por los puntos que respondió con "No".':'You\'re on the right track, but you\'re leaving customers on the table. Start with the items you answered "No".';
      else msg=L?'Hay mucho por ganar. La buena noticia: casi todo esto se arregla en pocas semanas. Empiece por su Perfil de Empresa en Google y un botón de WhatsApp.':'There\'s a lot to gain. The good news: most of this can be fixed in a few weeks. Start with your Google Business Profile and a WhatsApp button.';
      $('#t-quiz-msg').textContent=msg;
      var ul=$('#t-quiz-todo');ul.innerHTML='';
      miss.slice(0,6).forEach(function(li){var a=li.dataset.link,txt=li.dataset.fix;var x=d.createElement('li');x.innerHTML='<a href="'+a+'">'+txt+'</a>';ul.appendChild(x);});
      res.classList.add('show');res.scrollIntoView({behavior:'smooth',block:'nearest'});
    });
  }

  /* 2. Lost customers on WhatsApp calculator */
  var calc=$('#t-calc');
  if(calc){
    function run(){
      var msgs=+$('#c-msgs').value||0, late=(+$('#c-late').value||0)/100, close=(+$('#c-close').value||0)/100, ticket=+$('#c-ticket').value||0;
      var lostWeek=msgs*late*close, lostMonth=lostWeek*4.33, money=lostMonth*ticket;
      $('#c-out-n').textContent=fmt(lostMonth);
      $('#c-out-m').textContent='$ '+fmt(money)+(L?' COP':'');
      $('#t-calc-res').classList.add('show');
    }
    calc.addEventListener('input',run);run();
  }

  /* 3. WhatsApp Business message generator */
  var gen=$('#t-gen');
  if(gen){
    function build(){
      var name=$('#g-name').value.trim()||(L?'su negocio':'your business'),
          hours=$('#g-hours').value.trim()||(L?'lunes a sábado de 8 a. m. a 6 p. m.':'Monday to Saturday, 8 a.m. to 6 p.m.'),
          what=$('#g-what').value.trim()||(L?'nuestros productos y servicios':'our products and services'),
          extra=$('#g-extra').value.trim();
      var out=L?
        '👋 MENSAJE DE BIENVENIDA\n¡Hola! Gracias por escribir a '+name+'. Con gusto le ayudamos con '+what+'. Cuéntenos qué necesita y le respondemos lo antes posible.'+(extra?' '+extra:'')+
        '\n\n🌙 MENSAJE DE AUSENCIA\nHola, gracias por escribir a '+name+'. En este momento estamos fuera de horario (atendemos '+hours+'). Déjenos su mensaje y le respondemos apenas abramos.'+
        '\n\n⚡ RESPUESTA RÁPIDA /precios\nCon gusto le enviamos la cotización. Para darle el precio exacto, cuéntenos: ¿qué producto o servicio le interesa, para cuándo lo necesita y en qué barrio o ciudad está?'+
        '\n\n⚡ RESPUESTA RÁPIDA /ubicacion\nEstamos en [dirección]. Aquí puede ver cómo llegar: [enlace de Google Maps]. Atendemos '+hours+'.'+
        '\n\n⭐ RESPUESTA RÁPIDA /resena\n¡Gracias por confiar en '+name+'! Si quedó contento, nos ayudaría muchísimo con una reseña en Google: [enlace de reseñas]. ¡Mil gracias!'
        :
        '👋 GREETING MESSAGE\nHi! Thanks for messaging '+name+'. We\'re happy to help with '+what+'. Tell us what you need and we\'ll reply as soon as we can.'+(extra?' '+extra:'')+
        '\n\n🌙 AWAY MESSAGE\nHi, thanks for messaging '+name+'. We\'re outside business hours right now (we\'re open '+hours+'). Leave us a message and we\'ll reply as soon as we open.'+
        '\n\n⚡ QUICK REPLY /prices\nHappy to send you a quote. To give you an exact price, tell us: which product or service interests you, when you need it, and which neighborhood or city you\'re in?'+
        '\n\n⚡ QUICK REPLY /location\nWe\'re at [address]. Here\'s how to get here: [Google Maps link]. We\'re open '+hours+'.'+
        '\n\n⭐ QUICK REPLY /review\nThank you for choosing '+name+'! If you were happy, a Google review would help us a lot: [review link]. Thank you so much!';
      $('#g-out').textContent=out;
    }
    gen.addEventListener('input',build);build();
    copyBtn($('#g-copy'),function(){return $('#g-out').textContent;});
  }

  /* 4. WhatsApp link builder */
  var lk=$('#t-link');
  if(lk){
    function mk(){
      var cc=($('#l-cc').value||'57').replace(/\D/g,''), num=($('#l-num').value||'').replace(/\D/g,''), txt=$('#l-txt').value.trim();
      if(num.indexOf(cc)===0&&num.length>10)num=num.slice(cc.length);
      var url=num?'https://wa.me/'+cc+num+(txt?'?text='+encodeURIComponent(txt):''):'';
      $('#l-out').textContent=url||(L?'Escriba su número para crear el enlace.':'Type your number to build the link.');
      var t=$('#l-test');if(url){t.href=url;t.removeAttribute('aria-disabled');}else{t.removeAttribute('href');t.setAttribute('aria-disabled','true');}
    }
    lk.addEventListener('input',mk);mk();
    copyBtn($('#l-copy'),function(){return $('#l-out').textContent;});
  }
})();
