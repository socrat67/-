import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { DataProvider } from './context/DataContext';
import { Layout } from './components/Layout';
import { Welcome } from './pages/Welcome';
import { About } from './pages/About';
import { Administration } from './pages/Administration';
import { Teachers } from './pages/Teachers';
import { Students } from './pages/Students';
import { Parents } from './pages/Parents';
import { EducationProcess } from './pages/EducationProcess';
import { DocumentsList } from './pages/DocumentsList';
import { NewsList } from './pages/NewsList';
import { Gallery } from './pages/Gallery';
import { ContactsPage } from './pages/ContactsPage';
import { WorkspaceHub } from './pages/WorkspaceHub';

export default function App() {
  const [currentPage, setCurrentPage] = useState<string>('welcome');

  const renderActivePage = () => {
    switch (currentPage) {
      case 'welcome':
        return <Welcome setCurrentPage={setCurrentPage} />;
      
      // Google Workspace integration Hub
      case 'google-workspace':
        return <WorkspaceHub />;
      
      // About routing
      case 'about-history':
        return <About initialSubTab="history" />;
      case 'about-mission':
        return <About initialSubTab="mission" />;
      case 'about-symbols':
        return <About initialSubTab="symbols" />;
      case 'about-base':
        return <About initialSubTab="base" />;
      
      // Administration routing
      case 'administration':
      case 'administration-reception':
      case 'administration-contacts':
        return <Administration />;
      
      // Teachers routing
      case 'teachers':
        return <Teachers />;
      
      // Process routing
      case 'education-programs':
        return <EducationProcess initialGroup="programs" />;
      case 'education-calendar':
        return <EducationProcess initialGroup="calendar" />;
      case 'education-nush':
        return <EducationProcess initialGroup="nush" />;
      case 'education-inclusive':
        return <EducationProcess initialGroup="inclusive" />;
      
      // Students routing
      case 'students-schedule':
        return <Students initialSection="schedule" />;
      case 'students-distance':
        return <Students initialSection="distance" />;
      case 'students-competitions':
        return <Students initialSection="competitions" />;
      case 'students-council':
        return <Students initialSection="council" />;
      
      // Parents routing
      case 'parents-food':
        return <Parents />;
      case 'parents-safety':
        // Scroll / select safety tab
        return <Parents />;
      case 'parents-psychology':
        return <Parents />;
      case 'parents-admission':
        return <Parents />;
      
      // Documents list
      case 'documents':
        return <DocumentsList />;
      
      // News list
      case 'news':
        return <NewsList />;
      
      // Gallery page
      case 'gallery':
        return <Gallery />;
      
      // Contacts page
      case 'contacts':
        return <ContactsPage />;
      
      default:
        return <Welcome setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <ThemeProvider>
      <DataProvider>
        <Layout setCurrentPage={setCurrentPage} currentPage={currentPage}>
          {renderActivePage()}
        </Layout>
      </DataProvider>
    </ThemeProvider>
  );
}
