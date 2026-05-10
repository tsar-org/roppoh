/** Resolved media reference from getSiteSettings() */
export interface MediaReference {
  mediaId: string;
  alt?: string;
  url?: string;
}

export interface BlogSiteIdentitySettings {
  title?: string;
  tagline?: string;
  logo?: MediaReference;
  favicon?: MediaReference;
}

const DEFAULT_SITE_TITLE = "My Blog";
const DEFAULT_SITE_TAGLINE = "Thoughts, stories, and ideas.";

export function resolveBlogSiteIdentity(settings?: BlogSiteIdentitySettings) {
  return {
    siteLogo: settings?.logo?.url ? settings.logo : null,
    siteTagline: settings?.tagline ?? DEFAULT_SITE_TAGLINE,
    siteTitle: settings?.title ?? DEFAULT_SITE_TITLE,
  };
}
