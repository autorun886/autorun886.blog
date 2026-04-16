---
title: 技术成长轨迹
date: 2026-04-16 15:55:45
aside: false
top_img: false
---

<style>
/* 导航栏样式调整 - 降低对比度 */
#nav {
  background: rgba(15, 23, 42, 0.8) !important;
  backdrop-filter: blur(10px);
}

#nav .site-name,
#nav .menus_items .menus_item a {
  color: #94a3b8 !important;
}

#nav .menus_items .menus_item a:hover {
  color: #38bdf8 !important;
}

/* 隐藏主题的 footer */
#footer {
  display: none !important;
}

/* 强制覆盖主题样式，实现真正全屏 */
#page, #content-inner, .layout {
  background: #0f172a !important;
  padding: 0 !important;
  margin: 0 !important;
  max-width: 100% !important;
}

body {
  background: #0f172a !important;
}

/* 全屏容器 */
.tech-growth {
  position: relative;
  width: 100vw;
  margin-left: calc(-50vw + 50%);
  background: #0f172a;
  color: #e2e8f0;
  font-family: "Segoe UI", "PingFang SC", sans-serif;
  min-height: 100vh;
}

/* ===== header 星空背景 ===== */
.tech-growth header{
  position: relative;
  text-align: center;
  padding: 70px 20px;
  background: linear-gradient(135deg,#1e293b,#020617);
  overflow: hidden;
}

.tech-growth #starfield{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.tech-growth .header-content{
  position: relative;
  z-index: 1;
}

