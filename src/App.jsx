import { useState, useEffect } from 'react'

function App() {

  const [password, setPassword] = useState("")
  const [length, setLength] = useState(8)
  const [NumbersAllowed, setNumbersAllowed] = useState(false)
  const [CharactersAllowed, setCharactersAllowed] = useState(false)

  const passwordGenerator = () => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    let numbers = "1234567890"
    let characters = "~!@#$%&*"

    if (NumbersAllowed) str += numbers
    if (CharactersAllowed) str += characters

    for (let i = 0; i < length; i++) {

      const char = str.charAt(Math.random() * str.length + 1)
      pass = pass + char
    }
    setPassword(pass)
  }

  useEffect(() => {
    passwordGenerator()
  }, [length, NumbersAllowed, CharactersAllowed])

  const copyButton = () => {
    navigator.clipboard.writeText(password)
  }


  return (
    <>
      <div className="flex flex-col justify-center items-center mt-4 md:w-1/2 mx-auto w-[90%] bg-[#1e1e1e] text-white rounded-lg">
        <div className="p-4 font-bold text-2xl">Password Generator</div>

        <div className='w-full flex justify-center'>
          <input className='w-1/2 px-2 py-1 rounded-l-lg text-[#0075ff] font-bold outline-none'
            type="text"
            value={password}
            readOnly
          />
          <button className='px-2 py-1 rounded-r-lg bg-[#0075ff] font-bold hover:bg-[#3f99ff]'
            onClick={copyButton}
          >COPY</button>
        </div>


        <div className='flex flex-col justify-around items-center p-4 w-full md:w-2/3 2xl:flex-row'>
          <div className='flex items-center justify-center gap-x-1 '>
            <input
              type="range"
              value={length}
              min={6}
              max={32}
              onChange={(e) => setLength(e.target.value)}
            />
            <label>Length: {length}</label>
          </div>
          <div className='flex items-center justify-center gap-x-1'>
            <input
              type="checkbox"
              onChange={e => setNumbersAllowed(e.target.checked)}
            />
            <label>Numbers</label>
          </div>
          <div className='flex items-center justify-center gap-x-1 '>
            <input
              type="checkbox"
              onChange={() => setCharactersAllowed((prev) => !prev)}
            />
            <label>Special Characters</label>
          </div>
        </div>

      </div>
    </>

  )
}

export default App
