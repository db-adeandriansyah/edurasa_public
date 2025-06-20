export default function LayoutWorkplace({children, ...props}:React.ComponentProps<'div'>){
    return(
        <div
            data-slot="background"
            className="bg-edurasa bg-fixed bg-no-repeat bg-cover bg-[50%]"
            {...props}
            >
                {children}
        </div>
    )
}
