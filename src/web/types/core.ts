export interface LearningPath {
  id: string;
  level: string;
  color: string;
  image?: string;
  title_fr: string;
  title_en: string;
  title_ar: string;
  description_fr: string;
  description_en: string;
  description_ar: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface Course {
  id: string;
  learning_path_id: string;
  order: number;
  level: string;
  color: string;
  image: string | null;

  title_fr: string | null;
  title_en: string | null;
  title_ar: string | null;

  description_fr: string | null;
  description_en: string | null;
  description_ar: string | null;

  status: string;

  createdAt: Date;
  updatedAt: Date;
}

export interface Chapter {
  id: string;
  course_id: string;
  order: number;

  title_fr: string;
  title_en: string;
  title_ar: string;

  status: string;

  createdAt: Date;
  updatedAt: Date;
}

export interface Lesson {
  id: string;
  chapter_id: string;
  order: number;

  title_fr: string;
  title_en: string;
  title_ar: string;

  content_fr: string;
  content_en: string;
  content_ar: string;

  type: string;

  multiple_choice_options: any;
  multiple_choice_correct_options: any;

  code_languages: any;
  code_languages_templates: any;
  code_languages_solutions: any;
  code_languages_tests: any;

  code_language: string | null;
  code_template: any;
  code_solution: any;
  code_test: any;

  quizz_questions: any;
  quizz_correct_answers: any;

  status: string;

  createdAt: Date;
  updatedAt: Date;
}



export type I18nText = {
  ar?: string;
  fr: string;
  en?: string;
};

export type LearningPaths = {
  _id: string;
  order: number;
  name: I18nText;
  description: I18nText;
  level: "beginner" | "intermediate" | "advanced" | "professional";
  status: "active" | "inactive";
  createdAt: string;
  updatedAt: string;
};