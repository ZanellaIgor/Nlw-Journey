import { useQuery } from '@tanstack/react-query';
import { Trip } from '../interfaces/trip.interface';
import { api } from '../lib/axios';

async function fetchTripById(tripId: string): Promise<Trip[]> {
  try {
    const response = await api.get(`trips/${tripId}/trip`);
    return response.data.trip;
  } catch (error) {
    throw new Error(`Failed to fetch trip ${tripId}`);
  }
}

export function useFetchTripId(uuid: string) {
  return useQuery({
    queryKey: ['trip', uuid],
    queryFn: () => fetchTripById(uuid),
  });
}
