export function getInitialsUppercase(name: string) {
  return name
    .split(" ")
    .filter((_, index, { length }) => index === 0 || index === length - 1)
    .map((name) => name[0])
    .join("")
    .toUpperCase();
}
