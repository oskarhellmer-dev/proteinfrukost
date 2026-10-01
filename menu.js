document.addEventListener('click',function(e){
  var btn=e.target.closest('.menu-btn');
  var ul=document.querySelector('.nav ul');
  if(!ul)return;
  if(btn){e.preventDefault();ul.classList.toggle('open');return;}
  if(ul.classList.contains('open') && !e.target.closest('.nav')){ul.classList.remove('open');}
});
window.addEventListener('resize',function(){var ul=document.querySelector('.nav ul');if(ul&&window.innerWidth>820)ul.classList.remove('open');});
