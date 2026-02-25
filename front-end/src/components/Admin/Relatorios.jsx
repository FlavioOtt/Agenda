// src/components/Admin/Relatorios.jsx
import React, { useState } from 'react';
import styles from './Relatorios.module.css';

const Relatorios = () => {
  const [periodo, setPeriodo] = useState('mes');
  const [ano, setAno] = useState('2024');

  // Dados de exemplo - Faturamento por mês
  const dadosFaturamento = {
    '2024': [12500, 14200, 15800, 13200, 16500, 18200, 17800, 19500, 21000, 18800, 22500, 24800],
  };

  // Dados de exemplo - Serviços mais realizados
  const servicosPopulares = [
    { nome: 'Corte Feminino', quantidade: 245, receita: 19600, percentual: 25 },
    { nome: 'Coloração', quantidade: 156, receita: 23400, percentual: 30 },
    { nome: 'Manicure', quantidade: 189, receita: 7560, percentual: 10 },
    { nome: 'Corte Masculino', quantidade: 178, receita: 8900, percentual: 11 },
    { nome: 'Escova', quantidade: 145, receita: 11500, percentual: 15 },
  ];

  // Dados de exemplo - Agendamentos por profissional
  const desempenhoProfissionais = [
    { nome: 'Carla Silva', servicos: 180, receita: 22500, nota: 4.9 },
    { nome: 'João Santos', servicos: 156, receita: 15600, nota: 4.7 },
    { nome: 'Maria Oliveira', servicos: 142, receita: 8500, nota: 4.8 },
    { nome: 'Pedro Costa', servicos: 98, receita: 12000, nota: 4.6 },
  ];

  // Dados de exemplo - Comparativo
  const comparativo = {
    agendamentos: { atual: 521, anterior: 445, variacao: 17 },
    clientes: { atual: 248, anterior: 198, variacao: 25 },
    receita: { atual: 'R$ 223.500', anterior: 'R$ 185.200', variacao: 21 },
    notaMedia: { atual: 4.8, anterior: 4.6, variacao: 4 },
  };

  const meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
  const maxFaturamento = Math.max(...dadosFaturamento[ano]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 0 }).format(value);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1>Relatórios</h1>
          <p>Análise completa do salão</p>
        </div>
        <div className={styles.headerActions}>
          <select 
            value={ano} 
            onChange={(e) => setAno(e.target.value)}
            className={styles.select}
          >
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            <option value="2022">2022</option>
          </select>
          <button className={styles.exportBtn}>
            <i className="fa-solid fa-download"></i> Exportar
          </button>
        </div>
      </div>

      {/* Comparativo */}
      <div className={styles.comparativoGrid}>
        <div className={styles.comparativoCard}>
          <div className={styles.comparativoIcon} style={{ background: '#D4AF3720', color: '#D4AF37' }}>
            <i className="fa-solid fa-calendar-check"></i>
          </div>
          <div className={styles.comparativoInfo}>
            <span className={styles.comparativoLabel}>Agendamentos</span>
            <div className={styles.comparativoValues}>
              <span className={styles.comparativoValue}>{comparativo.agendamentos.atual}</span>
              <span className={`${styles.comparativoVariation} ${comparativo.agendamentos.variacao > 0 ? styles.positive : styles.negative}`}>
                <i className={`fa-solid ${comparativo.agendamentos.variacao > 0 ? 'fa-arrow-up' : 'fa-arrow-down'}`}></i>
                {comparativo.agendamentos.variacao}%
              </span>
            </div>
            <span className={styles.comparativoAnterior}>Mês anterior: {comparativo.agendamentos.anterior}</span>
          </div>
        </div>

        <div className={styles.comparativoCard}>
          <div className={styles.comparativoIcon} style={{ background: '#2ECC7120', color: '#2ECC71' }}>
            <i className="fa-solid fa-users"></i>
          </div>
          <div className={styles.comparativoInfo}>
            <span className={styles.comparativoLabel}>Novos Clientes</span>
            <div className={styles.comparativoValues}>
              <span className={styles.comparativoValue}>{comparativo.clientes.atual}</span>
              <span className={`${styles.comparativoVariation} ${comparativo.clientes.variacao > 0 ? styles.positive : styles.negative}`}>
                <i className={`fa-solid ${comparativo.clientes.variacao > 0 ? 'fa-arrow-up' : 'fa-arrow-down'}`}></i>
                {comparativo.clientes.variacao}%
              </span>
            </div>
            <span className={styles.comparativoAnterior}>Mês anterior: {comparativo.clientes.anterior}</span>
          </div>
        </div>

        <div className={styles.comparativoCard}>
          <div className={styles.comparativoIcon} style={{ background: '#3498DB20', color: '#3498DB' }}>
            <i className="fa-solid fa-brazilian-real-sign"></i>
          </div>
          <div className={styles.comparativoInfo}>
            <span className={styles.comparativoLabel}>Receita Total</span>
            <div className={styles.comparativoValues}>
              <span className={styles.comparativoValue}>{comparativo.receita.atual}</span>
              <span className={`${styles.comparativoVariation} ${comparativo.receita.variacao > 0 ? styles.positive : styles.negative}`}>
                <i className={`fa-solid ${comparativo.receita.variacao > 0 ? 'fa-arrow-up' : 'fa-arrow-down'}`}></i>
                {comparativo.receita.variacao}%
              </span>
            </div>
            <span className={styles.comparativoAnterior}>Mês anterior: {comparativo.receita.anterior}</span>
          </div>
        </div>

        <div className={styles.comparativoCard}>
          <div className={styles.comparativoIcon} style={{ background: '#E74C3C20', color: '#E74C3C' }}>
            <i className="fa-solid fa-star"></i>
          </div>
          <div className={styles.comparativoInfo}>
            <span className={styles.comparativoLabel}>Nota Média</span>
            <div className={styles.comparativoValues}>
              <span className={styles.comparativoValue}>{comparativo.notaMedia.atual}</span>
              <span className={`${styles.comparativoVariation} ${comparativo.notaMedia.variacao > 0 ? styles.positive : styles.negative}`}>
                <i className={`fa-solid ${comparativo.notaMedia.variacao > 0 ? 'fa-arrow-up' : 'fa-arrow-down'}`}></i>
                {comparativo.notaMedia.variacao}%
              </span>
            </div>
            <span className={styles.comparativoAnterior}>Mês anterior: {comparativo.notaMedia.anterior}</span>
          </div>
        </div>
      </div>

      {/* Gráfico de Faturamento */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2>Faturamento Mensal</h2>
          <span className={styles.totalAno}>Total: {formatCurrency(dadosFaturamento[ano].reduce((a, b) => a + b, 0))}</span>
        </div>
        <div className={styles.chartContainer}>
          <div className={styles.chart}>
            {dadosFaturamento[ano].map((value, index) => (
              <div key={index} className={styles.chartBar}>
                <div 
                  className={styles.bar} 
                  style={{ height: `${(value / maxFaturamento) * 100}%` }}
                >
                  <span className={styles.barValue}>{formatCurrency(value)}</span>
                </div>
                <span className={styles.barLabel}>{meses[index]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Grid de Relatórios */}
      <div className={styles.grid}>
        {/* Serviços Mais Populares */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3>Serviços Mais Realizados</h3>
          </div>
          <div className={styles.cardBody}>
            {servicosPopulares.map((servico, index) => (
              <div key={index} className={styles.serviceItem}>
                <div className={styles.serviceRank}>#{index + 1}</div>
                <div className={styles.serviceInfo}>
                  <span className={styles.serviceName}>{servico.nome}</span>
                  <span className={styles.serviceStats}>{servico.quantidade} serviços • {formatCurrency(servico.receita)}</span>
                </div>
                <div className={styles.servicePercent}>
                  <div className={styles.progressBar}>
                    <div 
                      className={styles.progress} 
                      style={{ width: `${servico.percentual}%` }}
                    ></div>
                  </div>
                  <span>{servico.percentual}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desempenho dos Profissionais */}
        <div className={styles.card}>
          <div className={styles.cardHeader}>
            <h3>Desempenho por Profissional</h3>
          </div>
          <div className={styles.cardBody}>
            {desempenhoProfissionais.map((prof, index) => (
              <div key={index} className={styles.profItem}>
                <div className={styles.profAvatar}>
                  {prof.nome.charAt(0)}
                </div>
                <div className={styles.profInfo}>
                  <span className={styles.profName}>{prof.nome}</span>
                  <span className={styles.profStats}>{prof.servicos} serviços • {formatCurrency(prof.receita)}</span>
                </div>
                <div className={styles.profRating}>
                  <i className="fa-solid fa-star"></i>
                  <span>{prof.nota}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabela de Recompensas */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3>Clientes Premium</h3>
        </div>
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Posição</th>
                <th>Cliente</th>
                <th>Serviços Realizados</th>
                <th>Receita Gerada</th>
                <th>Última Visita</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><span className={styles.goldMedal}>🥇</span></td>
                <td>Julia Mendes</td>
                <td>28</td>
                <td>R$ 4.200</td>
                <td>15/12/2024</td>
              </tr>
              <tr>
                <td><span className={styles.silverMedal}>🥈</span></td>
                <td>Ana Costa</td>
                <td>24</td>
                <td>R$ 3.800</td>
                <td>18/12/2024</td>
              </tr>
              <tr>
                <td><span className={styles.bronzeMedal}>🥉</span></td>
                <td>Mariana Silva</td>
                <td>21</td>
                <td>R$ 3.150</td>
                <td>20/12/2024</td>
              </tr>
              <tr>
                <td>4</td>
                <td>Fernanda Souza</td>
                <td>18</td>
                <td>R$ 2.900</td>
                <td>10/12/2024</td>
              </tr>
              <tr>
                <td>5</td>
                <td>Patrícia Lima</td>
                <td>16</td>
                <td>R$ 2.450</td>
                <td>22/12/2024</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Relatorios;