(function(){
  // Scroll progress bar
  var pb=document.querySelector('.scroll-progress');
  var hp=document.querySelector('.hero-photo');
  var sh=document.querySelector('.scroll-hint');
  var ticking=false;

  function onScroll(){
    if(!ticking){
      requestAnimationFrame(function(){
        var sy=window.scrollY,max=document.documentElement.scrollHeight-innerHeight;
        if(pb) pb.style.width=(max>0?sy/max*100:0)+'%';
        if(hp&&sy<innerHeight*1.5) hp.style.transform='translateY('+(sy*.09)+'px)';
        if(sh) sh.style.opacity=sy>60?'0':'1';
        ticking=false;
      });
      ticking=true;
    }
  }
  window.addEventListener('scroll',onScroll,{passive:true});
  onScroll();

  // Counter animation
  function animCount(el){
    var to=+el.dataset.to,pre=el.dataset.prefix||'',suf=el.dataset.suffix||'';
    if(!to) return;
    var t0=performance.now();
    (function tick(t){
      var p=Math.min((t-t0)/1800,1),e=1-Math.pow(1-p,3);
      el.textContent=pre+Math.round(to*e)+suf;
      if(p<1) requestAnimationFrame(tick);
    })(t0);
  }

  // Intersection observer for all reveal types
  var obs=new IntersectionObserver(function(entries){
    entries.forEach(function(en){
      if(en.isIntersecting){
        en.target.classList.add('visible');
        var cn=en.target.querySelector('.stat-number[data-to]');
        if(cn) animCount(cn);
        obs.unobserve(en.target);
      }
    });
  },{threshold:.12});

  document.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-scale').forEach(function(el){
    obs.observe(el);
  });

  // Stagger delays for grids
  ['.stats-inner','.steps-grid','.process-steps','.results-grid','.cards-grid'].forEach(function(sel){
    var g=document.querySelector(sel);
    if(!g) return;
    g.querySelectorAll('.reveal,.reveal-left,.reveal-right,.reveal-scale').forEach(function(c,i){
      c.style.transitionDelay=(i*90)+'ms';
    });
  });

  // About content stagger
  var ac=document.querySelector('.about-content');
  if(ac) ac.querySelectorAll('.reveal,.reveal-right').forEach(function(c,i){
    c.style.transitionDelay=(i*110)+'ms';
  });
})();
