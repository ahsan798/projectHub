'use client';

import { useState, useMemo } from 'react';
import { DragDropContext, type DropResult } from '@hello-pangea/dnd';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { changeTaskStatus, moveTask } from '@/store/tasksSlice';
import type { Task, TaskStatus } from '@/types';

import { KanbanColumn } from './KanbanColumn';

interface KanbanBoardProps {
  tasks: Task[];
  onEditTask: (task: Task) => void;
  onDeleteTask: (task: Task) => void;
}

const COLUMNS: { id: TaskStatus; title: string }[] = [
  { id: 'todo', title: 'To Do' },
  { id: 'in-progress', title: 'In Progress' },
  { id: 'in-review', title: 'In Review' },
  { id: 'done', title: 'Done' },
];

export function KanbanBoard({ tasks, onEditTask, onDeleteTask }: KanbanBoardProps) {
  const dispatch = useAppDispatch();
  const { items: projects } = useAppSelector((s) => s.projects);

  const handleDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    // Dropped outside a column or didn't move
    if (!destination) return;
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const newStatus = destination.droppableId as TaskStatus;

    // Optimistically update the UI instantly
    dispatch(moveTask({ id: draggableId, status: newStatus }));

    // Dispatch the thunk to handle backend/mock delay sync
    dispatch(changeTaskStatus({ id: draggableId, status: newStatus }));
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex h-full gap-4 overflow-x-auto pb-4 custom-scrollbar">
        {COLUMNS.map((col) => {
          // Sort tasks within column by created date (or priority) if desired
          // Here we just keep their order from the slice, but filter by status
          const columnTasks = tasks.filter((t) => t.status === col.id);
          
          return (
            <KanbanColumn
              key={col.id}
              id={col.id}
              title={col.title}
              tasks={columnTasks}
              projects={projects}
              onEditTask={onEditTask}
              onDeleteTask={onDeleteTask}
            />
          );
        })}
      </div>
    </DragDropContext>
  );
}
