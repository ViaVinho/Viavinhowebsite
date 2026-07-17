// ===== Roteiro by Via Vinho =====
(function(){
const D = window.ROTEIRO;
const $ = id => document.getElementById(id);

const state = { region:null, days:2, group:"2", pace:"relaxed" };
let lastPlan = null;

// ---------- pickers ----------
function renderRegions(){
  $('regionGrid').innerHTML = D.regions.map(r => `
    <button type="button" class="region-card${state.region===r.id?' selected':''}" data-id="${r.id}">
      <h3>${r.name}</h3><p>${r.tagline}</p>
      ${r.viaVinho ? '<span class="vv-badge">Via Vinho hosts here</span>' : ''}
    </button>`).join('');
  [...$('regionGrid').children].forEach(el => el.onclick = () => { state.region = el.dataset.id; renderRegions(); });
}
function renderPills(id, key, options){
  const el = $(id);
  el.innerHTML = options.map(o => `<button type="button" class="pill${String(state[key])===String(o.v)?' selected':''}" data-v="${o.v}">${o.label}</button>`).join('');
  [...el.children].forEach(b => b.onclick = () => { state[key] = key==='days' ? Number(b.dataset.v) : b.dataset.v; renderPills(id,key,options); });
}
function renderAll(){
  renderRegions();
  renderPills('daysPills','days',[{v:1,label:'1 day'},{v:2,label:'2 days'},{v:3,label:'3 days'}]);
  renderPills('groupPills','group',[{v:'2',label:'Just us two'},{v:'3-5',label:'3 to 5'},{v:'6-9',label:'6 to 9'},{v:'10+',label:'10 or more'}]);
  renderPills('pacePills','pace',[{v:'relaxed',label:'Relaxed, two visits a day'},{v:'full',label:'Full on, fit more in'}]);
}
renderAll();

// ---------- itinerary engine ----------
function buildPlan(){
  const region = D.regions.find(r => r.id === state.region);
  const fits = D.wineries.filter(w => w.region === region.id && w.fit.includes(state.group));
  const skippedSmall = D.wineries.filter(w => w.region === region.id && !w.fit.includes(state.group)).length;

  const pool = [...fits];
  const take = pred => { const i = pool.findIndex(pred); return i >= 0 ? pool.splice(i,1)[0] : null; };
  const days = [];
  for(let d=0; d<state.days; d++){
    const morning   = take(w => w.slot==='morning') || take(w => w.slot==='any');
    const afternoon = take(w => w.slot==='afternoon') || take(w => w.slot==='any') || take(()=>true);
    const extra     = state.pace==='full' ? (take(w => w.slot==='any') || take(()=>true)) : null;
    days.push({ n:d+1, morning, afternoon, extra, lunch: region.lunch[d % region.lunch.length] });
  }
  const anchors = D.viaVinhoTours.filter(t => t.region === region.id);
  return { region, days, anchors, skippedSmall };
}

function stopHTML(when, w){
  if(!w) return `<div class="stop">
    <div class="stop-when">${when}</div>
    <div class="stop-body"><p class="stop-why"><em>Open slot. The estates here that fit your group are already on your plan; our concierge can arrange visits beyond the published pool.</em></p></div>
  </div>`;
  const bookTag = w.book==='required' ? '<span class="tag warn">Reservation required</span>'
                : w.book==='walkin' ? '<span class="tag ok">Walk-ins accepted</span>'
                : '<span class="tag">Confirm when booking</span>';
  const priceTag = w.price !== null ? `<span class="tag">From €${w.price} pp</span>` : '<span class="tag">Price on request</span>';
  return `<div class="stop">
    <div class="stop-when">${when}</div>
    <div class="stop-body">
      <h4><a href="${w.site}" target="_blank" rel="noopener">${w.name}</a></h4>
      <p class="stop-area">${w.area}</p>
      <p class="stop-why">${w.why}</p>
      <div class="stop-meta">${bookTag}${w.en===true?'<span class="tag ok">Tours in English</span>':''}${priceTag}</div>
    </div>
  </div>`;
}

function renderPlan(plan){
  const { region, days, anchors, skippedSmall } = plan;
  $('resultRegionLabel').textContent = 'Your roteiro';
  $('resultTitle').innerHTML = `${state.days} day${state.days>1?'s':''} in <em>${region.name}</em>`;
  $('transportNote').textContent = 'Getting around: ' + region.transport;

  const warn = $('groupWarn');
  if(state.group==='10+' && skippedSmall > 0){
    warn.hidden = false;
    warn.textContent = 'Heads up: ' + skippedSmall + ' smaller estates in this region cap visits below 10 guests, so we kept them off your plan. Larger groups are exactly when a hosted or concierge-arranged day pays for itself.';
  } else warn.hidden = true;

  let html = '';
  anchors.forEach(t => {
    html += `<div class="vv-anchor">
      <p class="eyebrow">Make one day effortless</p>
      <h3>${t.name}</h3><p>${t.blurb}</p>
      <a class="btn-vv" href="${t.url}" target="_blank" rel="noopener">${t.price==='€350'?'Book from €350':'See this experience'}</a>
    </div>`;
  });
  days.forEach(day => {
    const stops = [stopHTML('Morning', day.morning),
      `<div class="stop"><div class="stop-when">Lunch</div><div class="stop-body"><p class="stop-why">${day.lunch}</p></div></div>`,
      stopHTML('Afternoon', day.afternoon),
      day.extra ? stopHTML('If you have energy', day.extra) : ''].join('');
    const evening = day.n === days.length ? `<div class="stop"><div class="stop-when">Evening</div><div class="stop-body"><p class="stop-why">${region.eveningTip}</p></div></div>` : '';
    html += `<div class="day-card"><h3>Day ${day.n}</h3>${stops}${evening}</div>`;
  });
  $('dayCards').innerHTML = html;
  $('results').hidden = false;
  $('concierge').hidden = false;
  $('results').scrollIntoView({behavior:'smooth'});
}

$('buildBtn').onclick = () => {
  if(!state.region){ toast('Pick a region first'); return; }
  lastPlan = buildPlan();
  renderPlan(lastPlan);
};

// ---------- plain-text export ----------
function planAsText(){
  if(!lastPlan) return '';
  const { region, days } = lastPlan;
  const bookTxt = {required:'reservation required', walkin:'walk-ins accepted', confirm:'confirm when booking'};
  const priceTxt = w => w.price !== null ? 'from €'+w.price+' pp' : 'price on request';
  const L = [`ROTEIRO: ${state.days} day(s) in ${region.name} (group: ${state.group}, pace: ${state.pace})`,
             `Getting around: ${region.transport}`, ''];
  days.forEach(d => {
    L.push(`DAY ${d.n}`);
    if(d.morning)   L.push(`  Morning: ${d.morning.name} (${d.morning.area}) - ${bookTxt[d.morning.book]} - ${priceTxt(d.morning)} - ${d.morning.site}`);
    L.push(`  Lunch: ${d.lunch}`);
    if(d.afternoon) L.push(`  Afternoon: ${d.afternoon.name} (${d.afternoon.area}) - ${bookTxt[d.afternoon.book]} - ${priceTxt(d.afternoon)} - ${d.afternoon.site}`);
    if(d.extra)     L.push(`  Extra: ${d.extra.name} (${d.extra.area}) - ${d.extra.site}`);
    L.push('');
  });
  L.push(`Evening tip: ${region.eveningTip}`);
  L.push('', `Estate data by ${D.atlasName}, verified ${D.dataVerified}.`, 'Built with Roteiro by Via Vinho - viavinho.net');
  return L.join('\n');
}
$('copyBtn').onclick = async () => {
  try { await navigator.clipboard.writeText(planAsText()); toast('Itinerary copied'); }
  catch(e){ toast('Copy failed, sorry'); }
};
$('restartBtn').onclick = () => { $('results').hidden = true; $('concierge').hidden = true; window.scrollTo({top:0,behavior:'smooth'}); };

// ---------- concierge lead -> Supabase ----------
$('leadForm').onsubmit = async (ev) => {
  ev.preventDefault();
  const f = ev.target, btn = $('leadSubmit'), status = $('formStatus');
  const payload = {
    name: f.name.value.trim(), email: f.email.value.trim(),
    travel_month: f.travel_month.value.trim(), notes: f.notes.value.trim(),
    region: state.region || '', days: state.days, group_size: state.group,
    itinerary: lastPlan ? { text: planAsText() } : null, source: D.config.SOURCE
  };
  btn.disabled = true; status.className = 'form-status'; status.textContent = 'Sending...';
  try {
    const res = await fetch(D.config.SUPABASE_URL + '/rest/v1/planner_leads', {
      method:'POST',
      headers:{ 'apikey':D.config.SUPABASE_ANON_KEY, 'Authorization':'Bearer '+D.config.SUPABASE_ANON_KEY,
                'Content-Type':'application/json', 'Prefer':'return=minimal' },
      body: JSON.stringify(payload)
    });
    if(!res.ok) throw new Error('HTTP '+res.status);
    status.className = 'form-status ok';
    status.textContent = 'Sent. We will come back to you within one working day from hello@viavinho.net.';
    f.reset();
  } catch(e){
    const body = encodeURIComponent('Hi Via Vinho,\n\nPlease refine this roteiro for me.\n\n' + planAsText() +
      '\n\nTravelling: ' + payload.travel_month + '\nNotes: ' + payload.notes + '\n\n' + payload.name);
    window.location.href = 'mailto:' + D.config.CONTACT + '?subject=' + encodeURIComponent('Roteiro concierge request') + '&body=' + body;
    status.className = 'form-status err';
    status.textContent = 'Our system did not respond, so we opened an email to hello@viavinho.net with your roteiro instead.';
  } finally { btn.disabled = false; }
};

// ---------- misc ----------
let toastTimer;
function toast(msg){
  const t = $('toast'); t.textContent = msg; t.hidden = false;
  clearTimeout(toastTimer); toastTimer = setTimeout(() => t.hidden = true, 2600);
}
if('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js');
})();
