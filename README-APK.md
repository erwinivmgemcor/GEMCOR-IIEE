# PRESS IT TO WIN IT: APK Guide

Walang Android SDK sa makina ko, kaya hindi ko ma-build ang APK mismo dito. Ginawa ko ang kit na ito para ang GitHub (libre) ang mag-build para sa iyo. Hindi mo kailangang mag-install ng kahit ano sa PC.

## Mga hakbang

1. **I-extract ang zip na ito** at i-upload ang laman sa ROOT ng repo mo (`GEMCOR-IIEE`), katabi ng `index.html`:
   - `package.json`
   - `capacitor.config.json`
   - folder na `scripts/`
   - folder na `assets/`
   - folder na `.github/` (nasa loob ang `workflows/build-apk.yml`)
   - `.gitignore`

   Tip: sa GitHub web, gamitin ang "Add file > Upload files" at i-drag ang mga folder. Kung hindi lumalabas ang `.github` (hidden folder sa Windows), i-on ang "Show hidden files", o gamitin ang GitHub Desktop.

   Huwag galawin ang `index.html`, `bgm.mp3` at mga larawan. Gagamitin ng build ang mga iyon.

2. Sa GitHub repo, pumunta sa tab na **Actions**. Kung may tanong na "enable workflows", i-click ang enable.
3. Piliin ang **Build APK** > **Run workflow** > **Run workflow** (nagre-run din ito kusa tuwing mag-push ka sa `main`). Aabot ng mga 5 hanggang 8 minuto.
4. Kapag may green check na, buksan ang run at sa **Artifacts** sa baba, i-download ang **PressItToWinIt-APK**. Zip ito na may `app-debug.apk` sa loob.
5. Ilipat ang APK sa Android device (USB, Drive, o email), buksan ito, at payagan ang "Install unknown apps". Tapos na.

## Ano ang ginagawa ng build

- **Offline:** dina-download nito ang Orbitron, Rajdhani at Share Tech Mono at isinasama sa app. Walang internet na kailangan sa event. Ang `bgm.mp3`, logos at prize images ay nasa loob na rin ng APK.
- **Music:** tumutugtog agad pagbukas, walang first-tap at hindi na kailangan ang Chrome flag.
- **Fullscreen at laging gising:** nakatago ang status/navigation bar, at hindi natutulog ang screen.
- **Icon at splash:** gamit ang GEMCOR neon logo sa madilim na background.
- **Rotation:** sumusunod pa rin sa orientation ng device, at gumagana pa rin ang rotate setting (⚙) mo para sa portrait TV.
- Hindi nababago ang version mo sa GitHub Pages. Ang pagpapalit sa local fonts ay nangyayari lang sa loob ng build.

## Kapag may update sa game

Palitan lang ang `index.html` (o mga larawan/music) sa repo, tapos mag-run ulit ng **Build APK** at i-download ang bagong APK.

## Mga paalala

- Ito ay **debug APK**: puwede i-install at gamitin sa event, pero hindi puwede sa Play Store. Kung kailangan ng release/signed na APK, sabihin mo at idadagdag ko ang signing.
- Kung mag-fail ang build, buksan ang run, i-click ang pulang step, at ipadala sa akin ang error.
- Hindi ko pa ito nasusubukan sa totoong device. I-test ang music volume, ang rotation at ang pindot sa mismong TV/tablet bago ang event.
- Ang stock ng prizes at settings ay nasa device mismo (localStorage). Kung i-uninstall at i-install ulit ang app, mare-reset ang mga ito.
