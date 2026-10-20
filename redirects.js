const redirects = async () => {
  const internetExplorerRedirect = {
    destination: '/ie-incompatible.html',
    has: [
      {
        type: 'header',
        key: 'user-agent',
        value: '(.*Trident.*)', // all ie browsers
      },
    ],
    permanent: false,
    source: '/:path((?!ie-incompatible.html$).*)', // all pages except the incompatibility page
  }

  // The site used to have a blog at /posts and a Writing section; neither exists any more.
  const legacyRedirects = [
    { source: '/posts/:path*', destination: '/en', permanent: true },
    { source: '/:locale(en|pt-BR)/writing/:path*', destination: '/:locale', permanent: true },
    { source: '/search', destination: '/en/search', permanent: true },
  ]

  const redirects = [internetExplorerRedirect, ...legacyRedirects]

  return redirects
}

export default redirects
