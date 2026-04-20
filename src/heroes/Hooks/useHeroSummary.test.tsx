import type { PropsWithChildren } from "react";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { renderHook, waitFor } from '@testing-library/react'
import { useHeroSummary } from "./useHeroSummary";
import { QueryClient } from "@tanstack/react-query";
import { QueryClientProvider } from "@tanstack/react-query";
import { getSummaryAction } from "../actions/get-heroes-summary.action";
import type { SummaryResponse } from "../types/get-summary-response";

vi.mock('../actions/get-heroes-summary.action',()=>({
    getSummaryAction: vi.fn()
}))

const mockGetSummaryAction = vi.mocked(getSummaryAction)

beforeEach(() => {
    vi.clearAllMocks();
});

const tanstackCustomProvider = () => {
    const queryClient = new QueryClient(
        {
            defaultOptions: {
                queries: {
                    retry: false
                }
            }
        }
    );
    return ( { children }: PropsWithChildren ) => (
        <QueryClientProvider client={ queryClient }>{ children }</QueryClientProvider>
    );
};

describe('useHeroSummary', () => {

    test('should return the initial state (isLoading)', () => {
        const { result } = renderHook(() => useHeroSummary(), {
            wrapper: tanstackCustomProvider()
        });

        expect(result.current.isLoading).toBe(true);
        expect(result.current.isError).toBe(false);
        expect(result.current.data).toBeUndefined();

    })

    test('should return success state with data when API call succeeds', async () =>{

        const mockSummaryData = {
            totalHeroes: 10,
            strongestHero: {
                id: '1',
                name: 'superman'
            },
            smartestHero: {
                id: '2',
                name: 'batman'
            },
            heroCount: 18,
            villainCount: 7
        } as SummaryResponse

        
        mockGetSummaryAction.mockResolvedValue(mockSummaryData);
        
        const { result } = renderHook(() => useHeroSummary(),{
            wrapper: tanstackCustomProvider()
        })

        await waitFor(()=>{
            expect(result.current.isSuccess).toBe(true);
            
        })

        expect(result.current.isError).toBe(false);
        expect(mockGetSummaryAction).toHaveBeenCalledTimes(1);


    })

    test('should return error state when API call fails', async () => {
        
        const mockError  = new Error('Failled to fetch summary');
        mockGetSummaryAction.mockRejectedValue(mockError);

        const {result} = renderHook(() => useHeroSummary(),{
            wrapper: tanstackCustomProvider()
        })

        await waitFor(()=>{
            expect(result.current.isError).toBe(true);
        })

        console.log(result);
        expect(result.current.isError).toBe(true);
        expect(mockGetSummaryAction).toHaveBeenCalledTimes(1);
        expect(result.current.data).toBeUndefined();
        
        
    })
})