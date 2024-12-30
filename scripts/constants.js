export const FORMS = Object.freeze({
  ATTITUDE: 'attitude',
  INTERPERSONAL_RELATIONSHIP: 'interpersonal_relationship',
  EMOTIONAL_REGULATION: 'emotional_regulation',
});

export const QUESTIONS = Object.freeze({
  [FORMS.ATTITUDE]: [
    'Enunciado questão 1-1',
    'Enunciado questão 1-2',
    'Enunciado questão 1-3',
  ],
  [FORMS.INTERPERSONAL_RELATIONSHIP]: [
    'Enunciado questão 2-1',
    'Enunciado questão 2-2',
    'Enunciado questão 2-3',
  ],
  [FORMS.EMOTIONAL_REGULATION]: [
    'Enunciado questão 3-1',
    'Enunciado questão 3-2',
    'Enunciado questão 3-3',
  ],
});

export const NEXT_PAGE = Object.freeze({
  [FORMS.ATTITUDE]: `/questionnaires/${FORMS.INTERPERSONAL_RELATIONSHIP}/`,
  [FORMS.INTERPERSONAL_RELATIONSHIP]: `/questionnaires/${FORMS.EMOTIONAL_REGULATION}/`,
  [FORMS.EMOTIONAL_REGULATION]: '/coach/',
});
