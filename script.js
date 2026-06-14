document.addEventListener("DOMContentLoaded", startVN);

function startVN(){

/* =========================
   ELEMENTS (SAFE INIT)
========================= */

const storyText=document.getElementById("storyText");
const choicesBox=document.getElementById("choices");
const endingBox=document.getElementById("ending");

const bgm=document.getElementById("bgm");
const clickSound=document.getElementById("clickSound");
const cursor=document.getElementById("cursor");

const menuScreen=document.getElementById("menuScreen");
const settingsPanel=document.getElementById("settingsPanel");

if(!storyText || !choicesBox || !menuScreen){
    alert("Missing HTML elements");
    return;
}

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
   CURSOR (SAFE)
========================= */

document.addEventListener("mousemove",(e)=>{
if(!cursor) return;
cursor.style.left=e.clientX+"px";
cursor.style.top=e.clientY+"px";
});

/* =========================
   FADE SYSTEM
========================= */

function fadeText(callback){

storyText.style.opacity="0";

setTimeout(()=>{

callback();

storyText.style.opacity="1";

},250);

}

/* =========================
   STORY
========================= */

const story=[

/* PROLOGUE */
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
bg:0,
choices:[{text:"Begin",note:`You step forward…`,next:1}]
},

/* CHAPTER 1 */
{
text:`🌹 CHAPTER 1 — The Crimson Gate`,
bg:1,
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
Some doors open easier
when they are not forced.`,
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
   LOAD CHAPTER (FADE FIXED)
========================= */

function loadChapter(i){

endingBox.innerHTML="";
currentChapter=i;
localStorage.setItem("save",i);

const data=story[i];

setBG(data.bg);

fadeText(()=>{

storyText.textContent=data.text;

});

choicesBox.innerHTML="";

data.choices.forEach(c=>{

const btn=document.createElement("button");
btn.className="choice-btn";
btn.textContent=c.text;

btn.onclick=()=>{

clickSound?.play().catch(()=>{});

if(!musicStarted && bgm){
bgm.volume=0.4;
bgm.play().catch(()=>{});
musicStarted=true;
}

fadeText(()=>{

storyText.innerHTML=`<div class="choice-note">${c.note}</div>`;

});

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

/* =========================
   FINAL LETTER
========================= */

function finalLetter(path){

let endingBlock="";

if(path==="neutral"){

endingBlock=`
<h1>💔 Forgotten Ending</h1>

<p>He keeps distance → she never opens up fully.</p>

<p>Some people leave quietly.<br>
And I never learn how to stop them.</p>

<p>You kept your distance… and I lost you.</p>
`;
}
else{

endingBlock=`
<h1>💙 Devoted Ending (TRUE)</h1>

<p>He is patient + gentle + consistent.</p>

<p>You never forced me to open.<br>
You simply stayed until I wanted to.<br>
That is why I chose you.</p>
`;
}

endingBox.innerHTML=`
<div class="letter">

${endingBlock}

<hr>

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
}

/* =========================
   START MENU
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

} // END VN
