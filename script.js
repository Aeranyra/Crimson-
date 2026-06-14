let affection = 0;
let control = 0;
let typing = false;

/* =====================
   BACKGROUNDS
===================== */

const bg1 = "https://files.catbox.moe/53h0su.jpg";
const bg2 = "https://files.catbox.moe/hxbdzl.jpg";
const bg3 = "https://files.catbox.moe/vcdxgl.jpg";
const bg4 = "https://files.catbox.moe/g46u4p.jpg";
const bg5 = "https://files.catbox.moe/yqcxpl.jpg";

/* =====================
   START GAME
===================== */

function startGame(){

    document.getElementById("startScreen").style.display = "none";
    document.getElementById("game").style.display = "block";

    const music = document.getElementById("bgMusic");

    music.volume = 0.5;

    music.play().catch(() => {
        console.log("Music autoplay blocked.");
    });

    setBG(bg1);

    opening();
}

/* =====================
   TYPEWRITER
===================== */

function typeText(text, callback){

    const box = document.getElementById("storyText");

    box.innerHTML = "";

    typing = true;

    let i = 0;

    function write(){

        if(i < text.length){

            box.innerHTML += text[i];

            i++;

            setTimeout(write, 15);

        }else{

            typing = false;

            if(callback){
                callback();
            }

        }

    }

    write();
}

/* =====================
   UI HELPERS
===================== */

function setBG(img){
    document.getElementById("bg").style.backgroundImage = `url(${img})`;
}

function chapter(text){
    document.getElementById("chapterBox").innerText = text;
}

/* =====================
   CHOICE SYSTEM
===================== */

function showChoices(arr){

    const box = document.getElementById("choices");

    box.innerHTML = "";

    arr.forEach(choice => {

        const btn = document.createElement("button");

        btn.innerText = choice.text;

        btn.onclick = () => {

            box.innerHTML = "";

            const note = document.createElement("div");

            note.className = "choice-note";

            note.innerText = choice.note;

            box.appendChild(note);

            setTimeout(() => {
                choice.action();
            }, 3000);

        };

        box.appendChild(btn);

    });

}

/* =====================
   BUTTERFLY TRAIL
===================== */

document.addEventListener("mousemove", createButterfly);
document.addEventListener("touchmove", createButterfly);

function createButterfly(e){

    const x = e.touches
        ? e.touches[0].clientX
        : e.clientX;

    const y = e.touches
        ? e.touches[0].clientY
        : e.clientY;

    const butterfly = document.createElement("div");

    butterfly.className = "cursor-butterfly";

    butterfly.innerHTML = "🦋";

    butterfly.style.left = x + "px";
    butterfly.style.top = y + "px";

    document.body.appendChild(butterfly);

    setTimeout(() => {
        butterfly.remove();
    }, 1000);

}

/* =====================
   PROLOGUE
===================== */

function opening(){

    chapter("🌙 Prologue — The Garden That Shouldn’t Exist");

    typeText(`If you are reading this…

it means you entered.

Or maybe you never meant to… and still ended up here.

This place is not real.

Or maybe it is.

I’m not sure anymore.

I started building this because I was afraid.

Afraid of letting people in.

Afraid of what would happen if someone stayed too long.

So I made a world where I could control distance.

Where nothing could leave unless I allowed it.

Where even feelings had rules.

But something strange happened…

The more I built this garden…

the more I felt trapped inside it.

Like I was the one who couldn’t leave anymore.

And then you arrived.

I don’t know if you were meant to be here.

But you are.

So now…

this story will decide what kind of ending you become part of.

Stay.

Or leave.

But know this…

every choice you make will leave a trace of you here.`,

    () => {

        showChoices([
            {
                text: "Begin",
                note: "🦋 The garden remembers every step.",
                action: chapter1
            }
        ]);

    });

}

/* =====================
   CHAPTER 1
===================== */

function chapter1(){

    setBG(bg1);

    chapter("🌹 Chapter 1 — The Crimson Gate");

    typeText(
`A crimson gate stands before you.

Beyond it lies a garden that feels both beautiful and forbidden.

For a moment, everything is silent.`,

    () => {

        showChoices([

            {
                text:"Enter the garden 🦋",

                note:`You stepped inside without knowing what waited for you.

That was brave.

Or foolish.

I haven't decided yet.`,

                action:() => {

                    affection++;

                    chapter2();

                }
            },

            {
                text:"Turn back 🌙",

                note:`Not everyone is meant to enter every garden.

Still…

for a moment,

I wished you would.`,

                action:() => {

                    chapter2();

                }
            }

        ]);

    });

}

/* =====================
   CHAPTER 2
===================== */

