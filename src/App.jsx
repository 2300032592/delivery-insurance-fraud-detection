import { useState } from 'react'
import './App.css'

function getFraudData(fakeGpsEnabled = false, deviceMismatchEnabled = false, abnormalBehaviorEnabled = false) {
  return {
    fakeGPS: fakeGpsEnabled || Math.random() < 0.15,
    deviceMismatch: deviceMismatchEnabled || Math.random() < 0.12,
    abnormalBehavior: abnormalBehaviorEnabled || Math.random() < 0.1,
  }
}

function calculateRiskScore(fraudData) {
  let score = 0
  if (fraudData.fakeGPS) score += 30
  if (fraudData.deviceMismatch) score += 25
  if (fraudData.abnormalBehavior) score += 20
  return score
}

function getRiskLevel(score) {
  if (score <= 40) return 'LOW'
  if (score <= 70) return 'MEDIUM'
  return 'HIGH'
}

function makeDecision(score) {
  return score > 50 ? 'FLAGGED' : 'APPROVED'
}

export default function App() {
  const [analysisResult, setAnalysisResult] = useState(null)
  const [toggles, setToggles] = useState({
    fakeGPS: false,
    deviceMismatch: false,
    abnormalBehavior: false,
  })

  const handleClaimInsurance = () => {
    const fraudData = getFraudData(
      toggles.fakeGPS,
      toggles.deviceMismatch,
      toggles.abnormalBehavior
    )

    const riskScore = calculateRiskScore(fraudData)
    const riskLevel = getRiskLevel(riskScore)
    const decision = makeDecision(riskScore)

    setAnalysisResult({
      fraudData,
      riskScore,
      riskLevel,
      decision,
      timestamp: new Date().toLocaleTimeString(),
    })
  }

  const handleToggle = (key) => {
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  const riskPercent = analysisResult ? Math.min(analysisResult.riskScore, 100) : 0

  return (
    <div className="app-container">
      <header className="header">
        <h1>Delivery Insurance Fraud Detection</h1>
        <p>Multi-layer risk scoring to catch spoofed and suspicious claims.</p>
      </header>

      <section className="panel">
        <h2>Fraud Simulation</h2>
        <div className="toggles">
          <label>
            <input
              type="checkbox"
              checked={toggles.fakeGPS}
              onChange={() => handleToggle('fakeGPS')}
            />
            Fake GPS
          </label>
          <label>
            <input
              type="checkbox"
              checked={toggles.deviceMismatch}
              onChange={() => handleToggle('deviceMismatch')}
            />
            Device Mismatch
          </label>
          <label>
            <input
              type="checkbox"
              checked={toggles.abnormalBehavior}
              onChange={() => handleToggle('abnormalBehavior')}
            />
            Abnormal Behavior
          </label>
        </div>

        <button className="claim-button" onClick={handleClaimInsurance}>
          Claim Weather Insurance
        </button>
      </section>

      {analysisResult && (
        <section className="panel results">
          <h2>Analysis Result</h2>
          <p className="timestamp">Time: {analysisResult.timestamp}</p>

          <div className="checks">
            <div className={analysisResult.fraudData.fakeGPS ? 'check bad' : 'check good'}>
              GPS Check: {analysisResult.fraudData.fakeGPS ? 'Suspicious' : 'Normal'}
            </div>
            <div className={analysisResult.fraudData.deviceMismatch ? 'check bad' : 'check good'}>
              Device Check: {analysisResult.fraudData.deviceMismatch ? 'Mismatch' : 'Trusted'}
            </div>
            <div className={analysisResult.fraudData.abnormalBehavior ? 'check bad' : 'check good'}>
              Behavior Check: {analysisResult.fraudData.abnormalBehavior ? 'Abnormal' : 'Normal'}
            </div>
          </div>

          <div className="meter-wrap">
            <div className="meter" style={{ width: `${riskPercent}%` }} />
          </div>

          <div className="summary-grid">
            <p><strong>Risk Score:</strong> {analysisResult.riskScore}</p>
            <p><strong>Risk Level:</strong> {analysisResult.riskLevel}</p>
            <p><strong>Decision:</strong> {analysisResult.decision}</p>
          </div>
        </section>
      )}
    </div>
  )
}
