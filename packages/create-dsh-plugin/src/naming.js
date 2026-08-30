// Optional community naming declaration for reviewed cross-repository checks.
// This is separate from the official package.json/dsh.bundle contract.

const namespacePattern = /^[a-z][a-z0-9]*(?:-[a-z0-9]+)*$/
const pluginNamePattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/
const packageNamePattern = /^(?:@[a-z0-9][a-z0-9._-]*\/)?[a-z0-9][a-z0-9._-]*$/
const nonWhitespacePattern = /^\S+$/
const toolNamePattern = /^[A-Za-z0-9_-]+$/

export function registryIdentityFromPackage(packageName, owner, requestedName) {
  const normalizedPackageName = String(packageName).trim()
  if (!packageNamePattern.test(normalizedPackageName) || normalizedPackageName.length > 214) {
    throw new Error('--name must be a valid lowercase npm package name when --registry-owner is supplied')
  }
  const namespace = String(owner).trim().toLowerCase()
  if (!namespacePattern.test(namespace) || namespace.length > 63) {
    throw new Error('--registry-owner must be a lowercase GitHub owner such as alice or alice-labs')
  }
  const packageSlug = normalizedPackageName.split('/').pop()
  const derivedName = packageSlug.replace(/^dsh-(?:plugin-)?/, '') || packageSlug
  const name = String(requestedName || derivedName).trim().toLowerCase()
  if (!pluginNamePattern.test(name) || name.length > 63) {
    throw new Error('--registry-name must use lowercase kebab-case')
  }
  return {
    namespace,
    name,
    coordinate: `${namespace}/${name}`,
    loaderId: `${namespace}-${name}`,
    toolName: `${namespace}-${name}`.replaceAll('-', '_'),
  }
}

function routesFor(template, pluginId) {
  if (template === 'panel') {
    return [{ kind: 'exact', path: `/${pluginId}/ping` }]
  }
  if (template === 'preset-pack') {
    return ['list', 'apply', 'remove'].map((operation) => ({
      kind: 'exact',
      path: `/${pluginId}/${operation}`,
    }))
  }
  return []
}

function eventsFor(template) {
  if (template !== 'events') return []
  return ['session/event', 'tools/change', 'tools/pre-execute']
}

export function createNamingManifest(cfg) {
  if (!cfg.registryOwner) return null

  const identity = registryIdentityFromPackage(cfg.name, cfg.registryOwner, cfg.registryName)
  if (!nonWhitespacePattern.test(cfg.pluginId)) {
    throw new Error('--plugin-id must be a non-whitespace name when --registry-owner is supplied')
  }
  if (cfg.toolName && !toolNamePattern.test(cfg.toolName)) {
    throw new Error('--tool-name contains characters unsupported by the community naming declaration')
  }

  return {
    schemaVersion: 1,
    policy: 'dsh-plugin-naming/v1',
    plugin: {
      namespace: identity.namespace,
      name: identity.name,
      coordinate: identity.coordinate,
      packageName: cfg.name,
    },
    names: {
      pluginNames: [cfg.pluginId],
      loaderIds: [cfg.pluginId],
      services: [],
      tools: ['tool', 'webui'].includes(cfg.template) && cfg.toolName ? [cfg.toolName] : [],
      commands: [],
      skills: [],
      skillProviders: [],
      events: eventsFor(cfg.template),
      settingsNamespaces: [],
      routes: routesFor(cfg.template, cfg.pluginId),
    },
  }
}
