import React, { useState, useMemo } from 'react';
import {
  Download,
  Filter,
  RotateCcw,
  UserCheck,
  TrendingUp,
  Activity,
  Heart,
  Droplet,
  Brain,
  Info,
  Maximize2,
  CheckCircle2
} from 'lucide-react';
import {
  AGE_COHORTS,
  BMI_DATA,
  HEATMAP_MATRIX,
  PHYSICAL_ACTIVITY_DISTRIBUTION,
  TABLEAU_CONFIG,
  PatientCohort,
  BmiCategoryData,
  HeatmapCell
} from '../data/healthcareData';
import {
  FilterState,
  getComputedKpis,
  filterCohorts,
  filterBmiData,
  getHeatmapCellRisk,
  formatPercent,
  formatNumber,
  generateCsvReport
} from '../utils/analytics';
import { TableauEmbed } from './TableauEmbed';

interface DashboardViewProps {
  isDedicatedPage?: boolean;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  isDedicatedPage = false,
}) => {
  const [viewMode, setViewMode] = useState<'both' | 'embedded' | 'studio'>('both');
  
  const [filters, setFilters] = useState<FilterState>({
    bmiCategory: 'All',
    selectedCohortId: 'all',
    exerciseLevel: 'All',
  });

  const [activeStakeholder, setActiveStakeholder] = useState<'all' | 'carter' | 'rodriguez' | 'nair'>('all');
  const [hoveredCell, setHoveredCell] = useState<{ label: string; detail: string } | null>(null);

  // Computed data based on filters
  const computedKpis = useMemo(() => getComputedKpis(filters), [filters]);
  const filteredCohorts = useMemo(
    () => filterCohorts(AGE_COHORTS, filters.selectedCohortId),
    [filters.selectedCohortId]
  );
  const filteredBmi = useMemo(
    () => filterBmiData(BMI_DATA, filters.bmiCategory),
    [filters.bmiCategory]
  );

  const handleResetFilters = () => {
    setFilters({
      bmiCategory: 'All',
      selectedCohortId: 'all',
      exerciseLevel: 'All',
    });
  };

  const handleDownloadCsv = () => {
    const csvContent = generateCsvReport(filteredCohorts, filteredBmi);
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Health360_Analytics_Report_${filters.bmiCategory}_${filters.selectedCohortId}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="dashboard" className={`py-12 md:py-20 ${isDedicatedPage ? 'pt-8' : ''}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Margin & Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-8">
          <div className="hidden lg:flex lg:col-span-2 flex-col items-end pr-8 border-r border-[#b69355]/40 select-none">
            <span className="font-serif text-3xl font-normal text-[#76591f] tracking-widest">
              III
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#5f5750] mt-2 text-right">
              Clinical &amp;<br />Operational
            </span>
            <div className="mt-16 w-3 h-px bg-[#b69355]/60"></div>
          </div>

          <div className="lg:col-span-10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#76591f]">
                  Interactive Intelligence
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#262321] mt-1">
                  Dashboard
                </h2>
                <p className="text-sm sm:text-base text-[#5f5750] mt-2 max-w-2xl">
                  Interactive dashboard visualizing our data insights and operational metrics
                </p>
              </div>

              {/* View Switcher Tabs */}
              <div className="flex items-center gap-1 p-1 bg-[#e4dbcc]/60 border border-[#c6b89f] rounded-none sm:rounded-md text-xs font-medium">
                <button
                  onClick={() => setViewMode('both')}
                  className={`px-3 py-1.5 transition-all ${
                    viewMode === 'both'
                      ? 'bg-[#262321] text-[#f3eee4] shadow-xs'
                      : 'text-[#5f5750] hover:text-[#262321]'
                  }`}
                >
                  Dual View
                </button>
                <button
                  onClick={() => setViewMode('studio')}
                  className={`px-3 py-1.5 transition-all ${
                    viewMode === 'studio'
                      ? 'bg-[#262321] text-[#f3eee4] shadow-xs'
                      : 'text-[#5f5750] hover:text-[#262321]'
                  }`}
                >
                  Luxury Studio
                </button>
                <button
                  onClick={() => setViewMode('embedded')}
                  className={`px-3 py-1.5 transition-all ${
                    viewMode === 'embedded'
                      ? 'bg-[#262321] text-[#f3eee4] shadow-xs'
                      : 'text-[#5f5750] hover:text-[#262321]'
                  }`}
                >
                  Tableau Embed
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Live Tableau Embed Container (shown in 'embedded' or 'both' view) */}
        {(viewMode === 'embedded' || viewMode === 'both') && (
          <div className="mb-14">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-[0.18em] font-semibold text-[#76591f]">
                  Live Embed
                </span>
                <span className="text-xs text-[#5f5750]">
                  · SmartHealthcareRiskDiseaseDashboard_
                </span>
              </div>
            </div>
            
            <TableauEmbed
              id="tableauDashboard"
              src={TABLEAU_CONFIG.dashboardUrl}
              title="Smart Healthcare & Risk Factor Analysis Dashboard"
              toolbar="bottom"
              hideTabs={true}
              minHeight="850px"
              shareUrl={TABLEAU_CONFIG.dashboardUrl}
            />
          </div>
        )}

        {/* High-Fidelity Studio Section (shown in 'studio' or 'both' view) */}
        {(viewMode === 'studio' || viewMode === 'both') && (
          <div className="space-y-8">
            
            {/* Filter and Control Bar */}
            <div className="bg-[#fdfbf7] p-4 sm:p-6 border border-[#c6b89f] shadow-[0_4px_20px_-4px_rgba(38,35,33,0.06)]">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                
                {/* Filter Controls matching Screenshot */}
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.14em] font-semibold text-[#76591f]">
                    <Filter className="w-3.5 h-3.5" />
                    <span>Cohort Filters:</span>
                  </div>

                  {/* BMI Category Dropdown */}
                  <div className="flex items-center gap-2">
                    <label htmlFor="bmi-select" className="text-xs text-[#5f5750] font-medium">
                      BMI Category:
                    </label>
                    <select
                      id="bmi-select"
                      value={filters.bmiCategory}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          bmiCategory: e.target.value as FilterState['bmiCategory'],
                        }))
                      }
                      className="bg-[#f3eee4] text-[#262321] text-xs py-1.5 px-3 border border-[#c6b89f] rounded-none focus:outline-hidden focus:border-[#b69355] transition-colors"
                    >
                      <option value="All">(All Categories)</option>
                      <option value="Normal">Normal</option>
                      <option value="Obese">Obese</option>
                      <option value="Overweight">Overweight</option>
                      <option value="Underweight">Underweight</option>
                    </select>
                  </div>

                  {/* Age Group Selector */}
                  <div className="flex items-center gap-2">
                    <label htmlFor="age-select" className="text-xs text-[#5f5750] font-medium">
                      Age Group:
                    </label>
                    <select
                      id="age-select"
                      value={filters.selectedCohortId}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          selectedCohortId: e.target.value,
                        }))
                      }
                      className="bg-[#f3eee4] text-[#262321] text-xs py-1.5 px-3 border border-[#c6b89f] rounded-none focus:outline-hidden focus:border-[#b69355] transition-colors"
                    >
                      <option value="all">All Age Groups (6 Cohorts)</option>
                      {AGE_COHORTS.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name} ({c.ageRange})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Exercise Level Filter */}
                  <div className="flex items-center gap-2">
                    <label htmlFor="exercise-select" className="text-xs text-[#5f5750] font-medium">
                      Exercise:
                    </label>
                    <select
                      id="exercise-select"
                      value={filters.exerciseLevel}
                      onChange={(e) =>
                        setFilters((prev) => ({
                          ...prev,
                          exerciseLevel: e.target.value as FilterState['exerciseLevel'],
                        }))
                      }
                      className="bg-[#f3eee4] text-[#262321] text-xs py-1.5 px-3 border border-[#c6b89f] rounded-none focus:outline-hidden focus:border-[#b69355] transition-colors"
                    >
                      <option value="All">All Levels</option>
                      <option value="Active">Active</option>
                      <option value="Moderate">Moderate</option>
                      <option value="Sedentary">Sedentary</option>
                    </select>
                  </div>
                </div>

                {/* Auxiliary Actions */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleResetFilters}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs uppercase tracking-[0.12em] text-[#5f5750] hover:text-[#262321] transition-colors"
                    title="Reset all filters"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>

                  <button
                    onClick={handleDownloadCsv}
                    className="flex items-center gap-2 px-4 py-2 bg-[#262321] text-[#f3eee4] hover:bg-[#302c29] text-xs uppercase tracking-[0.14em] font-medium border border-[#b69355]/40 transition-all shadow-xs"
                  >
                    <Download className="w-3.5 h-3.5 text-[#d2b071]" />
                    <span>Export CSV</span>
                  </button>
                </div>

              </div>

              {/* Stakeholder Perspective Filter bar */}
              <div className="mt-4 pt-4 border-t border-[#d5cab8] flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex items-center gap-2 text-[#5f5750]">
                  <span className="uppercase tracking-[0.14em] text-[10px] text-[#76591f] font-semibold">
                    Clinical Stakeholder:
                  </span>
                  <button
                    onClick={() => setActiveStakeholder('all')}
                    className={`px-2.5 py-1 transition-colors ${
                      activeStakeholder === 'all'
                        ? 'bg-[#262321] text-[#f3eee4]'
                        : 'text-[#5f5750] hover:text-[#262321]'
                    }`}
                  >
                    All Roles
                  </button>
                  <button
                    onClick={() => setActiveStakeholder('carter')}
                    className={`px-2.5 py-1 transition-colors ${
                      activeStakeholder === 'carter'
                        ? 'bg-[#262321] text-[#f3eee4]'
                        : 'text-[#5f5750] hover:text-[#262321]'
                    }`}
                  >
                    Dr. Carter (Risk Officer)
                  </button>
                  <button
                    onClick={() => setActiveStakeholder('rodriguez')}
                    className={`px-2.5 py-1 transition-colors ${
                      activeStakeholder === 'rodriguez'
                        ? 'bg-[#262321] text-[#f3eee4]'
                        : 'text-[#5f5750] hover:text-[#262321]'
                    }`}
                  >
                    E. Rodriguez (Data Analyst)
                  </button>
                  <button
                    onClick={() => setActiveStakeholder('nair')}
                    className={`px-2.5 py-1 transition-colors ${
                      activeStakeholder === 'nair'
                        ? 'bg-[#262321] text-[#f3eee4]'
                        : 'text-[#5f5750] hover:text-[#262321]'
                    }`}
                  >
                    Dr. Nair (Researcher)
                  </button>
                </div>

                <div className="text-[11px] text-[#76591f]">
                  Active Filter: <span className="font-semibold">{filters.bmiCategory} BMI</span> · <span className="font-semibold">{filters.selectedCohortId === 'all' ? 'All Cohorts' : filters.selectedCohortId}</span>
                </div>
              </div>
            </div>

            {/* Top KPI Metrics Overview (Screenshot 4: 5,000 / 1,746 / 1,499 / 1,243) */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              
              {/* Total Patients */}
              <div className="bg-[#fdfbf7] p-5 border border-[#c6b89f] relative group">
                <div className="flex items-center justify-between text-[#5f5750]">
                  <span className="text-[10px] uppercase tracking-[0.18em] font-semibold text-[#76591f]">
                    Cohort Base
                  </span>
                  <Activity className="w-4 h-4 text-[#b69355]" />
                </div>
                <div className="font-serif text-3xl sm:text-4xl font-normal text-[#262321] mt-2 tabular-nums">
                  {formatNumber(computedKpis.totalPatients)}
                </div>
                <div className="text-xs uppercase tracking-[0.12em] text-[#5f5750] mt-1">
                  Total Patients Evaluated
                </div>
                <div className="mt-3 pt-2 border-t border-[#e4dbcc] text-[11px] text-[#5f5750]">
                  100% Stratified sample
                </div>
              </div>

              {/* Diabetes */}
              <div className="bg-[#fdfbf7] p-5 border border-[#c6b89f] relative group">
                <div className="flex items-center justify-between text-[#5f5750]">
                  <span className="text-[10px] uppercase tracking-[0.18em] font-semibold text-[#76591f]">
                    Endocrine Burden
                  </span>
                  <Droplet className="w-4 h-4 text-[#b69355]" />
                </div>
                <div className="font-serif text-3xl sm:text-4xl font-normal text-[#262321] mt-2 tabular-nums">
                  {formatNumber(computedKpis.diabetesCount)}
                </div>
                <div className="text-xs uppercase tracking-[0.12em] text-[#5f5750] mt-1">
                  Diabetes Mellitus
                </div>
                <div className="mt-3 pt-2 border-t border-[#e4dbcc] text-[11px] text-[#76591f] font-medium">
                  {formatPercent(computedKpis.diabetesRate)} prevalence
                </div>
              </div>

              {/* Heart Disease */}
              <div className="bg-[#fdfbf7] p-5 border border-[#c6b89f] relative group">
                <div className="flex items-center justify-between text-[#5f5750]">
                  <span className="text-[10px] uppercase tracking-[0.18em] font-semibold text-[#76591f]">
                    Cardiovascular Risk
                  </span>
                  <Heart className="w-4 h-4 text-[#b69355]" />
                </div>
                <div className="font-serif text-3xl sm:text-4xl font-normal text-[#262321] mt-2 tabular-nums">
                  {formatNumber(computedKpis.heartDiseaseCount)}
                </div>
                <div className="text-xs uppercase tracking-[0.12em] text-[#5f5750] mt-1">
                  Cardiovascular Disease
                </div>
                <div className="mt-3 pt-2 border-t border-[#e4dbcc] text-[11px] text-[#76591f] font-medium">
                  {formatPercent(computedKpis.heartDiseaseRate)} prevalence
                </div>
              </div>

              {/* Stroke */}
              <div className="bg-[#fdfbf7] p-5 border border-[#c6b89f] relative group">
                <div className="flex items-center justify-between text-[#5f5750]">
                  <span className="text-[10px] uppercase tracking-[0.18em] font-semibold text-[#76591f]">
                    Cerebrovascular Event
                  </span>
                  <Brain className="w-4 h-4 text-[#b69355]" />
                </div>
                <div className="font-serif text-3xl sm:text-4xl font-normal text-[#262321] mt-2 tabular-nums">
                  {formatNumber(computedKpis.strokeCount)}
                </div>
                <div className="text-xs uppercase tracking-[0.12em] text-[#5f5750] mt-1">
                  Ischemic Stroke
                </div>
                <div className="mt-3 pt-2 border-t border-[#e4dbcc] text-[11px] text-[#76591f] font-medium">
                  {formatPercent(computedKpis.strokeRate)} prevalence
                </div>
              </div>

            </div>

            {/* Grid of Analytical Charts matching the Screenshot */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Chart 1: Average Blood Pressure Across Age Groups (Single Bar Chart) */}
              <div className="lg:col-span-6 bg-[#fdfbf7] p-6 border border-[#c6b89f]">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-serif text-lg text-[#262321] font-medium">
                      Average Blood Pressure Across Age Groups
                    </h3>
                    <p className="text-xs text-[#5f5750]">
                      Mean systolic arterial pressure (mmHg) across 6 discretized cohorts
                    </p>
                  </div>
                  <span className="text-[10px] uppercase tracking-[0.14em] text-[#76591f] bg-[#e4dbcc]/60 px-2 py-0.5 font-medium">
                    Stage 1 Range
                  </span>
                </div>

                <div className="mt-6 space-y-3">
                  {filteredCohorts.map((cohort) => {
                    // Normalize bar between 130 and 137 mmHg for visual clarity
                    const minScale = 132;
                    const maxScale = 136.5;
                    const widthPct = Math.min(100, Math.max(10, ((cohort.meanBloodPressure - minScale) / (maxScale - minScale)) * 100));
                    
                    return (
                      <div key={cohort.id} className="group">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="font-medium text-[#262321]">
                            {cohort.name} <span className="text-[#5f5750] font-normal">({cohort.ageRange})</span>
                          </span>
                          <span className="font-mono text-[#76591f] font-semibold tabular-nums">
                            {cohort.meanBloodPressure.toFixed(3)} mmHg
                          </span>
                        </div>
                        <div className="w-full bg-[#e4dbcc]/50 h-5 relative overflow-hidden">
                          <div
                            className="h-full bg-[#b69355] group-hover:bg-[#76591f] transition-all duration-300 relative"
                            style={{ width: `${widthPct}%` }}
                          >
                            <span className="absolute right-1.5 top-0.5 text-[9px] text-[#fdfbf7] font-mono opacity-0 group-hover:opacity-100 transition-opacity">
                              {cohort.meanBloodPressure}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 pt-3 border-t border-[#d5cab8] flex items-center justify-between text-[11px] text-[#5f5750]">
                  <span>Range: 133.610 mmHg (Adult) – 135.665 mmHg (Old)</span>
                  <span className="text-[#76591f] font-medium">Dr. Carter: Youth Arterial Variance</span>
                </div>
              </div>

              {/* Chart 2: Alcohol and Smoking Consumption Across Age Groups */}
              <div className="lg:col-span-6 bg-[#fdfbf7] p-6 border border-[#c6b89f]">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-serif text-lg text-[#262321] font-medium">
                      Alcohol &amp; Smoking Consumption
                    </h3>
                    <p className="text-xs text-[#5f5750]">
                      Substance consumption cases cross-tabulated across cohorts
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 bg-[#b69355]"></span>
                      <span className="text-[11px] text-[#5f5750]">Alcohol</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 bg-[#5f5750]"></span>
                      <span className="text-[11px] text-[#5f5750]">Smoking</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-6 gap-2 items-end h-44 pb-2 border-b border-[#c6b89f]">
                  {AGE_COHORTS.map((c) => {
                    const maxVal = 600;
                    const alcoholHeight = (c.alcoholCount / maxVal) * 100;
                    const smokingHeight = (c.smokingCount / maxVal) * 100;

                    return (
                      <div key={c.id} className="flex flex-col items-center h-full justify-end group">
                        <div className="flex items-end gap-1 w-full justify-center h-full">
                          <div
                            className="w-3 sm:w-4 bg-[#b69355] hover:bg-[#76591f] transition-all relative"
                            style={{ height: `${alcoholHeight}%` }}
                            title={`${c.name} Alcohol: ${c.alcoholCount}`}
                          ></div>
                          <div
                            className="w-3 sm:w-4 bg-[#5f5750] hover:bg-[#262321] transition-all relative"
                            style={{ height: `${smokingHeight}%` }}
                            title={`${c.name} Smoking: ${c.smokingCount}`}
                          ></div>
                        </div>
                        <span className="text-[9px] sm:text-[10px] text-[#262321] font-medium mt-2 truncate w-full text-center">
                          {c.name.split(' ')[0]}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 flex items-center justify-between text-[11px] text-[#5f5750]">
                  <span>Peak Exposure: Teenagers (514 Alcohol / 526 Smoking)</span>
                  <span className="text-[#76591f] font-medium">E. Rodriguez: Behavioral Toxins</span>
                </div>
              </div>

              {/* Chart 3 & 4: Demographic Breakdown (Pie Chart) & Physical Activity (Donut) */}
              <div className="lg:col-span-6 bg-[#fdfbf7] p-6 border border-[#c6b89f]">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="font-serif text-lg text-[#262321] font-medium">
                      Patient Distribution By Age Group
                    </h3>
                    <p className="text-xs text-[#5f5750]">
                      Relative cohort balance across N = 5,000 population
                    </p>
                  </div>
                  <span className="text-xs font-mono text-[#76591f] font-semibold">
                    100.0%
                  </span>
                </div>

                {/* Grid of cohort breakdowns matching the Pie Chart values */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-4">
                  {AGE_COHORTS.map((cohort, idx) => {
                    const colors = ['#b69355', '#76591f', '#5f5750', '#8b6f38', '#302c29', '#a48446'];
                    const color = colors[idx % colors.length];

                    return (
                      <div
                        key={cohort.id}
                        onClick={() =>
                          setFilters((f) => ({
                            ...f,
                            selectedCohortId: f.selectedCohortId === cohort.id ? 'all' : cohort.id,
                          }))
                        }
                        className={`p-3 border cursor-pointer transition-all ${
                          filters.selectedCohortId === cohort.id
                            ? 'border-[#262321] bg-[#e4dbcc]/60 shadow-xs'
                            : 'border-[#c6b89f]/60 bg-[#f3eee4]/40 hover:border-[#b69355]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }}></span>
                          <span className="font-mono text-xs font-semibold text-[#262321] tabular-nums">
                            {cohort.percentage.toFixed(2)}%
                          </span>
                        </div>
                        <div className="text-xs font-medium text-[#262321] mt-2">
                          {cohort.name}
                        </div>
                        <div className="text-[11px] text-[#5f5750]">
                          {formatNumber(cohort.count)} patients
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-2 text-[11px] text-[#5f5750] flex justify-between">
                  <span>Teenagers form the largest cohort (20.38%)</span>
                  <span className="text-[#76591f] font-medium">Dr. Nair: Demographic Weight</span>
                </div>
              </div>

              {/* Chart 5: BMI Category vs Heart Disease Rate */}
              <div className="lg:col-span-6 bg-[#fdfbf7] p-6 border border-[#c6b89f]">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-serif text-lg text-[#262321] font-medium">
                      BMI Category vs. Heart Disease Rate
                    </h3>
                    <p className="text-xs text-[#5f5750]">
                      Observed cardiac risk escalation across weight categories
                    </p>
                  </div>
                  <span className="text-xs uppercase tracking-[0.14em] font-semibold text-[#76591f]">
                    Dose-Response
                  </span>
                </div>

                <div className="mt-6 space-y-3.5">
                  {BMI_DATA.map((b) => {
                    const isSelected = filters.bmiCategory === b.category;
                    return (
                      <div
                        key={b.category}
                        onClick={() =>
                          setFilters((f) => ({
                            ...f,
                            bmiCategory: f.bmiCategory === b.category ? 'All' : b.category,
                          }))
                        }
                        className={`p-2.5 border cursor-pointer transition-all ${
                          isSelected
                            ? 'border-[#262321] bg-[#e4dbcc]/50 shadow-xs'
                            : 'border-[#c6b89f]/40 hover:border-[#b69355]'
                        }`}
                      >
                        <div className="flex justify-between text-xs mb-1">
                          <span className="font-medium text-[#262321]">
                            {b.category} <span className="text-[#5f5750]">({b.sampleSize} patients)</span>
                          </span>
                          <span className="font-mono text-[#76591f] font-semibold tabular-nums">
                            {b.heartDiseaseRate.toFixed(2)}%
                          </span>
                        </div>
                        <div className="w-full bg-[#e4dbcc]/50 h-4 overflow-hidden">
                          <div
                            className={`h-full transition-all duration-300 ${
                              b.category === 'Obese'
                                ? 'bg-[#76591f]'
                                : b.category === 'Overweight'
                                ? 'bg-[#b69355]'
                                : 'bg-[#5f5750]'
                            }`}
                            style={{ width: `${(b.heartDiseaseRate / 50) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 pt-3 border-t border-[#d5cab8] flex items-center justify-between text-[11px] text-[#5f5750]">
                  <span>Obese category reaches 39.98% cardiac incidence</span>
                  <span className="text-[#76591f] font-medium">Dr. Carter: Weight Escalation</span>
                </div>
              </div>

              {/* Chart 6: Heart Disease vs Diabetes Prevalence by BMI Category */}
              <div className="lg:col-span-6 bg-[#fdfbf7] p-6 border border-[#c6b89f]">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-serif text-lg text-[#262321] font-medium">
                      Heart Disease vs. Diabetes Prevalence
                    </h3>
                    <p className="text-xs text-[#5f5750]">
                      Endocrine and cardiovascular multi-morbidity across BMI
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 bg-[#b69355]"></span>
                      <span className="text-[11px] text-[#5f5750]">Diabetes</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 bg-[#5f5750]"></span>
                      <span className="text-[11px] text-[#5f5750]">Heart Disease</span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-4 gap-3 items-end h-44 pb-2 border-b border-[#c6b89f]">
                  {BMI_DATA.map((b) => {
                    const maxCount = 700;
                    const dHeight = (b.diabetesCount / maxCount) * 100;
                    const hHeight = (b.heartDiseaseCount / maxCount) * 100;

                    return (
                      <div key={b.category} className="flex flex-col items-center h-full justify-end group">
                        <div className="flex items-end gap-1.5 w-full justify-center h-full">
                          <div
                            className="w-4 sm:w-5 bg-[#b69355] hover:bg-[#76591f] transition-all"
                            style={{ height: `${dHeight}%` }}
                            title={`${b.category} Diabetes: ${b.diabetesCount}`}
                          ></div>
                          <div
                            className="w-4 sm:w-5 bg-[#5f5750] hover:bg-[#262321] transition-all"
                            style={{ height: `${hHeight}%` }}
                            title={`${b.category} Heart Disease: ${b.heartDiseaseCount}`}
                          ></div>
                        </div>
                        <span className="text-[11px] text-[#262321] font-medium mt-2">
                          {b.category}
                        </span>
                        <span className="text-[10px] text-[#5f5750]">
                          {b.diabetesCount} / {b.heartDiseaseCount}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 flex items-center justify-between text-[11px] text-[#5f5750]">
                  <span>Close synchronization confirms unified metabolic pathways</span>
                  <span className="text-[#76591f] font-medium">Dr. Nair: Co-morbidity Triad</span>
                </div>
              </div>

              {/* Chart 7: Heart Disease by BMI & Exercise Level (Risk Matrix Heatmap) */}
              <div className="lg:col-span-6 bg-[#fdfbf7] p-6 border border-[#c6b89f]">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-serif text-lg text-[#262321] font-medium">
                      Risk Matrix: Heart Disease by BMI &amp; Exercise
                    </h3>
                    <p className="text-xs text-[#5f5750]">
                      Cross-tabulation showing protective physical activity thresholds
                    </p>
                  </div>
                  <span className="text-xs uppercase tracking-[0.14em] font-semibold text-[#76591f]">
                    Heatmap
                  </span>
                </div>

                <div className="mt-6 overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead>
                      <tr className="border-b border-[#c6b89f] text-[#5f5750] uppercase tracking-[0.12em] text-[10px]">
                        <th className="py-2 pr-3 font-semibold">BMI Category</th>
                        <th className="py-2 px-3 font-semibold text-center">Active</th>
                        <th className="py-2 px-3 font-semibold text-center">Moderate</th>
                        <th className="py-2 px-3 font-semibold text-center">Sedentary</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e4dbcc]/60 font-mono">
                      {(['Normal', 'Obese', 'Overweight', 'Underweight'] as const).map((bmi) => {
                        const activeVal = getHeatmapCellRisk(HEATMAP_MATRIX, bmi, 'Active');
                        const modVal = getHeatmapCellRisk(HEATMAP_MATRIX, bmi, 'Moderate');
                        const sedVal = getHeatmapCellRisk(HEATMAP_MATRIX, bmi, 'Sedentary');

                        return (
                          <tr key={bmi} className="hover:bg-[#e4dbcc]/30 transition-colors">
                            <td className="py-2.5 pr-3 font-sans font-medium text-[#262321]">
                              {bmi}
                            </td>
                            <td className="py-2.5 px-3 text-center">
                              <span
                                className="inline-block px-2.5 py-1 text-xs font-semibold"
                                style={{
                                  backgroundColor: `rgba(182, 147, 85, ${activeVal * 1.8})`,
                                  color: activeVal > 0.3 ? '#f3eee4' : '#262321'
                                }}
                              >
                                {activeVal.toFixed(4)}
                              </span>
                            </td>
                            <td className="py-2.5 px-3 text-center">
                              <span
                                className="inline-block px-2.5 py-1 text-xs font-semibold"
                                style={{
                                  backgroundColor: `rgba(182, 147, 85, ${modVal * 1.8})`,
                                  color: modVal > 0.3 ? '#f3eee4' : '#262321'
                                }}
                              >
                                {modVal.toFixed(4)}
                              </span>
                            </td>
                            <td className="py-2.5 px-3 text-center">
                              <span
                                className="inline-block px-2.5 py-1 text-xs font-semibold"
                                style={{
                                  backgroundColor: `rgba(118, 89, 31, ${sedVal * 2})`,
                                  color: sedVal > 0.3 ? '#f3eee4' : '#262321'
                                }}
                              >
                                {sedVal.toFixed(4)}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="mt-4 pt-3 border-t border-[#d5cab8] flex items-center justify-between text-[11px] text-[#5f5750]">
                  <span>Peak risk: Obese + Sedentary (0.4286) drops to 0.3768 with Active exercise</span>
                  <span className="text-[#76591f] font-medium">E. Rodriguez: Protective Threshold</span>
                </div>
              </div>

              {/* Chart 8: Age Group Distribution by Fatigue Condition */}
              <div className="lg:col-span-12 bg-[#fdfbf7] p-6 border border-[#c6b89f]">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="font-serif text-lg text-[#262321] font-medium">
                      Age Group Distribution by Fatigue Condition
                    </h3>
                    <p className="text-xs text-[#5f5750]">
                      Patient-reported fatigue symptoms as early clinical warning indicators
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-xs">
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 bg-[#b69355]"></span>
                      <span className="text-[11px] text-[#5f5750]">Fatigue Present (Yes)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-3 h-3 bg-[#c6b89f]"></span>
                      <span className="text-[11px] text-[#5f5750]">Fatigue Absent (No)</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {AGE_COHORTS.map((c) => {
                    const total = c.fatigueYes + c.fatigueNo;
                    const yesPct = ((c.fatigueYes / total) * 100).toFixed(1);
                    const noPct = ((c.fatigueNo / total) * 100).toFixed(1);

                    return (
                      <div key={c.id} className="p-3 bg-[#f3eee4]/50 border border-[#c6b89f]/60">
                        <div className="flex justify-between text-xs font-medium text-[#262321] mb-1">
                          <span>{c.name}</span>
                          <span className="text-[#76591f] font-mono">{yesPct}% Reported</span>
                        </div>
                        <div className="w-full flex h-4 overflow-hidden mb-2">
                          <div
                            className="bg-[#b69355] h-full"
                            style={{ width: `${yesPct}%` }}
                            title={`Yes: ${c.fatigueYes}`}
                          ></div>
                          <div
                            className="bg-[#c6b89f] h-full"
                            style={{ width: `${noPct}%` }}
                            title={`No: ${c.fatigueNo}`}
                          ></div>
                        </div>
                        <div className="flex justify-between text-[11px] text-[#5f5750]">
                          <span>Yes: {c.fatigueYes}</span>
                          <span>No: {c.fatigueNo}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 pt-3 border-t border-[#d5cab8] flex items-center justify-between text-[11px] text-[#5f5750]">
                  <span>Non-specific fatigue precedes acute vascular diagnoses in over 50% of vulnerable patients</span>
                  <span className="text-[#76591f] font-medium">Dr. Nair: Pre-clinical Triage</span>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>
    </section>
  );
};
