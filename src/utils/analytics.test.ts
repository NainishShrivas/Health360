import test from 'node:test';
import assert from 'node:assert/strict';
import {
  filterCohorts,
  filterBmiData,
  getComputedKpis,
  calculateWeightedSystolicBP,
  getHeatmapCellRisk,
  formatPercent,
  formatNumber,
  generateCsvReport
} from './analytics';
import { AGE_COHORTS, BMI_DATA, HEATMAP_MATRIX, MACRO_KPI } from '../data/healthcareData';

test('MACRO_KPI total matches N = 5,000 patient records', () => {
  assert.equal(MACRO_KPI.totalPatients, 5000);
  assert.equal(MACRO_KPI.diabetesCount, 1746);
  assert.equal(MACRO_KPI.heartDiseaseCount, 1499);
  assert.equal(MACRO_KPI.strokeCount, 1243);
});

test('AGE_COHORTS sum up to 5,000 patients and 100% distribution', () => {
  const totalCount = AGE_COHORTS.reduce((sum, c) => sum + c.count, 0);
  const totalPercent = AGE_COHORTS.reduce((sum, c) => sum + c.percentage, 0);
  assert.equal(totalCount, 5000);
  assert.ok(Math.abs(totalPercent - 100) < 0.1, `Total percent was ${totalPercent}`);
});

test('filterCohorts filters correctly by id', () => {
  const all = filterCohorts(AGE_COHORTS, 'all');
  assert.equal(all.length, 6);

  const teenager = filterCohorts(AGE_COHORTS, 'teenager');
  assert.equal(teenager.length, 1);
  assert.equal(teenager[0].name, 'Teenager / Young');
});

test('filterBmiData filters by category', () => {
  const allBmi = filterBmiData(BMI_DATA, 'All');
  assert.equal(allBmi.length, 4);

  const obese = filterBmiData(BMI_DATA, 'Obese');
  assert.equal(obese.length, 1);
  assert.equal(obese[0].heartDiseaseRate, 39.98);
});

test('getComputedKpis returns macro values when all filters are default', () => {
  const kpis = getComputedKpis({
    bmiCategory: 'All',
    selectedCohortId: 'all',
    exerciseLevel: 'All',
  });
  assert.equal(kpis.totalPatients, 5000);
  assert.equal(kpis.diabetesCount, 1746);
  assert.equal(kpis.heartDiseaseCount, 1499);
});

test('calculateWeightedSystolicBP computes accurate weighted mean', () => {
  const weightedBp = calculateWeightedSystolicBP(AGE_COHORTS);
  assert.ok(weightedBp >= 133.61 && weightedBp <= 135.67, `Weighted BP ${weightedBp} within expected clinical bounds`);
});

test('getHeatmapCellRisk retrieves matrix cell correctly', () => {
  const risk = getHeatmapCellRisk(HEATMAP_MATRIX, 'Obese', 'Sedentary');
  assert.equal(risk, 0.4286);

  const activeRisk = getHeatmapCellRisk(HEATMAP_MATRIX, 'Obese', 'Active');
  assert.equal(activeRisk, 0.3768);
  assert.ok(risk > activeRisk, 'Sedentary risk must be higher than active risk');
});

test('generateCsvReport generates valid CSV content with headers and rows', () => {
  const csv = generateCsvReport(AGE_COHORTS, BMI_DATA);
  assert.ok(csv.includes('Cohort,Age_Range,Patients'));
  assert.ok(csv.includes('Teenager / Young'));
  assert.ok(csv.includes('BMI_Category,Heart_Disease_Rate'));
});
