import{i as e}from"./request-uc666yY3.js";const n=()=>e({url:"/dep/all",method:"get"}),a=t=>{const r=new FormData;return r.append("file",t),e({url:"/upload",method:"post",data:r})},s=t=>e({url:"/patient/consult/order/pre",method:"get",params:t}),l=t=>e({url:"/patient/consult/order",method:"post",data:t}),u=t=>e({url:"/patient/consult/pay",method:"post",data:t}),d=t=>e({url:"/patient/consult/order/detail",method:"get",params:{orderId:t}}),c=t=>e({url:"/patient/consult/order/list",method:"get",params:t}),p=t=>e({url:`/patient/order/cancel/${t}`,method:"put"}),i=t=>e({url:`/patient/order/${t}`,method:"delete"}),m=t=>e(`/patient/consult/prescription/${t}`),g=t=>e({url:"/patient/order/evaluate",method:"post"});export{s as a,m as b,l as c,d,g as e,c as f,n as g,u as h,p as i,i as j,a as u};
