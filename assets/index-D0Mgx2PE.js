import{L as Ne,K as He,d as D,r as C,A as he,a as B,D as $,c as g,E as _,k as be,M as De,I as Me,N as We,x as Ze,m as je,g as Fe,n as Ue,O as Ke,P as Ve,y as qe,J as Je,Q as Qe}from"./index-DxsiHbDK.js";import{J as ee,K as me,v as ge,L as Xe,q as Ye,M as xe,m as z,h as ne,n as O,c as M,r as ae,N as we,e as ye,g as Ge,s as ie,O as Q,A,P as Te,Q as pe,w as X,D as G,t as H,u as et,R as tt,f as ce,E as te,B as nt,S as at,T as de,b as it,a as lt,p as ue,j as ot,U as rt}from"./index-CWA1siCg.js";import{u as Se}from"./use-id-Dtm_qled.js";import{g as Y,L as st}from"./request-uc666yY3.js";import{a as ct,r as dt}from"./use-route-BFOmu3it.js";import{S as ut,a as ft}from"./function-call-BVFVrjNs.js";import{u as vt}from"./use-refs-CftPxIFx.js";import{c as ht}from"./interceptor-CO5Y9v1H.js";function bt(e,l,a){let o,d=0;const t=e.scrollLeft,r=a===0?1:Math.round(a*1e3/16);let u=t;function v(){me(o)}function b(){u+=(l-t)/r,e.scrollLeft=u,++d<r&&(o=ee(b))}return b(),v}function mt(e,l,a,o){let d,t=ge(e);const r=t<l,u=a===0?1:Math.round(a*1e3/16),v=(l-t)/u;function b(){me(d)}function w(){t+=v,(r&&t>l||!r&&t<l)&&(t=l),Xe(e,t),r&&t<l||!r&&t>l?d=ee(w):o&&(d=ee(o))}return w(),b}function Ce(e,l){if(!Ye||!window.IntersectionObserver)return;const a=new IntersectionObserver(t=>{l(t[0].intersectionRatio>0)},{root:document.body}),o=()=>{e.value&&a.observe(e.value)},d=()=>{e.value&&a.unobserve(e.value)};Ne(d),He(d),xe(o)}const[gt,xt]=M("sticky"),wt={zIndex:O,position:ne("top"),container:Object,offsetTop:z(0),offsetBottom:z(0)};var yt=D({name:gt,props:wt,emits:["scroll","change"],setup(e,{emit:l,slots:a}){const o=C(),d=ae(o),t=he({fixed:!1,width:0,height:0,transform:0}),r=C(!1),u=B(()=>we(e.position==="top"?e.offsetTop:e.offsetBottom)),v=B(()=>{if(r.value)return;const{fixed:f,height:T,width:i}=t;if(f)return{width:`${i}px`,height:`${T}px`}}),b=B(()=>{if(!t.fixed||r.value)return;const f=ye(Ge(e.zIndex),{width:`${t.width}px`,height:`${t.height}px`,[e.position]:`${u.value}px`});return t.transform&&(f.transform=`translate3d(0, ${t.transform}px, 0)`),f}),w=f=>l("scroll",{scrollTop:f,isFixed:t.fixed}),R=()=>{if(!o.value||Q(o))return;const{container:f,position:T}=e,i=A(o),x=ge(window);if(t.width=i.width,t.height=i.height,T==="top")if(f){const s=A(f),k=s.bottom-u.value-t.height;t.fixed=u.value>i.top&&s.bottom>0,t.transform=k<0?k:0}else t.fixed=u.value>i.top;else{const{clientHeight:s}=document.documentElement;if(f){const k=A(f),h=s-k.top-u.value-t.height;t.fixed=s-u.value<i.bottom&&s>k.top,t.transform=h<0?-h:0}else t.fixed=s-u.value<i.bottom}w(x)};return $(()=>t.fixed,f=>l("change",f)),ie("scroll",R,{target:d,passive:!0}),Ce(o,R),$([Te,pe],()=>{!o.value||Q(o)||!t.fixed||(r.value=!0,_(()=>{const f=A(o);t.width=f.width,t.height=f.height,r.value=!1}))}),()=>{var f;return g("div",{ref:o,style:v.value},[g("div",{class:xt({fixed:t.fixed&&!r.value}),style:b.value},[(f=a.default)==null?void 0:f.call(a)])])}}});const Tt=X(yt),[St,fe]=M("tabs");var Ct=D({name:St,props:{count:G(Number),inited:Boolean,animated:Boolean,duration:G(O),swipeable:Boolean,lazyRender:Boolean,currentIndex:G(Number)},emits:["change"],setup(e,{emit:l,slots:a}){const o=C(),d=u=>l("change",u),t=()=>{var u;const v=(u=a.default)==null?void 0:u.call(a);return e.animated||e.swipeable?g(ut,{ref:o,loop:!1,class:fe("track"),duration:+e.duration*1e3,touchable:e.swipeable,lazyRender:e.lazyRender,showIndicators:!1,onChange:d},{default:()=>[v]}):v},r=u=>{const v=o.value;v&&v.state.active!==u&&v.swipeTo(u,{immediate:!e.inited})};return $(()=>e.currentIndex,r),be(()=>{r(e.currentIndex)}),Y({swipeRef:o}),()=>g("div",{class:fe("content",{animated:e.animated||e.swipeable})},[t()])}});const[ke,J]=M("tabs"),kt={type:ne("line"),color:String,border:Boolean,sticky:Boolean,shrink:Boolean,active:z(0),duration:z(.3),animated:Boolean,ellipsis:H,swipeable:Boolean,scrollspy:Boolean,offsetTop:z(0),background:String,lazyRender:H,showHeader:H,lineWidth:O,lineHeight:O,beforeChange:Function,swipeThreshold:z(5),titleActiveColor:String,titleInactiveColor:String},Re=Symbol(ke);var Rt=D({name:ke,props:kt,emits:["change","scroll","rendered","clickTab","update:active"],setup(e,{emit:l,slots:a}){let o,d,t,r,u;const v=C(),b=C(),w=C(),R=C(),f=Se(),T=ae(v),[i,x]=vt(),{children:s,linkChildren:k}=et(Re),h=he({inited:!1,position:"",lineStyle:{},currentIndex:-1}),W=B(()=>s.length>+e.swipeThreshold||!e.ellipsis||e.shrink),F=B(()=>({borderColor:e.color,background:e.background})),Z=(n,c)=>{var m;return(m=n.name)!=null?m:c},U=B(()=>{const n=s[h.currentIndex];if(n)return Z(n,h.currentIndex)}),E=B(()=>we(e.offsetTop)),le=B(()=>e.sticky?E.value+o:0),j=n=>{const c=b.value,m=i.value;if(!W.value||!c||!m||!m[h.currentIndex])return;const S=m[h.currentIndex].$el,y=S.offsetLeft-(c.offsetWidth-S.offsetWidth)/2;r&&r(),r=bt(c,y,n?0:+e.duration)},P=()=>{const n=h.inited;_(()=>{const c=i.value;if(!c||!c[h.currentIndex]||e.type!=="line"||Q(v.value))return;const m=c[h.currentIndex].$el,{lineWidth:S,lineHeight:y}=e,I=m.offsetLeft+m.offsetWidth/2,L={width:ce(S),backgroundColor:e.color,transform:`translateX(${I}px) translateX(-50%)`};if(n&&(L.transitionDuration=`${e.duration}s`),te(y)){const q=ce(y);L.height=q,L.borderRadius=q}h.lineStyle=L})},Be=n=>{const c=n<h.currentIndex?-1:1;for(;n>=0&&n<s.length;){if(!s[n].disabled)return n;n+=c}},K=(n,c)=>{const m=Be(n);if(!te(m))return;const S=s[m],y=Z(S,m),I=h.currentIndex!==null;h.currentIndex!==m&&(h.currentIndex=m,c||j(),P()),y!==e.active&&(l("update:active",y),I&&l("change",y,S.title)),t&&!e.scrollspy&&at(Math.ceil(de(v.value)-E.value))},V=(n,c)=>{const m=s.find((y,I)=>Z(y,I)===n),S=m?s.indexOf(m):0;K(S,c)},oe=(n=!1)=>{if(e.scrollspy){const c=s[h.currentIndex].$el;if(c&&T.value){const m=de(c,T.value)-le.value;d=!0,u&&u(),u=mt(T.value,m,n?0:+e.duration,()=>{d=!1})}}},$e=(n,c,m)=>{const{title:S,disabled:y}=s[c],I=Z(s[c],c);y||(ht(e.beforeChange,{args:[I],done:()=>{K(c),oe()}}),ct(n)),l("clickTab",{name:I,title:S,event:m,disabled:y})},Pe=n=>{t=n.isFixed,l("scroll",n)},_e=n=>{_(()=>{V(n),oe(!0)})},Ae=()=>{for(let n=0;n<s.length;n++){const{top:c}=A(s[n].$el);if(c>le.value)return n===0?0:n-1}return s.length-1},Le=()=>{if(e.scrollspy&&!d){const n=Ae();K(n)}},ze=()=>{if(e.type==="line"&&s.length)return g("div",{class:J("line"),style:h.lineStyle},null)},re=()=>{var n,c,m;const{type:S,border:y,sticky:I}=e,L=[g("div",{ref:I?void 0:w,class:[J("wrap"),{[nt]:S==="line"&&y}]},[g("div",{ref:b,role:"tablist",class:J("nav",[S,{shrink:e.shrink,complete:W.value}]),style:F.value,"aria-orientation":"horizontal"},[(n=a["nav-left"])==null?void 0:n.call(a),s.map(q=>q.renderTitle($e)),ze(),(c=a["nav-right"])==null?void 0:c.call(a)])]),(m=a["nav-bottom"])==null?void 0:m.call(a)];return I?g("div",{ref:w},[L]):L},se=()=>{P(),_(()=>{var n,c;j(!0),(c=(n=R.value)==null?void 0:n.swipeRef.value)==null||c.resize()})};$(()=>[e.color,e.duration,e.lineWidth,e.lineHeight],P),$(Te,se),$(()=>e.active,n=>{n!==U.value&&V(n)}),$(()=>s.length,()=>{h.inited&&(V(e.active),P(),_(()=>{j(!0)}))});const Oe=()=>{V(e.active,!0),_(()=>{h.inited=!0,w.value&&(o=A(w.value).height),j(!0)})},Ee=(n,c)=>l("rendered",n,c);return Y({resize:se,scrollTo:_e}),De(P),tt(P),xe(Oe),Ce(v,P),ie("scroll",Le,{target:T,passive:!0}),k({id:f,props:e,setLine:P,scrollable:W,onRendered:Ee,currentName:U,setTitleRefs:x,scrollIntoView:j}),()=>g("div",{ref:v,class:J([e.type])},[e.showHeader?e.sticky?g(Tt,{container:v.value,offsetTop:E.value,onScroll:Pe},{default:()=>[re()]}):re():null,g(Ct,{ref:R,count:s.length,inited:h.inited,animated:e.animated,duration:e.duration,swipeable:e.swipeable,lazyRender:e.lazyRender,currentIndex:h.currentIndex,onChange:K},{default:()=>{var n;return[(n=a.default)==null?void 0:n.call(a)]}})])}});const Ie=Symbol(),It=()=>Me(Ie,null),[Bt,ve]=M("tab"),$t=D({name:Bt,props:{id:String,dot:Boolean,type:String,color:String,title:String,badge:O,shrink:Boolean,isActive:Boolean,disabled:Boolean,controls:String,scrollable:Boolean,activeColor:String,inactiveColor:String,showZeroBadge:H},setup(e,{slots:l}){const a=B(()=>{const d={},{type:t,color:r,disabled:u,isActive:v,activeColor:b,inactiveColor:w}=e;r&&t==="card"&&(d.borderColor=r,u||(v?d.backgroundColor=r:d.color=r));const f=v?b:w;return f&&(d.color=f),d}),o=()=>{const d=g("span",{class:ve("text",{ellipsis:!e.scrollable})},[l.title?l.title():e.title]);return e.dot||te(e.badge)&&e.badge!==""?g(it,{dot:e.dot,content:e.badge,showZero:e.showZeroBadge},{default:()=>[d]}):d};return()=>g("div",{id:e.id,role:"tab",class:[ve([e.type,{grow:e.scrollable&&!e.shrink,shrink:e.shrink,active:e.isActive,disabled:e.disabled}])],style:a.value,tabindex:e.disabled?void 0:e.isActive?0:-1,"aria-selected":e.isActive,"aria-disabled":e.disabled||void 0,"aria-controls":e.controls,"data-allow-mismatch":"attribute"},[o()])}}),[Pt,p]=M("tab"),_t=ye({},dt,{dot:Boolean,name:O,badge:O,title:String,disabled:Boolean,titleClass:ot,titleStyle:[String,Object],showZeroBadge:H});var At=D({name:Pt,props:_t,setup(e,{slots:l}){const a=Se(),o=C(!1),d=Fe(),{parent:t,index:r}=lt(Re);if(!t)return;const u=()=>{var i;return(i=e.name)!=null?i:r.value},v=()=>{o.value=!0,t.props.lazyRender&&_(()=>{t.onRendered(u(),e.title)})},b=B(()=>{const i=u()===t.currentName.value;return i&&!o.value&&v(),i}),w=C(""),R=C("");We(()=>{const{titleClass:i,titleStyle:x}=e;w.value=i?Ue(i):"",R.value=x&&typeof x!="string"?Ke(Ve(x)):x});const f=i=>g($t,je({key:a,id:`${t.id}-${r.value}`,ref:t.setTitleRefs(r.value),style:R.value,class:w.value,isActive:b.value,controls:a,scrollable:t.scrollable.value,activeColor:t.props.titleActiveColor,inactiveColor:t.props.titleInactiveColor,onClick:x=>i(d.proxy,r.value,x)},ue(t.props,["type","color","shrink"]),ue(e,["dot","badge","title","disabled","showZeroBadge"])),{title:l.title}),T=C(!b.value);return $(b,i=>{i?T.value=!1:rt(()=>{T.value=!0})}),$(()=>e.title,()=>{t.setLine(),t.scrollIntoView()}),Je(Ie,b),Y({id:a,renderTitle:f}),()=>{var i;const x=`${t.id}-${r.value}`,{animated:s,swipeable:k,scrollspy:h,lazyRender:W}=t.props;if(!l.default&&!s)return;const F=h||b.value;if(s||k)return g(ft,{id:a,role:"tabpanel",class:p("panel-wrapper",{inactive:T.value}),tabindex:b.value?0:-1,"aria-hidden":!b.value,"aria-labelledby":x,"data-allow-mismatch":"attribute"},{default:()=>{var E;return[g("div",{class:p("panel")},[(E=l.default)==null?void 0:E.call(l)])]}});const U=o.value||h||!W?(i=l.default)==null?void 0:i.call(l):null;return Ze(g("div",{id:a,role:"tabpanel",class:p("panel"),tabindex:F?0:-1,"aria-labelledby":x,"data-allow-mismatch":"attribute"},[U]),[[qe,F]])}}});const Ut=X(At),Kt=X(Rt),[Lt,N,zt]=M("list"),Ot={error:Boolean,offset:z(300),loading:Boolean,disabled:Boolean,finished:Boolean,scroller:Object,errorText:String,direction:ne("down"),loadingText:String,finishedText:String,immediateCheck:H};var Et=D({name:Lt,props:Ot,emits:["load","update:error","update:loading"],setup(e,{emit:l,slots:a}){const o=C(e.loading),d=C(),t=C(),r=It(),u=ae(d),v=B(()=>e.scroller||u.value),b=()=>{_(()=>{if(o.value||e.finished||e.disabled||e.error||(r==null?void 0:r.value)===!1)return;const{direction:i}=e,x=+e.offset,s=A(v);if(!s.height||Q(d))return;let k=!1;const h=A(t);i==="up"?k=s.top-h.top<=x:k=h.bottom-s.bottom<=x,k&&(o.value=!0,l("update:loading",!0),l("load"))})},w=()=>{if(e.finished){const i=a.finished?a.finished():e.finishedText;if(i)return g("div",{class:N("finished-text")},[i])}},R=()=>{l("update:error",!1),b()},f=()=>{if(e.error){const i=a.error?a.error():e.errorText;if(i)return g("div",{role:"button",class:N("error-text"),tabindex:0,onClick:R},[i])}},T=()=>{if(o.value&&!e.finished&&!e.disabled)return g("div",{class:N("loading")},[a.loading?a.loading():g(st,{class:N("loading-icon")},{default:()=>[e.loadingText||zt("loading")]})])};return $(()=>[e.loading,e.finished,e.error],b),r&&$(r,i=>{i&&b()}),Qe(()=>{o.value=e.loading}),be(()=>{e.immediateCheck&&b()}),Y({check:b}),ie("scroll",b,{target:v,passive:!0}),()=>{var i;const x=(i=a.default)==null?void 0:i.call(a),s=g("div",{ref:t,class:N("placeholder")},null);return g("div",{ref:d,role:"feed",class:N(),"aria-busy":o.value},[e.direction==="down"?x:s,T(),w(),f(),e.direction==="up"?x:s])}}});const Vt=X(Et);export{Vt as L,Kt as T,Ut as a};
