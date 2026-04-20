import { createContext, useEffect, useState, type PropsWithChildren } from "react";
import type { Hero } from "../types/hero.interface";

interface FavoriteHeroesContext {
    //state
    favorites: Hero[]
    favoriteCount: number


    //methods
    isFavorite: (hero: Hero) => boolean;
    toggleFavorite: (hero: Hero) => void;

}

const getFavoritesFromLocalStorage = (): Hero[] => {
    const favorites = localStorage.getItem('favorites')
    return favorites ? JSON.parse(favorites) : [];
}


export const FavoriteHeroesContext = createContext({} as FavoriteHeroesContext);

export const FavoriteHeroesProvider = ({ children }: PropsWithChildren) => {

    const [favorites, setFavorites] = useState<Hero[]>(getFavoritesFromLocalStorage)

    useEffect (()=>{
        localStorage.setItem('favorites',JSON.stringify(favorites))
    },[favorites])

    const toggleFavorite = (hero: Hero) => {
        const heroExist = favorites.find(h => h.id === hero.id)

        if (heroExist) {
            const newFavorites = favorites.filter(h => h.id !== hero.id)
            setFavorites(newFavorites)
            
            return;
        }
        setFavorites([...favorites, hero]);
        
        

    }

    const isFavorite = (hero: Hero) => {
        return favorites.some(h => h.id === hero.id);
    }

    return (
        <FavoriteHeroesContext.Provider value={{
            favorites: favorites,
            favoriteCount: favorites.length,
            isFavorite: isFavorite,
            toggleFavorite: toggleFavorite,

        }}>
            {children}
        </FavoriteHeroesContext.Provider>


    )

}