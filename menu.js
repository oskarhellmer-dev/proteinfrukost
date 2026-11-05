/* Proteinfrukost.se — meny, scroll-avslöjande, aktiv sida, hoppa-till-innehåll */

/* --- Meny (mobil) --- */
document.addEventListener('click',function(e){
  var btn=e.target.closest('.menu-btn');
  var ul=document.querySelector('.nav ul');
  if(!ul)return;
  if(btn){e.preventDefault();ul.classList.toggle('open');return;}
  if(ul.classList.contains('open') && !e.target.closest('.nav')){ul.classList.remove('open');}
});
window.addEventListener('resize',function(){var ul=document.querySelector('.nav ul');if(ul&&window.innerWidth>820)ul.classList.remove('open');});

/* --- Förbättringar som kräver JS (progressiv förbättring) --- */
(function(){
  function ready(fn){
    if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',fn);
    else fn();
  }

  ready(function(){
    /* Hoppa till innehåll */
    var main=document.querySelector('main');
    if(main && !document.querySelector('.skip-link')){
      if(!main.id)main.id='main';
      var a=document.createElement('a');
      a.className='skip-link';a.href='#'+main.id;a.textContent='Hoppa till innehållet';
      document.body.insertBefore(a,document.body.firstChild);
    }

    /* Aktiv sida i menyn */
    var path=location.pathname.replace(/\/$/,'')||'/';
    document.querySelectorAll('.nav ul a').forEach(function(l){
      var href=l.getAttribute('href');
      if(!href)return;
      var h=href.replace(/\/$/,'')||'/';
      if(h!=='/' && (path===h || path.indexOf(h+'/')===0))l.classList.add('active');
    });

    /* Scroll-avslöjande */
    var reduce=window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var targets=document.querySelectorAll('main section, main .card, main .cat, main .facts');
    if(reduce || !('IntersectionObserver' in window)){
      return;
    }
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(en){
        if(en.isIntersecting){en.target.classList.add('in');io.unobserve(en.target);}
      });
    },{rootMargin:'0px 0px -8% 0px',threshold:.06});
    targets.forEach(function(el,i){
      el.classList.add('reveal');
      el.style.transitionDelay=Math.min(i%6*60,300)+'ms';
      io.observe(el);
    });
  });
})();

/* Nyhetsbrev – levererar ALLTID till proteinfrukost.se:s EGEN adress.
   Först: FormSubmit (tyst, om det funkar). Annars: färdigifyllt mail i besökarens
   mailprogram till hej@proteinfrukost.se. Ingen annan domän, aldrig. */
(function(){
  var ADDR='hej@proteinfrukost.se';
  var FS='https://formsubmit.co/ajax/'+ADDR;
  function wire(f){
    if(f.__nl)return; f.__nl=1;
    f.addEventListener('submit',function(e){
      e.preventDefault();
      var msg=f.querySelector('.nl-msg');
      var input=f.querySelector('input[type=email]');
      var val=input&&input.value.trim();
      if(!val||val.indexOf('@')<1){if(msg)msg.textContent='Fyll i en giltig e-post.';return;}
      if(msg)msg.textContent='Skickar…';
      function fallback(){
        var subject=encodeURIComponent('Prenumerera på proteinfrukost.se');
        var body=encodeURIComponent('Hej! Jag vill prenumerera på nyhetsbrevet från proteinfrukost.se. Min e-post: '+val);
        if(msg)msg.innerHTML='Kunde inte anmäla automatiskt just nu. <a href="mailto:'+ADDR+'?subject='+subject+'&body='+body+'" style="color:#3f6b4f;text-decoration:underline">Maila oss i stället</a>.';
      }
      fetch(FS,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},
        body:JSON.stringify({email:val,_subject:'Ny prenumerant på proteinfrukost.se',_captcha:'false',_template:'table',_honey:''})})
        .then(function(r){return r.json().then(function(j){return {ok:r.ok,j:j};}).catch(function(){return {ok:r.ok,j:{}};});})
        .then(function(res){
          if(res.ok&&res.j&&res.j.success!=='false'){
            if(msg)msg.innerHTML='Tack! Du är anmäld. <a href="/gratis/7-dagars-proteinfrukost.pdf" style="color:#3f6b4f;text-decoration:underline;font-weight:600">Ladda ner din 7-dagarsmeny (PDF)</a>';
            f.reset();
          }
          else{fallback();}
        })
        .catch(fallback);
    });
  }
  function init(){document.querySelectorAll('form[data-nl]').forEach(wire);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
