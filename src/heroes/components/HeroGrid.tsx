
import type { Hero } from '../types/hero.interface';
import { HeroGridCard } from './HeroGridCard'


interface Props{
  herores: Hero[];
}
export const HeroGrid = ({herores}: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
      {/* Hero Card 1 - Superman */}
      

      {
        herores.map((hero) =>{
          return (
            <HeroGridCard key={hero.id} hero={hero} />
          )
        })
      }

      {/* <HeroGridCard  /> */}



    </div>
  )
}
