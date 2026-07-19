import EventDetailContent from '@/components/EventDetailContent';
import { getSession } from '@/lib/auth/server';
import { prisma } from '@/lib/prisma';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';

const EventByIdPage = async ({ params }: { params: Promise<{ eventId: string }> }) => {
  const { eventId } = await params;
  const session = await getSession();
  const userId = session?.data?.user?.id;
  if (!userId) {
    return null;
  }

  
  

  const row = await prisma.event.findFirst({
    where: { id: eventId, ownerUserId: userId },
    select: {
      id: true,
      title: true,
      description: true,
      eventDate: true,
      location: true,
      invite: { select: { token: true } },
      rsvps: { select: { status: true } },
    },
  });


  const rsvpDataRows = await prisma.eventRsvp.findMany({
    where: { eventId: eventId },
    orderBy:{
      respondedAt:"desc"
    },
    select:{
      id: true,
      name: true,
      email: true,
      respondedAt: true,
      status: true
    }
    
  });

  if (!row) {
    notFound();
  }

  const inviteUrl =row?.invite?.token  ?  ` ${process.env.NEXT_PUBLIC_APP_URL}/invite/${row?.invite?.token}` : null;

  return <EventDetailContent
   userId={userId}
   eventId={eventId}
   row={row}
   inviteUrl={inviteUrl}
   rsvpDataRows={rsvpDataRows}
       />;
};

export default EventByIdPage;







