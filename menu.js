document.addEventListener('click',function(e){
  var btn=e.target.closest('.menu-btn');
  var ul=document.querySelector('.nav ul');
  if(!ul)return;
  if(btn){e.preventDefault();ul.classList.toggle('open');return;}
  if(ul.classList.contains('open') && !e.target.closest('.nav')){ul.classList.remove('open');}
});
window.addEventListener('resize',function(){var ul=document.querySelector('.nav ul');if(ul&&window.innerWidth>820)ul.classList.remove('open');});

/* Nyhetsbrev – öppnar ett färdigifyllt mail till hej@proteinfrukost.se.
   Ingen tredjepart, inget konto, fungerar alltid. */
(function(){
  var ADDR='hej@proteinfrukost.se';
  function wire(f){
    if(f.__nl)return; f.__nl=1;
    f.addEventListener('submit',function(e){
      e.preventDefault();
      var msg=f.querySelector('.nl-msg');
      var input=f.querySelector('input[type=email]');
      var val=input&&input.value.trim();
      if(!val || val.indexOf('@')<1){if(msg)msg.textContent='Fyll i en giltig e-post.';return;}
      var subject='Prenumerera på proteinfrukost.se';
      var body='Hej! Jag vill prenumerera på nyhetsbrevet från proteinfrukost.se.%0D%0A%0D%0AMin e-post: '+encodeURIComponent(val)+'%0D%0A%0D%0A(Om du klickar Prenumerera: tack!)';
      if(msg)msg.textContent='Öppnar ditt mailprogram — tryck bara “skicka”.';
      window.location.href='mailto:'+ADDR+'?subject='+encodeURIComponent(subject)+'&body='+body;
    });
  }
  function init(){document.querySelectorAll('form[data-nl]').forEach(wire);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
