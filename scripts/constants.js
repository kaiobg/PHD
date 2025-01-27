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

export const CATEGORIES_NAME_MAPPER = Object.freeze({
  // Attitude
  [QUESTIONNAIRES_CATEGORIES.ORGANIZATIONAL_MANAGEMENT]: 'Gestão organizacional',
  [QUESTIONNAIRES_CATEGORIES.DECISION_MAKING]: 'Tomada de decisão',
  // Interpersonal Relationship
  [QUESTIONNAIRES_CATEGORIES.COMMUNICATION]: 'Comunicação',
  [QUESTIONNAIRES_CATEGORIES.COACH_ATHLETE_RELATIONSHIP]: 'Relação treinador-aluno',
  [QUESTIONNAIRES_CATEGORIES.LEADERSHIP]: 'Liderança',
  // Emotional Regulation
  [QUESTIONNAIRES_CATEGORIES.RESILIENCE]: 'Resiliência',
  [QUESTIONNAIRES_CATEGORIES.STRESS]: 'Estresse',
  [QUESTIONNAIRES_CATEGORIES.POSITIVE_MENTAL_HEALTH]: 'Saúde mental positiva',
  [QUESTIONNAIRES_CATEGORIES.SELF_CONFIDENCE_AND_SELF_EFFICACY]: 'Autoconfiança e autoeficácia',
});

export const QUESTIONS = Object.freeze({
  [FORMS.ATTITUDE]: [
    {
      category: QUESTIONNAIRES_CATEGORIES.DECISION_MAKING,
      text: 'Durante as competições, consigo equilibrar as emoções ao tomar decisões importantes.',
      invert: false,
    },
    {
      category: QUESTIONNAIRES_CATEGORIES.ORGANIZATIONAL_MANAGEMENT,
      text: 'Encontro dificuldades para lidar com demandas dos familiares dos atletas.',
      invert: true,
    },
    {
      category: QUESTIONNAIRES_CATEGORIES.ORGANIZATIONAL_MANAGEMENT,
      text: 'Mantenho uma comunicação ativa e positiva com dirigentes e equipe administrativa. ',
      invert: false,
    },
    {
      category: QUESTIONNAIRES_CATEGORIES.DECISION_MAKING,
      text: 'Tomo decisões confiando no feedback direto dos atletas e da equipe técnica. ',
      invert: false,
    },
    {
      category: QUESTIONNAIRES_CATEGORIES.ORGANIZATIONAL_MANAGEMENT,
      text: 'Falta confiança em minha capacidade de mediar conflitos com equipe administrativa ou familiares. ',
      invert: true,
    },
    {
      category: QUESTIONNAIRES_CATEGORIES.DECISION_MAKING,
      text: 'Planejo minhas decisões do dia a dia com base em objetivos de longo prazo. ',
      invert: false,
    },
    {
      category: QUESTIONNAIRES_CATEGORIES.ORGANIZATIONAL_MANAGEMENT,
      text: 'Busco resolver problemas com os árbitros de forma profissional e sem perder o controle. ',
      invert: false,
    },
    {
      category: QUESTIONNAIRES_CATEGORIES.DECISION_MAKING,
      text: 'Sinto dificuldade em tomar decisões sob pressão de resultados. ',
      invert: true,
    },
    {
      category: QUESTIONNAIRES_CATEGORIES.ORGANIZATIONAL_MANAGEMENT,
      text: 'É importante construir um bom diálogo com os árbitros para reduzir conflitos.',
      invert: false,
    },
    {
      category: QUESTIONNAIRES_CATEGORIES.DECISION_MAKING,
      text: 'Tomo decisões rapidamente em situações de pressão durante os jogos. ',
      invert: false,
    },
    {
      category: QUESTIONNAIRES_CATEGORIES.ORGANIZATIONAL_MANAGEMENT,
      text: 'Relações interpessoais fora da quadra são desgastantes para meu trabalho.  ',
      invert: true,
    },
    {
      category: QUESTIONNAIRES_CATEGORIES.DECISION_MAKING,
      text: 'Minhas decisões consideram sempre o impacto no desenvolvimento dos atletas. ',
      invert: false,
    },
    {
      category: QUESTIONNAIRES_CATEGORIES.ORGANIZATIONAL_MANAGEMENT,
      text: 'O entendimento entre familiares, atletas e treinador é essencial para alcançar os objetivos do time. ',
      invert: false,
    },
    {
      category: QUESTIONNAIRES_CATEGORIES.ORGANIZATIONAL_MANAGEMENT,
      text: 'Sempre evito conflitos desnecessários com gestores e equipes administrativas. ',
      invert: false,
    },
    {
      category: QUESTIONNAIRES_CATEGORIES.DECISION_MAKING,
      text: 'Muitas vezes sinto insegurança ao decidir durante situações críticas. ',
      invert: true,
    },
    {
      category: QUESTIONNAIRES_CATEGORIES.DECISION_MAKING,
      text: 'As decisões no treino são baseadas em uma análise cuidadosa do desempenho anterior.',
      invert: false,
    },
    {
      category: QUESTIONNAIRES_CATEGORIES.ORGANIZATIONAL_MANAGEMENT,
      text: 'Mantenho um relacionamento respeitoso com os familiares dos atletas. ',
      invert: false,
    },
    {
      category: QUESTIONNAIRES_CATEGORIES.DECISION_MAKING,
      text: 'Levo em consideração a opinião de familiares dos atletas e equipes administrativas para tomar minha decisão no planejamento de treino.  ',
      invert: true,
    },
    {
      category: QUESTIONNAIRES_CATEGORIES.ORGANIZATIONAL_MANAGEMENT,
      text: 'Mantenho uma postura colaborativa com gestores para organizar competições.  ',
      invert: false,
    },
    {
      category: QUESTIONNAIRES_CATEGORIES.DECISION_MAKING,
      text: 'As decisões durante os jogos são frequentemente influenciadas pela experiência prévia. ',
      invert: false,
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
