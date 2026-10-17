/**
 * Full lorebook context for greeting generation. Activation and retrieval rules
 * deliberately do not participate: only disabled entries are excluded.
 */

/**
 * Resolves the primary and additional books attached to one character avatar.
 * @param {object} character Character card
 * @param {object[]} [characterLore=[]] Native world_info.charLore assignments
 * @returns {{ primary: string, auxiliary: string[] }}
 */
export function getCharacterLorebooks(character, characterLore = []) {
    const primary = character?.data?.extensions?.world || '';
    const avatarKey = character?.avatar?.replace(/\.[^/.]+$/, '');
    const assignment = avatarKey ? characterLore.find(item => item.name === avatarKey) : null;
    const auxiliary = [...new Set(assignment?.extraBooks || [])]
        .filter(name => typeof name === 'string' && name.length > 0 && name !== primary);

    return { primary, auxiliary };
}

/**
 * Reads every enabled entry in its stored order, preserving the complete content.
 * @param {object} book Loaded native World Info data
 * @returns {string}
 */
export function getEnabledLorebookText(book) {
    return Object.values(book.entries)
        .filter(entry => entry && !entry.disable && typeof entry.content === 'string')
        .map(entry => entry.content)
        .join('\n\n');
}

/**
 * @typedef {object} GreetingLorebooks
 * @property {string} [characterBook] Primary character book, when selected
 * @property {string[]} [auxiliaryBooks] Additional character books, when selected
 * @property {string} [personaBook] Manually selected persona book
 */

/**
 * Builds persona, character, then auxiliary context without scanning for keywords
 * or querying vectors. A failed selected book rejects the entire context load.
 * @param {GreetingLorebooks} [selection={}]
 * @param {object} dependencies
 * @param {(name: string) => Promise<object|null>} dependencies.loadWorldInfo
 * @param {string} dependencies.userName
 * @param {string} dependencies.characterName
 * @returns {Promise<string>}
 */
export async function buildLorebookContext(selection = {}, { loadWorldInfo, userName, characterName }) {
    const { characterBook = '', auxiliaryBooks = [], personaBook = '' } = selection;
    const loadedBooks = new Map();
    const readBook = async name => {
        if (!loadedBooks.has(name)) {
            loadedBooks.set(name, (async () => {
                const book = await loadWorldInfo(name);
                if (!book?.entries || typeof book.entries !== 'object') {
                    throw new Error(`Could not load lorebook "${name}".`);
                }
                return getEnabledLorebookText(book);
            })());
        }
        return loadedBooks.get(name);
    };

    const sections = [];
    if (personaBook) {
        const text = await readBook(personaBook);
        if (text) sections.push(`===== ${userName} =====\n\n${text}`);
    }

    const characterBooks = [...new Set([characterBook, ...auxiliaryBooks].filter(Boolean))];
    if (characterBooks.length) {
        const texts = await Promise.all(characterBooks.map(readBook));
        const text = texts.filter(Boolean).join('\n\n');
        if (text) sections.push(`===== ${characterName} =====\n\n${text}`);
    }

    return sections.length
        ? `========= ADDITIONAL INFORMATION =========\n\n${sections.join('\n\n')}`
        : '';
}
