const state={profiles:[],query:'',industry:'',party:''};
const $=s=>document.querySelector(s);
const uniq=a=>[...new Set(a.flat().filter(Boolean))].sort();
async function init(){
  state.profiles=await fetch('data/profiles.json').then(r=>r.json());
  fillFilters(); renderCards();
  $('#search').addEventListener('input',e=>{state.query=e.target.value.toLowerCase();renderCards();});
  $('#industryFilter').addEventListener('change',e=>{state.industry=e.target.value;renderCards();});
  $('#partyFilter').addEventListener('change',e=>{state.party=e.target.value;renderCards();});
}
function fillFilters(){
  uniq(state.profiles.map(p=>p.industries)).forEach(v=>$('#industryFilter').insertAdjacentHTML('beforeend',`<option>${v}</option>`));
  uniq(state.profiles.map(p=>p.parties)).forEach(v=>$('#partyFilter').insertAdjacentHTML('beforeend',`<option>${v}</option>`));
}
function matches(p){
  const blob=JSON.stringify(p).toLowerCase();
  return (!state.query||blob.includes(state.query))&&(!state.industry||p.industries.includes(state.industry))&&(!state.party||p.parties.includes(state.party));
}
function renderCards(){
  const cards=$('#cards'); cards.innerHTML='';
  state.profiles.filter(matches).forEach(p=>{
    const el=document.createElement('article'); el.className='card'; el.tabIndex=0;
    el.innerHTML=`<p class="eyebrow">${p.type}</p><h3>${p.name}</h3><p class="muted">${p.summary}</p><div class="tagrow">${p.industries.map(i=>`<span class="tag">${i}</span>`).join('')}</div><p><strong>Scrutiny score:</strong> ${'●'.repeat(p.riskScore)}${'○'.repeat(5-p.riskScore)}</p>`;
    el.onclick=()=>renderProfile(p.id); el.onkeypress=e=>{if(e.key==='Enter')renderProfile(p.id)};
    cards.appendChild(el);
  });
}
function renderProfile(id){
  const p=state.profiles.find(x=>x.id===id); const sec=$('#profile'); sec.classList.remove('hidden');
  sec.innerHTML=`
    <p class="eyebrow">Profile</p><h2>${p.name}</h2><p class="lead">${p.summary}</p>
    <div class="profile-grid">
      <div>
        <div class="profile-panel"><h3>Donation record</h3><table class="donation-table"><thead><tr><th>Year</th><th>Recipient</th><th>Amount</th><th>Source</th></tr></thead><tbody>${p.donations.map(d=>`<tr><td>${d.year}</td><td>${d.recipient}</td><td>${d.amount}</td><td><a href="${d.source}" target="_blank" rel="noreferrer">source</a></td></tr>`).join('')}</tbody></table></div>
        <div class="profile-panel"><h3>Policy alignment</h3><ul>${p.policyAlignment.map(x=>`<li>${x}</li>`).join('')}</ul></div>
        <div class="two-col"><div class="profile-panel benefit"><h3>Possible benefit to Australia</h3><ul>${p.publicBenefit.map(x=>`<li>${x}</li>`).join('')}</ul></div><div class="profile-panel cost"><h3>Possible public cost</h3><ul>${p.publicCost.map(x=>`<li>${x}</li>`).join('')}</ul></div></div>
      </div>
      <aside><div class="profile-panel"><h3>Scrutiny score</h3><div class="score">${p.riskScore}/5</div><p class="muted">Not a wrongdoing score. It means the profile has stronger overlap between wealth, policy exposure and public-interest questions.</p></div><div class="profile-panel"><h3>Careful wording</h3><p>${p.wording}</p></div><div class="profile-panel"><h3>Interests</h3><div class="tagrow">${p.interests.map(i=>`<span class="tag">${i}</span>`).join('')}</div></div></aside>
    </div>`;
  sec.scrollIntoView({behavior:'smooth'});
}
init();
