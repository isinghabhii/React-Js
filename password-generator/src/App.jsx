import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")

  //useRef hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if (numberAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*-_+=[]{}~`"

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }

    setPassword(pass)

  }, [length, numberAllowed, charAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0, 999)
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed, passwordGenerator])

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-black px-4">
        <div className="w-full max-w-md rounded-xl border border-lime-500 bg-neutral-950 p-6 shadow-[0_0_40px_rgba(34,197,94,0.35)]">

          {/* Heading */}
          <h1 className="text-center text-2xl font-bold text-lime-400 tracking-widest mb-6">
            🔐PASSWORD GENERATOR
          </h1>

          {/* Password */}
          <div className="relative mb-6">
            <input
              type="text"
              value={password}
              readOnly
              ref={passwordRef}
              placeholder="Generate Password"
              className="w-full rounded-lg border border-lime-500 bg-black px-4 py-4 text-lime-400 text-lg tracking-widest outline-none"
            />

            <button
              onClick={copyPasswordToClipboard}
              className="absolute right-2 top-2 rounded-md bg-lime-500 px-4 py-2 font-semibold text-black transition hover:bg-lime-400"
            >
              COPY
            </button>
          </div>

          {/* Length */}
          <div className="mb-6">
            <div className="flex justify-between text-lime-400 mb-2">
              <span>Length</span>
              <span>{length}</span>
            </div>

            <input
              type="range"
              min={6}
              max={20}
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="w-full accent-lime-500 cursor-pointer"
            />
          </div>

          {/* Options */}
          <div className="space-y-3">

            <label className="flex items-center justify-between rounded-lg border border-lime-700 bg-neutral-900 px-4 py-3 hover:bg-neutral-800 cursor-pointer">

              <span className="text-lime-300">Include Numbers</span>

              <input
                type="checkbox"
                defaultChecked={numberAllowed}
                onChange={() => setNumberAllowed(prev => !prev)}
                className="h-5 w-5 accent-lime-500"
              />

            </label>

            <label className="flex items-center justify-between rounded-lg border border-lime-700 bg-neutral-900 px-4 py-3 hover:bg-neutral-800 cursor-pointer">

              <span className="text-lime-300">Special Characters</span>

              <input
                type="checkbox"
                defaultChecked={charAllowed}
                onChange={() => setCharAllowed(prev => !prev)}
                className="h-5 w-5 accent-lime-500"
              />

            </label>
          </div>

          {/* Generate New Password */}
          <button
            onClick={passwordGenerator}
            className="mt-6 w-full rounded-lg bg-lime-500 px-4 py-2 font-semibold text-black transition hover:bg-lime-400"
          >
            ⚡ Generate New Password
          </button>

        </div>
      </div>
    </>
  )
}

export default App

