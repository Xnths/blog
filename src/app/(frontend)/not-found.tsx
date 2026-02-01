import Link from 'next/link'
import React from 'react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-bauhaus-bg flex flex-col items-center justify-center p-8 text-bauhaus-black relative overflow-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-bauhaus-yellow -mr-32 -mt-32 rounded-full opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-bauhaus-blue opacity-20 transform -skew-y-3"></div>

      <div className="relative z-10 text-center">
        <div className="relative inline-block mb-8">
            <h1 className="text-[12rem] md:text-[20rem] font-black leading-none tracking-tighter mix-blend-multiply text-bauhaus-red">
              404
            </h1>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[10px] bg-bauhaus-black rotate-12"></div>
        </div>
        
        <h2 className="text-4xl md:text-6xl font-bold uppercase mb-12 border-b-4 border-bauhaus-black inline-block pb-4">
          Page Not Found
        </h2>

        <div className="flex justify-center">
          <Link href="/" className="group relative inline-block">
             <div className="absolute top-2 left-2 w-full h-full bg-bauhaus-black group-hover:top-0 group-hover:left-0 transition-all duration-300"></div>
             <div className="relative border-4 border-bauhaus-black bg-bauhaus-yellow px-12 py-4 text-2xl font-bold uppercase hover:bg-bauhaus-white transition-colors">
               Return Home
             </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
