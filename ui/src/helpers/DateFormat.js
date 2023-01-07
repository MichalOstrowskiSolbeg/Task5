export function getFormattedDate(dateSource) {
    return dateSource.replace('T', ' ').split('.')[0].slice(0, -3).toString();
}