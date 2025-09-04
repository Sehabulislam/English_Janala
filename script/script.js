const loadLesson=()=>{
    fetch("https://openapi.programming-hero.com/api/levels/all") // promise of respons
    .then((res) => res.json()) // promise of json data
    .then((json) => displayLesson(json.data))
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
        <button class="btn btn-outline btn-primary">
        <i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}
        </button>
        `
        //4, appand into container
        levelContainer.append(btndiv)
    };
}
loadLesson();