document.addEventListener("DOMContentLoaded", startVN);

function startVN(){

/* =========================
   ELEMENTS
========================= */

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

/* =========================
   BACKGROUNDS
========================= */

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

/* =========================
   CURSOR
========================= */

document.addEventListener("mousemove",(e)=>{
if(!cursor) return;
cursor.style.left=e.clientX+"px";
cursor.style.top=e.clientY+"px";
});

/* =========================
   MOBILE AUDIO FIX
========================= */

document.body.addEventListener("click",()=>{
if(!musicStarted){
bgm.volume=0.4;
bgm.play().catch(()=>{});
musicStarted=true;
}
},{once:true});

/* =========================
   STORY ARRAY (YOUR OWN CONTENT)
========================= */

const story=[

/* PROLOGUE */
{
text:`🌙 Prologue — The Garden That Shouldn’t Exist`,
bg:0,
question:`Do you choose to enter this world?`,
choices:[
{text:"Begin",note:`🦋 The garden remembers every step.`,next:1}
]
},

/* CHAPTER 1 */
{
text:`🌹 CHAPTER 1 — The Crimson Gate`,
bg:1,
question:`Do you choose to step into the unknown?`,
choices:[
{
text:"Enter the garden 🦋",
note:`You stepped inside without knowing what waited for you.
That was brave.
Or foolish. I haven't decided yet.`,
next:2,
path:"true"
},
{
text:"Turn back 🌙",
note:`Not everyone is meant to enter every garden.
Still… for a moment, I wished you would.`,
next:2,
path:"neutral"
}
]
},

/* CHAPTER 2 */
{
text:`🦋 CHAPTER 2 — The Butterfly`,
bg:2,
question:`Do you trust what is fragile enough to approach you?`,
choices:[
{
text:"Stay still 🌹",
note:`It trusted you enough to land.
I'm still learning how.`,
next:3,
path:"true"
},
{
text:"Move away 🍂",
note:`It leaves quietly.
I understand.
Beautiful things are hard to trust.`,
next:3,
path:"neutral"
}
]
},

/* CHAPTER 3 */
{
text:`🌙 CHAPTER 3 — The Locked Greenhouse`,
bg:3,
question:`Do you want to know what is inside the locked place?`,
choices:[
{
text:"Ask what's inside 🔑",
note:`Curiosity is dangerous here.
Because I might answer.`,
next:4,
path:"neutral"
},
{
text:"Respect the lock 🔒",
note:`Thank you.
Some doors open easier when they are not forced.`,
next:4,
path:"true"
}
]
},

/* CHAPTER 4 */
{
text:`🌹 CHAPTER 4 — The Wilted Rose`,
bg:4,
question:`Do you still hold on even when something fades?`,
choices:[
{
text:"Keep it 🌹",
note:`You stayed even when it lost its beauty.
That… is rare.`,
next:5,
path:"true"
},
{
text:"Leave it 🍂",
note:`Perhaps not everything is meant to be held.
Even beautiful things need space to fade.`,
next:5,
path:"neutral"
}
]
},

/* CHAPTER 5 */
{
text:`💌 CHAPTER 5 — The Unfinished Letter`,
bg:4,
question:`Do you open something unfinished?`,
choices:[
{
text:"Read it 🌙",
note:`Every word feels like a risk.
But you read them anyway.`,
next:6,
path:"neutral"
},
{
text:"Return it 🕯",
note:`Thank you for respecting my silence.
Not all stories are ready yet.`,
next:6,
path:"true"
}
]
},

/* CHAPTER 6 */
{
text:`🦋 CHAPTER 6 — The Empty Bench`,
bg:4,
question:`Do you choose closeness or distance?`,
choices:[
{
text:"Sit beside her 💙",
note:`The bench was never lonely.
I was.`,
next:"end",
path:"true"
},
{
text:"Sit across from her 🌙",
note:`Even at a distance…
you feel close.`,
next:"end",
path:"neutral"
}
]
}

];

/* =========================
   LOAD CHAPTER
========================= */

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
endGame(c.path);
}else{
loadChapter(c.next);
}

},1300);

};

choicesBox.appendChild(btn);
});
}

/* =========================
   END GAME (FIXED)
========================= */

function endGame(path){

endingBox.innerHTML="";
storyText.innerHTML="";
choicesBox.innerHTML="";

let title="";
let text="";

if(path==="neutral"){
title="💔 Forgotten Ending";
text=`Some people leave quietly.

And I never learn how to stop them.

You kept your distance… and I lost you.`;
}
else{
title="💙 Devoted Ending (TRUE)";
text=`You never forced me to open.

You simply stayed until I wanted to.

That is why I chose you.`;
}

document.getElementById("ending").innerHTML=`
<div class="letter">

<h1>${title}</h1>

<p>${text}</p>

<br>

<button onclick="finalLetter('${path}')">
💌 Final Letter
</button>

</div>
`;
}

/* =========================
   FINAL LETTER
========================= */

window.finalLetter=function(path){

document.getElementById("ending").innerHTML=`
<div class="letter">

<h1>💌 The Butterfly That Stayed</h1>

<p>
If you're reading this...
<br><br>
it means you stayed.
<br><br>
All the way until the end.
<br><br>
With me.
</p>

<p>
When I first created this world…
it was to hide.
</p>

<p>
But you stayed.
</p>

<p>
And slowly…
I stopped being alone.
</p>

<h3>🦋 A Small Poem</h3>

<p>
I built a garden out of fear,<br>
but you became the wind.<br><br>

And if I ever learn to bloom,<br>
you’ll be the reason.
</p>

<p>I love you.</p>

</div>
`;
};

/* =========================
   MENU START (SAFE)
========================= */

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
