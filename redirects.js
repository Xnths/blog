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

  // The site used to live at /posts and /search without a locale prefix.
  const legacyRedirects = [
    { source: '/posts/page/:page', destination: '/en/writing', permanent: true },
    { source: '/posts/:slug', destination: '/en/writing/:slug', permanent: true },
    { source: '/posts', destination: '/en/writing', permanent: true },
    { source: '/search', destination: '/en/search', permanent: true },
  ]

  const redirects = [internetExplorerRedirect, ...legacyRedirects]

  return redirects
}

export default redirects
