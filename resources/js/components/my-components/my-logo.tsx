import logo from '../../../images/lamaso.webp';
export default function MyLogo(){
    return(
        <div className="absolute rounded-2xl text-center top-0 bottom-0 border shadow-lg bg-white l md:left-1/2 md:-translate-x-6 w-[54px] h-[54px] my-1">
            <img src={logo} alt="edurasa publik"/>
            <span className='absolute bg-white truncate top-1/2 left-0 -rotate-15 font-extrabold text-red-600 translate-y-1 translate-x-5 text-[10px] leading-none'>for Public</span>
        </div>
    )
}
