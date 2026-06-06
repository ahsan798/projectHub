'use client';

import { useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { taskSchema, type TaskFormValues } from '@/lib/validators';
import type { Task, Project } from '@/types';
import { mockUsers } from '@/lib/mockData';

import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';

interface TaskFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: TaskFormValues) => Promise<void>;
  initialData?: Task;
  projects: Project[];
  isLoading?: boolean;
}

export function TaskForm({ isOpen, onClose, onSubmit, initialData, projects, isLoading }: TaskFormProps) {
  const isEdit = !!initialData;

  const { register, handleSubmit, control, formState: { errors }, reset } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: initialData?.title ?? '',
      description: initialData?.description ?? '',
      priority: initialData?.priority ?? 'medium',
      status: initialData?.status ?? 'todo',
      dueDate: initialData?.dueDate ? initialData.dueDate.split('T')[0] : '',
      assignedUserId: initialData?.assignedUserId ?? null,
      projectId: initialData?.projectId ?? (projects.length > 0 ? projects[0].id : ''),
    },
  });

  useEffect(() => {
    if (isOpen) {
      reset({
        title: initialData?.title ?? '',
        description: initialData?.description ?? '',
        priority: initialData?.priority ?? 'medium',
        status: initialData?.status ?? 'todo',
        dueDate: initialData?.dueDate ? initialData.dueDate.split('T')[0] : '',
        assignedUserId: initialData?.assignedUserId ?? null,
        projectId: initialData?.projectId ?? (projects.length > 0 ? projects[0].id : ''),
      });
    }
  }, [isOpen, initialData, projects, reset]);

  const handleFormSubmit = async (data: TaskFormValues) => {
    // Reformat date string back to full ISO if needed, but YYYY-MM-DD works too
    await onSubmit(data);
    if (!isEdit) reset();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? 'Edit Task' : 'New Task'}
      size="md"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleSubmit(handleFormSubmit)} isLoading={isLoading}>
            {isEdit ? 'Save Changes' : 'Create Task'}
          </Button>
        </>
      }
    >
      <form id="task-form" className="flex flex-col gap-4 py-2" onSubmit={handleSubmit(handleFormSubmit)}>
        <Input
          label="Title"
          placeholder="What needs to be done?"
          required
          error={errors.title?.message}
          {...register('title')}
        />
        
        <Textarea
          label="Description"
          placeholder="Add more details about this task..."
          required
          rows={3}
          error={errors.description?.message}
          {...register('description')}
        />

        <div className="grid grid-cols-2 gap-4">
          <Controller
            control={control}
            name="projectId"
            render={({ field }) => (
              <Select
                label="Project"
                required
                error={errors.projectId?.message}
                options={projects.map(p => ({ label: p.name, value: p.id }))}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          <Controller
            control={control}
            name="assignedUserId"
            render={({ field }) => (
              <Select
                label="Assignee"
                error={errors.assignedUserId?.message}
                options={[{ label: 'Unassigned', value: '' }, ...mockUsers.map(u => ({ label: u.name, value: u.id }))]}
                value={field.value || ''}
                onChange={(val) => field.onChange(val === '' ? null : val)}
              />
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Controller
            control={control}
            name="priority"
            render={({ field }) => (
              <Select
                label="Priority"
                required
                error={errors.priority?.message}
                options={[
                  { label: 'Low', value: 'low' },
                  { label: 'Medium', value: 'medium' },
                  { label: 'High', value: 'high' },
                ]}
                value={field.value}
                onChange={field.onChange}
              />
            )}
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
                  { label: 'To Do', value: 'todo' },
                  { label: 'In Progress', value: 'in-progress' },
                  { label: 'In Review', value: 'in-review' },
                  { label: 'Done', value: 'done' },
                ]}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </div>

        <Input
          label="Due Date"
          type="date"
          required
          error={errors.dueDate?.message}
          {...register('dueDate')}
        />
      </form>
    </Modal>
  );
}
