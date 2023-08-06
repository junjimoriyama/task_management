export default defineNuxtPlugin(() => {
	// <script>生成
  const script = document.createElement('script');
	// <script>にHTMLにadobeフォントのコード入れる
  script.innerHTML =  `(function(d) {
		var config = {
			kitId: 'qwv5fgw',
			scriptTimeout: 3000,
			async: true
		},
		h=d.documentElement,t=setTimeout(function(){h.className=h.className.replace(/\bwf-loading\b/g,"")+" wf-inactive";},config.scriptTimeout),tk=d.createElement("script"),f=false,s=d.getElementsByTagName("script")[0],a;h.className+=" wf-loading";tk.src='https://use.typekit.net/'+config.kitId+'.js';tk.async=true;tk.onload=tk.onreadystatechange=function(){a=this.readyState;if(f||a&&a!="complete"&&a!="loaded")return;f=true;clearTimeout(t);try{Typekit.load(config)}catch(e){}};s.parentNode.insertBefore(tk,s)
	})(document);`
	// <head>に<script>入れる
  document.head.appendChild(script);
});