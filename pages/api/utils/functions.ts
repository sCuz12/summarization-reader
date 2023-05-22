export function generateName(){
const prefix = 'readitforme';
  const randomSuffix = Math.random().toString(36).substring(7); // Generate a random alphanumeric string as the suffix
  return `${prefix}_${randomSuffix}.mp3`;
}