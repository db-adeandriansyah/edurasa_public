import edurasaLogo from '../../images/lamaso.webp'

export default function AppLogo() {
    return (
        <>
            <div className="bg-sky-300/50 dark:bg-white text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
                <img src={edurasaLogo} alt="Edurasa Logo" className="size-7 fill-current dark:text-blue-300 text-black" />    
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-none font-semibold">Edurasa for Public</span>
            </div>
        </>
    );
}
