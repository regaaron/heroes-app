import { describe, expect, test } from "vitest";
import { getHeroAction } from "./get-hero.action";


describe('get-hero.action.test', () => {
    test('should fetch hero data and return with complete image url', async () => {
        const info = 'bruce-wayne'
        const result = await getHeroAction(info);

        expect(result).toBeDefined()
        expect(result.image).toContain('http://localhost:3001/images')
    })

    test('should throw an error if hero is not found', async () => {

        //http://localhost:3001/api/heroes/batman-2 esta ruta marca error
        const infobad = 'batman-2'
        const result = await getHeroAction(infobad).catch((error) => {
            expect(error).toBeDefined()
            expect(error.message).toContain('404')
        })

        expect(result).toBeUndefined();

    })
})