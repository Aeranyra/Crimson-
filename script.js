document.addEventListener("DOMContentLoaded", startVN);

function startVN(){

/* =====================
   ELEMENTS
===================== */

const storyText=document.getElementById("storyText");
const choicesBox=document.getElementById("choices");
const endingBox=document.getElementById("ending");

const bgm=document.getElementById("bgm");
const clickSound=document.getElementById("clickSound");

const cursor=document.getElementById("cursor");

const menuScreen=document.getElementById("menuScreen");
const settingsPanel=document.getElementById("settingsPanel");

let musicStarted=false;
let currentChapter=0;

/* =====================
   BACKGROUNDS
===================== */

const backgrounds=[
"https://files.catbox.moe/g46u4p.jpg",
"https://files.catbox.moe/vcdxgl.jpg",
"https://files.catbox.moe/yqcxpl.jpg",
"https://files.catbox.moe/hxbdzl.jpg",
"https://files.catbox.moe/hnsx6c.jpg"
];

function setBG(i){
document.getElementById("bg").style.backgroundImage=`url(${backgrounds[i]})`;
}

/* =====================
   CURSOR (SAFE MOBILE)
===================== */

document.addEventListener("mousemove",(e)=>{
if(!cursor) return;
cursor.style.left=e.clientX+"px";
cursor.style.top=e.clientY+"px";
});

/* =====================
   MUSIC FIX (MOBILE)
===================== */

document.body.addEventListener("click",()=>{
if(!musicStarted){
bgm.volume=0.4;
bgm.play().catch(()=>{});
musicStarted=true;
}
},{once:true});

/* =====================
   STORY
===================== */

const story=[

/* PROLOGUE */
{
text:`🌙 Prologue — The Garden That Shouldn’t Exist`,
bg:0,
choices:[
{text:"Begin",note:`You step forward…`,next:1}
]
},

/* CHAPTER 1 */
{
text:`🌹 CHAPTER 1 — The Crimson Gate`,
bg:1,
choices:[
{
text:"Enter 🦋",
note:`You stepped inside without knowing what waited for you.`,
next:2,
path:"true"
},
{
text:"Turn back 🌙",
note:`Not everyone is meant to enter every garden.`,
next:2,
path:"neutral"
}
]
},

/* CHAPTER 2 */
{
text:`🦋 CHAPTER 2 — The Butterfly`,
bg:2,
choices:[
{
text:"Stay still 🌹",
note:`It trusted you enough to land.`,
next:3,
path:"true"
},
{
text:"Move away 🍂",
note:`It leaves quietly.`,
next:3,
path:"neutral"
}
]
},

/* CHAPTER 3 (FIXED BRACES) */
{
text:`🌙 CHAPTER 3 — The Locked Greenhouse`,
bg:3,
choices:[
{
text:"Ask 🔑",
note:`Curiosity is dangerous here.`,
next:4,
path:"neutral"
},
{
text:"Respect 🔒",
note:`Thank you.`,
next:4,
path:"true"
}
]
},

/* CHAPTER 4 */
{
text:`🌹 CHAPTER 4 — The Wilted Rose`,
bg:4,
choices:[
{
text:"Keep it 🌹",
note:`You stayed even when it lost its beauty.`,
next:5,
path:"true"
},
{
text:"Leave it 🍂",
note:`Even beautiful things fade.`,
next:5,
path:"neutral"
}
]
},

/* CHAPTER 5 */
{
text:`💌 CHAPTER 5 — The Unfinished Letter`,
bg:4,
choices:[
{
text:"Read 🌙",
note:`Every word feels like a risk.`,
next:6,
path:"neutral"
},
{
text:"Return 🕯",
note:`Not all stories are ready yet.`,
next:6,
path:"true"
}
]
},

/* CHAPTER 6 */
{
text:`🦋 CHAPTER 6 — The Empty Bench`,
bg:4,
choices:[
{
text:"Sit beside 💙",
note:`The bench was never lonely.`,
next:"end",
path:"true"
},
{
text:"Sit across 🌙",
note:`Even at a distance…`,
next:"end",
path:"neutral"
}
]
}
];

/* =====================
   LOAD CHAPTER
===================== */

function loadChapter(i){

endingBox.innerHTML="";
currentChapter=i;

const data=story[i];
setBG(data.bg);

storyText.textContent=data.text;
choicesBox.innerHTML="";

data.choices.forEach(c=>{

const btn=document.createElement("button");
btn.className="choice-btn";
btn.textContent=c.text;

btn.onclick=()=>{

clickSound?.play().catch(()=>{});

storyText.innerHTML=`<div class="choice-note">${c.note}</div>`;

setTimeout(()=>{

if(c.next==="end"){
finalLetter(c.path);
}else{
loadChapter(c.next);
}

},1300);

};

choicesBox.appendChild(btn);
});
}

/* =====================
   FINAL LETTER (FIXED)
===================== */

function finalLetter(path){

let endingBlock="";

if(path==="neutral"){
endingBlock=`
<h1>💔 Forgotten Ending</h1>
<p>Some people leave quietly.</p>
<p>And I never learn how to stop them.</p>
`;
}else{
endingBlock=`
<h1>💙 Devoted Ending</h1>
<p>You stayed… and I learned how to breathe again.</p>
`;
}

endingBox.innerHTML=`
<div class="letter">

${endingBlock}

<hr>

<h1>💌 The Butterfly That Stayed</h1>

<p>If you're reading this… you stayed.</p>

<p>I built this world because I was afraid…</p>

<p>But you stayed anyway.</p>

<p>And slowly… I stopped being alone.</p>

<h3>🦋 Poem</h3>

<p>
I built a garden out of fear…<br>
but you became the wind.
</p>

<p>I love you.</p>

</div>
`;
}

/* =====================
   START MENU
===================== */

menuScreen.style.display="flex";

document.getElementById("startBtn").onclick=()=>{
menuScreen.style.display="none";
loadChapter(0);
};

document.getElementById("continueBtn").onclick=()=>{
menuScreen.style.display="none";
loadChapter(parseInt(localStorage.getItem("save")||0));
};

document.getElementById("settingsBtn").onclick=()=>{
settingsPanel.classList.remove("hidden");
};

document.getElementById("closeSettings").onclick=()=>{
settingsPanel.classList.add("hidden");
};

document.getElementById("musicToggle").onchange=(e)=>{
bgm.muted=!e.target.checked;
};

document.getElementById("soundToggle").onchange=(e)=>{
clickSound.muted=!e.target.checked;
};

}
