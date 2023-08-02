import React, { useState, useRef, useEffect } from 'react'
import "./style.css"

function App() {

  const [teamInput, setTeamInput] = useState("")
  const [teamList, setTeamList] = useState(JSON.parse(localStorage.getItem("teamList")) || [])
  const [pickedList, setPickedList] = useState(JSON.parse(localStorage.getItem("pickedList")) || [])
  const inputRef = useRef(null)

  //Adds team list values into localStorage when team list array is modified
  useEffect(() => {
    localStorage.setItem("teamList", JSON.stringify(teamList))
  }, [teamList])

    //Adds draft list values into localStorage when draft list array is modified
  useEffect(() => {
    localStorage.setItem("pickedList", JSON.stringify(pickedList))
  }, [pickedList])

  function handleChange(event) {
    setTeamInput(event.target.value)
  }

  //Adds a team into the team list when the enter button is hit or the add team button is clicked.
  function handleSubmit(event) {
    event.preventDefault()
    if(!inputRef.current.value.trim()) {
      alert("Enter a team name.")
      inputRef.current.focus()
      return
    }
    for(let i = 0; i < teamList.length; i++){
      if(teamList[i] === inputRef.current.value){
        alert("Team is already entered with this name.")
        setTeamInput(oldInput => "")
        inputRef.current.focus()
        return
      }
    }
    setTeamList(oldTeamList => ([
      ...oldTeamList,
      teamInput
    ]))
    createNoti(`${teamInput} added.`)
    setTeamInput(oldInput => "")
  }

  //Will select a random team from the team list and put them into the draft order list.
  function handlePick(event) {
    if(teamList <= 0){
      alert("Please add a team into the team list.")
      inputRef.current.focus()
      return
    }
    const rng = Math.floor(Math.random()*teamList.length)
    const randomPick = teamList[rng]
    setPickedList(oldPickedList => ([
      ...oldPickedList,
      randomPick
    ]))
    createNoti(`${teamList[rng]} is pick #${pickedList.length + 1}`)
    teamList.splice(rng, 1)
    setTeamList(oldTeamList => ([...oldTeamList]))
  }

  //Deletes a team when clicked on in the teams list.
  function delItem(event) {
    for(let i = 0; i < teamList.length; i++) {
      if(event.target.innerText === teamList[i]) {
        setTeamList(oldTeamList => oldTeamList.filter((i) => event.target.innerText !== i))
        createNoti(`${teamList[i]} removed.`)
      }
    }
  }

  //Clears draft order when clear button is clicked.
  function handleClear(event) {
    event.preventDefault()
    setPickedList(oldPickedList => [])
    createNoti("Draft order cleared.")
  }

  //Creates notification when called.
  function createNoti(notiMsg){
    const notiWrapper = document.querySelector(".notiWrapper")
    const newNoti = document.createElement("div")
    newNoti.innerHTML = `<i class="fas fa-exclamation-circle"></i><p>${notiMsg}</p>`
    notiWrapper.appendChild(newNoti)
    newNoti.classList.add("notiActive")
    setTimeout(() => {
      newNoti.classList.remove("notiActive")
    }, 2500);
    setTimeout(() => {
      newNoti.remove();
    }, 3500);
  }


  return (
    <div className="App">
      <h2 className='titleh2'>Fantasy Draft Order Randomizer</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type='text'
          id='teamInput'
          name='teamInput'
          onChange={handleChange}
          value={teamInput}
          ref={inputRef}
          placeholder='Add Team'
        />
        <div className='formBtn'>
          <button id='addBtn' type='submit'>ADD TEAM</button>
          <button onClick={handlePick} id='draftBtn' type='button'>REVEAL DRAFT PICK</button>
          <button id='clearBtn' onClick={handleClear}>CLEAR ORDER</button>
        </div>
      </form>
      <div className='viewWrapper'>
        <div className='teamsView'>
        <h2>Draft List</h2>
          <ol>
            {teamList.map(x => <li key={x} className='remove' onClick={delItem}>{x}</li>)} 
          </ol>
        </div>
        <div className='pickView'>
        <h2>Draft Order</h2>
          <ol>
            {pickedList.map(y => <li key={y}>{y}</li>)}
          </ol>
        </div>
      </div>
      <div className='notiWrapper'>
      </div>
      <footer>
        <p>© 2023 <a href='https://jschlte.github.io/' target='_blank' rel='noreferrer' className='copyright'>Jordan S.</a></p>
      </footer>
    </div>
  );
}

export default App;
