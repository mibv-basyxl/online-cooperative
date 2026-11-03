'use strict';

const DB_KEY = 'coop_demo_state_v1';
const SESSION_KEY = 'coop_demo_session_v1';
const DAY = 24 * 60 * 60 * 1000;

const baseState = {
  plans: [
    { id: 'plan_basic', name: 'Basic', memberLimit: 100, monthly: 5000, yearly: 50000 },
    { id: 'plan_pro', name: 'Professional', memberLimit: 500, monthly: 15000, yearly: 150000 },
    { id: 'plan_ent', name: 'Enterprise', memberLimit: -1, monthly: 50000, yearly: 500000 }
  ],
  users: [
    { id: 'u_sa', name: 'Platform Super Admin', email: 'superadmin@coop.io', pass: btoa('Password123!'), role: 'SUPER_ADMIN', coopId: null, memberId: null, status: 'ACTIVE' },
    { id: 'u_admin', name: 'Ada Udom', email: 'admin@sunrisecoop.ng', pass: btoa('Password123!'), role: 'COOP_ADMIN', coopId: 'coop1', memberId: null, status: 'ACTIVE' },
    { id: 'u_staff', name: 'Emeka Bassey', email: 'staff@sunrisecoop.ng', pass: btoa('Password123!'), role: 'STAFF', coopId: 'coop1', memberId: null, status: 'ACTIVE' },
    { id: 'u_member', name: 'Mary Effiong', email: 'mary@example.com', pass: btoa('Password123!'), role: 'MEMBER', coopId: 'coop1', memberId: 'm1', status: 'ACTIVE' }
  ],
  coops: [
    { id: 'coop1', name: 'Sunrise Cooperative Society', regNumber: 'RC-12345', email: 'admin@sunrisecoop.ng', phone: '08012345678', address: '12 Unity Road, Uyo', state: 'Akwa Ibom', planId: 'plan_pro', planName: 'Professional', memberLimit: 500, status: 'ACTIVE', trialEnd: isoDate(Date.now() - 300 * DAY), expiry: isoDate(Date.now() + 300 * DAY) }
  ],
  members: [
    { id: 'm1', coopId: 'coop1', memberNo: 'COOP-2026-0001', fullName: 'Mary Effiong', email: 'mary@example.com', phone: '08022223333', address: '3 Ewet Street', occupation: 'Teacher', status: 'ACTIVE', joined: isoDate(Date.now() - 120 * DAY) },
    { id: 'm2', coopId: 'coop1', memberNo: 'COOP-2026-0002', fullName: 'John Okon', email: 'john@example.com', phone: '08044445555', address: '9 Ikot Ekpene Road', occupation: 'Trader', status: 'ACTIVE', joined: isoDate(Date.now() - 90 * DAY) }
  ],
  contributions: [
    { id: 'c1', coopId: 'coop1', memberId: 'm1', type: 'MONTHLY_CONTRIBUTION', amount: 20000, method: 'CASH', ref: '', date: isoDate(Date.now() - 150 * DAY), desc: '', by: 'u_admin' },
    { id: 'c2', coopId: 'coop1', memberId: 'm2', type: 'MONTHLY_CONTRIBUTION', amount: 30000, method: 'TRANSFER', ref: 'TRF-001', date: isoDate(Date.now() - 140 * DAY), desc: '', by: 'u_admin' },
    { id: 'c3', coopId: 'coop1', memberId: 'm1', type: 'MONTHLY_CONTRIBUTION', amount: 20000, method: 'TRANSFER', ref: 'TRF-002', date: isoDate(Date.now() - 120 * DAY), desc: '', by: 'u_staff' },
    { id: 'c4', coopId: 'coop1', memberId: 'm2', type: 'MONTHLY_CONTRIBUTION', amount: 30000, method: 'CASH', ref: '', date: isoDate(Date.now() - 110 * DAY), desc: '', by: 'u_staff' },
    { id: 'c5', coopId: 'coop1', memberId: 'm1', type: 'SAVINGS', amount: 50000, method: 'TRANSFER', ref: 'SAV-001', date: isoDate(Date.now() - 75 * DAY), desc: 'Savings deposit', by: 'u_admin' },
    { id: 'c6', coopId: 'coop1', memberId: 'm2', type: 'SHARES', amount: 100000, method: 'TRANSFER', ref: 'SHR-001', date: isoDate(Date.now() - 45 * DAY), desc: 'Share purchase', by: 'u_admin' }
  ],
  loans: [
    { id: 'l1', coopId: 'coop1', memberId: 'm1', amount: 500000, rate: 5, months: 12, start: isoDate(Date.now() - 80 * DAY), due: isoDate(Date.now() + 280 * DAY), freq: 'MONTHLY', status: 'ACTIVE', by: 'u_admin' }
  ],
  repayments: [
    { id: 'rp1', coopId: 'coop1', loanId: 'l1', memberId: 'm1', amount: 43750, date: isoDate(Date.now() - 75 * DAY), ref: 'REP-001' },
    { id: 'rp2', coopId: 'coop1', loanId: 'l1', memberId: 'm1', amount: 43750, date: isoDate(Date.now() - 45 * DAY), ref: 'REP-002' },
    { id: 'rp3', coopId: 'coop1', loanId: 'l1', memberId: 'm1', amount: 43750, date: isoDate(Date.now() - 15 * DAY), ref: 'REP-003' }
  ],
  incomes: [
    { id: 'i1', coopId: 'coop1', source: 'Member Dues', category: 'Dues', amount: 500000, date: isoDate(Date.now() - 150 * DAY), ref: '', desc: 'Monthly dues' },
    { id: 'i2', coopId: 'coop1', source: 'Member Dues', category: 'Dues', amount: 500000, date: isoDate(Date.now() - 90 * DAY), ref: '', desc: 'Monthly dues' },
    { id: 'i3', coopId: 'coop1', source: 'Registration Fees', category: 'Fees', amount: 100000, date: isoDate(Date.now() - 70 * DAY), ref: '', desc: 'New registrations' },
    { id: 'i4', coopId: 'coop1', source: 'Investment Returns', category: 'Investments', amount: 250000, date: isoDate(Date.now() - 40 * DAY), ref: '', desc: 'Fixed deposit returns' }
  ],
  expenses: [
    { id: 'e1', coopId: 'coop1', category: 'Meetings', amount: 80000, date: isoDate(Date.now() - 120 * DAY), payee: 'Event Hall', ref: '', desc: 'Annual general meeting' },
    { id: 'e2', coopId: 'coop1', category: 'Rent', amount: 150000, date: isoDate(Date.now() - 100 * DAY), payee: 'Landlord', ref: '', desc: 'Office rent' },
    { id: 'e3', coopId: 'coop1', category: 'Administration', amount: 25000, date: isoDate(Date.now() - 60 * DAY), payee: 'Stationery Shop', ref: '', desc: 'Office supplies' }
  ],
  taxRules: [
    { id: 'tr1', coopId: 'coop1', name: 'Cooperative Income Tax', taxType: 'INCOME_TAX', rate: 10, threshold: 0, deduction: 0, active: true, eff: isoDate(Date.now() - 200 * DAY) },
    { id: 'tr2', coopId: 'coop1', name: 'Dividend Tax', taxType: 'DIVIDEND_TAX', rate: 5, threshold: 100000, deduction: 30000, active: true, eff: isoDate(Date.now() - 200 * DAY) }
  ],
  taxRecords: [
    { id: 't1', coopId: 'coop1', ruleId: 'tr1', memberId: 'm1', period: '2026', taxableIncome: 1850000, rate: 10, liability: 185000, paid: 50000, status: 'PENDING', due: isoDate(Date.now() + 14 * DAY) },
    { id: 't2', coopId: 'coop1', ruleId: 'tr2', memberId: 'm1', period: '2026', taxableIncome: 300000, rate: 5, liability: 15000, paid: 15000, status: 'PAID', due: isoDate(Date.now() - 10 * DAY) }
  ],
  notifications: [
    { id: 'n1', coopId: 'coop1', userId: 'u_admin', type: 'MEMBER', title: 'New member added', msg: 'John Okon (COOP-2026-0002) was registered.', read: true, at: isoDate(Date.now() - 90 * DAY) },
    { id: 'n2', coopId: 'coop1', userId: 'u_admin', type: 'LOAN', title: 'Loan active', msg: 'Loan of ₦500,000 for Mary Effiong is now active.', read: true, at: isoDate(Date.now() - 79 * DAY) },
    { id: 'n3', coopId: 'coop1', userId: 'u_admin', type: 'TAX', title: 'Tax deadline approaching', msg: 'Cooperative Income Tax for 2026 is due in 14 days.', read: false, at: isoDate(Date.now() - 2 * DAY) },
    { id: 'n4', coopId: 'coop1', userId: 'u_member', type: 'CONTRIBUTION', title: 'Contribution recorded', msg: '₦20,000 Monthly Contribution was recorded for you.', read: false, at: isoDate(Date.now() - 2 * DAY) }
  ],
  payments: [
    { id: 'p1', coopId: 'coop1', planName: 'Professional', amount: 15000, date: isoDate(Date.now() - 30 * DAY), method: 'MOCK', ref: 'MOCK-1001', status: 'SUCCESS' }
  ],
  audit: [
    { id: 'a1', coopId: 'coop1', userId: 'u_admin', action: 'SEED', entity: 'SYSTEM', at: isoDate(Date.now() - 200 * DAY) }
  ]
};

let state = loadState();

const FEATURE_ITEMS = [
  { ic: '👥', t: 'Member Management', d: 'Digital registration with status tracking and member search.' },
  { ic: '💰', t: 'Contributions & Savings', d: 'Track shares, savings, and regular member contributions.' },
  { ic: '🏦', t: 'Loan Management', d: 'Submit, approve, and monitor cooperative loans and repayments.' },
  { ic: '📥', t: 'Income & Expenses', d: 'Measure monthly income and operational expenses clearly.' },
  { ic: '🧾', t: 'Tax Management', d: 'Configurable rules, liabilities, and payment records.' },
  { ic: '📊', t: 'Reports & Analytics', d: 'Generate export-ready summaries for management decisions.' }
];

function isoDate(value) {
  return new Date(value).toISOString();
}

function uid(prefix = 'id') {
  return prefix + '-' + Math.random().toString(36).slice(2, 9) + Date.now().toString(36);
}

function esc(str) {
  return String(str ?? '').replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[char]));
}

