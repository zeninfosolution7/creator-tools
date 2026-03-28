export const processYoutubeContent = (input: string, includeTimestamps: boolean) => {
  // 1. Remove SRT/VTT noise (index numbers and arrow symbols)
  let cleanText = input
    .replace(/\d+\n\d{2}:\d{2}:\d{2},\d{3} --> \d{2}:\d{2}:\d{2},\d{3}/g, '') // SRT
    .replace(/(\d{2}:\d{2}:\d{2}\.\d{3} --> \d{2}:\d{2}:\d{2}\.\d{3})/g, '') // VTT
    .replace(/<[^>]*>/g, ''); // HTML tags

  // 2. Extract Timestamps for Chapters
  const timestampRegex = /(\d{1,2}:)?\d{1,2}:\d{2}/g;
  const lines = input.split('\n');
  const chapters = lines
    .filter(line => timestampRegex.test(line))
    .map(line => {
      const time = line.match(timestampRegex)?.[0];
      const text = line.replace(timestampRegex, '').replace(/-->/g, '').trim();
      return time ? `${formatTimestamp(time)} ${text}` : null;
    })
    .filter(Boolean);

  // 3. Clean Body Text
  const body = cleanText
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0 && !/^\d+$/.test(line))
    .join(' ')
    .replace(/\s+/g, ' '); // Remove double spaces

  return {
    description: body,
    chapters: includeTimestamps ? chapters.slice(0, 15).join('\n') : '',
    hashtags: generateHashtags(body)
  };
};

const formatTimestamp = (time: string) => {
    // Converts 00:00:05,000 to 00:05
    const parts = time.split(':');
    if (parts.length === 3) return `${parts[1]}:${parts[2].split(',')[0]}`;
    return time;
};