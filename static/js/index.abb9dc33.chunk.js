(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[1],{16:function(e,t,n){"use strict";n.d(t,"b",(function(){return s})),n.d(t,"a",(function(){return c}));var a=n(0),r=n.n(a),i=n(9),o=n(55);function s(e){let{properties:t,...n}=e;if(!t)return n;let a=Object.keys(t).map(i.camelCase),r=Object.values(t),o={};for(let i=0;i<r.length;i++){const e=a[i],t=r[i];o[e]=t}return{...n,properties:o}}function c(e){let t=[];return"undefined"!==typeof e.children&&(t=e.children.map(c)),r.a.createElement(e.tagName,{...e.properties,key:Object(o.a)()},t)}},46:function(e,t,n){},57:function(e,t,n){e.exports=n(67)},67:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),i=n(12),o=n.n(i),s=n(19),c=n(38),l=n(11),h=n(13),d=n(51),p=n(53),m=n(54);function u(e,t){const[n,a,r]=e;return"rgb(".concat(n,", ").concat(a,", ").concat(r,", ").concat(t,")")}const g=[187,225,250],f=[231,48,91],v={mergeAllowed:[155,222,172],mergeNotAllowed:[231,48,91],suggestedGroup:[255,248,205],group:[243,249,251],contractedGroup:[214,224,240],hover:[144,136,212]};var C=n(7);var y=function(e){return(Math.sin(.3*e)+1)/2};class E extends a.Component{constructor(e){super(e),this.increment=()=>{this.setState(e=>{const{x:t}=e;return{x:t+1}})},this.state={x:0},e.highlight&&(this.counter=setInterval(this.increment,40))}componentDidUpdate(e){e.highlight!==this.props.highlight&&(this.props.highlight?this.counter=setInterval(this.increment,40):Object(C.a)(this.counter)||clearInterval(this.counter))}componentWillUnmount(){clearInterval(this.counter)}render(){const{active:e,children:t,highlight:n,onClick:a}=this.props;let{variant:i}=this.props;Object(C.a)(i)&&(i="light");const o={};if(n){const e=y(this.state.x),t=u(f,e);o.boxShadow="0 0 0 .6rem ".concat(t)}return r.a.createElement(l.a,{className:"mt-3 mb-3"},r.a.createElement(h.a,{className:"d-flex justify-content-center"},r.a.createElement(p.a,{placement:"bottom",delay:{show:250,hide:400},overlay:r.a.createElement(d.a,null,this.props.name)},r.a.createElement("div",{className:e?"visible":"invisible"},r.a.createElement(m.a,{variant:i,style:o,onClick:a},t)))))}}var b,k,x,w,O,L,j,M=E;function R(){return(R=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}const N=e=>{let{svgRef:t,title:n,...a}=e;return r.a.createElement("svg",R({width:16,height:16,viewBox:"0 0 16 16",ref:t},a),n?r.a.createElement("title",null,n):null,b||(b=r.a.createElement("defs",null)),k||(k=r.a.createElement("path",{id:"path2",fill:"none",stroke:"#000000",strokeMiterlimit:10,strokeWidth:1.39508116,strokeLinecap:"round",strokeLinejoin:"round",transform:"matrix(1 0 0 1 0.61016949 0.40677966)",d:"M 3.8145914 8.9385074 L 0.68636641 11.820128 C 0.58874013 11.647163 0.52737504 11.418466 0.52737504 11.173006 L 0.52737504 3.7785121"})),x||(x=r.a.createElement("path",{id:"path4",fill:"none",stroke:"#000000",strokeMiterlimit:10,strokeWidth:1.39508116,strokeLinecap:"round",strokeLinejoin:"round",transform:"matrix(1 0 0 1 0.61016949 0.40677966)",d:"M 14.457251 3.7645655 L 14.457251 11.173006 C 14.457251 11.412887 14.401461 11.633244 14.303838 11.806182 L 11.147274 8.915886"})),w||(w=r.a.createElement("path",{id:"line6",fill:"none",stroke:"#000000",strokeMiterlimit:10,strokeWidth:1.39508116,strokeLinecap:"round",strokeLinejoin:"round",transform:"matrix(1 0 0 1 0.61016949 0.40677966)",d:"M 0.70472015 3.6639546 L 0.68731478 3.6530763"})),O||(O=r.a.createElement("path",{id:"path8",fill:"none",stroke:"#000000",strokeMiterlimit:10,strokeWidth:1.39508116,strokeLinecap:"round",strokeLinejoin:"round",transform:"matrix(1 0 0 1 0.61016949 0.40677966)",d:"M 4.9679762 7.8760266 L 6.2148033 9.0280168 C 6.281747 9.0893819 6.3486908 9.142379 6.4156345 9.1870081 C 7.0934677 9.6890862 7.8828181 9.6890862 8.557862 9.1842188 C 8.6220164 9.1395897 8.6889601 9.0838032 8.7503252 9.0280168 L 10.00552 7.870448"})),L||(L=r.a.createElement("path",{id:"path12",fill:"none",stroke:"#000000",strokeMiterlimit:10,strokeWidth:1.39508116,strokeLinecap:"round",strokeLinejoin:"round",transform:"matrix(1 0 0 1 0.61016949 0.40677966)",d:"M 10.86028 8.6531318 L 14.303838 11.806182 C 14.186687 12.02096 14.005381 12.160426 13.804549 12.160426 L 1.1800765 12.160426 C 0.9848239 12.160426 0.80630727 12.029328 0.68636641 11.820128 L 4.0553378 8.7167284"})),j||(j=r.a.createElement("path",{id:"path16",fill:"none",stroke:"#000000",strokeMiterlimit:10,strokeWidth:1.39508116,strokeLinecap:"round",strokeLinejoin:"round",transform:"matrix(1 0 0 1 0.61016949 0.40677966)",d:"M 14.457251 3.7645655 L 10.005492 7.870448 L 8.7502973 9.0280168 C 8.6889322 9.0838032 8.6219885 9.1395897 8.5578341 9.1842188 C 7.8828181 9.6890862 7.0934398 9.6890862 6.4156066 9.1870081 C 6.3486629 9.142379 6.2817191 9.0893819 6.2147754 9.0280168 L 4.9679483 7.8760266 L 0.52734715 3.7785121 C 0.53850445 3.7617761 0.55245105 3.7422511 0.56639765 3.7227261 C 0.6835492 3.5553663 0.84254057 3.4549507 1.0154786 3.4549507 L 13.980249 3.4549507 C 14.144819 3.4549507 14.30381 3.5525767 14.418145 3.7087791 C 14.432145 3.7255151 14.446095 3.7450401 14.457255 3.7645651 Z"})))},S=r.a.forwardRef((e,t)=>r.a.createElement(N,R({svgRef:t},e)));var T,D;n.p;function I(){return(I=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}const P=e=>{let{svgRef:t,title:n,...a}=e;return r.a.createElement("svg",I({width:16,height:16,viewBox:"0 0 16 16",ref:t},a),n?r.a.createElement("title",null,n):null,T||(T=r.a.createElement("defs",null)),D||(D=r.a.createElement("path",{id:"path2413",fill:"#000000",stroke:"none",transform:"matrix(0.07875 0 0 0.07875 0.17937861 0.14904852)",d:"M 100 0 C 44.8 0 0 44.8 0 100 C 0 155.2 44.8 200 100 200 C 155.2 200 200 155.2 200 100 C 200 44.8 155.2 0 100 0 Z M 100 12.812 C 148.13 12.812 187.19 51.87 187.19 100 C 187.19 148.13 148.13 187.19 100 187.19 C 51.87 187.19 12.812 148.13 12.812 100 C 12.812 51.87 51.87 12.812 100 12.812 Z M 101.47 34.062 C 96.02 34.092 90.817 34.799 86.188 36.125 C 81.489 37.471 77.062 39.609 73.312 42.344 C 70.074 44.706 66.979 47.735 64.625 50.875 C 60.466 56.424 58.164 62.526 57.562 69.562 C 57.522 70.03 57.492 70.43 57.5 70.438 C 57.516 70.454 79.202 73.125 79.312 73.125 C 79.365 73.125 79.425 72.891 79.594 72.188 C 81.535 64.103 85.08 58.667 90.562 55.375 C 94.882 52.781 100.37 51.763 106.34 52.406 C 109.08 52.701 111.55 53.366 113.72 54.406 C 116.43 55.707 118.9 57.767 120.66 60.219 C 122.2 62.375 123.12 64.803 123.41 67.531 C 123.49 68.29 123.46 70.011 123.38 70.75 C 123.15 72.576 122.68 74.128 121.88 75.719 C 121.07 77.316 120.4 78.233 119.12 79.531 C 117.09 81.608 113.94 84.36 108.34 88.938 C 104.74 91.882 102.3 94.094 100.22 96.281 C 95.277 101.46 93.029 105.35 91.656 111 C 90.751 114.72 90.4 118.55 90.5 124.19 C 90.525 125.59 90.562 126.92 90.562 127.16 L 90.562 127.59 L 112.16 127.59 L 112.19 125.19 C 112.22 121.92 112.4 119.82 112.75 117.78 C 113.32 114.51 114.18 112.78 116.69 109.97 C 118.29 108.17 120.39 106.21 123.62 103.5 C 128.39 99.509 131.73 96.51 134.88 93.375 C 139.79 88.468 142.34 85.115 144.16 81.188 C 145.59 78.096 146.38 75.022 146.62 71.656 C 146.68 70.84 146.69 68.626 146.62 67.688 C 146.17 60.645 143.52 54.435 138.47 48.656 C 137.67 47.747 135.69 45.769 134.75 44.938 C 129.79 40.544 124.06 37.585 117.19 35.844 C 113 34.782 108.96 34.244 103.84 34.094 C 103.06 34.071 102.25 34.058 101.47 34.062 Z M 90.562 137.662 L 90.562 159.662 L 112.56 159.662 L 112.56 137.662 Z"})))},F=r.a.forwardRef((e,t)=>r.a.createElement(P,I({svgRef:t},e)));n.p;var B=n(37),W=n(27);var H=function(e){const{show:t,onHide:n}=e;return r.a.createElement(B.a,{show:t,onHide:n,size:"lg",centered:!0,scrollable:!0,animation:!0},r.a.createElement(B.a.Header,null,r.a.createElement(B.a.Title,null,r.a.createElement(s.a,{className:"px-5"},r.a.createElement(l.a,null,r.a.createElement(h.a,{md:"auto"},"Help"))))),r.a.createElement(B.a.Body,null,r.a.createElement(s.a,null,r.a.createElement(l.a,{className:"p-3"},r.a.createElement(h.a,{className:"col-8"},r.a.createElement(W.a,{variant:"flush"},r.a.createElement(W.a.Item,{className:"p-2"},r.a.createElement("p",{className:"lead"},"Group related objects")),r.a.createElement(W.a.Item,{className:"p-2"},r.a.createElement("p",{className:"lead"},"Click on objects to select")),r.a.createElement(W.a.Item,{className:"p-2"},r.a.createElement("p",{className:"lead"},"Clear selection by tapping anywhere on screen")),r.a.createElement(W.a.Item,{className:"p-2"},r.a.createElement("p",{className:"lead"},"Click on the group icon to create a group")),r.a.createElement(W.a.Item,{className:"p-2"},r.a.createElement("p",{className:"lead"},"Undo a node by double-clicking on the bubble"))))))))};function U(){window.open("mailto:sumit.chaturvedi@gmail.com?subject=Comic Annotation App")}var A=function(e){const[t,n]=Object(a.useState)(!1);return r.a.createElement(r.a.Fragment,null,r.a.createElement(c.a,null,r.a.createElement(s.a,{className:"border-bottom"},r.a.createElement(c.a.Brand,null,r.a.createElement("h1",null,"ComicCut")),r.a.createElement(c.a.Toggle,null),r.a.createElement(c.a.Collapse,{className:"justify-content-end"},r.a.createElement(l.a,null,r.a.createElement(h.a,null,r.a.createElement(M,{name:"Help",active:!0,onClick:()=>n(!0)},r.a.createElement(F,null))),r.a.createElement(h.a,null,r.a.createElement(M,{name:"Contact Us",active:!0,onClick:U},r.a.createElement(S,null))))))),r.a.createElement(H,{show:t,onHide:()=>n(!1)}))},G=n(52);var Z=function(e){return t=>{t.stopPropagation(),e(t)}},_=n(8),J=n(16);function X(e){return!Object(C.a)(e)&&e.length>0}class Y extends a.Component{constructor(e){super(e),this.increment=()=>{this.setState(e=>{const{x:t}=e;return{x:t+1}})},this.graphicElements=()=>{const{imageURL:e,imageHeight:t,imageWidth:n,annotations:a}=this.props;if(!Object(C.a)(e)){const{x:i,y:o,h:s,w:c}=function(e,t){if(t>e){const n=100,a=Math.floor(e/t*100),r=0;return{h:n,w:a,x:Math.floor((100-a)/2),y:r}}{const n=100,a=Math.floor(t/e*100);return{h:a,w:n,x:0,y:Math.floor((100-a)/2)}}}(n,t);let l=[r.a.createElement("rect",{x:"0",y:"0",width:"100",height:"100",fill:"gray","fill-opacity":"0.5"}),r.a.createElement("image",{href:e,x:i,y:o,height:s,width:c})];l=l.concat(a.map((e,t)=>function(e,t,n){if(Object(C.a)(e))return r.a.createElement(r.a.Fragment,null);const{selected:a}=n,i=a.includes(t)?"red":"cyan",{type:o}=e;if("point"===o){const{x:t,y:n}=e,a={x1:t-.5,y1:n,x2:t+.5,y2:n},o={x1:t,y1:n-.5,x2:t,y2:n+.5};return r.a.createElement("g",null,r.a.createElement("line",Object.assign({},a,{stroke:i,strokeWidth:"0.5",strokeLinecap:"round"})),r.a.createElement("line",Object.assign({},o,{stroke:i,strokeWidth:"0.5",strokeLinecap:"round"})))}{const{x:a,y:o,width:s,height:c}=e,l={stroke:i,strokeWidth:"0.8",strokeLinecap:"round"};return r.a.createElement("g",{key:"annotation-".concat(t),draggable:"true",onMouseDown:Z(a=>n.onDragStartRect(a,e,t)),onMouseMove:Z(a=>n.onDragRect(a,e,t)),onMouseUp:Z(a=>n.onDragEndRect(a,e,t)),onClick:Z(a=>n.onClickRect(a,e,t))},r.a.createElement("line",Object.assign({x1:a,y1:o,x2:a+.5,y2:o},l)),r.a.createElement("line",Object.assign({x1:a,y1:o,x2:a,y2:o+.5},l)),r.a.createElement("line",Object.assign({x1:a+s,y1:o,x2:a+s-.5,y2:o},l)),r.a.createElement("line",Object.assign({x1:a+s,y1:o,x2:a+s,y2:o+.5},l)),r.a.createElement("line",Object.assign({x1:a,y1:o+c,x2:a+.5,y2:o+c},l)),r.a.createElement("line",Object.assign({x1:a,y1:o+c,x2:a,y2:o+c-.5},l)),r.a.createElement("line",Object.assign({x1:a+s,y1:o+c,x2:a+s-.5,y2:o+c},l)),r.a.createElement("line",Object.assign({x1:a+s,y1:o+c,x2:a+s,y2:o+c-.5},l)),r.a.createElement("rect",{x:a,y:o,width:s,height:c,style:{fill:i,fillOpacity:.3,stroke:i,strokeDasharray:"1,1",strokeWidth:.2}}))}}(e,t,this.props)));const h=r.a.createElement("g",{onClick:Z(e=>this.props.onClickCross())},r.a.createElement("rect",{x:"95",y:"0",width:"5",height:"5",fill:"#999999",rx:"1",ry:"1"}),r.a.createElement("line",{x1:"96.5",y1:"1.5",x2:"98.5",y2:"3.5",stroke:"#666666",strokeWidth:"0.5",strokeLinecap:"round"}),r.a.createElement("line",{x1:"98.5",y1:"1.5",x2:"96.5",y2:"3.5",stroke:"#666666",strokeWidth:"0.5",strokeLinecap:"round"}));return l.push(h),l}const{paths:i,defs:o}=this.props.graphic,s=i.map((e,t)=>r.a.createElement("g",{key:"path-group-".concat(t)},function(e,t,n){const{onClick:a,onPointerOver:i,onPointerLeave:o}=n;return r.a.createElement(e.tagName,{...e.properties,id:"path-".concat(t),onClick:Z(e=>a(e,t)),onPointerOver:Z(()=>i(t)),onPointerLeave:Z(()=>o(t))})}(e,t,this.props),function(e,t,n,a){const{graph:i,selected:o,hover:s,highlight:c}=n,l=o.map(e=>i.nodes[e].paths).flat();if(!X(c)&&!l.includes(t)&&!s.includes(t))return null;const{onClick:h}=n;let d="none";X(c)&&c.includes(t)?d=u(f,y(a)):l.includes(t)?d=u(g,1):s.includes(t)&&(d=u(g,.6));const p=Object(_.e)("fill",e.properties)?d:"none",m=Object(_.e)("stroke",e.properties)?d:"none";return r.a.createElement(e.tagName,{...e.properties,id:"cover-element",fill:p,stroke:m,onClick:Z(e=>h(e,t))})}(e,t,this.props,this.state.x)));return"undefined"!==typeof o&&s.splice(0,0,Object(J.a)(o)),s},this.state={x:0},X(e.highlight)&&(this.counter=setInterval(this.increment,40))}componentDidUpdate(e){const{highlight:t}=this.props;!X(e.highlight)&&X(t)?this.counter=setInterval(this.increment,40):X(e.highlight)&&!X(t)&&clearInterval(this.counter,40)}componentWillUnmount(){clearInterval(this.counter)}render(){const{svg:e}=this.props.graphic,t=this.graphicElements();return r.a.createElement(e.tagName,{...e.properties,id:"svg-element",onClick:this.props.onClick,onMouseOver:this.props.onMouseOverSvg,style:{cursor:"grab"}},t)}}var K,q,z=Y,Q=n(9);n(45);function V(e){const{width:t,height:n}=Object(_.d)(e.svg.properties),a=100/(8*e.paths.length);return function(e,t){let n=Object(Q.cloneDeep)(e);return n=function(e){const{nodes:t}=e;for(let n=0;n<t.length;n++){const e=t[n];e.fill=e.contracted?e.contractedGroup:v.group}return e}(n),n=function(e,t){const{nodes:n}=e;for(let a=0;a<n.length;a++){const r=n[a];r.radius=$(r,e,t)}return e}(n,t),n}({nodes:e.paths.map((r,i)=>{const o=Math.random()*t,s=Math.random()*n,c=e.bboxes[i].width,l=e.bboxes[i].height;return{id:i,x:o,y:s,type:"path",fill:"#f3f9fb",radius:a+c*l/(t*n)*a,paths:[i],children:[],visible:1}}),links:[]},e)}function $(e,t,n){const a=e.paths,{bboxes:r,svg:i}=n,{nodes:o}=t,s=a.map(e=>r[e]),c=Object(_.b)(s),l=Object(_.d)(i.properties),h=Math.min(c.height/l.height,c.width/l.width),d=o.filter(e=>ee(e.id,t)).length,p=Math.sqrt(Math.max(9,100/d));return p+h*p}function ee(e,t){return"undefined"===typeof t.nodes[e].parent}function te(){return(te=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e}).apply(this,arguments)}const ne=e=>{let{svgRef:t,title:n,...a}=e;return r.a.createElement("svg",te({width:16,height:16,viewBox:"0 0 16 16",ref:t},a),n?r.a.createElement("title",null,n):null,K||(K=r.a.createElement("defs",null)),q||(q=r.a.createElement("g",{id:"g17",transform:"matrix(0.5180123 0 0 0.5180123 0.2188727 0.12047707)"},r.a.createElement("path",{id:"path1",fill:"#000000",stroke:"none",d:"M 26.311 23.224 C 25.499 21.808 24.239002 20.849 22.909 20.488 C 21.858 20.201 20.768 20.289 19.825 20.822 L 17.02 15.918 C 18.756 12.455 22.653 4.691 23.352 3.467 C 24.258 1.884 22.637 0 22.637 0 L 15.277001 12.872 L 7.919 0 C 7.919 0 6.299 1.884 7.204 3.466 C 7.904 4.691 11.802001 12.454 13.536 15.917 L 10.732 20.821 C 9.789 20.288 8.697 20.2 7.648 20.487 C 6.316 20.848 5.057 21.807 4.245 23.223 C 2.787 25.769999 3.344 28.825 5.484 30.05 C 6.433 30.595001 7.532 30.682 8.591 30.395 C 9.92 30.032 11.182001 29.073002 11.993 27.659998 C 12.348 27.036 12.583 26.383 12.703 25.733997 L 12.703 25.735003 C 12.704 25.73 12.704 25.725 12.709 25.72 C 12.716 25.665998 12.726 25.612 12.731 25.552998 C 13.332999 21.514 14.471001 19.451 15.276 18.449 C 16.083 19.451 17.222 21.513 17.823 25.552998 C 17.829 25.612 17.839 25.665998 17.844 25.72 C 17.848 25.725 17.848 25.73 17.85 25.735003 L 17.85 25.733997 C 17.971 26.382 18.205 27.036 18.559 27.659998 C 19.371 29.073002 20.633 30.032 21.963001 30.395 C 23.021997 30.682 24.121 30.595001 25.072 30.05 C 27.213 28.825 27.768 25.771 26.311 23.224 Z M 9.911 26.468 C 9.451 27.271 8.722 27.876 7.963 28.083 C 7.6249995 28.175 7.129 28.231 6.674 27.97 C 5.704 27.415 5.5450006 25.784 6.328 24.414001 C 6.796 23.602 7.505 23.011 8.278 22.8 C 8.613 22.709 9.109 22.653997 9.566 22.913 C 10.537 23.469997 10.695 25.097 9.911 26.468 Z M 23.881 27.97 C 23.425999 28.232 22.932 28.175 22.594 28.083 C 21.834 27.876 21.106 27.271 20.645 26.468 C 19.862 25.097 20.02 23.469997 20.991 22.913 C 21.448 22.653 21.944 22.709 22.28 22.8 C 23.051 23.011 23.762 23.602 24.227001 24.414001 C 25.01 25.784 24.852 27.415 23.881 27.97 Z"}))))},ae=r.a.forwardRef((e,t)=>r.a.createElement(ne,te({svgRef:t},e)));n.p;const re=[{type:"TOP_LEFT",move:"corner"},{type:"TOP",move:"edge"},{type:"TOP_RIGHT",move:"corner"},{type:"LEFT",move:"edge"},{type:"WHOLE",move:"rect"},{type:"RIGHT",move:"edge"},{type:"BOTTOM_LEFT",move:"corner"},{type:"BOTTOM",move:"edge"},{type:"BOTTOM_RIGHT",move:"corner"}];function ie(e,t){const{x:n,y:a}=e,{x:r,y:i,width:o,height:s}=t,c=(n-r)/o,l=(a-i)/s;return re[3*(l<.2?0:l>.8?2:1)+(c<.2?0:c>.8?2:1)]}function oe(e,t){const{initAnnotation:n,initClick:a,dragType:r}=t,{x:i,y:o}=a,{x:s,y:c,width:l,height:h}=n;if("rect"===r.move){const t=s-i,n=c-o;return{x:e.x+t,y:e.y+n,width:l,height:h}}if("corner"===r.move){let t,n,a,d;switch(r.type){case"TOP_LEFT":a=s,d=c,t=s+l,n=c+h;break;case"TOP_RIGHT":a=s+l,d=c,t=s,n=c+h;break;case"BOTTOM_LEFT":a=s,d=c+h,t=s+l,n=c;break;case"BOTTOM_RIGHT":a=s+l,d=c+h,t=s,n=c;break;default:a=d=t=n=0}const p=a-i,m=d-o;return a=e.x+p,d=e.y+m,function(e,t,n,a){return{width:Math.abs(n-e),height:Math.abs(a-t),x:Math.min(n,e),y:Math.min(a,t)}}(a,d,t,n)}if("LEFT"===r.type){const t=s-i,n=e.x+t;return{x:n,y:c,width:s+l-n,height:h}}if("RIGHT"===r.type){const t=s+l-i;return{x:s,y:c,width:e.x+t-s,height:h}}if("TOP"===r.type){const t=c-o,n=e.y+t;return{x:s,y:n,width:l,height:c+h-n}}{const t=c+h-o;return{x:s,y:c,width:l,height:e.y+t-c}}}class se extends a.Component{constructor(e){super(e),this.handleFileChange=e=>{const t=e.target.files[0];if(t){const e=URL.createObjectURL(t),n=Object(_.f)('<svg height="100" width="100"></svg>');this.setState({selectedFile:t,imageURL:e,graphic:n});const a=new Image;a.onload=()=>{this.setState({imageWidth:a.width,imageHeight:a.height})},a.src=e}},this.openFileDialog=()=>{this.fileInputRef.current.click()},this.handleDragOver=e=>{e.preventDefault()},this.handleDrop=e=>{e.preventDefault();const t=e.dataTransfer.files;t.length&&this.handleFiles(t)},this.handleFiles=e=>{},this.handleKeyPress=e=>{"Backspace"!==e.key&&"Delete"!==e.key||this.setState(e=>{const{selected:t,annotations:n}=e;let a=Object(Q.cloneDeep)(n);for(let r=0;r<t.length;r++)a[t[r]]=void 0;return{annotations:a,selected:[]}})},this.tryNotifyParent=e=>{const{notifyParent:t}=this.props;Object(C.a)(t)||t(e)},this.uploadImageAndClick=(e,t,n)=>{this.setState({nothingIn:!0});const a=new FormData;a.append("image",e),a.append("click",JSON.stringify(t)),fetch(this.props.target,{method:"POST",body:a}).then(e=>e.json()).then(e=>{this.setState(t=>{const{annotations:a}=t;let r=Object(Q.cloneDeep)(a);return r[n]=void 0,r.push({type:"rectangle",...e}),{nothingIn:!1,annotations:r}})})},this.handleClick=e=>{const t=e.clientX,n=e.clientY;this.setState(e=>{const{annotations:a,dragActive:r,selectedFile:i}=e;if(Object(C.a)(i))this.openFileDialog();else if(!r){const r=Object(_.a)("svg-element",t,n),i=[...a,{type:"point",...r}];return this.uploadImageAndClick(e.selectedFile,r,a.length),{annotations:i}}})},this.handleMouseOverSvg=e=>{const t=Object(_.a)("svg-element",e.clientX,e.clientY);this.setState(e=>{const{dragActive:n}=e;if(n){const{clickRegistry:n,annotations:a}=e,r=Object(Q.cloneDeep)(a);return r[n.index]=oe(t,n),{annotations:r,cursorMoved:!0}}})},this.handlePointerOver=e=>{},this.handlePointerLeave=e=>{},this.handleCropClick=e=>{const{selectedFile:t,annotations:n}=this.state;let a=n.filter(e=>!Object(C.a)(e));const r=new FormData;r.append("image",t),r.append("annot",JSON.stringify(a)),fetch("/cropper",{method:"POST",body:r}).then(e=>e.blob()).then(e=>{const t=window.URL.createObjectURL(new Blob([e])),n=document.createElement("a");n.href=t,n.setAttribute("download","crops.zip"),document.body.appendChild(n),n.click(),n.parentNode.removeChild(n),window.URL.revokeObjectURL(t)})},this.handleDragStartRect=(e,t,n)=>{const a=Object(_.a)("svg-element",e.clientX,e.clientY);this.setState(e=>{const{dragActive:r}=e;if(r)return{};return{clickRegistry:{dragType:ie(a,t),initClick:a,initAnnotation:t,index:n},dragActive:!0}})},this.handleDragRect=(e,t,n)=>{const a=Object(_.a)("svg-element",e.clientX,e.clientY);this.setState(e=>{const{dragActive:t,clickRegistry:n,annotations:r}=e;if(t){const e=Object(Q.cloneDeep)(r);return e[n.index]=oe(a,n),{annotations:e,cursorMoved:!0}}})},this.handleClickRect=(e,t,n)=>{this.setState(e=>{const{selected:t,cursorMoved:a}=e;if(!a)return t.includes(n)?{selected:t.filter(e=>e!==n)}:{selected:[...t,n]}})},this.handleDragEndRect=(e,t,n)=>{this.setState(e=>(e.cursorMoved&&setTimeout(()=>{this.setState({cursorMoved:!1})},100),{clickRegistry:void 0,dragActive:!1}))},this.handleClear=e=>{if(function(e){const{disableClear:t}=e;return!Object(C.a)(t)&&t}(this.props))return;this.setState({selected:[]}),this.tryNotifyParent({type:"clear"})};const t=Object(_.f)('<svg height="100" width="100"></svg>'),n=V(t);this.fileInputRef=r.a.createRef(),this.state={graphic:t,graph:n,hover:[],selected:[],filename:"",svgString:'<svg height="100" width="100"></svg>',nothingIn:!1,imageURL:void 0,imageWidth:void 0,imageHeight:void 0,selectedFile:void 0,annotations:[],clickRegistry:void 0,dragActive:!1,cursorMoved:!1}}componentDidMount(){fetch("/upload.svg").then(e=>e.text()).then(e=>this.setState({graphic:Object(_.f)(e)})),window.addEventListener("click",this.handleClear),window.addEventListener("keydown",this.handleKeyPress)}componentWillUnmount(){if(!Object(C.a)(this.props.setHighlight)){const{setHighlight:e,setShowNext:t}=this.props;e(!1),t(!1)}window.removeEventListener("click",this.handleClear),window.removeEventListener("keydown",this.handleKeyPress)}render(){let{highlightSvg:e,highlightGroup:t,highlightGraph:n}=this.props;return this.state.nothingIn?r.a.createElement(l.a,{className:"py-3 align-items-center"},r.a.createElement(h.a,{className:"d-flex justify-content-center"},r.a.createElement(G.a,{animation:"border",role:"status"},r.a.createElement("span",{className:"visually-hidden"},"Loading...")))):(Object(C.a)(e)&&(e=[]),Object(C.a)(n)&&(n=[]),Object(C.a)(t)&&(t=!1),r.a.createElement(r.a.Fragment,null,r.a.createElement("input",{ref:this.fileInputRef,type:"file",onChange:this.handleFileChange,style:{display:"none"}}),r.a.createElement(l.a,{className:"mt-2 mb-4"},r.a.createElement(h.a,{className:"d-flex justify-content-center"},r.a.createElement(z,{graphic:this.state.graphic,graph:this.state.graph,imageWidth:this.state.imageWidth,imageHeight:this.state.imageHeight,imageURL:this.state.imageURL,selected:this.state.selected,annotations:this.state.annotations,hover:this.state.hover,onClick:this.handleClick,onPointerOver:this.handlePointerOver,onPointerLeave:this.handlePointerLeave,highlight:e,onDragStartRect:this.handleDragStartRect,onDragRect:this.handleDragRect,onDragEndRect:this.handleDragEndRect,onClickRect:this.handleClickRect,onMouseOverSvg:this.handleMouseOverSvg,onClickCross:this.props.onClickCross}))),r.a.createElement(l.a,{className:"border-top"},r.a.createElement(h.a,null,r.a.createElement(M,{name:"Crop",active:!0,onClick:this.handleCropClick},r.a.createElement(ae,null))))))}}var ce=se;class le extends a.Component{constructor(e){super(e),this.handleCrossClick=()=>{this.setState(e=>(setTimeout(()=>{this.setState({crossClicked:!1})},200),{crossClicked:!0}))},this.state={crossClicked:!1}}render(){const{crossClicked:e}=this.state;return r.a.createElement(r.a.Fragment,null,r.a.createElement(A,null),r.a.createElement(s.a,{id:"app-container"},r.a.createElement(l.a,{className:"slide-content"},e?r.a.createElement(r.a.Fragment,null):r.a.createElement(ce,{target:"/inference",onClickCross:this.handleCrossClick}))))}}var he=le;class de extends a.Component{render(){return r.a.createElement(he,null)}}var pe=de;n(50),n(46);o.a.render(r.a.createElement(pe,null),document.getElementById("root"))},7:function(e,t,n){"use strict";function a(e){return"undefined"===typeof e}n.d(t,"a",(function(){return a}))},8:function(e,t,n){"use strict";n.d(t,"d",(function(){return c})),n.d(t,"f",(function(){return d})),n.d(t,"b",(function(){return p})),n.d(t,"c",(function(){return m})),n.d(t,"a",(function(){return u})),n.d(t,"e",(function(){return g}));const a=["circle","ellipse","image","line","mesh","path","polygon","polyline","rect","text","use"];var r=n(43),i=n(16);function o(e){return"string"===typeof e?e.replace(/\D/g,""):e}function s(e){return e.split(/ |,|, /).map(parseFloat)}function c(e){let t,n;if(e.height&&(t=o(e.height)),e.width&&(n=o(e.width)),!e.height&&!e.width){const a=s(e.viewBox);n=a[2]-a[0],t=a[3]-a[1]}return{width:n,height:t}}function l(e,t){const n=document.createElementNS("http://www.w3.org/2000/svg","svg");n.setAttribute("id","temp-svg"),document.body.appendChild(n);const a=document.createElementNS("http://www.w3.org/2000/svg",e.tagName);for(const d in e.properties)a.setAttribute(d,e.properties[d]);n.appendChild(a);const r=n.lastChild.getBoundingClientRect(),{x:i,y:o,height:s,width:c}=r,l=u("temp-svg",i,o),h=function(e,t,n){const a=document.getElementById(e).getScreenCTM();return{width:t/a.a,height:n/a.d}}("temp-svg",c,s);return n.removeChild(a),n.remove(),{...l,...h}}function h(e){return 0===e.width&&0===e.height}function d(e){const t=Object(r.a)(e).children[0];let{svg:n,paths:c,defs:d}=function(e){let t=[],n=[],r=void 0;const i=e=>{if("defs"===e.tagName)return void(r=e);t.push(e.properties);const o=t.reduceRight((function(e,t){return{...t,...e}}));let{children:s,...c}=e;(a.includes(c.tagName)||"svg"===c.tagName)&&(c.properties=o,n.push(c)),s.forEach(i),t.pop()};i(e);const o=n.slice(1);return{svg:n[0],paths:o,defs:r}}(t),p=c.map(e=>l(e,n.properties.viewBox));return c=c.filter((e,t)=>!h(p[t])),p=p.filter(e=>!h(e)),n=Object(i.b)(n),"undefined"!==typeof d&&(d=function e(t,n){return(t=n(t)).children&&(t.children=t.children.map(t=>e(t,n))),t}(d,i.b)),c=c.map(i.b),function(e){let{svg:t,paths:n,bboxes:a,defs:r}=e;if(t.properties.viewBox){const e=s(t.properties.viewBox);e[2]<e[3]?t.properties.viewBox="".concat(e[0]-(e[3]-e[2])/2," ").concat(e[1]," ").concat(e[3]," ").concat(e[3]):t.properties.viewBox="".concat(e[0]," ").concat(e[1]-(e[2]-e[3])/2," ").concat(e[2]," ").concat(e[2])}if(t.properties.height&&t.properties.width){const e=o(t.properties.height),n=o(t.properties.width),a=Math.max(e,n);t.properties.height=a,t.properties.width=a,t.properties.viewBox="0 0 ".concat(a," ").concat(a)}return{svg:t,paths:n,bboxes:a,defs:r}}({svg:n,paths:c,bboxes:p,defs:d})}function p(e){const t=Math.min(...e.map(e=>e.x)),n=Math.min(...e.map(e=>e.y)),a=Math.max(...e.map(e=>e.x+e.width));return{x:t,y:n,height:Math.max(...e.map(e=>e.y+e.height))-n,width:a-t}}function m(e,t){const n=e.x-t.x,a=e.y-t.y;return Math.sqrt(n*n+a*a)}function u(e,t,n){const a=document.getElementById(e).getScreenCTM();return{x:(t-a.e)/a.a,y:(n-a.f)/a.d}}function g(e,t){return"undefined"===typeof t[e]?"undefined"===typeof t.style||"none"!==t.style[e].toLowerCase():"none"!==t[e].toLowerCase()}}},[[57,2,0,5]]]);
//# sourceMappingURL=index.abb9dc33.chunk.js.map