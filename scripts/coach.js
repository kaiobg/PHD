import '../styles/global.css'; // DO NOT REMOVE THIS
import '../styles/coach.css'; // DO NOT REMOVE THIS

import Highcharts from 'highcharts'; // Don't remove this
import 'highcharts/modules/accessibility';
import HighchartsMore from 'highcharts/highcharts-more';

import './main'; // DO NOT REMOVE THIS

import { firebaseService, notification } from '../services';
import { CATEGORIES_NAME_MAPPER, FORMS, QUESTIONNAIRES_CATEGORIES } from './constants';
import { utils } from '../utils';

let attitudeData, irData, erData;

const filterForm = document.querySelector('#charts-filter');

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

  window.location = `${BASE_URL}questionnaires/${currentStep}/`;
});

const getFormData = async (form) => {
  const userResultSnap = await firebaseService.form.getUserLatestResult(form);
  const userResults = userResultSnap.empty ? null : userResultSnap.data();
  const formResults = await firebaseService.form.getGeneralFormResults(form);
  
  return { userResults, formResults };
};

const processGeneralFormAverage = (formResults) => {
  const filterData = new FormData(filterForm);
  const criteria = filterData.getAll('criteria');

  const result = formResults.reduce((acc, docData) => {
    const keys = Object.keys(docData);
    const categories = keys.reduce((accKeys, curKey) => {
      if(![...Object.values(QUESTIONNAIRES_CATEGORIES), 'general'].includes(curKey)) {
        return accKeys;
      }

      const matchExperienceFilter = !criteria.includes('experience') || (criteria.includes('experience') && firebaseService.user.getUserData('experience') == docData.experience);
      const matchGenderFilter = !criteria.includes('gender') || (criteria.includes('gender') && firebaseService.user.getUserData('gender') == docData.gender);
      const matchModalityFilter = !criteria.includes('modality') || (criteria.includes('modality') && firebaseService.user.getUserData('modality') == docData.modality);

      const matchFilterCriteria = matchExperienceFilter && matchGenderFilter && matchModalityFilter;

      const totalSum = (acc[curKey]?.sum || 0) + (matchFilterCriteria ? docData[curKey] : 0);
      const totalCount = (acc[curKey]?.count || 0) + (matchFilterCriteria ? 1 : 0);
      
      return {
        ...accKeys,
        [curKey]: {
          sum: totalSum,
          count: totalCount,
          avg: totalSum / totalCount,
        },
      };
    }, {});

    return {
      ...acc,
      ...categories,
    };
  }, {});

  return result;
};

const processFormData = (data) => {
  const { userResults, formResults } = data;

  if(!userResults) {
    return;
  }

  const formAvg = processGeneralFormAverage(formResults);

  const { general: generalFormAvg, ...normalizedFormAvg } = formAvg;
  const { general: generalUserResult, ...userResultNormalized } = userResults;

  const categoriesData = Object.keys(normalizedFormAvg).reduce((acc, cur) => {
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
        normalizedFormAvg[cur].avg,
      ],
    };
  }, { 
    keys: [],
    names: [],
    avgs: [],
  });

  const filterData = new FormData(filterForm);
  const compareWithOthers = filterData.getAll('compare').length > 0;

  const series = categoriesData.keys.reduce((acc, cur) => {
    const categoryAverage = normalizedFormAvg[cur]?.avg;
    const hasCategoryAvg = categoryAverage != null;

    return [
      ...(compareWithOthers ? [{
        name: 'Média Geral',
        data: [
          ...(acc[0]?.data || []),
          categoryAverage || 0,
        ],
      }] : []),
      {
        name: 'Sua Nota',
        data: [
          ...(acc[compareWithOthers ? 1 : 0]?.data || []),
          hasCategoryAvg ? userResultNormalized[cur] : 0,
        ],
      },
    ];
  }, []);

  return {
    categories: categoriesData.names,
    series,
    generalFormAvg,
    generalUserResult,
  };
};

