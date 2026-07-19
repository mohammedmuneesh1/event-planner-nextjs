

import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { prisma } from '@/lib/prisma';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { countByStatus } from '@/lib/utils';








const DashboardContent =async ({userId}:{userId:string}) => {


    const rows  = await prisma.event.findMany(
        {
        where:{
        ownerUserId:userId
    },
    orderBy:{createdAt:'desc'},
    select:{
        id:true,
        title:true,
        eventDate:true,
        location:true,
        rsvps:{select:{status:true}}
    }
}
);


const events = rows?.map((e)=>({
    id:e.id,
    title:e.title,
    eventDate:e.eventDate ? e.eventDate.toISOString().split("T")[0] : null,
    location:e.location,
    ...countByStatus(e?.rsvps ?? []),
}));






  

  return (
    <div className="flex flex-1 flex-col gap-6">
        <div
         className="flex flex-wrap items-center justify-between gap-3 ">
            <div>
            <h1 className="flex">You Events</h1>
            <p>Track attende responses and manage invitge links </p>
            </div>

        <Button asChild>

            <Link href={"/events/new"}>
                Create Event
            </Link>
        </Button>

        </div>


        {/*LIST OF EVENTS */}


        {
            events?.length === 0 ? (

                <Card>
                    <CardHeader>
                        <CardTitle>
                            No events yet
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-[var(--muted-foredround)]">
                            Create your first event to start collecting RSVPs.
                        </p>
                    </CardContent>
                </Card>
            ):(
                <div className="grid gap-4 md:grid-cols-2">
                    {events?.map((e)=>(
                        <Card key={e?.id}>
                            <CardHeader className="space-y-3">
                         <div className="flex items-start justify-between gap-2">
                        <CardTitle className="text-lg" >
                        {e?.title ?? "N/A"}
                                    </CardTitle>
                                    <Button>
                                        <Link href={`/events/${e?.id}`}>
                                            View Event
                                        </Link>
                                    </Button>
                                </div>
                                
                                <div className="flex flex-wrap gap-2 text-xs">
                                    <Badge variant="secondary" >
                                        Going:{e?.goingCount} 
                                        </Badge>
                                    <Badge variant="secondary">
                                        Maybe:{e?.maybeCount} 
                                        </Badge>
                                    <Badge variant="secondary">
                                        Not Going:{e?.notGoingCount}
                                    </Badge>
                                </div>

                                <p>
                                    {
                                        e?.eventDate ? new Date (e?.eventDate).toDateString() : "N/A"
                                    }
                                </p>

                                

                 
                                
                            </CardHeader>
                            </Card>
                    ))}
                </div>

            )
        }

        




    </div>
  )
}

export default DashboardContent