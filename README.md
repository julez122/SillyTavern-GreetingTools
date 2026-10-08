# SillyTavern Greeting Tools

![Extension Version Badge](https://img.shields.io/badge/dynamic/json?url=https%3A%2F%2Fraw.githubusercontent.com%2Fjulez122%2FSillyTavern-GreetingTools%2Frefs%2Fheads%2Fcustom-features%2Fmanifest.json&query=%24.version&style=flat&label=version&labelColor=%23b00055&color=%23EE5396&link=https%3A%2F%2Fgithub.com%2Fjulez122%2FSillyTavern-GreetingTools%2Ftree%2Fcustom-features)

This is my personal fork of **[Wolfsblvt's original Greeting Tools extension](https://github.com/Wolfsblvt/SillyTavern-GreetingTools)**.

---

## `custom-features` branch changes

- **Branch merge**: Includes the `main` branch fix for the bug where `{{customPrompt}}` did not get resolved even when a custom prompt was typed in. View the commit [here](https://github.com/julez122/SillyTavern-GreetingTools/commit/1f8e68b01d5f4b437ec2a3185a9ffb3e1ad5b1cd). [⤷](https://github.com/SillyTavern/SillyTavern-GreetingTools/pull/3)
- **Change:** On mobile, greeting titles including the greeting index now sit above the button row and the compact caret that opens the textarea is immediately before the title.
- **Change:** The expand icon and original compact action buttons sit in a centered row below the greeting title, with wrapping available when needed. Every greeting is seperated by a horizontal divider below the summary. If the textarea is open, it is below any open textarea. The main greeting block has no bottom divider. Desktop keeps its original row and native disclosure marker.
- **Change:** Non-empty summaries support click/tap and Enter/Space expansion in the popup and the in-chat widget, including the read-only widget. Collapsed previews remain five and three lines respectively. Empty descriptions are hidden. Textarea visibility and toolbar Expand All / Collapse All are independent of summary expansion.

---

## Original README

A complete overhaul of greeting management in SillyTavern. Organize your character greetings with titles, descriptions, and AI-powered generation - all from a redesigned popup and an inline chat selector.

This extension replaces the default "Alternate Greetings" button and popup with a much more powerful **Greeting Tools** experience. Give every greeting a name, find the one you want instantly, generate new ones with your LLM, and switch between them directly in the chat.

> [!NOTE]
> This extension requires the **[Experimental Macro Engine](https://docs.sillytavern.app/usage/core-concepts/macros/#macros)** to be enabled.

## Installation

Install using SillyTavern's extension installer from the URL:

```txt
https://github.com/julez122/SillyTavern-GreetingTools
```

## Features

### Greeting Tools Popup

The extension replaces the built-in "Alternate Greetings" button on the character panel with a **Greeting Tools** button, which includes a count of the total greetings.

Clicking it opens the Greeting Tools popup, which gives you a full overview and editor for all of your character's greetings in one place.

- **Titles and descriptions** — Give each greeting a custom title and an optional description. This makes it easy to tell your greetings apart at a glance, especially when a character has many of them or they are very long.
- **Edit greeting content** — The full greeting text is editable right in the popup. Each greeting can be expanded or collapsed individually, and there's a maximize button to open a greeting in a full-screen editor.
- **Reorder greetings** — Move greetings up and down with the arrow buttons. You can even swap an alternate greeting with the main greeting.
- **Add and delete greetings** — Add new blank greetings or delete ones you no longer need, with a confirmation prompt to prevent accidents.
- **Collapse / Expand all** — Toolbar buttons to quickly collapse or expand every greeting at once.
- **Keyboard navigation** — Use Arrow Up/Down to navigate between greeting blocks. Hold Ctrl+Arrow while inside a textarea to jump to the next greeting.
- **Mobile layout** — At viewport widths of 1000px or less, greeting titles wrap on their own centered, bold line with smaller indices. A compact caret before the title toggles the greeting textarea. The large-editor icon and action buttons keep their original compact sizes and sit together in a centered row below the title, with wrapping available if space requires it. Alternate and temporary greeting dividers stay below the summary or open textarea; the main greeting has no bottom divider.
- **Expandable summaries** — Click or tap a summary to read its complete text, then activate it again to return to the five-line preview. Keyboard users can focus the summary and press Enter or Space. This does not open or close the greeting textarea, and Expand All / Collapse All continue to control only the textareas.

### Inline Greeting Selector (Chat Widget)

When a chat starts with a character greeting, an inline **greeting selector** widget appears directly above the first message.

- **See which greeting is active** — The widget shows the current greeting's title and description right in the chat, so you always know which greeting you're looking at.
- **Switch greetings from the chat** — Click the shuffle button to open a searchable dropdown of all available greetings. The dropdown supports **fuzzy search** across titles, descriptions, and even greeting content, so you can find the right one fast.
- **Swipe counter** — Shows the current position (e.g., *2 / 5*) so you know where you are among the available greetings.
- **Jump to the editor** — The pencil button opens the Greeting Tools popup and highlights the currently active greeting.
- **Only when changeable** — The selector buttons are only interactive when the chat has exactly one message (the greeting). Once the conversation continues, it switches to a read-only display.
- **Read the full summary** — Click, tap, or use Enter/Space on the summary to toggle between its three-line preview and complete text. This remains available in read-only mode.

Summary expansion is temporary UI state. The popup remembers each greeting's choice through its redraws and reordering, then resets when reopened. The chat widget remembers each greeting's choice while viewing the current chat, including returning to a previous swipe, then resets on a chat switch or page reload. Popup and widget choices are independent and are never saved to character or chat data. Empty summaries remain hidden.

### AI-Powered Title & Description (Auto-Fill)

Don't want to come up with titles yourself? Let the LLM do it.

- **Auto-fill button** (wand icon on each greeting, or wand button in edit popup) — Sends the greeting content to your LLM and generates a short, catchy title and a brief description automatically.
- **Smart fill behavior** — If a title or description already exists, the extension asks before overwriting and shows a before/after preview so you can decide.
- **Edit title popup** — Click the pencil icon on any greeting to manually edit its title and description. The Auto-Fill button is also available inside this popup.
- **Context-aware** — The LLM receives existing greeting titles so it can generate names that are distinct and don't overlap.

### AI-Powered Greeting Generation

Generate entirely new greeting messages using your LLM, directly from the popup or from the chat.

- **Generate from the popup** — Click **"Generate New Greeting"** in the toolbar. You'll be asked for an optional theme or scenario (e.g., *"A rainy day at a café"*). Leave it empty for a general new greeting based on the character.
- **Title & description included** — A checkbox (on by default) lets you also generate a title and description alongside the greeting content in a single flow.
- **Character-aware** — The generation prompt includes the character's description, personality, and scenario, so the output matches the character's style.
- **Diverse results** — Existing greeting titles are sent as context so the LLM avoids creating something too similar to what already exists.
- **Automatic macro replacement** — By default, character and user names in the generated text are replaced with `{{char}}` and `{{user}}` macros, keeping your greetings portable. This can be toggled off in settings. (Changeable via [settings](#settings))

### Temporary Greetings

Generate a greeting on-the-fly without permanently adding it to the character.

- **Generate temporary greeting** — From the greeting selector widget in the chat, click the wand icon. You'll get the same generation popup, and the result is added as a new swipe on the first message.
- **Marked as `TEMP`** — Temporary greetings are clearly tagged with a `TEMP` marker in both the selector and the popup, so you won't confuse them with saved greetings.
- **Try before you save** — Browse the temporary greeting in the chat to see how it reads. If you like it, click the save button (floppy disk icon) to permanently add it as an alternate greeting. If not, just discard it.
- **Persisted per chat** — Temporary greetings are stored in the chat metadata, so they survive a page refresh within the same chat session. They don't affect the character card itself until you save them.

### Settings

Access the extension settings under **Extensions → Greeting Tools** in SillyTavern's settings panel.

- **Collapse greetings by default** — When enabled, greeting blocks in the popup start collapsed instead of expanded. Useful if you have many greetings and prefer a compact overview, or if you only want to see the descriptions.
- **Replace names with macros in generated greetings** — When enabled (default), the extension automatically replaces the character's and user's names with `{{char}}` and `{{user}}` in any LLM-generated greeting text.
- **Customizable prompt templates** — Expand the *Greeting Tool Prompt Templates* drawer to fully customize the prompts sent to the LLM:
  - **Title/Description Generation** — The system prompt used when auto-filling titles and descriptions.
  - **Greeting Generation** — The system prompt used when generating new greeting content.
  - **Greeting Base (with theme)** — The user prompt sent to the LLM when a custom theme/scenario is provided.
  - **Greeting Base (without theme)** — The user prompt sent to the LLM when no theme is provided.
  - Each prompt has a **Reset to default** button to restore the built-in prompt.
  - Any macros will be replaced as usual in prompts, before sending to the LLM.
  - Available dynamic macros are documented directly in the settings UI (e.g., `{{existingTitles}}`, `{{customPrompt}}`).

### How Greeting Data is Stored

- **Titles, descriptions, and ID mappings** are stored in the character's extension data (`data.extensions.greeting_tools`). This means they persist with the character card and survive exports/imports.
- **Temporary greetings** are stored in the chat metadata and are tied to a specific chat session.
- The extension never modifies greetings that already exist — it only adds its own metadata layer on top.

## Roadmap

This is the roadmap of planned or suggested features that might make it into a future release.

- [ ] "Greeting Length" setting, instead of having to manually edit prompt
- [ ] Uninstall hook with (optional) removal of any greeting data (including stored in character metadata)
- [ ] Batch auto-fill titles for all greetings at once
- [ ] Slash commands to manage greetings, titles and descriptions
- [ ] Greeting usage statistics (which greeting was used how often)

## ToDo List

This list mostly functions as a personal reminder of what still needs to be done.

- [x] Greeting Tools popup replacing the default alternate greetings editor
- [x] Inline greeting selector widget in chat
- [x] Fuzzy search in greeting selector dropdown
- [x] Titles and descriptions for each greeting
- [x] LLM auto-fill for titles and descriptions
- [x] LLM-powered greeting generation (with optional theme)
- [x] Temporary greetings (generate, preview, save/discard)
- [x] Customizable prompt templates
- [x] Check if experimental macro engine is enabled, and warn/prompt otherwise
- [ ] Add init/success state of extension, so functions only "work" if the extension was initialized successfully
- [x] Make temp greeting title/desc editable and generateable
- [x] Refactoring / code cleanup (move functions, rename scripts, for separation of concerns) + Move most scripts into subfolder (keeping main repo page clean)
- [x] "Replace names with macros" button in the popup for manual replacing
- [x] Click/tap and keyboard toggle in the in-chat widget to see the full description
- [ ] Store extension version in extension metadata - on update check/ask if default prompts should be updated

## License

AGPL-3.0