function fmt(value) {
  const amount = Number(value || 0);
  return '₦' + amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtDate(value) {
  if (!value) return '—';
  return new Date(value).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function badge(label, customClass = '') {
  const raw = String(label || '').replace(/_/g, ' ');
  const map = {
    ACTIVE: 'green',
    INACTIVE: 'gray',
    PENDING: 'amber',
    APPROVED: 'blue',
    REJECTED: 'red',
    PAID: 'green',
    OVERDUE: 'red',
    PARTIALLY_PAID: 'amber',
    FULLY_PAID: 'green',
    TRIAL: 'blue',
    SUSPENDED: 'red',
    CANCELLED: 'gray',
    COOP_ADMIN: 'blue',
    STAFF: 'gray',
    MEMBER: 'green',
    SUPER_ADMIN: 'blue'
  };
  const klass = customClass || map[raw.toUpperCase()] || 'gray';
  return '<span class="badge ' + klass + '">' + esc(raw) + '</span>';
}

function brandLink(href = '#/', light = false) {
  const theme = light ? 'brand-link brand-light' : 'brand-link';
  return '<a class="' + theme + '" href="' + href + '"><span class="brand-mark" aria-hidden="true"><svg viewBox="0 0 64 64" role="img" aria-label="CoopSaaS logo"><defs><linearGradient id="coopGrad" x1="0%" x2="100%" y1="0%" y2="100%"><stop offset="0%" stop-color="#60a5fa"/><stop offset="100%" stop-color="#2563eb"/></linearGradient></defs><rect x="8" y="8" width="48" height="48" rx="16" fill="#eaf2ff"/><path d="M27 17h10c8 0 13 5 13 12 0 7-5 12-13 12h-6v10h-8V17zm8 8h2c4 0 6 2 6 5 0 3-2 5-6 5h-2v-10z" fill="url(#coopGrad)"/><path d="M18 20h8v24h-8z" fill="#1e293b" opacity="0.92"/></svg></span><span class="brand-text">Coop<span>SaaS</span></span></a>';
}

function statCard(label, value, sub = '') {
  return '<div class="stat-card"><span class="stat-label">' + esc(label) + '</span>' +
    '<span class="stat-value">' + value + '</span>' +
    (sub ? '<span class="stat-sub">' + esc(sub) + '</span>' : '') +
    '</div>';
}

function loadState() {
  try {
    const raw = localStorage.getItem(DB_KEY);
    if (!raw) {
      localStorage.setItem(DB_KEY, JSON.stringify(baseState));
      return JSON.parse(JSON.stringify(baseState));
    }
    return JSON.parse(raw);
  } catch {
    return JSON.parse(JSON.stringify(baseState));
  }
}

function saveState() {
  localStorage.setItem(DB_KEY, JSON.stringify(state));
}

function currentUser() {
  const userId = localStorage.getItem(SESSION_KEY);
  return state.users.find((user) => user.id === userId) || null;
}

function currentCoop() {
  const user = currentUser();
  if (!user) return null;
  if (user.coopId) return state.coops.find((coop) => coop.id === user.coopId) || null;
  return user.role === 'SUPER_ADMIN' ? (state.coops[0] || null) : null;
}

function memberName(memberId) {
  const member = state.members.find((item) => item.id === memberId);
  return member ? member.fullName : '—';
}

function notifCount() {
  const user = currentUser();
  const coop = currentCoop();
  if (!user || !coop) return 0;
  return state.notifications.filter((item) => item.coopId === coop.id && (!item.userId || item.userId === user.id) && !notificationRead(item, user.id)).length;
}

function notificationRead(item, userId) {
  return Boolean(item.read || item.readBy?.includes(userId));
}

function appendNotification(coopId, userId, type, title, msg, metadata = {}) {
  state.notifications.push({
    id: uid('n'),
    coopId,
    userId: userId || null,
    type,
    title,
    msg,
    read: false,
    at: new Date().toISOString(),
    ...metadata
  });
}

function ensureCoopReminders(coopId) {
  const now = new Date();
  const monthKey = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0');
  const members = state.members.filter((member) => member.coopId === coopId && member.status === 'ACTIVE');
  let changed = false;

  members.forEach((member) => {
    const account = state.users.find((item) => item.memberId === member.id && item.status === 'ACTIVE');
    if (!account) return;
    const paidThisMonth = state.contributions.some((item) => {
      const date = new Date(item.date);
      return item.coopId === coopId && item.memberId === member.id && item.type === 'MONTHLY_CONTRIBUTION' && date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth();
    });
    const alreadyReminded = state.notifications.some((item) => item.coopId === coopId && item.userId === account.id && item.type === 'CONTRIBUTION_REMINDER' && item.period === monthKey);
    if (!paidThisMonth && !alreadyReminded) {
      appendNotification(coopId, account.id, 'CONTRIBUTION_REMINDER', 'Monthly contribution reminder', 'Your monthly contribution for ' + now.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) + ' has not been recorded yet.', { memberId: member.id, period: monthKey });
      changed = true;
    }
  });

  state.loans.filter((loan) => loan.coopId === coopId && ['ACTIVE', 'PARTIALLY_PAID'].includes(loan.status)).forEach((loan) => {
    const due = new Date(loan.due);
    const daysUntilDue = Math.ceil((new Date(due.getFullYear(), due.getMonth(), due.getDate()) - new Date(now.getFullYear(), now.getMonth(), now.getDate())) / DAY);
    if (daysUntilDue > 7) return;
    const member = state.members.find((item) => item.id === loan.memberId);
    const account = state.users.find((item) => item.memberId === loan.memberId && item.status === 'ACTIVE');
    if (!member || !account || loanTotals(loan).outstanding <= 0) return;
    const dueKey = due.toISOString().slice(0, 10);
    const alreadyReminded = state.notifications.some((item) => item.coopId === coopId && item.userId === account.id && item.type === 'REPAYMENT_REMINDER' && item.loanId === loan.id && item.dueDate === dueKey);
    if (!alreadyReminded) {
      const dueMessage = daysUntilDue < 0 ? 'is overdue' : daysUntilDue === 0 ? 'is due today' : 'is due in ' + daysUntilDue + ' days';
      appendNotification(coopId, account.id, 'REPAYMENT_REMINDER', 'Loan repayment reminder', 'Your loan repayment ' + dueMessage + ' (' + fmt(loanTotals(loan).outstanding) + ' outstanding).', { memberId: member.id, loanId: loan.id, dueDate: dueKey });
      changed = true;
    }
  });

  if (changed) saveState();
}

function routeTo(path) {
  location.hash = '#/' + path;
}

function goHome() {
  const user = currentUser();
  if (!user) {
    routeTo('');
    return;
  }
  if (user.role === 'SUPER_ADMIN') routeTo('superadmin');
  else if (user.role === 'MEMBER') routeTo('portal');
  else routeTo('app/dashboard');
}

function loanTotals(loan) {
  const principal = Number(loan.amount || 0);
  const total = principal + (principal * Number(loan.rate || 0) / 100);
  const paid = state.repayments.filter((item) => item.loanId === loan.id).reduce((sum, item) => sum + Number(item.amount || 0), 0);
  return { principal, total, paid, outstanding: Math.max(0, total - paid) };
}

function coopStats(coopId) {
  const members = state.members.filter((m) => m.coopId === coopId);
  const totalContributions = state.contributions.filter((c) => c.coopId === coopId).reduce((sum, c) => sum + Number(c.amount || 0), 0);
  const totalLoans = state.loans.filter((l) => l.coopId === coopId).reduce((sum, l) => sum + Number(l.amount || 0), 0);
  const totalPaid = state.repayments.filter((r) => r.coopId === coopId).reduce((sum, r) => sum + Number(r.amount || 0), 0);
  const totalIncome = state.incomes.filter((i) => i.coopId === coopId).reduce((sum, i) => sum + Number(i.amount || 0), 0);
  const totalExpenses = state.expenses.filter((e) => e.coopId === coopId).reduce((sum, e) => sum + Number(e.amount || 0), 0);
  const liability = state.taxRecords.filter((t) => t.coopId === coopId).reduce((sum, t) => sum + Number(t.liability || 0), 0);
  const paidTax = state.taxRecords.filter((t) => t.coopId === coopId).reduce((sum, t) => sum + Number(t.paid || 0), 0);

  return {
    members: members.filter((m) => m.status === 'ACTIVE').length,
    totalMembers: members.length,
    totalContributions,
    totalLoans,
    outstandingLoans: Math.max(0, totalLoans - totalPaid),
    totalIncome,
    totalExpenses,
    net: totalIncome - totalExpenses,
    taxLiability: liability,
    taxPaid: paidTax,
    outstandingTax: Math.max(0, liability - paidTax)
  };
}

function monthlySeries(coopId) {
  const now = new Date();
  const out = [];
  for (let i = 5; i >= 0; i -= 1) {
    const dt = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const from = dt.getTime();
    const to = new Date(dt.getFullYear(), dt.getMonth() + 1, 1).getTime();

    const contributions = state.contributions.filter((c) => c.coopId === coopId && new Date(c.date).getTime() >= from && new Date(c.date).getTime() < to).reduce((sum, c) => sum + Number(c.amount || 0), 0);
    const income = state.incomes.filter((i) => i.coopId === coopId && new Date(i.date).getTime() >= from && new Date(i.date).getTime() < to).reduce((sum, i) => sum + Number(i.amount || 0), 0);
    const expenses = state.expenses.filter((e) => e.coopId === coopId && new Date(e.date).getTime() >= from && new Date(e.date).getTime() < to).reduce((sum, e) => sum + Number(e.amount || 0), 0);

    out.push({
      label: dt.toLocaleDateString('en-US', { month: 'short' }),
      contributions,
      income,
      expenses
    });
  }
  return out;
}

function barChart(data, color) {
  const max = Math.max(...data.map((item) => Number(item.value || 0)), 1);
  return '<div class="chart">' + data.map((item) => '<div class="chart-col"><div class="chart-single"><div class="chart-bar" style="height:' + Math.round((Number(item.value || 0) / max) * 100) + '%;background:' + color + '"></div></div><span>' + esc(item.label) + '</span></div>').join('') + '</div>';
}

function barChartMulti(data, colors, labels) {
  const max = Math.max(...data.map((item) => Math.max(...(item.values || [1]))), 1);
  return '<div class="chart">' + data.map((item) => '<div class="chart-col"><div class="chart-bars2">' + item.values.map((value, index) => '<div class="chart-bar" style="height:' + Math.round((Number(value || 0) / max) * 100) + '%;background:' + colors[index] + '"></div>').join('') + '</div><span>' + esc(item.label) + '</span></div>').join('') + '</div><div class="legend">' + labels.map((label, index) => '<span class="lg"><i style="background:' + colors[index] + '"></i>' + esc(label) + '</span>').join('') + '</div>';
}

function renderLanding() {
  return '<div class="landing">' +
    '<header class="l-header"><div class="container l-nav">' + brandLink('#/') + '<nav class="l-links"><a href="#features">Features</a><a href="#pricing">Pricing</a><a href="#/login" class="btn btn-outline">Login</a><a href="#/register" class="btn btn-primary">Start Free</a></nav></div></header>' +
    '<section class="hero"><div class="container"><span class="hero-badge">Multi-Tenant SaaS for Cooperative Societies</span><h1>Online Cooperative Society Database &amp; <span class="accent">Tax Management System</span></h1><p class="lead">Manage members, contributions, loans, income, expenses and tax records from one secure platform.</p><div class="hero-ctas"><a href="#/register" class="btn btn-primary btn-lg">Start Free Trial</a><a href="#/login" class="btn btn-outline btn-lg">Login to Demo</a></div></div></section>' +
    '<section id="features"><div class="container"><h2 class="sec-title">Everything your cooperative needs</h2><div class="f-grid">' + FEATURE_ITEMS.map((item) => '<div class="f-card"><div class="f-icon">' + item.ic + '</div><h3>' + item.t + '</h3><p>' + item.d + '</p></div>').join('') + '</div></div></section>' +
    '<section id="pricing"><div class="container"><h2 class="sec-title">Simple, transparent pricing</h2><div class="p-grid">' + state.plans.map((plan) => '<div class="p-card ' + (plan.id === 'plan_pro' ? 'featured' : '') + '">' + (plan.id === 'plan_pro' ? '<span class="tag">Most Popular</span>' : '') + '<h3>' + plan.name + '</h3><div class="price">₦' + plan.monthly.toLocaleString() + '<small>/month</small></div><p class="sub">' + (plan.memberLimit === -1 ? 'Unlimited members' : 'Up to ' + plan.memberLimit + ' members') + '</p><p class="fine">' + (plan.id === 'plan_basic' ? 'Core modules + standard reports' : plan.id === 'plan_pro' ? 'Everything in Basic + tax module, portal and exports' : 'Everything in Professional + unlimited scale') + '</p><a href="#/register" class="btn ' + (plan.id === 'plan_pro' ? 'btn-primary' : 'btn-outline') + '">Choose ' + plan.name + '</a></div>').join('') + '</div></div></section>' +
    '<footer class="l-footer"><div class="container"><p>© 2026 CoopSaaS — Online Cooperative Society Database &amp; Tax Management System.</p></div></footer>' +
    '</div>';
}

function renderLogin() {
  return '<div class="auth-wrap"><div class="auth-card">' + brandLink('#/') + '<h1>Sign in</h1><p class="muted small">Access your cooperative workspace</p><form data-form="login" class="form"><label>Email<input name="email" class="input" type="email" required placeholder="you@cooperative.org"></label><label>Password<input name="password" class="input" type="password" required></label><button class="btn btn-primary w-full" type="submit">Sign in</button></form><div class="demo-box"><p class="muted small"><strong>Demo accounts</strong> — password: Password123!</p><div class="btns"><button class="btn btn-outline small" type="button" data-action="demo" data-email="admin@sunrisecoop.ng">Coop Admin</button><button class="btn btn-outline small" type="button" data-action="demo" data-email="staff@sunrisecoop.ng">Staff</button><button class="btn btn-outline small" type="button" data-action="demo" data-email="mary@example.com">Member</button></div></div><p class="muted small center"><a href="#/register">Register your cooperative instead</a></p></div></div>';
}

function renderRegister() {
  return '<div class="auth-wrap"><div class="auth-card" style="max-width:520px">' + brandLink('#/') + '<h1>Register your cooperative</h1><p class="muted small">Create your cooperative and admin account — 14-day trial starts immediately.</p><form data-form="register" class="form"><label>Cooperative name *<input name="name" class="input" required></label><div class="grid2"><label>Registration number *<input name="regNumber" class="input" required></label><label>State<input name="state" class="input"></label><label>Email<input name="email" class="input" type="email"></label><label>Phone<input name="phone" class="input"></label></div><label>Address<input name="address" class="input"></label><label>Subscription plan *<select name="planId" class="input" required><option value="">Select plan…</option>' + state.plans.map((plan) => '<option value="' + plan.id + '">' + plan.name + ' — ' + (plan.memberLimit === -1 ? 'Unlimited' : plan.memberLimit + ' members') + '</option>').join('') + '</select></label><div class="grid2"><label>Administrator name *<input name="adminName" class="input" required></label><label>Administrator email *<input name="adminEmail" class="input" type="email" required></label></div><label>Password (min 8 characters) *<input name="password" class="input" type="password" minlength="8" required></label><button class="btn btn-primary w-full" type="submit">Create cooperative &amp; start trial</button></form><p class="muted small center"><a href="#/login">Already registered? Sign in</a></p></div></div>';
}

function appShell(title, content, page = 'dashboard', memberView = false) {
  const user = currentUser();
  const coop = currentCoop();
  const memberPage = memberView ? (location.hash.split('/')[2] || 'portal') : '';
  const navItems = memberView
    ? [['portal', '📊 My Overview'], ['contributions', '💰 My Contributions'], ['loans', '🏦 My Loans'], ['taxes', '🧾 My Taxes'], ['notifications', '🔔 Notifications'], ['profile', '👤 My Profile']].map(([key, label]) => '<a class="nav-link ' + (memberPage === key ? 'active' : '') + '" href="#/portal' + (key === 'portal' ? '' : '/' + key) + '">' + label + '</a>').join('')
    : [
      ['dashboard', '🏠 Dashboard'],
      ['members', '👥 Members'],
      ['contributions', '💰 Contributions'],
      ['loans', '🏦 Loans'],
      ['income', '📥 Income'],
      ['expenses', '📤 Expenses'],
      ['taxes', '🧾 Taxes'],
      ['reports', '📊 Reports'],
      ['notifications', '🔔 Notifications'],
      ['settings', '⚙️ Subscription'],
      ['profile', '👤 Profile']
    ].map(([key, label]) => '<a class="nav-link ' + (page === key ? 'active' : '') + '" href="#/app/' + key + '">' + label + '</a>').join('');

  const unread = notifCount();

  return '<div class="shell"><aside class="sidebar no-print" id="sidebar"><div class="brand">' + brandLink('#/') + '</div><nav>' + navItems + '</nav><div class="side-foot"><span class="who">' + esc(user ? user.name : '') + '</span><button class="btn-link danger" type="button" data-action="logout">Logout</button></div></aside><div class="main"><header class="topbar no-print"><button class="burger" type="button" data-action="burger" aria-label="Menu">☰</button><h2>' + esc(title) + '</h2><div class="top-right"><a class="bell" href="' + (memberView ? '#/portal/notifications' : '#/app/notifications') + '">🔔' + (unread ? '<span class="count">' + unread + '</span>' : '') + '</a><span class="who">' + esc(user ? user.name : '') + '</span><button class="btn-link danger top-logout" type="button" data-action="logout">Logout</button></div></header><div class="content">' + content + '</div></div></div>';
}

function renderDashboard() {
  const coop = currentCoop();
  if (!coop) return '<p class="empty">No cooperative selected.</p>';
  const stats = coopStats(coop.id);
  const series = monthlySeries(coop.id);
  const recent = state.notifications.filter((item) => item.coopId === coop.id).sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime()).slice(0, 5);

  return appShell('Dashboard', '<div class="cards grid4">' +
    statCard('Active Members', stats.members, 'of ' + stats.totalMembers + ' total') +
    statCard('Total Contributions', fmt(stats.totalContributions), 'all-time') +
    statCard('Outstanding Loans', fmt(stats.outstandingLoans), 'of ' + fmt(stats.totalLoans) + ' disbursed') +
    statCard('Net Balance', fmt(stats.net), 'income − expenses') +
    statCard('Total Income', fmt(stats.totalIncome), '') +
    statCard('Total Expenses', fmt(stats.totalExpenses), '') +
    statCard('Tax Liability', fmt(stats.taxLiability), fmt(stats.taxPaid) + ' paid') +
    statCard('Outstanding Tax', fmt(stats.outstandingTax), '') +
    '</div><div class="cards grid2"><div class="card"><h3>Contributions — last 6 months</h3>' + barChart(series.map((item) => ({ label: item.label, value: item.contributions })), '#4f46e5') + '</div><div class="card"><h3>Income vs Expenses — last 6 months</h3>' + barChartMulti(series.map((item) => ({ label: item.label, values: [item.income, item.expenses] })), ['#10b981', '#ef4444'], ['Income', 'Expenses']) + '</div></div><div class="card"><h3>Recent Activity</h3>' + (recent.length ? recent.map((item) => '<div class="notif ' + (item.read ? 'read' : '') + '"><b>' + esc(item.title) + '</b> <span class="muted small">· ' + fmtDate(item.at) + '</span><p>' + esc(item.msg) + '</p></div>').join('') : '<p class="empty">No activity yet.</p>') + '</div>', 'dashboard');
}

