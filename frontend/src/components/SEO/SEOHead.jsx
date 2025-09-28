import { Helmet } from 'react-helmet-async';

const SEOHead = ({ 
  title, 
  description, 
  keywords, 
  image, 
  url, 
  type = 'website',
  lang = 'en',
  structuredData 
}) => {
  const defaultTitle = lang === 'am' 
    ? 'ብሩህኪድስ ልዩ የህፃናት ክሊኒክ | BiruhKids Pediatric Specialty Clinic'
    : 'BiruhKids Pediatric Specialty Clinic | ብሩህኪድስ ልዩ የህፃናት ክሊኒክ';
  
  const defaultDescription = lang === 'am'
    ? 'ብሩህኪድስ በአዲስ አበባ የሚገኝ ልዩ የህፃናት ክሊኒክ ነው። ለህፃናት ልዩ የህክምና አገልግሎት፣ የመጠባበቂያ ቀጠሮ፣ እና የባለሙያ ዶክተሮች አገልግሎት እንሰጣለን።'
    : 'BiruhKids Pediatric Specialty Clinic in Addis Ababa, Ethiopia. Expert pediatric care, online appointments, specialized doctors for children\'s health and wellness.';

  const defaultKeywords = lang === 'am'
    ? 'ብሩህኪድስ, የህፃናት ክሊኒክ, አዲስ አበባ, ኢትዮጵያ, የህፃናት ዶክተር, የህፃናት ህክምና, ልዩ የህፃናት አገልግሎት, የህፃናት ጤንነት, የህፃናት ስፔሻሊስት, የህፃናት ሆስፒታል'
    : 'BiruhKids, pediatric clinic, children hospital, Addis Ababa, Ethiopia, pediatrician, child doctor, kids health, pediatric specialist, children care, baby doctor, infant care';

  const siteUrl = url || window.location.href;
  const imageUrl = image || '/assets/logo-title.png';

  return (
    <Helmet>
      <html lang={lang} />
      <title>{title || defaultTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      <meta name="author" content="BiruhKids Pediatric Specialty Clinic" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />
      
      <link rel="canonical" href={siteUrl} />
      
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title || defaultTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:site_name" content="BiruhKids Pediatric Specialty Clinic" />
      <meta property="og:locale" content={lang === 'am' ? 'am_ET' : 'en_US'} />
      <meta property="og:locale:alternate" content={lang === 'am' ? 'en_US' : 'am_ET'} />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || defaultTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={imageUrl} />
      <meta name="twitter:site" content="@BiruhKids" />
      <meta name="twitter:creator" content="@BiruhKids" />
      
      <meta name="geo.region" content="ET-AA" />
      <meta name="geo.placename" content="Addis Ababa" />
      <meta name="geo.position" content="9.0192;38.7525" />
      <meta name="ICBM" content="9.0192, 38.7525" />
      
      <meta name="business:contact_data:street_address" content="Addis Ababa, Ethiopia" />
      <meta name="business:contact_data:locality" content="Addis Ababa" />
      <meta name="business:contact_data:region" content="Addis Ababa" />
      <meta name="business:contact_data:postal_code" content="1000" />
      <meta name="business:contact_data:country_name" content="Ethiopia" />
      
      <meta name="medical:condition" content="Pediatric Care" />
      <meta name="medical:symptom" content="Children Health" />
      <meta name="medical:drug" content="Pediatric Medicine" />
      
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
      
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      
      <meta name="theme-color" content="#3B82F6" />
      <meta name="msapplication-TileColor" content="#3B82F6" />
      <meta name="application-name" content="BiruhKids" />
      <meta name="apple-mobile-web-app-title" content="BiruhKids" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="mobile-web-app-capable" content="yes" />
      
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="dns-prefetch" href="//www.google-analytics.com" />
      <link rel="dns-prefetch" href="//www.googletagmanager.com" />
    </Helmet>
  );
};

export default SEOHead;