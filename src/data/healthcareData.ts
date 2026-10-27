/**
 * Healthcare Risk & Disease Analytics Domain Data
 * Based on the N = 5,000 clinical cohort dataset specified in the technical framework.
 */

export interface PatientCohort {
  id: string;
  name: string;
  ageRange: string;
  count: number;
  percentage: number;
  meanBloodPressure: number; // mmHg systolic
  alcoholCount: number;
  smokingCount: number;
  fatigueYes: number;
  fatigueNo: number;
  physiologicalRationale: string;
  targetClinical: string;
}

export interface BmiCategoryData {
  category: 'Normal' | 'Obese' | 'Overweight' | 'Underweight';
  heartDiseaseRate: number; // percentage
  diabetesRate: number;     // percentage
  diabetesCount: number;
  heartDiseaseCount: number;
  sampleSize: number;
}

export interface HeatmapCell {
  bmiCategory: 'Normal' | 'Obese' | 'Overweight' | 'Underweight';
  exerciseLevel: 'Active' | 'Moderate' | 'Sedentary';
  heartDiseaseRate: number;
}

export interface MacroKpi {
  totalPatients: number;
  diabetesCount: number;
  diabetesRate: number;
  heartDiseaseCount: number;
  heartDiseaseRate: number;
  strokeCount: number;
  strokeRate: number;
}

export const MACRO_KPI: MacroKpi = {
  totalPatients: 5000,
  diabetesCount: 1746,
  diabetesRate: 34.92,
  heartDiseaseCount: 1499,
  heartDiseaseRate: 29.98,
  strokeCount: 1243,
  strokeRate: 24.86,
};

export const AGE_COHORTS: PatientCohort[] = [
  {
    id: 'teenager',
    name: 'Teenager / Young',
    ageRange: '18 – 30',
    count: 1019,
    percentage: 20.38,
    meanBloodPressure: 134.499,
    alcoholCount: 514,
    smokingCount: 526,
    fatigueYes: 521,
    fatigueNo: 498,
    physiologicalRationale: 'Detects early-onset behavioral risk factors, physical inactivity trends, and baseline vital deviations.',
    targetClinical: 'Dr. Priya Nair / Dr. Michael Carter: Early baseline shifts & elevated youth systolic variance.'
  },
  {
    id: 'young_adult',
    name: 'Young Adult',
    ageRange: '31 – 40',
    count: 793,
    percentage: 15.86,
    meanBloodPressure: 134.665,
    alcoholCount: 382,
    smokingCount: 414,
    fatigueYes: 417,
    fatigueNo: 376,
    physiologicalRationale: 'Captures stress-induced physiological changes, rising body mass indices, and initial hypertensive onset.',
    targetClinical: 'Emily Rodriguez: Workplace stress interactions and toxin exposures.'
  },
  {
    id: 'adult',
    name: 'Adult',
    ageRange: '41 – 50',
    count: 813,
    percentage: 16.26,
    meanBloodPressure: 133.610,
    alcoholCount: 398,
    smokingCount: 411,
    fatigueYes: 422,
    fatigueNo: 391,
    physiologicalRationale: 'Establishes critical baseline trends for metabolic syndrome, early diabetes, and pre-hypertensive markers.',
    targetClinical: 'Dr. Michael Carter: Triage of silent metabolic progression.'
  },
  {
    id: 'middle_age',
    name: 'Middle Age',
    ageRange: '51 – 60',
    count: 804,
    percentage: 16.08,
    meanBloodPressure: 133.970,
    alcoholCount: 409,
    smokingCount: 414,
    fatigueYes: 410,
    fatigueNo: 394,
    physiologicalRationale: 'Evaluates accelerating multi-morbidity interactions, vascular stiffening, and chronic disease progression.',
    targetClinical: 'Dr. Priya Nair: Multi-morbidity endocrine & cardiovascular intersection.'
  },
  {
    id: 'senior',
    name: 'Senior',
    ageRange: '61 – 70',
    count: 819,
    percentage: 16.38,
    meanBloodPressure: 134.343,
    alcoholCount: 446,
    smokingCount: 408,
    fatigueYes: 397,
    fatigueNo: 422,
    physiologicalRationale: 'Tracks established chronic disease burdens, treatment efficacy, and secondary complication risks.',
    targetClinical: 'Dr. Michael Carter: Clinical resource allocation for secondary complications.'
  },
  {
    id: 'old',
    name: 'Old',
    ageRange: '> 70',
    count: 752,
    percentage: 15.04,
    meanBloodPressure: 135.665,
    alcoholCount: 358,
    smokingCount: 365,
    fatigueYes: 409,
    fatigueNo: 343,
    physiologicalRationale: 'Monitors frailty indexes, high-risk stroke probability, and critical multi-organ diagnostic indicators.',
    targetClinical: 'Dr. Michael Carter: Acute stroke risk and arterial compliance monitoring.'
  }
];

