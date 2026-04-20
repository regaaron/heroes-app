import { heroApi } from "../api/hero.api";
import type { Hero } from "../types/hero.interface";

const VITE_API_URL = import.meta.env.VITE_API_URL;

export const getHeroAction = async (idSlug: string)=>{
    const { data } = await heroApi.get<Hero>(`/${idSlug}`);
    // console.log({data});
    
    return {
        ...data,
        image: `${VITE_API_URL}/images/${data.image}`
    }

}