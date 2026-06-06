'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, Lock, User, LayoutDashboard, Eye, EyeOff } from 'lucide-react';

import { registerSchema, type RegisterFormValues } from '@/lib/validators';
import { register as registerUser, clearError } from '@/store/authSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useToast } from '@/components/ui/Toast';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useEffect } from 'react';

export default function RegisterPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { isLoading, error } = useAppSelector((s) => s.auth);
  const { toast } = useToast();
  const [showPass, setShowPass] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
  });

  useEffect(() => { dispatch(clearError()); }, [dispatch]);

  async function onSubmit(data: RegisterFormValues) {
    const result = await dispatch(registerUser(data));
    if (registerUser.fulfilled.match(result)) {
      toast('Account created! Please sign in.', 'success');
      router.push('/login');
    }
  }

  return (
    <div className="w-full max-w-md animate-fade-in-up">
      <div className="flex items-center justify-center gap-2 mb-8">
        <div className="w-10 h-10 rounded-[var(--radius-md)] gradient-primary flex items-center justify-center">
          <LayoutDashboard size={20} className="text-white" />
        </div>
        <span className="text-xl font-bold text-[hsl(var(--color-text))]">ProjectHub</span>
      </div>

      <div className="card p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[hsl(var(--color-text))]">Create account</h1>
          <p className="mt-1 text-sm text-[hsl(var(--color-text-muted))]">
            Start managing projects like a pro
          </p>
        </div>

        {error && (
          <div className="mb-4 px-4 py-3 rounded-[var(--radius-md)] bg-red-500/10 border border-red-500/20 text-sm text-red-400" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
          <Input
            label="Full name"
            type="text"
            id="register-name"
            placeholder="Alice Chen"
            autoComplete="name"
            required
            leftIcon={<User size={15} />}
            error={errors.name?.message}
            {...register('name')}
          />
          <Input
            label="Email address"
            type="email"
            id="register-email"
            placeholder="you@example.com"
            autoComplete="email"
            required
            leftIcon={<Mail size={15} />}
            error={errors.email?.message}
            {...register('email')}
          />
          <Input
            label="Password"
            type={showPass ? 'text' : 'password'}
            id="register-password"
            placeholder="Min 8 chars, 1 uppercase, 1 number"
            autoComplete="new-password"
            required
            leftIcon={<Lock size={15} />}
            rightIcon={
              <button type="button" onClick={() => setShowPass((v) => !v)} aria-label="Toggle password" className="text-[hsl(var(--color-text-muted))] hover:text-[hsl(var(--color-text))] transition-colors flex items-center justify-center">
                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            }
            error={errors.password?.message}
            {...register('password')}
          />
          <Input
            label="Confirm password"
            type={showPass ? 'text' : 'password'}
            id="register-confirm"
            placeholder="Repeat password"
            autoComplete="new-password"
            required
            leftIcon={<Lock size={15} />}
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />

          <Button type="submit" isLoading={isLoading} className="w-full mt-2" size="lg" id="register-submit">
            Create account
          </Button>
        </form>

        <p className="mt-5 text-center text-sm text-[hsl(var(--color-text-muted))]">
          Already have an account?{' '}
          <Link href="/login" className="text-[hsl(var(--color-primary))] font-medium hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
