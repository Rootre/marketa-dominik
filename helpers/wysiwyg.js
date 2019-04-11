import draftToHtml from 'draftjs-to-html';

export function getHTMLFromStringifiedState(stringState) {
    return draftToHtml(JSON.parse(stringState));
}