import{V as u,t as m,h as p,m as S,c as h,W as v,w as D}from"./index-CWA1siCg.js";import{g as b}from"./request-uc666yY3.js";import{d as w,a as H,D as g,c as C}from"./index-DxsiHbDK.js";import{I as o}from"./index-DkUi12Jt.js";function P(e,l){const{days:i}=l;let{hours:s,minutes:n,seconds:a,milliseconds:t}=l;if(e.includes("DD")?e=e.replace("DD",u(i)):s+=i*24,e.includes("HH")?e=e.replace("HH",u(s)):n+=s*60,e.includes("mm")?e=e.replace("mm",u(n)):a+=n*60,e.includes("ss")?e=e.replace("ss",u(a)):t+=a*1e3,e.includes("S")){const c=u(t,3);e.includes("SSS")?e=e.replace("SSS",c):e.includes("SS")?e=e.replace("SS",c.slice(0,2)):e=e.replace("S",c.charAt(0))}return e}const[f,k]=h("count-down"),x={time:S(0),format:p("HH:mm:ss"),autoStart:m,millisecond:Boolean};var I=w({name:f,props:x,emits:["change","finish"],setup(e,{emit:l,slots:i}){const{start:s,pause:n,reset:a,current:t}=v({time:+e.time,millisecond:e.millisecond,onChange:r=>l("change",r),onFinish:()=>l("finish")}),c=H(()=>P(e.format,t.value)),d=()=>{a(+e.time),e.autoStart&&s()};return g(()=>e.time,d,{immediate:!0}),b({start:s,pause:n,reset:d}),()=>C("div",{role:"timer",class:k()},[i.default?i.default(t.value):c.value])}});const T=D(I),V=[{label:"一周内",value:o.Week},{label:"一月内",value:o.Month},{label:"半年内",value:o.HalfYear},{label:"大于半年",value:o.More}],W=[{label:"就诊过",value:0},{label:"没就诊过",value:1}];export{T as C,W as f,V as t};
