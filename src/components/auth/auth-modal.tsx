"use client";

import React, {useState} from "react";

import {
  AlertCircle,
  CheckCircle,
  Eye,
  EyeOff,
  LogIn,
  UserPlus,
} from "lucide-react";
import {signIn} from "next-auth/react";
import {z} from "zod";

import {createUser} from "@/actions/auth.action";
import {Button} from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {cn} from "@/lib/utils";

type AuthModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signupSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type LoginForm = z.infer<typeof loginSchema>;
type SignupForm = z.infer<typeof signupSchema>;

const AuthModal = ({open, onOpenChange}: AuthModalProps) => {
  const [activeTab, setActiveTab] = useState<"login" | "signup">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [loginForm, setLoginForm] = useState<LoginForm>({
    email: "",
    password: "",
  });

  const [signupForm, setSignupForm] = useState<SignupForm>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loginErrors, setLoginErrors] = useState<Partial<LoginForm>>({});
  const [signupErrors, setSignupErrors] = useState<Partial<SignupForm>>({});

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoginErrors({});

    try {
      const validatedData = loginSchema.parse(loginForm);
      setIsLoading(true);

      const result = await signIn("credentials", {
        email: validatedData.email,
        password: validatedData.password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        setSuccess("Successfully logged in!");
        setTimeout(() => {
          onOpenChange(false);
          setLoginForm({email: "", password: ""});
        }, 1000);
      }
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: Partial<LoginForm> = {};
        err.issues.forEach(error => {
          if (error.path[0]) {
            fieldErrors[error.path[0] as keyof LoginForm] = error.message;
          }
        });
        setLoginErrors(fieldErrors);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setSignupErrors({});

    try {
      const validatedData = signupSchema.parse(signupForm);
      setIsLoading(true);

      const result = await createUser({
        name: validatedData.name,
        email: validatedData.email,
        password: validatedData.password,
      });

      if (!result.success) {
        // Handle both string and object error types
        const errorMessage =
          typeof result.error === "string"
            ? result.error
            : result.error.message;
        setError(errorMessage);
        return;
      }
      setSuccess("Account created successfully! You can now log in.");
      setActiveTab("login");
      setLoginForm({email: validatedData.email, password: ""});
      setSignupForm({name: "", email: "", password: "", confirmPassword: ""});
    } catch (err) {
      if (err instanceof z.ZodError) {
        const fieldErrors: Partial<SignupForm> = {};
        err.issues.forEach(error => {
          if (error.path[0]) {
            fieldErrors[error.path[0] as keyof SignupForm] = error.message;
          }
        });
        setSignupErrors(fieldErrors);
      } else {
        setError("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setLoginForm({email: "", password: ""});
    setSignupForm({name: "", email: "", password: "", confirmPassword: ""});
    setLoginErrors({});
    setSignupErrors({});
    setError(null);
    setSuccess(null);
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={newOpen => {
        onOpenChange(newOpen);
        if (!newOpen) {
          resetForm();
        }
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-semibold">
            Welcome to Moments
          </DialogTitle>
        </DialogHeader>

        <Tabs
          value={activeTab}
          onValueChange={value => setActiveTab(value as "login" | "signup")}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login" className="flex items-center gap-2">
              <LogIn className="h-4 w-4" />
              Login
            </TabsTrigger>
            <TabsTrigger value="signup" className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Sign Up
            </TabsTrigger>
          </TabsList>

          {(error || success) && (
            <div
              className={cn(
                "flex items-center gap-2 rounded-lg p-3 text-sm",
                error
                  ? "bg-red-50 text-red-700 dark:bg-red-950/20 dark:text-red-400"
                  : "bg-green-50 text-green-700 dark:bg-green-950/20 dark:text-green-400"
              )}
            >
              {error ? (
                <AlertCircle className="h-4 w-4" />
              ) : (
                <CheckCircle className="h-4 w-4" />
              )}
              {error || success}
            </div>
          )}

          <TabsContent value="login" className="space-y-4">
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="login-email">Email</Label>
                <Input
                  id="login-email"
                  type="email"
                  placeholder="Enter your email"
                  value={loginForm.email}
                  onChange={e =>
                    setLoginForm({...loginForm, email: e.target.value})
                  }
                  className={cn(loginErrors.email && "border-red-500")}
                  disabled={isLoading}
                />
                {loginErrors.email && (
                  <p className="text-sm text-red-500">{loginErrors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="login-password">Password</Label>
                <div className="relative">
                  <Input
                    id="login-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={loginForm.password}
                    onChange={e =>
                      setLoginForm({...loginForm, password: e.target.value})
                    }
                    className={cn(
                      loginErrors.password && "border-red-500",
                      "pr-10"
                    )}
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {loginErrors.password && (
                  <p className="text-sm text-red-500">{loginErrors.password}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full cursor-pointer rounded-full bg-gradient-to-bl from-pink-400 to-pink-800 text-white"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="signup" className="space-y-4">
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-name">Full Name</Label>
                <Input
                  id="signup-name"
                  type="text"
                  placeholder="Enter your full name"
                  value={signupForm.name}
                  onChange={e =>
                    setSignupForm({...signupForm, name: e.target.value})
                  }
                  className={cn(signupErrors.name && "border-red-500")}
                  disabled={isLoading}
                />
                {signupErrors.name && (
                  <p className="text-sm text-red-500">{signupErrors.name}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input
                  id="signup-email"
                  type="email"
                  placeholder="Enter your email"
                  value={signupForm.email}
                  onChange={e =>
                    setSignupForm({...signupForm, email: e.target.value})
                  }
                  className={cn(signupErrors.email && "border-red-500")}
                  disabled={isLoading}
                />
                {signupErrors.email && (
                  <p className="text-sm text-red-500">{signupErrors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <div className="relative">
                  <Input
                    id="signup-password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={signupForm.password}
                    onChange={e =>
                      setSignupForm({...signupForm, password: e.target.value})
                    }
                    className={cn(
                      signupErrors.password && "border-red-500",
                      "pr-10"
                    )}
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {signupErrors.password && (
                  <p className="text-sm text-red-500">
                    {signupErrors.password}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="signup-confirm-password">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Input
                    id="signup-confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={signupForm.confirmPassword}
                    onChange={e =>
                      setSignupForm({
                        ...signupForm,
                        confirmPassword: e.target.value,
                      })
                    }
                    className={cn(
                      signupErrors.confirmPassword && "border-red-500",
                      "pr-10"
                    )}
                    disabled={isLoading}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={isLoading}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
                {signupErrors.confirmPassword && (
                  <p className="text-sm text-red-500">
                    {signupErrors.confirmPassword}
                  </p>
                )}
              </div>

              <div className="text-red-500 ">
                !Not allow to create new account.
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;
