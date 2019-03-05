export function scrapeTitle(data) {
    const match = data.match(/<title.+?>(.+?)<\/title>/i);

    return match ? match[1] : '';
}
export function scrapeImage(data) {
    const match = data.match(/<meta.*?property="og:image".*?content="(.+?)".*?\/?>/i);

    return match ? match[1] : '';
}