import type { Meta, StoryObj } from '@storybook/react'
import { AgentSteps } from './AgentSteps'

const meta = {
  title: 'Chat/AgentSteps',
  component: AgentSteps,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof AgentSteps>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    steps: [
      {
        id: '1',
        title: 'Creating loan application record type',
        subtitle: 'LA Loan Application created',
        status: 'completed',
      },
      {
        id: '2',
        icon: 'database',
        title: 'Defining data source',
        subtitle: 'Connected to jdbc/Appian',
        status: 'active',
      },
      {
        id: '3',
        title: 'Adding data fields',
        status: 'pending',
      },
    ],
  },
}

export const WithCodePreview: Story = {
  args: {
    steps: [
      {
        id: '1',
        title: 'Updating story status and assignment',
        subtitle: 'Updated story US-001 to In Progress, assigned to You',
        status: 'completed',
      },
      {
        id: '2',
        icon: 'database',
        title: 'Defining data source',
        preview: {
          type: 'code',
          content: `Record Type: LA Loan Application
Data Source: jdbc/Appian
Table name: APPLICATION`,
        },
        status: 'completed',
      },
      {
        id: '3',
        icon: 'plus',
        title: 'Adding data fields',
        preview: {
          type: 'code',
          content: `Record Type:
LA_LoanApplication_RecordType
Fields:
- loanNumber (Text, Primary Key)
- referenceNumber (Text, Unique)
- applicationDate (Date)
- borrowerFirstName (Text)`,
        },
        status: 'active',
      },
    ],
  },
}

export const WithActions: Story = {
  args: {
    steps: [
      {
        id: '1',
        title: 'Creating loan application record type',
        subtitle: 'LA Loan Application created',
        status: 'completed',
      },
      {
        id: '2',
        icon: 'database',
        title: 'Defining data source',
        preview: {
          type: 'code',
          content: `Record Type: LA Loan Application
Data Source: jdbc/Appian
Table name: APPLICATION`,
        },
        status: 'completed',
      },
      {
        id: '3',
        icon: 'plus',
        title: 'Adding data fields',
        preview: {
          type: 'code',
          content: `Fields:
- loanNumber (Text, Primary Key)
- referenceNumber (Text, Unique)
- applicationDate (Date)`,
        },
        actions: [
          {
            label: 'View Diff',
            icon: 'split',
            variant: 'link',
            onClick: () => console.log('View Diff clicked'),
          },
          {
            label: 'Revert',
            icon: 'rotateCcw',
            variant: 'link',
            onClick: () => console.log('Revert clicked'),
          },
        ],
        status: 'active',
      },
    ],
  },
}

export const AllCompleted: Story = {
  args: {
    steps: [
      {
        id: '1',
        title: 'Analyzing codebase',
        subtitle: 'Found 15 components',
        status: 'completed',
      },
      {
        id: '2',
        icon: 'file',
        title: 'Creating documentation',
        subtitle: 'Generated docs for all components',
        status: 'completed',
      },
      {
        id: '3',
        icon: 'database',
        title: 'Updating database',
        subtitle: 'Schema migration complete',
        status: 'completed',
      },
      {
        id: '4',
        title: 'Running tests',
        subtitle: 'All tests passed',
        status: 'completed',
      },
    ],
  },
}

export const LongTimeline: Story = {
  args: {
    steps: [
      {
        id: '1',
        title: 'Initializing project',
        subtitle: 'Project structure created',
        status: 'completed',
      },
      {
        id: '2',
        icon: 'file',
        title: 'Installing dependencies',
        subtitle: 'npm packages installed',
        status: 'completed',
      },
      {
        id: '3',
        icon: 'database',
        title: 'Setting up database',
        subtitle: 'PostgreSQL configured',
        status: 'completed',
      },
      {
        id: '4',
        icon: 'plus',
        title: 'Creating components',
        subtitle: 'Building UI components',
        status: 'active',
      },
      {
        id: '5',
        title: 'Writing tests',
        status: 'pending',
      },
      {
        id: '6',
        title: 'Deploying to production',
        status: 'pending',
      },
    ],
  },
}
