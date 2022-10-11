const qutoesList = document.querySelector("#quote-list")

fetch("http://localhost:3000/quotes?_embed=likes")
.then(res => res.json())
.then(data => data.forEach(element => {
    renderQutoes(element)    
    })
)

function renderQutoes(quoteData){
    const newQutoe = document.createElement('li')
    newQutoe.className = "quote-card"
    newQutoe.innerHTML = `
        <blockquote class="blockquote">
        <p class = "mb-${quoteData.id}">${quoteData.quote}</p>
        <footer class = "blockquote-footer">${quoteData.author}</footer>
        <br>
        <button class = 'btn-success'>Likes: <span>0</span></button>
        <button class = 'btn-danger'>Delete</button>
        </blockquote>
        `
    qutoesList.append(newQutoe)

    let deleteBtn = newQutoe.querySelector(".btn-danger")
    deleteBtn.addEventListener('click', (e) => {
        e.target.parentNode.parentNode.remove()
        fetch(`http://localhost:3000/quotes/${quoteData.id}`,{
            method : "DELETE",
            headers :{
                'Content-Type' : 'application/json'
            }
        })
        .then(res => res.json())
    })
}

const quoteForm = document.querySelector("#new-quote-form")
quoteForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const addedQutoe = {
        quote : e.target.quote.value,
        author : e.target.author.value 
    }
    fetch("http://localhost:3000/quotes",{
        method : "POST",
        headers :{
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(addedQutoe)
    })
    .then(res => res.json())
    .then(data => renderQutoes(data))

    quoteForm.reset()
})

