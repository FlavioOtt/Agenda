// src/components/Admin/AdminLayout.jsx
import React, { useState } from 'react';
import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';
import styles from './AdminLayout.module.css';

const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        logout();
        navigate('/admin/login');
    };

    const menuItems = [
        { path: '/admin/dashboard', icon: 'fa-chart-line', label: 'Dashboard' },
        { path: '/admin/agendamentos', icon: 'fa-calendar-check', label: 'Agendamentos' },
        { path: '/admin/clientes', icon: 'fa-users', label: 'Clientes' },
        { path: '/admin/servicos', icon: 'fa-scissors', label: 'Serviços' },
        { path: '/admin/profissionais', icon: 'fa-user-tie', label: 'Profissionais' },
        { path: '/admin/relatorios', icon: 'fa-chart-bar', label: 'Relatórios' },
    ];

    return (
        <div className={styles.layout}>
            {/* Sidebar */}
            <aside className={`${styles.sidebar} ${isSidebarOpen ? styles.open : ''}`}>
                <div className={styles.sidebarHeader}>
                    <Link to="/admin/dashboard" className={styles.logo}>
                        Espaço<span>Beleza</span>
                    </Link>
                    <span className={styles.adminBadge}>Admin</span>
                </div>

                <nav className={styles.menu}>
                    {menuItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`${styles.menuItem} ${location.pathname === item.path ? styles.active : ''}`}
                        >
                            <i className={`fa-solid ${item.icon}`}></i>
                            <span>{item.label}</span>
                        </Link>
                    ))}
                </nav>

                <div className={styles.sidebarFooter}>
                    <Link to="/" className={styles.viewSite}>
                        <i className="fa-solid fa-external-link-alt"></i>
                        <span>Ver Site</span>
                    </Link>
                    <button onClick={handleLogout} className={styles.logoutBtn}>
                        <i className="fa-solid fa-sign-out-alt"></i>
                        <span>Sair</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className={styles.main}>
                {/* Top Bar */}
                <header className={styles.topbar}>
                    <button
                        className={styles.toggleBtn}
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    >
                        <i className={`fa-solid ${isSidebarOpen ? 'fa-bars' : 'fa-bars'}`}></i>
                    </button>

                    <div className={styles.topbarRight}>
                        <div className={styles.userInfo}>
                            <span className={styles.userName}>{user?.nome}</span>
                            <div className={styles.userAvatar}>
                                <i className="fa-solid fa-user"></i>
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <div className={styles.content}>
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;