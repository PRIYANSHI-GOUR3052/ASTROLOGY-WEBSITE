import { HeroSection } from './components/HeroSection'
import { LifeChangingSolutions } from './components/LifeChangingSolutions'
import { AstrologerProfile } from './components/AstrologerProfile'
import  { BestServices }  from './components/BestServices'
import { Testimonials } from './components/Testimonials'
import { ServicesOverview } from './components/ServicesOverview'
import { FeaturedProducts } from './components/FeaturedProducts'
import { BlogPreview } from './components/BlogPreview'
import { ContactForm } from './components/ContactForm'
import { DailyHoroscope } from './components/DailyHoroscope'
import { AstrologyQuiz } from './components/AstrologyQuiz'
import { Statistics } from './components/Statistics'
import { ScrollAnimation } from './components/ScrollAnimation'
import RecentPosts from './components/RecentPosts'
import FeaturedBlogs from './components/FeaturedBlogs'



export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-white">
    
      <HeroSection />
      <div className="pt-32 relative z-10">
        <ScrollAnimation>
          <Statistics />
        </ScrollAnimation>
        <RecentPosts />
        <FeaturedBlogs />
        
        <ScrollAnimation>
          <DailyHoroscope />
        </ScrollAnimation>

        <ScrollAnimation>
          <LifeChangingSolutions />
        </ScrollAnimation>

        <ScrollAnimation>
          <BestServices />
        </ScrollAnimation>

        <ScrollAnimation>
          <ServicesOverview />
        </ScrollAnimation>

        <div className="flex flex-col md:flex-row items-start gap-8 mt-12">
          <div className="flex-1">
    
              
            
          </div>

          <div className="flex-1">
            
              
            
          </div>

        
        </div>

        <ScrollAnimation>
          <AstrologerProfile />
        </ScrollAnimation>


       

        <ScrollAnimation>
          <AstrologyQuiz />
        </ScrollAnimation>

        <ScrollAnimation>
          <Testimonials />
        </ScrollAnimation>

        <ScrollAnimation>
          <ContactForm />
        </ScrollAnimation>
       
      </div>
    </div>
  )
}
