import { Banner } from '@payloadcms/ui/elements/Banner'
import React from 'react'

import { SeedButton } from './SeedButton'
import './index.scss'

const baseClass = 'before-dashboard'

const BeforeDashboard: React.FC = () => {
  return (
    <div className={baseClass}>
      <Banner className={`${baseClass}__banner`} type="success">
        <h4>Xnths — content studio</h4>
      </Banner>
      <ul className={`${baseClass}__instructions`}>
        <li>
          <SeedButton />
          {' to create or refresh the bilingual portfolio content (site profile, projects, publications), then '}
          <a href="/" target="_blank">
            visit the website
          </a>
          {'. Writing posts are never touched by the seed.'}
        </li>
        <li>
          Every project, publication and the site profile has an English and a Português (Brasil)
          version: switch the locale in the top bar to edit each one.
        </li>
      </ul>
    </div>
  )
}

export default BeforeDashboard
