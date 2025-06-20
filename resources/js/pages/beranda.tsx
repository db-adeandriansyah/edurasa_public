import MyCarousel from "@/components/my-components/my-carousel";
import MyLogo from "@/components/my-components/my-logo";
import InputFloating, { InputFloatingOutline, InputFloatingStandar } from "@/components/my-ui/input-floating";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LayoutBeranda from "@/layouts/layout-beranda";
import { Head, usePage } from "@inertiajs/react";

export default function Beranda(){
    console.log(usePage())
    return (<>
        <LayoutBeranda>
            <Head title="Beranda">
                <link rel="preconnect" href="https://fonts.bunny.net" />

                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <section className="grid grid-cols-1 md:grid-cols-2 md:gap-2 mask-alpha mask-r-from-black mask-r-from-50% mask-r-to-transparent min-h-svh">
                <div className="flex justify-center items-center order-2 md:order-1">
                    <div className="relative overflow-hiddden border-2 p-4 w-full mx-4 my-3 rounded-3xl shadow-lg flex justify-evenly flex-col items-center dark:bg-sky-950/30 dark:border-sky-500/10 gap-2">
                        <div className="absolute -top-4 start-0 md:top-0 md:-rotate-35 md:-translate-y-2  md:-translate-x-9 bg-sky-300/80 dark:bg-sky-900 p-1 rounded-4xl">
                            Login untuk Siswa
                        </div>
                        <p>Untuk Peserta didik, silakan login menggunakan NISN:</p>
                        <form className="bg-white dark:bg-gray-900 p-2 rounded-sm">
                            <InputFloatingOutline id="inputnisn" labelName="Masukkan NISN-mu" type="text"/>
                            <Button disabled type="submit">Login</Button>
                        </form>
                    </div>
                </div>
                <div className="flex flex-col md:gap-2 order-1 md:order-2 items-center justify-center">
                    <p>Yang telah Bergabung:</p>
                    <MyCarousel/>
                </div>
            </section>

            <main className="min-h-screen" id="artikel">
                <div className="relative">
                    <div className="absolute top-0 left-1/2 -translate-y-1/2 border-4 border-sky-600 outline-1 outline-sky-300 rounded-3xl h-20 w-20 flex justify-center items-center">
                        <MyLogo/>
                    </div>
                    <div className="border rounded-4xl shadow-lg pt-10 px-3 pb-3">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, mollitia.
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Explicabo animi nemo velit! Omnis cumque quisquam commodi assumenda minus. Repudiandae culpa facilis sit consequatur esse voluptate eos, at explicabo perspiciatis minima ratione recusandae dolorum ipsa consequuntur sequi facere inventore doloremque autem saepe nostrum maxime. Ratione ipsum dolorem reiciendis. Sunt delectus praesentium sed adipisci dolorum doloremque nostrum veritatis laborum in explicabo blanditiis, quia quibusdam qui officiis, consequatur, fugiat ab ipsum impedit aperiam labore commodi molestias. Iure non delectus fugit cum provident atque fuga veniam incidunt assumenda doloribus aut dignissimos, similique aliquid officia, a, dicta optio. Voluptatem odit dolorum id, suscipit tempore cupiditate?
                    </div>
                </div>

            </main>


        </LayoutBeranda>
    </>)
}
