
"use client"
import { CardContent } from '@/components/ui/card'
import React, { useEffect, useState } from 'react'
import MaidCard from './maid-card'
import HttpInterceptor from '@/lib/http-interseptor'


const Maids= () => {
const [maids,setMaids] = useState<[]>([])

const getMaids = async ()=>{
  try{
  const {data} =  await HttpInterceptor.get("/maid/maids")
  const maids = data.data
  setMaids(maids)
  }
  catch(err:unknown)
  {
    console.log(err)
  }
}

useEffect(()=>{
  getMaids()
},[])

  return (
    <CardContent >
      <div className='w-full grid grid-cols-3 gap-8'>
        { maids &&
         maids.map((maid:any,index)=>(
          <MaidCard 
          key={maid.id}
          maid={maid}
          index={index}
          
          />
        ))
      }
      </div>
    </CardContent>
  )
}

export default Maids