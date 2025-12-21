import type { Meta, StoryObj } from '@storybook/react'
import { TaskProgress } from './TaskProgress'

const meta = {
  title: 'Chat/TaskProgress',
  component: TaskProgress,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof TaskProgress>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    title: 'Task Progress',
    tasks: [
      {
        id: '1',
        label: 'Create loan application record type',
        status: 'completed',
      },
      {
        id: '2',
        label: 'Create document record type',
        status: 'completed',
      },
      {
        id: '3',
        label: 'Create brand selection interface',
        status: 'active',
      },
      {
        id: '4',
        label: 'Build loan application form interface',
        status: 'todo',
      },
      {
        id: '5',
        label: 'Create document upload component',
        status: 'todo',
      },
    ],
    defaultOpen: true,
  },
}

export const Collapsed: Story = {
  args: {
    title: 'Task Progress',
    tasks: [
      {
        id: '1',
        label: 'Create loan application record type',
        status: 'completed',
      },
      {
        id: '2',
        label: 'Create document record type',
        status: 'completed',
      },
      {
        id: '3',
        label: 'Create brand selection interface',
        status: 'active',
      },
      {
        id: '4',
        label: 'Build loan application form interface',
        status: 'todo',
      },
    ],
    defaultOpen: false,
  },
}

export const AllCompleted: Story = {
  args: {
    title: 'Completed Tasks',
    tasks: [
      {
        id: '1',
        label: 'Setup project structure',
        status: 'completed',
      },
      {
        id: '2',
        label: 'Install dependencies',
        status: 'completed',
      },
      {
        id: '3',
        label: 'Create components',
        status: 'completed',
      },
      {
        id: '4',
        label: 'Write documentation',
        status: 'completed',
      },
    ],
    defaultOpen: true,
  },
}

export const MostlyTodo: Story = {
  args: {
    title: 'Upcoming Tasks',
    tasks: [
      {
        id: '1',
        label: 'Setup project',
        status: 'completed',
      },
      {
        id: '2',
        label: 'Design components',
        status: 'active',
      },
      {
        id: '3',
        label: 'Implement authentication',
        status: 'todo',
      },
      {
        id: '4',
        label: 'Add database integration',
        status: 'todo',
      },
      {
        id: '5',
        label: 'Write tests',
        status: 'todo',
      },
      {
        id: '6',
        label: 'Deploy to production',
        status: 'todo',
      },
    ],
    defaultOpen: true,
  },
}

export const CustomTitle: Story = {
  args: {
    title: 'Sprint 3 Progress',
    tasks: [
      {
        id: '1',
        label: 'User authentication module',
        status: 'completed',
      },
      {
        id: '2',
        label: 'Dashboard layout',
        status: 'completed',
      },
      {
        id: '3',
        label: 'API integration',
        status: 'active',
      },
    ],
    defaultOpen: true,
  },
}
