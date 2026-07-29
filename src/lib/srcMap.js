// Which landing domain a visitor came from, used for attribution on the
// registration record. Ported as-is from the live production page,
// keep in sync if a 7th domain is ever added.
export const SRC_MAP = {
  'launchbrained.live': 'ig01',
  'onelaunchaway.live': 'ig02',
  'sprintandlaunch.live': 'ig03',
  'theadhdfounders.live': 'ig04',
  'wiredtolaunch.live': 'ig05',
}

export function getSrcFromHostname(hostname) {
  const clean = hostname.replace(/^www\./, '')
  return SRC_MAP[clean] || 'ig01'
}
