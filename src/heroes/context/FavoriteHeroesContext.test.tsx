import { screen } from "@testing-library/react";
import { describe, test } from "vitest";
import { FavoriteHeroesContext, FavoriteHeroesProvider } from "./FavoriteHeroesContext";
import { use } from "react";

const TestComponent = () =>{
    const {favoriteCount} = use(FavoriteHeroesContext)
    return (
        
        <div>
            <div data-testid="favorite-count">{favoriteCount}</div>
        </div>
    )
}

const renderContextTest = () =>{
    <FavoriteHeroesProvider>
        <TestComponent />
    </FavoriteHeroesProvider>
}

describe('FavoriteHeroesContext', () => {
    test('should initialize with defaul values', () => {
        
        renderContextTest()

        screen.debug();
    });
});