import React, { useState, useEffect } from "react"

async function fetchData(url) {
  const resultado = await fetch(url)
  const json = await resultado.json();
  return json
}

let btnValue=""

export default function App() {
  
  const [search, setSearch]=useState('Places')
  const [records, SetRecords] =useState([])
  
  function extraerDatos(valor){
    btnValue=valor
    const key = '9ed5b4524880f8103138f3855cc4c8bf'
    const url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${key}&tags=${valor}&per_page=24&format=json&nojsoncallback=1`
    
    fetchData(url)
    .then(datos=>SetRecords(datos.photos.photo))
  }

  useEffect(()=>{
    extraerDatos(search)
  }, [])


  return (
    <div>

      <div className="flex flex-col w-screen items-center justify-center">
          <div className="w-3/4 boder-4 text-center mt-48 mb-8"  >
            <h1 className="font-extrabold text-[#051c33]  text-7xl font-style: italic align-middle">
              SnapShot
            </h1>
          </div>
          <div className="flex flex-row md:w-3/4 items-center justify-center mr-16 sm:w-[95vw]">
            <input type="search" name="Search" placeholder="Search..." className="sm:ml-12 h-12 bg-[#edeff0] text-xl clases sm:w-[94%] md:w-[350px] lg:w-[770px]" onChange={(ev)=>setSearch(ev.target.value)}/>
            <button className="size-6 h-12 w-20 bg-[hsl(300,11%,98%)]" onClick={extraerDatos}>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="white"
                    className="size-6 h-12 w-20 bg-[hsl(300,11%,98%)]" >
                    <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                </svg>
            </button>
          </div>

          <div className="grid sm:grid-cols-1 md:grid-cols-4 mt-14 gap-4 lg:grid-cols-4 md:w-2/4 sm:w-[90%] sm:content-center">
              <button value="Mountain" onClick={(e)=>extraerDatos(e.target.value)} className="flex justify-center items-center p-5 h-8 sm:w-full rounded text-base bg-slate-900 text-white font-bold ">Mountain</button>
              <button value="Beaches" onClick={(e)=>extraerDatos(e.target.value)} className="flex justify-center items-center p-5 h-8 sm:w-full rounded text-base bg-slate-900 text-white font-bold">Beaches</button>
              <button value="Foods" onClick={(e)=>extraerDatos(e.target.value)} className="flex justify-center items-center p-5 h-8 sm:w-full rounded text-base bg-slate-900 text-white font-bold">Foods</button>
              <button value="Bird" onClick={(e)=>extraerDatos(e.target.value)} className="flex justify-center items-center p-5 h-8 sm:w-full rounded text-base bg-slate-900 text-white font-bold">Bird </button>
          </div>

          <div className="w-3/4 boder-4 text-center mt-20 mb-10"  >
            <h2 className="text-[#051c33] font-bold text- text-5xl">
              {btnValue} Pictures
            </h2>
          </div>

            <div className="PhotoDimension grid sm:grid-cols-2 md:grid-cols-3 mt-4 gap-8 lg:grid-cols-4 w-3/4 ">
                { records &&
                  records.map((rs)=>
                    <Photos key={rs.id} photos={rs} />
                )}
            </div> 
    </div> 
      
   </div>
  )
}


function Photos({photos:{farm, server, id, secret, title}}){

  return(<img src={`https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_m.jpg`} 
    alt={title} className="w-[275] h-[184]"/>)
}