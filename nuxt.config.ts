// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  css: [
    '~/assets/sass/style.scss'
  ],
  plugins: [
    // adobe fonts
    '~/plugins/adobeFont.js'
  ],
  app: {
    head: {
      link: [
        {
          // reset css
          rel: "stylesheet",
          href: "https://unpkg.com/destyle.css@3.0.2/destyle.min.css"
        },
        {
          // fontawesome
          rel: 'stylesheet',
          href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
        },
      ],
      script: [
        {
          innerHTML: `
            (function(d) {
              var config = {
                kitId: 'lgu8jrd',
                scriptTimeout: 3000,
                async: true
              },
              h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
            })(document);
          `,
          type: 'text/javascript',
        }
      ],
     
    }
  }
})