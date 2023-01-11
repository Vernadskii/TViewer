import { useQuery } from "react-query";

import { Api } from "./Api";

const api = new Api();
const baseBackendUrl: string | undefined = process.env.REACT_APP_BACKEND_HOST;
export const useProfiles = () => {
    return useQuery({
      queryKey: ["get-profiles"],
      queryFn: async () => {
        let a;
        try {
          const res = await api.profiles.getProfiles({baseUrl: baseBackendUrl});
          a = res.data;
          return a;
        } catch (err) {
          return a;
        }
      },
      refetchOnWindowFocus: false,
    });
};

export const useTrades = (profile: string) => {
  return useQuery({
    queryKey: [`get-profiles-trades-${profile}`],
    queryFn: async () => {
      let a;
      try {
        const res = await api.profiles.tradesDetail(profile, {baseUrl: baseBackendUrl});
        a = res.data;
        return a;
      } catch (err) {
        return a;
      }
    },
    refetchOnWindowFocus: false,
  });
};

export const useHistoricalDataDetail = (profile: string, queries: any) => {
  return useQuery({
    queryKey: [`getHistoricalDataDetail-${profile}-${queries.indicator}-${queries.timeframe}`],
    queryFn: async () => {
      let a;
      try {
        const res = await api.profiles.historicalDataDetail(profile, 
              {indicator: queries.indicator, timeframe: queries.timeframe},
              {baseUrl: baseBackendUrl});
        a = res.data;
        return a;
      } catch (err) {
        console.log(err);
        return a;
      }
    },
    refetchOnWindowFocus: false,
    refetchInterval: 300000, // 5 minutes = 300 seconds = 300000 ms
    staleTime: 120000, // 2 minutes
  });
};
