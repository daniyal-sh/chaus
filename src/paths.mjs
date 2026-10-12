export function withBase(path, base = '/') {
  return `${base.endsWith('/') ? base : `${base}/`}${path.replace(/^\/+/, '')}`;
}
export function withoutBase(pathname, base = '/') {
  const prefix = base.replace(/\/$/, '');
  if (prefix && (pathname === prefix || pathname.startsWith(`${prefix}/`))) {
    return pathname.slice(prefix.length) || '/';
  }
  return pathname;
}
