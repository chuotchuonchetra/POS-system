import { useState, useEffect, useRef, useCallback } from "react";

const API_BASE = "http://localhost:5000/api/v1/payway";
const fmt = (n) => `$${parseFloat(n).toFixed(2)}`;
const effectivePrice = (p) => p.price - (p.discount || 0);

// ─── Spinner ────────────────────────────────────────────────────────────────────
function Spinner() {
    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 0" }}>
            <div style={{
                width: "40px", height: "40px", borderRadius: "50%",
                border: "3px solid rgba(212,168,67,0.15)",
                borderTopColor: "#d4a843",
                animation: "spin 0.8s linear infinite"
            }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    );
}

// ─── QR Display ─────────────────────────────────────────────────────────────────
function QRDisplay({ qrCode, checkoutUrl, deeplink, tranId, amount, pollStatus }) {
    const [countdown, setCountdown] = useState(300); // 5 min expiry

    useEffect(() => {
        const t = setInterval(() => setCountdown(c => Math.max(0, c - 1)), 1000);
        return () => clearInterval(t);
    }, []);

    const mm = String(Math.floor(countdown / 60)).padStart(2, "0");
    const ss = String(countdown % 60).padStart(2, "0");
    const expired = countdown === 0;

    return (
        <div style={{ textAlign: "center" }}>
            {/* ABA Branding */}
            <div style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
                marginBottom: "16px"
            }}>
                <div style={{
                    background: "linear-gradient(135deg, #c00, #e60000)",
                    borderRadius: "8px", padding: "4px 10px",
                    color: "#fff", fontWeight: 800, fontSize: "14px", letterSpacing: "1px",
                    fontFamily: "'DM Mono', monospace"
                }}>ABA</div>
                <span style={{ color: "#9e8856", fontFamily: "'DM Mono', monospace", fontSize: "12px" }}>
                    PayWay
                </span>
            </div>

            {/* QR Code */}
            <div style={{
                display: "inline-block", position: "relative",
                background: "#fff", padding: "16px", borderRadius: "16px",
                boxShadow: expired
                    ? "0 0 0 3px rgba(220,50,50,0.5)"
                    : "0 0 0 3px rgba(212,168,67,0.4), 0 8px 32px rgba(0,0,0,0.4)",
                marginBottom: "14px",
                transition: "box-shadow 0.3s",
            }}>
                {qrCode ? (
                    <img
                        src={`data:image/png;base64,${qrCode}`}
                        alt="ABA PayWay QR Code"
                        style={{ width: "180px", height: "180px", display: "block", opacity: expired ? 0.25 : 1, transition: "opacity 0.3s" }}
                    />
                ) : checkoutUrl ? (
                    // fallback: show as iframe or link
                    <div style={{ width: "180px", height: "180px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                        <span style={{ fontSize: "36px" }}>📱</span>
                        <a
                            href={checkoutUrl}
                            target="_blank"
                            rel="noreferrer"
                            style={{ color: "#c00", fontSize: "11px", fontFamily: "'DM Mono', monospace", textDecoration: "underline" }}
                        >Open ABA Checkout</a>
                    </div>
                ) : (
                    <div style={{ width: "180px", height: "180px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontSize: "40px" }}>📱</span>
                    </div>
                )}

                {/* Expired overlay */}
                {expired && (
                    <div style={{
                        position: "absolute", inset: 0, borderRadius: "14px",
                        background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center"
                    }}>
                        <span style={{ color: "#f87171", fontFamily: "'DM Mono', monospace", fontSize: "13px", fontWeight: 700 }}>
                            EXPIRED
                        </span>
                    </div>
                )}
            </div>

            {/* Instructions */}
            <p style={{ color: "#9e8856", fontFamily: "'DM Mono', monospace", fontSize: "11px", margin: "0 0 8px", lineHeight: 1.6 }}>
                Open <span style={{ color: "#d4a843" }}>ABA Mobile</span> app →<br />
                Scan QR or pay <span style={{ color: "#d4a843" }}>{fmt(amount)}</span>
            </p>

            {/* Deeplink button */}
            {(deeplink || checkoutUrl) && (
                <a
                    href={deeplink || checkoutUrl}
                    style={{
                        display: "inline-block", marginBottom: "12px",
                        background: "rgba(212,168,67,0.1)", border: "1px solid rgba(212,168,67,0.25)",
                        borderRadius: "8px", padding: "7px 16px",
                        color: "#d4a843", fontFamily: "'DM Mono', monospace", fontSize: "11px",
                        textDecoration: "none", letterSpacing: "0.5px"
                    }}
                >
                    📲 OPEN IN ABA APP
                </a>
            )}

            {/* Timer */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", marginBottom: "10px" }}>
                <span style={{ fontSize: "12px" }}>{expired ? "⛔" : "⏱"}</span>
                <span style={{
                    fontFamily: "'DM Mono', monospace", fontSize: "13px",
                    color: expired ? "#f87171" : countdown < 60 ? "#fbbf24" : "#6b5c35"
                }}>
                    {expired ? "QR expired — please restart" : `Expires in ${mm}:${ss}`}
                </span>
            </div>

            {/* Poll status indicator */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px" }}>
                <div style={{
                    width: "6px", height: "6px", borderRadius: "50%",
                    background: pollStatus === "checking" ? "#fbbf24" : "#4ade80",
                    animation: pollStatus === "checking" ? "pulse 1s ease-in-out infinite" : "none"
                }} />
                <span style={{ color: "#6b5c35", fontFamily: "'DM Mono', monospace", fontSize: "10px", letterSpacing: "1px" }}>
                    {pollStatus === "checking" ? "WAITING FOR PAYMENT…" : "CHECKING…"}
                </span>
                <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.3} }`}</style>
            </div>

            {/* TXN ref */}
            <p style={{ color: "#3d3120", fontFamily: "'DM Mono', monospace", fontSize: "10px", margin: "10px 0 0" }}>
                REF: {tranId}
            </p>
        </div>
    );
}

// ─── Payment Modal ───────────────────────────────────────────────────────────────
export default function PaymentModal({ cart, userId, onClose, onSuccess }) {
    const [step, setStep] = useState("select");   // select | loading | qr | done | failed
    const [method, setMethod] = useState("abapay");
    const [qrData, setQrData] = useState(null);   // { qrCode, checkoutUrl, deeplink, tranId, orderId, amount }
    const [error, setError] = useState(null);
    const [pollStatus, setPollStatus] = useState("checking");
    const pollRef = useRef(null);

    const total = cart.reduce((s, i) => s + effectivePrice(i) * i.qty, 0);

    // ── Stop polling on unmount ──
    useEffect(() => () => clearInterval(pollRef.current), []);

    // ── Poll ABA check endpoint every 3s once QR is shown ──
    const startPolling = useCallback((tranId, orderId, amount) => {
        pollRef.current = setInterval(async () => {
            try {
                setPollStatus("checking");
                const res = await fetch(`${API_BASE}/check`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ tranId, orderId, amount }),
                });
                const data = await res.json();
                if (data.paid) {
                    clearInterval(pollRef.current);
                    setStep("done");
                    setTimeout(onSuccess, 1800);
                }
            } catch (e) {
                // silent — keep polling
            }
        }, 3000);
    }, [onSuccess]);

    // ── Initiate payment ──
    const handleInitiate = async () => {
        if (method === "cash") {
            // Cash: create order directly, no QR needed
            setStep("done");
            setTimeout(onSuccess, 1500);
            return;
        }

        setStep("loading");
        setError(null);

        try {
            const res = await fetch(`${API_BASE}/payments/initiate`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId,
                    totalAmount: total.toFixed(2),
                    currency: "USD",
                    items: cart.map(i => ({
                        name: i.name,
                        qty: i.qty,
                        price: effectivePrice(i).toFixed(2),
                    })),
                }),
            });

            const data = await res.json();

            if (!res.ok || !data.success) {
                throw new Error(data.error || "ABA PayWay initiation failed");
            }

            setQrData({
                qrCode: data.qrCode,
                checkoutUrl: data.checkoutUrl,
                deeplink: data.abapayDeep || data.deeplink,
                tranId: data.tranId,
                orderId: data.orderId,
                amount: data.amount,
            });

            setStep("qr");
            startPolling(data.tranId, data.orderId, data.amount);

        } catch (err) {
            setError(err.message);
            setStep("failed");
        }
    };

    const METHODS = [
        { id: "abapay", label: "ABA PayWay", icon: "🏦", desc: "Scan QR via ABA Mobile app" },
        { id: "cash", label: "Cash", icon: "💵", desc: "Collect payment in person" },
        { id: "card", label: "Credit Card", icon: "💳", desc: "Visa / Mastercard via terminal" },
    ];

    return (
        <div style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(10px)",
            display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100
        }}>
            <div style={{
                background: "linear-gradient(160deg, #1a1408, #0d0b06)",
                border: "1px solid rgba(212,168,67,0.3)", borderRadius: "20px",
                padding: "32px", width: "400px", maxWidth: "95vw",
                boxShadow: "0 40px 80px rgba(0,0,0,0.7), inset 0 1px 0 rgba(212,168,67,0.2)",
                fontFamily: "'DM Mono', monospace",
            }}>

                {/* ── SELECT METHOD ── */}
                {step === "select" && (
                    <>
                        <div style={{ marginBottom: "24px" }}>
                            <h2 style={{ color: "#f0dfa0", fontFamily: "'DM Serif Display', serif", margin: "0 0 4px", fontSize: "24px" }}>
                                Payment
                            </h2>
                            <p style={{ color: "#6b5c35", fontSize: "11px", margin: 0, letterSpacing: "1px" }}>
                                {cart.length} ITEM{cart.length !== 1 ? "S" : ""} · {fmt(total)}
                            </p>
                        </div>

                        {/* Method selector */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "20px" }}>
                            {METHODS.map(m => (
                                <div
                                    key={m.id}
                                    onClick={() => setMethod(m.id)}
                                    style={{
                                        border: `1px solid ${method === m.id ? "#d4a843" : "rgba(212,168,67,0.15)"}`,
                                        borderRadius: "12px", padding: "12px 16px",
                                        cursor: "pointer", display: "flex", alignItems: "center", gap: "12px",
                                        background: method === m.id ? "rgba(212,168,67,0.07)" : "transparent",
                                        transition: "all 0.18s",
                                    }}
                                >
                                    <span style={{ fontSize: "22px" }}>{m.icon}</span>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ color: "#f0dfa0", fontFamily: "'DM Serif Display', serif", fontSize: "15px" }}>{m.label}</div>
                                        <div style={{ color: "#6b5c35", fontSize: "11px" }}>{m.desc}</div>
                                    </div>
                                    <div style={{
                                        width: "18px", height: "18px", borderRadius: "50%",
                                        border: `2px solid ${method === m.id ? "#d4a843" : "rgba(212,168,67,0.25)"}`,
                                        background: method === m.id ? "#d4a843" : "transparent",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        transition: "all 0.18s", flexShrink: 0
                                    }}>
                                        {method === m.id && <span style={{ color: "#1a1209", fontSize: "10px", fontWeight: 900 }}>✓</span>}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Order summary */}
                        <div style={{ background: "rgba(212,168,67,0.05)", borderRadius: "10px", padding: "12px 14px", marginBottom: "20px" }}>
                            {cart.map(i => (
                                <div key={i.id} style={{ display: "flex", justifyContent: "space-between", color: "#9e8856", fontSize: "12px", padding: "2px 0" }}>
                                    <span>{i.name} ×{i.qty}</span>
                                    <span>{fmt(effectivePrice(i) * i.qty)}</span>
                                </div>
                            ))}
                            <div style={{ borderTop: "1px solid rgba(212,168,67,0.12)", marginTop: "8px", paddingTop: "8px", display: "flex", justifyContent: "space-between" }}>
                                <span style={{ color: "#d4a843", fontWeight: 700, fontSize: "14px" }}>TOTAL</span>
                                <span style={{ color: "#d4a843", fontWeight: 700, fontSize: "14px" }}>{fmt(total)}</span>
                            </div>
                        </div>

                        <div style={{ display: "flex", gap: "10px" }}>
                            <button onClick={onClose} style={{
                                flex: 1, padding: "12px", background: "transparent",
                                border: "1px solid rgba(212,168,67,0.2)", borderRadius: "10px",
                                color: "#6b5c35", fontSize: "13px", cursor: "pointer"
                            }}>Cancel</button>
                            <button onClick={handleInitiate} style={{
                                flex: 2, padding: "12px",
                                background: "linear-gradient(135deg, #d4a843, #b88c2e)",
                                border: "none", borderRadius: "10px",
                                color: "#1a1209", fontSize: "13px", fontWeight: 700, cursor: "pointer",
                                boxShadow: "0 4px 20px rgba(212,168,67,0.25)"
                            }}>
                                {method === "abapay" ? "⚡ GENERATE QR" : `PAY ${fmt(total)}`}
                            </button>
                        </div>
                    </>
                )}

                {/* ── LOADING ── */}
                {step === "loading" && (
                    <div style={{ textAlign: "center" }}>
                        <Spinner />
                        <p style={{ color: "#9e8856", fontSize: "13px", marginTop: "8px" }}>
                            Connecting to ABA PayWay…
                        </p>
                        <p style={{ color: "#6b5c35", fontSize: "11px", marginTop: "4px" }}>
                            Generating secure QR code
                        </p>
                    </div>
                )}

                {/* ── QR ── */}
                {step === "qr" && qrData && (
                    <>
                        <QRDisplay {...qrData} pollStatus={pollStatus} />
                        <button
                            onClick={() => { clearInterval(pollRef.current); onClose(); }}
                            style={{
                                width: "100%", marginTop: "20px", padding: "11px",
                                background: "transparent", border: "1px solid rgba(212,168,67,0.18)",
                                borderRadius: "10px", color: "#6b5c35", fontSize: "12px",
                                cursor: "pointer", letterSpacing: "1px"
                            }}
                        >CANCEL PAYMENT</button>
                    </>
                )}

                {/* ── SUCCESS ── */}
                {step === "done" && (
                    <div style={{ textAlign: "center", padding: "20px 0" }}>
                        <div style={{ fontSize: "64px", marginBottom: "16px", animation: "popIn 0.4s cubic-bezier(.34,1.56,.64,1)" }}>
                            ✅
                        </div>
                        <h2 style={{ color: "#f0dfa0", fontFamily: "'DM Serif Display', serif", margin: "0 0 8px", fontSize: "22px" }}>
                            Payment Confirmed
                        </h2>
                        {qrData && (
                            <p style={{ color: "#6b5c35", fontSize: "11px", margin: "0 0 6px" }}>
                                TXN · {qrData.tranId}
                            </p>
                        )}
                        <p style={{ color: "#d4a843", fontFamily: "'DM Mono', monospace", fontSize: "22px", fontWeight: 700, margin: "8px 0 0" }}>
                            {fmt(total)}
                        </p>
                        <p style={{ color: "#6b5c35", fontSize: "11px", margin: "4px 0 0" }}>
                            Redirecting to order summary…
                        </p>
                        <style>{`@keyframes popIn { from{transform:scale(0.3);opacity:0} to{transform:scale(1);opacity:1} }`}</style>
                    </div>
                )}

                {/* ── FAILED ── */}
                {step === "failed" && (
                    <div style={{ textAlign: "center", padding: "20px 0" }}>
                        <div style={{ fontSize: "56px", marginBottom: "16px" }}>⚠️</div>
                        <h2 style={{ color: "#f87171", fontFamily: "'DM Serif Display', serif", margin: "0 0 10px", fontSize: "20px" }}>
                            Payment Failed
                        </h2>
                        <p style={{ color: "#9e8856", fontSize: "12px", margin: "0 0 24px", lineHeight: 1.6 }}>
                            {error || "Could not connect to ABA PayWay. Please try again."}
                        </p>
                        <div style={{ display: "flex", gap: "10px" }}>
                            <button onClick={onClose} style={{
                                flex: 1, padding: "11px", background: "transparent",
                                border: "1px solid rgba(212,168,67,0.2)", borderRadius: "10px",
                                color: "#6b5c35", fontSize: "12px", cursor: "pointer"
                            }}>Cancel</button>
                            <button onClick={() => { setStep("select"); setError(null); }} style={{
                                flex: 1, padding: "11px",
                                background: "linear-gradient(135deg, #d4a843, #b88c2e)",
                                border: "none", borderRadius: "10px",
                                color: "#1a1209", fontSize: "12px", fontWeight: 700, cursor: "pointer"
                            }}>Try Again</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}