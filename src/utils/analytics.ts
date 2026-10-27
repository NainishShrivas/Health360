import {
  AGE_COHORTS,
  BMI_DATA,
  HEATMAP_MATRIX,
  MACRO_KPI,
  PatientCohort,
  BmiCategoryData,
  HeatmapCell,
  MacroKpi
} from '../data/healthcareData';

export interface FilterState {
  bmiCategory: 'All' | 'Normal' | 'Obese' | 'Overweight' | 'Underweight';
  selectedCohortId: string; // 'all' or cohort id
  exerciseLevel: 'All' | 'Active' | 'Moderate' | 'Sedentary';
}

export function filterCohorts(
  cohorts: PatientCohort[],
  cohortId: string
): PatientCohort[] {
  if (cohortId === 'all') return cohorts;
  return cohorts.filter((c) => c.id === cohortId);
}

export function filterBmiData(
  bmiList: BmiCategoryData[],
  selectedCategory: FilterState['bmiCategory']
): BmiCategoryData[] {
  if (selectedCategory === 'All') return bmiList;
  return bmiList.filter((b) => b.category === selectedCategory);
}

export function getComputedKpis(
  filters: FilterState
): {
  totalPatients: number;
  diabetesCount: number;
  heartDiseaseCount: number;
  strokeCount: number;
  diabetesRate: number;
  heartDiseaseRate: number;
  strokeRate: number;
} {
  // If no filters are applied, return exact macro KPIs
  if (
    filters.bmiCategory === 'All' &&
    filters.selectedCohortId === 'all' &&
    filters.exerciseLevel === 'All'
  ) {
    return {
      totalPatients: MACRO_KPI.totalPatients,
      diabetesCount: MACRO_KPI.diabetesCount,
      heartDiseaseCount: MACRO_KPI.heartDiseaseCount,
      strokeCount: MACRO_KPI.strokeCount,
      diabetesRate: MACRO_KPI.diabetesRate,
      heartDiseaseRate: MACRO_KPI.heartDiseaseRate,
      strokeRate: MACRO_KPI.strokeRate,
    };
  }

  // Calculate filtered projections
  let patientMultiplier = 1;
  let heartDiseaseRate = MACRO_KPI.heartDiseaseRate;
  let diabetesRate = MACRO_KPI.diabetesRate;

  if (filters.bmiCategory !== 'All') {
    const bmiMatch = BMI_DATA.find((b) => b.category === filters.bmiCategory);
    if (bmiMatch) {
      patientMultiplier *= bmiMatch.sampleSize / MACRO_KPI.totalPatients;
      heartDiseaseRate = bmiMatch.heartDiseaseRate;
      diabetesRate = bmiMatch.diabetesRate;
    }
  }

  if (filters.selectedCohortId !== 'all') {
    const cohort = AGE_COHORTS.find((c) => c.id === filters.selectedCohortId);
    if (cohort) {
      patientMultiplier *= cohort.percentage / 100;
    }
  }

  if (filters.exerciseLevel !== 'All') {
    if (filters.exerciseLevel === 'Active') {
      patientMultiplier *= 0.342;
      heartDiseaseRate *= 0.88; // Exercise protective factor
    } else if (filters.exerciseLevel === 'Moderate') {
      patientMultiplier *= 0.331;
    } else {
      patientMultiplier *= 0.327;
      heartDiseaseRate *= 1.12; // Sedentary risk inflation
    }
  }

  const estimatedPatients = Math.max(25, Math.round(MACRO_KPI.totalPatients * patientMultiplier));
  const estimatedHeartDisease = Math.round((estimatedPatients * heartDiseaseRate) / 100);
  const estimatedDiabetes = Math.round((estimatedPatients * diabetesRate) / 100);
  const estimatedStroke = Math.round((estimatedPatients * MACRO_KPI.strokeRate) / 100);

  return {
    totalPatients: estimatedPatients,
    diabetesCount: estimatedDiabetes,
    heartDiseaseCount: estimatedHeartDisease,
    strokeCount: estimatedStroke,
    diabetesRate: Number(diabetesRate.toFixed(2)),
    heartDiseaseRate: Number(heartDiseaseRate.toFixed(2)),
    strokeRate: Number(MACRO_KPI.strokeRate.toFixed(2)),
  };
}

export function calculateWeightedSystolicBP(cohorts: PatientCohort[]): number {
  if (cohorts.length === 0) return 0;
  const totalCount = cohorts.reduce((acc, c) => acc + c.count, 0);
  const totalPressure = cohorts.reduce((acc, c) => acc + c.meanBloodPressure * c.count, 0);
  return Number((totalPressure / totalCount).toFixed(3));
}

export function getHeatmapCellRisk(
  matrix: HeatmapCell[],
  bmi: 'Normal' | 'Obese' | 'Overweight' | 'Underweight',
  exercise: 'Active' | 'Moderate' | 'Sedentary'
): number {
  const match = matrix.find((c) => c.bmiCategory === bmi && c.exerciseLevel === exercise);
  return match ? match.heartDiseaseRate : 0;
}

export function formatPercent(value: number): string {
  return `${value.toFixed(2)}%`;
}

export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(value);
}

export function generateCsvReport(cohorts: PatientCohort[], bmiData: BmiCategoryData[]): string {
  const header = "Cohort,Age_Range,Patients,Percentage,Systolic_BP_mmHg,Alcohol_Cases,Tobacco_Cases,Fatigue_Yes,Fatigue_No\n";
  const rows = cohorts.map(c => 
    `"${c.name}","${c.ageRange}",${c.count},${c.percentage}%,${c.meanBloodPressure},${c.alcoholCount},${c.smokingCount},${c.fatigueYes},${c.fatigueNo}`
  ).join("\n");
  
  const bmiHeader = "\n\nBMI_Category,Heart_Disease_Rate,Diabetes_Rate,Diabetes_Count,Heart_Disease_Count,Sample_Size\n";
  const bmiRows = bmiData.map(b =>
    `"${b.category}",${b.heartDiseaseRate}%,${b.diabetesRate}%,${b.diabetesCount},${b.heartDiseaseCount},${b.sampleSize}`
  ).join("\n");

  return header + rows + bmiHeader + bmiRows;
}
