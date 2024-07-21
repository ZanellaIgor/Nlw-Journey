import { useQuery } from '@tanstack/react-query';
import { Activity } from '../interfaces/activity.interface';
import { api } from '../lib/axios';

async function fetchActivitiesById(tripId: string): Promise<Activity[]> {
  try {
    const response = await api.get(`trips/${tripId}/activities`);
    return response.data.activities;
  } catch (error) {
    throw new Error(`Failed to fetch activities for trip ${tripId}`);
  }
}

export function useFetchActivityId(uuid: string) {
  return useQuery({
    queryKey: ['activities', uuid],
    queryFn: () => fetchActivitiesById(uuid),
  });
}
