'use client';

import React, { useState } from 'react';
import { Shield, Zap, Eye, BarChart3, Landmark, Users, ArrowRight, CheckCircle2, HelpCircle } from 'lucide-react';

export default function LandingPage(): React.JSX.Element {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [showAlert, setShowAlert] = useState(false);
  
  // State for FAQ toggles
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Integrated Web3Forms Access Key
  const WEBHOOK_KEY = "e825a36c-bfaf-4c30-8074-20d425c6d83c";

  const handleWaitlistSubmit = async (e: React.FormEvent, inputEmail: string) => {
    e.preventDefault();
    if (!inputEmail || !inputEmail.includes('@')) {
      return;
    }
    
    setStatus('loading');
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: WEBHOOK_KEY,
          email: inputEmail,
          from_name: "NCR-BHK Stealth Platform",
          subject: '🔥 NEW WAITLIST USER - NCR-BHK.IN',
          message: `Boom! A new high-intent user has just joined the waitlist.\n\nUser Email: ${inputEmail}\nTimestamp: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`,
        }),
      });

      if (response.ok) {
        setStatus('success');
        
        if (inputEmail === email) {
          setEmail('');
        }
        const footerInput = document.getElementsByName('footerEmail')[0] as HTMLInputElement;
        if (footerInput) footerInput.value = '';

        setStatus('idle');
        setShowAlert(true);
        setTimeout(() => setShowAlert(false), 4000);
      } else {
        setStatus('error');
      }
    } catch (err) {
      setStatus('error');
    } finally {
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const faqs = [
    {
      q: "How is NCR-BHK different from legacy classified platforms?",
      a: "Legacy platforms profit off broker commissions, premium ad listings, and continuous user data monetization. NCR-BHK operates as a decentralized, zero-broker Rental OS. Every listing undergoes an automated 14-day token check, completely wiping out duplicate, expired, and ghost coordinates."
    },
    {
      q: "How is my personal contact information protected?",
      a: "Through our 'Incognito Discovery' module, your email, phone number, and document metadata remain entirely masked by default. All initial discovery phases and viewing coordinate selections happen inside a sandboxed, end-to-end secure workspace."
    },
    {
      q: "What does the AI Lease Scanner audit?",
      a: "Once you upload a draft agreement, the parser dynamically cross-checks the clause vectors against regional regulatory patterns. It instantly exposes non-standard traps like hidden painting/cleaning deduction overheads, forced auto-escalation locks, or severe locks on notice cycles."
    },
    {
      q: "When will the Early Access batches roll out?",
      a: "We are initiating regional rollouts in highly concentrated phases across primary Delhi-NCR tech corridors (Gurugram, Noida, and South Delhi clusters). Batch invites will be dispatched sequentially based on your priority placement ranking on the waitlist."
    }
  ];

  return (
    <div className="min-h-screen font-sans antialiased" style={{ backgroundColor: '#0a0a0a', color: '#ffffff', paddingBottom: '40px' }}>
      
      {/* Sleek Custom Floating Alert Banner */}
      {showAlert && (
        <div style={{
          position: 'fixed',
          top: '24px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 100,
          backgroundColor: '#141414',
          border: '1px solid #10b981',
          padding: '16px 24px',
          borderRadius: '12px',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          animation: 'fadeIn 0.2s ease-out'
        }}>
          <CheckCircle2 style={{ width: '20px', height: '20px', color: '#10b981' }} />
          <span style={{ fontSize: '14px', fontWeight: 500, color: '#ffffff' }}>
            Welcome to the inner circle! Added to the stealth waitlist.
          </span>
        </div>
      )}

      {/* Navbar */}
      <nav style={{ backgroundColor: '#0a0a0a', borderBottom: '1px solid #27272a', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '20px', fontWeight: 'bold', letterSpacing: '0.05em', color: '#ffffff' }}>
            NCR-BHK<span style={{ color: '#71717a' }}>.IN</span>
          </span>
          <a 
            href="#waitlist" 
            style={{ fontSize: '12px', border: '1px solid #3f3f46', padding: '8px 16px', borderRadius: '9999px', color: '#e4e4e7', backgroundColor: '#18181b', textDecoration: 'none' }}
          >
            Early Access
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ maxWidth: '800px', margin: '0 auto', padding: '96px 20px 48px 20px', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ backgroundColor: '#18181b', border: '1px solid #3f3f46', color: '#d4d4d8', fontSize: '12px', padding: '4px 12px', borderRadius: '9999px', marginBottom: '24px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '9999px', backgroundColor: '#10b981' }}></span>
          Stealth Beta Launch
        </div>
        
        <h1 style={{ fontSize: '48px', fontWeight: 800, color: '#ffffff', marginBottom: '24px', maxWidth: '700px', lineHeight: '1.2' }}>
          The Ultimate Upgrade From <br />
          <span style={{ color: '#a1a1aa' }}>Broken Real Estate Platforms.</span>
        </h1>
        
        <p style={{ fontSize: '18px', color: '#d4d4d8', maxWidth: '600px', marginBottom: '40px', lineHeight: '1.6' }}>
          Say goodbye to ghost listings, endless broker spam, and hidden charges. NCR-BHK is a modern 
          Rental OS designed to give you absolute control, total privacy, and uncompromised property clarity.
        </p>

        {/* Hero Email Form */}
        <form onSubmit={(e) => handleWaitlistSubmit(e, email)} style={{ backgroundColor: '#18181b', border: '1px solid #3f3f46', padding: '8px', borderRadius: '12px', display: 'flex', width: '100%', maxWidth: '450px', gap: '8px', marginBottom: '20px' }}>
          <input 
            type="email" 
            placeholder="Enter your email for early access" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', backgroundColor: 'transparent', border: 'none', padding: '0 16px', fontSize: '14px', color: '#ffffff', outline: 'none' }}
            required
            disabled={status === 'loading'}
          />
          <button 
            type="submit" 
            disabled={status === 'loading'}
            style={{ whiteSpace: 'nowrap', backgroundColor: '#ffffff', color: '#000000', fontWeight: 600, fontSize: '14px', padding: '12px 24px', borderRadius: '8px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            {status === 'loading' ? 'Joining...' : 'Join the Waitlist'}
            <ArrowRight style={{ width: '16px', height: '16px', color: '#000000' }} />
          </button>
        </form>

        {/* INTEGRATED STEALTH TRACTION COUNTER */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', backgroundColor: '#111111', padding: '8px 16px', borderRadius: '30px', border: '1px solid #222222', marginTop: '10px' }}>
          <span style={{ display: 'flex', position: 'relative', width: '8px', height: '8px' }}>
            <span style={{ animation: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite', position: 'absolute', display: 'inline-flex', height: '100%', width: '100%', borderRadius: '9999px', backgroundColor: '#34d399', opacity: 0.75 }}></span>
            <span style={{ position: 'relative', display: 'inline-flex', borderRadius: '9999px', height: '8px', width: '8px', backgroundColor: '#10b981' }}></span>
          </span>
          <p style={{ fontSize: '13px', color: '#a1a1aa', margin: 0 }}>
            Join <span style={{ color: '#ffffff', fontWeight: 600 }}>200+</span> founders, builders, and high-intent renters in Delhi-NCR already on the list.
          </p>
        </div>
      </section>

      {/* Core Feature Hooks */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '64px 20px', borderTop: '1px solid #27272a' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 700, color: '#ffffff', marginBottom: '12px' }}>
            Engineered to Eliminate Friction.
          </h2>
          <p style={{ fontSize: '14px', color: '#a1a1aa' }}>Six features built to put total control back in your hands.</p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', justifyContent: 'center' }}>
          {/* Card 1 */}
          <div style={{ backgroundColor: '#141414', border: '1px solid #27272a', borderRadius: '16px', padding: '24px', width: '340px', minHeight: '280px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: '#1c1c1c', border: '1px solid #3f3f46', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
              <Shield style={{ width: '20px', height: '20px', color: '#ffffff' }} />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#ffffff', marginBottom: '4px' }}>Incognito Discovery</h3>
            <p style={{ fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', color: '#71717a', marginBottom: '16px', letterSpacing: '0.05em' }}>Privacy Guard</p>
            <p style={{ fontSize: '14px', color: '#e4e4e7', lineHeight: '1.6' }}>
              All initial discovery, identity verification, and viewing appointments happen entirely inside a sandboxed, secure in-app chat. Your personal contact details are completely masked by default—broker lines can’t track you if they don't even know you're there.
            </p>
          </div>

          {/* Card 2 */}
          <div style={{ backgroundColor: '#141414', border: '1px solid #27272a', borderRadius: '16px', padding: '24px', width: '340px', minHeight: '280px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: '#1c1c1c', border: '1px solid #3f3f46', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
              <Zap style={{ width: '20px', height: '20px', color: '#ffffff' }} />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#ffffff', marginBottom: '4px' }}>The 14-Day Spam Shield</h3>
            <p style={{ fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', color: '#71717a', marginBottom: '16px', letterSpacing: '0.05em' }}>Real-Time Verification</p>
            <p style={{ fontSize: '14px', color: '#e4e4e7', lineHeight: '1.6' }}>
              Connect directly with real property owners. Every single listing is tied to a strict, automated 14-day expiry sequence. If a host doesn't actively re-confirm that the property is still open, the system instantly purges it to eliminate ghost listings.
            </p>
          </div>

          {/* Card 3 */}
          <div style={{ backgroundColor: '#141414', border: '1px solid #27272a', borderRadius: '16px', padding: '24px', width: '340px', minHeight: '280px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: '#1c1c1c', border: '1px solid #3f3f46', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
              <Eye style={{ width: '20px', height: '20px', color: '#ffffff' }} />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#ffffff', marginBottom: '4px' }}>Instant Agreement Audit</h3>
            <p style={{ fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', color: '#71717a', marginBottom: '16px', letterSpacing: '0.05em' }}>AI Lease Scanner</p>
            <p style={{ fontSize: '14px', color: '#e4e4e7', lineHeight: '1.6' }}>
              Before you sign anything, simply drop your draft agreement into the portal. The system instantly audits the document and highlights high-risk legal traps—exposing unfair painting deductions, hidden exit costs, or extreme notice lock-ins.
            </p>
          </div>

          {/* Card 4 */}
          <div style={{ backgroundColor: '#141414', border: '1px solid #27272a', borderRadius: '16px', padding: '24px', width: '340px', minHeight: '280px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: '#1c1c1c', border: '1px solid #3f3f46', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
              <BarChart3 style={{ width: '20px', height: '20px', color: '#ffffff' }} />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#ffffff', marginBottom: '4px' }}>X-Ray Property Insights</h3>
            <p style={{ fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', color: '#71717a', marginBottom: '16px', letterSpacing: '0.05em' }}>Hyper-Local Data</p>
            <p style={{ fontSize: '14px', color: '#e4e4e7', lineHeight: '1.6' }}>
              Go way beyond basic map markers. Every property page gives you instant, verified environmental metrics, including exact Sunlight Exposure angles and live Ambient Noise Profiles mapped relative to busy transit corridors.
            </p>
          </div>

          {/* Card 5 */}
          <div style={{ backgroundColor: '#141414', border: '1px solid #27272a', borderRadius: '16px', padding: '24px', width: '340px', minHeight: '280px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: '#1c1c1c', border: '1px solid #3f3f46', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
              <Landmark style={{ width: '20px', height: '20px', color: '#ffffff' }} />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#ffffff', marginBottom: '4px' }}>Zero Financial Surprises</h3>
            <p style={{ fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', color: '#71717a', marginBottom: '16px', letterSpacing: '0.05em' }}>True Cost Index</p>
            <p style={{ fontSize: '14px', color: '#e4e4e7', lineHeight: '1.6' }}>
              Legacy platforms hide the real numbers until it's too late. Our system computes a consolidated financial layer that instantly factors in base rent, society maintenance surcharges, and estimated seasonal utility overheads. You see your true total monthly exposure upfront.
            </p>
          </div>

          {/* Card 6 */}
          <div style={{ backgroundColor: '#141414', border: '1px solid #27272a', borderRadius: '16px', padding: '24px', width: '340px', minHeight: '280px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ width: '40px', height: '40px', borderRadius: '12px', backgroundColor: '#1c1c1c', border: '1px solid #3f3f46', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
              <Users style={{ width: '20px', height: '20px', color: '#ffffff' }} />
            </div>
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#ffffff', marginBottom: '4px' }}>Seamless Partnership</h3>
            <p style={{ fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', color: '#71717a', marginBottom: '16px', letterSpacing: '0.05em' }}>Roommate Matching</p>
            <p style={{ fontSize: '14px', color: '#e4e4e7', lineHeight: '1.6' }}>
              Finding a co-living partner shouldn't be a gamble. Easily find and match with individual renters based on shared living habits, precise budgets, and targeted geographic coordinates without the trial-and-error.
            </p>
          </div>
        </div>
      </section>

      {/* STRATEGIC TEAM & FOUNDERS SECTION */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '64px 20px', borderTop: '1px solid #27272a' }}>
        <div style={{ textAlign: 'center', marginBottom: '56px' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 700, color: '#ffffff', marginBottom: '12px' }}>
            The Builders
          </h2>
          <p style={{ fontSize: '14px', color: '#a1a1aa' }}>Behind the architecture of a broker-free rental operating system.</p>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '32px', justifyContent: 'center' }}>
          {/* Founder 1: Siddharth */}
          <div style={{ backgroundColor: '#141414', border: '1px solid #27272a', borderRadius: '16px', padding: '32px', width: '440px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'start' }}>
              <img src="/siddharth.png" alt="Siddharth" style={{ width: '64px', height: '64px', borderRadius: '16px', border: '1px solid #3f3f46', objectFit: 'cover' }} onError={(e) => e.currentTarget.style.display = 'none'} />
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#ffffff', marginBottom: '2px' }}>Siddharth</h3>
                <p style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', color: '#10b981', marginBottom: '12px', letterSpacing: '0.05em' }}>Founder & Core Architect</p>
                <p style={{ fontSize: '14px', color: '#d4d4d8', lineHeight: '1.6' }}>
                  Engineering high-concurrency architecture to disrupt legacy classified structures. Obsessed with systemic transparency, absolute transaction privacy, and deploying zero-friction client workflows.
                </p>
              </div>
            </div>
            <div style={{ marginTop: '24px', borderTop: '1px solid #27272a', paddingTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
              <a href="https://www.linkedin.com/in/siddharth-yadav-1b3b8a328/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#a1a1aa', textDecoration: 'none' }}>
                <svg viewBox="0 0 24 24" style={{ width: '16px', height: '16px', fill: 'currentColor' }}><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                Connect on LinkedIn
              </a>
            </div>
          </div>

          {/* Founder 2: Himanshu Dhiman (Updated to Marketing & Growth Lead) */}
<div style={{ backgroundColor: '#141414', border: '1px solid #27272a', borderRadius: '16px', padding: '32px', width: '440px', minHeight: '240px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
  <div style={{ display: 'flex', gap: '20px', alignItems: 'start' }}>
    <img src="/himanshu.png" alt="Himanshu" style={{ width: '64px', height: '64px', borderRadius: '16px', border: '1px solid #3f3f46', objectFit: 'cover' }} onError={(e) => e.currentTarget.style.display = 'none'} />
    <div>
      <h3 style={{ fontSize: '20px', fontWeight: 700, color: '#ffffff', marginBottom: '2px' }}>Himanshu Dhiman</h3>
      <p style={{ fontSize: '12px', fontWeight: 'bold', textTransform: 'uppercase', color: '#10b981', marginBottom: '12px', letterSpacing: '0.05em' }}>Co-Founder & Growth Lead</p>
      <p style={{ fontSize: '14px', color: '#d4d4d8', lineHeight: '1.6' }}>
        Driving hyper-local user acquisition channels and early distribution vectors across Tier-1 NCR tech clusters. Head of strategic property owner alliances, brand positioning, and scaling the initial high-intent renter liquidity funnel.
      </p>
    </div>
  </div>
  <div style={{ marginTop: '24px', borderTop: '1px solid #27272a', paddingTop: '16px', display: 'flex', justifyContent: 'flex-end' }}>
    <a href="https://www.linkedin.com/in/himanshu-dhiman-b30611321/" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#a1a1aa', textDecoration: 'none' }}>
      <svg viewBox="0 0 24 24" style={{ width: '16px', height: '16px', fill: 'currentColor' }}><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
      Connect on LinkedIn
    </a>
  </div>
</div>
        </div>
      </section>

      {/* PREMIUM INTERACTIVE BENTO FAQ SECTION (Fully in English) */}
      <section style={{ maxWidth: '900px', margin: '0 auto', padding: '64px 20px', borderTop: '1px solid #27272a' }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ display: 'inline-flex', borderRadius: '12px', backgroundColor: '#141414', border: '1px solid #27272a', padding: '10px', marginBottom: '12px' }}>
            <HelpCircle style={{ width: '20px', height: '20px', color: '#10b981' }} />
          </div>
          <h2 style={{ fontSize: '32px', fontWeight: 700, color: '#ffffff', marginBottom: '8px' }}>
            Frequently Asked Queries
          </h2>
          <p style={{ fontSize: '14px', color: '#a1a1aa' }}>Clear answers to the structural parameters of the platform.</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              onClick={() => setOpenFaq(openFaq === index ? null : index)}
              style={{
                backgroundColor: '#141414',
                border: '1px solid #27272a',
                borderRadius: '14px',
                padding: '20px 24px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                borderColor: openFaq === index ? '#3f3f46' : '#27272a'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#ffffff', margin: 0 }}>
                  {faq.q}
                </h3>
                <span style={{ fontSize: '20px', color: '#71717a', transition: 'transform 0.2s', transform: openFaq === index ? 'rotate(45deg)' : 'rotate(0deg)' }}>
                  +
                </span>
              </div>
              
              {openFaq === index && (
                <div style={{ marginTop: '14px', fontSize: '14px', color: '#a1a1aa', lineHeight: '1.6', borderTop: '1px solid #27272a', paddingTop: '12px' }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Conversion Section */}
      <section id="waitlist" style={{ maxWidth: '800px', margin: '0 auto', padding: '96px 20px', textAlign: 'center', borderTop: '1px solid #27272a', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 style={{ fontSize: '36px', fontWeight: 700, color: '#ffffff', marginBottom: '16px' }}>
          Secure Your Spot for the Next Gen Rental OS.
        </h2>
        <p style={{ fontSize: '16px', color: '#a1a1aa', maxWidth: '600px', marginBottom: '32px', lineHeight: '1.6' }}>
          We are launching access in highly concentrated phases. Drop your mail below to get premium allocation and onboarding priority before slots fill up.
        </p>
        
        {/* Secondary Email Form */}
        <form onSubmit={(e) => {
          const target = e.target as HTMLFormElement;
          const input = target.elements.namedItem('footerEmail') as HTMLInputElement;
          handleWaitlistSubmit(e, input.value);
        }} style={{ backgroundColor: '#18181b', border: '1px solid #3f3f46', padding: '8px', borderRadius: '12px', display: 'flex', width: '100%', maxWidth: '450px', gap: '8px' }}>
          <input 
            type="email" 
            name="footerEmail"
            placeholder="Enter your email address" 
            style={{ width: '100%', backgroundColor: 'transparent', border: 'none', padding: '0 16px', fontSize: '14px', color: '#ffffff', outline: 'none' }}
            required
            disabled={status === 'loading'}
          />
          <button 
            type="submit" 
            disabled={status === 'loading'}
            style={{ whiteSpace: 'nowrap', backgroundColor: '#ffffff', color: '#000000', fontWeight: 600, fontSize: '14px', padding: '12px 24px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}
          >
            {status === 'loading' ? 'Securing...' : 'Secure Early Access'}
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #27272a', padding: '32px 0', backgroundColor: '#080808', marginTop: '40px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: '12px', color: '#71717a' }}>© 2026 NCR-BHK. All rights reserved.</div>
          <div style={{ display: 'flex', gap: '24px', fontSize: '12px', color: '#71717a' }}>
            <span style={{ cursor: 'pointer' }}>Stealth Protocol</span>
            <span style={{ cursor: 'pointer' }}>Terms of Access</span>
          </div>
        </div>
      </footer>

    </div>
  );
}