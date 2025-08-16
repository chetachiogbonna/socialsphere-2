import { verifyWebhook } from '@clerk/nextjs/webhooks'
import { NextRequest, NextResponse } from 'next/server'
import { api } from '../../../../../convex/_generated/api';
import { ConvexHttpClient } from "convex/browser";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req)

    console.log('Received webhook data:', evt.data);

    if (evt.type === "user.created") {
      await convex.mutation(api.user.createUser, {
        clerk_userId: evt.data.id!,
        first_name: evt.data.first_name!,
        last_name: evt.data.last_name!,
        username: evt.data.username!,
        email: evt.data.email_addresses[0].email_address,
        created_at: evt.data.created_at
      });

      return NextResponse.json({ status: "success" }, { status: 200 });
    }

    // if (evt.type === "user.deleted") {
    //   await convex.mutation(api.user.deleteUser, {
    //     clerk_userId: evt.data.id!
    //   })
    // }

    // if (evt.type === "user.updated") {
    //   await convex.mutation(api.user.updateUser, {
    //     clerk_userId: evt.data.id!,
    //     first_name: evt.data.first_name!,
    //     last_name: evt.data.last_name!,
    //     username: evt.data.username!,
    //     email: evt.data.email_addresses[0].email_address,
    //     updated_at: evt.data.updated_at
    //   })
    // }

    return NextResponse.json({ error: "Invalid webhook" }, { status: 400 });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json({ error: "Invalid webhook" }, { status: 400 });
  }
}