.tech-growth h1{font-size:3em;margin:0;color:#e2e8f0}
.tech-growth header p{color:#94a3b8}

/* ===== 时间线 ===== */
.tech-growth .timeline{position:relative;max-width:1200px;margin:40px auto;padding:20px}
.tech-growth .timeline::before{content:'';position:absolute;left:50%;width:2px;height:100%;background:#38bdf8}

.tech-growth .item{position:relative;width:100%;margin-bottom:40px;opacity:0;transform:translateY(40px);transition:.6s}
.tech-growth .item.show{opacity:1;transform:translateY(0)}

.tech-growth .node{position:absolute;left:50%;top:20px;width:12px;height:12px;background:#38bdf8;border-radius:50%;transform:translateX(-50%)}

.tech-growth .content{margin-left:calc(50% + 20px);background:#1e293b;border-radius:12px;padding:20px;box-shadow:0 10px 30px rgba(0,0,0,.3)}
.tech-growth .item:nth-child(even) .content{margin-left:0;margin-right:calc(50% + 20px)}

.tech-growth .time-title{color:#38bdf8;font-size:1.2em;margin-bottom:15px;font-weight:600;letter-spacing:.5px}

.tech-growth .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px}

.tech-growth .block{background:#0f172a;padding:12px;border-radius:8px}
.tech-growth .block h4{margin:0 0 6px;font-size:.9em;color:#38bdf8;display:flex;justify-content:space-between;align-items:center}
.tech-growth .level{font-size:.7em;color:#94a3b8}
.tech-growth .block p{margin:0;font-size:.85em;color:#cbd5f5}

.tech-growth .tag{display:inline-block;background:#38bdf8;color:#0f172a;padding:2px 6px;border-radius:5px;margin:2px;font-size:.75em}

.tech-growth .summary{margin-top:12px;padding:10px;border-left:3px solid #38bdf8;color:#94a3b8;font-size:.9em}

.tech-growth footer{text-align:center;padding:40px;color:#64748b}

@media (max-width: 768px) {
  .tech-growth .timeline::before{left:20px}
  .tech-growth .node{left:20px}
  .tech-growth .content{margin-left:50px !important;margin-right:0 !important}
  .tech-growth .item:nth-child(even) .content{margin-left:50px !important}
}
</style>

<div class="tech-growth">

<header>
<canvas id="starfield"></canvas>
<div class="header-content">
<h1>技术成长轨迹</h1>
</div>
</header>

<div class="timeline">

<div class="item">
<div class="node"></div>
<div class="content">
<h2 class="time-title">2020 · 初二</h2>
<div class="grid">
<div class="block">
<h4>语言基础 </h4>
<p><span class="tag">Python</span><span class="tag">Java</span><span class="tag">C</span><span class="tag">HTML</span></p>
</div>
<div class="block">
<h4>Web逆向入门 </h4>
<p>JS逆向 / 爬虫入门</p>
</div>
</div>
<div class="summary">对这一阶段的总结： 果然，人一闲下来什么事都做的出来，包括学计算机 w(ﾟДﾟ)w</div>
</div>
</div>

<div class="item">
<div class="node"></div>
<div class="content">
<h2 class="time-title">2025.09 · 大一上</h2>
<div class="grid">
<div class="block">
<h4>工程实践 </h4>
<p>Hexo + Butterfly / GitHub / Vercel / Markdown</p>
</div>
<div class="block">
<h4>语言扩展 </h4>
<p><span class="tag">Rust</span><span class="tag">Go</span><span class="tag">JavaScript</span></p>
</div>
<div class="block">
<h4>安卓逆向 </h4>
<p>Frida / IDA / Apatch Hook / Inline Hook / ARM汇编 / Angr符号执行</p>
</div>
<div class="block">
<h4>Web逆向 </h4>
<p>混淆对抗 / AST反混淆</p>
</div>
<div class="block">
<h4>基础设施 </h4>
<p>Linux / Docker / Git / CMake</p>
</div>
<div class="block">
<h4>网络协议 </h4>
<p>TLS底层协议</p>
</div>
<div class="block">
<h4>人工智能 </h4>
<p>词向量 / Transformer模型理论</p>
</div>
<div class="block">
<h4>接触框架 </h4>
<p>Unicorn / Unidbg / Keystone / Capstone / Traefik / eCapture</p>
</div>
</div>
<div class="summary">也算得上勉强入门了，学得很比较浅</div>
</div>
</div>

<div class="item">
<div class="node"></div>
<div class="content">
<h2 class="time-title">2026.03 · 大一下</h2>
<div class="grid">
<div class="block">
<h4>安卓逆向 </h4>
<p>深入Frida / IDA / LLDB / Unidbg / 静动态进阶</p>
</div>
<div class="block">
<h4>iOS逆向 </h4>
<p>环境搭建 / 砸壳 / Swift逆向</p>
</div>
<div class="block">
<h4>Web安全 </h4>
<p>XSS / SQL注入 / CSRF/SSRF / 文件上传与包含 / RCE / XXE</p>
</div>
<div class="block">
<h4>AI应用架构 </h4>
<p>ReAct / Plan-and-Execute / SuperVisor / MCP Server / RAG知识库</p>
</div>
</div>
<div class="summary">开始从"会用工具"走向"理解底层"，逐步具备实战能力。</div>
</div>
</div>

</div>

<footer>
<p>© 下一阶段：工程化 & 实战化</p>
</footer>

</div>

<script>
/* ===== 时间线动画 ===== */
const items=document.querySelectorAll('.tech-growth .item');
const observer=new IntersectionObserver(entries=>{
entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('show')}})
},{threshold:.15});
items.forEach(i=>observer.observe(i));

/* ===== 星空 + 彗星 ===== */
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

let stars = [];
let meteors = [];

const STAR_COUNT = 120;

function resize(){
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
}
resize();
window.addEventListener('resize', resize);

/* 星星初始化 */
function initStars(){
stars = [];
for(let i=0;i<STAR_COUNT;i++){
stars.push({
x: Math.random()*canvas.width,
y: Math.random()*canvas.height,
r: Math.random()*1.2,
v: Math.random()*0.3 + 0.05,
alpha: Math.random(),
delta: Math.random()*0.02 + 0.005
});
}
}
initStars();

/* 彗星 */
function createMeteor(){
return {
x: Math.random()*canvas.width,
y: -20,
vx: -(Math.random()*2 + 2),
vy: Math.random()*3 + 4,
len: Math.random()*80 + 80,
life: 0,
maxLife: 80
};
}

/* 低频生成 */
setInterval(()=>{
const rand = Math.random();

if(rand < 0.3){
meteors.push(createMeteor());
}

/* 稀有大彗星 */
if(rand < 0.08){
meteors.push({
x: canvas.width,
y: Math.random()*canvas.height*0.3,
vx: -6,
vy: 3,
len: 200,
life: 0,
maxLife: 120
});
}
}, 2000);

/* 渲染 */
function draw(){
ctx.clearRect(0,0,canvas.width,canvas.height);

/* 星星（带呼吸） */
stars.forEach(s=>{
s.alpha += s.delta;
if(s.alpha >= 1 || s.alpha <= 0.2){
s.delta *= -1;
}

ctx.fillStyle = `rgba(56,189,248,${s.alpha})`;

ctx.beginPath();
ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
ctx.fill();

s.y += s.v;
if(s.y > canvas.height){
s.y = 0;
s.x = Math.random()*canvas.width;
}
});

/* 彗星 */
meteors.forEach((m, i)=>{
m.x += m.vx;
m.y += m.vy;
m.life++;

const opacity = 1 - m.life / m.maxLife;

const gradient = ctx.createLinearGradient(
m.x, m.y,
m.x - m.vx * m.len/10,
m.y - m.vy * m.len/10
);

gradient.addColorStop(0, `rgba(56,189,248,${opacity})`);
gradient.addColorStop(1, "rgba(56,189,248,0)");

ctx.strokeStyle = gradient;
ctx.lineWidth = 2;

ctx.beginPath();
ctx.moveTo(m.x, m.y);
ctx.lineTo(
m.x - m.vx * m.len/10,
m.y - m.vy * m.len/10
);
ctx.stroke();

if(m.life > m.maxLife){
meteors.splice(i,1);
}
});

requestAnimationFrame(draw);
}

draw();
</script>