const initPolarChart = (graph, data) => {
  // Example: https://www.highcharts.com/demo/highcharts/polar-spider
  const { title, categories, series } = data;

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
      '{point.y:,.2f}</b><br/>'
    },
    
    legend: {
      align: 'center',
      verticalAlign: 'bottom',
      layout: 'horizontal'
    },
    
    series: series.map(serie => ({
      ...serie, 
      pointPlacement: 'on',
    })),
    
    responsive: {
      rules: [{
        condition: {
          maxWidth: 400
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

const initBarChart = (graph, data) => {
  // Example: https://www.highcharts.com/demo/highcharts/bar-chart
  const { title, categories, series } = data;

  Highcharts.chart(graph, {
    chart: {
        type: 'bar'
    },
    accessibility: {
      description: 'Gráfico com a comparação dos seus resultado com a média das pessoas',
    },
    title: {
        text: title,
    },
    xAxis: {
        categories,
        title: {
            text: null
        },
        gridLineWidth: 1,
        lineWidth: 0
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Resultados',
            align: 'high'
        },
        labels: {
            overflow: 'justify'
        },
        gridLineWidth: 0
    },
    tooltip: {
      shared: true,
      pointFormat: '<span style="color:{series.color}">{series.name}: <b>' +
      '{point.y:,.2f}</b><br/>'
    },
    plotOptions: {
      bar: {
          borderRadius: '50%',
          dataLabels: {
              enabled: true
          },
          groupPadding: 0.1,
      },
      series: {
        dataLabels: {
          enabled: true,
          formatter: function () {
            return Highcharts.numberFormat(this.y, 2);
          }
        }
      }
    },
    legend: {
      align: 'center',
      verticalAlign: 'bottom',
      layout: 'horizontal'
    },
    credits: {
        enabled: false
    },
    series,
  });
};

const initAttitudeGraph = async (data) => {
  const { categories, series, generalFormAvg, generalUserResult } = await processFormData(data);
  const title = 'Atitude';

  initBarChart('attitude-chart-container', {
    title,
    categories,
    series,
  });

  return {
    title,
    generalFormAvg,
    generalUserResult,
  };
};

const initInterpersonalRelationshipGraph = async (data) => {
  const { categories, series, generalFormAvg, generalUserResult } = await processFormData(data);
  const title = 'Relação Interpessoal';

  initPolarChart('interpersonal-relationship-chart-container', {
    title,
    categories,
    series,
  });

  return {
    title,
    generalFormAvg,
    generalUserResult,
  };
};

const initEmotionalRegulationGraph = async (data) => {
  const { categories, series, generalFormAvg, generalUserResult } = await processFormData(data);
  const title = 'Regulação Emocional';

  initPolarChart('emotional-regulation-chart-container', {
    title,
    categories,
    series,
  });

  return {
    title,
    generalFormAvg,
    generalUserResult,
  };
};

const addCheckFormAnswerHandler = (formKey, lastResponse) => {
  document.getElementById(`btn-form-${formKey}`).addEventListener('click', async () => {
    const lastResponseDate = new Date(lastResponse);
    const now = new Date();

    const canAnswerForm = utils.isMoreThanThreeMonths(now, lastResponseDate);

    if(canAnswerForm) {
      window.location = `${BASE_URL}questionnaires/${formKey}/?single=true`;
    } else {
      notification.warning('Você precisa esperar 3 meses para responder o formulário novamente');
    }
  });
};

const regenerateCharts = async () => {
  const result = await Promise.all([
    initAttitudeGraph(attitudeData),
    initInterpersonalRelationshipGraph(irData),
    initEmotionalRegulationGraph(erData),
  ]);

  const { userResults: attitudeUserResults } = attitudeData;
  const { userResults: irUserResults } = irData;
  const { userResults: erUserResults } = erData;

  addCheckFormAnswerHandler('attitude', attitudeUserResults.created_at);
  addCheckFormAnswerHandler('interpersonal_relationship', irUserResults.created_at);
  addCheckFormAnswerHandler('emotional_regulation', erUserResults.created_at);

  const filterData = new FormData(filterForm);
  const compareWithOthers = filterData.getAll('compare').length > 0;

  const normalizedResult = result.reduce((acc, cur) => {
    return {
      categories: [
        ...acc.categories,
        cur.title,
      ],
      series: [
        ...(compareWithOthers ? [{
          name: 'Média Geral',
          data: [
            ...(acc.series[0]?.data || []),
            cur.generalFormAvg.avg,
          ],
        }] : []),
        {
          name: 'Sua Nota',
          data: [
            ...(acc.series[compareWithOthers ? 1 : 0]?.data || []),
            cur.generalUserResult,
          ],
        },
      ],
    };
  }, {
    categories: [],
    series: [],
  });

  initPolarChart('general-chart-container', {
    title: 'Geral',
    categories: normalizedResult.categories,
    series: normalizedResult.series,
  });
};

const initPage = async () => {
  const hasAnswerForAllForms = firebaseService.user.getUserData('hasAnswerForAllForms');

  document.querySelector('#coach-name').innerText = firebaseService.user.getUserData('name');

  if(!hasAnswerForAllForms) {
    document.querySelector('#first-access').classList.remove('display-none');
    utils.hideLoading();
    return;
  }

  const results = await Promise.all([
    getFormData(FORMS.ATTITUDE),
    getFormData(FORMS.INTERPERSONAL_RELATIONSHIP),
    getFormData(FORMS.EMOTIONAL_REGULATION),
  ]);

  attitudeData = results[0];
  irData = results[1];
  erData = results[2];

  await regenerateCharts();

  document.querySelector('#interface').classList.remove('display-none');
  filterForm.querySelectorAll('input').forEach(input => {
    input.addEventListener('change', async () => {
      await regenerateCharts();
    });
  });

  utils.hideLoading();
};

document.getElementById('logout-btn').addEventListener('click', async () => {
  await firebaseService.auth.signOut();
  window.location = `${BASE_URL}`;
});

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
