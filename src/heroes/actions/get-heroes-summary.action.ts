import { heroApi } from "../api/hero.api"
import type { SummaryResponse } from "../types/get-summary-response";

// const BASE_URL = import.meta.env.VITE_API_URL

export const getSummaryAction = async (): Promise<SummaryResponse> =>{

    const { data } = await heroApi.get<SummaryResponse>('/summary');
    // console.log({data});
    
    return data
}