import{a as y,S as b,i as S}from"./assets/vendor-951421c8.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const i of o.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function n(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function a(e){if(e.ep)return;e.ep=!0;const o=n(e);fetch(e.href,o)}})();const $=document.querySelector(".input-search"),w=document.querySelector(".form-search"),L=document.querySelector(".gallery"),x=document.querySelector(".button-submit"),s=document.querySelector(".button-load"),q=document.querySelector(".loader"),u=15;let c=1,l=0,d="";q.hidden=!0;s.hidden=!0;x.addEventListener("click",async r=>{r.preventDefault();try{const{total:t,hits:n}=await p(c);l=Math.ceil(t/u),m(n),s.hidden=l<=1}catch{f("Sorry, there was an error loading images.")}});s.addEventListener("click",async r=>{r.preventDefault(),c++;try{const{hits:t}=await p(c,d);m(t)}catch{f("Sorry, there was an error loading more images."),s.hidden=!0}});async function p(r,t=$.value){const n="42111796-9c286351ad531542ab3bfb8be";return d=t,(await y.get(`https://pixabay.com/api/?key=${n}&q=${t}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${u}&page=${r}`)).data}function m(r){const t=r.map(({webformatURL:a,tags:e,likes:o,views:i,comments:g,downloads:h})=>`
        <li class="gallery-item"><a href="${a}">
        <img class="gallery-image" src="${a}" alt="${e}"></a>
        <p>Likes: ${o}</p>
        <p>Views: ${i}</p>
        <p>Comments: ${g}</p>
        <p>Downloads: ${h}</p>
        </li>`).join("");L.insertAdjacentHTML("beforeend",t);const n=new b(".gallery a",{captions:!0,captionSelector:"img",captionsData:"alt",captionPosition:"bottom",animation:250});n.on("show.simplelightbox"),n.refresh(),w.reset()}function f(r){S.error({message:r,class:"izi-toast",messageColor:"#fafafb",messageSize:"16px",backgroundColor:"#ef4040",maxWidth:"432px",position:"topRight"})}
//# sourceMappingURL=commonHelpers.js.map
