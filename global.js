export function isValidUrl(_string) {
    const matchpattern = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm;
    return matchpattern.test(_string);
}

const charset = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export function encode(int) {
    if (int === 0) {
        return 0;
    }
    let s = [];
    while (int > 0) {
        s = [charset[int % 62], ...s];
        int = Math.floor(int / 62);
    }
    return s.join('');
}

export function decode (chars) {
    return chars
    .split('')
    .reverse()
    .reduce((prev, curr, i) => prev + charset.indexOf(curr) * 62 ** i, 0);
}