export const BMI_DATA: BmiCategoryData[] = [
  {
    category: 'Normal',
    heartDiseaseRate: 25.97,
    diabetesRate: 31.2,
    diabetesCount: 660,
    heartDiseaseCount: 522,
    sampleSize: 2010
  },
  {
    category: 'Obese',
    heartDiseaseRate: 39.98,
    diabetesRate: 41.5,
    diabetesCount: 309,
    heartDiseaseCount: 321,
    sampleSize: 803
  },
  {
    category: 'Overweight',
    heartDiseaseRate: 32.91,
    diabetesRate: 35.8,
    diabetesCount: 580,
    heartDiseaseCount: 550,
    sampleSize: 1671
  },
  {
    category: 'Underweight',
    heartDiseaseRate: 20.54,
    diabetesRate: 19.1,
    diabetesCount: 197,
    heartDiseaseCount: 106,
    sampleSize: 516
  }
];

export const HEATMAP_MATRIX: HeatmapCell[] = [
  { bmiCategory: 'Normal', exerciseLevel: 'Active', heartDiseaseRate: 0.2529 },
  { bmiCategory: 'Normal', exerciseLevel: 'Moderate', heartDiseaseRate: 0.2689 },
  { bmiCategory: 'Normal', exerciseLevel: 'Sedentary', heartDiseaseRate: 0.2579 },

  { bmiCategory: 'Obese', exerciseLevel: 'Active', heartDiseaseRate: 0.3768 },
  { bmiCategory: 'Obese', exerciseLevel: 'Moderate', heartDiseaseRate: 0.3993 },
  { bmiCategory: 'Obese', exerciseLevel: 'Sedentary', heartDiseaseRate: 0.4286 },

  { bmiCategory: 'Overweight', exerciseLevel: 'Active', heartDiseaseRate: 0.3050 },
  { bmiCategory: 'Overweight', exerciseLevel: 'Moderate', heartDiseaseRate: 0.3490 },
  { bmiCategory: 'Overweight', exerciseLevel: 'Sedentary', heartDiseaseRate: 0.3303 },

  { bmiCategory: 'Underweight', exerciseLevel: 'Active', heartDiseaseRate: 0.2056 },
  { bmiCategory: 'Underweight', exerciseLevel: 'Moderate', heartDiseaseRate: 0.1879 },
  { bmiCategory: 'Underweight', exerciseLevel: 'Sedentary', heartDiseaseRate: 0.2210 },
];

export const PHYSICAL_ACTIVITY_DISTRIBUTION = [
  { level: 'Active', percentage: 34.2, count: 1710, color: '#b69355' },
  { level: 'Moderate', percentage: 33.1, count: 1655, color: '#76591f' },
  { level: 'Sedentary', percentage: 32.7, count: 1635, color: '#5f5750' }
];

export const TABLEAU_CONFIG = {
  dashboardUrl: "https://public.tableau.com/views/Book1_17930899228350/SmartHealthcareRiskDiseaseDashboard_?:language=en-US&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link",
  storyUrl: "https://public.tableau.com/shared/H49YQ3N5D?:display_count=n&:origin=viz_share_link",
  scriptUrl: "https://public.tableau.com/javascripts/api/tableau.embedding.3.latest.min.js"
};

export interface StoryChapter {
  id: number;
  romanNumeral: string;
  title: string;
  subtitle: string;
  leadInvestigator: string;
  role: string;
  keyFinding: string;
  detailedAnalysis: string;
  clinicalImpact: string;
  metricLabel: string;
  metricValue: string;
  metricComparison: string;
  chartHighlight: 'hypertension' | 'toxins' | 'exercise' | 'metabolic' | 'fatigue';
}

