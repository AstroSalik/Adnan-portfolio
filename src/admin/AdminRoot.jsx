import { useState, lazy, Suspense } from 'react';
import AdminLayout from './layout/AdminLayout';
import LoadingFallback from '../components/layout/LoadingFallback';

// Lazy load Admin Modules
const Overview = lazy(() => import('./modules/Overview/Overview'));
const PortfolioCMS = lazy(() => import('./modules/PortfolioCMS/PortfolioCMS'));
const ProjectTracker = lazy(() => import('./modules/ProjectTracker/ProjectTracker'));
const OutreachLog = lazy(() => import('./modules/OutreachLog/OutreachLog'));
const RecognitionWall = lazy(() => import('./modules/RecognitionWall/RecognitionWall'));

function AdminRoot() {
  const [activeModule, setActiveModule] = useState('overview');

  const onLock = () => {
    sessionStorage.removeItem('adnan_auth');
    window.location.href = '/admin/login';
  };

  const getModuleComponent = () => {
    switch (activeModule) {
      case 'overview': return <Overview onModuleChange={setActiveModule} />;
      case 'cms': return <PortfolioCMS />;
      case 'tracker': return <ProjectTracker />;
      case 'outreach': return <OutreachLog />;
      case 'recognition': return <RecognitionWall />;
      default: return <Overview />;
    }
  };

  const getModuleTitle = () => {
    switch (activeModule) {
      case 'overview': return 'Overview';
      case 'cms': return 'Portfolio CMS';
      case 'tracker': return 'Project Tracker';
      case 'outreach': return 'Outreach Log';
      case 'recognition': return 'Recognition';
      default: return 'Command Portal';
    }
  };

  return (
    <AdminLayout 
      activeModule={activeModule} 
      onModuleChange={setActiveModule}
      moduleTitle={getModuleTitle()}
      onLock={onLock}
    >
      <Suspense fallback={<LoadingFallback />}>
        {getModuleComponent()}
      </Suspense>
    </AdminLayout>
  );
}

export default AdminRoot;
