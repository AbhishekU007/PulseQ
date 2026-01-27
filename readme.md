# ⚡ PulseQ — Real-Time Distributed Event Processing Engine

PulseQ is a lightweight distributed event processing system inspired by modern queue-based architectures (Kafka / SQS / RabbitMQ), built from scratch to deeply understand how real production systems work internally.

It supports event ingestion, retry handling, dead-letter queues, and real-time observability through a live dashboard powered by WebSockets.

## 🚀 What PulseQ Solves

In real systems:

* Events can fail

* Networks are unreliable

* Consumers crash

* Some messages must be retried

* Some must be permanently stored for inspection

PulseQ simulates and implements this entire lifecycle.

## 🧠 Core Concepts Implemented
### ✅ Event Queue System

* Redis-backed queues

* FIFO-style processing

* Decoupled producers and consumers

### 🔁 Retry Mechanism

* Automatic retries for failed events

* Configurable retry limit (3 attempts)

* Retry queue separated from main queue

### 💀 Dead Letter Queue (DLQ)

* Events failing after max retries are:

    * Persisted to PostgreSQL

    * Stored with failure metadata

    * Viewable from the dashboard

### ⚙️ Worker-Based Processing

* Scheduled consumers using Spring Scheduler

* Simulated random failures

* Independent retry processor

### 📡 Real-Time Metrics Streaming

* Live system metrics via WebSocket (STOMP)

* Instant UI updates without polling

### 📊 Observability Dashboard

* Live counters:

    * Received

    * Processed

    * Retried

    * Dead events

* Queue sizes:

    * Main queue

    * Retry queue

    * Dead queue

* Real-time charts & system panels

## 🧩 System Architecture

```text
Frontend (React + Vite)
        │
        │ WebSocket (STOMP)
        │ REST APIs
        ▼
Backend (Spring Boot)
        │
        ├── Event Controller
        │       └── receives events
        │
        ├── Event Worker
        │       ├── main queue consumer
        │       ├── retry handler
        │       └── dead-letter handler
        │
        ├── Metrics Service
        │       └── atomic counters
        │
        ├── Redis
        │       ├── main queue
        │       ├── retry queue
        │       └── dead queue
        │
        └── PostgreSQL
                └── dead_event table
```

## 🛠 Tech Stack
Backend

* Java 21

* Spring Boot 3

* Spring Web

* Spring Data JPA

* Spring WebSocket (STOMP)

* Redis

* PostgreSQL

* Docker & Docker Compose

Frontend

* React (Vite)

* Tailwind CSS

* Framer Motion

* Axios

* SockJS

* STOMP.js

## 📁 Project Structure
Backend
```text
backend/
├── controller/
│   └── EventController.java
├── metrics/
│   └── MetricsService.java
├── model/
│   ├── EventPayload.java
│   └── DeadEvent.java
├── queue/
│   └── RedisQueueService.java
├── repository/
│   └── DeadEventRepository.java
├── websocket/
│   ├── MetricsSocket.java
│   └── WebSocketConfig.java
├── worker/
│   └── EventWorker.java
└── PulseQApplication.java
```
Frontend
```text
frontend/
├── pages/
│   ├── Landing.jsx
│   ├── Dashboard.jsx
│   └── dashboard/
│       ├── Overview.jsx
│       ├── Queues.jsx
│       ├── DeadEvents.jsx
│       ├── System.jsx
│       └── DashboardLayout.jsx
├── components/
│   ├── MetricsGrid.jsx
│   ├── StatCard.jsx
│   ├── Sidebar.jsx
│   ├── Navbar.jsx
│   ├── api.js
│   └── socket.js
└── app/router.jsx
```
🔄 Event Lifecycle
```
Client
  │
  ▼
POST /events
  │
  ▼
Redis MAIN queue
  │
  ▼
EventWorker.consume()
  │
  ├─ success → processed++
  │
  └─ failure
       │
       ├─ retry <= 3 → retry queue
       │
       └─ retry > 3 → dead queue + PostgreSQL
```
## 📊 Live Metrics Tracked
| Metric | Description |
| :--- | :--- |
| received | Total events accepted |
| processed | Successfully processed |
| retried | Retry attempts |
| dead | Permanently failed |
| mainQueueSize | Redis main queue |
| retryQueueSize | Retry queue |
| deadQueueSize | Dead queue |

All metrics update live via WebSocket.

## 🖥 Dashboard Features
**Landing Page**

* Animated intro

* Project overview

* Entry into dashboard

**Overview**

* Live metrics counters

* Real-time updates

**Queues**

* Queue depth visualization

* Processing behavior insight

**Dead Events**

* Persisted failures from PostgreSQL

* Retry count and payload inspection

**System**

* WebSocket connection state

* Queue health

* Worker activity

## 🐳 Running the Project
### 1️⃣ Start Infrastructure
```
docker compose up -d
```

Starts:

* Redis

* PostgreSQL

### 2️⃣ Run Backend
```
cd backend
mvn spring-boot:run
```

Backend runs on:
```
http://localhost:8080
```

### 3️⃣ Run Frontend
```
cd frontend
npm install
npm run dev
```

Frontend runs on:
```
http://localhost:5173
```

## 🔌 API Endpoints
### Send Event
```
POST /events
```

Example payload:
```
{
  "type": "LOGIN",
  "payload": {
    "userId": 123
  }
}
```
### WebSocket
```
ws://localhost:8080/ws
```

Topic:
```
/topic/metrics
```
## 🧠 What This Project Demonstrates

* Event-driven architecture

* Queue-based systems

* Retry & DLQ design patterns

* Redis usage beyond caching

* Real-time WebSocket communication

* Backend observability

* System design thinking

* Production-grade structure

## 📈 Why PulseQ Exists

Most tutorials show how to use Kafka.

PulseQ shows how Kafka-like systems actually work internally.

This project focuses on:

* understanding failure

* retries

* message durability

* metrics

* real-time visibility

## 🔥 Final Notes

PulseQ is not meant to replace Kafka or SQS.

It exists to answer one question:

> “What really happens when an event fails in production?”

Now you know.

## 👨‍💻 Author

Abhishek Upadhyay