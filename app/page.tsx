"use client";
import { useRef, useEffect, useState } from "react";
import { useAppContext } from "@/store/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const iframeRef = useRef(null);
  const { html, updateHtml } = useAppContext();

  const FormSchema = z.object({
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const paylaod = {
      email: data.email,
      html,
    };

    try {
      setLoading(true);
      const res = await fetch("/api/send", {
        method: "POST",
        body: JSON.stringify(paylaod),
      });
      toast.success("Email sent.");
    } catch (error) {
      toast.error("Error sending email.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const document =
      iframeRef.current?.contentDocument ||
      iframeRef.current?.contentWindow?.document;
    document.open();
    document.write(html);
    document.close();
  }, [html]);

  return (
    <div className="bg-[#27282D]">
      <div className="flex items-center px-5 py-10">
        <h1 className="text-xl font-medium underline text-white">
          Email Tester
        </h1>
      </div>

      <ResizablePanelGroup direction="horizontal" className="px-5">
        <ResizablePanel>
          <textarea
            onChange={(e) => updateHtml(e.target.value)}
            value={html}
            placeholder="Paste HTML code here..."
            className="w-full resize-none p-5 rounded-md h-[500px] border border-black"></textarea>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel>
          <div className="border border-white rounded-md h-[500px] w-full">
            <iframe className="w-full h-full" ref={iframeRef}></iframe>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>

      <div className="flex flex-col space-y-5 px-5 py-10 w-full max-w-lg lg:max-w-2xl">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6 lg:flex lg:space-y-0 lg:space-x-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Email address" {...field} />
                  </FormControl>
                  <FormDescription className="text-xs text-[#adb1b8]">
                    Enter email address to send test email to.
                  </FormDescription>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
            <Button type="submit" className="px-5 lg:px-8">
              {loading ? "Sending..." : "Submit"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
