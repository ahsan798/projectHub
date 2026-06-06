'use client';

import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { projectSchema, type ProjectFormValues } from '@/lib/validators';
import type { Project } from '@/types';

import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';

interface ProjectFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ProjectFormValues) => Promise<void>;
  initialData?: Project;
  isLoading?: boolean;
}

export function ProjectForm({ isOpen, onClose, onSubmit, initialData, isLoading }: ProjectFormProps) {
  const isEdit = !!initialData;

  const { register, handleSubmit, control, formState: { errors }, reset } = useForm<ProjectFormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      name: initialData?.name ?? '',
      description: initialData?.description ?? '',
      status: initialData?.status ?? 'active',
    },
  });

  // Reset form when modal opens with new data
  useEffect(() => {
    if (isOpen) {
      reset({
        name: initialData?.name ?? '',
        description: initialData?.description ?? '',
        status: initialData?.status ?? 'active',
      });
    }
  }, [isOpen, initialData, reset]);

  const handleFormSubmit = async (data: ProjectFormValues) => {
    await onSubmit(data);
    if (!isEdit) reset();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? 'Edit Project' : 'New Project'}
      size="md"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleSubmit(handleFormSubmit)} isLoading={isLoading}>
            {isEdit ? 'Save Changes' : 'Create Project'}
          </Button>
        </>
      }
    >
      <form id="project-form" className="flex flex-col gap-4 py-2" onSubmit={handleSubmit(handleFormSubmit)}>
        <Input
          label="Project Name"
          placeholder="e.g. Website Redesign"
          required
          error={errors.name?.message}
          {...register('name')}
        />
        
        <Textarea
          label="Description"
          placeholder="Brief description of the project goals..."
          required
          rows={4}
          error={errors.description?.message}
          {...register('description')}
        />

        <Controller
          control={control}
          name="status"
          render={({ field }) => (
            <Select
              label="Status"
              required
              error={errors.status?.message}
              options={[
                { label: 'Active', value: 'active' },
                { label: 'On Hold', value: 'on-hold' },
                { label: 'Completed', value: 'completed' },
              ]}
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />
      </form>
    </Modal>
  );
}
