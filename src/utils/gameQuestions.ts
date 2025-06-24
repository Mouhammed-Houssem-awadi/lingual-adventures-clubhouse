
// Enhanced question databases with progressive difficulty

interface WordPair {
  id: string;
  word: string;
  image: string;
  difficulty: number;
  category: string;
}

interface SentenceData {
  id: string;
  sentence: string;
  words: Array<{ id: string; word: string; order: number }>;
  translation: string;
  difficulty: number;
  theme: string;
}

interface GrammarQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  difficulty: number;
  topic: string;
}

interface PronunciationWord {
  id: string;
  word: string;
  phonetic: string;
  difficulty: number;
  tips: string;
  category: string;
}

export const wordPairs: WordPair[] = [
  // Easy (1-2)
  { id: '1', word: 'Cat', image: '🐱', difficulty: 1, category: 'animals' },
  { id: '2', word: 'Dog', image: '🐶', difficulty: 1, category: 'animals' },
  { id: '3', word: 'Sun', image: '☀️', difficulty: 1, category: 'nature' },
  { id: '4', word: 'Moon', image: '🌙', difficulty: 1, category: 'nature' },
  { id: '5', word: 'Book', image: '📚', difficulty: 2, category: 'school' },
  { id: '6', word: 'Apple', image: '🍎', difficulty: 2, category: 'food' },
  { id: '7', word: 'House', image: '🏠', difficulty: 2, category: 'places' },
  { id: '8', word: 'Car', image: '🚗', difficulty: 2, category: 'transport' },
  
  // Medium (3-4)
  { id: '9', word: 'Elephant', image: '🐘', difficulty: 3, category: 'animals' },
  { id: '10', word: 'Rainbow', image: '🌈', difficulty: 3, category: 'nature' },
  { id: '11', word: 'Computer', image: '💻', difficulty: 3, category: 'technology' },
  { id: '12', word: 'Butterfly', image: '🦋', difficulty: 3, category: 'animals' },
  { id: '13', word: 'Sandwich', image: '🥪', difficulty: 4, category: 'food' },
  { id: '14', word: 'Bicycle', image: '🚲', difficulty: 4, category: 'transport' },
  { id: '15', word: 'Telephone', image: '📞', difficulty: 4, category: 'technology' },
  { id: '16', word: 'Mountain', image: '⛰️', difficulty: 4, category: 'nature' },
  
  // Hard (5+)
  { id: '17', word: 'Observatory', image: '🔭', difficulty: 5, category: 'science' },
  { id: '18', word: 'Helicopter', image: '🚁', difficulty: 5, category: 'transport' },
  { id: '19', word: 'Refrigerator', image: '🧊', difficulty: 5, category: 'home' },
  { id: '20', word: 'Laboratory', image: '🧪', difficulty: 6, category: 'science' },
];

export const sentences: SentenceData[] = [
  // Easy (1-2)
  {
    id: '1',
    sentence: 'I am happy',
    words: [
      { id: '1', word: 'I', order: 1 },
      { id: '2', word: 'am', order: 2 },
      { id: '3', word: 'happy', order: 3 },
    ],
    translation: 'Je suis heureux',
    difficulty: 1,
    theme: 'emotions'
  },
  {
    id: '2',
    sentence: 'The cat sleeps',
    words: [
      { id: '4', word: 'The', order: 1 },
      { id: '5', word: 'cat', order: 2 },
      { id: '6', word: 'sleeps', order: 3 },
    ],
    translation: 'Le chat dort',
    difficulty: 1,
    theme: 'animals'
  },
  {
    id: '3',
    sentence: 'We play outside',
    words: [
      { id: '7', word: 'We', order: 1 },
      { id: '8', word: 'play', order: 2 },
      { id: '9', word: 'outside', order: 3 },
    ],
    translation: 'Nous jouons dehors',
    difficulty: 2,
    theme: 'activities'
  },
  
  // Medium (3-4)
  {
    id: '4',
    sentence: 'My sister reads interesting books every evening',
    words: [
      { id: '10', word: 'My', order: 1 },
      { id: '11', word: 'sister', order: 2 },
      { id: '12', word: 'reads', order: 3 },
      { id: '13', word: 'interesting', order: 4 },
      { id: '14', word: 'books', order: 5 },
      { id: '15', word: 'every', order: 6 },
      { id: '16', word: 'evening', order: 7 },
    ],
    translation: 'Ma sœur lit des livres intéressants chaque soir',
    difficulty: 3,
    theme: 'family'
  },
  {
    id: '5',
    sentence: 'The beautiful flowers grow in the garden',
    words: [
      { id: '17', word: 'The', order: 1 },
      { id: '18', word: 'beautiful', order: 2 },
      { id: '19', word: 'flowers', order: 3 },
      { id: '20', word: 'grow', order: 4 },
      { id: '21', word: 'in', order: 5 },
      { id: '22', word: 'the', order: 6 },
      { id: '23', word: 'garden', order: 7 },
    ],
    translation: 'Les belles fleurs poussent dans le jardin',
    difficulty: 4,
    theme: 'nature'
  },
  
  // Hard (5+)
  {
    id: '6',
    sentence: 'Although it was raining heavily, we decided to continue our journey',
    words: [
      { id: '24', word: 'Although', order: 1 },
      { id: '25', word: 'it', order: 2 },
      { id: '26', word: 'was', order: 3 },
      { id: '27', word: 'raining', order: 4 },
      { id: '28', word: 'heavily', order: 5 },
      { id: '29', word: 'we', order: 6 },
      { id: '30', word: 'decided', order: 7 },
      { id: '31', word: 'to', order: 8 },
      { id: '32', word: 'continue', order: 9 },
      { id: '33', word: 'our', order: 10 },
      { id: '34', word: 'journey', order: 11 },
    ],
    translation: 'Bien qu\'il pleuvait fort, nous avons décidé de continuer notre voyage',
    difficulty: 5,
    theme: 'weather'
  },
];

