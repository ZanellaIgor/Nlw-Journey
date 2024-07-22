import { useMutation } from '@tanstack/react-query';
import { FormEvent, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { useNavigate } from 'react-router-dom';
import { Toast } from '../../components/toast';
import { useToast } from '../../hooks/useToast';
import { api } from '../../lib/axios';
import { ConfirmTripModal } from './confirm-trip-modal';
import { InviteGuestsModal } from './invite-guests-modal';
import { DestinationAndDateStep } from './steps/destination-and-date-step';
import { InviteGuestsStep } from './steps/invite-guests-step';

export function CreateTripPage() {
  const navigate = useNavigate();
  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);
  const [isConfirmTripModalOpen, setIsConfirmTripModalOpen] = useState(false);
  const [emailsToInvite, setEmailsToInvite] = useState<string[]>([]);

  const [destination, setDestination] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [eventStartAndEndDates, setEventStartAndEndDates] = useState<
    DateRange | undefined
  >();

  const { toasts, addToast } = useToast();

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await api.post('/trips', {
        destination,
        starts_at: eventStartAndEndDates?.from,
        ends_at: eventStartAndEndDates?.to,
        emails_to_invite: emailsToInvite,
        owner_name: ownerName,
        owner_email: ownerEmail,
      });
      return response.data;
    },

    onError: (error: any) => {
      if (error.response.data.message) {
        addToast(error.response.data.message, 'error');
      } else {
        addToast('Erro desconhecido ao criar a viagem', 'error');
      }
    },
    onSuccess: (data: { tripId: string }) => {
      addToast('Viagem criada com sucesso!', 'success');
      navigate(`/trips/${data.tripId}`);
    },
  });
  function openGuestsInput() {
    if (!destination) {
      addToast('Por favor, informe um destino', 'error');
      return;
    }
    if (!destination) {
      addToast('Por favor, informe um local', 'error');
    }
    setIsGuestsInputOpen(true);
  }

  function closeGuestsInput() {
    setIsGuestsInputOpen(false);
  }

  function openGuestsModal() {
    setIsGuestsModalOpen(true);
  }

  function closeGuestsModal() {
    setIsGuestsModalOpen(false);
  }

  function openConfirmTripModal() {
    setIsConfirmTripModalOpen(true);
  }

  function closeConfirmTripModal() {
    setIsConfirmTripModalOpen(false);
  }

  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get('email')?.toString();

    if (!email) {
      return;
    }

    if (emailsToInvite.includes(email)) {
      return;
    }

    setEmailsToInvite([...emailsToInvite, email]);

    event.currentTarget.reset();
  }

  function removeEmailFromInvites(emailToRemove: string) {
    const newEmailList = emailsToInvite.filter(
      (email) => email !== emailToRemove
    );

    setEmailsToInvite(newEmailList);
  }

  async function createTrip(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!destination) {
      addToast('Por favor, informe um destino', 'error');
      return;
    }

    if (!eventStartAndEndDates?.from || !eventStartAndEndDates?.to) {
      addToast('Por favor, informe uma data', 'error');
      return;
    }

    if (emailsToInvite.length === 0) {
      addToast('Por favor, adicione pelo menos um convidado', 'error');
      return;
    }

    if (!ownerName || !ownerEmail) {
      addToast('Por favor, informe um nome e um email', 'error');
      return;
    }

    mutation.mutate();
  }

  return (
    <>
      <Toast toasts={toasts} />
      <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
        <div className="max-w-3xl w-full px-6 text-center space-y-10">
          <div className="flex flex-col items-center gap-3">
            <img src="/public/logo.svg" alt="plann.er" />
            <p className="text-zinc-300 text-lg">
              Convide seus amigos e planeje sua próxima viagem!
            </p>
          </div>

          <div className="space-y-4">
            <DestinationAndDateStep
              closeGuestsInput={closeGuestsInput}
              isGuestsInputOpen={isGuestsInputOpen}
              openGuestsInput={openGuestsInput}
              setDestination={setDestination}
              setEventStartAndEndDates={setEventStartAndEndDates}
              eventStartAndEndDates={eventStartAndEndDates}
            />

            {isGuestsInputOpen && (
              <InviteGuestsStep
                emailsToInvite={emailsToInvite}
                openConfirmTripModal={openConfirmTripModal}
                openGuestsModal={openGuestsModal}
              />
            )}
          </div>

          <p className="text-sm text-zinc-500">
            Ao planejar sua viagem pela plann.er você automaticamente concorda{' '}
            <br />
            com nossos{' '}
            <a className="text-zinc-300 underline" href="#">
              termos de uso
            </a>{' '}
            e{' '}
            <a className="text-zinc-300 underline" href="#">
              políticas de privacidade
            </a>
            .
          </p>
        </div>

        {isGuestsModalOpen && (
          <InviteGuestsModal
            emailsToInvite={emailsToInvite}
            addNewEmailToInvite={addNewEmailToInvite}
            closeGuestsModal={closeGuestsModal}
            removeEmailFromInvites={removeEmailFromInvites}
          />
        )}

        {isConfirmTripModalOpen && (
          <ConfirmTripModal
            closeConfirmTripModal={closeConfirmTripModal}
            createTrip={createTrip}
            setOwnerName={setOwnerName}
            setOwnerEmail={setOwnerEmail}
            destination={destination}
            dateTrip={eventStartAndEndDates as DateRange}
            isPending={mutation.isPending}
          />
        )}
      </div>
    </>
  );
}
