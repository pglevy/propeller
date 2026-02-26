# Requirements Document

## Introduction

The StoryMapRelease component represents a horizontal slice of a user story map, corresponding to a releasable collection of work. It displays a header with a title, status badge, story count, and action menu, followed by collapsible activity columns that contain UserStoryCard components. Multiple StoryMapRelease components stack vertically to form the full story map.

## Glossary

- **StoryMapRelease**: A React component representing a single release row in a story map, containing a header bar and collapsible activity columns.
- **Activity_Column**: A vertical grouping of UserStoryCard components within a release, representing a workflow activity or category.
- **Release_Status**: The current state of a release, one of: "not started", "checking readiness", "ready for build", or "building".
- **Story_Count**: The total number of UserStoryCard items across all Activity_Columns in a single StoryMapRelease.
- **Release_Header**: The top bar of a StoryMapRelease containing the title, menu button, status badge, story count, and collapse toggle.
- **Menu_Button**: A dropdown trigger in the Release_Header that provides actions: "Check Readiness", "Edit", and "Delete".

## Requirements

### Requirement 1: Display Release Header

**User Story:** As a user, I want to see a release header with title, status, and story count, so that I can quickly understand the state of a release at a glance.

#### Acceptance Criteria

1. THE StoryMapRelease SHALL render a Release_Header containing a title, a Menu_Button, a Release_Status badge, a Story_Count indicator, and a collapse toggle button.
2. WHEN no title is provided, THE StoryMapRelease SHALL display a default title of "Untitled Release".
3. THE StoryMapRelease SHALL display the Story_Count as the total number of stories across all Activity_Columns.
4. THE StoryMapRelease SHALL display the Release_Status as a badge with a visual style that distinguishes each status value ("not started", "checking readiness", "ready for build", "building").

### Requirement 2: Release Actions Menu

**User Story:** As a user, I want to access release actions through a menu, so that I can manage the release lifecycle.

#### Acceptance Criteria

1. WHEN the user activates the Menu_Button, THE StoryMapRelease SHALL display a dropdown menu with "Check Readiness", "Edit", and "Delete" actions.
2. WHEN the user selects "Check Readiness", THE StoryMapRelease SHALL invoke the onCheckReadiness callback.
3. WHEN the user selects "Edit", THE StoryMapRelease SHALL invoke the onEdit callback.
4. WHEN the user selects "Delete", THE StoryMapRelease SHALL invoke the onDelete callback.

### Requirement 3: Collapsible Content

**User Story:** As a user, I want to collapse and expand the release content, so that I can focus on specific releases and reduce visual clutter.

#### Acceptance Criteria

1. WHEN the user activates the collapse toggle button, THE StoryMapRelease SHALL hide the Activity_Columns content area.
2. WHEN the user activates the collapse toggle button on a collapsed release, THE StoryMapRelease SHALL reveal the Activity_Columns content area.
3. THE StoryMapRelease SHALL default to the expanded state on initial render.
4. WHEN the collapse state changes, THE StoryMapRelease SHALL rotate the collapse toggle icon to indicate the current state.

### Requirement 4: Activity Columns Layout

**User Story:** As a user, I want stories organized into activity columns within a release, so that I can see work grouped by workflow activity.

#### Acceptance Criteria

1. THE StoryMapRelease SHALL render Activity_Columns as a horizontal row of equal-width columns within the collapsible content area.
2. THE StoryMapRelease SHALL accept Activity_Columns as children, allowing the consumer to compose the column layout.
3. WHEN an Activity_Column contains no stories, THE StoryMapRelease SHALL render the column as an empty drop zone with a minimum height.

### Requirement 5: Visual Divider

**User Story:** As a user, I want a clear visual separation between the release header and the activity columns, so that the layout is easy to scan.

#### Acceptance Criteria

1. THE StoryMapRelease SHALL render a horizontal divider between the Release_Header and the Activity_Columns content area.

### Requirement 6: Composability and Styling

**User Story:** As a developer, I want the StoryMapRelease component to follow the library's composable patterns, so that it integrates consistently with the rest of the Propeller component library.

#### Acceptance Criteria

1. THE StoryMapRelease SHALL accept a className prop for style overrides on the root element.
2. THE StoryMapRelease SHALL use semantic color tokens from the theme system (background, foreground, muted, border) rather than arbitrary color values.
3. THE StoryMapRelease SHALL use data-slot attributes on component parts for styling and testing identification.
4. THE StoryMapRelease SHALL provide explicit background colors on text-containing elements to ensure conclusive accessibility contrast checks.

### Requirement 7: Accessibility

**User Story:** As a user relying on assistive technology, I want the StoryMapRelease component to be accessible, so that I can navigate and interact with releases using a keyboard or screen reader.

#### Acceptance Criteria

1. THE Menu_Button SHALL have an accessible name via aria-label.
2. THE collapse toggle button SHALL have an accessible name that conveys the current expanded or collapsed state.
3. THE Release_Status badge SHALL convey its status text to assistive technologies.
4. WHEN the user navigates via keyboard, THE StoryMapRelease SHALL allow focus to reach the Menu_Button, collapse toggle, and all interactive elements within Activity_Columns.
