import { useCallback, useEffect, useRef, useState } from "react";
import heroModel from "./assets/hero-model.svg"

function App() {
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(10);
  const [isCharAllowed, allowChar] = useState(false);
  const [isNumAllowd, allowNum] = useState(false);

  // Taking PasswordInput Reference for selecting value
  const passwordInpt = useRef();

  const passwordGenerate = useCallback(() => {
    let actualPwd = "";

    let baseString = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (isNumAllowd) baseString += "0123456789";

    if (isCharAllowed) baseString += "!${}[]@%(#~`/|";

    for (let i = 0; i < length; i++) {
      let randomIndx = Math.floor(Math.random() * baseString.length + 1);
      actualPwd += baseString.charAt(randomIndx);
    }

    setPassword(actualPwd);
  }, [length, isCharAllowed, isNumAllowd]);

  useEffect(() => {
    passwordGenerate();
  }, [length, isCharAllowed, isNumAllowd])

  function copyPasswordToClipboard() {
    navigator.clipboard.writeText(passwordInpt.current.value);
    passwordInpt.current.select();
  }

  return (
    <div className="bg-zinc-100 text-black h-screen w-full">
      <header className="w-full flex justify-center pt-14">
        <h1 className="text-4xl">Password Generator</h1>
      </header>
      <main className="h-4/5 flex justify-evenly align-middle">
        <img src={heroModel} alt="password" width={450} />
        <div className="w-2/5 flex flex-col align-baseline justify-center">
          <h1 className="mb-8 text-2xl text-[#009ab0] font-semibold tracking-wideset">Generate the Strong Password</h1>
          <div className="flex shadow rounded-lg overflow-hidden mb-8">
            <input
              type="text"
              value={password}
              className="outline-none w-full py-3 px-3 selection:bg-gray-200"
              placeholder="Password"
              readOnly
              ref={passwordInpt}
            />
            <button
              onClick={copyPasswordToClipboard}
              className='outline-none bg-slate-900 text-white px-3 py-0.5 shrink-0'
            >copy</button>

          </div>
          <div className='flex text-sm gap-x-2'>
            <div className='flex items-center gap-x-1'>
              <input
                type="range"
                min={6}
                max={50}
                value={length}
                className='cursor-pointer accent-slate-900'
                onChange={(e) => { setLength(e.target.value) }}
              />
              <label className="text-base">{length}</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                id="numberInput"
                className="accent-slate-900"
                onChange={() => {
                  allowNum((prev) => !prev);
                }}
              />
              <label htmlFor="numberInput" className="text-base">Numbers</label>
            </div>
            <div className="flex items-center gap-x-1">
              <input
                type="checkbox"
                id="characterInput"
                className="accent-slate-900"
                onChange={() => {
                  // state function allow to read previous state value
                  // so previous state value is TRUE(charAllowd) then update to it's false
                  // vice-versa
                  allowChar((prev) => !prev)
                }}
              />
              <label htmlFor="characterInput" className="text-base">Characters</label>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default App
