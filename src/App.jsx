import { useEffect } from 'preact/hooks'
import { Router, Route, Switch } from 'wouter'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Header } from './components/Header.jsx'
import { Footer } from './components/Footer.jsx'
import { LoadingBar } from './components/LoadingBar.jsx'
import { Home } from './pages/Home.jsx'
import { Capabilities } from './pages/Capabilities.jsx'
import { CaseStudy } from './pages/CaseStudy.jsx'
import { Contact } from './pages/Contact.jsx'

gsap.registerPlugin(ScrollTrigger)

export function App() {
  useEffect(() => {
    // Lenis smooth scroll — connected to GSAP ticker
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    gsap.ticker.add((time) => lenis.raf(time * 1000))
    gsap.ticker.lagSmoothing(0)

    // Refresh ScrollTrigger on Lenis scroll
    lenis.on('scroll', ScrollTrigger.update)

    return () => {
      lenis.destroy()
    }
  }, [])

  return (
    <div class="bg-urj-black min-h-screen font-inter">
      <LoadingBar />
      <Header />
      <Router>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/capabilities" component={Capabilities} />
          <Route path="/case-study" component={CaseStudy} />
          <Route path="/contact" component={Contact} />
          <Route>
            <div class="flex items-center justify-center min-h-screen">
              <div class="text-center">
                <p class="mono-label mb-4">404 — NOT FOUND</p>
                <a href="/" class="btn-gold inline-block">Return Home</a>
              </div>
            </div>
          </Route>
        </Switch>
      </Router>
      <Footer />
    </div>
  )
}
