import { useFetchGuestId } from 'front-end/src/hooks/guest.query';
import { CheckCircle2, CircleDashed, UserCog } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { Button } from '../../components/button';
import { GuestPlaceholder } from './guest.placeholder';

export function Guests() {
  const { tripId } = useParams();

  const { data: participants, isLoading } = useFetchGuestId(tripId as string);

  if (isLoading) return <GuestPlaceholder />;
  return (
    <div className="space-y-6">
      <h2 className="font-semibold text-xl">Convidados</h2>

      <div className="space-y-5">
        {participants?.map((participant, index) => (
          <div
            key={participant.id}
            className="flex items-center justify-between gap-4"
          >
            <div className="space-y-1.5">
              <span className="block font-medium text-zinc-100">
                {participant.name ?? `Convidado ${index}`}
              </span>
              <span className="block text-sm text-zinc-400 truncate">
                {participant.email}
              </span>
            </div>

            {participant.is_confirmed ? (
              <CheckCircle2 className="text-green-400 size-5 shrink-0" />
            ) : (
              <CircleDashed className="text-zinc-400 size-5 shrink-0" />
            )}
          </div>
        ))}
      </div>

      <Button variant="secondary" size="full">
        <UserCog className="size-5" />
        Gerenciar convidados
      </Button>
    </div>
  );
}
