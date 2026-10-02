document.addEventListener('click',function(e){
  var btn=e.target.closest('.menu-btn');
  var ul=document.querySelector('.nav ul');
  if(!ul)return;
  if(btn){e.preventDefault();ul.classList.toggle('open');return;}
  if(ul.classList.contains('open') && !e.target.closest('.nav')){ul.classList.remove('open');}
});
window.addEventListener('resize',function(){var ul=document.querySelector('.nav ul');if(ul&&window.innerWidth>820)ul.classList.remove('open');});

/* Nyhetsbrev – skickar till Web3Forms (mejlas till hej@varmlandswebb.se) */
(function(){
  var KEY='da1ca2de-ac12-4ec6-947b-23c62924ce1c';
  function wire(f){
    if(f.__nl)return; f.__nl=1;
    f.addEventListener('submit',function(e){
      e.preventDefault();
      var msg=f.querySelector('.nl-msg');
      var btn=f.querySelector('button');
      var input=f.querySelector('input[type=email]');
      if(!input||!input.value){if(msg)msg.textContent='Fyll i din e-post.';return;}
      if(btn)btn.disabled=true;
      if(msg)msg.textContent='Skickar…';
      var fd=new FormData();
      fd.append('access_key',KEY);
      fd.append('subject','Ny prenumerant – proteinfrukost.se');
      fd.append('from_name','Proteinfrukost.se');
      fd.append('email',input.value);
      fetch('https://api.web3forms.com/submit',{method:'POST',body:fd,headers:{'Accept':'application/json'}})
        .then(function(r){return r.json();})
        .then(function(d){
          if(d&&d.success){f.reset();if(msg)msg.textContent='Tack! Du är nu prenumerant.';}
          else{if(msg)msg.textContent='Något gick fel, försök igen.';if(btn)btn.disabled=false;}
        })
        .catch(function(){if(msg)msg.textContent='Något gick fel, försök igen.';if(btn)btn.disabled=false;});
    });
  }
  function init(){document.querySelectorAll('form[data-nl]').forEach(wire);}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
