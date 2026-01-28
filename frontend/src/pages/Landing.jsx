import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Activity, Zap, RotateCcw, Skull, BarChart3, Database, Eye, TestTube, ArrowRight, CheckCircle, XCircle, Server, Boxes } from 'lucide-react';

// Custom hook for scroll animations
const useInView = (options = {}) => {
  const ref = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.unobserve(entry.target);
      }
    }, {
      threshold: 0.1,
      ...options
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [options]);

  return [ref, isInView];
};

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

  const [pipelineAnimState, setPipelineAnimState] = useState(0);

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

  useEffect(() => {
    const interval = setInterval(() => {
      setPipelineAnimState(prev => (prev + 1) % 4);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  // Scroll animation refs
  const [problemRef, problemInView] = useInView();
  const [pipelineRef, pipelineInView] = useInView();
  const [featuresRef, featuresInView] = useInView();
  const [metricsRef, metricsInView] = useInView();
  const [stackRef, stackInView] = useInView();
  const [diffRef, diffInView] = useInView();
  const [ctaRef, ctaInView] = useInView();

  const handleViewArchitecture = () => {
    stackRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

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
      {/* Hero Section - Split Layout */}
      <div className="relative min-h-screen flex flex-col md:flex-row items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-gray-950 to-violet-950 opacity-70"></div>
        
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(99, 102, 241, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        {/* Left Side - Content */}
        <div className="relative z-10 w-full md:w-1/2 px-6 md:px-12 py-12 md:py-20">
          <div className="max-w-xl md:ml-12">
            <h1 className="text-5xl md:text-7xl font-bold mb-4 md:mb-6">
              <span className="text-white">Pulse</span>
              <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-indigo-400 bg-clip-text text-transparent">Q</span>
            </h1>
            <p className="text-xl md:text-3xl text-indigo-300 mb-6 md:mb-8 font-light">
              Where distributed systems come alive.
            </p>
            
            <div className="text-base md:text-lg text-gray-400 mb-8 md:mb-12">
              <p className="opacity-0" style={{ animation: `fadeIn 0.5s ease-out 0s forwards` }}>
                A real-time event processing engine that simulates production-scale failures, retries, queues, and metrics — exactly how modern systems behave.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 flex-wrap">
              <Link to="/dashboard" className="w-full sm:w-auto">
                <button className="w-full px-6 md:px-8 py-3 md:py-4 bg-indigo-600 hover:bg-indigo-500 rounded-lg font-semibold text-base md:text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/50">
                  Enter Live Dashboard <ArrowRight size={18} className="hidden sm:block" />
                </button>
              </Link>
              <button 
                onClick={handleViewArchitecture}
                className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 bg-gray-800 hover:bg-gray-700 rounded-lg font-semibold text-base md:text-lg transition-all duration-300 border border-gray-700"
              >
                View Architecture
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - Animated Graphic */}
        <div className="relative z-10 w-full md:w-1/2 h-auto md:h-full flex items-center justify-center px-4 md:px-12 py-12 md:py-0">
          <svg className="w-full h-auto max-w-sm md:max-w-lg" viewBox="0 0 500 600" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="flowGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#a855f7" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#6366f1" stopOpacity="0.8" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <filter id="softGlow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>

            {/* Left Column - Events In */}
            <g className="event-queue">
              <circle cx="50" cy="100" r="30" fill="#6366f1" opacity="0.7" filter="url(#glow)" />
              <circle cx="50" cy="200" r="30" fill="#a855f7" opacity="0.5" filter="url(#glow)" />
              <circle cx="50" cy="300" r="30" fill="#6366f1" opacity="0.6" filter="url(#glow)" />
              <circle cx="50" cy="400" r="30" fill="#a855f7" opacity="0.5" filter="url(#glow)" />
              <circle cx="50" cy="500" r="30" fill="#6366f1" opacity="0.6" filter="url(#glow)" />
            </g>

            {/* Center Processing Box */}
            <g>
              <rect x="150" y="150" width="200" height="300" rx="15" fill="none" stroke="url(#flowGrad)" strokeWidth="2" opacity="0.8" />
              <text x="250" y="310" textAnchor="middle" fill="#c4b5fd" fontSize="14" fontWeight="bold" opacity="0.8">
                Processing
              </text>
              <text x="250" y="330" textAnchor="middle" fill="#a78bfa" fontSize="12" opacity="0.6">
                Pool
              </text>
            </g>

            {/* Right Column - Outcomes */}
            <g>
              <circle cx="430" cy="150" r="28" fill="#10b981" opacity="0.6" filter="url(#glow)" />
              <text x="430" y="160" textAnchor="middle" fill="#10b981" fontSize="16" fontWeight="bold">✓</text>
              
              <circle cx="430" cy="300" r="28" fill="#f59e0b" opacity="0.6" filter="url(#glow)" />
              <text x="430" y="310" textAnchor="middle" fill="#f59e0b" fontSize="16" fontWeight="bold">↻</text>
              
              <circle cx="430" cy="450" r="28" fill="#ef4444" opacity="0.6" filter="url(#glow)" />
              <text x="430" y="460" textAnchor="middle" fill="#ef4444" fontSize="16" fontWeight="bold">✕</text>
            </g>

            {/* Animated Flow Lines */}
            <g stroke="url(#flowGrad)" strokeWidth="2" fill="none" opacity="0.6">
              <path d="M 80 100 Q 115 125 150 180" strokeDasharray="8,4">
                <animate attributeName="stroke-dashoffset" values="0;-12" dur="2s" repeatCount="indefinite" />
              </path>
              
              <path d="M 80 300 Q 115 300 150 300" strokeDasharray="8,4">
                <animate attributeName="stroke-dashoffset" values="0;-12" dur="2s" repeatCount="indefinite" />
              </path>
              
              <path d="M 80 500 Q 115 425 150 420" strokeDasharray="8,4">
                <animate attributeName="stroke-dashoffset" values="0;-12" dur="2s" repeatCount="indefinite" />
              </path>

              <path d="M 350 200 Q 390 175 402 150" stroke="#10b981" strokeDasharray="8,4" opacity="0.7">
                <animate attributeName="stroke-dashoffset" values="0;-12" dur="2s" repeatCount="indefinite" />
              </path>
              
              <path d="M 350 300 Q 390 300 402 300" stroke="#f59e0b" strokeDasharray="8,4" opacity="0.7">
                <animate attributeName="stroke-dashoffset" values="0;-12" dur="2s" repeatCount="indefinite" />
              </path>
              
              <path d="M 350 400 Q 390 425 402 450" stroke="#ef4444" strokeDasharray="8,4" opacity="0.7">
                <animate attributeName="stroke-dashoffset" values="0;-12" dur="2s" repeatCount="indefinite" />
              </path>
            </g>

            <text x="50" y="570" textAnchor="middle" fill="#9ca3af" fontSize="12" opacity="0.6">
              Events
            </text>
            <text x="250" y="570" textAnchor="middle" fill="#9ca3af" fontSize="12" opacity="0.6">
              Workers
            </text>
            <text x="430" y="570" textAnchor="middle" fill="#9ca3af" fontSize="12" opacity="0.6">
              Outcomes
            </text>
          </svg>
        </div>
      </div>

      {/* Problem Section */}
      <div 
        ref={problemRef}
        className="py-24 px-6 bg-gradient-to-b from-gray-950 to-gray-900"
        style={{
          opacity: problemInView ? 1 : 0,
          transform: problemInView ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
        }}
      >
        <div className="w-full mx-auto max-w-6xl">
          <h2 
            className="text-4xl font-bold mb-16 text-center"
            style={{
              opacity: problemInView ? 1 : 0,
              transform: problemInView ? 'translateY(0)' : 'translateY(-20px)',
              transition: 'all 0.8s ease-out'
            }}
          >
            Why PulseQ Exists
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Side - Problems */}
            <div 
              className="p-6 bg-gradient-to-br from-red-500/10 to-red-500/5 border border-red-500/30 rounded-xl"
              style={{
                opacity: problemInView ? 1 : 0,
                transform: problemInView ? 'translateX(0)' : 'translateX(-50px)',
                transition: 'all 0.8s ease-out 0.1s'
              }}
            >
              <h3 className="text-2xl font-bold text-red-400 mb-4 flex items-center gap-2">
                <div className="w-1 h-6 bg-red-500 rounded-full"></div>
                Modern systems must handle:
              </h3>
              <ul className="space-y-3">
                {["Millions of asynchronous events", "Unpredictable failures", "Partial outages", "Retry storms", "Queue backpressure", "Dead-letter accumulation"].map((item, i) => (
                  <li 
                    key={i} 
                    className="flex items-center gap-2 text-gray-300 group"
                    style={{
                      opacity: problemInView ? 1 : 0,
                      transform: problemInView ? 'translateX(0)' : 'translateX(-30px)',
                      transition: `all 0.6s ease-out ${0.2 + i * 0.08}s`
                    }}
                  >
                    <XCircle size={16} className="text-red-400 flex-shrink-0 group-hover:scale-110 transition-transform" /> 
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right Side - Key Insights */}
            <div 
              className="p-6 bg-gradient-to-br from-indigo-500/10 to-indigo-500/5 border border-indigo-500/30 rounded-xl"
              style={{
                opacity: problemInView ? 1 : 0,
                transform: problemInView ? 'translateX(0)' : 'translateX(50px)',
                transition: 'all 0.8s ease-out 0.2s'
              }}
            >
              <h3 className="text-2xl font-bold text-indigo-400 mb-4 flex items-center gap-2">
                <div className="w-1 h-6 bg-indigo-500 rounded-full"></div>
                Key Insights:
              </h3>
              <ul className="space-y-3">
                {['"Not every event succeeds."', '"Retries can overwhelm systems."', '"Failures must be isolated."', '"Observability is not optional."', '"Testing is incomplete without simulation."', '"Real systems need fault tolerance."'].map((item, i) => (
                  <li 
                    key={i} 
                    className="flex items-center gap-2 text-gray-300 group"
                    style={{
                      opacity: problemInView ? 1 : 0,
                      transform: problemInView ? 'translateX(0)' : 'translateX(30px)',
                      transition: `all 0.6s ease-out ${0.2 + i * 0.08}s`
                    }}
                  >
                    <CheckCircle size={16} className="text-indigo-400 flex-shrink-0 group-hover:scale-110 transition-transform" /> 
                    <span className="text-indigo-300 italic">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Pipeline Section */}
      <div 
        ref={pipelineRef}
        className="py-20 px-6 bg-gray-900 relative overflow-hidden"
      >
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-10" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(99, 102, 241, 0.3) 1px, transparent 0)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="max-w-5xl mx-auto relative z-10">
          <div 
            className="text-center mb-20"
            style={{
              opacity: pipelineInView ? 1 : 0,
              transform: pipelineInView ? 'translateY(0)' : 'translateY(-30px)',
              transition: 'all 0.8s ease-out'
            }}
          >
            <h2 className="text-5xl font-bold mb-6">Event Processing Pipeline</h2>
            <p className="text-xl text-gray-400">Watch events flow through the system in real-time</p>
          </div>
          
          <div 
            className="relative"
            style={{
              opacity: pipelineInView ? 1 : 0,
              transform: pipelineInView ? 'scale(1)' : 'scale(0.95)',
              transition: 'all 0.8s ease-out 0.2s'
            }}
          >
            <div className="space-y-0">
              <PipelineStage title="Client Event" subtitle="HTTP/gRPC ingestion" icon={Server} color="indigo" active={pipelineAnimState === 0} delay={0} inView={pipelineInView} />
              <PipelineConnector active={pipelineAnimState === 0} />
              <PipelineStage title="Redis Main Queue" subtitle={`Depth: ${queueDepth.main} • FIFO ordering`} icon={Database} color="violet" active={pipelineAnimState === 1} delay={0.2} progress={(queueDepth.main / 300) * 100} inView={pipelineInView} />
              <PipelineConnector active={pipelineAnimState === 1} />
              <PipelineStage title="Async Worker Pool" subtitle="Concurrent processing • Load balancing" icon={Boxes} color="blue" active={pipelineAnimState === 2} delay={0.4} inView={pipelineInView} />
              <PipelineConnector active={pipelineAnimState === 2} split={true} />

              <div className="grid grid-cols-3 gap-6 mt-8">
                <OutcomeCard icon={CheckCircle} title="Success" subtitle="Metrics Updated" color="green" active={pipelineAnimState === 3} delay={0.6} inView={pipelineInView} />
                <OutcomeCard icon={RotateCcw} title="Retry (≤3)" subtitle="Exponential Backoff" color="yellow" active={pipelineAnimState === 3} delay={0.7} inView={pipelineInView} />
                <OutcomeCard icon={Skull} title="Dead Letter" subtitle="PostgreSQL Storage" color="red" active={pipelineAnimState === 3} delay={0.8} inView={pipelineInView} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div 
        ref={featuresRef}
        className="py-20 px-6 bg-gradient-to-b from-gray-900 to-gray-950"
      >
        <div className="w-full mx-auto">
          <h2 
            className="text-4xl font-bold mb-16 text-center"
            style={{
              opacity: featuresInView ? 1 : 0,
              transform: featuresInView ? 'translateY(0)' : 'translateY(-20px)',
              transition: 'all 0.8s ease-out'
            }}
          >
            Key Features
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => (
              <div 
                key={i} 
                className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 hover:border-indigo-500/50 transition-all duration-300"
                style={{
                  opacity: featuresInView ? 1 : 0,
                  transform: featuresInView ? 'translateY(0) rotateX(0)' : 'translateY(30px) rotateX(-10deg)',
                  transition: `all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.05}s`,
                  perspective: '1000px'
                }}
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
      <div 
        ref={metricsRef}
        className="py-20 px-6 bg-gray-950"
      >
        <div className="w-full mx-auto">
          <h2 
            className="text-4xl font-bold mb-16 text-center"
            style={{
              opacity: metricsInView ? 1 : 0,
              transform: metricsInView ? 'translateY(0)' : 'translateY(-20px)',
              transition: 'all 0.8s ease-out'
            }}
          >
            Live Metrics
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Events Received", value: metrics.received.toLocaleString(), color: "indigo" },
              { title: "Events Processed", value: metrics.processed.toLocaleString(), color: "green" },
              { title: "Retries Triggered", value: metrics.retries.toLocaleString(), color: "yellow" },
              { title: "Dead Events", value: metrics.dead.toLocaleString(), color: "red" }
            ].map((card, i) => (
              <div 
                key={i}
                style={{
                  opacity: metricsInView ? 1 : 0,
                  transform: metricsInView ? 'translateY(0)' : 'translateY(40px)',
                  transition: `all 0.6s ease-out ${i * 0.1}s`
                }}
              >
                <MetricCard title={card.title} value={card.value} color={card.color} />
              </div>
            ))}
          </div>
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            {[
              { title: "Main Queue Depth", value: queueDepth.main, max: 300, color: "violet" },
              { title: "Retry Queue Depth", value: queueDepth.retry, max: 100, color: "yellow" }
            ].map((card, i) => (
              <div 
                key={i}
                style={{
                  opacity: metricsInView ? 1 : 0,
                  transform: metricsInView ? 'translateY(0)' : 'translateY(40px)',
                  transition: `all 0.6s ease-out ${0.4 + i * 0.1}s`
                }}
              >
                <QueueDepthCard title={card.title} value={card.value} max={card.max} color={card.color} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stack */}
      <div 
        ref={stackRef}
        className="py-20 px-6 bg-gradient-to-b from-gray-950 to-gray-900"
      >
        <div className="w-full mx-auto">
          <h2 
            className="text-4xl font-bold mb-16 text-center"
            style={{
              opacity: stackInView ? 1 : 0,
              transform: stackInView ? 'translateY(0)' : 'translateY(-20px)',
              transition: 'all 0.8s ease-out'
            }}
          >
            Architecture Stack
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Backend", items: stack.backend, color: "indigo", index: 0 },
              { title: "Frontend", items: stack.frontend, color: "violet", index: 1 },
              { title: "Infrastructure", items: stack.infra, color: "blue", index: 2 }
            ].map((card, i) => (
              <div 
                key={i}
                style={{
                  opacity: stackInView ? 1 : 0,
                  transform: stackInView ? 'translateY(0) rotateY(0)' : 'translateY(30px) rotateY(-15deg)',
                  transition: `all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) ${i * 0.15}s`,
                  perspective: '1000px'
                }}
              >
                <StackCard title={card.title} items={card.items} color={card.color} index={card.index} inView={stackInView} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* What Makes It Different */}
      <div 
        ref={diffRef}
        className="py-20 px-6 bg-gray-900"
      >
        <div className="w-full mx-auto max-w-6xl">
          <h2 
            className="text-4xl font-bold mb-16 text-center"
            style={{
              opacity: diffInView ? 1 : 0,
              transform: diffInView ? 'translateY(0)' : 'translateY(-20px)',
              transition: 'all 0.8s ease-out'
            }}
          >
            What Makes PulseQ Different
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Not A - Left Side */}
            <div 
              className="p-6 bg-gradient-to-br from-red-500/10 to-red-500/5 border border-red-500/30 rounded-xl"
              style={{
                opacity: diffInView ? 1 : 0,
                transform: diffInView ? 'translateX(0)' : 'translateX(-50px)',
                transition: 'all 0.8s ease-out 0.1s'
              }}
            >
              <h3 className="text-2xl font-bold text-red-400 mb-4 flex items-center gap-2">
                <div className="w-1 h-6 bg-red-500 rounded-full"></div>
                Not a:
              </h3>
              <ul className="space-y-3">
                {["CRUD app", "REST demo", "Basic queue"].map((item, i) => (
                  <li 
                    key={i} 
                    className="flex items-center gap-2 text-gray-300 group"
                    style={{
                      opacity: diffInView ? 1 : 0,
                      transform: diffInView ? 'translateX(0)' : 'translateX(-30px)',
                      transition: `all 0.6s ease-out ${0.2 + i * 0.1}s`
                    }}
                  >
                    <XCircle size={16} className="text-red-400 flex-shrink-0 group-hover:scale-110 transition-transform" /> 
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Simulates - Right Side */}
            <div 
              className="p-6 bg-gradient-to-br from-green-500/10 to-green-500/5 border border-green-500/30 rounded-xl"
              style={{
                opacity: diffInView ? 1 : 0,
                transform: diffInView ? 'translateX(0)' : 'translateX(50px)',
                transition: 'all 0.8s ease-out 0.2s'
              }}
            >
              <h3 className="text-2xl font-bold text-green-400 mb-4 flex items-center gap-2">
                <div className="w-1 h-6 bg-green-500 rounded-full"></div>
                PulseQ simulates:
              </h3>
              <ul className="space-y-3">
                {["Distributed system behavior", "Retry storms", "Message loss", "Backpressure", "Failure analytics", "Real production patterns"].map((item, i) => (
                  <li 
                    key={i} 
                    className="flex items-center gap-2 text-gray-300 group"
                    style={{
                      opacity: diffInView ? 1 : 0,
                      transform: diffInView ? 'translateX(0)' : 'translateX(30px)',
                      transition: `all 0.6s ease-out ${0.2 + i * 0.1}s`
                    }}
                  >
                    <CheckCircle size={16} className="text-green-400 flex-shrink-0 group-hover:scale-110 transition-transform" /> 
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div 
        ref={ctaRef}
        className="py-26 px-6 bg-gradient-to-br from-indigo-950 via-gray-950 to-violet-950 relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, rgba(99, 102, 241, 0.3) 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}></div>
        </div>
        <div 
          className="w-full mx-auto text-center relative z-10"
          style={{
            opacity: ctaInView ? 1 : 0,
            transform: ctaInView ? 'scale(1)' : 'scale(0.9)',
            transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)'
          }}
        >
          <h2 className="text-5xl font-bold mb-8">See the system live.</h2>
          <div className="flex flex-wrap gap-4 justify-center">
            {[
              { label: "Open Live Dashboard", color: "bg-indigo-600 hover:bg-indigo-500 shadow-lg shadow-indigo-500/50", path: "/dashboard" },
              { label: "View Dead Event Queue", color: "bg-violet-600 hover:bg-violet-500 shadow-lg shadow-indigo-500/50", path: "/dashboard/dead" },
              { label: "View System Status", color: "bg-red-600 hover:bg-red-500 shadow-lg shadow-indigo-500/50", path: "/dashboard/system" }
            ].map((btn, i) => (
              <Link
                key={i}
                to={btn.path}
              >
                <button 
                  className={`px-8 py-4 ${btn.color} rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105`}
                  style={{
                    opacity: ctaInView ? 1 : 0,
                    transform: ctaInView ? 'translateY(0)' : 'translateY(20px)',
                    transition: `all 0.6s ease-out ${0.1 + i * 0.1}s`
                  }}
                >
                  {btn.label}
                </button>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0% { transform: scale(0); opacity: 0.5; }
          100% { transform: scale(2); opacity: 0; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
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
  const bgColorMap = { violet: 'bg-violet-500', yellow: 'bg-yellow-500' };
  const percentage = (value / max) * 100;
  return (
    <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-400">{title}</div>
        <div className="text-2xl font-bold text-gray-100">{value}</div>
      </div>
      <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
        <div className={`h-full ${bgColorMap[color]} transition-all duration-500`} style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  );
};

const PipelineStage = ({ title, subtitle, icon: Icon, color, active, delay, progress }) => {
  const colorMap = {
    indigo: { gradient: 'from-indigo-500/20 to-indigo-500/5 border-indigo-500/50', bg: 'bg-indigo-500/20', text: 'text-indigo-400', progressBg: 'bg-indigo-500' },
    violet: { gradient: 'from-violet-500/20 to-violet-500/5 border-violet-500/50', bg: 'bg-violet-500/20', text: 'text-violet-400', progressBg: 'bg-violet-500' },
    blue: { gradient: 'from-blue-500/20 to-blue-500/5 border-blue-500/50', bg: 'bg-blue-500/20', text: 'text-blue-400', progressBg: 'bg-blue-500' }
  };
  const colors = colorMap[color];

  return (
    <div
      className={`relative p-8 bg-gradient-to-br ${colors.gradient} border-2 rounded-2xl transition-all duration-700 opacity-0`}
      style={{
        animation: `fadeInUp 0.8s ease-out ${delay}s forwards`,
        transform: active ? 'scale(1.02)' : 'scale(1)',
        boxShadow: active ? '0 0 30px rgba(99, 102, 241, 0.3)' : 'none'
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-4">
          <div className={`p-3 ${colors.bg} rounded-xl`}>
            <Icon size={28} className={colors.text} />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-gray-100">{title}</h3>
            <p className="text-gray-400 text-sm mt-1">{subtitle}</p>
          </div>
        </div>
        {active && <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>}
      </div>
      {progress !== undefined && (
        <div className="mt-4 w-full bg-gray-700/30 rounded-full h-2 overflow-hidden">
          <div className={`h-full ${colors.progressBg} transition-all duration-500`} style={{ width: `${progress}%` }}></div>
        </div>
      )}
    </div>
  );
};

const PipelineConnector = ({ active, split }) => {
  if (split) {
    return (
      <div className="flex justify-center my-6">
        <div className="flex gap-4">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="w-0.5 h-12 bg-gradient-to-b from-blue-500 to-gray-700 transition-all duration-500"
              style={{ opacity: active ? 1 : 0.3, boxShadow: active ? '0 0 10px rgba(59, 130, 246, 0.5)' : 'none' }}
            ></div>
          ))}
        </div>
      </div>
    );
  }
  return (
    <div className="flex justify-center my-4">
      <div
        className="w-0.5 h-16 bg-gradient-to-b from-indigo-500 via-violet-500 to-indigo-500 transition-all duration-500"
        style={{ opacity: active ? 1 : 0.3, boxShadow: active ? '0 0 10px rgba(99, 102, 241, 0.5)' : 'none' }}
      ></div>
    </div>
  );
};

const OutcomeCard = ({ icon: Icon, title, subtitle, color, active, delay }) => {
  const colorMap = {
    green: { gradient: 'from-green-500/20 to-green-500/5 border-green-500/50', text: 'text-green-300' },
    yellow: { gradient: 'from-yellow-500/20 to-yellow-500/5 border-yellow-500/50', text: 'text-yellow-300' },
    red: { gradient: 'from-red-500/20 to-red-500/5 border-red-500/50', text: 'text-red-300' }
  };
  const colors = colorMap[color];

  return (
    <div
      className={`p-6 bg-gradient-to-br ${colors.gradient} border-2 rounded-xl transition-all duration-700 opacity-0`}
      style={{
        animation: `fadeInUp 0.8s ease-out ${delay}s forwards`,
        transform: active ? 'scale(1.05)' : 'scale(1)',
        boxShadow: active ? '0 0 20px rgba(99, 102, 241, 0.2)' : 'none'
      }}
    >
      <Icon className={`mx-auto mb-3 ${colors.text}`} size={32} />
      <h4 className="text-xl font-bold text-center text-gray-100">{title}</h4>
      <p className="text-sm text-gray-400 text-center mt-2">{subtitle}</p>
    </div>
  );
};

const StackCard = ({ title, items, color, index }) => {
  const colorMap = {
    indigo: { text: 'text-indigo-300', bar: 'bg-indigo-500', dot: 'bg-indigo-400' },
    violet: { text: 'text-violet-300', bar: 'bg-violet-500', dot: 'bg-violet-400' },
    blue: { text: 'text-blue-300', bar: 'bg-blue-500', dot: 'bg-blue-400' }
  };
  const colors = colorMap[color];

  return (
    <div
      className="p-8 bg-gray-800/40 backdrop-blur-sm border border-gray-700/50 rounded-2xl hover:border-gray-600 transition-all duration-500 opacity-0"
      style={{ animation: `fadeInUp 0.8s ease-out ${index * 0.2}s forwards` }}
    >
      <h3 className={`text-2xl font-bold mb-6 ${colors.text} flex items-center gap-3`}>
        <div className={`w-1 h-8 ${colors.bar} rounded-full`}></div>
        {title}
      </h3>
      <ul className="space-y-3">
        {items.map((item, i) => (
          <li key={i} className="text-gray-300 flex items-center gap-3 group">
            <div className={`w-2 h-2 ${colors.dot} rounded-full group-hover:scale-150 transition-transform`}></div>
            <span className="group-hover:text-gray-100 transition-colors">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PulseQLanding;