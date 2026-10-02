document.addEventListener('click',function(e){
  var btn=e.target.closest('.menu-btn');
  var ul=document.querySelector('.nav ul');
  if(!ul)return;
  if(btn){e.preventDefault();ul.classList.toggle('open');return;}
  if(ul.classList.contains('open') && !e.target.closest('.nav')){ul.classList.remove('open');}
});
window.addEventListener('resize',function(){var ul=document.querySelector('.nav ul');if(ul&&window.innerWidth>820)ul.classList.remove('open');});

/* Nyhetsbrev – skickas via FormSubmit (https://formsubmit.co), ingen registrering krävs.
   OBS: mottagaren får ett AKTIVERINGSMAIL vid första inskick — klicka länken en gång,
   sedan levereras alla prenumeranter dit.
   BYT NL_RECIPIENT till 'hej@proteinfrukost.se' när Loopia-inkorgen kan ta emot. */
(function(){
  var NL_RECIPIENT='hej@varmlandswebb.se';
  var ENDPOINT='https://formsubmit.co/ajax/'+NL_RECIPIENT;
  function wire(f){
    if(f.__nl)return; f.__nl=1;
    f.addEventListener('submit',function(e){
      e.preventDefault();
      var msg=f.querySelector('.nl-msg');
      var input=f.querySelector('input[type=email]');
      var val=input&&input.value.trim();
      if(!val||val.indexOf('@')<1){if(msg)msg.textContent='Fyll i en giltig e-post.';return;}
      if(msg)msg.textContent='Skickar…';
      fetch(ENDPOINT,{
        method:'POST',
        headers:{'Content-Type':'application/json','Accept':'application/json'},
        body:JSON.stringify({email:val,_subject:'Ny prenumerant på proteinfrukost.se',_template:'table',_captcha:'false'})
      }).then(function(r){return r.json().then(function(j){return {ok:r.ok,j:j};}).catch(function(){return {ok:r.ok,j:{}};});})
        .then(function(res){
          if(!(res.ok&&res.j&&res.j.success==='false')){if(msg)msg.textContent='Tack! Du är anmäld.';f.reset();}
          else {if(msg)msg.textContent='Nästan klart — bekräfta i mailet vi skickat.';f.reset();}
        })
        .catch(function(){if(msg)msg.textContent='Något gick fel — försök igen om en stund.';});
    });
  }
  function init(){document.querySelectorAll('form[data-nl]').forEach(wire);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
