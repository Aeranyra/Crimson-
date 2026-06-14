
const storyText = document.getElementById("storyText");
const choicesBox = document.getElementById("choices");
const endingBox = document.getElementById("ending");

const bgm = document.getElementById("bgm");
const clickSound = document.getElementById("clickSound");

let musicStarted = false;

/* =========================
   BACKGROUNDS
========================= */

const backgrounds = [
"https://files.catbox.moe/g46u4p.jpg",
"https://files.catbox.moe/vcdxgl.jpg",
"https://files.catbox.moe/yqcxpl.jpg",
"https://files.catbox.moe/hxbdzl.jpg",
"https://files.catbox.moe/hnsx6c.jpg"
];

function setBG(i){
document.getElementById("bg").style.backgroundImage =
`url(${backgrounds[i]})`;
}

/* =========================
   CURSOR TRAIL
========================= */

const cursor = document.getElementById("cursor");

document.addEventListener("mousemove",(e)=>{

cursor.style.left = e.clientX + "px";
cursor.style.top = e.clientY + "px";

const dot = document.createElement("div");
dot.className = "trail";
dot.style.left = e.clientX + "px";
dot.style.top = e.clientY + "px";

document.body.appendChild(dot);
setTimeout(()=>dot.remove(),600);

});

/* =========================
   TYPEWRITER (optional simple)
========================= */

function typeText(text, callback){

storyText.textContent = "";
let i = 0;

const speed = 15;

function type(){
if(i < text.length){
storyText.textContent += text.charAt(i);
i++;
setTimeout(type, speed);
}else{
if(callback) callback();
}
}

type();
}

/* =========================
   STORY — PART 1 (1–3 + PROLOGUE)
========================= */

const story = [

/* 🌙 PROLOGUE */
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
choices:[{
text:"Begin",
note:`You step forward…
Even if your heart already knows the ending.`,
next:1
}]
},

/* 🌹 CHAPTER 1 */
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

/* 🦋 CHAPTER 2 */
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

/* 🌙 CHAPTER 3 */
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
}
];

/* =========================
   LOAD CHAPTER
========================= */

function loadChapter(i){

endingBox.innerHTML = "";

const data = story[i];

if(data.bg !== undefined){
setBG(data.bg);
}

storyText.textContent = data.text;
choicesBox.innerHTML = "";

data.choices.forEach(choice=>{

const btn = document.createElement("button");
btn.className = "choice-btn";
btn.textContent = choice.text;

btn.onclick = ()=>{

clickSound.currentTime = 0;
clickSound.play();

if(!musicStarted){
bgm.volume = 0.4;
bgm.play();
musicStarted = true;
}

storyText.innerHTML = `<div class="choice-note">${choice.note}</div>`;

setTimeout(()=>{
loadChapter(choice.next);
},1500);

};

choicesBox.appendChild(btn);

});

}

/* START */
loadChapter(0);

/* =========================
   CONTINUATION STORY (4–6)
========================= */

story.push(

/* 🌹 CHAPTER 4 */
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

/* 💌 CHAPTER 5 */
{
text:`💌 CHAPTER 5 — The Unfinished Letter`,
bg:4,
choices:[
{
text:"Read 🌙",
note:`Every word feels like a risk.
But you read them anyway.`,
next:6,
path:"neutral"
},
{
text:"Return 🕯",
note:`Thank you for respecting my silence.
Not all stories are ready yet.`,
next:6,
path:"true"
}
]
},

/* 🦋 CHAPTER 6 */
{
text:`🦋 CHAPTER 6 — The Empty Bench`,
bg:4,
choices:[
{
text:"Sit beside 💙",
note:`The bench was never lonely.
I was.`,
next:"end",
path:"true"
},
{
text:"Sit across 🌙",
note:`Even at a distance…
you feel close.`,
next:"end",
path:"neutral"
}
]
}

);

/* =========================
   FINAL LETTER + ENDINGS
========================= */

function finalLetter(path){

let endingBlock="";

/* 🌹 ENDINGS (YOUR FULL ORIGINAL BLOCK) */

if(path==="neutral"){

endingBlock=`
<h1>💔 Forgotten Ending</h1>

<p>He keeps distance → she never opens up fully.</p>

<p>Some people leave quietly.<br>
And I never learn how to stop them.</p>

<hr>

<h1>🖤 Possessive Ending</h1>

<p>He forces closeness → fear becomes control.</p>

<p>You stayed… but I no longer recognize freedom.<br>
Only closeness that feels like chains.</p>
`;
}

else{

endingBlock=`
<h1>💙 Devoted Ending (TRUE)</h1>

<p>He is patient + g<br>
entle + consistent.</p>

<p>You never forced me to open.<br>
You simply stayed until I wanted to.<br>
That is why I chose you.</p>
`;
}

/* 💌 FULL FINAL LETTER */

endingBox.innerHTML = `
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
