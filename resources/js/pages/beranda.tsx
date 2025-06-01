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
            <section className="min-h-screen bg-sky-200">
                <div className="flex flex-col-reverse md:flex-row justify-around md:max-w-6xl h-svh md:mx-auto border border-amber-400">
                    <div className="border rounded-2xl border-blue-500 md:w-svh h-screen flex justify-center items-center">Sign for Student</div>
                    <div className="border rounded-2xl border-blue-500 md:w-svh h-screen flex justify-center items-center">Carousel</div>
                </div>
            </section>
            <main className="min-h-screen bg-cyan-200">
                Artikel
            </main>

        </LayoutBeranda>
    </>)
}
