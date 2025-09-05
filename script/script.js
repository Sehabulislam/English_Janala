    // const createElement = (arr) => {
    //     const htmlElements = arr.map((ele) => `<span class="btn">${el}</span>`);
    //     return htmlElements.join(" ");
    // };
    function pronounceWord(word) {
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.lang = "hi-IN";// English
        window.speechSynthesis.speak(utterance);
}
    
    const manageSpinner=(status)=>{
        if(status == true){
            document.getElementById("spinner").classList.remove("hidden");
            document.getElementById("word-container").classList.add("hidden");
        } else{
            document.getElementById("word-container").classList.remove("hidden");
            document.getElementById("spinner").classList.add("hidden");
        }
    }

    const loadLesson=()=>{
        fetch("https://openapi.programming-hero.com/api/levels/all") // promise of respons
        .then((res) => res.json()) // promise of json data
        .then((json) => displayLesson(json.data))
    };
    const removeActive = ()=>{
        const lessonBtn = document.querySelectorAll(".lesson-btn");
        // console.log(lessonBtn);
        lessonBtn.forEach((btn) => btn.classList.remove("active"))
        
    }
    const loadLevelWord =(id)=>{
        manageSpinner(true)
        const url =`https://openapi.programming-hero.com/api/level/${id}`
        fetch(url)
        .then((res) => res.json())
        .then((data) => {
            removeActive();// remove all active class
            const clickBtn = document.getElementById(`lesson-btn-${id}`)
            clickBtn.classList.add("active");
            displayLevelWord(data.data)
            } 
    );
    };

    const loadWordDetile = async(id)=>{
        const url = `https://openapi.programming-hero.com/api/word/${id}`;
        // console.log(url);
        const res = await fetch(url);
        const details = await res.json();
        displayWordDetail(details.data);
    };
//  id: 5
// level: 1
// meaning
// : 
// "আগ্রহী"
// partsOfSpeech
// : 
// "adjective"
// points
// : 
// 1
// pronunciation
// : 
// "ইগার"
// sentence
// : 
// "The kids were eager to open their gifts."
// synonyms
// : 
// (3) ['enthusiastic', 'excited', 'keen']
// word
// : 
// "Eager"

    const displayWordDetail =(word)=>{
        console.log(word);
        const detailsBox = document.getElementById("details-container");
        detailsBox.innerHTML =`
         <div class="">
          <h1 class="text-2xl font-bold">${word.word} (<i class="fa-solid fa-microphone-lines"></i> : ${word.pronunciation} )</h1>
        </div>
        <div class=" text-lg">
          <h2 class="font-semibold mb-1">Meaning</h2>
          <p class="font-bangla">${word.meaning}</p>
        </div>
        <div class="">
          <h2 class="font-semibold mb-1">Example</h2>
          <p>${word.sentence}</p>
        </div>
        <div class="">
          <h2 class="font-semibold font-bangla mb-1">সমার্থক শব্দ গুলো</h2>
          <span class="btn bg-sky-50 font-bangla">${word.synonyms[0] ? word.synonyms[0] : "আর নেই"}</span>
          <span class="btn bg-sky-50 font-bangla">${word.synonyms[1] ? word.synonyms[1] : "আর নেই"}</span>
          <span class="btn bg-sky-50 font-bangla">${word.synonyms[2] ? word.synonyms[2] : "আর নেই"}</span>
        </div>
        `
         document.getElementById("word_modal").showModal()
    }
    const displayLevelWord =(words)=>{
        //1. get the container & empty 
        const wordContainer = document.getElementById("word-container")
        wordContainer.innerHTML = "";
        if(words.length == 0){
           wordContainer.innerHTML = `
           <div class="text-center col-span-full space-y-3">
          <img src="assets/alert-error.png" alt="" class="m-auto">
          <p class="text-md text-gray-500 font-bangla">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
          <h2 class="text-4xl font-semibold font-bangla">নেক্সট Lesson এ যান </h2>
        </div>
           `;
           manageSpinner(false)
           return
        }
         //2. get into every lessons
        words.forEach((word) => {
            //3. create element 
            const wordCard = document.createElement("div")
            wordCard.innerHTML = `
            <div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-3 w-90%">
          <h2 class="text-2xl font-bold">
          ${word.word ? word.word : "শব্দ পাওয়া যাইনি"}</h2>
          <p class="text-[14px]">Meaning/Pronounciation</p>
          <h2 class="text-xl font-semibold mb-9 font-bangla">
          "${word.meaning ? word.meaning : "অর্থ পাওয়া যাইনি"}/
          ${word.pronunciation ? word.pronunciation : "Pronunciation পাওয়া যাইনি"}"</h2>
          <div class="flex justify-between items-center">
            <button onclick="loadWordDetile(${word.id})" class="btn bg-sky-50 hover:bg-[#6ab5fb80] border-none"><i class="fa-solid fa-circle-info"></i></button>
            <button onclick = "pronounceWord('${word.word}')" class="btn bg-sky-50 hover:bg-[#6ab5fb80] border-none"><i class="fa-solid fa-volume-high"></i></button>
          </div>
        </div>
             `
            //4, appand into container
            wordContainer.append(wordCard)
        });
        manageSpinner(false)
    };

    const displayLesson =(lessons)=>{
        //1. get the container & empty 
        const levelContainer = document.getElementById("level-container")
        levelContainer.innerHTML = "";
        //2. get into every lessons
        for(let lesson of lessons){
            //3. create element 
            const btndiv = document.createElement("div")
            btndiv.innerHTML = `
            <button id="lesson-btn-${lesson.level_no}"
            onclick="loadLevelWord(${lesson.level_no})"
            class="btn btn-outline btn-primary lesson-btn">
            <i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}
            </button>
            `
            //4, appand into container
            levelContainer.append(btndiv)
        };
    }
loadLesson();

document.getElementById("btn-search").addEventListener('click',()=>{
    removeActive()
    const input = document.getElementById("input-search")
    const searchValue = input.value.trim().toLowerCase();
    console.log(searchValue);

    fetch("https://openapi.programming-hero.com/api/words/all")
    .then((res) => res.json())
    .then((data) => {
        const allWords = data.data;
        console.log(allWords);
        const filterWords = allWords.filter((word) =>
        word.word.toLowerCase().includes(searchValue) 
    );
    displayLevelWord(filterWords);
    
    });
    
});

