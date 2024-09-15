const Note = ({note, toggleImpotance}) => {
  const label = note.important ? 'make not important' : 'make important'

  return (
   <li className='note'>
    {note.content}
    <button onClick={toggleImpotance}>{label}
    </button>
   </li>
  )
}

export default Note
