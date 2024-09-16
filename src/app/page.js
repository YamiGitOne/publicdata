import InmovablesComponent from "@/components/InmovablesComponent"
import UsagesChart from "@/components/usagesChart"
import ApiComponent from "@/components/UsersComponent"

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <h1>AXIOS</h1>
      <ApiComponent />

      <h1>Provincias de Andalucía con Inmuebles</h1>
      <InmovablesComponent />

      <h1>Uso actual con Inmuebles</h1>
      <UsagesChart />    
      </div>
  )
}