export const grammarQuestions: GrammarQuestion[] = [
  // Easy (1-2)
  {
    id: '1',
    question: 'Choose the correct verb: "I _____ happy."',
    options: ['am', 'is', 'are', 'be'],
    correctAnswer: 0,
    explanation: 'We use "am" with "I". Remember: I am, you are, he/she/it is.',
    difficulty: 1,
    topic: 'verbs'
  },
  {
    id: '2',
    question: 'Which is correct: "The cat _____ sleeping."',
    options: ['am', 'is', 'are', 'were'],
    correctAnswer: 1,
    explanation: 'We use "is" with singular nouns like "cat". The cat is sleeping.',
    difficulty: 1,
    topic: 'verbs'
  },
  {
    id: '3',
    question: 'Choose the plural: "One dog, two _____."',
    options: ['dog', 'dogs', 'doges', 'doggy'],
    correctAnswer: 1,
    explanation: 'Most nouns add "s" to make them plural. One dog becomes two dogs.',
    difficulty: 2,
    topic: 'plurals'
  },
  
  // Medium (3-4)
  {
    id: '4',
    question: 'Which sentence is in past tense?',
    options: [
      'I walk to school',
      'I walked to school',
      'I will walk to school',
      'I am walking to school'
    ],
    correctAnswer: 1,
    explanation: 'Past tense shows something that already happened. "Walked" is the past tense of "walk".',
    difficulty: 3,
    topic: 'tenses'
  },
  {
    id: '5',
    question: 'Choose the correct possessive: "This is _____ book."',
    options: ['Johns', 'John\'s', 'Johns\'', 'John'],
    correctAnswer: 1,
    explanation: 'We use apostrophe + s to show possession for singular nouns. John\'s book means the book belongs to John.',
    difficulty: 4,
    topic: 'possessives'
  },
  
  // Hard (5+)
  {
    id: '6',
    question: 'Which sentence uses the subjunctive mood correctly?',
    options: [
      'If I was rich, I would travel',
      'If I were rich, I would travel',
      'If I am rich, I would travel',
      'If I will be rich, I would travel'
    ],
    correctAnswer: 1,
    explanation: 'The subjunctive "were" is used for hypothetical situations. "If I were rich" expresses an unreal condition.',
    difficulty: 5,
    topic: 'subjunctive'
  },
];

export const pronunciationWords: PronunciationWord[] = [
  // Easy (1-2)
  { id: '1', word: 'Cat', phonetic: '/kæt/', difficulty: 1, tips: 'Say "kat" - short and simple!', category: 'animals' },
  { id: '2', word: 'Dog', phonetic: '/dɔːɡ/', difficulty: 1, tips: 'Say "dog" with a long "o" sound.', category: 'animals' },
  { id: '3', word: 'Hello', phonetic: '/həˈloʊ/', difficulty: 2, tips: 'Say "heh-LOH" - stress the second part!', category: 'greetings' },
  { id: '4', word: 'Thank you', phonetic: '/θæŋk juː/', difficulty: 2, tips: 'Say "thank yoo" - put your tongue between your teeth for "th".', category: 'politeness' },
  
  // Medium (3-4)
  { id: '5', word: 'Beautiful', phonetic: '/ˈbjuːtɪfəl/', difficulty: 3, tips: 'Say "BYOO-ti-ful" - three parts, stress the first!', category: 'adjectives' },
  { id: '6', word: 'Chocolate', phonetic: '/ˈtʃɒklət/', difficulty: 3, tips: 'Say "CHOK-lit" - two parts, not three!', category: 'food' },
  { id: '7', word: 'Comfortable', phonetic: '/ˈkʌmftəbəl/', difficulty: 4, tips: 'Say "KUMF-ter-bul" - the "o" becomes "u" sound.', category: 'adjectives' },
  { id: '8', word: 'Refrigerator', phonetic: '/rɪˈfrɪdʒəreɪtər/', difficulty: 4, tips: 'Say "ri-FRIJ-er-ay-ter" - five parts, stress the second!', category: 'home' },
  
  // Hard (5+)
  { id: '9', word: 'Pronunciation', phonetic: '/prəˌnʌnsiˈeɪʃən/', difficulty: 5, tips: 'Say "pruh-nun-see-AY-shun" - stress the fourth part!', category: 'language' },
  { id: '10', word: 'Worcestershire', phonetic: '/ˈwʊstərʃər/', difficulty: 6, tips: 'Say "WUSS-ter-sher" - much shorter than it looks!', category: 'places' },
];

// Utility functions to get questions based on difficulty
export const getQuestionsByDifficulty = <T extends { difficulty: number }>(
  questions: T[],
  minDifficulty: number,
  maxDifficulty: number
): T[] => {
  return questions.filter(q => q.difficulty >= minDifficulty && q.difficulty <= maxDifficulty);
};

export const calculateDifficultyRange = (score: number): { min: number; max: number } => {
  if (score < 200) return { min: 1, max: 2 }; // Easy
  if (score < 500) return { min: 2, max: 3 }; // Easy-Medium
  if (score < 1000) return { min: 3, max: 4 }; // Medium
  if (score < 2000) return { min: 4, max: 5 }; // Medium-Hard
  return { min: 5, max: 6 }; // Hard
};
