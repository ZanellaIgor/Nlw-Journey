import { useQuery } from '@tanstack/react-query';

import { Guest } from '../interfaces/guest.interface';
import { api } from '../lib/axios';

async function fetchGuestById(tripId: string): Promise<Guest[]> {
  try {
    const response = await api.get(`trips/${tripId}/participants`);
    return response.data.participants;
  } catch (error) {
    throw new Error(`Failed to fetch participants for trip ${tripId}`);
  }
}

export function useFetchGuestId(uuid: string) {
  return useQuery({
    queryKey: ['participants', uuid],
    queryFn: () => fetchGuestById(uuid),
  });
}
