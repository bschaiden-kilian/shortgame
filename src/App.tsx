import ScrollableDrillList from "./ScrollableDrillList"

function App() {
  return (
    <div className="min-h-screen overflow-hidden bg-mist-950 text-white pt-20 py-10 px-5 flex flex-col gap-10">
      <div className="w-full flex flex-col gap-1.5">
        <h3 className=" text-gray-400 font-mono text-xs font-light tracking-wider">V1.0 - SANDBOX</h3>
        <h1 className="text-4xl font-semibold tracking-tight">Shortgame.</h1>
        <p className="w-2/3 text-gray-400 text-sm font-light">Pick a drill. Log scores. Get out of your own head.</p>
      </div>
      <ScrollableDrillList/>
    </div>
  )
}

export default App