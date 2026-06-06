'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Mail, LayoutDashboard, ArrowLeft, CheckCircle2 } from 'lucide-react';

import { forgotPasswordSchema, type ForgotPasswordFormValues } from '@/lib/validators';
import { mockDelay } from '@/lib/axios';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, getValues, formState: { errors } } = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  async function onSubmit() {
    setLoading(true);
    await mockDelay(1000);
    setLoading(false);
    setSent(true);
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
        {!sent ? (
          <>
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-[hsl(var(--color-text))]">Reset password</h1>
              <p className="mt-1 text-sm text-[hsl(var(--color-text-muted))]">
                Enter your email and we'll send you a reset link.
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
              <Input
                label="Email address"
                type="email"
                id="forgot-email"
                placeholder="you@example.com"
                autoComplete="email"
                required
                leftIcon={<Mail size={15} />}
                error={errors.email?.message}
                {...register('email')}
              />
              <Button type="submit" isLoading={loading} className="w-full mt-2" size="lg" id="forgot-submit">
                Send reset link
              </Button>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center gap-4 py-4 text-center animate-scale-in">
            <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center">
              <CheckCircle2 className="text-green-400" size={32} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-[hsl(var(--color-text))]">Check your inbox</h2>
              <p className="mt-2 text-sm text-[hsl(var(--color-text-muted))]">
                We sent a reset link to{' '}
                <span className="font-medium text-[hsl(var(--color-text))]">{getValues('email')}</span>
              </p>
            </div>
          </div>
        )}

        <div className="mt-6 pt-4 border-t border-[hsl(var(--color-border))]">
          <Link
            href="/login"
            className="flex items-center justify-center gap-1.5 text-sm text-[hsl(var(--color-text-muted))] hover:text-[hsl(var(--color-text))] transition-colors"
          >
            <ArrowLeft size={14} />
            Back to sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
