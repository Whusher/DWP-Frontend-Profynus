import React from 'react'
import { LogoutSVG, SettingsSVG } from '../Utils/SVGExporter'
import { Link } from 'react-router'

export default function Header() {
  return (
    <div className='flex w-full z-10 rounded-lg bg-black text-white min-h-20 justify-between shadow-lg shadow-cyan-600'>
        <div className='basis-1/4 flex justify-center items-center'>
            <button className='cursor-pointer p-3'>
                {SettingsSVG()}
            </button>
        </div>
        <div className='basis-2/4 py-4 flex justify-center'>
            <div className='w-3/4 flex rounded-lg border-cyan-400 border-2 items-center justify-around p-3 my-4'>
                <Link to={"/home"}>
                    Home
                </Link>
                <Link to={"/home"}>
                    Account
                </Link>
                <Link to={"/home"}>
                    Services
                </Link>
            </div>
        </div>
        <div className='basis-1/4 flex items-center justify-evenly'>
            <button className='cursor-pointer'>
                {LogoutSVG()}
            </button>
            <p>Hello User</p>
        </div>
    </div>
  )
}
