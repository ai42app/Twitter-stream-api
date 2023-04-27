const test = () => {
  const string = 'The brown fox jumps over the dog';
  const wordsToCheck = ['quick', 'lazy', 'dog'];

  const foundWord = wordsToCheck.find(word => string.includes(word));

  if (foundWord) {
    console.log(`Found word: ${foundWord}`);
  } else {
    console.log('No matching words found');
  }
}

test()