function membersTable(list) {
  if (!list.length) return '<p class="empty">No members found.</p>';
  return '<div class="table-wrap"><table class="table"><thead><tr><th>Member No.</th><th>Full Name</th><th>Email</th><th>Phone</th><th>Occupation</th><th>Joined</th><th>Status</th><th class="no-print">Actions</th></tr></thead><tbody>' + list.map((member) => '<tr><td>' + esc(member.memberNo) + '</td><td>' + esc(member.fullName) + '</td><td>' + esc(member.email || '—') + '</td><td>' + esc(member.phone || '—') + '</td><td>' + esc(member.occupation || '—') + '</td><td>' + fmtDate(member.joined) + '</td><td>' + badge(member.status) + '</td><td class="no-print"><div class="row-actions"><button class="btn-tiny" type="button" data-action="view-member" data-id="' + member.id + '">View</button><button class="btn-tiny" type="button" data-action="edit-member" data-id="' + member.id + '">Edit</button><button class="btn-tiny danger" type="button" data-action="del-member" data-id="' + member.id + '">Del</button></div></td></tr>').join('') + '</tbody></table></div>';
}

function renderMembers() {
  const coop = currentCoop();
  const members = state.members.filter((member) => member.coopId === coop.id).sort((a, b) => new Date(b.joined).getTime() - new Date(a.joined).getTime());
  const active = members.filter((member) => member.status === 'ACTIVE').length;
  const inactive = members.length - active;
  return appShell('Members', '<div class="cards grid3"><div class="mini-stat"><b>' + members.length + '</b><span>Total members</span></div><div class="mini-stat"><b>' + active + '</b><span>Active members</span></div><div class="mini-stat"><b>' + inactive + '</b><span>Inactive members</span></div></div><div class="toolbar"><input id="m-search" class="input" placeholder="Search name / ID / email…"><select id="m-status" class="input"><option value="">All statuses</option><option>ACTIVE</option><option>INACTIVE</option><option>SUSPENDED</option></select><button class="btn btn-primary" type="button" data-action="add-member">+ Add Member</button></div><div id="members-list">' + membersTable(members) + '</div>', 'members');
}

function memberOptions() {
  const coop = currentCoop();
  return state.members.filter((member) => member.coopId === coop.id && member.status === 'ACTIVE').map((member) => '<option value="' + member.id + '">' + esc(member.fullName) + ' (' + esc(member.memberNo) + ')</option>').join('');
}

function memberModal(member) {
  const isEdit = !!member;
  const linkedUser = isEdit ? state.users.find((user) => user.memberId === member.id) : null;
  return '<div class="modal-head"><h3>' + (isEdit ? 'Edit Member' : 'Add Member') + '</h3><button class="modal-x" data-action="close" type="button">×</button></div><form data-form="member" class="form">' + (isEdit ? '<input type="hidden" name="id" value="' + member.id + '">' : '') + '<label>Full name *<input name="fullName" class="input" required value="' + esc(member ? member.fullName : '') + '"></label><div class="grid2"><label>Email<input name="email" class="input" type="email" value="' + esc(member ? member.email : '') + '"></label><label>Phone<input name="phone" class="input" value="' + esc(member ? member.phone : '') + '"></label></div><label>Address<input name="address" class="input" value="' + esc(member ? member.address : '') + '"></label><div class="grid2"><label>Occupation<input name="occupation" class="input" value="' + esc(member ? member.occupation : '') + '"></label><label>Membership date<input name="joined" class="input" type="date" value="' + (member ? new Date(member.joined).toISOString().slice(0, 10) : new Date().toISOString().slice(0, 10)) + '"></label><label>Membership status<select name="status" class="input"><option' + (member?.status === 'ACTIVE' || !member ? ' selected' : '') + '>ACTIVE</option><option' + (member?.status === 'INACTIVE' ? ' selected' : '') + '>INACTIVE</option><option' + (member?.status === 'SUSPENDED' ? ' selected' : '') + '>SUSPENDED</option></select></label></div><label>Portal password (optional)<input name="portalPassword" class="input" type="password" minlength="8" placeholder="Set or change an 8+ character password"><span class="fine">Provide an email and password to enable portal access. Leave blank to keep the current password.</span></label><button class="btn btn-primary w-full" type="submit">' + (isEdit ? 'Save changes' : 'Add member') + '</button></form>';
}

function renderContributions() {
  const coop = currentCoop();
  const contributions = state.contributions.filter((item) => item.coopId === coop.id).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const total = contributions.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  return appShell('Contributions', '<div class="toolbar"><div><strong>' + contributions.length + '</strong> records · Total: <strong>' + fmt(total) + '</strong></div><button class="btn btn-primary" type="button" data-action="add-contribution">+ Record Contribution</button></div>' + (contributions.length ? '<div class="table-wrap"><table class="table"><thead><tr><th>Date</th><th>Member</th><th>Type</th><th>Amount</th><th>Method</th><th>Reference</th><th class="no-print"></th></tr></thead><tbody>' + contributions.map((item) => '<tr><td>' + fmtDate(item.date) + '</td><td>' + esc(memberName(item.memberId)) + '</td><td>' + badge(item.type) + '</td><td>' + fmt(item.amount) + '</td><td>' + esc(item.method) + '</td><td>' + esc(item.ref || '—') + '</td><td class="no-print"><button class="btn-tiny danger" type="button" data-action="del-contribution" data-id="' + item.id + '">Del</button></td></tr>').join('') + '</tbody></table></div>' : '<p class="empty">No contributions yet. Record the first one.</p>'), 'contributions');
}

function contributionModal() {
  return '<div class="modal-head"><h3>Record Contribution</h3><button class="modal-x" data-action="close" type="button">×</button></div><form data-form="contribution" class="form"><label>Member *<select name="memberId" class="input" required>' + memberOptions() + '</select></label><div class="grid2"><label>Type *<select name="type" class="input" required><option>SHARES</option><option>SAVINGS</option><option>MONTHLY_CONTRIBUTION</option><option>SPECIAL_CONTRIBUTION</option></select></label><label>Amount (₦) *<input name="amount" class="input" type="number" min="1" required></label></div><div class="grid2"><label>Method<select name="method" class="input"><option>CASH</option><option>TRANSFER</option><option>CARD</option><option>OTHER</option></select></label><label>Date<input name="date" class="input" type="date" value="' + new Date().toISOString().slice(0, 10) + '"></label></div><label>Reference<input name="ref" class="input"></label><label>Description<textarea name="desc" class="input" rows="2"></textarea></label><button class="btn btn-primary w-full" type="submit">Save contribution</button></form>';
}

function directLoanSummary(loan) {
  const details = loanTotals(loan);
  return { ...loan, ...details };
}

function renderLoans() {
  const coop = currentCoop();
  const loans = state.loans.filter((loan) => loan.coopId === coop.id).map((loan) => directLoanSummary(loan)).sort((a, b) => new Date(b.start).getTime() - new Date(a.start).getTime());

  return appShell('Loans', '<div class="toolbar"><strong>' + loans.length + '</strong> loans</div>' + (loans.length ? '<div class="table-wrap"><table class="table"><thead><tr><th>Member</th><th>Amount</th><th>Rate</th><th>Total Payable</th><th>Paid</th><th>Outstanding</th><th>Due</th><th>Status</th><th class="no-print">Actions</th></tr></thead><tbody>' + loans.map((loan) => '<tr><td>' + esc(memberName(loan.memberId)) + '</td><td>' + fmt(loan.amount) + '</td><td>' + loan.rate + '%</td><td>' + fmt(loan.total) + '</td><td>' + fmt(loan.paid) + '</td><td><strong>' + fmt(loan.outstanding) + '</strong></td><td>' + fmtDate(loan.due) + '</td><td>' + badge(loan.status) + '</td><td class="no-print"><div class="row-actions">' + (loan.status === 'PENDING' ? '<button class="btn-tiny" type="button" data-action="loan-approve" data-id="' + loan.id + '">Approve</button><button class="btn-tiny danger" type="button" data-action="loan-reject" data-id="' + loan.id + '">Reject</button>' : loan.status === 'APPROVED' ? '<button class="btn-tiny" type="button" data-action="loan-disburse" data-id="' + loan.id + '">Disburse</button>' : '<button class="btn-tiny" type="button" data-action="loan-repay-open" data-id="' + loan.id + '">Repay</button>') + '<button class="btn-tiny danger" type="button" data-action="del-loan" data-id="' + loan.id + '">Del</button></div></td></tr>').join('') + '</tbody></table></div>' : '<p class="empty">No loans yet.</p>') + '<button class="btn btn-primary" type="button" data-action="add-loan" style="margin-top:14px">+ New Loan Application</button>', 'loans');
}

function loanModal() {
  return '<div class="modal-head"><h3>Apply for Loan</h3><button class="modal-x" data-action="close" type="button">×</button></div><form data-form="loan" class="form"><label>Member *<select name="memberId" class="input" required>' + memberOptions() + '</select></label><div class="grid2"><label>Amount (₦) *<input name="amount" class="input" type="number" min="1" required></label><label>Interest rate (%) *<input name="rate" class="input" type="number" step="0.1" value="5" required></label><label>Duration (months) *<input name="months" class="input" type="number" min="1" value="12" required></label><label>Frequency<select name="freq" class="input"><option>MONTHLY</option><option>WEEKLY</option><option>QUARTERLY</option></select></label></div><label>Start date<input name="start" class="input" type="date" value="' + new Date().toISOString().slice(0, 10) + '"></label><button class="btn btn-primary w-full" type="submit">Submit application</button></form>';
}

function repayModal(loan) {
  const details = loanTotals(loan);
  return '<div class="modal-head"><h3>Repayment — ' + esc(memberName(loan.memberId)) + '</h3><button class="modal-x" data-action="close" type="button">×</button></div><form data-form="repay" class="form"><input type="hidden" name="loanId" value="' + loan.id + '"><p class="muted small">Outstanding balance: <strong>' + fmt(details.outstanding) + '</strong></p><label>Amount *<input name="amount" class="input" type="number" min="1" max="' + details.outstanding + '" required></label><label>Date<input name="date" class="input" type="date" value="' + new Date().toISOString().slice(0, 10) + '"></label><button class="btn btn-primary w-full" type="submit">Record payment</button></form>';
}

function renderIncome() {
  const coop = currentCoop();
  const records = state.incomes.filter((item) => item.coopId === coop.id).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const total = records.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  return appShell('Income', '<div class="toolbar"><div><strong>' + records.length + '</strong> records · Total income: <strong>' + fmt(total) + '</strong></div><button class="btn btn-primary" type="button" data-action="add-income">+ Add Income</button></div>' + (records.length ? '<div class="table-wrap"><table class="table"><thead><tr><th>Date</th><th>Source</th><th>Category</th><th>Amount</th><th>Reference</th><th class="no-print"></th></tr></thead><tbody>' + records.map((item) => '<tr><td>' + fmtDate(item.date) + '</td><td>' + esc(item.source) + '</td><td>' + esc(item.category) + '</td><td>' + fmt(item.amount) + '</td><td>' + esc(item.ref || '—') + '</td><td class="no-print"><button class="btn-tiny danger" type="button" data-action="del-income" data-id="' + item.id + '">Del</button></td></tr>').join('') + '</tbody></table></div>' : '<p class="empty">No income recorded yet.</p>'), 'income');
}

function incomeModal() {
  return '<div class="modal-head"><h3>Add Income</h3><button class="modal-x" data-action="close" type="button">×</button></div><form data-form="income" class="form"><label>Source *<input name="source" class="input" required></label><div class="grid2"><label>Category *<input name="category" class="input" required></label><label>Amount (₦) *<input name="amount" class="input" type="number" min="1" required></label></div><div class="grid2"><label>Date<input name="date" class="input" type="date" value="' + new Date().toISOString().slice(0, 10) + '"></label><label>Reference<input name="ref" class="input"></label></div><label>Description<textarea name="desc" class="input" rows="2"></textarea></label><button class="btn btn-primary w-full" type="submit">Save income</button></form>';
}

