const loadLesson=()=>{
    fetch("https://openapi.programming-hero.com/api/levels/all") // promise of respons
    .then((res) => res.json()) // promise of json data
    .then((json) => displayLesson(json.data))
};
    const loadLevelWord =(id)=>{
        const url =`https://openapi.programming-hero.com/api/level/${id}`
        fetch(url)
        .then((res) => res.json())
        .then((data) => displayLevelWord(data.data)
        );
    };

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
            <button class="btn bg-sky-50 hover:bg-[#6ab5fb80] border-none"><i class="fa-solid fa-circle-info"></i></button>
            <button class="btn bg-sky-50 hover:bg-[#6ab5fb80] border-none"><i class="fa-solid fa-volume-high"></i></button>
          </div>
        </div>
             `
            //4, appand into container
            wordContainer.append(wordCard)
        });
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
        <button onclick="loadLevelWord(${lesson.level_no})" class="btn btn-outline btn-primary">
        <i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}
        </button>
        `
        //4, appand into container
        levelContainer.append(btndiv)
    };
}
loadLesson();