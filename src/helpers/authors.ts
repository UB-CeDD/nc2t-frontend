// Helpers to serialize and format author lists

export type AuthorParts = { first?: string; middle?: string; last?: string };

// Serialize structured authors into a full-name string for saving in backend.
// Output format: "Last, First Middle; NextLast, NextFirst NextMiddle"
export function serializeFullAuthors(authors: AuthorParts[]): string {
    return authors
        .map(a => {
            const last = (a.last || '').trim();
            const first = (a.first || '').trim();
            const middle = (a.middle || '').trim();
            if (last && (first || middle)) {
                return `${last}, ${[first, middle].filter(Boolean).join(' ')}`;
            }
            // fallback to any available name
            return [first, middle, last].filter(Boolean).join(' ');
        })
        .filter(Boolean)
        .join('; ');
}

// Format an author full-name string for display.
// Input expected: either "Last, First Middle; Last2, First2" or a space-separated full name.
// Behavior change: if there's only one author, do NOT add dots after initials and do NOT add commas between authors.
// If there are multiple authors, add dots after initials and separate authors with a comma and space,
// BUT the last author will not have dots after initials (as requested).
// Examples:
// - Single author "Smith, John A" -> "Smith J A"
// - Multiple authors "Smith, John A; Lee, Mary B" -> "Smith J.A., Lee M B"  (last author without dots)
export function formatAuthorsForDisplay(authorStr?: string): string {
    if (!authorStr) return '';
    // Split authors by semicolon first, fallback to ',' between authors if semicolons absent but multiple
    const rawAuthors = authorStr.includes(';')
        ? authorStr.split(';')
        : authorStr.split(',').map((s) => s.trim());

    const parsed = rawAuthors
        .map(raw => raw.trim())
        .filter(Boolean)
        .map(raw => {
            let last = '';
            let rest = '';

            if (raw.includes(',')) {
                // "Last, First Middle"
                const [l, r] = raw.split(',');
                last = (l || '').trim();
                rest = (r || '').trim();
            } else {
                // "First Middle Last" fallback
                const parts = raw.split(' ').filter(Boolean);
                if (parts.length === 1) {
                    return { last: parts[0], initials: [] as string[] };
                }
                last = parts[parts.length - 1];
                rest = parts.slice(0, -1).join(' ');
            }

            const initials = rest
                .split(' ')
                .filter(Boolean)
                .map(p => p.charAt(0).toUpperCase());

            return { last, initials };
        });

    if (parsed.length === 0) return '';

    // Single author: do not add dots after initials, and no commas needed
    if (parsed.length === 1) {
        const a = parsed[0];
        if (!a.last) {
            // if no last name, just return initials joined by space
            return a.initials.join(' ');
        }
        const initialsNoDots = a.initials.join(' ');
        return initialsNoDots ? `${a.last} ${initialsNoDots}` : a.last;
    }

    // Multiple authors: add dots after each initial for all but the last author; last author has no dots
    const formatted = parsed.map((a, idx) => {
        const isLast = idx === parsed.length - 1;
        if (!a.last) {
            // no last name: return initials; add dots only if not last
            return isLast ? a.initials.join('') : a.initials.map(i => i + '.').join('');
        }
        const initialsWithOrWithoutDots = isLast
            ? a.initials.map(i => i).join('')
            : a.initials.map(i => i + '.').join('');
        return initialsWithOrWithoutDots ? `${a.last} ${initialsWithOrWithoutDots}` : a.last;
    });

    return formatted.join(', ');
}