function renderExpenses() {
  const coop = currentCoop();
  const records = state.expenses.filter((item) => item.coopId === coop.id).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const total = records.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  return appShell('Expenses', '<div class="toolbar"><div><strong>' + records.length + '</strong> records · Total expenses: <strong>' + fmt(total) + '</strong></div><button class="btn btn-primary" type="button" data-action="add-expense">+ Add Expense</button></div>' + (records.length ? '<div class="table-wrap"><table class="table"><thead><tr><th>Date</th><th>Category</th><th>Amount</th><th>Payee</th><th>Reference</th><th class="no-print"></th></tr></thead><tbody>' + records.map((item) => '<tr><td>' + fmtDate(item.date) + '</td><td>' + esc(item.category) + '</td><td>' + fmt(item.amount) + '</td><td>' + esc(item.payee || '—') + '</td><td>' + esc(item.ref || '—') + '</td><td class="no-print"><button class="btn-tiny danger" type="button" data-action="del-expense" data-id="' + item.id + '">Del</button></td></tr>').join('') + '</tbody></table></div>' : '<p class="empty">No expenses recorded yet.</p>'), 'expenses');
}

function expenseModal() {
  return '<div class="modal-head"><h3>Add Expense</h3><button class="modal-x" data-action="close" type="button">×</button></div><form data-form="expense" class="form"><label>Category *<input name="category" class="input" required></label><div class="grid2"><label>Amount (₦) *<input name="amount" class="input" type="number" min="1" required></label><label>Payee<input name="payee" class="input"></label></div><div class="grid2"><label>Date<input name="date" class="input" type="date" value="' + new Date().toISOString().slice(0, 10) + '"></label><label>Reference<input name="ref" class="input"></label></div><label>Description<textarea name="desc" class="input" rows="2"></textarea></label><button class="btn btn-primary w-full" type="submit">Save expense</button></form>';
}

function renderTaxes() {
  const coop = currentCoop();
  const rules = state.taxRules.filter((item) => item.coopId === coop.id);
  const records = state.taxRecords.filter((item) => item.coopId === coop.id).sort((a, b) => b.period.localeCompare(a.period));
  const liability = records.reduce((sum, item) => sum + Number(item.liability || 0), 0);
  const paid = records.reduce((sum, item) => sum + Number(item.paid || 0), 0);

  return appShell('Tax Management', '<div class="cards grid3">' + statCard('Tax Liability', fmt(liability), '') + statCard('Tax Paid', fmt(paid), '') + statCard('Outstanding Tax', fmt(Math.max(0, liability - paid)), '') + '</div><div class="card"><h3>Compute Tax</h3><form data-form="taxcompute" class="form inline"><select name="ruleId" class="input" required><option value="">Select active rule…</option>' + rules.filter((rule) => rule.active).map((rule) => '<option value="' + rule.id + '">' + esc(rule.name) + ' (' + rule.rate + '%)</option>').join('') + '</select><input name="period" class="input" value="' + new Date().getFullYear() + '" style="max-width:110px"><button class="btn btn-primary" type="submit">Compute</button></form><p class="fine">Taxable Income = Gross Income − Allowable Deductions; Tax Liability = Taxable Income × Rate. Demo values are for p.r. visibility only.</p></div><div class="card"><div class="toolbar"><h3>Tax Rules</h3><button class="btn btn-primary small" type="button" data-action="add-taxrule" style="margin-left:auto">+ Add Rule</button></div><div class="table-wrap"><table class="table"><thead><tr><th>Name</th><th>Type</th><th>Rate %</th><th>Threshold</th><th>Deduction</th><th>Status</th><th class="no-print"></th></tr></thead><tbody>' + (rules.length ? rules.map((rule) => '<tr><td>' + esc(rule.name) + '</td><td>' + esc(rule.taxType) + '</td><td>' + rule.rate + '%</td><td>' + fmt(rule.threshold) + '</td><td>' + fmt(rule.deduction) + '</td><td>' + badge(rule.active ? 'ACTIVE' : 'INACTIVE') + '</td><td class="no-print"><button class="btn-tiny danger" type="button" data-action="del-taxrule" data-id="' + rule.id + '">Del</button></td></tr>').join('') : '<tr><td colspan="7" class="empty">No rules yet — add your first rule.</td></tr>') + '</tbody></table></div></div><div class="card"><h3>Tax Records</h3><div class="table-wrap"><table class="table"><thead><tr><th>Period</th><th>Rule</th><th>Taxable Income</th><th>Liability</th><th>Paid</th><th>Outstanding</th><th>Status</th><th class="no-print"></th></tr></thead><tbody>' + (records.length ? records.map((record) => { const rule = state.taxRules.find((item) => item.id === record.ruleId); return '<tr><td>' + esc(record.period) + '</td><td>' + (rule ? esc(rule.name) : '—') + '</td><td>' + fmt(record.taxableIncome) + '</td><td>' + fmt(record.liability) + '</td><td>' + fmt(record.paid) + '</td><td>' + fmt(Math.max(0, record.liability - record.paid)) + '</td><td>' + badge(record.status) + '</td><td class="no-print">' + (record.status !== 'PAID' ? '<button class="btn-tiny" type="button" data-action="tax-pay-open" data-id="' + record.id + '">Pay</button>' : '') + '</td></tr>'; }).join('') : '<tr><td colspan="8" class="empty">No tax records yet — run a computation above.</td></tr>') + '</tbody></table></div></div>', 'taxes');
}

function taxRuleModal() {
  return '<div class="modal-head"><h3>Add Tax Rule</h3><button class="modal-x" data-action="close" type="button">×</button></div><form data-form="taxrule" class="form"><label>Rule name *<input name="name" class="input" required></label><div class="grid2"><label>Tax type *<input name="taxType" class="input" required></label><label>Rate (%) *<input name="rate" class="input" type="number" step="0.01" required></label><label>Threshold (₦)<input name="threshold" class="input" type="number"></label><label>Allowable deduction (₦)<input name="deduction" class="input" type="number"></label></div><label>Effective date<input name="eff" class="input" type="date" value="' + new Date().toISOString().slice(0, 10) + '"></label><label>Active<select name="active" class="input"><option value="true">Yes</option><option value="false">No</option></select></label><button class="btn btn-primary w-full" type="submit">Save rule</button><p class="fine">Rates here are configurable placeholders — not legal advice.</p></form>';
}

function taxPayModal(record) {
  return '<div class="modal-head"><h3>Record Tax Payment</h3><button class="modal-x" data-action="close" type="button">×</button></div><form data-form="taxpay" class="form"><input type="hidden" name="recordId" value="' + record.id + '"><p class="muted small">Outstanding: <strong>' + fmt(Math.max(0, record.liability - record.paid)) + '</strong></p><label>Amount *<input name="amount" class="input" type="number" min="1" required></label><button class="btn btn-primary w-full" type="submit">Record payment</button></form>';
}

