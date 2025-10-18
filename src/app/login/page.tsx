"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/hooks/hooks";
import { useLoginMutation } from "@/services/productApi";
import { setToken } from "@/state-management/features/authSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Mail, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type LoginForm = z.infer<typeof loginSchema>;

export default function LoginPage() {
  //   const [isLoading, setIsLoading] = useState(false);
  const [login, { isLoading }] = useLoginMutation();

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
    },
  });
  const dispatch = useAppDispatch();
  const router = useRouter();
  const onSubmit = async (data: LoginForm) => {
    try {
      const res = await login({ email: data.email }).unwrap();
      console.log(res);
      dispatch(setToken(res.token));
      toast.success(`Welcome back! Logged in with ${data.email}`);
      router.push("/products");
      // Here you would typically redirect to dashboard or home page
      // router.push('/dashboard');
    } catch (error) {
      toast.error("Please check your email and try again.");
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/20 p-4">
      <div className="w-full max-w-md animate-fade-in">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br from-accent to-primary shadow-xl">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-gradient mb-2">
            Welcome Back
          </h1>
          <p className="text-muted-foreground">
            Enter your email to continue to your account
          </p>
        </div>

        <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
          <CardHeader className="space-y-1 pb-6">
            <CardTitle className="text-2xl font-bold text-center">
              Sign In
            </CardTitle>
            <CardDescription className="text-center">
              Access your account with your email address
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold">
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
                          <Input
                            {...field}
                            type="email"
                            placeholder="Enter your email"
                            className="pl-10 h-12 text-base border-2 focus:border-accent transition-all"
                            disabled={isLoading}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-accent to-primary hover:from-accent/90 hover:to-primary/90 shadow-lg hover:shadow-xl transition-all font-semibold text-base"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Signing In...
                    </>
                  ) : (
                    <>
                      <Mail className="mr-2 h-5 w-5" />
                      Continue with Email
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
