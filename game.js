// Guessagator MVP
// Adaptive character guessing: each next clue is chosen to best split the remaining suspects.

const QUESTIONS = [
  {id:"real", text:"Is your character a real person?"},
  {id:"male", text:"Is your character male?"},
  {id:"human", text:"Is your character human?"},
  {id:"animated", text:"Is your character mainly known from animation?"},
  {id:"movie", text:"Is your character strongly associated with movies?"},
  {id:"tv", text:"Is your character strongly associated with television?"},
  {id:"comic", text:"Did your character originate in comics?"},
  {id:"superhero", text:"Is your character a superhero or supervillain?"},
  {id:"magic", text:"Is magic important to your character?"},
  {id:"royalty", text:"Is your character royalty?"},
  {id:"detective", text:"Is your character a detective or investigator?"},
  {id:"villain", text:"Is your character usually considered a villain?"},
  {id:"animal", text:"Is your character an animal or animal-like?"},
  {id:"space", text:"Is your character strongly connected to space?"},
  {id:"game", text:"Is your character known from video games?"},
  {id:"singer", text:"Is your character/person famous for music?"},
  {id:"athlete", text:"Is your character/person famous for sports?"},
  {id:"leader", text:"Is your character/person known as a political or historical leader?"},
  {id:"mask", text:"Does your character often wear a mask or helmet?"},
  {id:"powers", text:"Does your character have superhuman or supernatural powers?"},
  {id:"green", text:"Is the character strongly associated with the color green?"},
  {id:"school", text:"Is school an important part of the character's story?"},
  {id:"british", text:"Is the character/person British?"},
  {id:"american", text:"Is the character/person American?"},
  {id:"funny", text:"Is the character mainly known for being funny?"}
];