function csvDownload(rows, filename) {
  if (!rows.length) return;
  const columns = Object.keys(rows[0]);
  const csv = [columns.join(','), ...rows.map((row) => columns.map((column) => '"' + String(row[column] ?? '').replace(/"/g, '""') + '"').join(','))].join('\n');
  const link = document.createElement('a');
  link.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
  link.download = filename;
  link.click();
  URL.revokeObjectURL(link.href);
}

function reportExportRows(coopId) {
  const rows = [];
  state.members.filter((member) => member.coopId === coopId).forEach((member) => {
    const contributions = state.contributions.filter((item) => item.coopId === coopId && item.memberId === member.id);
    rows.push({ recordType: 'MEMBER_TOTAL', memberNo: member.memberNo, member: member.fullName, status: member.status, date: '', type: '', amount: '', method: '', loanStatus: '', reference: '', totalContributions: contributions.reduce((sum, item) => sum + Number(item.amount || 0), 0) });
    contributions.forEach((item) => rows.push({ recordType: 'CONTRIBUTION', memberNo: member.memberNo, member: member.fullName, status: member.status, date: fmtDate(item.date), type: item.type, amount: item.amount, method: item.method || '', loanStatus: '', reference: item.ref || '', totalContributions: '' }));
    state.loans.filter((item) => item.coopId === coopId && item.memberId === member.id).forEach((loan) => {
      rows.push({ recordType: 'LOAN', memberNo: member.memberNo, member: member.fullName, status: member.status, date: fmtDate(loan.start), type: 'LOAN', amount: loan.amount, method: '', loanStatus: loan.status, reference: loan.id, totalContributions: '' });
      state.repayments.filter((item) => item.coopId === coopId && item.loanId === loan.id).forEach((repayment) => rows.push({ recordType: 'REPAYMENT', memberNo: member.memberNo, member: member.fullName, status: member.status, date: fmtDate(repayment.date), type: 'LOAN_REPAYMENT', amount: repayment.amount, method: '', loanStatus: loan.status, reference: repayment.ref || loan.id, totalContributions: '' }));
    });
  });
  return rows;
}

function renderReports() {
  const coop = currentCoop();
  const members = state.members.filter((member) => member.coopId === coop.id).sort((a, b) => a.fullName.localeCompare(b.fullName));
  const memberRows = members.map((member) => {
    const contributions = state.contributions.filter((item) => item.coopId === coop.id && item.memberId === member.id).sort((a, b) => new Date(b.date) - new Date(a.date));
    const total = contributions.reduce((sum, item) => sum + Number(item.amount || 0), 0);
    return '<tr><td>' + esc(member.memberNo) + '</td><td>' + esc(member.fullName) + '</td><td>' + badge(member.status) + '</td><td>' + contributions.length + '</td><td>' + fmt(total) + '</td><td>' + (contributions.length ? contributions.map((item) => fmtDate(item.date) + ' ' + esc(item.type.replace(/_/g, ' ')) + ': ' + fmt(item.amount)).join('<br>') : '—') + '</td></tr>';
  }).join('');
  const contributions = state.contributions.filter((item) => item.coopId === coop.id).sort((a, b) => new Date(b.date) - new Date(a.date));
  const loans = state.loans.filter((item) => item.coopId === coop.id).sort((a, b) => new Date(b.start) - new Date(a.start));
  const repayments = state.repayments.filter((item) => item.coopId === coop.id).sort((a, b) => new Date(b.date) - new Date(a.date));
  return appShell('Reports', '<div class="toolbar"><strong>' + members.length + ' registered members</strong><button class="btn btn-outline small" type="button" data-action="export-report" style="margin-left:auto">Export CSV</button><button class="btn btn-outline small" type="button" data-action="print-report">Print</button></div>' +
    '<div class="card"><h3>Member contribution summary and history</h3><div class="table-wrap"><table class="table"><thead><tr><th>Member No.</th><th>Member</th><th>Status</th><th>Payments</th><th>Total Contributions</th><th>Contribution History</th></tr></thead><tbody>' + (memberRows || '<tr><td colspan="6" class="empty">No registered members.</td></tr>') + '</tbody></table></div></div>' +
    '<div class="card"><h3>Contribution records (' + contributions.length + ')</h3><div class="table-wrap"><table class="table"><thead><tr><th>Date</th><th>Member</th><th>Type</th><th>Amount</th><th>Method</th><th>Reference</th></tr></thead><tbody>' + (contributions.length ? contributions.map((item) => '<tr><td>' + fmtDate(item.date) + '</td><td>' + esc(memberName(item.memberId)) + '</td><td>' + esc(item.type.replace(/_/g, ' ')) + '</td><td>' + fmt(item.amount) + '</td><td>' + esc(item.method || '—') + '</td><td>' + esc(item.ref || '—') + '</td></tr>').join('') : '<tr><td colspan="6" class="empty">No contribution records.</td></tr>') + '</tbody></table></div></div>' +
    '<div class="card"><h3>Loans (' + loans.length + ')</h3><div class="table-wrap"><table class="table"><thead><tr><th>Member</th><th>Applied</th><th>Amount</th><th>Rate</th><th>Paid</th><th>Outstanding</th><th>Due</th><th>Status</th></tr></thead><tbody>' + (loans.length ? loans.map((loan) => { const totals = loanTotals(loan); return '<tr><td>' + esc(memberName(loan.memberId)) + '</td><td>' + fmtDate(loan.start) + '</td><td>' + fmt(loan.amount) + '</td><td>' + Number(loan.rate || 0) + '%</td><td>' + fmt(totals.paid) + '</td><td>' + fmt(totals.outstanding) + '</td><td>' + fmtDate(loan.due) + '</td><td>' + badge(loan.status) + '</td></tr>'; }).join('') : '<tr><td colspan="8" class="empty">No loan records.</td></tr>') + '</tbody></table></div></div>' +
    '<div class="card"><h3>Repayment records (' + repayments.length + ')</h3><div class="table-wrap"><table class="table"><thead><tr><th>Date</th><th>Member</th><th>Loan</th><th>Amount</th><th>Reference</th></tr></thead><tbody>' + (repayments.length ? repayments.map((item) => '<tr><td>' + fmtDate(item.date) + '</td><td>' + esc(memberName(item.memberId)) + '</td><td>' + esc(item.loanId) + '</td><td>' + fmt(item.amount) + '</td><td>' + esc(item.ref || '—') + '</td></tr>').join('') : '<tr><td colspan="5" class="empty">No repayment records.</td></tr>') + '</tbody></table></div></div>', 'reports');
}

function renderNotifications(memberView = false) {
  const user = currentUser();
  const coop = currentCoop();
  const items = state.notifications.filter((item) => item.coopId === coop.id && (!item.userId || item.userId === user.id)).map((item) => ({ ...item, read: notificationRead(item, user.id) })).sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime());
  const unread = items.filter((item) => !item.read).length;
  const compose = !memberView && ['COOP_ADMIN', 'STAFF'].includes(user.role) ? '<div class="card"><h3>Send member notification</h3><form data-form="notification" class="form"><div class="grid2"><label>Type<select name="type" class="input"><option value="ANNOUNCEMENT">General announcement</option><option value="LOAN_AVAILABILITY">Loan availability</option><option value="CONTRIBUTION_REMINDER">Contribution reminder</option><option value="REPAYMENT_REMINDER">Loan repayment reminder</option></select></label><label>Recipient<select name="memberId" class="input"><option value="ALL">All active members</option>' + state.members.filter((member) => member.coopId === coop.id && member.status === 'ACTIVE').map((member) => '<option value="' + member.id + '">' + esc(member.fullName) + ' (' + esc(member.memberNo) + ')</option>').join('') + '</select></label></div><label>Title<input name="title" class="input" maxlength="100" required></label><label>Message<textarea name="message" class="input" rows="3" maxlength="500" required></textarea></label><button class="btn btn-primary" type="submit">Send notification</button></form></div>' : '';
  return appShell('Notifications', compose + '<div class="toolbar"><h3>Notifications (' + unread + ' unread)</h3><button class="btn btn-outline small" type="button" data-action="mark-all" style="margin-left:auto">Mark all read</button></div>' + (items.length ? items.map((item) => '<div class="notif ' + (item.read ? 'read' : '') + '" data-action="read-one" data-id="' + item.id + '"><div><b>' + esc(item.title) + '</b> ' + badge(item.read ? 'READ' : 'UNREAD') + ' <span class="muted small">· ' + fmtDate(item.at) + '</span></div><p>' + esc(item.msg) + '</p></div>').join('') : '<p class="empty">No notifications.</p>'), 'notifications', memberView);
}

function renderSettings() {
  const coop = currentCoop();
  const payments = state.payments.filter((item) => item.coopId === coop.id).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return appShell('Subscription & Settings', '<div class="card"><h3>Current Subscription</h3><p>Plan: <strong>' + esc(coop.planName) + '</strong> · Status: ' + badge(coop.status) + ' · Member limit: ' + (coop.memberLimit === -1 ? 'Unlimited' : coop.memberLimit) + '</p></div><div class="p-grid">' + state.plans.map((plan) => '<div class="p-card ' + (coop.planId === plan.id ? 'current' : '') + '"><h3>' + plan.name + '</h3><div class="price">₦' + plan.monthly.toLocaleString() + '<small>/mo</small></div><p class="sub">' + (plan.memberLimit === -1 ? 'Unlimited members' : 'Up to ' + plan.memberLimit + ' members') + '</p><div class="row-actions"><button class="btn btn-primary small" type="button" data-action="subscribe" data-plan="' + plan.id + '" data-billing="MONTHLY">Monthly</button><button class="btn btn-outline small" type="button" data-action="subscribe" data-plan="' + plan.id + '" data-billing="YEARLY">Yearly</button></div></div>').join('') + '</div><div class="card"><h3>Payment History</h3><div class="table-wrap"><table class="table"><thead><tr><th>Date</th><th>Plan</th><th>Amount</th><th>Method</th><th>Reference</th><th>Status</th></tr></thead><tbody>' + (payments.length ? payments.map((item) => '<tr><td>' + fmtDate(item.date) + '</td><td>' + esc(item.planName) + '</td><td>' + fmt(item.amount) + '</td><td>' + esc(item.method) + '</td><td>' + esc(item.ref) + '</td><td>' + badge(item.status) + '</td></tr>').join('') : '<tr><td colspan="6" class="empty">No payments yet.</td></tr>') + '</tbody></table></div></div>', 'settings');
}

function renderProfile() {
  const user = currentUser();
  const coop = currentCoop();
  return appShell('Profile', '<div class="card"><h3>Profile</h3><p><strong>' + esc(user.name) + '</strong></p><p class="muted">' + esc(user.email) + '</p><p>Role: ' + badge(user.role) + '</p>' + (coop ? '<p>Cooperative: ' + esc(coop.name) + '</p>' : '') + '<p class="fine">Password change and other profile settings are part of the production server build.</p></div>', 'profile');
}

function renderPortal() {
  const user = currentUser();
  const coop = currentCoop();
  const member = state.members.find((item) => item.id === user.memberId);
  if (!member) return appShell('My Overview', '<p class="empty">No member record linked to this account.</p>', 'portal', true);

  const contributions = state.contributions.filter((item) => item.coopId === coop.id && item.memberId === member.id).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const loans = state.loans.filter((item) => item.coopId === coop.id && item.memberId === member.id).map((item) => ({ ...item, ...loanTotals(item) }));
  const taxRecords = state.taxRecords.filter((item) => item.coopId === coop.id && item.memberId === member.id);
  const notifications = state.notifications.filter((item) => item.coopId === coop.id && (!item.userId || item.userId === user.id)).sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime()).slice(0, 6);
  const contributionTotal = contributions.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const outstandingLoan = loans.reduce((sum, item) => sum + Number(item.outstanding || 0), 0);
  const outstandingTax = taxRecords.reduce((sum, item) => sum + Math.max(0, Number(item.liability || 0) - Number(item.paid || 0)), 0);

  return appShell('My Overview', '<div class="card"><h3>' + esc(member.fullName) + '</h3><p class="muted small">' + esc(member.memberNo) + ' · Joined ' + fmtDate(member.joined) + ' · ' + esc(member.occupation || '') + ' · ' + badge(member.status) + '</p></div><div class="cards grid4">' + statCard('My Contributions', fmt(contributionTotal), contributions.length + ' payments') + statCard('Outstanding Loan', fmt(outstandingLoan), '') + statCard('Outstanding Tax', fmt(outstandingTax), '') + statCard('Savings Position', fmt(contributionTotal - outstandingLoan), '') + '</div><div class="card"><h3>My Contributions</h3><div class="table-wrap"><table class="table"><thead><tr><th>Date</th><th>Type</th><th>Amount</th><th>Method</th></tr></thead><tbody>' + (contributions.length ? contributions.map((item) => '<tr><td>' + fmtDate(item.date) + '</td><td>' + esc(item.type.replace(/_/g, ' ')) + '</td><td>' + fmt(item.amount) + '</td><td>' + esc(item.method) + '</td></tr>').join('') : '<tr><td colspan="4" class="empty">No contributions yet.</td></tr>') + '</tbody></table></div></div><div class="card"><h3>My Loans</h3><div class="table-wrap"><table class="table"><thead><tr><th>Amount</th><th>Total Payable</th><th>Paid</th><th>Outstanding</th><th>Due</th><th>Status</th></tr></thead><tbody>' + (loans.length ? loans.map((item) => '<tr><td>' + fmt(item.amount) + '</td><td>' + fmt(item.total) + '</td><td>' + fmt(item.paid) + '</td><td>' + fmt(item.outstanding) + '</td><td>' + fmtDate(item.due) + '</td><td>' + badge(item.status) + '</td></tr>').join('') : '<tr><td colspan="6" class="empty">No loans.</td></tr>') + '</tbody></table></div></div><div class="card"><h3>My Tax Records</h3><div class="table-wrap"><table class="table"><thead><tr><th>Period</th><th>Liability</th><th>Paid</th><th>Outstanding</th><th>Status</th></tr></thead><tbody>' + (taxRecords.length ? taxRecords.map((item) => '<tr><td>' + esc(item.period) + '</td><td>' + fmt(item.liability) + '</td><td>' + fmt(item.paid) + '</td><td>' + fmt(Math.max(0, Number(item.liability || 0) - Number(item.paid || 0))) + '</td><td>' + badge(item.status) + '</td></tr>').join('') : '<tr><td colspan="5" class="empty">No tax records.</td></tr>') + '</tbody></table></div></div><div class="card"><h3>Notifications</h3>' + (notifications.length ? notifications.map((item) => '<div class="notif ' + (item.read ? 'read' : '') + '"><b>' + esc(item.title) + '</b> <span class="muted small">· ' + fmtDate(item.at) + '</span><p>' + esc(item.msg) + '</p></div>').join('') : '<p class="empty">All caught up.</p>') + '</div>', 'portal', true);
}

function superCoopSummary(coopId) {
  const members = state.members.filter((member) => member.coopId === coopId);
  const contributions = state.contributions.filter((item) => item.coopId === coopId).reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const loans = state.loans.filter((item) => item.coopId === coopId).reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const repayments = state.repayments.filter((item) => item.coopId === coopId).reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const taxOutstanding = state.taxRecords.filter((item) => item.coopId === coopId).reduce((sum, item) => sum + Math.max(0, Number(item.liability || 0) - Number(item.paid || 0)), 0);
  const payments = state.payments.filter((item) => item.coopId === coopId).reduce((sum, item) => sum + Number(item.amount || 0), 0);

  return {
    members: members.length,
    activeMembers: members.filter((member) => member.status === 'ACTIVE').length,
    contributions,
    loans,
    repayments,
    taxOutstanding,
    payments
  };
}

function renderSuperAdminEnhanced() {
  const me = currentUser();
  const coops = state.coops;
  const statusCounts = coops.reduce((counts, coop) => { counts[coop.status] = (counts[coop.status] || 0) + 1; return counts; }, {});
  const revenue = state.payments.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const pendingTax = state.taxRecords.reduce((sum, item) => sum + Math.max(0, Number(item.liability || 0) - Number(item.paid || 0)), 0);
  const coopRows = coops.map((coop) => { const info = superCoopSummary(coop.id); return '<tr><td>' + esc(coop.name) + '</td><td>' + esc(coop.regNumber) + '</td><td>' + esc(coop.planName) + '</td><td>' + info.members + '/' + (coop.memberLimit === -1 ? 'Unlimited' : coop.memberLimit) + '</td><td>' + fmt(info.payments) + '</td><td><select class="input" data-action="coop-status" data-id="' + coop.id + '"><option' + (coop.status === 'TRIAL' ? ' selected' : '') + '>TRIAL</option><option' + (coop.status === 'ACTIVE' ? ' selected' : '') + '>ACTIVE</option><option' + (coop.status === 'EXPIRED' ? ' selected' : '') + '>EXPIRED</option><option' + (coop.status === 'SUSPENDED' ? ' selected' : '') + '>SUSPENDED</option><option' + (coop.status === 'CANCELLED' ? ' selected' : '') + '>CANCELLED</option></select></td><td><div class="row-actions"><button class="btn-tiny" type="button" data-action="super-view-coop" data-id="' + coop.id + '">View</button><button class="btn-tiny danger" type="button" data-action="super-delete-coop" data-id="' + coop.id + '">Delete</button></div></td></tr>'; }).join('');
  const userRows = state.users.map((user) => { const locked = user.id === me.id; const coop = state.coops.find((item) => item.id === user.coopId); return '<tr><td>' + esc(user.name) + '</td><td>' + esc(user.email) + '</td><td>' + badge(user.role) + '</td><td>' + esc(coop ? coop.name : 'Platform') + '</td><td><select class="input" data-action="super-user-status" data-id="' + user.id + '"' + (locked ? ' disabled' : '') + '><option' + (user.status === 'ACTIVE' ? ' selected' : '') + '>ACTIVE</option><option' + (user.status !== 'ACTIVE' ? ' selected' : '') + '>INACTIVE</option></select></td><td><button class="btn-tiny danger" type="button" data-action="super-delete-user" data-id="' + user.id + '"' + (locked ? ' disabled' : '') + '>Delete</button></td></tr>'; }).join('');
  const auditRows = state.audit.slice().sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime()).slice(0, 10).map((entry) => '<div class="notif read"><b>' + esc(entry.action) + '</b> <span class="muted small">· ' + fmtDate(entry.at) + '</span><p>' + esc(entry.entity || 'SYSTEM') + '</p></div>').join('');
  return '<div class="shell"><aside class="sidebar no-print" id="sidebar"><div class="brand">' + brandLink('#/') + '</div><nav><a class="nav-link active" href="#/superadmin">🌐 Platform Overview</a><a class="nav-link" href="#/">← Back to Site</a></nav><div class="side-foot"><span class="who">' + esc(me.name) + '</span><button class="btn-link danger" data-action="logout" type="button">Logout</button></div></aside><div class="main"><header class="topbar no-print"><button class="burger" type="button" data-action="burger" aria-label="Menu">☰</button><h2>Super Admin</h2><div class="top-right"><span class="who">' + esc(me.name) + '</span></div></header><div class="content"><div class="cards grid4">' + statCard('Cooperatives', coops.length, '') + statCard('Active', statusCounts.ACTIVE || 0, '') + statCard('Users', state.users.length, '') + statCard('Platform Revenue', fmt(revenue), '') + '</div><div class="cards grid4">' + statCard('Members', state.members.length, 'across all co-ops') + statCard('Trial', statusCounts.TRIAL || 0, '') + statCard('Open Loans', state.loans.filter((loan) => ['PENDING', 'APPROVED', 'ACTIVE', 'PARTIALLY_PAID'].includes(loan.status)).length, '') + statCard('Pending Tax', fmt(pendingTax), '') + '</div><div class="card"><h3>Platform Controls</h3><div class="row-actions"><button class="btn btn-primary small" type="button" data-action="super-reset-demo">Reset demo data</button><button class="btn btn-outline small" type="button" data-action="super-export-summary">Export summary</button><button class="btn btn-outline small" type="button" data-action="super-export-users">Export users</button></div></div><div class="card"><h3>Cooperative Directory</h3><div class="table-wrap"><table class="table"><thead><tr><th>Name</th><th>Reg No.</th><th>Plan</th><th>Members</th><th>Revenue</th><th>Status</th><th>Actions</th></tr></thead><tbody>' + coopRows + '</tbody></table></div></div><div class="card"><h3>User Administration</h3><p class="fine">Delete or deactivate any account except your current super-admin account.</p><div class="table-wrap"><table class="table"><thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Cooperative</th><th>Status</th><th>Actions</th></tr></thead><tbody>' + userRows + '</tbody></table></div></div><div class="card"><h3>Recent Platform Audit</h3>' + (auditRows || '<p class="empty">No audit events.</p>') + '</div></div></div></div>';
}

function renderSuperAdmin() {
  const me = currentUser();
  const coops = state.coops;
  const payments = state.payments;
  const byStatus = {};
  coops.forEach((coop) => {
    byStatus[coop.status] = (byStatus[coop.status] || 0) + 1;
  });
  const platformRevenue = payments.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const totalMembers = state.members.length;
  const totalContributionValue = state.contributions.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const openLoans = state.loans.filter((loan) => ['PENDING', 'APPROVED', 'ACTIVE', 'PARTIALLY_PAID'].includes(loan.status)).length;

  return '<div class="shell"><aside class="sidebar no-print" id="sidebar"><div class="brand">' + brandLink('#/') + '</div><nav><a class="nav-link active" href="#/superadmin">🌐 Platform Overview</a><a class="nav-link" href="#/">← Back to Site</a></nav><div class="side-foot"><span class="who">' + esc(me.name) + '</span><button class="btn-link danger" data-action="logout" type="button">Logout</button></div></aside><div class="main"><header class="topbar no-print"><h2>Super Admin</h2><div class="top-right"><span class="who">' + esc(me.name) + '</span></div></header><div class="content"><div class="cards grid4">' + statCard('Cooperatives', coops.length, '') + statCard('Active', byStatus.ACTIVE || 0, '') + statCard('Trial', byStatus.TRIAL || 0, '') + statCard('Platform Revenue', fmt(platformRevenue), '') + '</div><div class="cards grid4" style="margin-top:16px">' + statCard('Members', totalMembers, 'across all co-ops') + statCard('Contribution Value', fmt(totalContributionValue), '') + statCard('Open Loans', openLoans, '') + statCard('Pending Tax', fmt(state.taxRecords.reduce((sum, item) => sum + Math.max(0, Number(item.liability || 0) - Number(item.paid || 0)), 0)), '') + '</div><div class="card" style="margin-top:16px"><h3>Quick actions</h3><div class="row-actions"><button class="btn btn-primary small" type="button" data-action="super-reset-demo">Reset demo data</button><button class="btn btn-outline small" type="button" data-action="super-export-summary">Export summary</button></div></div><div class="card" style="margin-top:16px"><h3>Cooperative Directory</h3><div class="table-wrap"><table class="table"><thead><tr><th>Name</th><th>Reg No.</th><th>Plan</th><th>Members</th><th>Revenue</th><th>Status</th><th class="no-print">Actions</th></tr></thead><tbody>' + coops.map((coop) => { const info = superCoopSummary(coop.id); return '<tr><td>' + esc(coop.name) + '</td><td>' + esc(coop.regNumber) + '</td><td>' + esc(coop.planName) + '</td><td>' + info.members + '/' + (coop.memberLimit === -1 ? '∞' : coop.memberLimit) + '</td><td>' + fmt(info.payments) + '</td><td><select class="input" data-action="coop-status" data-id="' + coop.id + '" style="min-width:130px">' + ['TRIAL', 'ACTIVE', 'EXPIRED', 'SUSPENDED', 'CANCELLED'].map((item) => '<option' + (coop.status === item ? ' selected' : '') + '>' + item + '</option>').join('') + '</select></td><td class="no-print"><div class="row-actions"><button class="btn-tiny" type="button" data-action="super-view-coop" data-id="' + coop.id + '">View</button><button class="btn-tiny danger" type="button" data-action="super-delete-coop" data-id="' + coop.id + '">Delete</button></div></td></tr>'; }).join('') + '</tbody></table></div></div><div class="card" style="margin-top:16px"><h3>Payments</h3><div class="table-wrap"><table class="table"><thead><tr><th>Date</th><th>Cooperative</th><th>Plan</th><th>Amount</th><th>Method</th><th>Reference</th></tr></thead><tbody>' + (payments.length ? payments.map((item) => { const coop = state.coops.find((entry) => entry.id === item.coopId); return '<tr><td>' + fmtDate(item.date) + '</td><td>' + esc(coop ? coop.name : '—') + '</td><td>' + esc(item.planName) + '</td><td>' + fmt(item.amount) + '</td><td>' + esc(item.method) + '</td><td>' + esc(item.ref) + '</td></tr>'; }).join('') : '<tr><td colspan="6" class="empty">No payments yet.</td></tr>') + '</tbody></table></div></div></div></div></div>';
}

function addSuperAdminNavigation() {
  const nav = document.querySelector('#sidebar nav');
  if (!nav || nav.dataset.modulesAdded === 'true') return;
  nav.dataset.modulesAdded = 'true';
  nav.insertAdjacentHTML('beforeend', '<a class="nav-link" href="#/app/dashboard">🏠 Dashboard</a><a class="nav-link" href="#/app/members">👥 Members</a><a class="nav-link" href="#/app/contributions">💰 Contributions</a><a class="nav-link" href="#/app/loans">🏦 Loans</a><a class="nav-link" href="#/app/income">📥 Income</a><a class="nav-link" href="#/app/expenses">📤 Expenses</a><a class="nav-link" href="#/app/taxes">🧾 Taxes</a><a class="nav-link" href="#/app/reports">📊 Reports</a><a class="nav-link" href="#/app/notifications">🔔 Notifications</a><a class="nav-link" href="#/app/settings">⚙️ Subscription</a><a class="nav-link" href="#/app/profile">👤 Profile</a>');
  const topRight = document.querySelector('.top-right');
  if (topRight && !topRight.querySelector('.top-logout')) {
    topRight.insertAdjacentHTML('beforeend', '<button class="btn-link danger top-logout" type="button" data-action="logout">Logout</button>');
  }
}

function route() {
  const hash = location.hash || '#/';
  const path = hash.replace(/^#\//, '').split('/');
  const root = path[0] || '';
  const sub = path[1] || '';
  const user = currentUser();

  if (root === '') {
    document.getElementById('app').innerHTML = renderLanding();
    return;
  }

  if (root === 'login') {
    if (user) {
      goHome();
      return;
    }
    document.getElementById('app').innerHTML = renderLogin();
    return;
  }

  if (root === 'register') {
    if (user) {
      goHome();
      return;
    }
    document.getElementById('app').innerHTML = renderRegister();
    return;
  }

  if (!user) {
    location.hash = '#/login';
    return;
  }

  if (user.coopId && ['COOP_ADMIN', 'STAFF', 'MEMBER'].includes(user.role)) ensureCoopReminders(user.coopId);

  if (root === 'superadmin') {
    if (user.role !== 'SUPER_ADMIN') {
      goHome();
      return;
    }
    document.getElementById('app').innerHTML = renderSuperAdminEnhanced();
    addSuperAdminNavigation();
    return;
  }

  if (root === 'portal') {
    if (user.role !== 'MEMBER') {
      goHome();
      return;
    }
    if (sub === 'notifications') {
      document.getElementById('app').innerHTML = renderNotifications(true);
      return;
    }
    document.getElementById('app').innerHTML = renderPortal();
    return;
  }

  if (root === 'app') {
    if (!['COOP_ADMIN', 'STAFF', 'SUPER_ADMIN'].includes(user.role)) {
      goHome();
      return;
    }
    const page = sub || 'dashboard';
    if (user.role === 'MEMBER') {
      routeTo('portal');
      return;
    }

    const map = {
      dashboard: () => appShell('Dashboard', '<div class="cards grid4">' + statCard('Active Members', coopStats(currentCoop().id).members, 'of ' + coopStats(currentCoop().id).totalMembers + ' total') + statCard('Total Contributions', fmt(coopStats(currentCoop().id).totalContributions), 'all-time') + statCard('Outstanding Loans', fmt(coopStats(currentCoop().id).outstandingLoans), 'of ' + fmt(coopStats(currentCoop().id).totalLoans) + ' disbursed') + statCard('Net Balance', fmt(coopStats(currentCoop().id).net), 'income − expenses') + '</div>', 'dashboard'),
      members: renderMembers,
      contributions: renderContributions,
      loans: renderLoans,
      income: renderIncome,
      expenses: renderExpenses,
      taxes: renderTaxes,
      reports: renderReports,
      notifications: renderNotifications,
      settings: renderSettings,
      profile: renderProfile
    };

    const pageRenderer = map[page] || map.dashboard;
    document.getElementById('app').innerHTML = pageRenderer();
    return;
  }

  goHome();
}

function toast(message, type = 'success') {
  const root = document.getElementById('toast-root') || document.body.appendChild(Object.assign(document.createElement('div'), { id: 'toast-root' }));
  const toastEl = document.createElement('div');
  toastEl.className = 'toast ' + type;
  toastEl.textContent = message;
  root.appendChild(toastEl);
  setTimeout(() => toastEl.remove(), 3000);
}

function showModal(html) {
  document.getElementById('modal-root').innerHTML = '<div class="modal-backdrop"><div class="modal">' + html + '</div></div>';
}

function closeModal() {
  document.getElementById('modal-root').innerHTML = '';
}

function logout() {
  localStorage.removeItem(SESSION_KEY);
  closeModal();
  toast('Logged out', 'info');
  routeTo('login');
}

function setLoanStatus(loanId, status) {
  const loan = state.loans.find((item) => item.id === loanId);
  if (!loan) return;
  loan.status = status;
  const account = state.users.find((item) => item.memberId === loan.memberId && item.status === 'ACTIVE');
  const availability = status === 'APPROVED' || status === 'ACTIVE';
  appendNotification(loan.coopId, account ? account.id : null, availability ? 'LOAN_AVAILABILITY' : 'LOAN', availability ? 'Loan update' : 'Loan status updated', 'Your loan application for ' + fmt(loan.amount) + ' is now ' + status.replace(/_/g, ' ') + '.', { memberId: loan.memberId, loanId: loan.id });
  saveState();
  route();
}

function handleDemo(email) {
  const user = state.users.find((person) => person.email === email);
  if (!user) return;
  if (user.status !== 'ACTIVE') {
    toast('This account is inactive', 'error');
    return;
  }
  localStorage.setItem(SESSION_KEY, user.id);
  toast('Signed in as ' + user.name, 'success');
  goHome();
}

function handleLogin(form) {
  const fd = Object.fromEntries(new FormData(form));
  const email = String(fd.email || '').trim().toLowerCase();
  const password = String(fd.password || '');
  const user = state.users.find((item) => item.email.toLowerCase() === email && atob(item.pass) === password);
  if (!user) {
    toast('Invalid email or password', 'error');
    return;
  }
  if (user.status !== 'ACTIVE') {
    toast('This account is inactive. Contact your cooperative administrator.', 'error');
    return;
  }
  localStorage.setItem(SESSION_KEY, user.id);
  toast('Welcome back, ' + user.name, 'success');
  goHome();
}

function handleRegister(form) {
  const fd = Object.fromEntries(new FormData(form));
  if (!fd.name || !fd.regNumber || !fd.adminName || !fd.adminEmail || !fd.password || String(fd.password).length < 8) {
    toast('Complete all required fields (password min 8 characters)', 'error');
    return;
  }

  if (state.coops.some((coop) => coop.regNumber.toLowerCase() === String(fd.regNumber).trim().toLowerCase())) {
    toast('A cooperative with this registration number already exists', 'error');
    return;
  }

  if (state.users.some((user) => user.email.toLowerCase() === String(fd.adminEmail).trim().toLowerCase())) {
    toast('Administrator email is already registered', 'error');
    return;
  }

  const plan = state.plans.find((item) => item.id === fd.planId) || state.plans[0];
  const coopId = uid('coop');
  const adminId = uid('user');

  state.coops.push({
    id: coopId,
    name: String(fd.name).trim(),
    regNumber: String(fd.regNumber).trim(),
    email: String(fd.email || '').trim(),
    phone: String(fd.phone || '').trim(),
    address: String(fd.address || '').trim(),
    state: String(fd.state || '').trim(),
    planId: plan.id,
    planName: plan.name,
    memberLimit: plan.memberLimit,
    status: 'TRIAL',
    trialEnd: isoDate(Date.now() + 14 * DAY),
    expiry: isoDate(Date.now() + 14 * DAY)
  });

  state.users.push({
    id: adminId,
    name: String(fd.adminName).trim(),
    email: String(fd.adminEmail).trim().toLowerCase(),
    pass: btoa(String(fd.password)),
    role: 'COOP_ADMIN',
    coopId,
    memberId: null,
    status: 'ACTIVE'
  });

  appendNotification(coopId, adminId, 'SUBSCRIPTION', 'Welcome', 'Your ' + plan.name + ' trial is active for 14 days.');
  saveState();
  localStorage.setItem(SESSION_KEY, adminId);
  toast('Cooperative created — 14-day trial started!', 'success');
  routeTo('app/dashboard');
}

function handleMember(form) {
  const fd = Object.fromEntries(new FormData(form));
  const coop = currentCoop();
  if (!fd.fullName) {
    toast('Full name is required', 'error');
    return;
  }

  const email = String(fd.email || '').trim().toLowerCase();
  const existingUser = state.users.find((user) => user.memberId === fd.id);
  const duplicateUser = state.users.find((user) => user.email.toLowerCase() === email && user.id !== existingUser?.id);
  if (email && duplicateUser) {
    toast('This email is already used by another account', 'error');
    return;
  }
  if (!fd.id && fd.portalPassword && String(fd.portalPassword).length < 8) {
    toast('Portal password must be at least 8 characters', 'error');
    return;
  }

  if (fd.id) {
    const member = state.members.find((item) => item.id === fd.id);
    if (!member) return;
    member.fullName = fd.fullName;
    member.email = email;
    member.phone = fd.phone;
    member.address = fd.address;
    member.occupation = fd.occupation;
    member.status = fd.status || 'ACTIVE';
    member.joined = fd.joined ? new Date(fd.joined + 'T12:00:00').toISOString() : member.joined;
    if (existingUser) {
      existingUser.name = member.fullName;
      existingUser.email = email || existingUser.email;
      existingUser.status = member.status;
      if (fd.portalPassword) existingUser.pass = btoa(String(fd.portalPassword));
    } else if (email && fd.portalPassword) {
      state.users.push({ id: uid('user'), name: member.fullName, email, pass: btoa(String(fd.portalPassword)), role: 'MEMBER', coopId: coop.id, memberId: member.id, status: member.status });
    }
      dashboard: renderDashboard,
    saveState();
    toast('Member updated', 'success');
  } else {
    if (coop.memberLimit !== -1 && state.members.filter((m) => m.coopId === coop.id).length >= coop.memberLimit) {
      toast('Member limit reached for your plan', 'error');
      return;
    }
    const newMemberNo = 'COOP-' + new Date().getFullYear() + '-' + String(state.members.filter((m) => m.coopId === coop.id).length + 1).padStart(4, '0');
    state.members.push({
      id: uid('m'),
      coopId: coop.id,
      memberNo: newMemberNo,
      fullName: fd.fullName,
      email,
      phone: fd.phone,
      address: fd.address,
      occupation: fd.occupation,
      status: fd.status || 'ACTIVE',
      joined: fd.joined ? new Date(fd.joined + 'T12:00:00').toISOString() : new Date().toISOString()
    });
    if (email && fd.portalPassword) {
      state.users.push({ id: uid('user'), name: fd.fullName, email, pass: btoa(String(fd.portalPassword)), role: 'MEMBER', coopId: coop.id, memberId: state.members[state.members.length - 1].id, status: fd.status || 'ACTIVE' });
    }
    appendNotification(coop.id, null, 'MEMBER', 'New member added', fd.fullName + ' (' + newMemberNo + ') was registered.');
    saveState();
    toast('Member added — ' + newMemberNo, 'success');
  }

  closeModal();
  route();
}

function handleContribution(form) {
  const fd = Object.fromEntries(new FormData(form));
  if (!fd.memberId || !fd.amount || Number(fd.amount) <= 0) {
    toast('Member and positive amount required', 'error');
    return;
  }
  const coop = currentCoop();
  const contributionDate = fd.date ? new Date(fd.date + 'T12:00:00').toISOString() : new Date().toISOString();
  state.contributions.push({
    id: uid('c'),
    coopId: coop.id,
    memberId: fd.memberId,
    type: fd.type,
    amount: Number(fd.amount),
    method: fd.method || 'CASH',
    ref: fd.ref || '',
    date: contributionDate,
    desc: fd.desc || '',
    by: currentUser().id
  });
  const account = state.users.find((item) => item.memberId === fd.memberId && item.status === 'ACTIVE');
  appendNotification(coop.id, account ? account.id : null, 'CONTRIBUTION', 'Contribution recorded', fmt(fd.amount) + ' ' + String(fd.type).replace(/_/g, ' ') + ' was recorded for you.', { memberId: fd.memberId });
  if (account && fd.type === 'MONTHLY_CONTRIBUTION') {
    const paidDate = new Date(contributionDate);
    const period = paidDate.getFullYear() + '-' + String(paidDate.getMonth() + 1).padStart(2, '0');
    state.notifications.filter((item) => item.userId === account.id && item.type === 'CONTRIBUTION_REMINDER' && item.period === period).forEach((item) => { item.read = true; });
  }
  saveState();
  toast('Contribution recorded', 'success');
  closeModal();
  route();
}

function handleLoan(form) {
  const fd = Object.fromEntries(new FormData(form));
  if (!fd.memberId || !fd.amount || Number(fd.amount) <= 0) {
    toast('Member and positive amount required', 'error');
    return;
  }
  const coop = currentCoop();
  const start = fd.start ? new Date(fd.start + 'T12:00:00') : new Date();
  const due = new Date(start);
  due.setMonth(due.getMonth() + Number(fd.months || 12));
  state.loans.push({
    id: uid('l'),
    coopId: coop.id,
    memberId: fd.memberId,
    amount: Number(fd.amount),
    rate: Number(fd.rate || 0),
    months: Number(fd.months || 12),
    start: start.toISOString(),
    due: due.toISOString(),
    freq: fd.freq || 'MONTHLY',
    status: 'PENDING',
    by: currentUser().id
  });
  const account = state.users.find((item) => item.memberId === fd.memberId && item.status === 'ACTIVE');
  appendNotification(coop.id, account ? account.id : null, 'LOAN', 'Loan application received', 'Your loan application for ' + fmt(fd.amount) + ' has been submitted.', { memberId: fd.memberId, loanId: state.loans[state.loans.length - 1].id });
  saveState();
  toast('Loan application submitted', 'success');
  closeModal();
  route();
}

function handleRepay(form) {
  const fd = Object.fromEntries(new FormData(form));
  const loan = state.loans.find((item) => item.id === fd.loanId);
  if (!loan) return;
  const details = loanTotals(loan);
  const amount = Number(fd.amount);
  if (!amount || amount <= 0 || amount > details.outstanding) {
    toast('Enter a valid amount within the outstanding balance', 'error');
    return;
  }

  state.repayments.push({
    id: uid('rp'),
    coopId: loan.coopId,
    loanId: loan.id,
    memberId: loan.memberId,
    amount,
    date: fd.date ? new Date(fd.date + 'T12:00:00').toISOString() : new Date().toISOString(),
    ref: 'REP-' + Math.floor(Math.random() * 9000 + 1000)
  });

  const repariedTotal = state.repayments.filter((item) => item.loanId === loan.id).reduce((sum, item) => sum + Number(item.amount || 0), 0);
  loan.status = repariedTotal >= (Number(loan.amount) + Number(loan.amount) * Number(loan.rate || 0) / 100) ? 'FULLY_PAID' : 'PARTIALLY_PAID';
  const account = state.users.find((item) => item.memberId === loan.memberId && item.status === 'ACTIVE');
  appendNotification(loan.coopId, account ? account.id : null, 'REPAYMENT', 'Loan repayment recorded', fmt(amount) + ' was recorded against your loan.', { memberId: loan.memberId, loanId: loan.id });
  saveState();
  toast('Repayment recorded', 'success');
  closeModal();
  route();
}

function handleIncome(form) {
  const fd = Object.fromEntries(new FormData(form));
  if (!fd.source || !fd.amount || Number(fd.amount) <= 0) {
    toast('Source and positive amount required', 'error');
    return;
  }
  const coop = currentCoop();
  state.incomes.push({
    id: uid('i'),
    coopId: coop.id,
    source: fd.source,
    category: fd.category,
    amount: Number(fd.amount),
    date: fd.date ? new Date(fd.date + 'T12:00:00').toISOString() : new Date().toISOString(),
    ref: fd.ref || '',
    desc: fd.desc || ''
  });
  saveState();
  toast('Income recorded', 'success');
  closeModal();
  route();
}

function handleExpense(form) {
  const fd = Object.fromEntries(new FormData(form));
  if (!fd.category || !fd.amount || Number(fd.amount) <= 0) {
    toast('Category and positive amount required', 'error');
    return;
  }
  const coop = currentCoop();
  state.expenses.push({
    id: uid('e'),
    coopId: coop.id,
    category: fd.category,
    amount: Number(fd.amount),
    date: fd.date ? new Date(fd.date + 'T12:00:00').toISOString() : new Date().toISOString(),
    payee: fd.payee || '',
    ref: fd.ref || '',
    desc: fd.desc || ''
  });
  saveState();
  toast('Expense recorded', 'success');
  closeModal();
  route();
}

function handleTaxRule(form) {
  const fd = Object.fromEntries(new FormData(form));
  if (!fd.name || fd.rate === '') {
    toast('Rule name and rate are required', 'error');
    return;
  }
  const coop = currentCoop();
  state.taxRules.push({
    id: uid('tr'),
    coopId: coop.id,
    name: fd.name,
    taxType: fd.taxType,
    rate: Number(fd.rate),
    threshold: fd.threshold ? Number(fd.threshold) : 0,
    deduction: fd.deduction ? Number(fd.deduction) : 0,
    active: fd.active === 'true',
    eff: fd.eff ? new Date(fd.eff + 'T12:00:00').toISOString() : new Date().toISOString()
  });
  saveState();
  toast('Tax rule saved', 'success');
  closeModal();
  route();
}

function handleTaxCompute(form) {
  const fd = Object.fromEntries(new FormData(form));
  if (!fd.ruleId) {
    toast('Select a tax rule', 'error');
    return;
  }
  const coop = currentCoop();
  const rule = state.taxRules.find((item) => item.id === fd.ruleId);
  if (!rule) return;
  const gross = state.incomes.filter((item) => item.coopId === coop.id).reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const taxable = Math.max(0, gross - Number(rule.deduction || 0));
  const liability = Number((taxable * Number(rule.rate || 0) / 100).toFixed(2));
  const period = String(fd.period || new Date().getFullYear());
  let record = state.taxRecords.find((item) => item.coopId === coop.id && item.ruleId === rule.id && item.period === period);
  if (record) {
    record.taxableIncome = taxable;
    record.rate = rule.rate;
    record.liability = liability;
    record.status = 'PENDING';
  } else {
    state.taxRecords.push({
      id: uid('tx'),
      coopId: coop.id,
      ruleId: rule.id,
      memberId: currentUser().memberId,
      period,
      taxableIncome: taxable,
      rate: rule.rate,
      liability,
      paid: 0,
      status: 'PENDING',
      due: isoDate(Date.now() + 14 * DAY)
    });
  }
  saveState();
  toast('Computed tax liability: ' + fmt(liability) + ' (' + rule.name + ')', 'info');
  route();
}

function handleTaxPay(form) {
  const fd = Object.fromEntries(new FormData(form));
  const record = state.taxRecords.find((item) => item.id === fd.recordId);
  if (!record) return;
  const amount = Number(fd.amount);
  if (!amount || amount <= 0) {
    toast('Enter a positive amount', 'error');
    return;
  }
  record.paid = Number(record.paid || 0) + amount;
  if (record.paid >= record.liability) record.status = 'PAID';
  saveState();
  toast('Tax payment recorded', 'success');
  closeModal();
  route();
}

function handleNotification(form) {
  const data = Object.fromEntries(new FormData(form));
  const coop = currentCoop();
  const title = String(data.title || '').trim();
  const message = String(data.message || '').trim();
  if (!coop || !title || !message) {
    toast('Enter a title and message', 'error');
    return;
  }
  const members = state.members.filter((member) => member.coopId === coop.id && member.status === 'ACTIVE' && (data.memberId === 'ALL' || member.id === data.memberId));
  const accounts = members.map((member) => ({ member, account: state.users.find((user) => user.memberId === member.id && user.status === 'ACTIVE') })).filter((entry) => entry.account);
  if (!accounts.length) {
    toast('No active portal accounts found for that recipient', 'error');
    return;
  }
  accounts.forEach(({ member, account }) => appendNotification(coop.id, account.id, data.type, title, message, { memberId: member.id }));
  saveState();
  toast('Notification sent to ' + accounts.length + ' member' + (accounts.length === 1 ? '' : 's'), 'success');
  route();
}

const ACTIONS = {
  logout() {
    logout();
  },
  demo(event) {
    handleDemo(event.target.dataset.email || event.currentTarget.dataset.email);
  },
  burger() {
    const sidebar = document.getElementById('sidebar');
    if (sidebar) sidebar.classList.toggle('open');
  },
  'add-member'() { showModal(memberModal(null)); },
  'edit-member'(event) { const member = state.members.find((item) => item.id === event.target.dataset.id); if (member) showModal(memberModal(member)); },
  'view-member'(event) {
    const member = state.members.find((item) => item.id === event.target.dataset.id);
    if (!member) return;
    const contributions = state.contributions.filter((item) => item.coopId === member.coopId && item.memberId === member.id);
    const loans = state.loans.filter((item) => item.coopId === member.coopId && item.memberId === member.id);
    const taxRecords = state.taxRecords.filter((item) => item.coopId === member.coopId && item.memberId === member.id);
    let modal = '<div class="modal-head"><h3>' + esc(member.fullName) + '</h3><button class="modal-x" type="button" data-action="close">×</button></div><p class="muted small">' + esc(member.memberNo) + ' · ' + esc(member.email || '') + ' · ' + esc(member.phone || '') + ' · Joined ' + fmtDate(member.joined) + ' · ' + badge(member.status) + '</p><div class="cards grid3" style="margin-top:12px"><div class="mini-stat"><b>' + fmt(contributions.reduce((sum, item) => sum + Number(item.amount || 0), 0)) + '</b><span>Contributions</span></div><div class="mini-stat"><b>' + loans.length + '</b><span>Loans</span></div><div class="mini-stat"><b>' + esc(member.occupation || '—') + '</b><span>Occupation</span></div></div>';
    modal += '<h4>Contributions (' + contributions.length + ')</h4><div class="table-wrap"><table class="table"><thead><tr><th>Date</th><th>Type</th><th>Amount</th><th>Method</th></tr></thead><tbody>' + (contributions.length ? contributions.map((item) => '<tr><td>' + fmtDate(item.date) + '</td><td>' + esc(item.type.replace(/_/g, ' ')) + '</td><td>' + fmt(item.amount) + '</td><td>' + esc(item.method) + '</td></tr>').join('') : '<tr><td colspan="4" class="empty">None</td></tr>') + '</tbody></table></div>';
    modal += '<h4>Loans (' + loans.length + ')</h4><div class="table-wrap"><table class="table"><thead><tr><th>Amount</th><th>Total Payable</th><th>Paid</th><th>Outstanding</th><th>Status</th></tr></thead><tbody>' + (loans.length ? loans.map((loan) => { const details = loanTotals(loan); return '<tr><td>' + fmt(loan.amount) + '</td><td>' + fmt(details.total) + '</td><td>' + fmt(details.paid) + '</td><td>' + fmt(details.outstanding) + '</td><td>' + badge(loan.status) + '</td></tr>'; }).join('') : '<tr><td colspan="5" class="empty">None</td></tr>') + '</tbody></table></div>';
    modal += '<h4>Tax Records (' + taxRecords.length + ')</h4><div class="table-wrap"><table class="table"><thead><tr><th>Period</th><th>Liability</th><th>Paid</th><th>Status</th></tr></thead><tbody>' + (taxRecords.length ? taxRecords.map((record) => '<tr><td>' + esc(record.period) + '</td><td>' + fmt(record.liability) + '</td><td>' + fmt(record.paid) + '</td><td>' + badge(record.status) + '</td></tr>').join('') : '<tr><td colspan="4" class="empty">None</td></tr>') + '</tbody></table></div>';
    showModal(modal);
  },
  'del-member'(event) {
    const memberId = event.target.dataset.id;
    if (!confirm('Delete this member and all their records?')) return;
    state.users = state.users.filter((user) => user.memberId !== memberId);
    state.members = state.members.filter((item) => item.id !== memberId);
    state.contributions = state.contributions.filter((item) => item.memberId !== memberId);
    state.loans = state.loans.filter((item) => item.memberId !== memberId);
    state.repayments = state.repayments.filter((item) => item.memberId !== memberId);
    state.taxRecords = state.taxRecords.filter((item) => item.memberId !== memberId);
    saveState();
    toast('Member deleted', 'success');
    route();
  },
  'add-contribution'() { showModal(contributionModal()); },
  'del-contribution'(event) {
    const id = event.target.dataset.id;
    state.contributions = state.contributions.filter((item) => item.id !== id);
    saveState();
    toast('Contribution deleted', 'success');
    route();
  },
  'add-loan'() { showModal(loanModal()); },
  'loan-approve'(event) { setLoanStatus(event.target.dataset.id, 'APPROVED'); },
  'loan-reject'(event) { setLoanStatus(event.target.dataset.id, 'REJECTED'); },
  'loan-disburse'(event) { setLoanStatus(event.target.dataset.id, 'ACTIVE'); },
  'loan-repay-open'(event) { const loan = state.loans.find((item) => item.id === event.target.dataset.id); if (loan) showModal(repayModal(loan)); },
  'del-loan'(event) {
    const id = event.target.dataset.id;
    if (!confirm('Delete this loan and its repayments?')) return;
    state.loans = state.loans.filter((item) => item.id !== id);
    state.repayments = state.repayments.filter((item) => item.loanId !== id);
    saveState();
    toast('Loan deleted', 'success');
    route();
  },
  'add-income'() { showModal(incomeModal()); },
  'del-income'(event) { const id = event.target.dataset.id; state.incomes = state.incomes.filter((item) => item.id !== id); saveState(); toast('Income deleted', 'success'); route(); },
  'add-expense'() { showModal(expenseModal()); },
  'del-expense'(event) { const id = event.target.dataset.id; state.expenses = state.expenses.filter((item) => item.id !== id); saveState(); toast('Expense deleted', 'success'); route(); },
  'add-taxrule'() { showModal(taxRuleModal()); },
  'del-taxrule'(event) { const id = event.target.dataset.id; state.taxRules = state.taxRules.filter((item) => item.id !== id); saveState(); toast('Tax rule deleted', 'success'); route(); },
  'tax-pay-open'(event) { const record = state.taxRecords.find((item) => item.id === event.target.dataset.id); if (record) showModal(taxPayModal(record)); },
  'mark-all'() {
    const user = currentUser();
    const coop = currentCoop();
    state.notifications.forEach((item) => {
      if (item.coopId !== coop.id || (item.userId && item.userId !== user.id)) return;
      if (item.userId) item.read = true;
      else {
        item.readBy = item.readBy || [];
        if (!item.readBy.includes(user.id)) item.readBy.push(user.id);
      }
    });
    saveState();
    toast('Notifications marked as read', 'info');
    route();
  },
  'read-one'(event, element) {
    const user = currentUser();
    const item = state.notifications.find((entry) => entry.id === element.dataset.id && entry.coopId === currentCoop()?.id && (!entry.userId || entry.userId === user.id));
    if (!item) return;
    if (item.userId) item.read = true;
    else {
      item.readBy = item.readBy || [];
      if (!item.readBy.includes(user.id)) item.readBy.push(user.id);
    }
    saveState();
    route();
  },
  'export-report'() {
    const coop = currentCoop();
    csvDownload(reportExportRows(coop.id), 'cooperative-report-' + coop.id + '.csv');
  },
  'print-report'() { window.print(); },
  subscribe(event) {
    const plan = state.plans.find((item) => item.id === event.target.dataset.plan);
    if (!plan) return;
    const coop = currentCoop();
    const billing = event.target.dataset.billing;
    const amount = billing === 'YEARLY' ? plan.yearly : plan.monthly;
    coop.planId = plan.id;
    coop.planName = plan.name;
    coop.memberLimit = plan.memberLimit;
    coop.status = 'ACTIVE';
    state.payments.push({ id: uid('pay'), coopId: coop.id, planName: plan.name, amount, date: new Date().toISOString(), method: 'MOCK', ref: 'MOCK-' + Math.floor(Math.random() * 9000 + 1000), status: 'SUCCESS' });
    appendNotification(coop.id, null, 'SUBSCRIPTION', 'Subscription updated', coop.name + ' is now on ' + plan.name + ' (' + billing + ').');
    saveState();
    toast('Subscribed to ' + plan.name, 'success');
    route();
  },
  'close'() { closeModal(); },
  'coop-status'(event) {
    const me = currentUser();
    const coop = state.coops.find((item) => item.id === event.target.dataset.id);
    if (!coop) return;
    coop.status = event.target.value;
    appendNotification(coop.id, null, 'SUBSCRIPTION', 'Platform status updated', 'Cooperative status changed to ' + coop.status + '.');
    state.audit.push({ id: uid('audit'), coopId: coop.id, userId: me.id, action: 'COOP_STATUS', entity: coop.name + ' → ' + coop.status, at: new Date().toISOString() });
    saveState();
    route();
  },
  'super-user-status'(event) {
    const me = currentUser();
    const user = state.users.find((item) => item.id === event.target.dataset.id);
    if (!user || user.id === me.id) return;
    user.status = event.target.value;
    state.audit.push({ id: uid('audit'), coopId: user.coopId, userId: me.id, action: 'USER_STATUS', entity: user.email + ' → ' + user.status, at: new Date().toISOString() });
    saveState();
    toast('User status updated', 'success');
    route();
  },
  'super-delete-user'(event) {
    const me = currentUser();
    const userId = event.target.dataset.id;
    const user = state.users.find((item) => item.id === userId);
    if (!user || user.id === me.id) return;
    if (!confirm('Delete this user account? Linked member records will also be removed.')) return;
    if (user.memberId) {
      state.members = state.members.filter((item) => item.id !== user.memberId);
      state.contributions = state.contributions.filter((item) => item.memberId !== user.memberId);
      state.loans = state.loans.filter((item) => item.memberId !== user.memberId);
      state.repayments = state.repayments.filter((item) => item.memberId !== user.memberId);
      state.taxRecords = state.taxRecords.filter((item) => item.memberId !== user.memberId);
    }
    state.users = state.users.filter((item) => item.id !== userId);
    state.audit.push({ id: uid('audit'), coopId: user.coopId, userId: me.id, action: 'USER_DELETE', entity: user.email, at: new Date().toISOString() });
    saveState();
    toast('User account deleted', 'success');
    route();
  },
  'super-export-users'() {
    const users = state.users.map((user) => ({ name: user.name, email: user.email, role: user.role, coopId: user.coopId, memberId: user.memberId, status: user.status }));
    const blob = new Blob([JSON.stringify(users, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'coopsaas-users.json';
    link.click();
    URL.revokeObjectURL(url);
    toast('User list exported', 'success');
  },
  'super-view-coop'(event) {
    const coop = state.coops.find((item) => item.id === event.target.dataset.id);
    if (!coop) return;
    const summary = superCoopSummary(coop.id);
    const members = state.members.filter((item) => item.coopId === coop.id).slice(0, 8);
    const modal = '<div class="modal-head"><h3>' + esc(coop.name) + '</h3><button class="modal-x" type="button" data-action="close">×</button></div>' +
      '<p class="muted small">' + esc(coop.regNumber) + ' · ' + esc(coop.planName) + ' · ' + badge(coop.status) + '</p>' +
      '<div class="cards grid4" style="margin-top:12px"><div class="mini-stat"><b>' + summary.members + '</b><span>Members</span></div><div class="mini-stat"><b>' + fmt(summary.payments) + '</b><span>Revenue</span></div><div class="mini-stat"><b>' + fmt(summary.contributions) + '</b><span>Contributions</span></div><div class="mini-stat"><b>' + fmt(summary.taxOutstanding) + '</b><span>Tax Due</span></div></div>' +
      '<h4>Recent members</h4><div class="table-wrap"><table class="table"><thead><tr><th>Name</th><th>Member No.</th><th>Status</th></tr></thead><tbody>' + (members.length ? members.map((member) => '<tr><td>' + esc(member.fullName) + '</td><td>' + esc(member.memberNo) + '</td><td>' + badge(member.status) + '</td></tr>').join('') : '<tr><td colspan="3" class="empty">No members yet.</td></tr>') + '</tbody></table></div>';
    showModal(modal);
  },
  'super-delete-coop'(event) {
    const me = currentUser();
    const coopId = event.target.dataset.id;
    const coop = state.coops.find((item) => item.id === coopId);
    if (!coop) return;
    if (!confirm('This will remove the cooperative and all related records. Continue?')) return;

    state.audit.push({ id: uid('audit'), coopId, userId: me.id, action: 'COOP_DELETE', entity: coop.name, at: new Date().toISOString() });

    state.coops = state.coops.filter((item) => item.id !== coopId);
    state.users = state.users.filter((item) => item.coopId !== coopId);
    state.members = state.members.filter((item) => item.coopId !== coopId);
    state.contributions = state.contributions.filter((item) => item.coopId !== coopId);
    state.loans = state.loans.filter((item) => item.coopId !== coopId);
    state.repayments = state.repayments.filter((item) => item.coopId !== coopId);
    state.incomes = state.incomes.filter((item) => item.coopId !== coopId);
    state.expenses = state.expenses.filter((item) => item.coopId !== coopId);
    state.taxRules = state.taxRules.filter((item) => item.coopId !== coopId);
    state.taxRecords = state.taxRecords.filter((item) => item.coopId !== coopId);
    state.notifications = state.notifications.filter((item) => item.coopId !== coopId);
    state.payments = state.payments.filter((item) => item.coopId !== coopId);

    saveState();
    toast('Cooperative deleted', 'success');
    route();
  },
  'super-reset-demo'() {
    if (!confirm('Reset all app data to the original demo state?')) return;
    state = JSON.parse(JSON.stringify(baseState));
    localStorage.setItem(DB_KEY, JSON.stringify(state));
    localStorage.removeItem(SESSION_KEY);
    toast('Demo data reset', 'info');
    routeTo('');
  },
  'super-export-summary'() {
    const summary = {
      exportedAt: new Date().toISOString(),
      cooperatives: state.coops.length,
      members: state.members.length,
      revenue: state.payments.reduce((sum, item) => sum + Number(item.amount || 0), 0),
      taxDue: state.taxRecords.reduce((sum, item) => sum + Math.max(0, Number(item.liability || 0) - Number(item.paid || 0)), 0)
    };
    const blob = new Blob([JSON.stringify(summary, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'coopsaas-platform-summary.json';
    link.click();
    URL.revokeObjectURL(url);
    toast('Platform summary exported', 'success');
  }
};

const FORMS = {
  login(form) { handleLogin(form); },
  register(form) { handleRegister(form); },
  member(form) { handleMember(form); },
  contribution(form) { handleContribution(form); },
  loan(form) { handleLoan(form); },
  repay(form) { handleRepay(form); },
  income(form) { handleIncome(form); },
  expense(form) { handleExpense(form); },
  taxrule(form) { handleTaxRule(form); },
  taxcompute(form) { handleTaxCompute(form); },
  taxpay(form) { handleTaxPay(form); },
  notification(form) { handleNotification(form); }
};

document.addEventListener('click', (event) => {
  const closestAction = event.target.closest('[data-action]');
  if (!closestAction) return;
  if (closestAction.matches('.modal-backdrop')) {
    closeModal();
    return;
  }

  const action = closestAction.dataset.action;
  if (ACTIONS[action]) {
    event.preventDefault();
    ACTIONS[action](event, closestAction);
  }
});

document.addEventListener('submit', (event) => {
  const form = event.target.closest('form[data-form]');
  if (!form) return;
  event.preventDefault();
  const action = form.dataset.form;
  if (FORMS[action]) FORMS[action](form);
});

document.addEventListener('input', (event) => {
  const field = event.target;
  if (field && field.id === 'm-search') {
    const q = field.value.trim().toLowerCase();
    const coop = currentCoop();
    const list = state.members.filter((member) => member.coopId === coop.id).filter((member) => {
      const term = q === '' || member.fullName.toLowerCase().includes(q) || member.memberNo.toLowerCase().includes(q) || (member.email || '').toLowerCase().includes(q);
      const statusEl = document.getElementById('m-status');
      const status = statusEl ? statusEl.value : '';
      return term && (!status || member.status === status);
    }).sort((a, b) => new Date(b.joined).getTime() - new Date(a.joined).getTime());
    const panel = document.getElementById('members-list');
    if (panel) panel.innerHTML = membersTable(list);
  }
});

document.addEventListener('change', (event) => {
  const target = event.target;
  if (target && target.dataset && target.dataset.action && ACTIONS[target.dataset.action]) {
    event.preventDefault();
    ACTIONS[target.dataset.action](event, target);
    return;
  }

  if (target && target.id === 'm-status') {
    const q = (document.getElementById('m-search')?.value || '').trim().toLowerCase();
    const coop = currentCoop();
    const list = state.members.filter((member) => member.coopId === coop.id).filter((member) => {
      const term = q === '' || member.fullName.toLowerCase().includes(q) || member.memberNo.toLowerCase().includes(q) || (member.email || '').toLowerCase().includes(q);
      return term && (!target.value || member.status === target.value);
    }).sort((a, b) => new Date(b.joined).getTime() - new Date(a.joined).getTime());
    const panel = document.getElementById('members-list');
    if (panel) panel.innerHTML = membersTable(list);
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeModal();
});

window.addEventListener('hashchange', route);

function init() {
  document.body.insertAdjacentHTML('beforeend', '<div id="modal-root"></div><div id="toast-root"></div>');
  route();
}

init();
