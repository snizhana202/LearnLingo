import { Outlet } from 'react-router-dom';
import Header from '../Header/Header';
import './Layout.scss';

export default function Layout() {
  return (
    <div className="app-shell">
      <Header />
      <main className="app-shell__content">
        <Outlet />
      </main>
    </div>
  );
}