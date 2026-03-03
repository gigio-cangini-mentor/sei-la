const fs = require("fs");

// =====================================================
// FIX 1: ProjectLogin.tsx — navigate with project key
// =====================================================
const loginPath = "/opt/meta-ads-dashboard/client/src/pages/ProjectLogin.tsx";
let login = fs.readFileSync(loginPath, "utf8");

// Change onSuccess to receive data and navigate with projectKey
login = login.replace(
  'onSuccess: async () => {',
  'onSuccess: async (data) => {'
);
login = login.replace(
  'navigate("/");',
  'navigate("/?project=" + data.projectKey);'
);

fs.writeFileSync(loginPath, login);
console.log("OK - ProjectLogin.tsx fixed: navigate with projectKey");

// =====================================================
// FIX 2: Home.tsx — use session as fallback for projectKey
// =====================================================
const homePath = "/opt/meta-ads-dashboard/client/src/pages/Home.tsx";
let home = fs.readFileSync(homePath, "utf8");

// Fix main Home component
const oldHome = [
  'export default function Home() {',
  '  // Multi-project: read project key from URL',
  '  const urlParams = new URLSearchParams(window.location.search);',
  "  const projectKey = urlParams.get('project') || undefined;"
].join('\n');

const newHome = [
  'export default function Home() {',
  '  // Multi-project: read project key from URL, fallback to session',
  '  const sessionQuery = trpc.auth.projectMe.useQuery(undefined, {',
  '    retry: false,',
  '    staleTime: 60 * 1000,',
  '  });',
  '  const sessionProjectKey = sessionQuery.data?.projectKey || undefined;',
  '  const urlParams = new URLSearchParams(window.location.search);',
  "  const projectKey = urlParams.get('project') || sessionProjectKey || undefined;"
].join('\n');

if (home.includes(oldHome)) {
  home = home.replace(oldHome, newHome);
  console.log("OK - Home component: projectKey uses session fallback");
} else {
  console.log("WARN - Could not find exact Home component pattern");
}

// Fix PerpetualLaunchSection
const oldPerp = [
  'function PerpetualLaunchSection() {',
  "  const projectKey = new URLSearchParams(window.location.search).get('project') || undefined;"
].join('\n');

const newPerp = [
  'function PerpetualLaunchSection() {',
  '  const sessionQuery = trpc.auth.projectMe.useQuery(undefined, {',
  '    retry: false,',
  '    staleTime: 60 * 1000,',
  '  });',
  '  const sessionProjectKey = sessionQuery.data?.projectKey || undefined;',
  "  const projectKey = new URLSearchParams(window.location.search).get('project') || sessionProjectKey || undefined;"
].join('\n');

if (home.includes(oldPerp)) {
  home = home.replace(oldPerp, newPerp);
  console.log("OK - PerpetualLaunchSection: projectKey uses session fallback");
} else {
  console.log("WARN - Could not find PerpetualLaunchSection pattern");
}

fs.writeFileSync(homePath, home);
console.log("DONE - All fixes applied");