const CANDIDATES = [
  ["Sherlock Holmes",{real:0,male:1,human:1,animated:0,movie:1,tv:1,comic:0,superhero:0,magic:0,royalty:0,detective:1,villain:0,animal:0,space:0,game:0,singer:0,athlete:0,leader:0,mask:0,powers:0,green:0,school:0,british:1,american:0,funny:0}],
  ["Batman",{real:0,male:1,human:1,animated:1,movie:1,tv:1,comic:1,superhero:1,magic:0,royalty:0,detective:1,villain:0,animal:0,space:0,game:1,singer:0,athlete:0,leader:0,mask:1,powers:0,green:0,school:0,british:0,american:1,funny:0}],
  ["Wonder Woman",{real:0,male:0,human:1,animated:1,movie:1,tv:1,comic:1,superhero:1,magic:1,royalty:1,detective:0,villain:0,animal:0,space:0,game:1,singer:0,athlete:0,leader:0,mask:0,powers:1,green:0,school:0,british:0,american:0,funny:0}],
  ["Spider-Man",{real:0,male:1,human:1,animated:1,movie:1,tv:1,comic:1,superhero:1,magic:0,royalty:0,detective:0,villain:0,animal:0,space:0,game:1,singer:0,athlete:0,leader:0,mask:1,powers:1,green:0,school:1,british:0,american:1,funny:1}],
  ["Iron Man",{real:0,male:1,human:1,animated:1,movie:1,tv:0,comic:1,superhero:1,magic:0,royalty:0,detective:0,villain:0,animal:0,space:1,game:1,singer:0,athlete:0,leader:0,mask:1,powers:0,green:0,school:0,british:0,american:1,funny:1}],
  ["Hulk",{real:0,male:1,human:1,animated:1,movie:1,tv:1,comic:1,superhero:1,magic:0,royalty:0,detective:0,villain:0,animal:0,space:0,game:1,singer:0,athlete:0,leader:0,mask:0,powers:1,green:1,school:0,british:0,american:1,funny:0}],
  ["Shrek",{real:0,male:1,human:0,animated:1,movie:1,tv:0,comic:0,superhero:0,magic:1,royalty:0,detective:0,villain:0,animal:0,space:0,game:1,singer:0,athlete:0,leader:0,mask:0,powers:1,green:1,school:0,british:0,american:0,funny:1}],
  ["Elsa",{real:0,male:0,human:1,animated:1,movie:1,tv:0,comic:0,superhero:0,magic:1,royalty:1,detective:0,villain:0,animal:0,space:0,game:1,singer:0,athlete:0,leader:0,mask:0,powers:1,green:0,school:0,british:0,american:0,funny:0}],
  ["Mickey Mouse",{real:0,male:1,human:0,animated:1,movie:1,tv:1,comic:1,superhero:0,magic:0,royalty:0,detective:0,villain:0,animal:1,space:0,game:1,singer:0,athlete:0,leader:0,mask:0,powers:0,green:0,school:0,british:0,american:1,funny:1}],
  ["Bugs Bunny",{real:0,male:1,human:0,animated:1,movie:1,tv:1,comic:1,superhero:0,magic:0,royalty:0,detective:0,villain:0,animal:1,space:0,game:1,singer:0,athlete:0,leader:0,mask:0,powers:0,green:0,school:0,british:0,american:1,funny:1}],
  ["Scooby-Doo",{real:0,male:1,human:0,animated:1,movie:1,tv:1,comic:1,superhero:0,magic:0,royalty:0,detective:1,villain:0,animal:1,space:0,game:1,singer:0,athlete:0,leader:0,mask:0,powers:0,green:0,school:0,british:0,american:1,funny:1}],
  ["Mario",{real:0,male:1,human:1,animated:1,movie:1,tv:1,comic:0,superhero:0,magic:1,royalty:0,detective:0,villain:0,animal:0,space:0,game:1,singer:0,athlete:0,leader:0,mask:0,powers:1,green:0,school:0,british:0,american:0,funny:1}],
  ["Luigi",{real:0,male:1,human:1,animated:1,movie:1,tv:1,comic:0,superhero:0,magic:1,royalty:0,detective:0,villain:0,animal:0,space:0,game:1,singer:0,athlete:0,leader:0,mask:0,powers:1,green:1,school:0,british:0,american:0,funny:1}],
  ["Sonic the Hedgehog",{real:0,male:1,human:0,animated:1,movie:1,tv:1,comic:1,superhero:0,magic:0,royalty:0,detective:0,villain:0,animal:1,space:0,game:1,singer:0,athlete:0,leader:0,mask:0,powers:1,green:0,school:0,british:0,american:0,funny:1}],
  ["Darth Vader",{real:0,male:1,human:1,animated:1,movie:1,tv:1,comic:1,superhero:0,magic:1,royalty:0,detective:0,villain:1,animal:0,space:1,game:1,singer:0,athlete:0,leader:0,mask:1,powers:1,green:0,school:0,british:0,american:0,funny:0}],
  ["Yoda",{real:0,male:1,human:0,animated:1,movie:1,tv:1,comic:1,superhero:0,magic:1,royalty:0,detective:0,villain:0,animal:0,space:1,game:1,singer:0,athlete:0,leader:0,mask:0,powers:1,green:1,school:0,british:0,american:0,funny:0}],
  ["Harry Potter",{real:0,male:1,human:1,animated:0,movie:1,tv:0,comic:0,superhero:0,magic:1,royalty:0,detective:0,villain:0,animal:0,space:0,game:1,singer:0,athlete:0,leader:0,mask:0,powers:1,green:0,school:1,british:1,american:0,funny:0}],
  ["Hermione Granger",{real:0,male:0,human:1,animated:0,movie:1,tv:0,comic:0,superhero:0,magic:1,royalty:0,detective:0,villain:0,animal:0,space:0,game:1,singer:0,athlete:0,leader:0,mask:0,powers:1,green:0,school:1,british:1,american:0,funny:0}],
  ["Wednesday Addams",{real:0,male:0,human:1,animated:1,movie:1,tv:1,comic:1,superhero:0,magic:0,royalty:0,detective:1,villain:0,animal:0,space:0,game:0,singer:0,athlete:0,leader:0,mask:0,powers:0,green:0,school:1,british:0,american:1,funny:1}],
  ["SpongeBob SquarePants",{real:0,male:1,human:0,animated:1,movie:1,tv:1,comic:1,superhero:0,magic:0,royalty:0,detective:0,villain:0,animal:1,space:0,game:1,singer:0,athlete:0,leader:0,mask:0,powers:0,green:0,school:0,british:0,american:1,funny:1}],
  ["Taylor Swift",{real:1,male:0,human:1,animated:0,movie:0,tv:0,comic:0,superhero:0,magic:0,royalty:0,detective:0,villain:0,animal:0,space:0,game:0,singer:1,athlete:0,leader:0,mask:0,powers:0,green:0,school:0,british:0,american:1,funny:0}],
  ["Elvis Presley",{real:1,male:1,human:1,animated:0,movie:1,tv:1,comic:0,superhero:0,magic:0,royalty:0,detective:0,villain:0,animal:0,space:0,game:0,singer:1,athlete:0,leader:0,mask:0,powers:0,green:0,school:0,british:0,american:1,funny:0}],
  ["Michael Jordan",{real:1,male:1,human:1,animated:0,movie:1,tv:0,comic:0,superhero:0,magic:0,royalty:0,detective:0,villain:0,animal:0,space:0,game:0,singer:0,athlete:1,leader:0,mask:0,powers:0,green:0,school:0,british:0,american:1,funny:0}],
  ["Serena Williams",{real:1,male:0,human:1,animated:0,movie:0,tv:0,comic:0,superhero:0,magic:0,royalty:0,detective:0,villain:0,animal:0,space:0,game:0,singer:0,athlete:1,leader:0,mask:0,powers:0,green:0,school:0,british:0,american:1,funny:0}],
  ["Albert Einstein",{real:1,male:1,human:1,animated:0,movie:0,tv:0,comic:0,superhero:0,magic:0,royalty:0,detective:0,villain:0,animal:0,space:0,game:0,singer:0,athlete:0,leader:0,mask:0,powers:0,green:0,school:0,british:0,american:0,funny:0}],
  ["Abraham Lincoln",{real:1,male:1,human:1,animated:0,movie:0,tv:0,comic:0,superhero:0,magic:0,royalty:0,detective:0,villain:0,animal:0,space:0,game:0,singer:0,athlete:0,leader:1,mask:0,powers:0,green:0,school:0,british:0,american:1,funny:0}]
].map(([name,traits])=>({name,traits}));

