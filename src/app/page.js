import InmovablesChart from "@/components/InmovablesChart"
import UsagesChart from "@/components/usagesChart"

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">

      <h1 className="text-xl">Provincias de Andalucía con Inmuebles</h1>
      <InmovablesChart />

      <h1>Uso actual con Inmuebles</h1>
      <UsagesChart />    
      </div>
  )
}
