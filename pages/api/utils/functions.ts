export function generateName(){
const prefix = 'summarizeAudio';
  const randomSuffix = Math.random().toString(36).substring(7); // Generate a random alphanumeric string as the suffix
  return `${prefix}_${randomSuffix}.mp3`;
}

export function passwordsMatchValidator(password:string,confirmPassword:string):boolean {
  return password === confirmPassword;
}