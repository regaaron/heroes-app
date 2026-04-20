import { heroApi } from "../api/hero.api"
import type { HeroresResponse } from "../types/get-heroes-response"

const BASE_URL = import.meta.env.VITE_API_URL

export const getHeroesByPageAction = async (page:number,limit: number = 6,category: string = 'all'):Promise<HeroresResponse> =>{
    // console.log(page);
    if(isNaN(page)){
        page = 1;
    }

    if(isNaN(limit)){
        limit = 6;
    }
    
    const { data } = await heroApi.get<HeroresResponse>('/',{
        params:{
            limit: limit,
            offset: (page - 1) * limit,
            category: category
        }
    })

    const herores = data.heroes.map((hero) =>{
        
        return {
            ...hero,
            image: `${BASE_URL}/images/${hero.image}`

        }

        
        
            
    })

    // console.log({data});
    return {
        ...data,
        heroes: herores
    };
}