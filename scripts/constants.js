export const FORMS = Object.freeze({
  ATTITUDE: 'attitude',
  INTERPERSONAL_RELATIONSHIP: 'interpersonal_relationship',
  EMOTIONAL_REGULATION: 'emotional_regulation',
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
      text: 'Durante as competições, consigo equilibrar minhas emoções ao tomar decisões importantes.',
      invert: false,
    },
    {
      category: QUESTIONNAIRES_CATEGORIES.ORGANIZATIONAL_MANAGEMENT,
      text: 'Encontro dificuldades para lidar com demandas dos familiares do/a(s) atleta(s).',
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
      text: 'Planejo minhas decisões do dia a dia com base nos meus objetivos de longo prazo. ',
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
      text: 'Acredito ser importante construir um bom diálogo com os árbitros para reduzir conflitos.',
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
      text: 'Minhas decisões consideram sempre o impacto no desenvolvimento do/a(s) atleta(s). ',
      invert: false,
    },
    {
      category: QUESTIONNAIRES_CATEGORIES.ORGANIZATIONAL_MANAGEMENT,
      text: 'O entendimento entre familiares, atleta(s) e treinador(a) é essencial para alcançar os objetivos do time. ',
      invert: false,
    },
    {
      category: QUESTIONNAIRES_CATEGORIES.ORGANIZATIONAL_MANAGEMENT,
      text: 'Sempre evito conflitos desnecessários com gestores e equipes administrativas. ',
      invert: false,
    },
    {
      category: QUESTIONNAIRES_CATEGORIES.DECISION_MAKING,
      text: 'Muitas vezes, me sinto inseguro(a) para decidir durante situações críticas. ',
      invert: true,
    },
    {
      category: QUESTIONNAIRES_CATEGORIES.DECISION_MAKING,
      text: 'As decisões no treino são baseadas na análise cuidadosa do desempenho anterior.',
      invert: false,
    },
    {
      category: QUESTIONNAIRES_CATEGORIES.ORGANIZATIONAL_MANAGEMENT,
      text: 'Mantenho um relacionamento respeitoso com os familiares do/a(s) atleta(s). ',
      invert: false,
    },
    {
      category: QUESTIONNAIRES_CATEGORIES.DECISION_MAKING,
      text: 'Levo em consideração a opinião de familiares do/a(s)s atleta(s) e equipe(s) administrativas para tomar minha decisão no planejamento de treino.  ',
      invert: true,
    },
    {
      category: QUESTIONNAIRES_CATEGORIES.ORGANIZATIONAL_MANAGEMENT,
      text: 'Mantenho uma postura colaborativa com gestores para organizar competições.  ',
      invert: false,
    },
    {
      category: QUESTIONNAIRES_CATEGORIES.DECISION_MAKING,
      text: 'Minhas decisões durante os jogos são frequentemente influenciadas pela experiência prévia. ',
      invert: false,
    },

  ],
  [FORMS.INTERPERSONAL_RELATIONSHIP]: [
    {
      category: QUESTIONNAIRES_CATEGORIES.COMMUNICATION,
      text: 'Dou orientações claras e objetivas sobre técnicas e táticas durante os treinos e competições.',
      invert: false,/*1 */
    },
    {
      category: QUESTIONNAIRES_CATEGORIES.COACH_ATHLETE_RELATIONSHIP,
      text: 'Demonstro sensibilidade em relação às necessidades pessoais do/a(s) atleta(s).',
      invert: false,/*2 */
    },
    {
      category: QUESTIONNAIRES_CATEGORIES.LEADERSHIP,
      text: 'Não acho importante considerar as ideias ou sugestões do/a(s) atleta(s) durante os treinos.',
      invert: true,/*3 */
    },
    {
      category: QUESTIONNAIRES_CATEGORIES.LEADERSHIP,
      text: 'Adapto os treinos de acordo com o nível de habilidade do/a(s) atleta(s).',
      invert: false,/*4 */
    },
    {
      category: QUESTIONNAIRES_CATEGORIES.COACH_ATHLETE_RELATIONSHIP,
      text: 'Promovo um ambiente em que o/a(s) atleta(s) se sentem à vontade para expressar ideias e preocupações.',
      invert: false,/*5*/
    },
    {
      category: QUESTIONNAIRES_CATEGORIES.COACH_ATHLETE_RELATIONSHIP,
      text: 'Não considero importante dar atenção ao bem-estar emocional do/a(s) atleta(s).',
      invert: true,/*6*/
    },
    {
      category: QUESTIONNAIRES_CATEGORIES.LEADERSHIP,
      text: 'Recompenso o esforço e desempenho positivo do/a(s) atleta(s).',
      invert: false,/*7 */
    },
    {
      category: QUESTIONNAIRES_CATEGORIES.LEADERSHIP,
      text: 'Estabeleço metas claras para a equipe e explico como podemos alcançá-las juntos.',
      invert: false,/*8 */
    },
    {
      category: QUESTIONNAIRES_CATEGORIES.COACH_ATHLETE_RELATIONSHIP,
      text: 'Não levo em consideração os sentimentos e insatisfações do/a(s) atleta(s). ',
      invert: true,/*9*/
    },
    {
      category: QUESTIONNAIRES_CATEGORIES.LEADERSHIP,
      text: 'Ajusto meu estilo de treinamento de acordo com a necessidade de cada atleta ou situação de competição.',
      invert: false,/*10 */
    },
    {
      category: QUESTIONNAIRES_CATEGORIES.COACH_ATHLETE_RELATIONSHIP,
      text: ' Adoto uma postura amigável e motivadora nos treinos e competições.',
      invert: false,/*11 */
    },
    {
      category: QUESTIONNAIRES_CATEGORIES.COMMUNICATION,
      text: 'Utilizo feedback verbal e não verbal para incentivar o/a(s) atleta(s).',
      invert: false,/*12 */
    },
    {
      category: QUESTIONNAIRES_CATEGORIES.COMMUNICATION,
      text: 'Tenho dificuldade em comunicar as prioridades do treinamento ao/a(s) atleta(s). ',
      invert: true,/*13 */
    },
    {
      category: QUESTIONNAIRES_CATEGORIES.COACH_ATHLETE_RELATIONSHIP,
      text: 'Construo uma relação de confiança com meu/minha(s) atletas, individualmente e em grupo.',
      invert: false,/*14 */
    },
    {
      category: QUESTIONNAIRES_CATEGORIES.LEADERSHIP,
      text: 'Sou flexível para adaptar os planos de treino quando surgem situações inesperadas.',
      invert: false,/*15 */
    },
    {
      category: QUESTIONNAIRES_CATEGORIES.LEADERSHIP,
      text: 'Parabenizo publicamente o/a(s) atleta(s) por boas atuações e contribuições ao time.',
      invert: false,/*16 */
    },
    {
      category: QUESTIONNAIRES_CATEGORIES.COMMUNICATION,
      text: 'Dou orientações claras sobre como corrigir erros técnicos ou táticos.',
      invert: false,/*17 */
    },    
    {
      category: QUESTIONNAIRES_CATEGORIES.COACH_ATHLETE_RELATIONSHIP,
      text: 'Estou atento(a) ao bem-estar físico e emocional do/a(s) atleta(s).',
      invert: false,/*18 */
    },

    
    {
      category: QUESTIONNAIRES_CATEGORIES.LEADERSHIP,
      text: 'Tenho dificuldade em engajar o/a(s) atleta(s) no planejamento das estratégias.',
      invert: false,/*19 */
    },
    {
      category: QUESTIONNAIRES_CATEGORIES.LEADERSHIP,
      text: 'Estimulo o/a(s) atleta(s) a participarem comigo do planejamento e definição de estratégias para competições.',
      invert: false,/*20 */
    },
  ],
  [FORMS.EMOTIONAL_REGULATION]: [
    {
      category: QUESTIONNAIRES_CATEGORIES.SELF_CONFIDENCE_AND_SELF_EFFICACY,
      text: 'Eu confio na minha capacidade de manter a calma e agir de maneira adequada quando a situação exige.',
      invert: false,/*1*/
    },
    {
      category: QUESTIONNAIRES_CATEGORIES.SELF_CONFIDENCE_AND_SELF_EFFICACY,
      text: 'Eu sou capaz de me recuperar rapidamente de falhas ou erros no campo de jogo. ',
      invert: false,/*2*/
    },
    {
      category: QUESTIONNAIRES_CATEGORIES.SELF_CONFIDENCE_AND_SELF_EFFICACY,
      text: 'Eu sempre encontro uma maneira de resolver problemas inesperados, independentemente das circunstâncias.',
      invert: false,/*3*/
    },
    {
      category: QUESTIONNAIRES_CATEGORIES.STRESS,
      text: 'Eu sou bom(boa) em encontrar soluções práticas para lidar com a pressão durante o jogo.',
      invert: false,/*4*/
    },
    {
      category: QUESTIONNAIRES_CATEGORIES.SELF_CONFIDENCE_AND_SELF_EFFICACY,
      text: 'Eu sou eficaz em resolver qualquer problema que surge, mesmo que complexo.',
      invert: false,/*5*/
    },
    {
      category: QUESTIONNAIRES_CATEGORIES.RESILIENCE,
      text: 'Eu permaneço confiante nas minhas capacidades, mesmo em tempos difíceis. ',
      invert: false,/*6*/
    },
    {
      category: QUESTIONNAIRES_CATEGORIES.RESILIENCE,
      text: 'Quando enfrento um grande desafio no esporte, sinto que tenho controle emocional. ',
      invert: false,/*7*/
    },
    {
      category: QUESTIONNAIRES_CATEGORIES.RESILIENCE,
      text: 'Quando a pressão é alta, sinto que perco o controle emocional. ',
      invert: true,/*8*/
    },
    {
      category: QUESTIONNAIRES_CATEGORIES.SELF_CONFIDENCE_AND_SELF_EFFICACY,
      text: 'Eu acredito nas minhas habilidades para gerenciar situações inesperadas durante as competições.',
      invert: false,/*9*/
    },
    {
      category: QUESTIONNAIRES_CATEGORIES.STRESS,
      text: 'Sinto que meu estresse tem impacto negativo na minha tomada de decisões. ',
      invert: true,/*10*/
    },
    {
      category: QUESTIONNAIRES_CATEGORIES.POSITIVE_MENTAL_HEALTH,
      text: 'No meu dia a dia de trabalho, frequentemente sinto a sensação de pertencimento à minha equipe. ',
      invert: false,/*11*/
    },
    {
      category: QUESTIONNAIRES_CATEGORIES.STRESS,
      text: 'Quando as coisas não saem conforme planejado, eu fico nervoso(a) e inseguro, sem saber como agir. ',
      invert: true,/*12*/
    },
    {
      category: QUESTIONNAIRES_CATEGORIES.SELF_CONFIDENCE_AND_SELF_EFFICACY,
      text: 'Eu tenho confiança na minha capacidade de tomar boas decisões durante os jogos.',
      invert: false,/*13*/
    },
    {
      category: QUESTIONNAIRES_CATEGORIES.SELF_CONFIDENCE_AND_SELF_EFFICACY,
      text: 'Eu sempre consigo resolver os problemas difíceis se eu tentar bastante.',
      invert: false,/*14*/
    },
    {
      category: QUESTIONNAIRES_CATEGORIES.STRESS,
      text: 'Quando estou estressado(a) durante a competição, consigo controlar minha respiração e minhas ações. ',
      invert: false,/*15*/
    },
    {
      category: QUESTIONNAIRES_CATEGORIES.RESILIENCE,
      text: 'Eu consigo me recuperar rapidamente de um erro durante a competição. ',
      invert: false,/*16*/
    },
    {
      category: QUESTIONNAIRES_CATEGORIES.POSITIVE_MENTAL_HEALTH,
      text: 'Eu me sinto feliz e satisfeito(a) com o que estou realizando na minha carreira de treinador(a). ',
      invert: false,/*17*/
    },
    {
      category: QUESTIONNAIRES_CATEGORIES.RESILIENCE,
      text: 'Eu sou capaz de superar qualquer obstáculo que apareça no meu caminho. ',
      invert: false,/*18*/
    },
    {
      category: QUESTIONNAIRES_CATEGORIES.SELF_CONFIDENCE_AND_SELF_EFFICACY,
      text: 'Quando estou diante de um desafio, sei como dar o meu melhor para superá-lo.',
      invert: false,/*19*/
    },
    {
      category: QUESTIONNAIRES_CATEGORIES.POSITIVE_MENTAL_HEALTH,
      text: 'Eu sinto que minha saúde emocional é mantida de maneira adequada e saudável ao longo do tempo. ',
      invert: false,/*20*/
    },
    {
      category: QUESTIONNAIRES_CATEGORIES.SELF_CONFIDENCE_AND_SELF_EFFICACY,
      text: 'Tenho a certeza de que consigo atingir os objetivos que estabeleci para mim e para minha equipe.',
      invert: false,/*21*/
    },
    {
      category: QUESTIONNAIRES_CATEGORIES.SELF_CONFIDENCE_AND_SELF_EFFICACY,
      text: 'Eu sou capaz de lidar eficazmente com crises durante a competição.',
      invert: false,/*22*/
    },
    {
      category: QUESTIONNAIRES_CATEGORIES.RESILIENCE,
      text: 'Eu permaneço calmo(a) e organizado(a) sob pressão.',
      invert: false,/*23*/
    },
    {
      category: QUESTIONNAIRES_CATEGORIES.POSITIVE_MENTAL_HEALTH,
      text: 'Sinto que contribuo de forma positiva para o desenvolvimento e o sucesso do/a(s) meu/mminha(s) atleta(s). ',
      invert: false,/*24*/
    },
    {
      category: QUESTIONNAIRES_CATEGORIES.SELF_CONFIDENCE_AND_SELF_EFFICACY,
      text: 'Quando eu enfrento uma situação difícil, estou seguro(a) de que tomarei a melhor decisão.',
      invert: false,/*25*/
    },
    {
      category: QUESTIONNAIRES_CATEGORIES.STRESS,
      text: 'Eu me sinto constantemente sobrecarregado(a) pelas demandas da competição. ',
      invert: true,/*26*/
    },
    {
      category: QUESTIONNAIRES_CATEGORIES.RESILIENCE,
      text: 'Eu confio no meu desempenho durante os treinos.',
      invert: false,/*27*/
    },
    {
      category: QUESTIONNAIRES_CATEGORIES.RESILIENCE,
      text: 'Eu sou resiliente diante das adversidades que o esporte traz.',
      invert: false,/*28*/
    },
    {
      category: QUESTIONNAIRES_CATEGORIES.SELF_CONFIDENCE_AND_SELF_EFFICACY,
      text: 'Eu tenho a habilidade de lidar bem com situações de estresse.',
      invert: false,/*29*/
    },
    {
      category: QUESTIONNAIRES_CATEGORIES.POSITIVE_MENTAL_HEALTH,
      text: 'Muitas vezes me pego tendo pensamentos negativos sobre minha carreira de treinador(a). ',
      invert: true,/*30*/
    },
  ],
});

export const COACH_PAGE = 'coach/';

export const PREVIOUS_PAGE = Object.freeze({
  [FORMS.INTERPERSONAL_RELATIONSHIP]: `questionnaires/${FORMS.ATTITUDE}/`,
  [FORMS.EMOTIONAL_REGULATION]: `questionnaires/${FORMS.INTERPERSONAL_RELATIONSHIP}/`,
});

export const NEXT_PAGE = Object.freeze({
  [FORMS.ATTITUDE]: `questionnaires/${FORMS.INTERPERSONAL_RELATIONSHIP}/`,
  [FORMS.INTERPERSONAL_RELATIONSHIP]: `questionnaires/${FORMS.EMOTIONAL_REGULATION}/`,
  [FORMS.EMOTIONAL_REGULATION]: COACH_PAGE,
});
