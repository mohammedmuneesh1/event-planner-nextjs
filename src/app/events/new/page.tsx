"use client";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { createEventAction } from '@/lib/actions/events'
import { useActionState } from 'react';

type CreateEventState = {
  error?: string | null;
  success?: boolean | null;
};

const CreateNewEventPage = () => {
  const initialState: CreateEventState = {
    error: null,
    success:null,
  };

  const [state, formAction] = useActionState<CreateEventState, FormData>(
    createEventAction,
    initialState
  );



  return (
    <div className="mx-auto w-full max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Create Event</CardTitle>
        </CardHeader>
        <CardContent>
          <Form className="gap-6"
          action={formAction}
          >
            <FormField>
              <FormItem>
                <FormLabel htmlFor="title">Title</FormLabel>
                <Input id="title" name="title" required placeholder="Team dinner" />
              </FormItem>
            </FormField>

            <FormField>
              <FormItem>
                <FormLabel htmlFor="description">Description</FormLabel>
                <Textarea
                  id="description"
                  name="description"
                  required
                  placeholder="Optional details about the event"
                />
              </FormItem>
            </FormField>

            <FormField>
              <FormItem>
                <FormLabel htmlFor="location">Location</FormLabel>
                <Input id="location" name="location" required placeholder="Optional Location" />
              </FormItem>
            </FormField>

            <FormField>
              <FormItem>
                <FormLabel htmlFor="eventDate">Date and time</FormLabel>
                <Input id="eventDate" name="eventDate" type="datetime-local" />
                <FormMessage className='text-slate-50!'>Optional, you can set this later</FormMessage>
              </FormItem>
            </FormField>

            {state.error && <p className="text-red-500">{state.error}</p>}
            {state.success && <p className="text-green-500">{`Event created successfully.`}</p>}

            <div className="space-x-3!">
              <Button type="submit">
                Create Event
              </Button>

              <Button type="button" variant="outline" asChild>
                <Link href="/dashboard"> 
                Cancel
                </Link> 
              </Button>
            </div>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}

export default CreateNewEventPage;