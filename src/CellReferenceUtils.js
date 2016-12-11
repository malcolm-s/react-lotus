export function asXLabel(n) {
    const factor = n / 26;

    if (factor > 1) {
        const roundedFactor = Math.floor(factor);

        const initialLetter = String.fromCharCode(96 + roundedFactor);

        const finalLetter = String.fromCharCode(97 + n - (26 * roundedFactor));

        return (initialLetter + finalLetter).toUpperCase();
    }

    return String.fromCharCode(96 + n).toUpperCase();
}

export function fromStringReference(reference) {
    // A1   ->  { x: 1,  y: 1 }
    // AA1  ->  { x: 27, y: 1 }

    const parts = reference.split(/(\d+)/).filter(p => p.length > 0);

    return {
        x: fromXLabel(parts[0].toLowerCase()),
        y: parseInt(parts[1], 10)
    };
}

function fromXLabel(label) {
    if (label.length === 1) {
        return label.charCodeAt(0) - 96;
    } else {
        return (label.charCodeAt(0) - 96) * 26 + (label.charCodeAt(1) - 96);
    }
}

export function referenceMatch(reference1, reference2) {
    return reference1.x === reference2.x
        && reference1.y === reference2.y
}

export function isReference(str) {
    return /^([a-z])+([0-9])+$/i.test(str);
}