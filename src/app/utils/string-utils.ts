export function getUrls(text: string): string[] {
  var matches = text.match(/\bhttps?:\/\/\S+/gi);
  return matches?.map((e) => e.toString()) ?? [];
}

export function getHashTags(text: string): string[] {
  var matches = text.match(/\B#\S+/gi);
  return (
    matches?.map((e) => e.toString()).filter((v, i, a) => a.indexOf(v) === i) ??
    []
  );
}
