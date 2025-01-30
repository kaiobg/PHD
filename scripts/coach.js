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

  window.location = `${BASE_URL}questionnaires/${currentStep}/`;
});

const getFormData = async (form) => {
  const userResultSnap = await firebaseService.form.getUserLatestResult(form);
  const { general: generalUserResult, ...userResultNormalized } = userResultSnap.empty ? null : userResultSnap.data();
  const formAvg = await firebaseService.form.getGeneralFormCategoriesAverage(form);
  const { general, ...normalizedFormAvg } = formAvg;
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

  const series = categoriesData.keys.reduce((acc, cur) => {
    const categoryAverage = normalizedFormAvg[cur]?.avg;
    const hasCategoryAvg = categoryAverage != null;

    return [
      {
        name: 'Média Geral',
        data: [
          ...(acc[0]?.data || []),
          categoryAverage || 0,
        ],
      },
      {
        name: 'Sua Nota',
        data: [
          ...(acc[1]?.data || []),
          hasCategoryAvg ? userResultNormalized[cur] : 0,
        ],
      },
    ];
  }, []);

  return {
    categories: categoriesData.names,
    series,
    formAvg: {
      general: general.avg,
      user: generalUserResult,
    },
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

const initBarChat = (graph, data) => {
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

const initAttitudeGraph = async () => {
  const { categories, series, formAvg } = await getFormData(FORMS.ATTITUDE);
  const title = 'Atitude';

  initBarChat('attitude-chart-container', {
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
  const { categories, series, formAvg } = await getFormData(FORMS.INTERPERSONAL_RELATIONSHIP);
  const title = 'Relação Interpessoal';

  initPolarChart('interpersonal-relationship-chart-container', {
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
  const { categories, series, formAvg } = await getFormData(FORMS.EMOTIONAL_REGULATION);
  const title = 'Regulação Emocional';

  initPolarChart('emotional-regulation-chart-container', {
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

  document.querySelector('#coach-name').innerText = firebaseService.user.getUserData('name');

  if(!hasAnswerForAllForms) {
    document.querySelector('#first-access').classList.remove('display-none');
    return;
  }

  document.querySelector('#interface').classList.remove('display-none');

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
        },
        {
          name: 'Sua Nota',
          data: [
            ...(acc.series[1]?.data || []),
            cur.user,
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

document.getElementById('logout-btn')?.addEventListener('click', async () => {
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
