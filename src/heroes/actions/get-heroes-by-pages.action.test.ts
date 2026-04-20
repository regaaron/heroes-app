import { beforeEach, describe, expect, test } from "vitest";
import { getHeroesByPageAction } from "./get-heroes-by-pages.action";
import AxiosMockAdapter from 'axios-mock-adapter';
import { heroApi } from "../api/hero.api";

const BASE_URL = import.meta.env.VITE_API_URL;
describe('get-heroes-by-pages-action', () => {

    const heroresApiMock = new AxiosMockAdapter(heroApi);

    beforeEach(() => {
        heroresApiMock.reset();


    })

    test('should retunr default herores', async () => {

        heroresApiMock.onGet('/').reply(200, {
            heroes: [
                {
                    image: '1.jpg'
                },
                {
                    image: '2.jpg'
                }
            ],
            total: 20,
            page: 2,
        })
        const response = await getHeroesByPageAction(1)

        expect(response).toStrictEqual({
            heroes: [
                {
                    image: `${BASE_URL}/images/1.jpg`
                },
                {
                    image: `${BASE_URL}/images/2.jpg`
                }
            ],
            page: expect.any(Number),
            total: expect.any(Number),
        })

    })

    test('should return the correct herores when page is not a number', async () => {
        const responseObject = {
            total: 10,
            pages: 1,
            heroes: []
        }

        heroresApiMock.onGet('/').reply(200, responseObject);
        heroresApiMock.resetHistory();

        await getHeroesByPageAction('abc' as unknown as number);

        const params = heroresApiMock.history.get[0].params;
        expect(params).toEqual({ limit: 6, offset: 0, category: 'all' });


    })
})