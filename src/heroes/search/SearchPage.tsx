import { CustomJumbotron } from '@/components/custom/CustomJumbotron'
import { HeroStarts } from '../components/HeroStarts'
import { SearchControl } from './ui/SearchControl'
import { CustomBredCrumb } from '@/components/custom/CustomBredCrumb'
import { useSearchParams } from 'react-router'
import { useQuery } from '@tanstack/react-query'
import { searchHeroesAction } from '../actions/search-heroes.action'
import { HeroGrid } from '../components/HeroGrid'

export const SearchPage = () => {
    const [searchParamas] = useSearchParams();
  const name = searchParamas.get('name') ??  undefined;
  const strength = Number(searchParamas.get('strength') ??  undefined);

  
  const {data:heroes = []} = useQuery({
    queryKey: ['search',{name,strength}],
    queryFn: () => searchHeroesAction({name,strength}),
    staleTime: 1000 * 60 * 5, // 5 minutes
  })


  return (
    <>
        <CustomJumbotron title="Busqueda de Superheroes" subtitle="Descubre, explora y gestiona tus superhéroes y villanos" />
        
        <CustomBredCrumb currentPage="Buscador de Heroes" />

        <HeroStarts />

      {/* Fillter and search control */}
        <SearchControl />

        <HeroGrid herores={heroes} />

        
    </>
  )
}

export default SearchPage