function chapter2(){

    setBG(bg2);

    chapter("🦋 Chapter 2 — The Butterfly");

    typeText(
`A butterfly drifts through the air.

It circles once.

Then twice.

As if deciding whether you are safe.`,

    () => {

        showChoices([

            {
                text:"Stay still 🌹",

                note:`It trusted you enough to land.

I'm still learning how.`,

                action:() => {

                    affection++;

                    chapter3();

                }
            },

            {
                text:"Move away 🍂",

                note:`It leaves quietly.

I understand.

Beautiful things are hard to trust.`,

                action:() => {

                    chapter3();

                }
            }

        ]);

    });

}

/* =====================
   CHAPTER 3
===================== */

function chapter3(){

    setBG(bg5);

    chapter("🌙 Chapter 3 — The Locked Greenhouse");

    typeText(
`Hidden among the flowers is a greenhouse.

The door is locked.

Dust gathers around the handle.

Whatever rests inside has been untouched for a long time.`,

    () => {

        showChoices([

            {
                text:"Ask what's inside 🔑",

                note:`Curiosity is dangerous here.

Because I might answer.`,

                action:() => {

                    affection++;

                    chapter4();

                }
            },

            {
                text:"Respect the lock 🕯",

                note:`Thank you.

Some doors open easier

when they are not forced.`,

                action:() => {

                    control++;

                    chapter4();

                }
            }

        ]);

    });/* =====================
   CHAPTER 4
===================== */

function chapter4(){

    setBG(bg3);

    chapter("🌹 Chapter 4 — The Wilted Rose");

    typeText(
`Among the blooming flowers sits a single rose.

Its petals have begun to fall.

It is no longer perfect.

Yet somehow, it draws your attention more than the others.`,

    () => {

        showChoices([

            {
                text:"Keep it 🌹",

                note:`You stayed even when it lost its beauty.

That… is rare.`,

                action:() => {

                    affection++;

                    chapter5();

                }
            },

            {
                text:"Leave it 🍂",

                note:`Perhaps not everything is meant to be held.

Even beautiful things need space to fade.`,

                action:() => {

                    chapter5();

                }
            }

        ]);

    });

}

/* =====================
   CHAPTER 5
===================== */

function chapter5(){

    setBG(bg4);

    chapter("💌 Chapter 5 — The Unfinished Letter");

    typeText(
`A letter rests on a small table.

The envelope was never sealed.

The final lines were never written.

Someone started this letter…

but never found the courage to finish it.`,

    () => {

        showChoices([

            {
                text:"Read it 🌙",

                note:`Every word feels like a risk.

But you read them anyway.`,

                action:() => {

                    affection++;

                    chapter6();

                }
            },

            {
                text:"Return it unopened 🕯",

                note:`Thank you for respecting my silence.

Not all stories are ready yet.`,

                action:() => {

                    control++;

                    chapter6();

                }
            }

        ]);

    });

}

/* =====================
   CHAPTER 6
===================== */

function chapter6(){

    setBG(bg2);

    chapter("🦋 Chapter 6 — The Empty Bench");

    typeText(
`At the center of the garden sits an empty bench.

The flowers sway softly.

The wind carries the scent of roses.

Someone has been waiting here for a very long time.`,

    () => {

        showChoices([

            {
                text:"Sit beside her 💙",

                note:`The bench was never lonely.

I was.`,

                action:() => {

                    affection++;

                    endGame();

                }
            },

            {
                text:"Sit across from her 🌙",

                note:`Even at a distance…

you feel close.`,

                action:() => {

                    endGame();

                }
            }

        ]);

    });

}

/* =====================
   ENDINGS
===================== */

function endGame(){

    document.getElementById("game").style.display = "none";

    document.getElementById("ending").style.display = "flex";

    let title = "";
    let text = "";

    if(control > affection){

        title = "🖤 Possessive Ending";

        text = `You stayed…

but I no longer recognize freedom.

Only closeness that feels like chains.`;

    }
    else if(affection >= 4){

        title = "💙 Devoted Ending";

        text = `You never forced me to open.

You simply stayed until I wanted to.

That is why I chose you.`;

    }
    else{

        title = "💔 Forgotten Ending";

        text = `Some people leave quietly.

And I never learn how to stop them.`;

    }

    document.getElementById("ending").innerHTML = `
        <div class="letter">

            <h1>${title}</h1>

            <p>${text}</p>

            <button onclick="finalLetter()">
                💌 Final Letter
            </button>

        </div>
    `;
}

/* =====================
   FINAL LETTER
===================== */

function finalLetter(){

    document.getElementById("ending").innerHTML = `
        <div class="letter">

<h1>💌 The Butterfly That Stayed</h1>

<p>
If you're reading this...

it means you stayed.

All the way until the end.

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

it wasn’t because I wanted to be found.

It was because I wanted to hide.
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
I built a garden out of fear,

where nothing leaves and nothing nears.

But you became the wind so kind,

that even locked doors lost their mind.

And if I ever learn to bloom,

to let the light fill every room…

I think it started here with you—

with someone patient, soft, and true.
</p>

<p>
I love you, my dear husband.
</p>

        </div>
    `;
}

}
