document.addEventListener("DOMContentLoaded", startVN);

function startVN(){

const storyText=document.getElementById("storyText");
const choicesBox=document.getElementById("choices");
const endingBox=document.getElementById("ending");

const bgm=document.getElementById("bgm");
const clickSound=document.getElementById("clickSound");

const cursor=document.getElementById("cursor");

const menuScreen=document.getElementById("menuScreen");
const settingsPanel=document.getElementById("settingsPanel");

let musicStarted=false;

/* BACKGROUNDS */
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

/* CURSOR */
document.addEventListener("mousemove",(e)=>{
if(!cursor) return;
cursor.style.left=e.clientX+"px";
cursor.style.top=e.clientY+"px";
});

/* MOBILE AUDIO FIX */
function enableMusic(){
if(!musicStarted){
bgm.volume=0.4;
bgm.play().catch(()=>{});
musicStarted=true;
}
}
document.addEventListener("click", enableMusic, {once:true});
document.addEventListener("touchstart", enableMusic, {once:true});

/* SAFE CLICK SOUND */
function playClick(){
if(clickSound){
clickSound.currentTime=0;
clickSound.play().catch(()=>{});
}
}

/* SAVE SYSTEM FIX */
function save(i){
localStorage.setItem("save", i);
}

/* STORY (UNCHANGED EXACTLY) */
const story=[

{
text:`🌙 Prologue — The Garden That Shouldn’t Exist

If you are reading this…

it means you entered.

Or maybe you never meant to… and still ended up here.

This place is not real.

Or maybe it is.

I’m not sure anymore.

I built this because I was afraid.

Afraid of letting people in.

Afraid of what would happen if someone stayed too long.

So I made a world where I could control distance.

But then you arrived.

This story will decide your ending.`,
question:`Do you choose to enter this world?`,
bg:0,
choices:[
{text:"Begin",note:`🦋 The garden remembers every step.`,next:1}
]
},

{
text:`🌹 CHAPTER 1 — The Crimson Gate`,
question:`Do you choose to step into the unknown?`,
bg:1,
choices:[
{text:"Enter the garden 🦋",note:`You stepped inside without knowing what waited for you.
That was brave.
Or foolish. I haven't decided yet.`,next:2,path:"true"},
{text:"Turn back 🌙",note:`Not everyone is meant to enter every garden.
Still… for a moment, I wished you would.`,next:2,path:"neutral"}
]
},

{
text:`🦋 CHAPTER 2 — The Butterfly`,
question:`Do you trust what is fragile?`,
bg:2,
choices:[
{text:"Stay still 🌹",note:`It trusted you enough to land.
I'm still learning how.`,next:3,path:"true"},
{text:"Move away 🍂",note:`It leaves quietly.
I understand.
Beautiful things are hard to trust.`,next:3,path:"neutral"}
]
},

{
text:`🌙 CHAPTER 3 — The Locked Greenhouse`,
question:`Do you want to know what is inside?`,
bg:3,
choices:[
{text:"Ask what's inside 🔑",note:`Curiosity is dangerous here.
Because I might answer.`,next:4,path:"neutral"},
{text:"Respect the lock 🔒",note:`Thank you.
Some doors open easier when they are not forced.`,next:4,path:"true"}
]
},

{
text:`🌹 CHAPTER 4 — The Wilted Rose`,
question:`Do you still hold on when something fades?`,
bg:4,
choices:[
{text:"Keep it 🌹",note:`You stayed even when it lost its beauty.
That… is rare.`,next:5,path:"true"},
{text:"Leave it 🍂",note:`Perhaps not everything is meant to be held.
Even beautiful things need space to fade.`,next:5,path:"neutral"}
]
},

{
text:`💌 CHAPTER 5 — The Unfinished Letter`,
question:`Do you open something unfinished?`,
bg:4,
choices:[
{text:"Read it 🌙",note:`Every word feels like a risk.
But you read them anyway.`,next:6,path:"neutral"},
{text:"Return it 🕯",note:`Thank you for respecting my silence.
Not all stories are ready yet.`,next:6,path:"true"}
]
},

{
text:`🦋 CHAPTER 6 — The Empty Bench`,
question:`Do you choose closeness or distance?`,
bg:4,
choices:[
{text:"Sit beside 💙",note:`The bench was never lonely.
I was.`,next:"end",path:"true"},
{text:"Sit across 🌙",note:`Even at a distance…
you feel close.`,next:"end",path:"neutral"}
]
}

];

/* LOAD CHAPTER */
function loadChapter(i){

save(i);

endingBox.innerHTML="";

const data=story[i];

setBG(data.bg);

storyText.textContent=data.text;
choicesBox.innerHTML="";
questionText.textContent=data.question||"";

data.choices.forEach(c=>{

const btn=document.createElement("button");
btn.className="choice-btn";
btn.textContent=c.text;

btn.onclick=()=>{

playClick();

storyText.innerHTML=`<div class="choice-note">${c.note}</div>`;
questionText.textContent="";

setTimeout(()=>{

if(c.next==="end"){
endGame(c.path);
}else{
loadChapter(c.next);
}

},1200);

};

choicesBox.appendChild(btn);
});
}

/* ENDING (FIXED ONLY, NO STORY CHANGE) */
function endGame(path){

endingBox.innerHTML="";
storyText.innerHTML="";
choicesBox.innerHTML="";

let title="",text="";

if(path==="neutral"){
title="💔 Forgotten Ending";
text=`Some people leave quietly.

And I never learn how to stop them.`;
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

<button onclick="finalLetter()">
💌 Final Letter
</button>

</div>
`;
}

/* FINAL LETTER (UNCHANGED) */
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

/* MENU */
menuScreen.style.display="flex";

document.getElementById("startBtn").onclick=()=>{
menuScreen.style.display="none";
loadChapter(0);
};

document.getElementById("continueBtn").onclick=()=>{
menuScreen.style.display="none";
loadChapter(Number(localStorage.getItem("save")||0));
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
