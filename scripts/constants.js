export const FORMS = Object.freeze({
  ATTITUDE: 'attitude',
  INTERPERSONAL_RELATIONSHIP: 'interpersonal_relationship',
  EMOTIONAL_REGULATION: 'emotional_regulation',
});

export const FORMS_PASCAL_CASE = Object.freeze({
  [FORMS.ATTITUDE]: 'Attitude',
  [FORMS.INTERPERSONAL_RELATIONSHIP]: 'InterpersonalRelationship',
  [FORMS.EMOTIONAL_REGULATION]: 'EmotionalRegulation',
});

export const QUESTIONNAIRES_CATEGORIES = Object.freeze({
  // Attitude
  ORGANIZATIONAL_MANAGEMENT: 'organizational_management',
  DECISION_MAKING: 'decision_making',
  // Interpersonal Relationship
  COMMUNICATION: 'communication',
  COACH_ATHLETE_RELATIONSHIP: 'coach_athlete_relationship',
  LEADERSHIP: 'leadership',
  // Emotional Regulation
  RESILIENCE: 'resilience',
  STRESS: 'stress',
  POSITIVE_MENTAL_HEALTH: 'positive_mental_health',
  SELF_CONFIDENCE_AND_SELF_EFFICACY: 'self_confidence_and_self_efficacy',
});

export const QUESTIONS = Object.freeze({
  [FORMS.ATTITUDE]: [
    {
      category: QUESTIONNAIRES_CATEGORIES.ORGANIZATIONAL_MANAGEMENT,
      text: 'Enunciado questão 1-1',
      invert: false,
    },
    {
      category: QUESTIONNAIRES_CATEGORIES.ORGANIZATIONAL_MANAGEMENT,
      text: 'Enunciado questão 1-2',
      invert: true,
    },
    {
      category: QUESTIONNAIRES_CATEGORIES.DECISION_MAKING,
      text: 'Enunciado questão 1-3',
      invert: false,
    },
    {
      category: QUESTIONNAIRES_CATEGORIES.DECISION_MAKING,
      text: 'Enunciado questão 1-4',
      invert: true,
    },
  ],
  [FORMS.INTERPERSONAL_RELATIONSHIP]: [
    {
      category: QUESTIONNAIRES_CATEGORIES.ORGANIZATIONAL_MANAGEMENT,
      text: 'Enunciado questão 2-1',
      invert: false,
    },
    {
      category: QUESTIONNAIRES_CATEGORIES.ORGANIZATIONAL_MANAGEMENT,
      text: 'Enunciado questão 2-2',
      invert: false,
    },
    {
      category: QUESTIONNAIRES_CATEGORIES.DECISION_MAKING,
      text: 'Enunciado questão 2-3',
      invert: false,
    },
  ],
  [FORMS.EMOTIONAL_REGULATION]: [
    {
      category: QUESTIONNAIRES_CATEGORIES.ORGANIZATIONAL_MANAGEMENT,
      text: 'Enunciado questão 3-1',
      invert: false,
    },
    {
      category: QUESTIONNAIRES_CATEGORIES.ORGANIZATIONAL_MANAGEMENT,
      text: 'Enunciado questão 3-2',
      invert: false,
    },
    {
      category: QUESTIONNAIRES_CATEGORIES.DECISION_MAKING,
      text: 'Enunciado questão 3-3',
      invert: false,
    },
  ],
});

export const COACH_PAGE = '/coach/';

export const PREVIOUS_PAGE = Object.freeze({
  [FORMS.INTERPERSONAL_RELATIONSHIP]: `/questionnaires/${FORMS.ATTITUDE}/`,
  [FORMS.EMOTIONAL_REGULATION]: `/questionnaires/${FORMS.INTERPERSONAL_RELATIONSHIP}/`,
});

export const NEXT_PAGE = Object.freeze({
  [FORMS.ATTITUDE]: `/questionnaires/${FORMS.INTERPERSONAL_RELATIONSHIP}/`,
  [FORMS.INTERPERSONAL_RELATIONSHIP]: `/questionnaires/${FORMS.EMOTIONAL_REGULATION}/`,
  [FORMS.EMOTIONAL_REGULATION]: COACH_PAGE,
});
