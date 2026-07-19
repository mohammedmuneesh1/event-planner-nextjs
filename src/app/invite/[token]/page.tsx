import InviteTokenClientPage from '@/components/InviteTokenClientPage';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';

const InvitePage = async ({ params }: { params: Promise<{ token: string }> }) => {
  const { token } = await params;

  const invite = await prisma.eventInvite.findUnique({
    where: { token },
    select: {
        id:true,
      eventId: true,
      event: {
        select: {
          id: true,
          title: true,
          description: true,
          location: true,
          eventDate: true,
        },
      },
    },
  });

  if (!invite?.event) {
    notFound();
  }

  return (
  <InviteTokenClientPage
  inviteData={invite}
  token={token}
  />
  );
};

export default InvitePage;
