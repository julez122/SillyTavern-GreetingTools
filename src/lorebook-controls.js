import { t } from '../../../../i18n.js';

/**
 * Compact, popup-local lorebook controls. They do not change native associations
 * or persist a choice into character, persona, chat, or extension settings.
 * @param {object} options
 * @param {{ primary: string, auxiliary: string[] }} options.characterBooks
 * @param {string[]} options.bookNames All available native lorebooks
 * @param {string} [options.personaBook] Currently associated persona lorebook
 * @returns {{ element: HTMLDivElement, getSelection: () => import('./lorebooks.js').GreetingLorebooks, validate: () => boolean }}
 */
export function createLorebookControls({ characterBooks, bookNames, personaBook = '' }) {
    const element = document.createElement('div');
    element.className = 'greeting-tools-lorebook-options';
    element.setAttribute('role', 'group');
    element.setAttribute('aria-label', t`Lorebook context`);

    const addCheckbox = (parent, id, text) => {
        const label = document.createElement('label');
        label.className = 'checkbox_label';
        label.htmlFor = id;
        const input = document.createElement('input');
        input.type = 'checkbox';
        input.id = id;
        const caption = document.createElement('span');
        caption.textContent = text;
        label.append(input, caption);
        parent.append(label);
        return input;
    };

    const character = addCheckbox(element, 'greeting_gen_character_lore', t`Add Character lorebook to prompt`);
    character.disabled = !characterBooks.primary && characterBooks.auxiliary.length === 0;
    if (character.disabled) character.parentElement.title = t`No lorebook is attached to this character.`;

    let auxiliary;
    if (characterBooks.auxiliary.length) {
        const dependent = document.createElement('div');
        dependent.className = 'greeting-tools-lorebook-dependent greeting-tools-lorebook-auxiliary';
        dependent.hidden = true;
        auxiliary = addCheckbox(dependent, 'greeting_gen_auxiliary_lore', t`Add Auxiliary Lorebook`);
        auxiliary.parentElement.title = characterBooks.auxiliary.join('\n');
        element.append(dependent);
        character.addEventListener('change', () => {
            dependent.hidden = !character.checked;
            auxiliary.disabled = !character.checked;
        });
        auxiliary.disabled = true;
    }

    const persona = addCheckbox(element, 'greeting_gen_persona_lore', t`Add Persona lorebook to prompt`);
    const dependent = document.createElement('div');
    dependent.className = 'greeting-tools-lorebook-dependent';
    dependent.hidden = true;
    const select = document.createElement('select');
    select.id = 'greeting_gen_persona_book';
    select.className = 'text_pole';
    select.setAttribute('aria-label', t`Choose Persona Lorebook`);
    select.disabled = true;
    const placeholder = document.createElement('option');
    placeholder.value = '';
    placeholder.textContent = t`Choose Persona Lorebook`;
    select.append(placeholder);
    for (const name of [...new Set(bookNames)].sort((a, b) => a.localeCompare(b))) {
        const option = document.createElement('option');
        option.value = name;
        option.textContent = name;
        select.append(option);
    }
    if (bookNames.includes(personaBook)) select.value = personaBook;
    dependent.append(select);
    element.append(dependent);
    persona.addEventListener('change', () => {
        dependent.hidden = !persona.checked;
        select.disabled = !persona.checked;
    });

    return {
        element,
        getSelection: () => ({
            characterBook: character.checked ? characterBooks.primary : '',
            auxiliaryBooks: character.checked && auxiliary?.checked ? [...characterBooks.auxiliary] : [],
            personaBook: persona.checked ? select.value : '',
        }),
        validate: () => {
            if (persona.checked && !select.value) {
                toastr.warning(t`Choose a persona lorebook or turn off persona lorebook context.`);
                select.focus();
                return false;
            }
            return true;
        },
    };
}
