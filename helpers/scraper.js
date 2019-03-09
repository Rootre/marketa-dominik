export function scrapeTitle(data) {
    const match = data.match(/<title.*?>[\s]*(.+?)[\s]*<\/title>/i);

    return match ? match[1] : '';
}
export function scrapeImage(data) {
    let match = data.match(/<meta [^>]*property=[\"']og:image[\"'] [^>]*content=[\"']([^'^\"]+?)[\"'][^>]*>/i);

    if (!match) {
        match = data.match(/<meta [^>]*content=[\"']([^'^\"]+?)[\"'] [^>]*property=[\"']og:image[\"'][^>]*>/i);
    }

    if (!match) {
        return '';
    }

    const imageEncoded = match[1];
    const element = document.createElement('div');

    element.innerHTML = imageEncoded;

    const imageDecoded = element.textContent;

    element.textContent = '';

    return imageDecoded;
}