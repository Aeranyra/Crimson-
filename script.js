document.addEventListener("DOMContentLoaded", startVN);

function startVN(){

/* =========================
   ELEMENTS
========================= */

const storyText=document.getElementById("storyText");
const questionText=document.getElementById("questionText");
const choicesBox=document.getElementById("choices");
const endingBox=document.getElementById("ending");

const bgm=document.getElementById("bgm");
const clickSound=document.getElementById("clickSound");

const cursor=document.getElementById("cursor");
const menuScreen=document.getElementById("menuScreen");

let musicStarted=false;

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
   CURSOR + BUTTERFLY (RESTORED)
========================= */

document.addEventListener("mousemove",(e)=>{

if(cursor){
cursor.style.left=e.clientX+"px";
cursor.style.top=e.clientY+"px";
}

const b=document.createElement("div");
b.className="cursor-butterfly";
b.innerHTML="🦋";
b.style.left=e.clientX+"px";
b.style.top=e.clientY+"px";
document.body.appendChild(b);
setTimeout(()=>b.remove(),900);

});

/* =========================
   MOBILE MUSIC FIX (RESTORED)
========================= */

document.body.addEventListener("click",()=>{
if(!musicStarted){
bgm.volume=0.4;
bgm.play().catch(()=>{});
musicStarted=true;
}
},{once:true});

/* =========================
   STORY (UNCHANGED — ONLY POSSESSIVE FIXED)
========================= */

const story=[

/* 🌙 PROLOGUE (UNCHANGED FULL) */
{
text:`🌙 Prologue — The Garden That Shouldn’t Exist

If you are reading this…

it means you entered.

Or maybe you never meant to… and still ended up here.

This place is not real.

Or maybe it is.

I’m not sure anymore.

I started building this because I was afraid.

Afraid of letting people in.

Afraid of what would happen if someone stayed too long.

So I made a world where I could control distance.

But then you arrived.

This story will decide your ending.`,
question:`Do you choose to step into the unknown?`,
bg:0,
choices:[
{
text:"Begin",
note:"🦋 The garden remembers every step.",
next:1
}
]
},

/* 🌹 CHAPTER 1 */
{
text:`🌹 CHAPTER 1 — The Crimson Gate`,
question:`Do you dare to step beyond the gate?`,
bg:1,
choices:[
{text:"Enter 🦋",note:`You stepped inside without knowing what waited for you.`,next:2,path:"true"},
{text:"Turn back 🌙",note:`Not everyone is meant to enter every garden.`,next:2,path:"neutral"}
]
},

/* 🦋 CHAPTER 2 */
{
text:`🦋 CHAPTER 2 — The Butterfly`,
question:`If something fragile lands… do you move?`,
bg:2,
choices:[
{text:"Stay still 🌹",note:`It trusted you enough to land.`,next:3,path:"true"},
{text:"Move away 🍂",note:`It leaves quietly.`,next:3,path:"neutral"}
]
},

/* 🌙 CHAPTER 3 */
{
text:`🌙 CHAPTER 3 — The Locked Greenhouse`,
question:`Do you approach what is locked?`,
bg:3,
choices:[
{text:"Ask 🔑",note:`Curiosity is dangerous here.`,next:4,path:"neutral"},
{text:"Respect 🔒",note:`Some doors open only when not forced.`,next:4,path:"true"}
]
},

/* 🌹 CHAPTER 4 */
{
text:`🌹 CHAPTER 4 — The Wilted Rose`,
question:`Do you still hold on?`,
bg:4,
choices:[
{text:"Keep 🌹",note:`You stayed even when it lost its beauty.`,next:5,path:"true"},
{text:"Leave 🍂",note:`Even beautiful things need space to fade.`,next:5,path:"neutral"}
]
},

/* 💌 CHAPTER 5 */
{
text:`💌 CHAPTER 5 — The Unfinished Letter`,
question:`Do you open it?`,
bg:4,
choices:[
{text:"Read 🌙",note:`Every word feels like a risk.`,next:6,path:"neutral"},
{text:"Return 🕯",note:`Not all stories are ready yet.`,next:6,path:"true"}
]
},

/* 🦋 CHAPTER 6 */
{
text:`🦋 CHAPTER 6 — The Empty Bench`,
question:`Do you stay?`,
bg:4,
choices:[
{text:"Sit beside 💙",note:`The bench was never lonely.`,next:"end",path:"true"},
{text:"Sit across 🌙",note:`Distance remains.`,next:"end",path:"neutral"}
]
}

];

/* =========================
   LOAD CHAPTER (FIXED QUESTION DISPLAY)
========================= */

function loadChapter(i){

endingBox.innerHTML="";
setBG(story[i].bg);

storyText.textContent=story[i].text;
questionText.textContent=story[i].question;   // FIXED separation

choicesBox.innerHTML="";

story[i].choices.forEach(c=>{

const btn=document.createElement("button");
btn.className="choice-btn";
btn.textContent=c.text;

btn.onclick=()=>{

clickSound.currentTime=0;
clickSound.play().catch(()=>{});

storyText.innerHTML=`<div class="choice-note">${c.note}</div>`;
questionText.textContent="";

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
   ENDING (POSSESSIVE RESTORED FIXED)
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

And I never learn how to stop them.`;
}

/* ✅ FIXED POSSESSIVE ENDING (RESTORED PROPERLY) */
else if(path==="true" && Math.random()<0.5){
title="🖤 Possessive Ending";
text=`You stayed…
but not freely.

I didn’t let go… even when I should have.`;
}

else{
title="💙 Devoted Ending";
text=`You never forced me to open.

You simply stayed until I wanted to.

That is why I chose you.`;
}

endingBox.innerHTML=`
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
   FINAL LETTER (UNCHANGED FULL RESTORED)
========================= */

window.finalLetter=function(){

endingBox.innerHTML=`
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
I don’t really know how to start something like this without shaking a little.
</p>

<p>
So I’ll just say it honestly.
</p>

<p>
When I first created this little world…
<br><br>
it wasn’t because I wanted to be found.
<br><br>
it was because I wanted to hide.
</p>

<p>
But you stayed.
</p>

<p>
And slowly…
<br><br>
I stopped being alone.
</p>

<h3>🦋 A Small Poem</h3>

<p>
I built a garden out of fear,
<br>
where nothing leaves and nothing nears.
<br><br>
But you became the wind so kind,
<br>
that even locked doors lost their mind.
<br><br>
And if I ever learn to bloom,
<br>
to let the light fill every room…
<br><br>
I think it started here with you—
<br>
with someone patient, soft, and true.
</p>

<p>
I love you, my dear husband.
</p>

</div>
`;
};

/* =========================
   MENU
========================= */

menuScreen.style.display="flex";

document.getElementById("startBtn").onclick=()=>{
menuScreen.style.display="none";
loadChapter(0);
};

}
