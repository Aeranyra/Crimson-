const storyText = document.getElementById("storyText");
const choicesBox = document.getElementById("choices");
const endingBox = document.getElementById("ending");

/* =========================
   STORY
========================= */

const story = [

/* 🌙 PROLOGUE */
{
    text: `Prologue — The Garden That Shouldn’t Exist

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

And then you arrived.

This story will decide your ending.`,
    choices: [{ text: "Begin", note: "You step forward…", next: 1 }]
},

/* 🌹 CHAPTER 1 */
{
    text: "🌹 CHAPTER 1 — The Crimson Gate",
    choices: [
        {
            text: "Enter the garden 🦋",
            note: "You stepped inside without knowing what waited for you.",
            next: 2,
            path: "true"
        },
        {
            text: "Turn back 🌙",
            note: "Not everyone is meant to enter every garden.",
            next: 2,
            path: "neutral"
        }
    ]
},

/* 🦋 CHAPTER 2 */
{
    text: "🦋 CHAPTER 2 — The Butterfly",
    choices: [
        {
            text: "Stay still 🌹",
            note: "It trusted you enough to land.",
            next: 3,
            path: "true"
        },
        {
            text: "Move away 🍂",
            note: "It leaves quietly.",
            next: 3,
            path: "neutral"
        }
    ]
},

/* 🔑 CHAPTER 3 */
{
    text: "🌙 CHAPTER 3 — The Locked Greenhouse",
    choices: [
        {
            text: "Ask what's inside 🔑",
            note: "Curiosity is dangerous here.",
            next: 4,
            path: "neutral"
        },
        {
            text: "Respect the lock 🔒",
            note: "Some doors open only when not forced.",
            next: 4,
            path: "true"
        }
    ]
},

/* 🌹 CHAPTER 4 */
{
    text: "🌹 CHAPTER 4 — The Wilted Rose",
    choices: [
        {
            text: "Keep it 🌹",
            note: "You stayed even when it lost its beauty.",
            next: 5,
            path: "true"
        },
        {
            text: "Leave it 🍂",
            note: "Even beautiful things need space to fade.",
            next: 5,
            path: "neutral"
        }
    ]
},

/* 💌 CHAPTER 5 */
{
    text: "💌 CHAPTER 5 — The Unfinished Letter",
    choices: [
        {
            text: "Read it 🌙",
            note: "Every word feels like a risk.",
            next: 6,
            path: "neutral"
        },
        {
            text: "Return it 🕯",
            note: "Not all stories are ready yet.",
            next: 6,
            path: "true"
        }
    ]
},

/* 🦋 CHAPTER 6 */
{
    text: "🦋 CHAPTER 6 — The Empty Bench",
    choices: [
        {
            text: "Sit beside her 💙",
            note: "The bench was never lonely. I was.",
            next: "end",
            path: "true"
        },
        {
            text: "Sit across from her 🌙",
            note: "Even at a distance… you feel close.",
            next: "end",
            path: "neutral"
        }
    ]
}
];

/* =========================
   LOAD CHAPTER
========================= */

function loadChapter(i, path = "true"){

    endingBox.innerHTML = "";

    const data = story[i];
    storyText.textContent = data.text;
    choicesBox.innerHTML = "";

    data.choices.forEach(choice=>{
        const btn = document.createElement("button");
        btn.className = "choice-btn";
        btn.textContent = choice.text;

        btn.onclick = () => {

            if(choice.note){
                showNote(choice.note);
            }

            setTimeout(()=>{
                if(choice.next === "end"){
                    finalLetter(choice.path);
                } else {
                    loadChapter(choice.next, choice.path);
                }
            }, 1800);
        };

        choicesBox.appendChild(btn);
    });
}

/* =========================
   NOTE
========================= */

function showNote(text){
    storyText.innerHTML = "";
    const div = document.createElement("div");
    div.className = "choice-note";
    div.textContent = text;
    storyText.appendChild(div);
}

/* =========================
   FINAL LETTER (3 ENDINGS + FULL LETTER)
========================= */

function finalLetter(path){

    let endingText = "";

/* 💔 FORGOTTEN ENDING */
    if(path === "neutral" && Math.random() < 0.5){
        endingText = `
<h1>💔 Forgotten Ending</h1>

<p>Some people leave quietly.</p>
<p>And I never learn how to stop them.</p>
<p>You kept your distance… and I lost you.</p>
`;
    }

/* 🖤 POSSESSIVE ENDING */
    else if(path === "neutral"){
        endingText = `
<h1>🖤 Possessive Ending</h1>

<p>You stayed… but not gently.</p>
<p>Closeness became control.</p>
<p>And I no longer recognize freedom.</p>
`;
    }

/* 💙 TRUE ENDING */
    else {
        endingText = `
<h1>💙 Devoted Ending (TRUE)</h1>

<p>You never forced me to open.</p>
<p>You simply stayed until I wanted to.</p>
<p>That is why I chose you.</p>
`;
    }

/* 💌 FULL ORIGINAL FINAL LETTER (RESTORED) */
    endingBox.innerHTML = `
        <div class="letter">

            ${endingText}

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
   START
========================= */

loadChapter(0);