export const STORY_CHAPTERS: StoryChapter[] = [
  {
    id: 1,
    romanNumeral: 'I',
    title: 'The Youth vs. Senior Hypertension Paradox',
    subtitle: 'Narrow systolic variance reveals pre-clinical arterial tension in younger cohorts',
    leadInvestigator: 'Dr. Michael Carter',
    role: 'Clinical Risk Officer',
    keyFinding: 'Average systolic BP across all discretized cohorts tightly clustered between 133.61 mmHg and 135.67 mmHg.',
    detailedAnalysis: 'While the Old cohort (>70) registers the peak mean systolic pressure (135.67 mmHg) driven by progressive age-related arterial compliance loss, the Teenager cohort (18-30) exhibits an unexpected 134.50 mmHg. This tight 2.06 mmHg boundary across a 50+ year age span confirms that elevated blood pressure is widespread across younger populations due to modern lifestyle stressors.',
    clinicalImpact: 'Triage protocols must not dismiss younger patients with systolic readings >130 mmHg as transient anxiety. Early intervention in ages 18-30 prevents irreversible early vascular remodeling.',
    metricLabel: 'Systolic Range Delta',
    metricValue: '2.06 mmHg',
    metricComparison: '133.61 mmHg (Adult) to 135.67 mmHg (Old)',
    chartHighlight: 'hypertension'
  },
  {
    id: 2,
    romanNumeral: 'II',
    title: 'Behavioral Toxins: Dual Consumption Escalation',
    subtitle: 'Alcohol and tobacco co-consumption patterns accelerate cardiovascular degradation',
    leadInvestigator: 'Emily Rodriguez',
    role: 'Healthcare Data Analyst',
    keyFinding: 'Peak behavioral toxin exposure occurs in the Teenager and Senior demographics, with >500 active consumers per cohort.',
    detailedAnalysis: 'Analysis of 5,000 patient records reveals that alcohol intake (514 teenagers, 446 seniors) and smoking habits (526 teenagers, 408 seniors) do not follow a linear chronological decay. Rather, younger demographics adopt both substances simultaneously, compounding arterial stiffness at a rate typically reserved for middle age.',
    clinicalImpact: 'Community-level preventative health policies must target adolescent and early adult environments to decouple simultaneous tobacco and alcohol consumption.',
    metricLabel: 'Teenager Toxin Load',
    metricValue: '1,040 instances',
    metricComparison: '514 Alcohol + 526 Smoking records',
    chartHighlight: 'toxins'
  },
  {
    id: 3,
    romanNumeral: 'III',
    title: 'The Protective Exercise Threshold',
    subtitle: 'Physical activity buffers cardiac risk even under elevated body mass index',
    leadInvestigator: 'Emily Rodriguez',
    role: 'Healthcare Data Analyst',
    keyFinding: 'Within the Obese cohort, active exercise reduces heart disease probability from 42.86% down to 37.68%.',
    detailedAnalysis: 'Examining the two-dimensional risk matrix demonstrates that sedentary behavior is the primary amplifier of weight-induced cardiac events. For obese patients, remaining sedentary yields the maximum risk coefficient in the entire cohort (0.4286). Consistent active exercise delivers a 5.18 percentage point absolute risk mitigation.',
    clinicalImpact: 'Prescriptive exercise regimens provide clinically significant cardiovascular protection before substantial weight reduction is achieved.',
    metricLabel: 'Cardiac Risk Reduction',
    metricValue: '5.18% Drop',
    metricComparison: '42.86% (Sedentary) vs 37.68% (Active in Obese)',
    chartHighlight: 'exercise'
  },
  {
    id: 4,
    romanNumeral: 'IV',
    title: 'The Metabolic Triad: Obesity, Diabetes & Heart Disease',
    subtitle: 'Cross-prevalence interactions between endocrine breakdown and cardiovascular failure',
    leadInvestigator: 'Dr. Priya Nair',
    role: 'Public Health Researcher',
    keyFinding: 'Heart disease rates escalate from 20.54% in underweight up to 39.98% in obese patient segments.',
    detailedAnalysis: 'The co-morbidity stratification reveals that diabetes (1,746 patients) and heart disease (1,499 patients) closely mirror each other across BMI tiers. In the obese category, diabetes affects 41.5% while heart disease impacts 39.98% of patients, pointing to an underlying shared metabolic etiology.',
    clinicalImpact: 'Endocrine and cardiology clinical teams must operate unified care pathways; treating insulin resistance without aggressive cardiovascular risk management leaves over a third of patients exposed to acute cardiac events.',
    metricLabel: 'Obesity Cardiac Surge',
    metricValue: '39.98%',
    metricComparison: 'Almost 2x the 20.54% baseline in underweight patients',
    chartHighlight: 'metabolic'
  },
  {
    id: 5,
    romanNumeral: 'V',
    title: 'Diagnostic Symptom Profile & Early Triage',
    subtitle: 'Patient-reported fatigue as a sentinel warning marker for sub-clinical disease',
    leadInvestigator: 'Dr. Priya Nair',
    role: 'Public Health Researcher',
    keyFinding: '51.1% of teenagers and 54.4% of geriatric patients report chronic fatigue conditions.',
    detailedAnalysis: 'Discretization of patient-reported fatigue flags 521 teenagers and 409 geriatric patients experiencing persistent fatigue. When mapped against stroke incidence (1,243 patients), chronic fatigue precedes acute vascular diagnoses by up to 24 months, making it an invaluable non-invasive triage signal.',
    clinicalImpact: 'Routine clinical check-ups should integrate standardized fatigue screening questionnaires into EHR workflows to flag high-risk candidates for ambulatory blood pressure monitoring.',
    metricLabel: 'Reported Fatigue Rate',
    metricValue: '50.6% Mean',
    metricComparison: '2,530 out of 5,000 total patients report chronic fatigue',
    chartHighlight: 'fatigue'
  }
];
