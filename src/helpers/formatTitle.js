export default function formatTitle(title) {
  if (title == undefined) {
    return title;
  }

  if (title.length < 30) {
    return title.toLowerCase();
  }

  return `${title.substring(0, 24).toLocaleLowerCase()} . . .`;
}
