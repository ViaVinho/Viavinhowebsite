# Roteiro — App Store Submission Pack

The app is a PWA, live at **https://viavinho.net/planner/**. It is installable today from the browser (Share → Add to Home Screen on iOS, install prompt on Android). Store listings are packaging on top of that URL. Realistic timeline: Google Play 2 to 4 days including review, Apple 3 to 7 days, both gated on your developer accounts.

## Prerequisites (only you can do these)
1. **Google Play Console** account: play.google.com/console, one-time $25.
2. **Apple Developer Program**: developer.apple.com, $99/year.
3. Run `planner/setup-leads.sql` in Supabase (SQL Editor, same project as the wedding dashboard) so concierge leads persist. Until then the app falls back to opening an email to hello@viavinho.net, so nothing is lost.

## Google Play (Trusted Web Activity — the standard PWA route)
1. Go to **pwabuilder.com**, enter `https://viavinho.net/planner/`, let it score the PWA.
2. Package for Android. Accept the defaults (TWA wrapping the live URL). Download the `.aab` plus `assetlinks.json`.
3. Commit `assetlinks.json` to the website repo at `/.well-known/assetlinks.json` (this proves you own the URL, removing the browser bar).
4. In Play Console: create app "Roteiro — Wine Trips in Portugal", upload the `.aab`, fill the data-safety form (data collected: name, email, free-text notes, for "app functionality"; no ads, no tracking).
5. Listing copy is below. Submit for review.

## Apple App Store
Apple has no TWA equivalent; use PWABuilder's iOS package (a WKWebView wrapper Xcode project) or keep iOS as install-from-Safari while Play ships first.
1. pwabuilder.com → same URL → iOS package → open in Xcode, sign with your team, archive, upload via App Store Connect.
2. Same listing copy. Under App Review notes, state it is a companion planner with live data from viavinho.net.
3. Apple sometimes pushes back on thin wrappers (guideline 4.2). Mitigation already built in: offline support, installable behaviour, and native-feeling UI. If rejected, the fix is adding one native capability (push notifications for itinerary reminders) via the same PWABuilder project.

## Listing copy (both stores)
- **Name:** Roteiro — Wine Trips in Portugal
- **Subtitle:** Plan honest wine days, region by region
- **Description:** Two minutes of questions, one honest itinerary. Roteiro plans your wine days across Setúbal and Arrábida, Sintra and Colares, the Douro, Alentejo and Vinho Verde: estates that genuinely welcome your group size, reservation requirements flagged, lunch and transport advice included. Built by Via Vinho, small-group wine experience specialists from Lisbon. When you want it handled end to end, send your roteiro to our concierge and we confirm the bookings for you.
- **Keywords:** wine tour, Portugal, Douro, Setúbal, Alentejo, itinerary, wine tasting, Lisbon
- **Category:** Travel. **Privacy policy:** https://viavinho.net/privacy/
- **Screenshots:** take from the live URL in device frames (region picker, an itinerary, the concierge form).

## How it feeds Via Vinho
- Setúbal and Lisbon itineraries embed Savour the Setúbal Story, Setúbal Indulgence and Graça & Anjos After Dark as bookable anchor days linking to viavinho.net.
- Every concierge request lands in Supabase table `planner_leads` (private, insert-only from the public key) with the full generated itinerary attached: qualified leads with dates, group size and budget context.
- Groups of 10+ are explicitly steered toward hosted/concierge days, which is where Via Vinho margin lives.
