export type I18nText = {
  ar?: string;
  fr: string;
  en?: string;
};

export type Level = "beginner" | "intermediate" | "advanced" | "professional";

export type LESSON_TYPE = "quiz" | "one_file_code" | "multi_file_code" | "one_file_algo_code";

export type Language = "python" | "javascript" | "typescript";

export type LearningPath = {
  _id: string;
  name: I18nText;
  description: I18nText;
  level: Level;
  createdAt: string;
  updatedAt: string;
};

export type Course = {
  _id: string;
  name: I18nText;
  description: I18nText;
  level: Level;
  createdAt: string;
  updatedAt: string;
};

export type Chapter = {
  _id: string;
  name: I18nText;
  status: I18nText;

  order: number;
  courseId: string;

  createdAt: string;
  updatedAt: string;
};

export type Quizz = {
  question: I18nText;

  options: {
    option: I18nText;
    isCorrect: boolean;
  }[];
};

export type OneFileCode = {
  fileContent: string;
  testFile: string;
  solutionFile: string;
  language: Language;
};

export type OneFileAlgoCode = {
  python: OneFileCode | null;
  javascript: OneFileCode | null;
  typescript: OneFileCode | null;
};

export type MultiFileCode = {
  files: {
    fileName: string;
    fileContent: string;
  }[];

  testFile: string;
  solutionFile: string;

  language: Language;
};

export type Lesson = {
  chapterId: string;

  order: number;

  name: I18nText;
  content: I18nText;

  status: string;

  type: LESSON_TYPE;

  quiz: Quizz | null;

  oneFileCode: OneFileCode | null;

  multiFileCode: MultiFileCode | null;

  oneFileAlgoCode: OneFileAlgoCode | null;

  createdAt: Date;
  updatedAt: Date;
};
