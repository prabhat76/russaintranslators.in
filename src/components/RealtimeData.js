import React, { useState, useEffect } from 'react';

const RealtimeData = () => {
  const [realtimeStats, setRealtimeStats] = useState({
    activeUsers: 0,
    pageViews: 0,
    newSessions: 0,
    bounceRate: 0
  });
  const [activities, setActivities] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Simulate connecting to real-time data
    setIsConnected(true);
    
    // Simulate initial data
    setRealtimeStats({
      activeUsers: 23,
      pageViews: 156,
      newSessions: 18,
      bounceRate: 34.2
    });

    setActivities([
      {
        id: 1,
        type: 'pageview',
        page: '/',
        location: 'Moscow, Russia',
        timestamp: new Date(Date.now() - 30000),
        device: 'Desktop'
      },
      {
        id: 2,
        type: 'quote',
        page: '/contact',
        location: 'St. Petersburg, Russia',
        timestamp: new Date(Date.now() - 45000),
        device: 'Mobile'
      },
      {
        id: 3,
        type: 'pageview',
        page: '/services',
        location: 'Kazan, Russia',
        timestamp: new Date(Date.now() - 60000),
        device: 'Desktop'
      },
      {
        id: 4,
        type: 'pageview',
        page: '/gallery',
        location: 'Novosibirsk, Russia',
        timestamp: new Date(Date.now() - 90000),
        device: 'Tablet'
      },
      {
        id: 5,
        type: 'quote',
        page: '/contact',
        location: 'Yekaterinburg, Russia',
        timestamp: new Date(Date.now() - 120000),
        device: 'Desktop'
      }
    ]);

    // Simulate real-time updates
    const interval = setInterval(() => {
      // Update stats randomly
      setRealtimeStats(prev => ({
        activeUsers: Math.max(1, prev.activeUsers + Math.floor(Math.random() * 6) - 2),
        pageViews: prev.pageViews + Math.floor(Math.random() * 3),
        newSessions: prev.newSessions + (Math.random() > 0.7 ? 1 : 0),
        bounceRate: Math.max(0, Math.min(100, prev.bounceRate + (Math.random() - 0.5) * 2))
      }));

      // Add new activity occasionally
      if (Math.random() > 0.6) {
        const newActivity = {
          id: Date.now(),
          type: Math.random() > 0.8 ? 'quote' : 'pageview',
          page: ['/', '/services', '/gallery', '/contact'][Math.floor(Math.random() * 4)],
          location: ['Moscow, Russia', 'St. Petersburg, Russia', 'Kazan, Russia', 'Novosibirsk, Russia'][Math.floor(Math.random() * 4)],
          timestamp: new Date(),
          device: ['Desktop', 'Mobile', 'Tablet'][Math.floor(Math.random() * 3)]
        };

        setActivities(prev => [newActivity, ...prev.slice(0, 9)]);
      }
    }, 3000);

    return () => {
      clearInterval(interval);
      setIsConnected(false);
    };
  }, []);

  const getActivityIcon = (type) => {
    switch (type) {
      case 'pageview': return '👁️';
      case 'quote': return '📧';
      default: return '📊';
    }
  };

  const getActivityColor = (type) => {
    switch (type) {
      case 'pageview': return '#3b82f6';
      case 'quote': return '#10b981';
      default: return '#64748b';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now - timestamp) / 1000);
    
    if (diffInSeconds < 60) return `${diffInSeconds}s ago`;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    return `${Math.floor(diffInSeconds / 3600)}h ago`;
  };

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
          Real-time Data
        </h2>
        
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.5rem 1rem',
          background: isConnected ? '#dcfce7' : '#fef2f2',
          color: isConnected ? '#166534' : '#dc2626',
          borderRadius: '20px',
          fontSize: '0.875rem',
          fontWeight: '500'
        }}>
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: isConnected ? '#22c55e' : '#ef4444',
            animation: isConnected ? 'pulse 2s infinite' : 'none'
          }} />
          {isConnected ? 'Live' : 'Disconnected'}
        </div>
      </div>

      {/* Real-time Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            marginBottom: '0.5rem'
          }}>
            {realtimeStats.activeUsers}
          </div>
          <div style={{
            fontSize: '0.875rem',
            opacity: 0.9
          }}>
            Active Users
          </div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
          color: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            marginBottom: '0.5rem'
          }}>
            {realtimeStats.pageViews}
          </div>
          <div style={{
            fontSize: '0.875rem',
            opacity: 0.9
          }}>
            Page Views
          </div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
          color: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            marginBottom: '0.5rem'
          }}>
            {realtimeStats.newSessions}
          </div>
          <div style={{
            fontSize: '0.875rem',
            opacity: 0.9
          }}>
            New Sessions
          </div>
        </div>

        <div style={{
          background: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
          color: 'white',
          padding: '1.5rem',
          borderRadius: '12px',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            marginBottom: '0.5rem'
          }}>
            {realtimeStats.bounceRate.toFixed(1)}%
          </div>
          <div style={{
            fontSize: '0.875rem',
            opacity: 0.9
          }}>
            Bounce Rate
          </div>
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '2rem'
      }}>
        {/* Live Activity Feed */}
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
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            📊 Live Activity Feed
          </h3>
          
          <div style={{
            maxHeight: '400px',
            overflowY: 'auto'
          }}>
            {activities.map((activity) => (
              <div
                key={activity.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0.75rem',
                  borderBottom: '1px solid #f1f5f9',
                  transition: 'background 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#f8fafc'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <div style={{
                  fontSize: '1.25rem',
                  marginRight: '0.75rem'
                }}>
                  {getActivityIcon(activity.type)}
                </div>
                
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '0.25rem'
                  }}>
                    {activity.type === 'pageview' ? 'Page view' : 'Quote request'} on{' '}
                    <span style={{ color: getActivityColor(activity.type) }}>
                      {activity.page}
                    </span>
                  </div>
                  <div style={{
                    fontSize: '0.75rem',
                    color: '#64748b',
                    display: 'flex',
                    gap: '1rem'
                  }}>
                    <span>📍 {activity.location}</span>
                    <span>📱 {activity.device}</span>
                  </div>
                </div>
                
                <div style={{
                  fontSize: '0.75rem',
                  color: '#64748b',
                  textAlign: 'right'
                }}>
                  {formatTimeAgo(activity.timestamp)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Active Users Map Simulation */}
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
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            🌍 Active Users by Location
          </h3>
          
          <div style={{
            background: '#f8fafc',
            borderRadius: '8px',
            padding: '2rem',
            textAlign: 'center',
            marginBottom: '1rem'
          }}>
            <div style={{
              fontSize: '4rem',
              marginBottom: '1rem'
            }}>
              🗺️
            </div>
            <div style={{
              fontSize: '0.875rem',
              color: '#64748b'
            }}>
              Interactive map would be displayed here
            </div>
          </div>
          
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}>
            {[
              { city: 'Moscow', users: 12, percentage: 52.2 },
              { city: 'St. Petersburg', users: 5, percentage: 21.7 },
              { city: 'Kazan', users: 3, percentage: 13.0 },
              { city: 'Novosibirsk', users: 2, percentage: 8.7 },
              { city: 'Others', users: 1, percentage: 4.4 }
            ].map((location) => (
              <div
                key={location.city}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '0.5rem',
                  background: '#f8fafc',
                  borderRadius: '6px'
                }}
              >
                <span style={{
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  color: '#374151'
                }}>
                  {location.city}
                </span>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <span style={{
                    fontSize: '0.875rem',
                    color: '#64748b'
                  }}>
                    {location.users} users
                  </span>
                  <span style={{
                    fontSize: '0.75rem',
                    color: '#64748b'
                  }}>
                    ({location.percentage}%)
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes pulse {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.5;
            }
          }
        `}
      </style>
    </div>
  );
};

export default RealtimeData;
