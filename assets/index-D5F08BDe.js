import{_ as A}from"./CpIcon-BEJBC59c.js";import{_ as Z}from"./CpNavBar-DJXLKEri.js";import{s as q,l as D,f as z}from"./user-DgDgPz6X.js";import{d as x,c as a,l as E,r as l,Z as G,b as H,h as o,t as C,w as u,j as V,u as h,n as J,f as y,q as K,s as L,o as b,_ as O}from"./index-DxsiHbDK.js";import{F as Q,m as W,p as X,c as Y}from"./rules-B7gIrbZd.js";import{h as ee,t as oe,c as te,w as ae,I as le}from"./index-CWA1siCg.js";import{F as se}from"./index-CsAhKhnm.js";import{C as ne}from"./index-YrVuF1XM.js";import{B as ie}from"./index-CAQ9J4A5.js";import{s as k,a as re}from"./request-uc666yY3.js";import"./use-placeholder-DGGdHVxQ.js";import"./index-C4bX3Bk5.js";import"./use-route-BFOmu3it.js";import"./use-id-Dtm_qled.js";import"./interceptor-CO5Y9v1H.js";const[ue,ce]=te("divider"),de={dashed:Boolean,hairline:oe,vertical:Boolean,contentPosition:ee("center")};var me=x({name:ue,props:de,setup(s,{slots:c}){return()=>{var m;return a("div",{role:"separator",class:ce({dashed:s.dashed,hairline:s.hairline,vertical:s.vertical,[`content-${s.contentPosition}`]:!!c.default&&!s.vertical})},[!s.vertical&&((m=c.default)==null?void 0:m.call(c))])}}});const ve=ae(me),pe="data:image/svg+xml,%3csvg%20width='60'%20height='60'%20viewBox='0%200%2060%2060'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20clip-path='url(%23clip0_1979_13714)'%3e%3cpath%20d='M30%200C13.433%200%200%2013.433%200%2030C0%2046.567%2013.433%2060%2030%2060C46.567%2060%2060%2046.567%2060%2030C60%2013.433%2046.567%200%2030%200ZM44.096%2041.0089C43.3259%2041.1027%2041.0893%2037.4799%2041.0893%2037.4799C41.0893%2039.5759%2040.0045%2042.3147%2037.6674%2044.2969C38.7991%2044.6451%2041.3438%2045.5826%2040.7411%2046.6004C40.2522%2047.4241%2032.3304%2047.1295%2030.0402%2046.8683C27.75%2047.1228%2019.8281%2047.4241%2019.3393%2046.6004C18.7299%2045.5826%2021.2746%2044.6451%2022.4062%2044.2969C20.0625%2042.3214%2018.9844%2039.5826%2018.9844%2037.4799C18.9844%2037.4799%2016.7478%2041.1027%2015.9777%2041.0089C15.6161%2040.9621%2015.1473%2039.0268%2016.6071%2034.3326C17.2969%2032.1228%2018.0804%2030.2812%2019.2991%2027.2478C19.0915%2019.4196%2022.3326%2012.8504%2030.0402%2012.8504C37.6674%2012.8504%2040.9754%2019.2857%2040.7812%2027.2478C41.9933%2030.2746%2042.7835%2032.1228%2043.4732%2034.3326C44.9263%2039.0268%2044.4509%2040.9688%2044.096%2041.0089V41.0089Z'%20fill='%2300AAFF'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_1979_13714'%3e%3crect%20width='60'%20height='60'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e",_e={class:"login-page"},fe={class:"login-head"},we={class:"cp-cell"},ge={class:"cp-cell"},Ce={class:"login-other"},he=x({__name:"index",setup(s){const c=E(),m=K(),B=L(),_=l(!0),d=l("13230000077"),f=l("abc12345"),v=l(!1),w=l(""),I=l(),n=l(0);let p;const P=async()=>{var r;n.value>0||(await((r=I.value)==null?void 0:r.validate("mobile")),await q(d.value,"login"),k("发送成功"),n.value=60,clearInterval(p),p=window.setInterval(()=>{n.value--,n.value<=0&&window.clearInterval(p)},1e3))};G(()=>{window.clearInterval(p)});const U=async()=>{if(!_.value){re("请勾选我已同意");return}const r=i.value?await D(d.value,f.value):await z(d.value,w.value);c.setUser(r.data),console.log(r),m.push(B.query.returnUrl||"/user"),k("登陆成功")},i=l(!0),R=()=>{alert("右侧按钮被点击了！")};return(r,e)=>{const F=Z,j=le,g=se,S=A,$=ne,M=ie,N=Q,T=ve;return b(),H("div",_e,[a(F,{title:"登陆",rightText:"注册",onClickRight:R}),o("div",fe,[o("h3",null,C(i.value?"密码登陆":"手机验证码登陆"),1),o("a",{href:"javascript:;",onClick:e[0]||(e[0]=t=>i.value=!i.value)},[o("span",null,C(i.value?"手机验证码登陆":"密码登陆"),1),a(j,{name:"arrow"})])]),a(N,{autocomplete:"off",onSubmit:U},{default:u(()=>[a(g,{modelValue:d.value,"onUpdate:modelValue":e[1]||(e[1]=t=>d.value=t),name:"mobile",rules:h(W),type:"tel",placeholder:"请输入手机号"},null,8,["modelValue","rules"]),i.value?(b(),V(g,{key:0,modelValue:f.value,"onUpdate:modelValue":e[3]||(e[3]=t=>f.value=t),rules:h(X),type:v.value?"text":"password",placeholder:"请输入密码"},{button:u(()=>[a(S,{onClick:e[2]||(e[2]=t=>v.value=!v.value),name:`login-eye-${v.value?"on":"off"}`},null,8,["name"])]),_:1},8,["modelValue","rules","type"])):(b(),V(g,{key:1,rules:h(Y),modelValue:w.value,"onUpdate:modelValue":e[4]||(e[4]=t=>w.value=t),placeholder:"请输入短信验证码"},{button:u(()=>[o("span",{class:J(["btn-send",{active:n.value>0}]),onClick:P},C(n.value>0?`${n.value}s后再次发送`:"发送验证码"),3)]),_:1},8,["rules","modelValue"])),o("div",we,[a($,{modelValue:_.value,"onUpdate:modelValue":e[5]||(e[5]=t=>_.value=t)},{default:u(()=>e[6]||(e[6]=[o("span",null,"我已同意",-1),o("a",{href:"javascript:;"},"用户协议",-1),o("span",null,"及",-1),o("a",{href:"javascript:;"},"隐私协议",-1)])),_:1},8,["modelValue"])]),o("div",ge,[a(M,{round:"",block:"",type:"primary","native-type":"submit"},{default:u(()=>e[7]||(e[7]=[y("登 陆")])),_:1})]),e[8]||(e[8]=o("div",{class:"cp-cell"},[o("a",{href:"javascript:;"},"忘记密码？")],-1))]),_:1}),o("div",Ce,[a(T,null,{default:u(()=>e[9]||(e[9]=[y("第三方登陆")])),_:1}),e[10]||(e[10]=o("div",{class:"icon"},[o("img",{src:pe,alt:""})],-1))])])}}}),Ne=O(he,[["__scopeId","data-v-15edb211"]]);export{Ne as default};
