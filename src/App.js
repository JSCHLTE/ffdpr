import React, { useState, useRef } from 'react'
import Style from "./style.css"

function App() {

  const [teamInput, setTeamInput] = useState("")
  const [teamList, setTeamList] = useState([])
  const [pickedList, setPickedList] = useState([])
  const inputRef = useRef(null)

  //handle input change
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
    teamList.splice(rng, 1)
    console.log(teamList)
  }

  function delItem(event) {
    for(let i = 0; i < teamList.length; i++) {
      console.log(`Before ${teamList}`)
      if(event.target.innerText === teamList[i]) {
        setTeamList(oldTeamList => oldTeamList.filter((i) => event.target.innerText !== i))
      }
      console.log(`After ${teamList}`)
    }
  }


  return (
    <div className="App">
      <h2>Fantasy Draft Order Randomizer</h2>
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
        </div>
      </form>
      <div className='viewWrapper'>
        <div className='teamsView'>
        <h2>Draft List</h2>
          <ol>
            {teamList.map(x => <li className='remove' onClick={delItem}>{x}</li>)} 
          </ol>
        </div>
        <div className='pickView'>
        <h2>Draft Order</h2>
          <ol>
            {pickedList.map(y => <li>{y}</li>)}
          </ol>
        </div>
      </div>
      <footer>
        <p>© 2023 JSCHLTE v1.0</p>
      </footer>
    </div>
  );
}

export default App;
