var te=Object.defineProperty;var re=(s,e,n)=>e in s?te(s,e,{enumerable:!0,configurable:!0,writable:!0,value:n}):s[e]=n;var _=(s,e,n)=>(re(s,typeof e!="symbol"?e+"":e,n),n);import{w as se,S as E,i as A,s as W,e as v,t as I,a as T,b as N,c as B,d as k,f as z,l as O,g as j,n as C,h as b,j as $,k as ne,m as D,o as w,p as M,q as G,r as S,u as H,v as V,x as F,y as K,z as J,A as ie}from"./vendor.4c4986fe.js";const oe=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const i of t)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function n(t){const i={};return t.integrity&&(i.integrity=t.integrity),t.referrerpolicy&&(i.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?i.credentials="include":t.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function r(t){if(t.ep)return;t.ep=!0;const i=n(t);fetch(t.href,i)}};oe();class L{constructor(e,n){this.row=e,this.column=n}static isEqual(e,n){return e.row===n.row&&e.column===n.column}}function d(s,e){return new L(s,e)}function ae(s,e,n,r,t,i){return{rows:s,columns:e,start:{pieces:{white:n.map(o=>d(o[0],o[1])),black:r.map(o=>d(o[0],o[1]))},color:t,action:i}}}function R(s,e){for(let n=0;n<s.length;n++)for(let r=0;r<s[n].length;r++)e(s[n][r],n,r)}function U(s,e,n){const r=new Array(s);for(let t=0;t<s;t++){r[t]=new Array(e);for(let i=0;i<e;i++)r[t][i]=n}return r}var f;(function(s){s[s.Empty=0]="Empty",s[s.WhitePiece=1]="WhitePiece",s[s.BlackPiece=2]="BlackPiece",s[s.Card=3]="Card"})(f||(f={}));class le{constructor(e,n){_(this,"rows");_(this,"columns");_(this,"squareTypes");this.rows=e,this.columns=n,this.squareTypes=U(e,n,f.Empty)}getTypeAt(e){return this.squareTypes[e.row][e.column]}setSquareType(e,n){this.squareTypes[e.row][e.column]=n}forEachSquareType(e){R(this.squareTypes,(n,r,t)=>{e(n,d(r,t))})}movePiece(e,n){this.setSquareType(n,this.getTypeAt(e)),this.setSquareType(e,f.Empty)}getQueenPositions(){const e={white:[],black:[]};return this.forEachSquareType((n,r)=>{n===f.WhitePiece?e.white.push(r):n===f.BlackPiece&&e.black.push(r)}),e}}function ce(s,e){for(const n of e)if(s.row===n.row&&s.column===n.column)return!0;return!1}function Q(s,e){const n=[];for(let r=e.row-1;r>-1;r--){const t=d(r,e.column);if(s.getTypeAt(t)!==f.Empty)break;n.push(t)}for(let r=e.row+1;r<s.rows;r++){const t=d(r,e.column);if(s.getTypeAt(t)!==f.Empty)break;n.push(t)}for(let r=e.column-1;r>-1;r--){const t=d(e.row,r);if(s.getTypeAt(t)!==f.Empty)break;n.push(t)}for(let r=e.column+1;r<s.columns;r++){const t=d(e.row,r);if(s.getTypeAt(t)!==f.Empty)break;n.push(t)}for(let r=e.row-1,t=e.column-1;r>-1&&t>-1;r--,t--){const i=d(r,t);if(s.getTypeAt(i)!==f.Empty)break;n.push(i)}for(let r=e.row-1,t=e.column+1;r>-1&&t<s.columns;r--,t++){const i=d(r,t);if(s.getTypeAt(i)!==f.Empty)break;n.push(i)}for(let r=e.row+1,t=e.column-1;r<s.rows&&t>-1;r++,t--){const i=d(r,t);if(s.getTypeAt(i)!==f.Empty)break;n.push(i)}for(let r=e.row+1,t=e.column+1;r<s.rows&&t<s.columns;r++,t++){const i=d(r,t);if(s.getTypeAt(i)!==f.Empty)break;n.push(i)}return n}var y;(function(s){s[s.White=0]="White",s[s.Black=1]="Black"})(y||(y={}));var q;(function(s){s[s.Piece=0]="Piece",s[s.Card=1]="Card"})(q||(q={}));class ue{constructor(e){_(this,"gameSettings");_(this,"boardData");_(this,"turn",{color:void 0,action:void 0});_(this,"winner");this.gameSettings=e,this.reset()}reset(){this.boardData=new le(this.gameSettings.rows,this.gameSettings.columns);for(const e of this.gameSettings.start.pieces.white)this.boardData.setSquareType(e,f.WhitePiece);for(const e of this.gameSettings.start.pieces.black)this.boardData.setSquareType(e,f.BlackPiece);this.turn.color=this.gameSettings.start.color,this.turn.action=this.gameSettings.start.action,this.winner=this.getWinner()}nextTurn(){this.turn.color=this.turn.color===1?0:1,this.turn.color===this.gameSettings.start.color&&(this.turn.action=this.turn.action===1?0:1),this.winner=this.getWinner()}getWinner(){const e=this.boardData.getQueenPositions();let n=!0,r=!0;for(const t of e.white)if(Q(this.boardData,t).length!==0){n=!1;break}for(const t of e.black)if(Q(this.boardData,t).length!==0){r=!1;break}return n&&r?this.turn.color===0?1:0:n?1:r?0:null}}const fe=ae(8,8,[[0,2],[0,4]],[[7,3],[7,5]],y.White,q.Piece),P=se(new ue(fe));function he(s){let e,n,r,t;return{c(){e=v("div"),n=I(s[2]),T(e,"class","square svelte-1tz948c"),N(e,"--squareSize",s[1]+"rem"),B(e,"black",s[0].isBlack),B(e,"highlight",s[3]),B(e,"card",s[4])},m(i,o){k(i,e,o),z(e,n),r||(t=O(e,"click",s[5]),r=!0)},p(i,[o]){o&4&&j(n,i[2]),o&2&&N(e,"--squareSize",i[1]+"rem"),o&1&&B(e,"black",i[0].isBlack),o&8&&B(e,"highlight",i[3]),o&16&&B(e,"card",i[4])},i:C,o:C,d(i){i&&b(e),r=!1,t()}}}function ge(s,e,n){let r,t;$(s,P,g=>n(8,t=g));let{squareData:i}=e,{squareSize:o=5}=e,l="",a=!1,c=!1;const p=g=>{n(3,a=g)},u=g=>{switch(n(4,c=g===f.Card),g){case f.Empty:case f.Card:n(2,l="");break;case f.WhitePiece:n(2,l="\u2655");break;case f.BlackPiece:n(2,l="\u265B");break}return g},m=ne(),h=()=>{m("square-click",{position:d(i.row,i.column),squareType:r})};return s.$$set=g=>{"squareData"in g&&n(0,i=g.squareData),"squareSize"in g&&n(1,o=g.squareSize)},s.$$.update=()=>{s.$$.dirty&257&&(r=u(t.boardData.squareTypes[i.row][i.column]))},[i,o,l,a,c,h,p,u,t]}class me extends E{constructor(e){super();A(this,e,ge,he,W,{squareData:0,squareSize:1,setHighlight:6,setType:7})}get setHighlight(){return this.$$.ctx[6]}get setType(){return this.$$.ctx[7]}}function X(s,e,n){const r=s.slice();return r[8]=e[n],r[9]=e,r[10]=n,r}function Y(s,e,n){const r=s.slice();return r[8]=e[n],r[11]=e,r[12]=n,r}function Z(s){let e,n=s[10],r=s[12],t;const i=()=>s[6](e,n,r),o=()=>s[6](null,n,r);let l={squareData:{isBlack:s[3](s[10],s[12]),column:s[12],row:s[10]},squareSize:s[0]};return e=new me({props:l}),i(),e.$on("square-click",s[7]),{c(){M(e.$$.fragment)},m(a,c){G(e,a,c),t=!0},p(a,c){(n!==a[10]||r!==a[12])&&(o(),n=a[10],r=a[12],i());const p={};c&1&&(p.squareSize=a[0]),e.$set(p)},i(a){t||(w(e.$$.fragment,a),t=!0)},o(a){S(e.$$.fragment,a),t=!1},d(a){o(),H(e,a)}}}function x(s){let e,n,r,t=Array(s[2].boardData.columns),i=[];for(let l=0;l<t.length;l+=1)i[l]=Z(Y(s,t,l));const o=l=>S(i[l],1,1,()=>{i[l]=null});return{c(){e=v("div");for(let l=0;l<i.length;l+=1)i[l].c();n=D(),T(e,"class","row svelte-1q7kgo4")},m(l,a){k(l,e,a);for(let c=0;c<i.length;c+=1)i[c].m(e,null);z(e,n),r=!0},p(l,a){if(a&15){t=Array(l[2].boardData.columns);let c;for(c=0;c<t.length;c+=1){const p=Y(l,t,c);i[c]?(i[c].p(p,a),w(i[c],1)):(i[c]=Z(p),i[c].c(),w(i[c],1),i[c].m(e,n))}for(V(),c=t.length;c<i.length;c+=1)o(c);F()}},i(l){if(!r){for(let a=0;a<t.length;a+=1)w(i[a]);r=!0}},o(l){i=i.filter(Boolean);for(let a=0;a<i.length;a+=1)S(i[a]);r=!1},d(l){l&&b(e),K(i,l)}}}function pe(s){let e,n,r=Array(s[2].boardData.rows),t=[];for(let o=0;o<r.length;o+=1)t[o]=x(X(s,r,o));const i=o=>S(t[o],1,1,()=>{t[o]=null});return{c(){e=v("div");for(let o=0;o<t.length;o+=1)t[o].c();T(e,"class","board svelte-1q7kgo4")},m(o,l){k(o,e,l);for(let a=0;a<t.length;a+=1)t[a].m(e,null);n=!0},p(o,[l]){if(l&15){r=Array(o[2].boardData.rows);let a;for(a=0;a<r.length;a+=1){const c=X(o,r,a);t[a]?(t[a].p(c,l),w(t[a],1)):(t[a]=x(c),t[a].c(),w(t[a],1),t[a].m(e,null))}for(V(),a=r.length;a<t.length;a+=1)i(a);F()}},i(o){if(!n){for(let l=0;l<r.length;l+=1)w(t[l]);n=!0}},o(o){t=t.filter(Boolean);for(let l=0;l<t.length;l+=1)S(t[l]);n=!1},d(o){o&&b(e),K(t,o)}}}function de(s,e,n){let r;$(s,P,u=>n(2,r=u));let{squareSize:t=5}=e;const i=U(r.boardData.rows,r.boardData.columns),o=u=>{for(const m of u)i[m.row][m.column].setHighlight(!0)},l=()=>{R(i,(u,m,h)=>{u.setHighlight(!1)})},a=(u,m)=>u%2?!(m%2):!!(m%2);function c(u,m,h){J[u?"unshift":"push"](()=>{i[m][h]=u,n(1,i)})}function p(u){ie.call(this,s,u)}return s.$$set=u=>{"squareSize"in u&&n(0,t=u.squareSize)},[t,i,r,a,o,l,c,p]}class _e extends E{constructor(e){super();A(this,e,de,pe,W,{squareSize:0,highlightSquares:4,clearHighlights:5})}get highlightSquares(){return this.$$.ctx[4]}get clearHighlights(){return this.$$.ctx[5]}}function we(s){let e,n;return{c(){e=v("p"),n=I(s[0])},m(r,t){k(r,e,t),z(e,n)},p(r,[t]){t&1&&j(n,r[0])},i:C,o:C,d(r){r&&b(e)}}}function ke(s,e,n){let r,t;return $(s,P,i=>n(1,t=i)),s.$$.update=()=>{s.$$.dirty&2&&n(0,r=(()=>{if(t.winner===y.White)return"White won! \u{1F389}";if(t.winner===y.Black)return"Black won! \u{1F389}";let i="";return t.turn.color===y.White?i+="White is ":t.turn.color===y.Black&&(i+="Black is "),t.turn.action===q.Card?i+="placing a card...":t.turn.action===q.Piece&&(i+="moving a piece..."),i})())},[r,t]}class be extends E{constructor(e){super();A(this,e,ke,we,W,{})}}class ye{constructor(){_(this,"isSet",!1);_(this,"position");_(this,"validMoves",[])}set(e,n){this.isSet=!0,this.position=e,this.validMoves=Q(n,e)}unset(){this.isSet=!1,this.position=void 0,this.validMoves=[]}}function qe(s){let e,n,r,t,i,o,l,a,c,p={squareSize:3};return t=new _e({props:p}),s[3](t),t.$on("square-click",s[1]),o=new be({}),{c(){e=v("button"),e.textContent="New Game",n=D(),r=v("div"),M(t.$$.fragment),i=D(),M(o.$$.fragment),T(r,"class","board-container svelte-1gttu0h")},m(u,m){k(u,e,m),k(u,n,m),k(u,r,m),G(t,r,null),k(u,i,m),G(o,u,m),l=!0,a||(c=O(e,"click",s[2]),a=!0)},p(u,[m]){const h={};t.$set(h)},i(u){l||(w(t.$$.fragment,u),w(o.$$.fragment,u),l=!0)},o(u){S(t.$$.fragment,u),S(o.$$.fragment,u),l=!1},d(u){u&&b(e),u&&b(n),u&&b(r),s[3](null),H(t),u&&b(i),H(o,u),a=!1,c()}}}function ve(s,e,n){let r;$(s,P,h=>n(5,r=h));let t;const i=new ye;let o=!1;const l=()=>{P.update(h=>(h.nextTurn(),o=h.winner!==null,h))},a=h=>{i.set(h,r.boardData),t.highlightSquares(i.validMoves)},c=()=>{i.unset(),t.clearHighlights()},p=h=>{if(o)return;const{position:g,squareType:ee}=h.detail;switch(ee){case f.Empty:r.turn.action===q.Card&&(r.boardData.setSquareType(g,f.Card),l()),r.turn.action===q.Piece&&i.isSet&&(ce(g,i.validMoves)&&(r.boardData.movePiece(i.position,g),l()),c());break;case f.Card:i.isSet&&c();break;case f.WhitePiece:if(i.isSet&&L.isEqual(i.position,g)){c();break}c(),r.turn.action===q.Piece&&r.turn.color===y.White&&a(g);break;case f.BlackPiece:if(i.isSet&&L.isEqual(i.position,g)){c();break}c(),r.turn.action===q.Piece&&r.turn.color===y.Black&&a(g);break}},u=()=>{P.update(h=>(h.reset(),h)),o=!1};function m(h){J[h?"unshift":"push"](()=>{t=h,n(0,t)})}return[t,p,u,m]}class Se extends E{constructor(e){super();A(this,e,ve,qe,W,{})}}function Te(s){let e,n,r,t,i;return t=new Se({}),{c(){e=v("div"),n=v("h1"),n.textContent="Blackout",r=D(),M(t.$$.fragment),T(n,"class","svelte-1sm1ofw"),T(e,"class","container svelte-1sm1ofw")},m(o,l){k(o,e,l),z(e,n),z(e,r),G(t,e,null),i=!0},p:C,i(o){i||(w(t.$$.fragment,o),i=!0)},o(o){S(t.$$.fragment,o),i=!1},d(o){o&&b(e),H(t)}}}class Be extends E{constructor(e){super();A(this,e,null,Te,W,{})}}new Be({target:document.getElementById("app")});