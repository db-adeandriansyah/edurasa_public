import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import Autoplay from "embla-carousel-autoplay"

export function Example() {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
      // ...
    </Carousel>
  )
}
interface myTypeCarousel  {
    name:string;
    src:string;
}

const dataCarousel: myTypeCarousel[]=[
    {
        name:'Anisa Setiawati',
        src: 'https://lh3.googleusercontent.com/d/1_TAnL7d_IIZXtkiQrwOGpxDgDS8LrVUb'
    },
    {
        name:'Dyah Puji Lestari',
        src: 'https://lh3.googleusercontent.com/d/15gz7k42prJhAgBIjIwhaGKkRVx7qLBG5'
    },
    {
        name:'Dyah Puji Lestari',
        src: 'https://lh3.googleusercontent.com/d/15gz7k42prJhAgBIjIwhaGKkRVx7qLBG5'
    },
    {
        name:'Dyah Puji Lestari',
        src: 'https://lh3.googleusercontent.com/d/15gz7k42prJhAgBIjIwhaGKkRVx7qLBG5'
    },
    {
        name:'Dyah Puji Lestari',
        src: 'https://lh3.googleusercontent.com/d/15gz7k42prJhAgBIjIwhaGKkRVx7qLBG5'
    },
    {
        name:'Dyah Puji Lestari',
        src: 'https://lh3.googleusercontent.com/d/15gz7k42prJhAgBIjIwhaGKkRVx7qLBG5'
    },
    {
        name:'Dyah Puji Lestari',
        src: 'https://lh3.googleusercontent.com/d/15gz7k42prJhAgBIjIwhaGKkRVx7qLBG5'
    },
];
export default function MyCarousel(){
    return (
        <Carousel className="w-4/5"
            opts={{
                    align: "start",
                    loop: true,
                }}
            plugins={[
                Autoplay({
                delay: 5000,
                }),
            ]}
        >
            <CarouselContent>
                {
                    dataCarousel.map((item,index)=>{
                        return (
                            <CarouselItem key={index} className="@container">
                                <figure className="border overflow-hidden mx-auto w-48 h-48 md:w-60 rounded-full md:h-60 outline-5 outline-double my-3">
                                    <img className="aspect-ration" src={item.src}/>
                                    <figcaption>{item.name}</figcaption>
                                </figure>
                                <div className="w-60 text-center rounded-b-full mx-auto -translate-y-12  py-3 px-0 bg-white/50 backdrop-blur-3xl">{item.name}</div>
                            </CarouselItem>
                        )
                    })
                }
            </CarouselContent>
            <CarouselPrevious className="opacity-0 hover:opacity-100 transition-colors duration-600"/>
            <CarouselNext  className="opacity-0 hover:opacity-100 transition-colors duration-600"/>
        </Carousel>
    )
}