const answerWeights = {yes:1, no:0, probably:.75, probably_not:.25, unknown:.5};

let scores, asked, currentQ, questionNumber;

const $ = s => document.querySelector(s);
const screens = [...document.querySelectorAll(".screen")];

function showScreen(id){
  screens.forEach(s=>s.classList.toggle("active",s.id===id));
  window.scrollTo({top:0,behavior:"smooth"});
}

function resetGame(){
  scores = CANDIDATES.map(()=>0);
  asked = new Set();
  currentQ = null;
  questionNumber = 0;
}

function probability(score){
  // Converts accumulated mismatch penalty to a friendly confidence-like score.
  return Math.exp(-score);
}

function candidateRanking(){
  return CANDIDATES.map((c,i)=>({c,score:scores[i],p:probability(scores[i])}))
    .sort((a,b)=>a.score-b.score);
}

function remainingCount(){
  const ranked = candidateRanking();
  const best = ranked[0].score;
  return ranked.filter(x=>x.score <= best + 1.4).length;
}

function chooseQuestion(){
  const ranked = candidateRanking();
  const best = ranked[0].score;
  const pool = ranked.filter(x=>x.score <= best + 2.2);
  let bestQ=null, bestUtility=-Infinity;

  for(const q of QUESTIONS){
    if(asked.has(q.id)) continue;
    let yesWeight=0,total=0;
    for(const item of pool){
      const w = Math.max(.05,item.p);
      yesWeight += w * (item.c.traits[q.id] ?? .5);
      total += w;
    }
    if(!total) continue;
    const frac = yesWeight/total;
    // Maximize balanced split, while avoiding questions with too many unknowns.
    const balance = 1 - Math.abs(.5-frac)*2;
    const diversity = new Set(pool.map(x=>x.c.traits[q.id])).size;
    const utility = balance + (diversity>1 ? .15 : -.4);
    if(utility > bestUtility){
      bestUtility=utility; bestQ=q;
    }
  }
  return bestQ;
}

