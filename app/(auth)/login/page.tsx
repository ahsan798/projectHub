'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Eye, EyeOff, Mail, Lock, LayoutDashboard, ChevronDown } from 'lucide-react';
import { useState } from 'react';

import { loginSchema, type LoginFormValues } from '@/lib/validators';
import { cn } from '@/utils/cn';
import { login, clearError } from '@/store/authSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useToast } from '@/components/ui/Toast';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function LoginPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading, error, isAuthenticated } = useAppSelector((s) => s.auth);
  const { toast } = useToast();
  const [showPass, setShowPass] = useState(false);
  const [showDemoCreds, setShowDemoCreds] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  useEffect(() => {
    if (isAuthenticated) router.push('/dashboard');
  }, [isAuthenticated, router]);

  useEffect(() => {
    dispatch(clearError());
  }, [dispatch]);

  async function onSubmit(data: LoginFormValues) {
    const result = await dispatch(login(data));
    if (login.fulfilled.match(result)) {
      // Also set cookie so middleware can read it
      // eslint-disable-next-line react-hooks/immutability
      document.cookie = `ph_token=${result.payload.token}; path=/; max-age=${60 * 60 * 24 * 7}`;
      toast('Welcome back! 👋', 'success');
      router.push('/dashboard');
    }
  }

  return (
    <div className="w-full max-w-md animate-fade-in-up">
      {/* Logo */}
      <div className="flex items-center justify-center gap-2 mb-8">
        <div className="w-10 h-10 rounded-[var(--radius-md)] gradient-primary flex items-center justify-center">
          <LayoutDashboard size={20} className="text-white" />
        </div>
        <span className="text-xl font-bold text-[hsl(var(--color-text))]">ProjectHub</span>
      </div>

      {/* Card */}
      <div className="card p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[hsl(var(--color-text))]">Welcome back</h1>
          <p className="mt-1 text-sm text-[hsl(var(--color-text-muted))]">
            Sign in to your account to continue
          </p>
        </div>

        {/* Server-level error */}
        {error && (
          <div className="mb-4 px-4 py-3 rounded-[var(--radius-md)] bg-red-500/10 border border-red-500/20 text-sm text-red-400" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
          <Input
            label="Email address"
            type="email"
            id="login-email"
            placeholder="you@example.com"
            autoComplete="email"
            required
            leftIcon={<Mail size={15} />}
            error={errors.email?.message}
            {...register('email')}
          />
          <div>
            <Input
              label="Password"
              type={showPass ? 'text' : 'password'}
              id="login-password"
              placeholder="••••••••"
              autoComplete="current-password"
              required
              leftIcon={<Lock size={15} />}
              rightIcon={
                <button
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  aria-label={showPass ? 'Hide password' : 'Show password'}
                  className="text-[hsl(var(--color-text-muted))] hover:text-[hsl(var(--color-text))] transition-colors flex items-center justify-center"
                >
                  {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              }
              error={errors.password?.message}
              {...register('password')}
            />
            <div className="mt-2 text-right">
              <Link href="/forgot-password" className="text-xs text-[hsl(var(--color-primary))] hover:underline">
                Forgot password?
              </Link>
            </div>
          </div>

          <Button type="submit" isLoading={isLoading} className="w-full mt-2" size="lg" id="login-submit">
            Sign in
          </Button>
        </form>

        {/* Demo hint */}
        <div className="mt-4 p-4 rounded-[var(--radius-md)] bg-[hsl(var(--color-surface-2))] text-xs text-[hsl(var(--color-text-muted))] flex flex-col">
          <button 
            type="button"
            onClick={() => setShowDemoCreds(!showDemoCreds)}
            className="flex items-center justify-between w-full font-medium text-[hsl(var(--color-text))] text-sm hover:text-[hsl(var(--color-primary))] transition-colors"
          >
            <span>Demo Credentials</span>
            <ChevronDown size={16} className={cn("transition-transform duration-300", showDemoCreds && "rotate-180")} />
          </button>
          
          <div 
            className={cn(
              "grid transition-all duration-300 ease-in-out",
              showDemoCreds ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0"
            )}
          >
            <div className="overflow-hidden">
              <div className="grid grid-cols-[auto_1fr_auto] gap-x-4 gap-y-2 text-left items-center overflow-x-auto pt-4 border-t border-[hsl(var(--color-border))]">
                <div className="font-medium text-[hsl(var(--color-text))]">Role</div>
                <div className="font-medium text-[hsl(var(--color-text))]">Email</div>
                <div className="font-medium text-[hsl(var(--color-text))]">Password</div>
                
                <div>Admin</div>
                <code className="px-1 py-0.5 bg-[hsl(var(--color-border))] rounded text-[11px] whitespace-nowrap">test@test.com</code>
                <code className="px-1 py-0.5 bg-[hsl(var(--color-border))] rounded text-[11px]">password</code>
                
                <div>Admin</div>
                <code className="px-1 py-0.5 bg-[hsl(var(--color-border))] rounded text-[11px] whitespace-nowrap">alice@projecthub.com</code>
                <code className="px-1 py-0.5 bg-[hsl(var(--color-border))] rounded text-[11px]">password</code>
                
                <div>Member</div>
                <code className="px-1 py-0.5 bg-[hsl(var(--color-border))] rounded text-[11px] whitespace-nowrap">sara@projecthub.com</code>
                <code className="px-1 py-0.5 bg-[hsl(var(--color-border))] rounded text-[11px]">password</code>
                
                <div>Member</div>
                <code className="px-1 py-0.5 bg-[hsl(var(--color-border))] rounded text-[11px] whitespace-nowrap">bob@projecthub.com</code>
                <code className="px-1 py-0.5 bg-[hsl(var(--color-border))] rounded text-[11px]">password</code>
              </div>
            </div>
          </div>
        </div>

        <p className="mt-5 text-center text-sm text-[hsl(var(--color-text-muted))]">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-[hsl(var(--color-primary))] font-medium hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
