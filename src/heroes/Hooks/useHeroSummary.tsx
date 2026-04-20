import { getSummaryAction } from '../actions/get-heroes-summary.action'
import { useQuery } from '@tanstack/react-query'

export const useHeroSummary = () => {

    return useQuery({
        queryKey: ['summary-information'],
        queryFn: () => getSummaryAction(),
        staleTime: 1000 * 60 * 5, // 5 minutes
    })

}
