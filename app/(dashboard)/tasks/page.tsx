'use client';

import { useState, useMemo } from 'react';
import { Plus, Search } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { createTask, updateTask, deleteTask } from '@/store/tasksSlice';
import type { Task } from '@/types';
import type { TaskFormValues } from '@/lib/validators';
import { mockUsers } from '@/lib/mockData';

import { KanbanBoard } from '@/components/tasks/KanbanBoard';
import { TaskForm } from '@/components/tasks/TaskForm';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { useToast } from '@/components/ui/Toast';

export default function TasksPage() {
  const dispatch = useAppDispatch();
  const { items: tasks, isLoading } = useAppSelector((s) => s.tasks);
  const { items: projects } = useAppSelector((s) => s.projects);
  const user = useAppSelector((s) => s.auth.user);
  const { toast } = useToast();

  const [search, setSearch] = useState('');
  const [projectFilter, setProjectFilter] = useState<string>('all');
  const [assigneeFilter, setAssigneeFilter] = useState<string>('all');
  
  const [formOpen, setFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  // Filter tasks
  const filteredTasks = useMemo(() => {
    return tasks.filter((t) => {
      const matchesSearch = t.title.toLowerCase().includes(search.toLowerCase());
      const matchesProject = projectFilter === 'all' || t.projectId === projectFilter;
      const matchesAssignee = assigneeFilter === 'all' || 
        (assigneeFilter === 'unassigned' && !t.assignedUserId) || 
        t.assignedUserId === assigneeFilter;
      
      return matchesSearch && matchesProject && matchesAssignee;
    });
  }, [tasks, search, projectFilter, assigneeFilter]);

  // Handlers
  const handleOpenCreate = () => {
    if (projects.length === 0) {
      toast('Please create a project first before adding tasks.', 'warning');
      return;
    }
    setEditingTask(undefined);
    setFormOpen(true);
  };

  const handleOpenEdit = (task: Task) => {
    // Role check: Admin can edit any, Member can edit if assigned to them or unassigned
    if (user?.role !== 'admin' && task.assignedUserId && task.assignedUserId !== user?.id) {
      toast('You can only edit tasks assigned to you.', 'error');
      return;
    }
    setEditingTask(task);
    setFormOpen(true);
  };

  const handleOpenDelete = (task: Task) => {
    // Role check: Only admin can delete tasks
    if (user?.role !== 'admin') {
      toast('Only administrators can delete tasks.', 'error');
      return;
    }
    setTaskToDelete(task);
    setDeleteConfirmOpen(true);
  };

  const handleFormSubmit = async (data: TaskFormValues) => {
    if (editingTask) {
      const res = await dispatch(updateTask({ ...data, id: editingTask.id }));
      if (updateTask.fulfilled.match(res)) {
        toast('Task updated', 'success');
        setFormOpen(false);
      }
    } else {
      const res = await dispatch(createTask(data));
      if (createTask.fulfilled.match(res)) {
        toast('Task created', 'success');
        setFormOpen(false);
      }
    }
  };

  const handleDeleteConfirm = async () => {
    if (!taskToDelete) return;
    const res = await dispatch(deleteTask(taskToDelete.id));
    if (deleteTask.fulfilled.match(res)) {
      toast('Task deleted', 'success');
      setDeleteConfirmOpen(false);
      setTaskToDelete(null);
    }
  };

  return (
    <div className="space-y-6 h-[calc(100vh-6rem)] flex flex-col">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
        <div>
          <h2 className="text-2xl font-bold text-[hsl(var(--color-text))]">Task Board</h2>
          <p className="text-sm text-[hsl(var(--color-text-muted))] mt-1">
            Drag and drop tasks to update their status.
          </p>
        </div>
        {user?.role === 'admin' && (
          <Button onClick={handleOpenCreate} leftIcon={<Plus size={16} />}>
            Add Task
          </Button>
        )}
      </div>

      {/* Filters */}
      <div className="bg-[hsl(var(--color-surface))] border border-[hsl(var(--color-border))] rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] p-4 flex flex-col sm:flex-row flex-wrap gap-4 shrink-0">
        <div className="flex-1 min-w-[200px]">
          <Input
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leftIcon={<Search size={16} />}
          />
        </div>
        <div className="w-full sm:w-48">
          <Select
            value={projectFilter}
            onChange={(val) => setProjectFilter(val)}
            options={[
              { label: 'All Projects', value: 'all' },
              ...projects.map((p) => ({ label: p.name, value: p.id })),
            ]}
          />
        </div>
        <div className="w-full sm:w-48">
          <Select
            value={assigneeFilter}
            onChange={(val) => setAssigneeFilter(val)}
            options={[
              { label: 'All Assignees', value: 'all' },
              { label: 'Unassigned', value: 'unassigned' },
              ...mockUsers.map((u) => ({ label: u.name, value: u.id })),
            ]}
          />
        </div>
      </div>

      {/* Kanban Board Area */}
      <div className="flex-1 min-h-0 relative -mx-4 px-4 lg:-mx-6 lg:px-6">
        <KanbanBoard
          tasks={filteredTasks}
          onEditTask={handleOpenEdit}
          onDeleteTask={handleOpenDelete}
        />
      </div>

      {/* Modals */}
      <TaskForm
        isOpen={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingTask}
        projects={projects}
        isLoading={isLoading}
      />

      <ConfirmDialog
        isOpen={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Task"
        message={`Are you sure you want to delete "${taskToDelete?.title}"? This action cannot be undone.`}
        isLoading={isLoading}
      />
    </div>
  );
}
