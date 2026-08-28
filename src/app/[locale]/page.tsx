import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Intro from '@/components/Intro';
import BasicInfo from '@/components/BasicInfo';
import HoursSection from '@/components/HoursSection';
import TicketsSection from '@/components/TicketsSection';
import TransportSection from '@/components/TransportSection';
import InfoSection from '@/components/InfoSection';
import HistoryLegendsSection from '@/components/HistoryLegendsSection';
import RouteSection from '@/components/RouteSection';
import PhotoSpotsSection from '@/components/PhotoSpotsSection';
import AmenitiesSection from '@/components/AmenitiesSection';
import HotelsSection from '@/components/HotelsSection';
import Gallery from '@/components/Gallery';
import Reviews from '@/components/Reviews';
import FAQSection from '@/components/FAQSection';
import Recommendations from '@/components/Recommendations';
import MapEmbed from '@/components/MapEmbed';
import Footer from '@/components/Footer';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header />
      <main id="top">
        <Hero />
        <Intro />
        <div id="basic"><BasicInfo /></div>
        <div id="hours"><HoursSection /></div>
        <div id="tickets"><TicketsSection /></div>
        <div id="transport"><TransportSection /></div>
        <InfoSection />
        <HistoryLegendsSection />
        <div id="route"><RouteSection /></div>
        <div id="photos"><PhotoSpotsSection /></div>
        <AmenitiesSection />
        <HotelsSection />
        <Gallery />
        <Reviews />
        <FAQSection />
        <div id="more"><Recommendations /></div>
        <MapEmbed />
      </main>
      <Footer />
    </>
  );
}
