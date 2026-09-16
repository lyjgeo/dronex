/* ============================================================
   DRONEX V2 — main.js
   功能：
   1. 占位符替换（从 js/config.js 读取，写入 data-config 元素）
   2. 导航高亮（根据滚动位置）
   3. 移动端导航折叠
   4. 表单基本验证（无后端，仅前端提示）
   5. 平滑滚动（补偿固定导航高度）
   ============================================================ */

(function(){
  'use strict';

  /* ============================================================
     1. 占位符替换
     读取 window.DRONEX_CONFIG（来自 js/config.js），
     找到所有 [data-config] 元素，把值写入 href 或 textContent。
     ============================================================ */
  function applyConfig(){
    const cfg = window.DRONEX_CONFIG || {};
    document.querySelectorAll('[data-config]').forEach(el=>{
      const key = el.getAttribute('data-config');
      const val = cfg[key];
      if(!val || val === key) return;

      if(key === 'WHATSAPP_NUMBER'){
        el.setAttribute('href','https://wa.me/'+val.replace(/[^0-9]/g,''));
      }else if(key === 'TELEGRAM_HANDLE'){
        el.setAttribute('href','https://t.me/'+val.replace(/^@/,''));
      }else if(key === 'PHONE_NUMBER'){
        el.setAttribute('href','tel:'+val.replace(/[^0-9+]/g,''));
      }else if(key === 'SALES_EMAIL'){
        el.setAttribute('href','mailto:'+val);
        el.textContent = val;
      }else if(key === 'COMPANY_LOCATION'){
        el.textContent = val;
      }
    });
  }

  /* ============================================================
     2. 导航高亮
     根据滚动位置，给对应的导航链接加 .active
     ============================================================ */
  function initNavHighlight(){
    const links = [...document.querySelectorAll('.nav-links a[href^="#"]')];
    const sections = [...document.querySelectorAll('main section[id]')];
    if(!links.length || !sections.length) return;

    const observer = new IntersectionObserver(entries=>{
      entries.forEach(entry=>{
        if(entry.isIntersecting){
          links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+entry.target.id));
        }
      });
    },{rootMargin:'-35% 0px -55% 0px'});
    sections.forEach(s=>observer.observe(s));
  }

  /* ============================================================
     3. 移动端导航折叠（可选，若存在 .nav-toggle 元素）
     ============================================================ */
  function initMobileNav(){
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');
    if(!navToggle || !navLinks) return;
    navToggle.addEventListener('click',()=>{
      navLinks.classList.toggle('open');
    });
    navLinks.querySelectorAll('a').forEach(a=>{
      a.addEventListener('click',()=>navLinks.classList.remove('open'));
    });
  }

  /* ============================================================
     4. 表单验证（仅前端提示，无后端）
     ============================================================ */
  function initQuoteForm(){
    const form = document.querySelector('#quote-form');
    if(!form) return;
    form.addEventListener('submit',e=>{
      e.preventDefault();
      const required = form.querySelectorAll('[required]');
      let ok = true;
      required.forEach(f=>{
        if(!f.value.trim()){ok=false;f.style.borderColor='#ff5a5a';}
        else{f.style.borderColor='';}
      });
      if(!ok){
        alert('Please fill in all required fields.');
        return;
      }
      alert('Thank you. This is a demo form — please connect it to your backend or use the WhatsApp / Email links.');
    });
  }

  /* ============================================================
     5. 平滑滚动（补偿固定导航高度 74px）
     ============================================================ */
  function initSmoothScroll(){
    document.querySelectorAll('a[href^="#"]').forEach(a=>{
      a.addEventListener('click',e=>{
        const id = a.getAttribute('href');
        if(id.length > 1){
          const el = document.querySelector(id);
          if(el){
            e.preventDefault();
            const top = el.getBoundingClientRect().top + window.scrollY - 74;
            window.scrollTo({top,behavior:'smooth'});
          }
        }
      });
    });
  }

  /* ============================================================
     初始化
     ============================================================ */
  document.addEventListener('DOMContentLoaded',()=>{
    applyConfig();
    initNavHighlight();
    initMobileNav();
    initQuoteForm();
    initSmoothScroll();
  });

})();