function updateMood(){
  const n=questionNumber;
  let badge="EXAMINING CLUES", icon="🔎", clue="The trail is warming up…";
  if(n<=2){badge="THINKING";icon="🤔";clue="Every case starts with a hunch."}
  else if(n<=5){badge="EXAMINING CLUES";icon="🔎";clue="I’m narrowing the suspect list."}
  else if(n<=8){badge="TAKING NOTES";icon="📝";clue="Interesting. Very interesting."}
  else if(n<=11){badge="GETTING CLOSE";icon="💡";clue="I think I’m onto you."}
  else {badge="CHECKING THE EVIDENCE";icon="🧩";clue="One more clue could crack this case."}
  $("#moodBadge").textContent=badge;
  $("#moodIcon").textContent=icon;
  $("#clueText").textContent=clue;
}

function renderQuestion(){
  const ranked = candidateRanking();
  const top = ranked[0];
  const second = ranked[1];

  // Guess if confidence separation is strong, few suspects remain, or after 14 questions.
  if(questionNumber >= 14 || remainingCount() <= 2 || (questionNumber>=7 && second && (second.score-top.score) > 1.35)){
    makeGuess();
    return;
  }

  currentQ = chooseQuestion();
  if(!currentQ){ makeGuess(); return; }
  asked.add(currentQ.id);
  questionNumber++;
  $("#questionCounter").textContent=`QUESTION ${questionNumber}`;
  $("#suspectCount").textContent=`Suspects: ${remainingCount()}`;
  $("#questionText").textContent=currentQ.text;
  $("#progressBar").style.width=`${Math.min(96,questionNumber/14*100)}%`;
  updateMood();
}

function applyAnswer(answer){
  const user = answerWeights[answer];
  CANDIDATES.forEach((cand,i)=>{
    const trait = cand.traits[currentQ.id] ?? .5;
    const mismatch = Math.abs(user-trait);
    // Unknown answers barely affect scoring.
    const factor = answer==="unknown" ? .15 : 1;
    scores[i] += mismatch * factor;
  });
  renderQuestion();
}

function makeGuess(){
  const ranked = candidateRanking();
  const best = ranked[0];
  $("#guessName").textContent=best.c.name;
  const margin = ranked[1] ? Math.max(0, ranked[1].score-best.score) : 1;
  let reason="The clues point here.";
  if(margin>.9) reason="The evidence is lining up nicely.";
  if(margin>1.6) reason="I’m feeling very good about this one.";
  $("#guessReason").textContent=reason;
  showScreen("guessScreen");
}

$("#startBtn").addEventListener("click",()=>{
  resetGame(); showScreen("gameScreen"); renderQuestion();
});
$("#howBtn").addEventListener("click",()=>$("#howPanel").open=!$("#howPanel").open);
document.querySelectorAll("[data-answer]").forEach(btn=>btn.addEventListener("click",()=>applyAnswer(btn.dataset.answer)));
$("#correctBtn").addEventListener("click",()=>{
  $("#winCopy").textContent=`Detective Gator cracked the case in ${questionNumber} questions.`;
  showScreen("winScreen");
});
$("#wrongBtn").addEventListener("click",()=>showScreen("stumpScreen"));
document.querySelectorAll(".restart").forEach(b=>b.addEventListener("click",()=>showScreen("startScreen")));

resetGame();
