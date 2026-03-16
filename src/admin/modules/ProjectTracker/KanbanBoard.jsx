import React, { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
} from '@dnd-kit/sortable';
import KanbanColumn from './KanbanColumn';
import KanbanCard from './KanbanCard';

const COLUMNS = [
  { id: 'CONCEPT',     title: 'CONCEPT' },
  { id: 'IN PROGRESS', title: 'IN PROGRESS' },
  { id: 'PROTOTYPE',   title: 'PROTOTYPE' },
  { id: 'DEPLOYED',    title: 'DEPLOYED' }
];

export default function KanbanBoard({ projects, onUpdateStatus, onAddProject }) {
  const [activeId, setActiveId] = useState(null);
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over) return;

    const projectId = active.id;
    const overId = over.id;

    // Cases:
    // 1. Dropped over a column
    // 2. Dropped over another card in the same column (sort - not required by spec but nice)
    // 3. Dropped over another card in a different column
    
    // Simplification for spec: Update status if dropped over column or card in different status
    const project = projects.find(p => p.id === projectId);
    let newStatus = overId;

    // If overId is a project ID, find its status
    const overProject = projects.find(p => p.id === overId);
    if (overProject) {
      newStatus = overProject.status;
    }

    if (newStatus && project.status !== newStatus && COLUMNS.map(c => c.id).includes(newStatus)) {
      onUpdateStatus(projectId, newStatus);
    }
  };

  const activeProject = activeId ? projects.find(p => p.id === activeId) : null;

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="flex flex-row gap-6 overflow-x-auto pb-6 no-scrollbar min-h-[700px] items-start">
        {COLUMNS.map(column => (
          <KanbanColumn
            key={column.id}
            id={column.id}
            title={column.title}
            projects={projects.filter(p => p.status === column.id)}
            onAdd={onAddProject}
          />
        ))}
      </div>

      <DragOverlay>
        {activeId ? (
          <div className="w-[280px]">
            <KanbanCard project={activeProject} />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
