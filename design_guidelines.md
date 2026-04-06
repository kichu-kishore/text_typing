# Typing Test Application Design Guidelines

## Design Approach
**System-Based Approach**: Following shadcn/ui design principles with influence from modern productivity tools (Linear, Vercel). This is a utility-focused application where clarity, readability, and distraction-free typing experience are paramount.

## Core Design Principles
1. **Minimal Distraction**: Clean interface that directs all focus to the typing area
2. **Instant Feedback**: Clear visual indicators for typing accuracy and progress
3. **Performance First**: Smooth real-time updates without lag
4. **Accessibility**: High contrast ratios and keyboard-first navigation

---

## Typography System

**Primary Font**: Inter (via Google Fonts)
- **Typing Text**: `text-2xl font-normal tracking-wide leading-relaxed` - Large, comfortable reading size
- **UI Labels**: `text-sm font-medium`
- **Statistics**: `text-3xl font-bold` for WPM/accuracy numbers, `text-xs uppercase tracking-wider` for labels
- **Body Text**: `text-base font-normal leading-relaxed`

**Monospace Font**: JetBrains Mono (for coding tests only)

---

## Layout System

**Spacing Scale**: Use Tailwind units of **2, 4, 6, 8, 12, 16, 20** for consistency
- Standard padding: `p-6` for cards, `p-8` for main containers
- Section gaps: `gap-8` between major elements, `gap-4` for related items
- Page margins: `px-6 md:px-8` responsive horizontal padding

**Container Structure**:
- Max width: `max-w-4xl mx-auto` for typing area
- Full-width stats bar at top: `w-full`
- Centered content with breathing room

---

## Component Library

### Navigation Header
- Simple top bar with logo/title on left
- Mode selectors (Duration, Difficulty, Theme) as dropdown menus in center/right
- Dark mode toggle button (moon/sun icon) on far right
- Height: `h-16`, background subtle, border-bottom separator

### Typing Interface (Main Focus)
**Test Selection Screen**:
- Three horizontal dropdown/select components in a row
- Each displays current selection with chevron-down icon
- Spacing: `gap-6` between selectors
- Large "Start Test" button below: `h-12 px-8 text-lg`

**Active Typing Area**:
- Centered container with `max-w-4xl`
- Stats bar above text: Display Timer (countdown), WPM, Accuracy in a horizontal row with `gap-8`
- Each stat: Large number on top, small label below
- Text display area: Generous padding `p-12`, subtle background card
- Character states:
  - **Untyped**: Neutral text
  - **Current**: Blinking cursor/underline
  - **Correct**: Slightly muted (user sees they got it right)
  - **Incorrect**: Distinct error state (use background highlight, not just text)
- Progress bar below text: Thin horizontal bar showing completion percentage

### Results Screen
- Hero-sized WPM number: `text-6xl font-bold`
- Grid layout for detailed stats: `grid grid-cols-2 md:grid-cols-4 gap-6`
  - WPM, Accuracy, Errors, Time
  - Each in a card with large number + label
- Character accuracy breakdown (show which characters had most errors)
- Action buttons row: "Retry", "New Test", "View Certificate" (if applicable)
- Spacing: `space-y-12` between sections

### Certificate View
- Formal document layout with border
- Centered text with typing achievement details
- Print and Download buttons
- Simple, professional styling

### Mode-Specific Elements
- **Blind Typing**: Masked text area (show cursor position only)
- **Story Mode**: Chapter/section indicators
- **Professional Mode**: Industry tag badge at top

---

## Interaction Patterns

### Typing Feedback
- Instant character validation (no delay)
- Smooth cursor movement
- Error shake animation (subtle, 100ms) on incorrect key
- No disruptive popups during typing

### Transitions
- Fade transitions between test screens: `transition-opacity duration-300`
- Stats counter animations: Smooth increments
- Progress bar fills smoothly: `transition-all duration-150`

### Focus States
- Keep focus locked on typing input during test
- Clear focus rings on interactive elements: `focus:ring-2 focus:ring-offset-2`

---

## Visual Hierarchy

**Primary**: Typing text area (largest, centered)
**Secondary**: Real-time stats (WPM, accuracy, timer)
**Tertiary**: Mode selectors and controls
**Quaternary**: Footer links and additional content

---

## Responsive Behavior

**Desktop (primary target)**:
- Full typing experience with all features
- Comfortable text size: `text-2xl`
- Wide stats display

**Tablet**:
- Slightly reduced text: `text-xl`
- Maintained typing area width
- Stacked mode selectors if needed

**Mobile**:
- Warning message: "For best experience, use desktop"
- Simplified interface if typing is attempted
- Text size: `text-lg`

---

## Dark Mode Strategy

Seamless toggle with persistent preference (localStorage)
- High contrast for typing text in both modes
- Subtle background differences
- Ensure error states are equally visible in both themes

---

## Images

**No hero image** - This is a functional tool where the typing interface IS the hero.

**Supporting Graphics**:
- Typing lessons/games promotional cards at bottom: Small illustrative SVGs of keyboard/person typing (similar to original site's lady.svg and gentleman.svg)
- These are decorative, not primary content

---

## Quality Standards

- **Zero lag** on keystroke registration
- **Pixel-perfect** character alignment in typing area
- **Smooth** WPM counter updates (not jumpy)
- **Professional** certificate design suitable for LinkedIn
- **Comprehensive** test mode coverage matching original site

The design should feel like a premium productivity tool - clean, fast, and purpose-built for accurate typing measurement.