
// import { Button } from "@/components/ui/button"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CustomJumbotron } from "@/components/custom/CustomJumbotron"
import { HeroStarts } from "../components/HeroStarts"
import { HeroGrid } from "../components/HeroGrid"
import { use, useMemo } from "react"
import { CustomPagination } from "@/components/custom/CustomPagination"
import { CustomBredCrumb } from "@/components/custom/CustomBredCrumb"
import { useSearchParams } from "react-router"
import { useHeroSummary } from "../Hooks/useHeroSummary"
import { usePaginatedHero } from "../Hooks/usePaginatedHero"
import { FavoriteHeroesContext } from "../context/FavoriteHeroesContext"



export const HomePages = () => {

  const [searchParams, setSearchParams] = useSearchParams();

  const { favoriteCount, favorites } = use(FavoriteHeroesContext)

  console.log({ favoriteCount, favorites });



  const activeTab = searchParams.get('tab') ?? 'all'
  const page = searchParams.get('page') ?? '1'
  const limit = searchParams.get('limit') ?? '6'
  const category = searchParams.get('category') ?? 'all'

  const selectedTab = useMemo(() => {
    const validTabs = ['all', 'favorites', 'heroes', 'villains'];
    return validTabs.includes(activeTab) ? activeTab : 'all';
  }, [activeTab])

  // const [activeTab, setActiveTab] = useState<'all' | 'favorites' | 'heroes' | 'villains'>("all")

  const { data: heroesResponse } = usePaginatedHero(+page, +limit, category)


  const { data: infoTabs } = useHeroSummary();


  // useEffect(()=>{
  //   getHeroesByPage().then((heroes) =>{

  //   })

  // }, [])

  return (
    <>
      <>
        {/* Header */}
        <CustomJumbotron title="Universo de Superheroes" subtitle="Descubre, explora y gestiona tus superhéroes y villanos" />

        {/* Breadcrumb */}
        <CustomBredCrumb currentPage="Super Heroes" />

        {/* Stats Dashboard */}
        <HeroStarts />

        {/* Tabs */}
        <Tabs value={selectedTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all" onClick={() => {
              setSearchParams((prev) => {
                prev.set("tab", "all");
                prev.set('category', 'all');
                return prev;
              })
            }}>All Characters ({infoTabs?.totalHeroes})</TabsTrigger>
            <TabsTrigger value="favorites" className="flex items-center gap-2" onClick={() => {
              setSearchParams((prev) => {
                prev.set("tab", "favorites");
                prev.set('category', 'all');
                return prev;
              })
            }}>
              Favorites ({favoriteCount})
            </TabsTrigger>
            <TabsTrigger value="heroes" onClick={() => {
              setSearchParams((prev) => {
                prev.set("tab", "heroes");
                prev.set('category', 'hero');
                return prev;
              })
            }}>Heroes ({infoTabs?.heroCount})</TabsTrigger>
            <TabsTrigger value="villains" onClick={() => {
              setSearchParams((prev) => {
                prev.set("tab", "villains");
                prev.set('category', 'villain');
                return prev;
              })
            }}>Villains ({infoTabs?.villainCount})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" >
            {/* Mostrar todos los personajes */}
            <HeroGrid herores={heroesResponse?.heroes || []} />
          </TabsContent>

          <TabsContent value="favorites" >
            {/* Mostrar personajes favoritos */}
            <HeroGrid herores={favorites} />
          </TabsContent>

          <TabsContent value="heroes" >
            {/* Mostrar personajes heroes */}
            <HeroGrid herores={heroesResponse?.heroes || []} />

          </TabsContent>

          <TabsContent value="villains" >
            {/* Mostrar personajes villanos */}
            <HeroGrid herores={heroesResponse?.heroes || []} />

          </TabsContent>
        </Tabs>


        {selectedTab !== 'favorites' && (
          <CustomPagination totalPages={heroesResponse?.pages ?? 1} />
        )
        }
      </>
    </>
  )
}