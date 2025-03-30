import { useState, useEffect } from 'react'
import toast, { Toaster } from "react-hot-toast";


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

    toast.success("Password copied to clipboard!", {
      duration: 2000,
      position: "top-right",
      style: {
        background: "#ffe1fa",  
        color: "#550036",
        fontWeight: "bold",
      },
      iconTheme: {
        primary: "#fff",  
        secondary: "#550036",
      },
    });
  }


  return (
    <>
      <div className="flex flex-col justify-center items-center mt-4 md:w-1/2 mx-auto w-[90%] bg-[#ffe1fa] rounded-lg">
        <div className="p-4 text-[#550036] font-bold text-4xl">Password Generator</div>
        <div className="pb-4 px-4 text-[#550036] text-xl">Generate a random password in the blink of an eye and copy it effortlessly.</div>

        <div className='w-full flex justify-center'>
          <input className='w-1/2 px-2 py-1 rounded-l-lg text-[#550036] font-bold outline-none'
            type="text"
            value={password}
            readOnly
          />
          <button className='px-2 py-1 rounded-r-lg bg-[#550036] text-[#ffe1fa] font-bold hover:bg-[#840053]'
            onClick={copyButton}
          >COPY</button>
        </div>


        <div className='flex flex-col md:flex-row justify-around items-center gap-4 p-4 my-4 w-full md:w-2/3 '>
          <div className='flex md:flex-row flex-col items-center justify-center gap-x-1 '>
            <input
              type="range"
              value={length}
              min={6}
              max={32}
              onChange={(e) => setLength(e.target.value)}
              className=' accent-[#550036]'
            />
            <label>Length: {length}</label>
          </div>
          <div className='flex items-center justify-center gap-x-1'>
            <input
              className='h-4 w-4 accent-[#550036]'
              type="checkbox"
              onChange={e => setNumbersAllowed(e.target.checked)}
            />
            <label>Numbers</label>
          </div>
          <div className='flex items-center justify-center gap-x-1 '>
            <input
              className='h-4 w-4 accent-[#550036]'  
              type="checkbox"
              onChange={() => setCharactersAllowed((prev) => !prev)}
            />
            <label>Special Characters</label>
          </div>
        </div>

      </div>
      <Toaster />
    </>

  )
}

export default App
