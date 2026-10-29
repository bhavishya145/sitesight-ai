/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage.tsx';
import { AuthModal } from './components/AuthModal.tsx';
import { AppLayout } from './components/AppLayout.tsx';
import { DashboardOverview } from './components/DashboardOverview.tsx';
import { ProjectManager } from './components/ProjectManager.tsx';
import { ImageAnalysisWorkflow } from './components/ImageAnalysisWorkflow.tsx';
import { ProgressTimelineView } from './components/ProgressTimelineView.tsx';
import { ImageComparisonTool } from './components/ImageComparisonTool.tsx';
import { ReportsCenter } from './components/ReportsCenter.tsx';
import { AlertsCenter } from './components/AlertsCenter.tsx';
import { AnalyticsView } from './components/AnalyticsView.tsx';
import { SettingsView } from './components/SettingsView.tsx';
import type {
  ConstructionProject,
  SiteImage,
  SystemAlert,
  MonitoringReport,
  UserProfile,
  ConstructionStage,
} from './types/index.ts';

export default function App() {
  // Navigation / View state
  const [currentView, setCurrentView] = useState<'landing' | 'app'>('landing');
  const [currentTab, setCurrentTab] = useState<string>('overview');
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup' | 'forgot'>('login');

  // Authenticated user session
  const [user, setUser] = useState<UserProfile>({
    id: 'usr-1',
    name: 'Er. Rajesh K. Varma',
    email: 'rajesh.varma@sitesight.ai',
    role: 'Senior Technical Auditor',
    organization: 'Independent Engineering Audit Services',
    notificationPreferences: {
      mismatchAlerts: true,
      weeklySummaries: true,
      qualityIssues: true,
    },
  });

  // App data state
  const [projects, setProjects] = useState<ConstructionProject[]>([]);
  const [selectedProject, setSelectedProject] = useState<ConstructionProject | null>(null);
  const [images, setImages] = useState<SiteImage[]>([]);
  const [alerts, setAlerts] = useState<SystemAlert[]>([]);
  const [reports, setReports] = useState<MonitoringReport[]>([]);
  const [loading, setLoading] = useState(true);

  // Initial Data Fetch
  useEffect(() => {
    async function loadInitialData() {
      try {
        const [projRes, alertsRes, reportsRes] = await Promise.all([
          fetch('/api/projects'),
          fetch('/api/alerts'),
          fetch('/api/reports'),
        ]);

        if (projRes.ok) {
          const projs: ConstructionProject[] = await projRes.json();
          setProjects(projs);
          if (projs.length > 0) {
            setSelectedProject(projs[0]);
            // Load images for first project
            const imgRes = await fetch(`/api/projects/${projs[0].id}/images`);
            if (imgRes.ok) {
              const imgs: SiteImage[] = await imgRes.json();
              setImages(imgs);
            }
          }
        }

        if (alertsRes.ok) {
          const alts: SystemAlert[] = await alertsRes.json();
          setAlerts(alts);
        }

        if (reportsRes.ok) {
          const reps: MonitoringReport[] = await reportsRes.json();
          setReports(reps);
        }
      } catch (err) {
        console.error('Failed to load initial data:', err);
      } finally {
        setLoading(false);
      }
    }

    loadInitialData();
  }, []);

  // When selected project changes, fetch its images
  const handleSelectProject = async (proj: ConstructionProject) => {
    setSelectedProject(proj);
    try {
      const res = await fetch(`/api/projects/${proj.id}/images`);
      if (res.ok) {
        const imgs = await res.json();
        setImages(imgs);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Callback when a new image is ingested and analyzed
  const handleImageSaved = (newImg: SiteImage) => {
    setImages((prev) => [newImg, ...prev]);

    // Update project metrics locally
    if (selectedProject) {
      const updatedProj: ConstructionProject = {
        ...selectedProject,
        totalImagesCount: selectedProject.totalImagesCount + 1,
        lastMonitoredDate: newImg.captureDate,
        currentEstimatedStage: newImg.analysis.predictedStage,
      };
      setProjects((prev) => prev.map((p) => (p.id === updatedProj.id ? updatedProj : p)));
      setSelectedProject(updatedProj);
    }

    // Refresh alerts in case a mismatch was logged
    fetch('/api/alerts')
      .then((r) => r.json())
      .then((alts) => setAlerts(alts))
      .catch(console.error);
  };

  // Engineer verification on timeline image
  const handleVerifyImage = async (
    imageId: string,
    status: 'confirmed' | 'corrected' | 'rejected',
    stage?: ConstructionStage,
    notes?: string
  ) => {
    if (!selectedProject) return;

    try {
      const res = await fetch(`/api/projects/${selectedProject.id}/images/${imageId}/verify`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reviewStatus: status,
          verifiedCategory: stage,
          reviewNotes: notes,
          reviewerName: user.name,
        }),
      });

      if (res.ok) {
        const updatedImg: SiteImage = await res.json();
        setImages((prev) => prev.map((img) => (img.id === imageId ? updatedImg : img)));

        // Update local alerts status if matching alert exists
        setAlerts((prev) =>
          prev.map((a) => (a.imageId === imageId ? { ...a, status: 'resolved' } : a))
        );
      }
    } catch (err) {
      console.error('Verify error:', err);
    }
  };

  // Alert status update
  const handleUpdateAlertStatus = async (alertId: string, status: 'acknowledged' | 'resolved') => {
    try {
      const res = await fetch(`/api/alerts/${alertId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        const updated = await res.json();
        setAlerts((prev) => prev.map((a) => (a.id === alertId ? updated : a)));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleReportCreated = (newReport: MonitoringReport) => {
    setReports((prev) => [newReport, ...prev]);
  };

  const handleProjectCreated = (newProj: ConstructionProject) => {
    setProjects((prev) => [newProj, ...prev]);
    setSelectedProject(newProj);
    setImages([]);
  };

  const handleProjectUpdated = (updated: ConstructionProject) => {
    setProjects((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    if (selectedProject?.id === updated.id) {
      setSelectedProject(updated);
    }
  };

  const handleProjectDeleted = (id: string) => {
    const remaining = projects.filter((p) => p.id !== id);
    setProjects(remaining);
    if (selectedProject?.id === id) {
      setSelectedProject(remaining[0] || null);
    }
  };

  return (
    <>
      {currentView === 'landing' ? (
        <LandingPage
          onOpenApp={(tab) => {
            if (tab) setCurrentTab(tab);
            setCurrentView('app');
          }}
          onOpenAuth={(mode) => {
            setAuthMode(mode);
            setAuthModalOpen(true);
          }}
        />
      ) : (
        selectedProject && (
          <AppLayout
            currentTab={currentTab}
            onSelectTab={(tab) => setCurrentTab(tab)}
            projects={projects}
            selectedProject={selectedProject}
            onSelectProject={handleSelectProject}
            alerts={alerts}
            user={user}
            onLogout={() => setCurrentView('landing')}
            onBackToLanding={() => setCurrentView('landing')}
          >
            {currentTab === 'overview' && (
              <DashboardOverview
                projects={projects}
                images={images}
                alerts={alerts}
                reports={reports}
                selectedProject={selectedProject}
                onSelectProject={handleSelectProject}
                onNavigate={(tab) => setCurrentTab(tab)}
              />
            )}

            {currentTab === 'projects' && (
              <ProjectManager
                projects={projects}
                selectedProject={selectedProject}
                onSelectProject={handleSelectProject}
                onProjectCreated={handleProjectCreated}
                onProjectUpdated={handleProjectUpdated}
                onProjectDeleted={handleProjectDeleted}
                onNavigate={(tab) => setCurrentTab(tab)}
              />
            )}

            {currentTab === 'analysis' && (
              <ImageAnalysisWorkflow
                projects={projects}
                selectedProject={selectedProject}
                onImageSaved={handleImageSaved}
                onSelectProject={handleSelectProject}
              />
            )}

            {currentTab === 'timeline' && (
              <ProgressTimelineView
                project={selectedProject}
                images={images}
                onVerifyImage={handleVerifyImage}
                onNavigate={(tab) => setCurrentTab(tab)}
              />
            )}

            {currentTab === 'comparisons' && (
              <ImageComparisonTool
                project={selectedProject}
                images={images}
              />
            )}

            {currentTab === 'reports' && (
              <ReportsCenter
                project={selectedProject}
                images={images}
                alerts={alerts}
                reports={reports}
                onReportCreated={handleReportCreated}
              />
            )}

            {currentTab === 'alerts' && (
              <AlertsCenter
                alerts={alerts}
                projects={projects}
                onUpdateAlertStatus={handleUpdateAlertStatus}
                onNavigate={(tab) => setCurrentTab(tab)}
              />
            )}

            {currentTab === 'settings' && (
              <SettingsView
                user={user}
                onUpdateUser={setUser}
                onLogout={() => setCurrentView('landing')}
              />
            )}
          </AppLayout>
        )
      )}

      {/* Authentication Modal */}
      <AuthModal
        isOpen={authModalOpen}
        initialMode={authMode}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={(newUser) => {
          setUser({
            id: 'usr-' + Date.now(),
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            organization: newUser.organization,
            notificationPreferences: {
              mismatchAlerts: true,
              weeklySummaries: true,
              qualityIssues: true,
            },
          });
          setCurrentView('app');
        }}
      />
    </>
  );
}
