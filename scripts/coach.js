import '../styles/global.css'; // DO NOT REMOVE THIS
import '../styles/coach.css'; // DO NOT REMOVE THIS

import Highcharts from 'highcharts'; // Don't remove this
import 'highcharts/modules/accessibility';
import HighchartsMore from 'highcharts/highcharts-more';

import './main'; // DO NOT REMOVE THIS

import { firebaseService } from '../services';
import { CATEGORIES_NAME_MAPPER, FORMS, QUESTIONNAIRES_CATEGORIES } from './constants';

document.querySelector('#btn-all-forms').addEventListener('click', async () => {
  const step = await firebaseService.form.getUserCurrentFormStep();
  let currentStep = '';

  switch(step) {
    case 1:
      currentStep = FORMS.INTERPERSONAL_RELATIONSHIP;
      break;
    case 2:
      currentStep = FORMS.EMOTIONAL_REGULATION;
      break;
    default:
      currentStep = FORMS.ATTITUDE;
      break;
  }

  window.location = `/questionnaires/${currentStep}/`;
});

const getFormData = async (form, addFakeCategory = false) => {
  const userResultSnap = await firebaseService.form.getUserLatestResult(form);
  const userResult = userResultSnap.empty ? null : userResultSnap.data();
  const formAvg = await firebaseService.form.getGeneralFormCategoriesAverage(form);
  const categoriesData = Object.keys(formAvg).reduce((acc, cur) => {
    return {
      ...acc,
      keys: [
        ...acc.keys,
        cur,
      ],
      names: [
        ...acc.names,
        CATEGORIES_NAME_MAPPER[cur],
      ],
      avgs: [
        ...acc.avgs,
        formAvg[cur].avg,
      ],
    };
  }, { 
    keys: addFakeCategory ? [''] : [],
    names: addFakeCategory ? [''] : [],
    avgs: addFakeCategory ? [] : [],
  });

  const series = categoriesData.keys.reduce((acc, cur) => {
    const categoryAverage = formAvg[cur]?.avg;
    const hasCategoryAvg = categoryAverage != null;

    return [
      {
        name: 'Média Geral',
        data: [
          ...(acc[0]?.data || []),
          categoryAverage || 0,
        ],
        pointPlacement: 'on',
      },
      {
        name: 'Sua Nota',
        data: [
          ...(acc[1]?.data || []),
          hasCategoryAvg ? userResult[cur] : 0,
        ],
        pointPlacement: 'on',
      },
    ];
  }, []);

  const userFormAvg = Object.keys(userResult).reduce((acc, key) => {
    if(!Object.values(QUESTIONNAIRES_CATEGORIES).includes(key)) {
      return acc;
    }
    return acc + userResult[key];
  }, 0) / Object.values(userResult).length;

  return {
    categories: categoriesData.names,
    series,
    userResult,
    formAvg: {
      general: categoriesData.avgs.reduce((acc, cur) => acc + cur) / categoriesData.avgs.length,
      user: userFormAvg,
    },
  };
};

const initGraph = (graph, data) => {
  const { title, categories, series } = data;
   // Example: https://www.highcharts.com/demo/highcharts/polar-spider

   HighchartsMore.chart(graph, {
    
    chart: {
      polar: true,
    },
    
    accessibility: {
      description: 'Gráfico com a comparação dos seus resultado com a média das pessoas',
    },
    
    title: {
      text: title,
      x: 0,
    },
    
    pane: {
      size: '80%'
    },
    
    xAxis: {
      categories,
      tickmarkPlacement: 'on',
      lineWidth: 0
    },
    
    yAxis: {
      gridLineInterpolation: 'polygon',
      lineWidth: 0,
      min: 0
    },
    
    tooltip: {
      shared: true,
      pointFormat: '<span style="color:{series.color}">{series.name}: <b>' +
      '{point.y}</b><br/>'
    },
    
    legend: {
      align: 'center',
      verticalAlign: 'bottom',
      layout: 'horizontal'
    },
    
    series,
    
    responsive: {
      rules: [{
        condition: {
          maxWidth: 500
        },
        chartOptions: {
          title: {
            x: 0
          },
          legend: {
            align: 'center',
            verticalAlign: 'bottom',
            layout: 'horizontal'
          },
          pane: {
            size: '70%'
          }
        }
      }],
    },  
  });  
};

const initAttitudeGraph = async () => {
  const { categories, series, formAvg } = await getFormData(FORMS.ATTITUDE, true);
  const title = 'Atitude';

  initGraph('attitude-chart-container', {
    title,
    categories,
    series,
  });

  return {
    title,
    ...formAvg,
  };
};

const initInterpersonalRelationshipGraph = async () => {
  const { categories, series, formAvg } = await getFormData(FORMS.INTERPERSONAL_RELATIONSHIP, true);
  const title = 'Relação Interpessoal';

  initGraph('interpersonal-relationship-chart-container', {
    title,
    categories,
    series,
  });

  return {
    title,
    ...formAvg,
  };
};

const initEmotionalRegulationGraph = async () => {
  const { categories, series, formAvg } = await getFormData(FORMS.EMOTIONAL_REGULATION, true);
  const title = 'Regulação Emocional';

  initGraph('emotional-regulation-chart-container', {
    title,
    categories,
    series,
  });

  return {
    title,
    ...formAvg,
  };
};

const initPage = async () => {
  const hasAnswerForAllForms = firebaseService.user.getUserData('hasAnswerForAllForms');

  if(!hasAnswerForAllForms) {
    document.querySelector('#first-access').classList.remove('display-none');
    return;
  }

  document.querySelector('#interface').classList.remove('display-none');

  document.getElementById("logout-btn")?.addEventListener("click",()=>{
    firebaseService.auth.signOut()
  });

  const result = await Promise.all([
    initAttitudeGraph(),
    initInterpersonalRelationshipGraph(),
    initEmotionalRegulationGraph(),
  ]);

  const normalizedResult = result.reduce((acc, cur) => {
    return {
      categories: [
        ...acc.categories,
        cur.title,
      ],
      series: [
        {
          name: 'Média Geral',
          data: [
            ...(acc.series[0]?.data || []),
            cur.general,
          ],
          pointPlacement: 'on',
        },
        {
          name: 'Sua Nota',
          data: [
            ...(acc.series[1]?.data || []),
            cur.user,
          ],
          pointPlacement: 'on',
        },
      ],
    };
  }, {
    categories: [],
    series: [],
  });

  initGraph('general-chart-container', {
    title: 'Geral',
    categories: normalizedResult.categories,
    series: normalizedResult.series,
  });
};

firebaseService.auth.addAuthStateListener(async (user) => {
  if(user) {
    const waitLoadUserData = setInterval(() => {
      if(firebaseService.user.hasUserData()) {
        clearInterval(waitLoadUserData);
        initPage();
      }
    }, 100);
  }
});
