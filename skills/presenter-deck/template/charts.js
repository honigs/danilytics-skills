// ------------------------------------------------------------------ chart kit (plain HTML/SVG, no library)
// Every element a chart draws carries data-b="n": it appears at build n of its slide.
// Reveal classes: fx = fade up · gx = grow from the left · gy = grow from the bottom · dr = SVG line draws itself.
// data-tip="..." gives a hover tooltip (shown only once the element is revealed).
// Use transition-delay to stagger elements that share a build (bars of a group, points along a line).

const MON=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'], WD=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const iso=s=>new Date(s+'T00:00:00');
const dlab=s=>{ const d=iso(s); return d.getDate()+' '+MON[d.getMonth()]; };          // '17 Aug'
const wdlab=s=>{ const d=iso(s); return [WD[d.getDay()], dlab(s)]; };                    // ['Sun','17 Aug']
const dnum=s=>iso(s).getTime()/864e5;
const fmtN=v=>Math.round(v).toLocaleString('en-US');
const p0=v=>Math.round(v)+'%', p1=v=>v.toFixed(1)+'%';
const sgn=(v,d=0,u='%')=>(v<0?'−':'+')+Math.abs(v).toFixed(d)+u;                      // true minus sign, not a hyphen
const esc=s=>String(s).replace(/"/g,'&quot;');

// ---- 100% stacked horizontal bars: one row per group, one segment per key.
// rows: [{name, sub, v:{key:pct}}]; keys: [{k, label, col, txt}] (txt = label colour on a light fill)
// o.bKey(i) build for key i (default i+1: reveal Low, then Standard, then High); o.bRow(r) to reveal row by row instead.
// o.head: draw the key labels once above the first row, centred on its segments.
function stackBars(el, rows, keys, o={}){
 const bOf=(ri,ki)=>o.bRow?o.bRow(ri):(o.bKey?o.bKey(ki):ki+1);
 let h='';
 if(o.head!==false){ let c=0; h+='<div class="seghead">'+keys.map((k,i)=>{ const v=rows[0].v[k.k]; const s=`<div class="fx" data-b="${bOf(0,i)}" style="left:${c+v/2}%;color:${k.col}">${k.label}</div>`; c+=v; return s; }).join('')+'</div>'; }
 h+=rows.map((r,ri)=>{ let c=0;
  const segs=keys.map((k,ki)=>{ const v=r.v[k.k]||0; const s=`<div class="seg gx${ki===keys.length-1?' last':''}" data-b="${bOf(ri,ki)}" style="left:${c}%;width:${v}%;background:${k.col};color:${k.txt||'#fff'};transition-delay:${o.bRow?ki*.2:0}s" data-tip="${esc(r.name+' · '+k.label+': '+p1(v))}"><span class="lab">${v>=(o.minLab||4)?p0(v):''}</span></div>`; c+=v; return s; }).join('');
  return `<div class="sbar"><div class="nm${o.bRow?' fx" data-b="'+o.bRow(ri):''}">${r.name}${r.sub?'<small>'+r.sub+'</small>':''}</div><div class="track">${segs}</div></div>`; }).join('');
 el.innerHTML=h;
}

// ---- horizontal bars with value labels. rows: [{name, v, col?, tip?, b?}]; o.max shared scale (pass the same max to twin panes).
function hbars(el, rows, o={}){
 const mx=o.max||Math.max(...rows.map(r=>r.v)), fmt=o.fmt||fmtN;
 el.innerHTML=rows.map((r,i)=>{ const b=r.b||o.b||1, w=r.v/mx*100, dl=(o.stagger??.12)*i;
  return `<div class="hrow"><div class="hn">${r.name}</div><div class="htr"><div class="hfill gx" data-b="${b}" style="width:${w}%;background:${r.col||o.col||'var(--accent)'};transition-delay:${dl}s" data-tip="${esc(r.tip||r.name+': '+fmt(r.v))}"></div><span class="hv fx" data-b="${b}" style="left:calc(${w}% + 12px);transition-delay:${dl+.45}s">${fmt(r.v)}${r.note?'<small>'+r.note+'</small>':''}</span></div></div>`; }).join('');
}

// ---- grouped vertical bars, optional hatched "extra" on top (e.g. base usage + follow-on usage).
// groups: [{name, sub, delta?, bars:[{label, v, extra?, col}]}]; o.max shared scale; o.bGroup(gi) / o.bExtra(gi) / o.bDelta.
function vbars(el, groups, o={}){
 const mx=o.max||Math.max(...groups.flatMap(g=>g.bars.map(b=>b.v+(b.extra||0))))*1.12, fmt=o.fmt||(v=>v.toFixed(1));
 const bG=o.bGroup||(()=>1), bX=o.bExtra||bG;
 el.innerHTML=groups.map((g,gi)=>{
  const bars=g.bars.map((b,k)=>{ const all=b.v+(b.extra||0), dl=k*.15;
   return `<div class="vb" style="height:${all/mx*100}%"><div class="base gy" data-b="${bG(gi)}" style="height:${b.v/all*100}%;background:${b.col};transition-delay:${dl}s" data-tip="${esc(g.name+' · '+b.label+': '+fmt(b.v))}"></div>`+
    (b.extra?`<div class="cap gy" data-b="${bX(gi)}" style="height:${b.extra/all*100}%;background-color:${b.col};transition-delay:${dl+.1}s" data-tip="${esc(g.name+' · '+b.label+': +'+fmt(b.extra)+(o.extraName?' '+o.extraName:''))}"></div>`:'')+
    `<div class="val fx" data-b="${bX(gi)}" style="transition-delay:${dl+.5}s">${fmt(all)}</div></div>`; }).join('');
  const dt=g.delta==null?'':`<span class="delta fx${Math.abs(g.delta)<(o.flat??3)?' flat':''}" data-b="${o.bDelta||bX(gi)}">${sgn(g.delta)}</span>`;
  return `<div class="vg"><div class="bars">${bars}</div><div class="gl">${g.name} ${dt}${g.sub?'<small>'+g.sub+'</small>':''}</div></div>`; }).join('');
}

// ---- 100% stacked columns over time (is the split stable day by day?). cols: [{x, v:{key:pct}}]; keys as stackBars.
function stackCols(el, cols, keys, o={}){
 let h='<div class="yax">'+[0,25,50,75,100].map(v=>`<div style="bottom:${v}%">${v}%</div>`).join('')+'</div>';
 h+=cols.map((c,i)=>`<div class="col gy" data-b="${o.b||1}" style="transition-delay:${i*.07}s">`+keys.map(k=>`<div style="height:${c.v[k.k]}%;background:${k.col};color:${k.txt||'#fff'}" data-tip="${esc((o.xlab?o.xlab(c.x):c.x)+' · '+k.label+': '+p1(c.v[k.k]))}">${c.v[k.k]>=9?Math.round(c.v[k.k]):''}</div>`).join('')+'</div>').join('');
 el.innerHTML=h;
 if(o.labels) o.labels.innerHTML=cols.map(c=>{ const [a,b]=o.xlab2?o.xlab2(c.x):[c.x,'']; return `<div><b>${a}</b>${b}</div>`; }).join('');
}

// ---- line chart over dates. series: [{name, v:[...], col, w, dash, r, b, dy, bAt}]
//  bAt(i) -> build for point i: the line is cut into one path per build, each starting where the last ended,
//  so a single series can be told in chapters ("up to the email… then the jump… then since").
// o: {W,H,L,R, ymin,ymax,ticks,fmt, every (x-label spacing), marks:[{x,label,b}], refs:[{v,label,b}], bands:[{x0,x1,label,b}]}
function lines(svg, xs, series, o){
 const W=o.W||1400,H=o.H||520,L=o.L||80,R=o.R||190,TP=26,B=52;
 svg.setAttribute('viewBox',`0 0 ${W} ${H}`);
 const x0=dnum(xs[0]), x1=dnum(xs[xs.length-1]);
 const X=d=>L+(dnum(d)-x0)/(x1-x0)*(W-L-R), Y=v=>TP+(1-(v-o.ymin)/(o.ymax-o.ymin))*(H-TP-B), fmt=o.fmt||fmtN;
 let s='';
 (o.bands||[]).forEach(b=>{ s+=`<g class="fx" data-b="${b.b||1}"><rect x="${X(b.x0)}" y="${TP}" width="${X(b.x1)-X(b.x0)}" height="${H-TP-B}" fill="var(--accent-soft)" stroke="var(--accent-line)"/><text x="${(X(b.x0)+X(b.x1))/2}" y="${TP+24}" text-anchor="middle" font-size="17" font-weight="800" fill="var(--accent-dark)">${b.label}</text></g>`; });
 o.ticks.forEach(t=>{ s+=`<line x1="${L}" x2="${W-R+10}" y1="${Y(t)}" y2="${Y(t)}" stroke="var(--grid)"/><text x="${L-12}" y="${Y(t)+6}" text-anchor="end" font-size="18" fill="var(--text-muted)">${fmt(t)}</text>`; });
 xs.forEach((d,i)=>{ if(i%(o.every||2)===0) s+=`<text x="${X(d)}" y="${H-18}" text-anchor="middle" font-size="17" fill="var(--text-muted)">${(o.xlab||dlab)(d)}</text>`; });
 (o.marks||[]).forEach((m,k)=>{ if(dnum(m.x)<x0||dnum(m.x)>x1) return; const mx=X(m.x);
  s+=`<g class="fx" data-b="${m.b||1}" style="transition-delay:${k*.15}s"><line x1="${mx}" x2="${mx}" y1="${TP-4}" y2="${H-B}" stroke="var(--text-muted)" stroke-width="2" stroke-dasharray="5 6"/><text x="${mx+7}" y="${TP+14+k*24}" font-size="17" font-weight="700" fill="var(--text-secondary)">${m.label}</text></g>`; });
 (o.refs||[]).forEach(r=>{ s+=`<g class="fx" data-b="${r.b||1}"><line x1="${L}" x2="${W-R+10}" y1="${Y(r.v)}" y2="${Y(r.v)}" stroke="var(--text-muted)" stroke-width="2.5" stroke-dasharray="10 7"/><text x="${W-R+16}" y="${Y(r.v)+6}" font-size="18" font-weight="700" fill="var(--text-secondary)">${r.label}</text></g>`; });
 series.forEach((se,k)=>{ const pts=se.v.map((v,i)=>[X(xs[i]),Y(v)]), bAt=se.bAt||(()=>se.b||1);
  // one path per run of points sharing a build; each run starts at the previous run's last point
  let runs=[], a=0; for(let i=1;i<=pts.length;i++){ if(i===pts.length||bAt(i)!==bAt(a)){ runs.push([Math.max(0,a-1),i-1,bAt(a)]); a=i; } }
  runs.forEach(([i0,i1,b])=>{ if(i1<=i0&&runs.length>1) return;
   s+=`<path class="dr" data-b="${b}" pathLength="1" d="${pts.slice(i0,i1+1).map((p,i)=>(i?'L':'M')+p[0].toFixed(1)+','+p[1].toFixed(1)).join('')}" fill="none" stroke="${se.col}" stroke-width="${se.w||4}" ${se.dash?'stroke-dasharray="'+se.dash+'"':''} stroke-linejoin="round" stroke-linecap="round" style="transition-delay:${runs.length>1?0:k*.25}s"/>`; });
  pts.forEach((p,i)=>{ const b=bAt(i); s+=`<circle class="fx" data-b="${b}" cx="${p[0]}" cy="${p[1]}" r="${se.r||5}" fill="${se.col}" style="transition-delay:${(se.bAt?.4:.3+i*.03).toFixed(2)}s" data-tip="${esc((o.xlab||dlab)(xs[i])+' · '+se.name+': '+fmt(se.v[i],1))}"/>`; });
  const lp=pts[pts.length-1]; s+=`<text class="fx" data-b="${bAt(pts.length-1)}" x="${lp[0]+14}" y="${lp[1]+(se.dy||7)}" font-size="20" font-weight="800" fill="${se.col}" style="transition-delay:1.4s">${se.name}</text>`; });
 svg.innerHTML=s;
}

// ---- change vs zero, one row per metric (the "per user, all together" summary).
// rows: [{label, rel (signed %), real (bool: significant), b}]; o.max = axis half-width in %. Grey = no clear change.
function diverge(el, rows, o={}){
 const mx=o.max||Math.max(...rows.map(r=>Math.abs(r.rel)))*1.6;  // headroom so a negative bar's label clears the row name
 const groups=[...new Set(rows.map(r=>r.b))].map(b=>rows.filter(r=>r.b===b));
 el.innerHTML=groups.map(g=>'<div class="dgroup">'+g.map(r=>{ const w=Math.abs(r.rel)/mx*50, left=r.rel<0?50-w:50, lab=sgn(r.rel,1);
  const vpos=r.rel<0?`right:calc(${100-left}% + 14px)`:`left:calc(${left+w}% + 14px)`;
  return `<div class="drow"><div class="nm fx" data-b="${r.b}">${r.label}</div><div class="tr"><div class="axis0"></div>`+
   `<div class="bar ${r.real?'real':'ns'} gx${r.rel<0?' neg':''}" data-b="${r.b}" style="left:${left}%;width:${w}%" data-tip="${esc(r.label+': '+lab+(r.real?'':' (no clear change)'))}"></div>`+
   `<div class="v fx" data-b="${r.b}" style="${vpos};transition-delay:.5s">${lab}${r.real?'':'<small>no clear change</small>'}</div></div></div>`; }).join('')+'</div>').join('');
}

// ---- idea board: cards for hypotheses / options, optionally stamped with a verdict.
// items: [{tag, title, desc, b, stamp?, kind?: 'yes'|'no'|'part'}]. Show it twice: early without stamps, at the end with them.
function board(el, items, o={}){
 el.innerHTML=items.map((x,i)=>`<div class="hy${o.stamps?' v':''} fx" data-b="${o.stamps?0:(x.b||1)}"><div class="tag">${x.tag}</div><div class="tt">${x.title}</div><div class="ds">${x.desc}</div>`+
  (o.stamps&&x.stamp?`<div class="stamp ${x.kind||'no'} fx" data-b="${o.stampB||1}" style="transition-delay:${i*.12}s">${x.stamp}</div>`:'')+'</div>').join('');
}

// ------------------------------------------------------------------ this deck's charts (edit below; keep the kit above generic)
const RES=[{k:'low',label:'Compact',col:'var(--q1)',txt:'var(--q1-t)'},{k:'mid',label:'Standard',col:'var(--q2)'},{k:'high',label:'Wide',col:'var(--q3)'}];

function drawCharts(){
 stackBars($('#splitBars'), D.split, RES, {});
 lines($('#dailySvg'), D.days, [
  {name:'Control',v:D.dailyC,col:'var(--ctrl)',w:3.5,b:1,dy:-16},
  {name:'Test',v:D.dailyT,col:'var(--treat)',w:5.5,r:6,dy:18,bAt:i=>i<D.launchIdx?1:i===D.launchIdx?2:3}],
  {W:1400,H:500,ymin:0,ymax:4,ticks:[0,1,2,3,4],fmt:(v,d)=>v.toFixed(d||0)+' min',marks:[{x:D.days[D.launchIdx],label:'New layout on',b:2}],refs:[{v:D.baseline,label:'Pre-launch avg',b:1}]});
 vbars($('#sessGroups'), D.sess, {bGroup:gi=>gi===0?1:2, bExtra:gi=>gi===0?1:2, bDelta:3, extraName:'follow-on edits'});
 diverge($('#puRows'), D.perUser);
 board($('#boardA'), D.ideas, {});
 board($('#boardB'), D.ideas, {stamps:true});
 hbars($('#twinA'), D.twin.monthly, {max:D.twin.max, fmt:v=>sgn(v), col:'var(--s1)'});
 hbars($('#twinB'), D.twin.annual, {max:D.twin.max, fmt:v=>sgn(v), col:'var(--s1)', b:2});
}
