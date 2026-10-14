"use client";

import { EnvelopeSimpleIcon } from "@phosphor-icons/react";
import { Popover } from "radix-ui";

import { ContactChannels, MailAppLink } from "@/components/shared/contact-channels";
import { CopyEmailButton } from "@/components/shared/copy-email-button";
import { Button } from "@/components/ui/button";
import { contactCopy } from "@/content/site";

type ContactPopoverProps = {
  size?: "sm" | "lg";
  align?: "start" | "end";
};

// Contact options anchored to their trigger: lighter than a modal, and it doesn't fling visitors
// past every section the way scrolling to #contact would.
export function ContactPopover({ size = "lg", align = "start" }: ContactPopoverProps) {
  return (
    <Popover.Root>
      <Popover.Trigger asChild>
        <Button size={size}>
          <EnvelopeSimpleIcon />
          Get in touch
        </Button>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          align={align}
          sideOffset={8}
          collisionPadding={16}
          className="bg-popover text-popover-foreground ring-foreground/10 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2 z-50 flex w-[min(22rem,calc(100vw-2rem))] flex-col gap-4 p-4 text-sm shadow-[0_24px_48px_-24px_rgb(0_0_0/0.35)] ring-1 duration-150 outline-none"
        >
          <p className="text-muted-foreground text-pretty">{contactCopy.popover}</p>
          <div className="flex flex-col items-start gap-2.5">
            <CopyEmailButton className="w-full justify-between px-4 py-3 [&>span:first-child]:text-base" />
            <MailAppLink />
          </div>
          <ContactChannels stacked />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
