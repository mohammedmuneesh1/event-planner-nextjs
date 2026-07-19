"use client"

import { Button } from "./ui/button";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Form } from "./ui/form";
import { createInviteLinkAction } from "@/lib/actions/events";
import { countByStatus } from "@/lib/utils";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

type EventDetailRow = {
  id: string;
  title: string;
  description?: string | null;
  location?: string | null;
  eventDate?: Date | null;
  invite?: {
    token?: string | null;
  } | null;
//   rsvps?: Array<{ status?: ("going" | "maybe" | "not_going") | null }> | null;
//eslint-disable-next-line
  rsvps?: any;
};


type RsvpRow = {
  id: string;
  name: string;
  email: string;
  respondedAt: Date;
  status: "going" | "maybe" | "not_going";
};




const EventDetailContent = (props: {
  userId: string;
  eventId: string;
  row: EventDetailRow;
  rsvpDataRows:RsvpRow[] 
  inviteUrl: string | null;
}) => {
  const { eventId, row, inviteUrl, rsvpDataRows } = props;



  const counts = countByStatus(row?.rsvps ?? null );
  const router = useRouter();


  const events = {
    id: row.id,
    title: row.title,
    description: row.description,
    location: row.location,
    eventDate: row.eventDate ? row.eventDate.toISOString().split("T")[0] : null,
    inviteToken: row.invite?.token ?? null,
    goingCount: counts.goingCount ?? 0,
    maybeCount: counts.maybeCount ?? 0,
    notGoingCount: counts.notGoingCount ?? 0,
  }

   const createInviteActionLinkForEvent =createInviteLinkAction.bind(null, eventId);








  
  
//   async ()=>{
//     const session = await getSession();
//     const userId  = session?.data?.user?.id;
//     const owns = await prisma.event.findFirst({
//         where:{
//             id:eventId,
//             ownerUserId:userId
//         },
//         select:{
//             id:true
//         }
//     });
   
//     if(!owns){
//         throw new Error("Event not found");
//     }


//     const token = crypto.randomUUID().replace(/-/g, "");

//     await prisma.eventInvite.upsert({
//         where:{eventId},
//         create:{eventId,token},
//         udpate:{token},
//     });

//   }


// return(
//     <>
//     asdfasdfasdfasdf
//     </>
// )

const generateLinkFn =async()=>{
await createInviteActionLinkForEvent();
return router.refresh();
}

  return (
<div className="flex flex-col gap-6 ">
    <div className="flex flex-wrap items-start justify-between gap-4 ">
<div className="space-y-2">
  <h1 className="text-2xl font-semibold">{events?.title ?? "N/A"}</h1>
  <p>
    {row.eventDate ? new Date(row.eventDate).toLocaleString() : "No date set"}
  </p>
  <p className="text-sm text-muted-foreground">
    {row?.location ?? "No location provided"}
  </p>
  {
      events?.description && (
          <p className="text-sm text-muted-foreground">
        {events?.description}
      </p>
    )
}
</div>
<Button asChild variant={"outline"}>
    <Link href="/dashboard">
    Back
    </Link>
</Button>
</div>  
<div  className="flex flex-wrap gap-2 text-xs">
    <Badge>Going:{events?.goingCount} </Badge>
    <Badge variant="secondary">Maybe:{events?.maybeCount} </Badge>
    <Badge variant="outline">Not Going:{events?.notGoingCount} </Badge>    
</div>

<Card>
    <CardHeader>Invite Link </CardHeader>
    <CardContent className="space-y-3">

        <p className="text-sm text-muted-foreground ">
            Share this link with guest so they can RSVP without creating an account.
        </p>

        {
            inviteUrl ? (
                <div className="roudned-md border border-border bg-surface p-3 text-sm ">
                  {inviteUrl ?? ""}
                </div>
            ):(
                <p>No invite link generated yet.</p>
            )
        }
        <Form 
        action={generateLinkFn}
        >
            <Button
             type="button" 
             className="cursor-pointer rounded-sm"
            onClick={()=>{
                navigator.clipboard.writeText(inviteUrl ?? "");
            }}
            >
                Copy Link
            </Button>




            <Button type="submit">
                Generate Link
            </Button>
        </Form>



       
    </CardContent>
</Card>


<Card>
    <CardHeader>
        Attendees
    </CardHeader>

    <CardContent>
        {rsvpDataRows.length > 0 ? (
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Responded At</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {rsvpDataRows.map((row) => {
                        const statusVariant =
                            row.status === "going"
                                ? "default"
                                : row.status === "maybe"
                                  ? "secondary"
                                  : "outline";

                        return (
                            <TableRow key={row.id}>
                                <TableCell>{row.name}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>
                                    <Badge variant={statusVariant}
                                    className="capitalize"
                                    >
                                        {row.status.replace("_", " ")}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    {new Date(row.respondedAt).toLocaleString()}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        ) : (
            <p className="text-sm text-muted-foreground">No attendees yet.</p>
        )}
    </CardContent>
</Card>
</div>
);







};


export default EventDetailContent;




