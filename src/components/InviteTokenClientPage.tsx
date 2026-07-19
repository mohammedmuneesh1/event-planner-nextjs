"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { submitRsvp } from '@/lib/actions/events';
import { useRouter } from 'next/navigation';

const InviteTokenClientPage = (props: {
  inviteData: {
    id: string;
    eventId: string;
    event: {
      id: string;
      title: string;
      description: string | null;
      location: string | null;
      eventDate: Date | null;
    };
  };
  token: string;
}) => {
  const { inviteData, token } = props;
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSubmitted(false);

    const formData = new FormData(event.currentTarget);

    try {
      await submitRsvp(token, formData);
      setSubmitted(true);
    //   router.replace(`/invite/${token}?submitted=1`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  };

  return (
    <div className="mx-auto w-full max-w-2xl">
      <Card>
        <CardHeader className="space-y-3">
          <Badge variant="secondary" className="w-fit">
            RSVP
          </Badge>

          <CardTitle>{inviteData?.event?.title}</CardTitle>

          <p className="text-sm text-muted-foreground">
            {inviteData.event?.eventDate
              ? new Date(inviteData.event?.eventDate).toLocaleString()
              : 'No date selected'}
            {inviteData.event?.location ? ` - ${inviteData.event?.location}` : ''}
          </p>

          {inviteData?.event?.description ? (
            <p className="text-sm text-muted-foreground">{inviteData?.event?.description}</p>
          ) : null}
        </CardHeader>

        <CardContent className="space-y-4">
          {error ? (
            <div className="rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-700">
              {error}
            </div>
          ) : null}

          {submitted ? (
            <div className="rounded-md border border-green-200 bg-green-50 p-4 text-sm text-green-700">
              Thank you! Your RSVP has been recorded or updated.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="hidden" name="token" value={token} />

              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" name="name" placeholder="Your name" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="you@example.com" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="attendance">Attendance</Label>
                <select
                  id="attendance"
                  name="attendance"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  required
                >
                  <option value="">Select an option</option>
                  <option value="going">Going</option>
                  <option value="maybe">Maybe</option>
                  <option value="not_going">Not Going</option>
                </select>
              </div>

              <Button type="submit">Submit RSVP</Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InviteTokenClientPage;