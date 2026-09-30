(() => {
'use strict';
const L=[
['en','EN','English','<svg viewBox="0 0 30 20" aria-hidden="true"><rect width="30" height="20" fill="#012169"/><path d="M0 0l30 20M30 0L0 20" stroke="#fff" stroke-width="4"/><path d="M0 0l30 20M30 0L0 20" stroke="#c8102e" stroke-width="1.6"/><path d="M15 0v20M0 10h30" stroke="#fff" stroke-width="6"/><path d="M15 0v20M0 10h30" stroke="#c8102e" stroke-width="3.4"/></svg>'],
['hr','HR','Hrvatski','<svg viewBox="0 0 30 20" aria-hidden="true"><rect width="30" height="6.667" fill="#f00"/><rect y="6.667" width="30" height="6.666" fill="#fff"/><rect y="13.333" width="30" height="6.667" fill="#171796"/><path d="M12 5.4h6v6.4c0 2.25-1.25 3.65-3 4.45-1.75-.8-3-2.2-3-4.45z" fill="#fff" stroke="#d1182b" stroke-width=".55"/></svg>'],
['de','DE','Deutsch','<svg viewBox="0 0 30 20" aria-hidden="true"><rect width="30" height="6.667"/><rect y="6.667" width="30" height="6.666" fill="#d00"/><rect y="13.333" width="30" height="6.667" fill="#ffce00"/></svg>'],
['it','IT','Italiano','<svg viewBox="0 0 30 20" aria-hidden="true"><rect width="10" height="20" fill="#009246"/><rect x="10" width="10" height="20" fill="#fff"/><rect x="20" width="10" height="20" fill="#ce2b37"/></svg>'],
['es','ES','Español','<svg viewBox="0 0 30 20" aria-hidden="true"><rect width="30" height="5" fill="#aa151b"/><rect y="5" width="30" height="10" fill="#f1bf00"/><rect y="15" width="30" height="5" fill="#aa151b"/></svg>']
].map(([value,code,name,flag])=>({value,code,name,flag}));
const M=new Map(L.map(x=>[x.value,x]));
const style=document.createElement('style');
style.id='ag-language-menu-style';
style.textContent=`
.ag-language-native{position:absolute!important;width:1px!important;height:1px!important;margin:-1px!important;padding:0!important;border:0!important;clip:rect(0 0 0 0)!important;clip-path:inset(50%)!important;overflow:hidden!important;white-space:nowrap!important}
.ag-language-menu{position:relative;display:inline-flex;align-items:center;--ag-bg:var(--panel-2);--ag-trigger:var(--control-bg);--ag-hover:var(--control-hover);--ag-selected:var(--control-selected);--ag-border:var(--border);--ag-text:var(--text);--ag-muted:var(--muted);--ag-accent:var(--accent)}
.ag-language-trigger{min-width:176px;height:42px;display:flex;align-items:center;gap:8px;padding:0 11px;border:1px solid var(--ag-border);border-radius:13px;background:var(--ag-trigger);color:var(--ag-text);font:inherit;font-weight:750;cursor:pointer}
.ag-language-trigger:hover{background:var(--ag-hover)}.ag-language-trigger:focus-visible,.ag-language-option:focus-visible{outline:3px solid var(--ag-accent);outline-offset:2px}
.ag-language-flag{width:24px;height:16px;display:inline-flex;flex:0 0 auto;overflow:hidden;border-radius:3px;box-shadow:0 0 0 1px rgba(127,127,127,.25)}.ag-language-flag svg{width:100%;height:100%}
.ag-language-code{min-width:22px;font-size:11px;font-weight:900;letter-spacing:.07em;color:var(--ag-muted)}.ag-language-name{white-space:nowrap}.ag-language-chevron{margin-left:auto;font-size:11px;color:var(--ag-muted)}
.ag-language-list{position:absolute;top:calc(100% + 7px);right:0;z-index:1000;min-width:210px;max-width:calc(100vw - 16px);padding:6px;border:1px solid var(--ag-border);border-radius:14px;background:var(--ag-bg);box-shadow:0 18px 46px rgba(0,0,0,.28)}.ag-language-list[hidden]{display:none!important}
.ag-language-option{width:100%;min-height:42px;display:flex;align-items:center;gap:9px;padding:8px 10px;border:0;border-radius:10px;background:transparent;color:var(--ag-text);font:inherit;text-align:left;cursor:pointer}.ag-language-option:hover,.ag-language-option:focus-visible{background:var(--ag-hover)}.ag-language-option[aria-selected="true"]{background:var(--ag-selected);font-weight:850}.ag-language-check{margin-left:auto;color:var(--ag-accent);font-weight:900}
@media(max-width:620px){.ag-language-trigger{min-width:164px;height:40px;padding:0 9px}.ag-language-list{min-width:202px}}
`;
document.head.appendChild(style);
function enhance(select,index){
 if(!select||select.dataset.agEnhanced==='true')return;
 select.dataset.agEnhanced='true';select.classList.add('ag-language-native');select.tabIndex=-1;select.setAttribute('aria-hidden','true');
 const wrap=document.createElement('div');wrap.className='ag-language-menu';select.parentNode.insertBefore(wrap,select);wrap.appendChild(select);
 const trigger=document.createElement('button');trigger.type='button';trigger.className='ag-language-trigger';trigger.setAttribute('aria-haspopup','listbox');trigger.setAttribute('aria-expanded','false');
 const list=document.createElement('div');list.className='ag-language-list';list.id='ag-language-list-'+index;list.setAttribute('role','listbox');list.hidden=true;trigger.setAttribute('aria-controls',list.id);
 const available=L.filter(x=>[...select.options].some(o=>o.value===x.value));
 const buttons=available.map(x=>{const b=document.createElement('button');b.type='button';b.className='ag-language-option';b.dataset.value=x.value;b.setAttribute('role','option');b.tabIndex=-1;b.innerHTML='<span class="ag-language-flag">'+x.flag+'</span><span class="ag-language-code">'+x.code+'</span><span class="ag-language-name">'+x.name+'</span><span class="ag-language-check" aria-hidden="true"></span>';list.appendChild(b);return b;});
 wrap.append(trigger,list);
 const selected=()=>Math.max(0,buttons.findIndex(b=>b.dataset.value===select.value));
 function sync(){const x=M.get(select.value)||M.get('en');const label=select.getAttribute('aria-label')||'Language';trigger.innerHTML='<span class="ag-language-flag">'+x.flag+'</span><span class="ag-language-code">'+x.code+'</span><span class="ag-language-name">'+x.name+'</span><span class="ag-language-chevron" aria-hidden="true">▾</span>';trigger.setAttribute('aria-label',label+': '+x.code+' '+x.name);list.setAttribute('aria-label',label);buttons.forEach(b=>{const yes=b.dataset.value===select.value;b.setAttribute('aria-selected',yes?'true':'false');b.querySelector('.ag-language-check').textContent=yes?'✓':'';});}
 function fit(){list.style.transform='';const r=list.getBoundingClientRect();let dx=0;if(r.right>innerWidth-8)dx+=innerWidth-8-r.right;if(r.left+dx<8)dx+=8-(r.left+dx);if(dx)list.style.transform='translateX('+Math.round(dx)+'px)';}
 function open(focus=false){document.querySelectorAll('.ag-language-list:not([hidden])').forEach(x=>{if(x!==list)x.hidden=true;});list.hidden=false;trigger.setAttribute('aria-expanded','true');fit();if(focus)buttons[selected()]?.focus();}
 function close(focus=false){list.hidden=true;list.style.transform='';trigger.setAttribute('aria-expanded','false');if(focus)trigger.focus();}
 function choose(v){if(!M.has(v))return;if(select.value!==v){select.value=v;select.dispatchEvent(new Event('change',{bubbles:true}));}sync();close(true);}
 buttons.forEach(b=>b.addEventListener('click',()=>choose(b.dataset.value)));
 trigger.addEventListener('click',()=>list.hidden?open(false):close(false));
 trigger.addEventListener('keydown',e=>{if(['ArrowDown','ArrowUp','Enter',' '].includes(e.key)){e.preventDefault();open(true);}else if(e.key==='Escape'){e.preventDefault();close(false);}});
 list.addEventListener('keydown',e=>{const i=Math.max(0,buttons.indexOf(document.activeElement));let n=i;if(e.key==='ArrowDown')n=(i+1)%buttons.length;else if(e.key==='ArrowUp')n=(i-1+buttons.length)%buttons.length;else if(e.key==='Home')n=0;else if(e.key==='End')n=buttons.length-1;else if(e.key==='Escape'){e.preventDefault();close(true);return;}else if(e.key==='Enter'||e.key===' '){e.preventDefault();choose(document.activeElement?.dataset?.value);return;}else if(e.key==='Tab'){close(false);return;}else return;e.preventDefault();buttons[n]?.focus();});
 select.addEventListener('change',sync);document.addEventListener('pointerdown',e=>{if(!wrap.contains(e.target))close(false);});window.addEventListener('resize',()=>{if(!list.hidden)fit();});
 new MutationObserver(sync).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});new MutationObserver(sync).observe(select,{attributes:true,attributeFilter:['aria-label']});sync();
}
document.querySelectorAll('select[data-ag-language-menu]').forEach(enhance);
})();