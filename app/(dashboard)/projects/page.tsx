'use client';

import { useState, useMemo } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { createProject, updateProject, deleteProject } from '@/store/projectsSlice';
import type { Project } from '@/types';
import type { ProjectFormValues } from '@/lib/validators';

import { ProjectCard } from '@/components/projects/ProjectCard';
import { ProjectForm } from '@/components/projects/ProjectForm';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { useToast } from '@/components/ui/Toast';

export default function ProjectsPage() {
  const dispatch = useAppDispatch();
  const { items: projects, isLoading } = useAppSelector((s) => s.projects);
  const { items: tasks } = useAppSelector((s) => s.tasks);
  const user = useAppSelector((s) => s.auth.user);
  const { toast } = useToast();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  const [formOpen, setFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | undefined>();
  
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);

  // Computed filtered list
  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = statusFilter === 'all' || p.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [projects, search, statusFilter]);

  // Handlers
  const handleOpenCreate = () => {
    setEditingProject(undefined);
    setFormOpen(true);
  };

  const handleOpenEdit = (project: Project) => {
    setEditingProject(project);
    setFormOpen(true);
  };

  const handleOpenDelete = (project: Project) => {
    // Basic role check
    if (user?.role !== 'admin' && project.ownerId !== user?.id) {
      toast('You do not have permission to delete this project', 'error');
      return;
    }
    setProjectToDelete(project);
    setDeleteConfirmOpen(true);
  };

  const handleFormSubmit = async (data: ProjectFormValues) => {
    if (editingProject) {
      const res = await dispatch(updateProject({ ...data, id: editingProject.id }));
      if (updateProject.fulfilled.match(res)) {
        toast('Project updated', 'success');
        setFormOpen(false);
      }
    } else {
      if (!user) return;
      const res = await dispatch(createProject({ ...data, ownerId: user.id }));
      if (createProject.fulfilled.match(res)) {
        toast('Project created', 'success');
        setFormOpen(false);
      }
    }
  };

  const handleDeleteConfirm = async () => {
    if (!projectToDelete) return;
    const res = await dispatch(deleteProject(projectToDelete.id));
    if (deleteProject.fulfilled.match(res)) {
      toast('Project deleted', 'success');
      setDeleteConfirmOpen(false);
      setProjectToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[hsl(var(--color-text))]">Projects</h2>
          <p className="text-sm text-[hsl(var(--color-text-muted))] mt-1">
            Manage your teams' ongoing work.
          </p>
        </div>
        {user?.role === 'admin' && (
          <Button onClick={handleOpenCreate} leftIcon={<Plus size={16} />}>
            New Project
          </Button>
        )}
      </div>

      {/* Filters */}
      <div className="bg-[hsl(var(--color-surface))] border border-[hsl(var(--color-border))] rounded-[var(--radius-lg)] shadow-[var(--shadow-sm)] p-4 flex flex-col sm:flex-row gap-4">
        <div className="flex-1 max-w-sm">
          <Input
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            leftIcon={<Search size={16} />}
          />
        </div>
        <div className="w-full sm:w-48">
          <Select
            value={statusFilter}
            onChange={(val) => setStatusFilter(val)}
            options={[
              { label: 'All Statuses', value: 'all' },
              { label: 'Active', value: 'active' },
              { label: 'On Hold', value: 'on-hold' },
              { label: 'Completed', value: 'completed' },
            ]}
          />
        </div>
      </div>

      {/* Grid */}
      {filteredProjects.length === 0 ? (
        <div className="card p-12 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-[hsl(var(--color-surface-2))] flex items-center justify-center text-[hsl(var(--color-text-muted))] mb-4">
            <Search size={24} />
          </div>
          <h3 className="text-lg font-semibold text-[hsl(var(--color-text))]">No projects found</h3>
          <p className="mt-1 text-sm text-[hsl(var(--color-text-muted))] max-w-sm">
            Try adjusting your search or filters, or create a new project to get started.
          </p>
          <Button variant="outline" className="mt-6" onClick={() => { setSearch(''); setStatusFilter('all'); }}>
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={handleOpenEdit}
              onDelete={handleOpenDelete}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      <ProjectForm
        isOpen={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editingProject}
        isLoading={isLoading}
      />

      <ConfirmDialog
        isOpen={deleteConfirmOpen}
        onClose={() => setDeleteConfirmOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Project"
        message={`Are you sure you want to delete "${projectToDelete?.name}"? All associated tasks will be orphaned. This action cannot be undone.`}
        isLoading={isLoading}
      />
    </div>
  );
}
