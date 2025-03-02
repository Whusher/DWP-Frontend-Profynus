import Footer from "./Footer"
import Header from "./Header"
export default function Dashboard({child}) {
  return (
    <div className='flex flex-col  w-full min-h-screen bg-black'>
        <Header/>
            {child}
        <Footer/>
    </div>
  )
}
