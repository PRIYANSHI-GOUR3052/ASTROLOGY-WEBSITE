"use client";
import React from "react";

import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export default function CelestialJourneyMainGrid() {
  return (
    <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-5">
      {/* Left Tall Card: Cosmic Calendar Carousel */}
      <div className="lg:col-span-3 xl:col-span-3">
        <div className="bg-white rounded-xl shadow p-4 flex flex-col gap-2 h-full min-h-[450px] justify-between">
          <Carousel
            opts={{ loop: true, align: "center", skipSnaps: false }}
            plugins={[Autoplay({ delay: 3500, stopOnInteraction: false })]}
            className="w-full"
          >
            <CarouselContent>
              {[
                "https://res.cloudinary.com/dxwspucxw/image/upload/v1752494996/A_realistic_cosmic_calendar_illustration_showing_the_planets_of_the_solar_system_orbiting_around_the_sun_with_soft_lighting_galaxy_background_visible_constellations_moon_phases_and_astrological_zodiac_symbols_s_1_uxgzjk.jpg",
                "https://res.cloudinary.com/dxwspucxw/image/upload/c_crop,ar_9:16/v1753181211/bracelets_lqvtwk.png",
                "https://res.cloudinary.com/dxwspucxw/image/upload/v1752042874/course-5_uvm6d2.jpg"
              ].map((img, i) => (
                <CarouselItem key={i}>
                  <div className="relative w-full aspect-[9/19] rounded-lg overflow-hidden">
                    <Image
                      src={img}
                      alt={`Cosmic Calendar ${i + 1}`}
                      fill
                      className="object-cover object-center scale-105 rounded-lg"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>

      {/* Center: Carousel with two small blocks below */}
      <div className="lg:col-span-6 flex flex-col gap-5">
        {/* Center Main: Image-Only Carousel */}
        <div className=" bg-white rounded-xl shadow overflow-hidden h-[450px]">
          <Carousel
            opts={{axis:'y', loop: true, align: "center", skipSnaps: false }}
            plugins={[Autoplay({ delay: 3500, stopOnInteraction: false })]}
            className="w-full h-full"
          >
            <CarouselContent>
              {[
                "https://res.cloudinary.com/dxwspucxw/image/upload/v1752042873/cosmiccalendar_v8ndoq.png",
                "https://res.cloudinary.com/dxwspucxw/image/upload/v1752042872/course-2_ribcdu.jpg",
                "https://res.cloudinary.com/dxwspucxw/image/upload/v1752042871/astrology_app_eoszbs.jpg",
              ].map((img, i) => (
                <CarouselItem key={i} className="p-3">
                  <div className="rounded-xl overflow-hidden shadow bg-white h-[400px] flex flex-col">
                    <div className="relative h-full w-full">
                      <Image
                        src={img}
                        alt={`Main Carousel ${i + 1}`}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>

        {/* Below: Zodiac + Myth blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Zodiac Decoder: Carousel */}
          <div className="bg-white rounded-xl shadow p-5 flex flex-col gap-3">
            <Carousel
              opts={{ loop: true, align: "center", skipSnaps: false }}
              plugins={[Autoplay({ delay: 3500, stopOnInteraction: false })]}
              className="w-full"
            >
              <CarouselContent>
                {[
                  "https://res.cloudinary.com/dxwspucxw/image/upload/v1752042879/zodiac_decoder_aphuoz.avif",
                  "https://res.cloudinary.com/dxwspucxw/image/upload/v1752042871/astrowellness_qltouz.jpg",
                  "https://res.cloudinary.com/dxwspucxw/image/upload/v1752042872/course-1_lwqxsr.jpg",
                ].map((img, i) => (
                  <CarouselItem key={i}>
                    <div className="relative w-full h-40 rounded-lg overflow-hidden">
                      <Image
                        src={img}
                        alt={`Zodiac Decoder ${i + 1}`}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          {/* Myth & Legends: Carousel */}
          <div className="bg-white rounded-xl shadow p-5 flex flex-col gap-3">
            <Carousel
              opts={{ loop: true, align: "center", skipSnaps: false }}
              plugins={[Autoplay({ delay: 3500, stopOnInteraction: false })]}
              className="w-full"
            >
              <CarouselContent>
                {[
                  "https://res.cloudinary.com/dxwspucxw/image/upload/v1752042876/myth_h93fku.jpg",
                  "https://res.cloudinary.com/dxwspucxw/image/upload/v1752042872/course-3_h9xwl3.jpg",
                ].map((img, i) => (
                  <CarouselItem key={i}>
                    <div className="relative w-full h-40 rounded-lg overflow-hidden">
                      <Image
                        src={img}
                        alt={`Myth & Legends ${i + 1}`}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </div>

      {/* Right Tall Card: Spiritual Growth Carousel */}
      <div className="lg:col-span-3 xl:col-span-3">
        <div className="bg-white rounded-xl shadow p-5 flex flex-col gap-3 h-full min-h-[450px] justify-between">
          <Carousel
            opts={{ loop: true, align: "center", skipSnaps: false }}
            plugins={[Autoplay({ delay: 3500, stopOnInteraction: false })]}
            className="w-full"
          >
            <CarouselContent>
              {[
                "https://res.cloudinary.com/dxwspucxw/image/upload/v1752497900/A_highly_realistic_image_of_a_calm_person_meditating_in_lotus_pose_on_a_flat_rock_bathed_in_soft_golden_sunrise_light._The_background_features_misty_hills_and_subtle_spiritual_symbols_like_chakra_icons_or_Om_sign_faint_zetsen.jpg",
                "https://res.cloudinary.com/dxwspucxw/image/upload/v1752049127/gemstones_wztxzb.jpg",
                "https://res.cloudinary.com/dxwspucxw/image/upload/v1752049127/meditation_b2qe9b.jpg"
              ].map((img, i) => (
                <CarouselItem key={i}>
                  <div className="relative w-full aspect-[9/19] rounded-lg overflow-hidden">
                    <Image
                      src={img}
                      alt={`Spiritual Growth ${i + 1}`}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </div>
  );
}