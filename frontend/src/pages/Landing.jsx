import React, { useState, useEffect } from 'react';
import { Activity, Zap, RotateCcw, Skull, BarChart3, Database, Eye, TestTube, ArrowRight, CheckCircle, XCircle, Clock } from 'lucide-react';

const PulseQLanding = () => {
  const [metrics, setMetrics] = useState({
    received: 2847392,
    processed: 2845018,
    retries: 1891,
    dead: 483
  });

  const [queueDepth, setQueueDepth] = useState({
    main: 127,
    retry: 34
  });

  const [flowingDots, setFlowingDots] = useState([]);

  // Animated metrics
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        received: prev.received + Math.floor(Math.random() * 50),
        processed: prev.processed + Math.floor(Math.random() * 48),
        retries: prev.retries + Math.floor(Math.random() * 3),
        dead: prev.dead + Math.floor(Math.random() * 2)
      }));

      setQueueDepth(prev => ({
        main: Math.max(50, Math.min(300, prev.main + Math.floor(Math.random() * 20) - 10)),
        retry: Math.max(10, Math.min(100, prev.retry + Math.floor(Math.random() * 10) - 5))
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  // Flowing particles
  useEffect(() => {
    const interval = setInterval(() => {
      setFlowingDots(prev => {
        const newDots = [...prev.filter(d => d.progress < 100)];
        if (Math.random() > 0.3) {
          newDots.push({ id: Date.now(), progress: 0 });
        }
        return newDots.map(d => ({ ...d, progress: d.progress + 2 }));
      });
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const features = [
    { icon: Zap, title: "High-throughput async processing", desc: "Handle millions of events concurrently" },
    { icon: RotateCcw, title: "Automatic retry handling", desc: "Configurable retry strategies with exponential backoff" },
    { icon: Skull, title: "Dead-letter queue persistence", desc: "PostgreSQL storage for failed events" },
    { icon: BarChart3, title: "Real-time metrics via WebSockets", desc: "STOMP protocol for live system state" },
    { icon: Activity, title: "Queue depth tracking", desc: "Monitor backpressure and throughput" },
    { icon: TestTube, title: "Failure simulation engine", desc: "Test retry storms and edge cases" },
    { icon: Eye, title: "Dead event inspection", desc: "Analyze failure patterns and causes" },
    { icon: Database, title: "System observability layer", desc: "Complete visibility into event lifecycle" }
  ];

  const stack = {
    backend: ["Spring Boot", "Redis", "PostgreSQL", "WebSockets (STOMP)", "Scheduled Workers"],
    frontend: ["React", "Vite", "Tailwind CSS", "Recharts", "Framer Motion"],
    infra: ["Docker Compose", "Redis Queues", "DLQ Storage", "Metrics Streaming"]
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 overflow-x-hidden">
      {/* Hero Section */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-gray-950 to-violet-950 opacity-70"></div>
        
        {/* Animated background grid */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Pulse waves */}
        <div className="absolute inset-0 flex items-center justify-center">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="absolute w-96 h-96 border border-indigo-500 rounded-full opacity-20"
              style={{
                animation: `pulse 3s ease-out infinite ${i * 1}s`
              }}
            ></div>
          ))}
        </div>

        <div className="relative z-10 text-center px-6">
          <h1 className="text-7xl font-bold mb-6 bg-gradient-to-r from-indigo-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent">
            PulseQ
          </h1>
          <p className="text-3xl text-indigo-300 mb-8 font-light">
            Real-Time Distributed Event Processing Engine
          </p>
          
          <div className="text-lg text-gray-400 mb-12 space-y-2">
            {["Retries.", "Dead-letter queues.", "Live metrics.", "Failure simulation.", "Observability."].map((text, i) => (
              <div
                key={i}
                className="opacity-0"
                style={{
                  animation: `fadeIn 0.5s ease-out ${i * 0.3}s forwards`
                }}
              >
                {text}
              </div>
            ))}
          </div>

          <div className="flex gap-4 justify-center">
            <button className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-2 shadow-lg shadow-indigo-500/50">
              Enter Live Dashboard <ArrowRight size={20} />
            </button>
            <button className="px-8 py-4 bg-gray-800 hover:bg-gray-700 rounded-lg font-semibold text-lg transition-all duration-300 border border-gray-700">
              View Architecture
            </button>
          </div>
        </div>
      </div>

      {/* Problem Section */}
      <div className="py-24 px-6 bg-gradient-to-b from-gray-950 to-gray-900">
        <div className="mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">Why PulseQ Exists</h2>
          <div className="grid md:grid-cols-2 gap-8 text-gray-300">
            <div className="space-y-4">
              <p className="text-xl mb-6 text-gray-400">Modern systems must handle:</p>
              <ul className="space-y-3 text-lg">
                <li className="flex items-start gap-3">
                  <XCircle className="text-red-400 mt-1 flex-shrink-0" size={20} />
                  <span>Millions of asynchronous events</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="text-red-400 mt-1 flex-shrink-0" size={20} />
                  <span>Unpredictable failures</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="text-red-400 mt-1 flex-shrink-0" size={20} />
                  <span>Partial outages</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="text-red-400 mt-1 flex-shrink-0" size={20} />
                  <span>Retry storms</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="text-red-400 mt-1 flex-shrink-0" size={20} />
                  <span>Queue backpressure</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="text-red-400 mt-1 flex-shrink-0" size={20} />
                  <span>Dead-letter accumulation</span>
                </li>
              </ul>
            </div>
            <div className="space-y-6 bg-gray-800/50 p-8 rounded-lg border border-gray-700">
              <p className="text-xl text-indigo-300 font-semibold">"Not every event succeeds."</p>
              <p className="text-xl text-indigo-300 font-semibold">"Retries can overwhelm systems."</p>
              <p className="text-xl text-indigo-300 font-semibold">"Failures must be isolated."</p>
              <p className="text-xl text-indigo-300 font-semibold">"Observability is not optional."</p>
            </div>
          </div>
        </div>
      </div>

      {/* Pipeline Section */}
      <div className="py-24 px-6 bg-gray-900">
        <div className="w-full mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center">How PulseQ Works</h2>
          
          <div className="relative">
            {/* Flowing dots */}
            {flowingDots.map(dot => (
              <div
                key={dot.id}
                className="absolute w-2 h-2 bg-indigo-400 rounded-full shadow-lg shadow-indigo-400/50"
                style={{
                  left: '50%',
                  top: `${dot.progress}%`,
                  transform: 'translateX(-50%)',
                  transition: 'top 0.05s linear'
                }}
              ></div>
            ))}

            <div className="space-y-8">
              {/* Client Event */}
              <div className="bg-indigo-900/30 border border-indigo-500/50 rounded-lg p-6 text-center">
                <div className="text-xl font-semibold text-indigo-300">Client Event</div>
              </div>

              <div className="flex justify-center">
                <div className="w-0.5 h-12 bg-gradient-to-b from-indigo-500 to-violet-500"></div>
              </div>

              {/* Redis Queue */}
              <div className="bg-violet-900/30 border border-violet-500/50 rounded-lg p-6 text-center relative overflow-hidden">
                <div className="text-xl font-semibold text-violet-300">Redis Main Queue</div>
                <div className="text-sm text-gray-400 mt-2">Depth: {queueDepth.main}</div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-violet-500/20">
                  <div className="h-full bg-violet-500" style={{ width: `${Math.min(100, (queueDepth.main / 300) * 100)}%` }}></div>
                </div>
              </div>

              <div className="flex justify-center">
                <div className="w-0.5 h-12 bg-gradient-to-b from-violet-500 to-indigo-500"></div>
              </div>

              {/* Worker Pool */}
              <div className="bg-indigo-900/30 border border-indigo-500/50 rounded-lg p-6 text-center">
                <div className="text-xl font-semibold text-indigo-300">Worker Pool</div>
              </div>

              <div className="flex justify-center">
                <div className="w-0.5 h-12 bg-gradient-to-b from-indigo-500 to-gray-500"></div>
              </div>

              {/* Outcomes */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-green-900/30 border border-green-500/50 rounded-lg p-4 text-center">
                  <CheckCircle className="mx-auto mb-2 text-green-400" size={24} />
                  <div className="font-semibold text-green-300">Success</div>
                  <div className="text-xs text-gray-400 mt-1">Metrics updated</div>
                </div>
                <div className="bg-yellow-900/30 border border-yellow-500/50 rounded-lg p-4 text-center">
                  <RotateCcw className="mx-auto mb-2 text-yellow-400" size={24} />
                  <div className="font-semibold text-yellow-300">Retry (≤ 3)</div>
                  <div className="text-xs text-gray-400 mt-1">Retry Queue</div>
                </div>
                <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-4 text-center">
                  <Skull className="mx-auto mb-2 text-red-400" size={24} />
                  <div className="font-semibold text-red-300">DLQ</div>
                  <div className="text-xs text-gray-400 mt-1">PostgreSQL</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-24 px-6 bg-gradient-to-b from-gray-900 to-gray-950">
        <div className="w-full mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div
                key={i}
                className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 hover:border-indigo-500/50 transition-all duration-300"
              >
                <feature.icon className="text-indigo-400 mb-4" size={32} />
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Live Metrics */}
      <div className="py-24 px-6 bg-gray-950">
        <div className="w-full mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center">Live Metrics</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard title="Events Received" value={metrics.received.toLocaleString()} color="indigo" />
            <MetricCard title="Events Processed" value={metrics.processed.toLocaleString()} color="green" />
            <MetricCard title="Retries Triggered" value={metrics.retries.toLocaleString()} color="yellow" />
            <MetricCard title="Dead Events" value={metrics.dead.toLocaleString()} color="red" />
          </div>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <QueueDepthCard title="Main Queue Depth" value={queueDepth.main} max={300} color="violet" />
            <QueueDepthCard title="Retry Queue Depth" value={queueDepth.retry} max={100} color="yellow" />
          </div>
        </div>
      </div>

      {/* Stack */}
      <div className="py-24 px-6 bg-gradient-to-b from-gray-950 to-gray-900">
        <div className="w-full mx-auto">
          <h2 className="text-4xl font-bold mb-16 text-center">Architecture Stack</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <StackCard title="Backend" items={stack.backend} color="indigo" />
            <StackCard title="Frontend" items={stack.frontend} color="violet" />
            <StackCard title="Infrastructure" items={stack.infra} color="blue" />
          </div>
        </div>
      </div>

      {/* What Makes It Different */}
      <div className="py-24 px-6 bg-gray-900">
        <div className="w-full mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">What Makes PulseQ Different</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-red-400 mb-4">Not a:</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center gap-2"><XCircle size={16} /> CRUD app</li>
                <li className="flex items-center gap-2"><XCircle size={16} /> REST demo</li>
                <li className="flex items-center gap-2"><XCircle size={16} /> Basic queue</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-green-400 mb-4">PulseQ simulates:</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-400" /> Distributed system behavior</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-400" /> Retry storms</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-400" /> Message loss</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-400" /> Backpressure</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-400" /> Failure analytics</li>
                <li className="flex items-center gap-2"><CheckCircle size={16} className="text-green-400" /> Real production patterns</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-32 px-6 bg-gradient-to-br from-indigo-950 via-gray-950 to-violet-950 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, rgba(99, 102, 241, 0.3) 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}></div>
        </div>
        <div className="w-full mx-auto text-center relative z-10">
          <h2 className="text-5xl font-bold mb-8">See the system live.</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-indigo-500/50">
              Open Live Dashboard
            </button>
            <button className="px-8 py-4 bg-violet-600 hover:bg-violet-500 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105">
              Trigger Test Events
            </button>
            <button className="px-8 py-4 bg-red-600 hover:bg-red-500 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105">
              View Dead Letter Queue
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0% {
            transform: scale(0);
            opacity: 0.5;
          }
          100% {
            transform: scale(2);
            opacity: 0;
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

const MetricCard = ({ title, value, color }) => {
  const colorMap = {
    indigo: { gradient: 'from-indigo-500/20 to-indigo-500/5', border: 'border-indigo-500/50', text: 'text-indigo-300' },
    green: { gradient: 'from-green-500/20 to-green-500/5', border: 'border-green-500/50', text: 'text-green-300' },
    yellow: { gradient: 'from-yellow-500/20 to-yellow-500/5', border: 'border-yellow-500/50', text: 'text-yellow-300' },
    red: { gradient: 'from-red-500/20 to-red-500/5', border: 'border-red-500/50', text: 'text-red-300' }
  };

  const colors = colorMap[color];
  return (
    <div className={`bg-gradient-to-br ${colors.gradient} ${colors.border} border rounded-lg p-6`}>
      <div className="text-sm text-gray-400 mb-2">{title}</div>
      <div className={`text-3xl font-bold ${colors.text}`}>{value}</div>
    </div>
  );
};

const QueueDepthCard = ({ title, value, max, color }) => {
  const bgColorMap = {
    violet: 'bg-violet-500',
    yellow: 'bg-yellow-500'
  };

  const percentage = (value / max) * 100;
  
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-400">{title}</div>
        <div className="text-2xl font-bold text-gray-100">{value}</div>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
        <div
          className={`h-full ${bgColorMap[color]} transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

const StackCard = ({ title, items, color }) => {
  const colorMap = {
    indigo: { text: 'text-indigo-300', dot: 'bg-indigo-400' },
    violet: { text: 'text-violet-300', dot: 'bg-violet-400' },
    blue: { text: 'text-blue-300', dot: 'bg-blue-400' },
    yellow: { text: 'text-yellow-300', dot: 'bg-yellow-400' }
  };

  const colors = colorMap[color];
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
      <h3 className={`text-xl font-semibold mb-4 ${colors.text}`}>{title}</h3>
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li key={i} className="text-gray-300 flex items-center gap-2">
            <div className={`w-1.5 h-1.5 ${colors.dot} rounded-full`}></div>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PulseQLanding;