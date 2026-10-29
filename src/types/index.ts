export type ConstructionStage =
  | 'Site preparation'
  | 'Excavation'
  | 'Foundation'
  | 'Plinth and ground-level work'
  | 'Structural framework and superstructure'
  | 'Masonry and walls'
  | 'Roofing'
  | 'Facade and exterior finishing'
  | 'Plumbing and electrical services'
  | 'Interior finishing'
  | 'Final inspection and handover';

export type ProjectType = 'residential' | 'commercial' | 'industrial' | 'infrastructure';

export type ReviewStatus = 'pending_review' | 'confirmed' | 'corrected' | 'rejected';

export type ImageSuitability = 'optimal' | 'acceptable' | 'suboptimal_lighting' | 'blurry' | 'inconclusive';

export interface AIAnalysisResult {
  id: string;
  predictedStage: ConstructionStage;
  stageConfidence: number; // 0.0 to 1.0 (labeled as model estimate)
  detectedActivities: string[];
  materialsAndElements: string[];
  imageSuitability: ImageSuitability;
  categoryMismatch: boolean;
  mismatchExplanation?: string;
  anomaliesOrFlags: string[];
  recommendedNextAction: string;
  technicalExplanation: string;
  analysisTimestamp: string;
  isAiGenerated: boolean;
}

export interface SiteImage {
  id: string;
  projectId: string;
  imageUrl: string;
  captureDate: string;
  uploadedAt: string;
  selectedCategory: ConstructionStage;
  verifiedCategory?: ConstructionStage;
  reviewStatus: ReviewStatus;
  reviewNotes?: string;
  reviewerName?: string;
  verifiedAt?: string;
  floor?: string;
  block?: string;
  zone?: string;
  engineerNotes?: string;
  fileName: string;
  fileSizeBytes: number;
  analysis: AIAnalysisResult;
}

export interface ProjectMilestone {
  id: string;
  title: string;
  stage: ConstructionStage;
  targetDate: string;
  completedDate?: string;
  status: 'completed' | 'in_progress' | 'upcoming' | 'delayed';
  progressPercent: number; // manually entered or estimated
}

export interface ConstructionProject {
  id: string;
  name: string;
  projectCode: string;
  location: string;
  city: string;
  state: string;
  type: ProjectType;
  clientName: string;
  projectManager: string;
  startDate: string;
  expectedCompletionDate: string;
  description: string;
  status: 'active' | 'on_hold' | 'completed' | 'archived';
  baselineImageUrl: string;
  currentEstimatedStage: ConstructionStage;
  lastMonitoredDate: string;
  totalImagesCount: number;
  verifiedImagesCount: number;
  flaggedIssuesCount: number;
  manualProgressPercent: number;
  milestones: ProjectMilestone[];
}

export interface SystemAlert {
  id: string;
  projectId: string;
  projectName: string;
  type: 'category_mismatch' | 'low_quality_image' | 'analysis_flag' | 'unreviewed_ai' | 'delayed_milestone' | 'missing_observation';
  severity: 'high' | 'medium' | 'low';
  title: string;
  explanation: string;
  timestamp: string;
  status: 'unresolved' | 'acknowledged' | 'resolved';
  imageId?: string;
  suggestedAction: string;
}

export interface ComparisonRecord {
  id: string;
  projectId: string;
  beforeImageId: string;
  afterImageId: string;
  beforeDate: string;
  afterDate: string;
  beforeStage: ConstructionStage;
  afterStage: ConstructionStage;
  zone?: string;
  aiChangeSummary: string;
  detectedDifferences: string[];
  reliabilityRating: 'high' | 'medium' | 'advisory_differing_angle';
  reliabilityWarning?: string;
  createdAt: string;
}

export interface MonitoringReport {
  id: string;
  reportCode: string;
  projectId: string;
  projectName: string;
  reportType: 'daily' | 'weekly' | 'monthly' | 'custom' | 'comparison' | 'validation';
  reportingPeriodStart: string;
  reportingPeriodEnd: string;
  generatedAt: string;
  generatedBy: string;
  executiveSummary: string;
  observedStages: ConstructionStage[];
  imagesReviewedCount: number;
  engineerCorrectionsCount: number;
  unresolvedAlertsCount: number;
  observations: string[];
  limitationsDisclaimer: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  organization: string;
  notificationPreferences: {
    mismatchAlerts: boolean;
    weeklySummaries: boolean;
    qualityIssues: boolean;
  };
}
