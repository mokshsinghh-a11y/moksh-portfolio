
document.getElementById('year').textContent=new Date().getFullYear();

document.getElementById('theme').onclick=()=>{
  document.body.classList.toggle('light');
  document.getElementById('theme').textContent=
    document.body.classList.contains('light')?'☾':'☀';
};

document.querySelectorAll('.reveal').forEach(e=>e.classList.add('show'));

let count=0,deadline=0,tick=null;

document.getElementById('clicker').onclick=()=>{
  const now=performance.now();

  if(now>=deadline){
    count=0;
    deadline=now+5000;
    clearInterval(tick);

    tick=setInterval(()=>{
      let left=Math.max(0,(deadline-performance.now())/1000);
      document.getElementById('timer').textContent=
        left.toFixed(1)+' seconds left';

      if(left<=0){
        clearInterval(tick);
        document.getElementById('clicker').textContent='TRY AGAIN';
        document.getElementById('timer').textContent=
          'Final score: '+count+' clicks';
      }
    },50);

    document.getElementById('clicker').textContent='CLICK FAST!';
  }

  count++;
  document.getElementById('score').textContent=
    String(count).padStart(2,'0');
};

let rState='idle',rStart=0,rTimeout;
const reaction=document.getElementById('reaction');

document.getElementById('reactionStart').onclick=()=>{
  clearTimeout(rTimeout);
  rState='wait';
  reaction.className='reaction wait';
  reaction.textContent='WAIT...';

  document.getElementById('reactionResult').textContent=
    'Hold your nerve.';

  rTimeout=setTimeout(()=>{
    rState='go';
    rStart=performance.now();
    reaction.className='reaction go';
    reaction.textContent='CLICK NOW!';
  },1000+Math.random()*3000);
};

reaction.onclick=()=>{
  if(rState==='wait'){
    clearTimeout(rTimeout);
    rState='idle';
    reaction.className='reaction';
    reaction.textContent='TOO EARLY!';

    document.getElementById('reactionResult').textContent=
      'False start! Try again.';
  }
  else if(rState==='go'){
    let ms=Math.round(performance.now()-rStart);
    rState='idle';
    reaction.className='reaction';
    reaction.textContent=ms+' ms';

    document.getElementById('reactionResult').textContent=
      ms<250?'Lightning fast ⚡':'Not bad. Can you beat it?';
  }
};
