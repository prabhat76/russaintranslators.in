import React, { useState, useEffect } from 'react';

const AnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [timeRange, setTimeRange] = useState('7days');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading analytics data
    setTimeout(() => {
      setAnalytics({
        overview: {
          totalVisits: 12847,
          uniqueVisitors: 8923,
          quotesReceived: 156,
          conversionRate: 12.4
        },
        traffic: {
          today: 234,
          yesterday: 189,
          thisWeek: 1847,
          lastWeek: 1623,
          thisMonth: 7234,
          lastMonth: 6892
        },
        sources: [
          { name: 'Direct', visitors: 3456, percentage: 38.7 },
          { name: 'Google', visitors: 2876, percentage: 32.2 },
          { name: 'Social Media', visitors: 1234, percentage: 13.8 },
          { name: 'Referrals', visitors: 987, percentage: 11.1 },
          { name: 'Others', visitors: 370, percentage: 4.2 }
        ],
        pages: [
          { path: '/', views: 4567, bounceRate: 23.4 },
          { path: '/services', views: 2345, bounceRate: 45.6 },
          { path: '/gallery', views: 1876, bounceRate: 34.2 },
          { path: '/contact', views: 1234, bounceRate: 12.8 },
          { path: '/about', views: 876, bounceRate: 56.7 }
        ],
        devices: [
          { type: 'Desktop', users: 5234, percentage: 58.6 },
          { type: 'Mobile', users: 2876, percentage: 32.2 },
          { type: 'Tablet', users: 813, percentage: 9.2 }
        ]
      });
      setIsLoading(false);
    }, 1000);
  }, [timeRange]);

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '400px',
        fontSize: '1.1rem',
        color: '#64748b'
      }}>
        Loading analytics...
      </div>
    );
  }

  const StatCard = ({ title, value, change, positive }) => (
    <div style={{
      background: 'white',
      padding: '1.5rem',
      borderRadius: '12px',
      border: '1px solid #e2e8f0',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
    }}>
      <div style={{
        fontSize: '0.875rem',
        fontWeight: '500',
        color: '#64748b',
        marginBottom: '0.5rem'
      }}>
        {title}
      </div>
      <div style={{
        fontSize: '2rem',
        fontWeight: '700',
        color: '#1e293b',
        marginBottom: '0.5rem'
      }}>
        {typeof value === 'number' ? value.toLocaleString() : value}
      </div>
      {change && (
        <div style={{
          fontSize: '0.75rem',
          color: positive ? '#10b981' : '#ef4444',
          fontWeight: '500'
        }}>
          {positive ? '↗' : '↙'} {change}
        </div>
      )}
    </div>
  );

  const ProgressBar = ({ percentage, color = '#3b82f6' }) => (
    <div style={{
      background: '#f1f5f9',
      borderRadius: '8px',
      height: '8px',
      overflow: 'hidden'
    }}>
      <div style={{
        background: color,
        height: '100%',
        width: `${percentage}%`,
        transition: 'width 0.3s ease'
      }} />
    </div>
  );

  return (
    <div style={{ padding: '1rem' }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '2rem'
      }}>
        <h2 style={{
          fontSize: '1.5rem',
          fontWeight: '700',
          color: '#1e293b',
          margin: 0
        }}>
          Analytics Dashboard
        </h2>
        
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            border: '1px solid #d1d5db',
            background: 'white',
            fontSize: '0.875rem',
            color: '#374151',
            cursor: 'pointer'
          }}
        >
          <option value="7days">Last 7 days</option>
          <option value="30days">Last 30 days</option>
          <option value="90days">Last 90 days</option>
          <option value="1year">Last year</option>
        </select>
      </div>

      {/* Overview Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <StatCard
          title="Total Visits"
          value={analytics.overview.totalVisits}
          change="+12.5%"
          positive={true}
        />
        <StatCard
          title="Unique Visitors"
          value={analytics.overview.uniqueVisitors}
          change="+8.3%"
          positive={true}
        />
        <StatCard
          title="Quote Requests"
          value={analytics.overview.quotesReceived}
          change="+15.7%"
          positive={true}
        />
        <StatCard
          title="Conversion Rate"
          value={`${analytics.overview.conversionRate}%`}
          change="+2.1%"
          positive={true}
        />
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '2rem'
      }}>
        {/* Traffic Sources */}
        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{
            fontSize: '1.125rem',
            fontWeight: '600',
            color: '#1e293b',
            marginBottom: '1rem'
          }}>
            Traffic Sources
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {analytics.sources.map((source, index) => (
              <div key={source.name}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '0.5rem'
                }}>
                  <span style={{
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#374151'
                  }}>
                    {source.name}
                  </span>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <span style={{
                      fontSize: '0.875rem',
                      color: '#64748b'
                    }}>
                      {source.visitors.toLocaleString()}
                    </span>
                    <span style={{
                      fontSize: '0.75rem',
                      color: '#64748b',
                      minWidth: '40px',
                      textAlign: 'right'
                    }}>
                      {source.percentage}%
                    </span>
                  </div>
                </div>
                <ProgressBar
                  percentage={source.percentage}
                  color={`hsl(${index * 60}, 70%, 50%)`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Top Pages */}
        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{
            fontSize: '1.125rem',
            fontWeight: '600',
            color: '#1e293b',
            marginBottom: '1rem'
          }}>
            Top Pages
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {analytics.pages.map((page) => (
              <div key={page.path} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '0.75rem',
                background: '#f8fafc',
                borderRadius: '8px'
              }}>
                <div>
                  <div style={{
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#374151'
                  }}>
                    {page.path}
                  </div>
                  <div style={{
                    fontSize: '0.75rem',
                    color: '#64748b'
                  }}>
                    Bounce rate: {page.bounceRate}%
                  </div>
                </div>
                <div style={{
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#1e293b'
                }}>
                  {page.views.toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Device Types */}
        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{
            fontSize: '1.125rem',
            fontWeight: '600',
            color: '#1e293b',
            marginBottom: '1rem'
          }}>
            Device Types
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {analytics.devices.map((device, index) => (
              <div key={device.type}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '0.5rem'
                }}>
                  <span style={{
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#374151'
                  }}>
                    {device.type}
                  </span>
                  <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <span style={{
                      fontSize: '0.875rem',
                      color: '#64748b'
                    }}>
                      {device.users.toLocaleString()}
                    </span>
                    <span style={{
                      fontSize: '0.75rem',
                      color: '#64748b',
                      minWidth: '40px',
                      textAlign: 'right'
                    }}>
                      {device.percentage}%
                    </span>
                  </div>
                </div>
                <ProgressBar
                  percentage={device.percentage}
                  color={['#3b82f6', '#10b981', '#f59e0b'][index]}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Real-time Overview */}
        <div style={{
          background: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{
            fontSize: '1.125rem',
            fontWeight: '600',
            color: '#1e293b',
            marginBottom: '1rem'
          }}>
            Traffic Overview
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.75rem',
              background: '#f0f9ff',
              borderRadius: '8px',
              border: '1px solid #bae6fd'
            }}>
              <span style={{ fontSize: '0.875rem', color: '#0c4a6e' }}>Today</span>
              <span style={{ fontSize: '1rem', fontWeight: '600', color: '#0c4a6e' }}>
                {analytics.traffic.today}
              </span>
            </div>
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.75rem',
              background: '#f8fafc',
              borderRadius: '8px'
            }}>
              <span style={{ fontSize: '0.875rem', color: '#64748b' }}>Yesterday</span>
              <span style={{ fontSize: '1rem', fontWeight: '600', color: '#374151' }}>
                {analytics.traffic.yesterday}
              </span>
            </div>
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.75rem',
              background: '#f0fdf4',
              borderRadius: '8px',
              border: '1px solid #bbf7d0'
            }}>
              <span style={{ fontSize: '0.875rem', color: '#14532d' }}>This Week</span>
              <span style={{ fontSize: '1rem', fontWeight: '600', color: '#14532d' }}>
                {analytics.traffic.thisWeek}
              </span>
            </div>
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.75rem',
              background: '#f8fafc',
              borderRadius: '8px'
            }}>
              <span style={{ fontSize: '0.875rem', color: '#64748b' }}>Last Week</span>
              <span style={{ fontSize: '1rem', fontWeight: '600', color: '#374151' }}>
                {analytics.traffic.lastWeek}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
