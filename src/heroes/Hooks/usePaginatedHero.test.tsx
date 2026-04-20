import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { usePaginatedHero } from "./usePaginatedHero";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";
import { getHeroesByPageAction } from "../actions/get-heroes-by-pages.action";

vi.mock('../actions/get-heroes-by-pages.action',()=>({
    getHeroesByPageAction: vi.fn()
}))

const mockGetHeroesByPageAction = vi.mocked(getHeroesByPageAction)
const queryClient = new QueryClient(
        {
            defaultOptions: {
                queries: {
                    retry: false
                }
            }
        }
    );


const tanstackCustomProvider = () => {
    
    return ( { children }: PropsWithChildren ) => (
        <QueryClientProvider client={ queryClient }>{ children }</QueryClientProvider>
    );
};


describe('usePaginatedHero',()=>{

    beforeEach(()=>{
        //clean all mocks
        vi.clearAllMocks()
        queryClient.clear()
    })
    test('should retunr the initial state',()=>{
        const {result} = renderHook(() => usePaginatedHero(1,6),{
            wrapper: tanstackCustomProvider(),
        })

        expect(result.current.isLoading).toBe(true)
        expect(result.current.isError).toBe(false)
        expect(result.current.data).toBe(undefined)
        expect(result.current.data).toBeUndefined()
    })

    test('should return success state with data when API call succeeds',async()=>{
        

        const mockHeroesData = {
            total: 40,
            pages: 4,
            heroes: []
        }

        mockGetHeroesByPageAction.mockResolvedValue(mockHeroesData)

        const {result} = renderHook(()=> usePaginatedHero(1,6),{
            wrapper: tanstackCustomProvider()
        })
        await waitFor(()=>{
            expect(result.current.isSuccess).toBe(true)
            expect(result.current.data).not.toBeUndefined()
        })

        expect(result.current.status).toBe('success')
        expect(mockGetHeroesByPageAction).toHaveBeenCalledWith(1,6,'all')
        

    })

    test('should call getHeroesByPageAction with correct parameters',async()=>{
        const mockHeroesData = {
            total: 40,
            pages: 4,
            heroes: []
        }

        mockGetHeroesByPageAction.mockResolvedValue(mockHeroesData)

        const {result} = renderHook(()=> usePaginatedHero(1,6,'heroes'),{
            wrapper: tanstackCustomProvider()
        })

        await waitFor(()=>{
            expect(result.current.isSuccess).toBe(true)
            expect(result.current.data).not.toBeUndefined()
        })

        expect(result.current.status).toBe('success')
        expect(mockGetHeroesByPageAction).toHaveBeenCalledWith(1,6,'heroes')
    })
})