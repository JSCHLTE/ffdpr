import React, { useState, useRef, useEffect } from 'react'
import Style from "./style.css"

function App() {

  const [teamInput, setTeamInput] = useState("")
  const [teamList, setTeamList] = useState(JSON.parse(localStorage.getItem("teamList")) || [])
  const [pickedList, setPickedList] = useState(JSON.parse(localStorage.getItem("pickedList")) || [])
  const inputRef = useRef(null)

  useEffect(() => {
    localStorage.setItem("teamList", JSON.stringify(teamList))
  }, [teamList])

  useEffect(() => {
    localStorage.setItem("pickedList", JSON.stringify(pickedList))
  }, [pickedList])

  function handleChange(event) {
    setTeamInput(event.target.value)
  }

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

  function delItem(event) {
    for(let i = 0; i < teamList.length; i++) {
      if(event.target.innerText === teamList[i]) {
        setTeamList(oldTeamList => oldTeamList.filter((i) => event.target.innerText !== i))
        createNoti(`${teamList[i]} removed.`)
      }
    }
  }

  function handleClear(event) {
    event.preventDefault()
    setPickedList(oldPickedList => [])
    createNoti("Draft order cleared.")
  }

  function createNoti(notiMsg){
    const notiNode = document.querySelector(".notiAlert")
    const notiMsgElement = document.getElementById("notiMsg")
    notiNode.classList.add("notiActive")
    notiMsgElement.innerText = notiMsg
    setTimeout(() => {
      notiNode.classList.remove("notiActive")
    }, 2000);
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
      <div className='notiAlert'>
        <i className="fas fa-exclamation-circle"></i>
        <p id='notiMsg'></p>
      </div>
      <footer>
        <p>© 2023 <a href='https://jschlte.github.io/' target='_blank' rel='noreferrer' className='copyright'>Jordan S.</a></p>
      </footer>
    </div>
  );
}

export default App;
