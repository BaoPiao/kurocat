#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

export const RELEASE_VERSION = 'v5.1.2';
export const RELEASE_VER_NUM = '5.1.2';

export const VERIFIED_ASSETS = [
  {
    key: 'win64',
    platform: { zh: 'Windows 10 / 11 (x64)', en: 'Windows 10 / 11 (x64)', ja: 'Windows 10 / 11 (x64)', ko: 'Windows 10 / 11 (x64)' },
    desc: {
      zh: '推荐安装版 · 内置 65% / 108 键切换与 App 内自动更新',
      en: 'Recommended NSIS installer · 65%/108-key + in-app auto-updater',
      ja: '推奨インストーラー · 65%/108 キー切替＆自動更新内蔵',
      ko: '권장 설치판 · 65%/108키 전환 및 앱 내 자동 업데이트 내장',
    },
    file: 'KuroCat-5.1.2-x64-setup.exe',
    size: '2.23 MB',
    sha256: '122402d52007edc57b6a43c7a6d2e0943036a762f3c4845813bca4af49dd0d29',
  },
  {
    key: 'macos',
    platform: { zh: 'macOS 10.15+ (Apple Silicon & Intel)', en: 'macOS 10.15+ (Apple Silicon & Intel)', ja: 'macOS 10.15+ (M1–M4 & Intel)', ko: 'macOS 10.15+ (Apple Silicon & Intel)' },
    desc: {
      zh: '通用 DMG 镜像 · 也可通过 brew install --cask qianyiai/tap/kurocat 安装',
      en: 'Universal DMG · or install via brew install --cask qianyiai/tap/kurocat',
      ja: 'Universal DMG · Homebrew 1 行インストール対応',
      ko: '유니버설 DMG · Homebrew 한 줄 설치 지원',
    },
    file: 'KuroCat-v5.1.2-macos-universal.dmg',
    size: '6.17 MB',
    sha256: '33e168a107f3ece2ee60d99289361232fa9d7270ed41a577b4dbb13a8275d9ea',
  },
  {
    key: 'win7',
    platform: { zh: 'Windows 7 SP1 (64 位离线兼容包)', en: 'Windows 7 SP1 (x64 Portable)', ja: 'Windows 7 SP1 (64bit ポータブル)', ko: 'Windows 7 SP1 (64비트 포터블)' },
    desc: {
      zh: '内置离线 WebView2 109 内核 · 无 Aero 亦无白框',
      en: 'Bundled offline WebView2 109 · native per-pixel transparency',
      ja: 'オフライン WebView2 109 同梱 · Aero 不要の透過描画',
      ko: '오프라인 WebView2 109 내장 · Aero 없이도 완벽한 투명 렌더링',
    },
    file: 'KuroCat-v5.1.2-win7-x64-portable.zip',
    size: '179.08 MB',
    sha256: '5805c79717b49cd75040dd625308367e738a1987b2ab3c8a728e6d2e037399a9',
  },
  {
    key: 'linux-x64-deb',
    platform: { zh: 'Linux x86_64 (.deb)', en: 'Linux x86_64 (.deb)', ja: 'Linux x86_64 (.deb)', ko: 'Linux x86_64 (.deb)' },
    desc: {
      zh: 'Ubuntu 22.04+ / Debian 12+ / 银河麒麟 V11+（glibc >= 2.34）',
      en: 'Ubuntu 22.04+ / Debian 12+ / KylinOS V11+ (glibc >= 2.34)',
      ja: 'Ubuntu 22.04+ / Debian 12+ / KylinOS V11+ (glibc >= 2.34)',
      ko: 'Ubuntu 22.04+ / Debian 12+ / KylinOS V11+ (glibc >= 2.34)',
    },
    file: 'KuroCat-v5.1.2-linux-amd64.deb',
    size: '2.48 MB',
    sha256: 'bf36af5507cbeef41c832b612278c0dfb693a7d7de6b7b6c660e2dac39fbd25b',
  },
  {
    key: 'linux-arm64-deb',
    platform: { zh: 'Linux ARM64 (.deb)', en: 'Linux ARM64 (.deb)', ja: 'Linux ARM64 (.deb)', ko: 'Linux ARM64 (.deb)' },
    desc: {
      zh: '飞腾 / 鲲鹏 / 银河麒麟 ARM64 / 树莓派',
      en: 'ARM64 / Raspberry Pi / KylinOS ARM64',
      ja: 'ARM64 / Raspberry Pi 向け .deb パッケージ',
      ko: 'ARM64 / 라즈베리 파이용 .deb 패키지',
    },
    file: 'KuroCat-v5.1.2-linux-arm64.deb',
    size: '2.44 MB',
    sha256: '1ce967a5b0ceda369627f4cc4def417e95f1209d17d747351aa0cfbbfa9aede9',
  },
  {
    key: 'linux-x64-appimage',
    platform: { zh: 'Linux x86_64 (.AppImage)', en: 'Linux x86_64 (.AppImage)', ja: 'Linux x86_64 (.AppImage)', ko: 'Linux x86_64 (.AppImage)' },
    desc: {
      zh: '免安装绿色便携版 · chmod +x 后直接运行',
      en: 'Portable AppImage · chmod +x and run without root',
      ja: 'インストール不要ポータブル版 · chmod +x で即起動',
      ko: '무설치 포터블 버전 · chmod +x 후 바로 실행',
    },
    file: 'KuroCat-v5.1.2-linux-amd64.AppImage',
    size: '77.61 MB',
    sha256: '0f48dd4bf47a3aca19b0d3a76382f72061ffc231c3e33205f4ea0f5d7daf79b7',
  },
  {
    key: 'linux-arm64-appimage',
    platform: { zh: 'Linux ARM64 (.AppImage)', en: 'Linux ARM64 (.AppImage)', ja: 'Linux ARM64 (.AppImage)', ko: 'Linux ARM64 (.AppImage)' },
    desc: {
      zh: 'ARM64 免安装绿色便携版',
      en: 'Portable ARM64 AppImage',
      ja: 'ARM64 向けポータブル版',
      ko: 'ARM64 포터블 AppImage',
    },
    file: 'KuroCat-v5.1.2-linux-arm64.AppImage',
    size: '75.78 MB',
    sha256: '578530bcbf22fd85aec2d139b24616aac10665090d4a1489652649faa34e38bf',
  },
  {
    key: 'android',
    platform: { zh: 'Android 客户端 (.apk)', en: 'Android App (.apk)', ja: 'Android アプリ (.apk)', ko: 'Android 앱 (.apk)' },
    desc: {
      zh: '官方签发安装包 · 手机平板触控交互小黑猫',
      en: 'Official Android APK build',
      ja: '公式 Android APK ビルド',
      ko: '공식 Android APK 빌드',
    },
    file: 'KuroCat-v5.1.2-android.apk',
    size: '5.05 MB',
    sha256: '153c57ec417a46bee584eb5ca104edc4760b44f490cb015274fc0e534ca0424c',
  },
];

const LOCALES = ['zh', 'en', 'ja', 'ko'];
const LOCALE_META = {
  zh: { htmlLang: 'zh-CN', ogLocale: 'zh_CN', prefix: '', siteName: 'KuroCat 官网' },
  en: { htmlLang: 'en', ogLocale: 'en_US', prefix: '/en', siteName: 'KuroCat Official' },
  ja: { htmlLang: 'ja', ogLocale: 'ja_JP', prefix: '/ja', siteName: 'KuroCat 公式サイト' },
  ko: { htmlLang: 'ko', ogLocale: 'ko_KR', prefix: '/ko', siteName: 'KuroCat 공식 사이트' },
};

const NAV_I18N = {
  zh: {
    home: '首页试玩',
    download: '全平台下载',
    vs: 'vs Bongo Cat',
    obs: 'OBS 直播源',
    mcp: 'AI 伴侣 & MCP',
    github: 'GitHub',
    officialStrip: '🔒 唯一官方渠道：kurocat.org · github.com/qianyiai/kurocat · qianyiai/homebrew-tap（kurocat.net 等第三方站点非官方维护）',
    ctaPlay: '打开 3D 在线试玩 →',
    ctaDl: '免费下载最新版 →',
    copied: '已复制 ✓',
    copy: '复制',
    cdnBtn: '官网高速直链',
    ghBtn: 'GitHub 原链',
    footerAuthor: '由 谦一 (Qianyi) 开源维护 · MIT License',
  },
  en: {
    home: '3D Playground',
    download: 'Downloads',
    vs: 'vs Bongo Cat',
    obs: 'OBS Overlay',
    mcp: 'AI & MCP Studio',
    github: 'GitHub',
    officialStrip: '🔒 Official channels only: kurocat.org · github.com/qianyiai/kurocat · qianyiai/homebrew-tap (third-party domains like kurocat.net are unofficial)',
    ctaPlay: 'Try Live 3D Playground →',
    ctaDl: 'Free Official Download →',
    copied: 'Copied ✓',
    copy: 'Copy',
    cdnBtn: 'Official CDN',
    ghBtn: 'GitHub Release',
    footerAuthor: 'MIT Open Source · Built by Qianyi (@qianyiai)',
  },
  ja: {
    home: '3D 体験',
    download: 'ダウンロード',
    vs: 'vs Bongo Cat',
    obs: 'OBS 透過配信',
    mcp: 'AI & MCP',
    github: 'GitHub',
    officialStrip: '🔒 公式配布元のみ：kurocat.org · github.com/qianyiai/kurocat · qianyiai/homebrew-tap（kurocat.net 等の第三者サイトは非公式です）',
    ctaPlay: 'ブラウザで 3D 体験する →',
    ctaDl: '最新公式版を無料ダウンロード →',
    copied: 'コピー済 ✓',
    copy: 'コピー',
    cdnBtn: '公式高速ミラー',
    ghBtn: 'GitHub 公式',
    footerAuthor: 'MIT オープンソース · 開発: 謙一 (Qianyi)',
  },
  ko: {
    home: '3D 체험',
    download: '다운로드',
    vs: 'vs Bongo Cat',
    obs: 'OBS 투명 오버레이',
    mcp: 'AI & MCP',
    github: 'GitHub',
    officialStrip: '🔒 유일한 공식 채널: kurocat.org · github.com/qianyiai/kurocat · qianyiai/homebrew-tap (kurocat.net 등 제3자 사이트는 비공식입니다)',
    ctaPlay: '3D 실시간 체험 열기 →',
    ctaDl: '공식 최신 버전 무료 다운로드 →',
    copied: '복사됨 ✓',
    copy: '복사',
    cdnBtn: '공식 고속 CDN',
    ghBtn: 'GitHub 공식',
    footerAuthor: 'MIT 오픈소스 · 제작: Qianyi (@qianyiai)',
  },
};

export const SUBPAGE_SLUGS = ['download', 'vs/bongo-cat', 'obs', 'mcp'];

function esc(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function pageUrl(locale, slug) {
  const pref = LOCALE_META[locale].prefix;
  return `https://kurocat.org${pref}/${slug}/`;
}

function pagePath(locale, slug) {
  const pref = LOCALE_META[locale].prefix;
  return `${pref}/${slug}/`;
}

function homePath(locale) {
  return locale === 'zh' ? '/' : `/${locale}/`;
}

const SHARED_CSS = `
:root {
  --bg: #07080c;
  --surface: rgba(255, 255, 255, 0.04);
  --surface-strong: rgba(255, 255, 255, 0.07);
  --border: rgba(255, 255, 255, 0.10);
  --text: #f4f6fb;
  --sub: #a0a8ba;
  --dim: #737b8e;
  --lime: #d4f044;
  --lime-ink: #0a0c06;
  --cyan: #58c7ff;
}
* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  background: radial-gradient(circle at 50% -10%, rgba(212, 240, 68, 0.09), transparent 46%), var(--bg);
  color: var(--text);
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Text", "PingFang SC", "Hiragino Sans", "Apple SD Gothic Neo", "Microsoft YaHei", system-ui, sans-serif;
  line-height: 1.65;
  -webkit-font-smoothing: antialiased;
}
a { color: inherit; }
code, pre {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}
.global-nav {
  position: sticky; top: 0; z-index: 50;
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  background: rgba(7, 8, 12, 0.78);
  border-bottom: 1px solid var(--border);
}
.nav-inner {
  max-width: 1100px; margin: 0 auto; padding: 12px 20px;
  display: flex; align-items: center; justify-content: space-between; gap: 14px; flex-wrap: wrap;
}
.brand {
  display: inline-flex; align-items: center; gap: 8px;
  text-decoration: none; font-weight: 700; font-size: 15px; letter-spacing: -0.01em;
}
.brand img { border-radius: 5px; }
.ver-pill {
  font-size: 11px; font-weight: 700; color: var(--lime);
  background: rgba(212, 240, 68, 0.13); border: 1px solid rgba(212, 240, 68, 0.30);
  padding: 1px 7px; border-radius: 999px;
}
.nav-right { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
.nav-links { display: flex; align-items: center; gap: 14px; flex-wrap: wrap; font-size: 13px; color: var(--sub); }
.nav-links a { text-decoration: none; transition: color 0.18s; }
.nav-links a:hover, .nav-links a.active { color: var(--text); font-weight: 600; }
.lang-switch {
  display: inline-flex; gap: 2px; padding: 2px; border-radius: 999px;
  background: rgba(255,255,255,0.06); border: 1px solid var(--border);
}
.lang-btn {
  text-decoration: none; font-size: 11px; font-weight: 500; color: var(--sub);
  padding: 3px 8px; border-radius: 999px;
}
.lang-btn:hover { color: var(--text); }
.lang-btn.active { background: var(--lime); color: var(--lime-ink); font-weight: 700; }
.wrap { max-width: 1020px; margin: 0 auto; padding: 34px 20px 76px; }
.breadcrumb {
  display: flex; align-items: center; gap: 8px; font-size: 12.5px; color: var(--dim); margin-bottom: 18px;
}
.breadcrumb a { color: var(--sub); text-decoration: none; }
.breadcrumb a:hover { color: var(--lime); }
.hero {
  padding: 28px 30px; border-radius: 24px;
  background: linear-gradient(180deg, rgba(255,255,255,0.055), rgba(255,255,255,0.025));
  border: 1px solid var(--border); margin-bottom: 24px;
}
.eyebrow {
  font-size: 11.5px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
  color: var(--lime); margin-bottom: 10px;
}
h1 {
  margin: 0 0 12px; font-size: clamp(26px, 4vw, 38px); line-height: 1.2; letter-spacing: -0.025em;
}
.lead { margin: 0 0 20px; font-size: 15.5px; color: var(--sub); max-width: 780px; }
.cta-row { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; }
.btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 6px;
  padding: 10px 18px; border-radius: 999px; text-decoration: none; font-size: 13.5px; font-weight: 650;
  border: 1px solid var(--border); background: var(--surface-strong); color: var(--text);
  transition: transform 0.15s, border-color 0.15s;
}
.btn:hover { transform: translateY(-1px); border-color: rgba(255,255,255,0.28); }
.btn-lime { background: var(--lime); color: var(--lime-ink); border-color: transparent; }
.btn-sm { padding: 6px 12px; font-size: 12px; }
.official-bar {
  margin-top: 18px; padding: 10px 14px; border-radius: 12px;
  background: rgba(212, 240, 68, 0.07); border: 1px solid rgba(212, 240, 68, 0.22);
  font-size: 12.5px; color: #dce89d;
}
.card {
  background: var(--surface); border: 1px solid var(--border);
  border-radius: 20px; padding: 24px 26px; margin-bottom: 20px;
}
h2 { margin: 0 0 14px; font-size: 21px; letter-spacing: -0.015em; }
h3 { margin: 18px 0 8px; font-size: 15.5px; color: var(--text); }
p { margin: 0 0 12px; color: var(--sub); font-size: 14.5px; }
p strong, li strong { color: var(--text); }
ul, ol { margin: 0 0 14px; padding-left: 20px; color: var(--sub); font-size: 14.5px; }
li { margin-bottom: 6px; }
.table-wrap { overflow-x: auto; margin-top: 8px; }
table { width: 100%; border-collapse: collapse; font-size: 13.5px; }
th, td { text-align: left; padding: 12px 12px; border-bottom: 1px solid var(--border); vertical-align: top; }
th { color: var(--sub); font-size: 12px; font-weight: 650; white-space: nowrap; background: rgba(255,255,255,0.02); }
.sha { display: block; font-size: 11px; color: var(--dim); word-break: break-all; margin-top: 4px; }
.badge-yes { color: var(--lime); font-weight: 700; }
.badge-no { color: #f87171; font-weight: 600; }
.badge-mid { color: #fbbf24; font-weight: 600; }
.grid-2 { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 16px; }
.grid-3 { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; }
.mini-card {
  padding: 18px; border-radius: 16px; background: rgba(255,255,255,0.03); border: 1px solid var(--border);
}
.mini-card h3 { margin-top: 0; font-size: 15px; }
.code-box {
  position: relative; background: #0d1017; border: 1px solid var(--border);
  border-radius: 14px; padding: 14px 16px; overflow-x: auto; margin: 10px 0 14px;
}
.code-box pre { margin: 0; font-size: 12.5px; color: #dbe7ff; line-height: 1.55; white-space: pre; }
.copy-btn {
  position: absolute; top: 10px; right: 10px; cursor: pointer;
  background: rgba(255,255,255,0.09); color: var(--text); border: 1px solid var(--border);
  border-radius: 999px; padding: 4px 11px; font-size: 11.5px; font-family: inherit;
}
.copy-btn:hover { background: var(--lime); color: var(--lime-ink); border-color: transparent; }
.step-num {
  display: inline-flex; width: 24px; height: 24px; border-radius: 999px; align-items: center; justify-content: center;
  background: var(--lime); color: var(--lime-ink); font-weight: 800; font-size: 12.5px; margin-right: 8px;
}
.faq-item { padding: 14px 0; border-top: 1px solid var(--border); }
.faq-item:first-of-type { border-top: none; padding-top: 4px; }
.faq-q { font-weight: 700; color: var(--text); font-size: 15px; margin-bottom: 6px; }
.faq-a { color: var(--sub); font-size: 14px; margin: 0; }
.related-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; margin-top: 10px; }
.related-link {
  display: block; padding: 14px 16px; border-radius: 14px; text-decoration: none;
  background: rgba(255,255,255,0.03); border: 1px solid var(--border); transition: border-color 0.16s;
}
.related-link:hover { border-color: rgba(212, 240, 68, 0.45); }
.related-link strong { display: block; font-size: 14px; color: var(--text); margin-bottom: 4px; }
.related-link span { font-size: 12.5px; color: var(--sub); }
footer {
  max-width: 1020px; margin: 0 auto; padding: 24px 20px 44px;
  border-top: 1px solid var(--border); display: flex; justify-content: space-between;
  gap: 14px; flex-wrap: wrap; font-size: 12.5px; color: var(--dim);
}
.footer-links { display: flex; gap: 14px; flex-wrap: wrap; }
.footer-links a { color: var(--sub); text-decoration: none; }
.footer-links a:hover { color: var(--lime); }
@media (max-width: 780px) {
  .grid-2, .grid-3, .related-grid { grid-template-columns: 1fr; }
  .hero, .card { padding: 20px 18px; }
}
`;

function renderPage({ locale, slug, title, description, eyebrow, h1, lead, breadcrumbLabel, bodyHtml, faqs, howToSteps, today }) {
  const lm = LOCALE_META[locale];
  const nav = NAV_I18N[locale];
  const canonical = pageUrl(locale, slug);
  const homeHref = homePath(locale);

  const graph = [
    {
      '@type': 'WebPage',
      '@id': `${canonical}#webpage`,
      url: canonical,
      name: title,
      description,
      inLanguage: lm.htmlLang,
      isPartOf: { '@id': 'https://kurocat.org/#website' },
      about: { '@id': 'https://kurocat.org/#software' },
      dateModified: today,
    },
    {
      '@type': 'BreadcrumbList',
      '@id': `${canonical}#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'KuroCat', item: `https://kurocat.org${homeHref}` },
        { '@type': 'ListItem', position: 2, name: breadcrumbLabel, item: canonical },
      ],
    },
    {
      '@type': 'SoftwareApplication',
      '@id': 'https://kurocat.org/#software',
      name: 'KuroCat',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'Windows 11, Windows 10, Windows 7, macOS 10.15+, Linux, Android',
      softwareVersion: RELEASE_VER_NUM,
      url: 'https://kurocat.org/',
      downloadUrl: pageUrl(locale, 'download'),
      codeRepository: 'https://github.com/qianyiai/kurocat',
      license: 'https://opensource.org/licenses/MIT',
      isAccessibleForFree: true,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      image: 'https://kurocat.org/assets/og-cover.png',
    },
  ];

  if (faqs && faqs.length) {
    graph.push({
      '@type': 'FAQPage',
      '@id': `${canonical}#faq`,
      mainEntity: faqs.map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a },
      })),
    });
  }

  if (howToSteps && howToSteps.length) {
    graph.push({
      '@type': 'HowTo',
      '@id': `${canonical}#howto`,
      name: h1,
      description,
      step: howToSteps.map((s, idx) => ({
        '@type': 'HowToStep',
        position: idx + 1,
        name: s.name,
        text: s.text,
      })),
    });
  }

  const relatedMap = {
    download: { title: nav.download, desc: { zh: '全平台直链与 SHA-256 校验', en: 'Win/Mac/Linux/Android CDN + SHA-256', ja: '全 OS 直リンク＆SHA-256 検証', ko: '전 플랫폼 직링크 & SHA-256 검증' }[locale] },
    'vs/bongo-cat': { title: nav.vs, desc: { zh: '与 Bongo Cat 功能、占用与开源对比', en: '3D, macOS, OBS & AI comparison', ja: 'Bongo Cat との機能・負荷比較', ko: 'Bongo Cat 기능·성능 비교' }[locale] },
    obs: { title: nav.obs, desc: { zh: '免绿幕原生 Alpha 透明直播源教程', en: 'Zero chroma-key Browser Source setup', ja: 'クロマキー不要の OBS 透過導入手順', ko: '크로마키 없는 OBS 투명 브라우저 소스' }[locale] },
    mcp: { title: nav.mcp, desc: { zh: 'Claude / Cursor / 豆包联动与 22 项 AI 捏脸', en: 'Claude/Cursor hooks & 22 facial params', ja: 'AI 連携＆22 項目の顔カスタムガイド', ko: 'AI 코딩 연동 & 22종 얼굴 커스텀' }[locale] },
  };
  const relatedCards = SUBPAGE_SLUGS.filter((s) => s !== slug)
    .map(
      (s) =>
        `<a class="related-link" href="${pagePath(locale, s)}"><strong>${esc(relatedMap[s].title)} →</strong><span>${esc(relatedMap[s].desc)}</span></a>`,
    )
    .join('\n          ');

  const faqHtml = faqs && faqs.length
    ? `<section class="card">
        <h2>FAQ</h2>
        ${faqs.map((f) => `<div class="faq-item"><div class="faq-q">${esc(f.q)}</div><p class="faq-a">${esc(f.a)}</p></div>`).join('\n        ')}
      </section>`
    : '';

  return `<!DOCTYPE html>
<html lang="${lm.htmlLang}">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}" />
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
  <meta name="author" content="谦一 (Qianyi)" />
  <link rel="canonical" href="${canonical}" />
  <link rel="alternate" hreflang="x-default" href="${pageUrl('zh', slug)}" />
  <link rel="alternate" hreflang="zh-CN" href="${pageUrl('zh', slug)}" />
  <link rel="alternate" hreflang="en" href="${pageUrl('en', slug)}" />
  <link rel="alternate" hreflang="ja" href="${pageUrl('ja', slug)}" />
  <link rel="alternate" hreflang="ko" href="${pageUrl('ko', slug)}" />
  <link rel="alternate" type="text/plain" title="LLMs.txt" href="https://kurocat.org/llms.txt" />
  <meta property="og:site_name" content="${esc(lm.siteName)}" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(description)}" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:image" content="https://kurocat.org/assets/og-cover.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:locale" content="${lm.ogLocale}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${esc(title)}" />
  <meta name="twitter:description" content="${esc(description)}" />
  <meta name="twitter:image" content="https://kurocat.org/assets/og-cover.png" />
  <meta name="theme-color" content="#07080c" />
  <link rel="icon" href="/assets/favicon.ico" sizes="any" />
  <link rel="icon" type="image/png" href="/assets/kurocat-icon.png" />
  <link rel="apple-touch-icon" href="/assets/apple-touch-icon.png" />
  <script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })}</script>
  <style>${SHARED_CSS}</style>
</head>
<body>
  <header class="global-nav">
    <div class="nav-inner">
      <a class="brand" href="${homeHref}">
        <img src="/assets/kurocat-icon.png" alt="KuroCat" width="22" height="22" />
        <span>KuroCat</span>
        <span class="ver-pill">${RELEASE_VERSION}</span>
      </a>
      <div class="nav-right">
        <nav class="nav-links" aria-label="Primary">
          <a href="${homeHref}">${esc(nav.home)}</a>
          <a href="${pagePath(locale, 'download')}"${slug === 'download' ? ' class="active"' : ''}>${esc(nav.download)}</a>
          <a href="${pagePath(locale, 'vs/bongo-cat')}"${slug === 'vs/bongo-cat' ? ' class="active"' : ''}>${esc(nav.vs)}</a>
          <a href="${pagePath(locale, 'obs')}"${slug === 'obs' ? ' class="active"' : ''}>${esc(nav.obs)}</a>
          <a href="${pagePath(locale, 'mcp')}"${slug === 'mcp' ? ' class="active"' : ''}>${esc(nav.mcp)}</a>
          <a href="https://github.com/qianyiai/kurocat" target="_blank" rel="me noopener">${esc(nav.github)}</a>
        </nav>
        <div class="lang-switch" role="group" aria-label="Language">
          <a class="lang-btn${locale === 'zh' ? ' active' : ''}" href="${pagePath('zh', slug)}">中文</a>
          <a class="lang-btn${locale === 'en' ? ' active' : ''}" href="${pagePath('en', slug)}">EN</a>
          <a class="lang-btn${locale === 'ja' ? ' active' : ''}" href="${pagePath('ja', slug)}">日本語</a>
          <a class="lang-btn${locale === 'ko' ? ' active' : ''}" href="${pagePath('ko', slug)}">한국어</a>
        </div>
      </div>
    </div>
  </header>

  <main class="wrap">
    <nav class="breadcrumb" aria-label="Breadcrumb">
      <a href="${homeHref}">KuroCat</a>
      <span>/</span>
      <span>${esc(breadcrumbLabel)}</span>
    </nav>

    <section class="hero">
      <div class="eyebrow">${esc(eyebrow)}</div>
      <h1>${esc(h1)}</h1>
      <p class="lead">${esc(lead)}</p>
      <div class="cta-row">
        <a class="btn btn-lime" href="${slug === 'download' ? '#files' : pagePath(locale, 'download')}">${esc(nav.ctaDl)}</a>
        <a class="btn" href="${homeHref}">${esc(nav.ctaPlay)}</a>
        <a class="btn" href="https://github.com/qianyiai/kurocat" target="_blank" rel="me noopener">GitHub ★</a>
      </div>
      <div class="official-bar">${esc(nav.officialStrip)}</div>
    </section>

    ${bodyHtml}
    ${faqHtml}

    <section class="card">
      <h2>${{ zh: '更多 KuroCat 官方专题', en: 'More Official KuroCat Guides', ja: 'その他の公式ガイド', ko: '더 많은 KuroCat 공식 가이드' }[locale]}</h2>
      <div class="related-grid">
        ${relatedCards}
      </div>
    </section>
  </main>

  <footer>
    <div>KuroCat Official (<code>kurocat.org</code>) · ${esc(nav.footerAuthor)}</div>
    <div class="footer-links">
      <a href="${homeHref}">${esc(nav.home)}</a>
      <a href="${pagePath(locale, 'download')}">${esc(nav.download)}</a>
      <a href="${pagePath(locale, 'vs/bongo-cat')}">${esc(nav.vs)}</a>
      <a href="${pagePath(locale, 'obs')}">${esc(nav.obs)}</a>
      <a href="${pagePath(locale, 'mcp')}">${esc(nav.mcp)}</a>
      <a href="https://qianyi.one/" rel="me noopener">Qianyi</a>
      <a href="https://github.com/qianyiai/kurocat" target="_blank" rel="me noopener">GitHub</a>
    </div>
  </footer>

  <script>
    document.querySelectorAll('[data-copy]').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var text = btn.getAttribute('data-copy') || '';
        if (!text || !navigator.clipboard) return;
        navigator.clipboard.writeText(text).then(function () {
          var orig = btn.textContent;
          btn.textContent = ${JSON.stringify(nav.copied)};
          setTimeout(function () { btn.textContent = orig; }, 1600);
        });
      });
    });
  </script>
</body>
</html>`;
}

function buildDownloadPage(locale, today) {
  const nav = NAV_I18N[locale];
  const copy = {
    zh: {
      title: `KuroCat 官方下载（${RELEASE_VERSION}）— Windows / macOS / Linux / Android 全平台高速直链与 SHA-256 校验`,
      description: `KuroCat 唯一官方下载中心（kurocat.org）：提供 ${RELEASE_VERSION} Windows 10/11、Windows 7 离线绿包、macOS Universal DMG / Homebrew、Linux (.deb/.AppImage) 与 Android APK 官方高速直链及完整 SHA-256 校验值。`,
      eyebrow: `Official Downloads · ${RELEASE_VERSION} · Verified SHA-256`,
      h1: `KuroCat 官方全平台下载（${RELEASE_VERSION}）`,
      lead: '所有安装包均由开源仓库 github.com/qianyiai/kurocat 自动构建并公开 SHA-256 摘要，提供 kurocat.org 国内高速直链与 GitHub Releases 双源下载。',
      breadcrumb: '全平台下载',
      tblTitle: '全平台安装包与 SHA-256 校验表',
      colPlat: '平台与架构',
      colFile: '文件名与 SHA-256',
      colSize: '体积',
      colDl: '官方下载',
      brewTitle: 'macOS 一键安装（Homebrew 推荐 · 自动解除隔离）',
      brewDesc: '通过官方 Homebrew Tap 安装会自动清理 com.apple.quarantine 隔离属性，无需手动执行 xattr，后续也可一行命令升级：',
      tipsTitle: 'Windows SmartScreen 与 macOS 首次启动指南',
      winTipTitle: 'Windows Edge / Chrome 提示「通常不会下载」或 SmartScreen 蓝框',
      winTipBody: '由于 KuroCat 是免费开源软件、未购买商业 EV 签名证书，浏览器首次下载新版 .exe 可能弹窗提示：Edge 点击下载项右侧 ··· →「保留」→「显示更多 ▾」→「仍然保留」；双击安装若遇蓝框点「更多信息」→「仍要运行」。你也可以用 PowerShell 运行 <code>Get-FileHash 文件名 -Algorithm SHA256</code> 与上表逐位核对。',
      macTipTitle: 'macOS 手动安装 DMG 解除隔离与权限开启',
      macTipBody: '将 KuroCat 拖入「应用程序」后，如提示无法验证开发者，在终端执行下方命令一次即可。随后在「系统设置 → 隐私与安全性」中勾选「辅助功能」与「输入监控」里的 KuroCat 即可全局响应键鼠。',
      faqs: [
        { q: 'KuroCat 的唯一官方下载地址是什么？', a: '唯一官方网站为 https://kurocat.org/download/，官方 GitHub Releases 为 https://github.com/qianyiai/kurocat/releases，macOS 官方源为 qianyiai/homebrew-tap。其他第三方同名域名（如 kurocat.net）均非官方维护。' },
        { q: '如何验证下载的安装包没有被第三方篡改？', a: '下载后计算文件 SHA-256（Windows 用 Get-FileHash，macOS/Linux 用 shasum -a 256），与本页及 GitHub Releases 公布的 64 位 SHA-256 摘要完全一致即可确认原版无篡改。' },
        { q: 'Windows 7 或银河麒麟 / 统信 Linux 能用吗？', a: '可以。Windows 7 SP1 64 位请下载内置 WebView2 109 的 win7-x64-portable.zip；Ubuntu 22.04+ / Debian 12+ / 银河麒麟 V11+（glibc >= 2.34）支持 x86_64 与 ARM64 的 .deb 及 .AppImage。' },
      ],
    },
    en: {
      title: `Download KuroCat (${RELEASE_VERSION}) — Official Windows, macOS, Linux & Android Builds + SHA-256`,
      description: `Official KuroCat download hub (kurocat.org): fast CDN mirrors and GitHub Releases for Windows 10/11, Windows 7 portable, macOS Apple Silicon/Intel DMG & Homebrew, Linux (.deb/.AppImage), and Android APK with verified SHA-256 checksums.`,
      eyebrow: `Official Downloads · ${RELEASE_VERSION} · Verified SHA-256`,
      h1: `Download KuroCat (${RELEASE_VERSION}) — All Platforms`,
      lead: 'Every installer is built transparently from github.com/qianyiai/kurocat with verified SHA-256 checksums. Choose fast official kurocat.org CDN links or direct GitHub Releases.',
      breadcrumb: 'Download',
      tblTitle: 'Official Installers & SHA-256 Checksums',
      colPlat: 'Platform',
      colFile: 'Filename & SHA-256',
      colSize: 'Size',
      colDl: 'Download',
      brewTitle: 'macOS One-Line Install via Official Homebrew Tap',
      brewDesc: 'Recommended on macOS: automatically clears quarantine attributes (no manual xattr needed) and supports instant upgrades:',
      tipsTitle: 'First-Launch Tips (Windows SmartScreen & macOS Gatekeeper)',
      winTipTitle: 'Windows Edge / Chrome Warning or SmartScreen Prompt',
      winTipBody: 'KuroCat is free MIT open-source software without a commercial EV code-signing certificate. In Edge click ··· → Keep → Show more → Keep anyway; on the SmartScreen dialog click More info → Run anyway. Verify integrity anytime with <code>Get-FileHash &lt;file&gt; -Algorithm SHA256</code>.',
      macTipTitle: 'macOS Manual DMG Gatekeeper & Input Permissions',
      macTipBody: 'After dragging KuroCat.app into Applications, run the command below once if macOS warns about an unidentified developer, then enable KuroCat in System Settings → Privacy & Security → Accessibility and Input Monitoring.',
      faqs: [
        { q: 'Where is the only official place to download KuroCat?', a: 'Only https://kurocat.org/download/, https://github.com/qianyiai/kurocat/releases, and Homebrew Tap qianyiai/homebrew-tap are official. Unaffiliated mirror sites like kurocat.net are not maintained by the author.' },
        { q: 'Does KuroCat support macOS Apple Silicon (M1–M4) and Linux?', a: 'Yes. The macOS Universal DMG natively supports M1/M2/M3/M4 and Intel Macs (macOS 10.15+). Linux supports x86_64 and ARM64 via .deb and portable .AppImage (glibc >= 2.34).' },
        { q: 'Why is the Windows installer only 2.23 MB?', a: 'KuroCat is built with Tauri v2 and Rust, reusing the OS native WebView2 instead of bundling a 150 MB Chromium binary like Electron apps.' },
      ],
    },
    ja: {
      title: `KuroCat 公式ダウンロード（${RELEASE_VERSION}）— Windows / macOS / Linux / Android 全 OS 対応＆SHA-256`,
      description: `KuroCat 唯一の公式ダウンロードページ（kurocat.org）。Windows 10/11、Windows 7 専用ポータブル、macOS (M1–M4 / Intel / Homebrew)、Linux (.deb/.AppImage)、Android APK を高速ミラーと SHA-256 ハッシュ付きで配布。`,
      eyebrow: `Official Downloads · ${RELEASE_VERSION} · Verified SHA-256`,
      h1: `KuroCat 公式ダウンロード（${RELEASE_VERSION}）`,
      lead: 'すべてのパッケージは github.com/qianyiai/kurocat から公開ビルドされ、SHA-256 チェックサムで改ざん検証が可能です。',
      breadcrumb: 'ダウンロード',
      tblTitle: '全プラットフォーム公式ビルド＆SHA-256 一覧',
      colPlat: '対応 OS',
      colFile: 'ファイル名・SHA-256',
      colSize: '容量',
      colDl: 'ダウンロード',
      brewTitle: 'macOS Homebrew 1 行インストール（推奨・検疫自動解除）',
      brewDesc: '公式 Homebrew Tap を使えば初回検疫属性（quarantine）も自動解除され、アップデートも 1 行で完了します：',
      tipsTitle: '初回起動ガイド（Windows SmartScreen / macOS 権限）',
      winTipTitle: 'Windows でダウンロード警告や SmartScreen が出た場合',
      winTipBody: '無料オープンソースで商用 EV 署名がないため警告が出る場合があります。Edge は「…」→「保存」→「詳細表示」→「保持する」、SmartScreen は「詳細情報」→「実行」で起動できます。',
      macTipTitle: 'macOS 手動 DMG 導入時の検疫解除と権限設定',
      macTipBody: '「アプリケーション」にコピー後、開発元未確認と出た場合はターミナルで下のコマンドを一度実行し、「システム設定 → プライバシーとセキュリティ」でアクセシビリティと入力監視を許可してください。',
      faqs: [
        { q: 'KuroCat の正規ダウンロード元はどこですか？', a: '公式サイト https://kurocat.org/ja/download/、GitHub Releases (github.com/qianyiai/kurocat)、および Homebrew Tap (qianyiai/homebrew-tap) のみが公式です。kurocat.net などの第三者ドメインは非公式です。' },
        { q: 'Mac (Apple Silicon M1〜M4) や Linux でも使えますか？', a: 'はい。macOS は M1〜M4 / Intel 両対応 Universal DMG と Homebrew、Linux は x86_64 / ARM64 の .deb と .AppImage を提供しています。' },
      ],
    },
    ko: {
      title: `KuroCat 공식 다운로드 (${RELEASE_VERSION}) — Windows / macOS / Linux / Android 전 플랫폼 + SHA-256`,
      description: `KuroCat 유일한 공식 다운로드 센터(kurocat.org): Windows 10/11, Windows 7 포터블, macOS 유니버설 DMG & Homebrew, Linux (.deb/.AppImage), Android APK 고속 직링크 및 SHA-256 무결성 검증 제공.`,
      eyebrow: `Official Downloads · ${RELEASE_VERSION} · Verified SHA-256`,
      h1: `KuroCat 공식 전 플랫폼 다운로드 (${RELEASE_VERSION})`,
      lead: '모든 설치 파일은 github.com/qianyiai/kurocat 오픈소스 저장소에서 투명하게 빌드되며 SHA-256 체크섬으로 무결성을 검증할 수 있습니다.',
      breadcrumb: '다운로드',
      tblTitle: '플랫폼별 공식 설치 파일 및 SHA-256 검증',
      colPlat: '플랫폼',
      colFile: '파일명 & SHA-256',
      colSize: '용량',
      colDl: '다운로드',
      brewTitle: 'macOS Homebrew 한 줄 설치 (권장 · 격리 자동 해제)',
      brewDesc: '공식 Homebrew Tap을 사용하면 수동 xattr 없이 바로 설치되고 업데이트도 한 줄로 끝납니다:',
      tipsTitle: '첫 실행 안내 (Windows SmartScreen / macOS Gatekeeper)',
      winTipTitle: 'Windows 브라우저 경고 또는 SmartScreen 파란 창 안내',
      winTipBody: '무료 MIT 오픈소스 소프트웨어로 상용 EV 인증서가 없어 경고가 뜰 수 있습니다. Edge에서 ··· → 유지 → 더 보기 → 그래도 유지, SmartScreen에서 추가 정보 → 실행을 클릭하세요.',
      macTipTitle: 'macOS DMG 수동 설치 시 격리 해제 및 권한 허용',
      macTipBody: '응용 프로그램으로 복사한 뒤 개발자 확인 불가 알림이 뜨면 아래 명령어를 터미널에서 한 번 실행하고, 시스템 설정 → 개인정보 보호 및 보안에서 손쉬운 사용과 입력 모니터링을 허용하세요.',
      faqs: [
        { q: 'KuroCat의 공식 다운로드 경로는 어디인가요?', a: 'https://kurocat.org/ko/download/, https://github.com/qianyiai/kurocat/releases, 그리고 Homebrew Tap(qianyiai/homebrew-tap)만 공식입니다. kurocat.net 등 제3자 사이트는 비공식입니다.' },
        { q: '설치 파일 용량이 왜 이렇게 가볍나요?', a: 'Electron 대신 Tauri v2 + Rust로 제작해 시스템 내장 WebView를 활용하므로 Windows 설치 파일이 2.23 MB에 불과합니다.' },
      ],
    },
  }[locale];

  const rows = VERIFIED_ASSETS.map((a) => {
    const cdnUrl = `/releases/${RELEASE_VERSION}/${a.file}`;
    const ghUrl = `https://github.com/qianyiai/kurocat/releases/download/${RELEASE_VERSION}/${a.file}`;
    return `<tr>
            <td><strong>${esc(a.platform[locale])}</strong><br /><span style="font-size:12px;color:var(--dim)">${esc(a.desc[locale])}</span></td>
            <td><code>${esc(a.file)}</code><span class="sha">${esc(a.sha256)}</span></td>
            <td style="white-space:nowrap">${esc(a.size)}</td>
            <td style="white-space:nowrap">
              <div style="display:flex;flex-direction:column;gap:6px">
                <a class="btn btn-lime btn-sm" href="${cdnUrl}" download>${esc(nav.cdnBtn)}</a>
                <a class="btn btn-sm" href="${ghUrl}" target="_blank" rel="noopener">${esc(nav.ghBtn)}</a>
              </div>
            </td>
          </tr>`;
  }).join('\n          ');

  const brewCmd = 'brew install --cask qianyiai/tap/kurocat';
  const xattrCmd = 'xattr -cr /Applications/KuroCat.app && open /Applications/KuroCat.app';

  const bodyHtml = `
    <section class="card" id="files">
      <h2>${esc(copy.tblTitle)}</h2>
      <div class="table-wrap">
        <table>
          <thead>
            <tr><th>${esc(copy.colPlat)}</th><th>${esc(copy.colFile)}</th><th>${esc(copy.colSize)}</th><th>${esc(copy.colDl)}</th></tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>
      </div>
    </section>

    <section class="card">
      <h2>${esc(copy.brewTitle)}</h2>
      <p>${esc(copy.brewDesc)}</p>
      <div class="code-box">
        <button class="copy-btn" type="button" data-copy="${esc(brewCmd)}">${esc(nav.copy)}</button>
        <pre>${esc(brewCmd)}</pre>
      </div>
    </section>

    <section class="card">
      <h2>${esc(copy.tipsTitle)}</h2>
      <div class="grid-2">
        <div class="mini-card">
          <h3>${esc(copy.winTipTitle)}</h3>
          <p>${copy.winTipBody}</p>
        </div>
        <div class="mini-card">
          <h3>${esc(copy.macTipTitle)}</h3>
          <p>${esc(copy.macTipBody)}</p>
          <div class="code-box">
            <button class="copy-btn" type="button" data-copy="${esc(xattrCmd)}">${esc(nav.copy)}</button>
            <pre>${esc(xattrCmd)}</pre>
          </div>
        </div>
      </div>
    </section>
  `;

  return renderPage({
    locale,
    slug: 'download',
    title: copy.title,
    description: copy.description,
    eyebrow: copy.eyebrow,
    h1: copy.h1,
    lead: copy.lead,
    breadcrumbLabel: copy.breadcrumb,
    bodyHtml,
    faqs: copy.faqs,
    today,
  });
}

function buildVsBongoCatPage(locale, today) {
  const copy = {
    zh: {
      title: 'KuroCat vs Bongo Cat — 为什么 KuroCat 是 2026 最好的免费开源 3D Bongo Cat 替代品',
      description: '全面对比 KuroCat 与传统 Bongo Cat / Steam Bongo Cat：MIT 开源免费、3D 手办与 2D 经典双引擎、2.2 MB Rust 轻量体积、原生 macOS/Linux/Win7、输密码自动闭眼防偷窥、OBS 免绿幕透明源与 AI MCP 捏脸。',
      eyebrow: 'Comparison · Open-Source Bongo Cat Alternative',
      h1: 'KuroCat vs Bongo Cat：全维度对比',
      lead: '如果你在找一款支持 3D 立体手办、原生支持 macOS / Linux / Win7、打密码自动闭眼、直播免绿幕抠像，而且完全免费开源的 Bongo Cat 替代品，下表一目了然。',
      breadcrumb: 'vs Bongo Cat',
      tblTitle: '核心能力逐项对比',
      colFeat: '对比项',
      colKuro: 'KuroCat（官方开源）',
      colBongo: '传统 / Steam Bongo Cat',
      rows: [
        ['开源协议与价格', '<span class="badge-yes">100% 免费 · MIT 开源（零内购/零广告）</span>', '<span class="badge-mid">闭源或社区旧改版（部分含内购/抽箱）</span>'],
        ['3D 立体 / 2D 双引擎', '<span class="badge-yes">一键切换 3D 立体手办 + 2D 经典（支持 360° 旋转）</span>', '<span class="badge-no">仅 2D 平面贴图</span>'],
        ['安装包与性能占用', '<span class="badge-yes">Tauri v2 + Rust 仅 2.23 MB · 游戏自动 30 FPS 省电</span>', '<span class="badge-mid">通常 60–180 MB，部分版本空闲仍占 GPU</span>'],
        ['跨平台支持', '<span class="badge-yes">Win11/10/7 + macOS (M1–M4/Intel/Homebrew) + Linux + Android</span>', '<span class="badge-no">大多仅限 Windows（Mac/Linux 兼容差）</span>'],
        ['键盘与鼠标精度', '<span class="badge-yes">65% / 108 键全尺寸 + 双视角 + 左右中键独立分色 + 尾巴拍键</span>', '<span class="badge-mid">固定单键位或简单左右拍动</span>'],
        ['输密码防偷窥', '<span class="badge-yes">系统级自动识别密码框：自动闭眼/捂眼并遮蔽键帽</span>', '<span class="badge-no">不支持（直播输密码易泄露节奏/键位）</span>'],
        ['OBS 直播透明源', '<span class="badge-yes">内置本机 Alpha 透明浏览器源（免绿幕抠像 + 仅 OBS 模式）</span>', '<span class="badge-mid">需绿幕色度抠像或窗口捕获，边缘易有绿边</span>'],
        ['AI 伴侣 & MCP 捏脸', '<span class="badge-yes">内置 MCP（22 项五官捏脸/异瞳/折耳）+ Claude/Codex/豆包联动</span>', '<span class="badge-no">不支持</span>'],
      ],
      whyTitle: '三大杀手级体验差异',
      cards: [
        ['🙈 直播和办公不再怕社死', 'KuroCat 在 Windows 与 macOS 底层自动检测密码输入框，聚焦密码栏瞬间猫咪乖巧闭眼、停止外传按键气泡，OBS 直播源同步隐藏。'],
        ['⚡ 2.2 MB Rust 内核，不卡 3A 与竞技网游', '3D 键帽图集合批渲染，检测到全屏游戏自动切换 30 FPS 省电模式，并支持托盘一键「反作弊护航暂停钩子」。'],
        ['🎨 发照片让 AI 0.4 秒捏出你家毛孩子', '内置免依赖 MCP 服务，直接支持 5 种脸型、7 种耳型（含折耳/垂耳）、5 种瞳孔、异瞳、吐舌与自定义斑点。'],
      ],
      faqs: [
        { q: 'KuroCat 和 Bongo Cat 相比有哪些核心优势？', a: 'KuroCat 是 MIT 完全免费开源的现代化替代方案，支持 3D/2D 双引擎切换、Win/Mac/Linux/Android 全平台、密码防偷窥、免绿幕 OBS 透明源以及内置 AI MCP 捏脸，安装包仅 2.23 MB。' },
        { q: 'Mac (M1/M2/M3/M4) 上有能用的 Bongo Cat 吗？', a: '有，KuroCat 原生提供 Apple Silicon + Intel 通用版，支持一行命令 brew install --cask qianyiai/tap/kurocat 安装，并完整兼容 macOS 休眠唤醒与 Karabiner-Elements。' },
        { q: '打瓦/三角洲等强反作弊游戏安全吗？', a: 'KuroCat 仅在本地监听键鼠动作（零网络上传按键内容），且托盘提供一键「暂停监听并隐藏（游戏反作弊护航）」，玩强内核反作弊网游前点一下即可彻底卸载钩子。' },
      ],
    },
    en: {
      title: 'KuroCat vs Bongo Cat — Best Free Open-Source 3D Bongo Cat Alternative (Win/Mac/Linux)',
      description: 'Compare KuroCat with classic Bongo Cat and Steam Bongo Cat: MIT open-source, 3D figurine + 2D dual engine, 2.23 MB Rust/Tauri build, native macOS (Homebrew) & Linux, OS password privacy guard, zero chroma-key OBS overlay, and MCP AI pet studio.',
      eyebrow: 'Comparison · Free Open-Source Bongo Cat Alternative',
      h1: 'KuroCat vs Bongo Cat: Full Feature Comparison',
      lead: 'Looking for a modern, lightweight, open-source Bongo Cat alternative that works natively on Windows, macOS (M1–M4), and Linux — with 3D rendering, password privacy, and OBS alpha transparency?',
      breadcrumb: 'vs Bongo Cat',
      tblTitle: 'Feature-by-Feature Comparison',
      colFeat: 'Feature',
      colKuro: 'KuroCat (Official Open Source)',
      colBongo: 'Classic / Steam Bongo Cat',
      rows: [
        ['License & Pricing', '<span class="badge-yes">100% Free · MIT Open Source (No IAP / Ads)</span>', '<span class="badge-mid">Closed-source or legacy forks (some with loot/IAP)</span>'],
        ['3D + 2D Dual Engine', '<span class="badge-yes">Instant 3D Figurine + 2D Classic switch + 360° orbit</span>', '<span class="badge-no">2D static sprites only</span>'],
        ['Size & Efficiency', '<span class="badge-yes">2.23 MB Tauri v2 + Rust · auto 30 FPS game eco mode</span>', '<span class="badge-mid">60–180 MB; higher idle GPU/CPU on many clones</span>'],
        ['Cross-Platform', '<span class="badge-yes">Win 11/10/7 · macOS (M1–M4/Intel/Homebrew) · Linux · Android</span>', '<span class="badge-no">Mostly Windows-only</span>'],
        ['Keyboard & Mouse', '<span class="badge-yes">65% / 108-key + Cat/Viewer view + L/R/M mouse + tail-key slaps</span>', '<span class="badge-mid">Fixed key overlay or basic 2-paw tap</span>'],
        ['Password Privacy Guard', '<span class="badge-yes">OS-level detection auto-closes eyes & masks keys</span>', '<span class="badge-no">Not supported</span>'],
        ['OBS Overlay', '<span class="badge-yes">Native Alpha Browser Source (no green screen) + OBS-Only mode</span>', '<span class="badge-mid">Requires chroma-key green screen or window capture</span>'],
        ['AI Companion & MCP', '<span class="badge-yes">Built-in MCP (22 facial sculpting params) + Claude/Codex hooks</span>', '<span class="badge-no">Not supported</span>'],
      ],
      whyTitle: 'Why Streamers, Coders & Gamers Switch to KuroCat',
      cards: [
        ['🙈 Automatic Password Privacy', 'On Windows and macOS, focusing any password field automatically makes KuroCat close its eyes and hide all keycap indicators — even inside OBS streams.'],
        ['⚡ Ultra-Light 2.23 MB Rust Core', 'GPU-batched 3D keycap atlas cuts active GPU usage by ~75%, drops to 30 FPS automatically during games, and includes a one-click Anti-Cheat Safe Pause in the tray.'],
        ['🎨 Built-in MCP AI Pet Studio', 'Customize 5 face shapes, 7 ear shapes (including Scottish Fold & floppy ears), 5 pupil styles, heterochromia odd eyes, blep tongue, and spots in 0.4s via Claude or Cursor.'],
      ],
      faqs: [
        { q: 'Is KuroCat a completely free Bongo Cat alternative?', a: 'Yes. KuroCat is MIT-licensed open-source software with zero paywalls, zero ads, and full source code available on github.com/qianyiai/kurocat.' },
        { q: 'Is there a Bongo Cat alternative for macOS Apple Silicon (M1–M4)?', a: 'Yes. KuroCat runs natively on Apple Silicon and Intel Macs via Universal DMG or brew install --cask qianyiai/tap/kurocat.' },
        { q: 'Does KuroCat work as an OBS overlay without a green screen?', a: 'Yes. KuroCat includes a built-in local Browser Source (http://127.0.0.1:27421/obs) with true Alpha transparency and an optional OBS-Only mode.' },
      ],
    },
    ja: {
      title: 'KuroCat vs Bongo Cat — 無料オープンソース 3D Bongo Cat 代替アプリ徹底比較',
      description: 'KuroCat と従来の Bongo Cat を徹底比較：MIT オープンソース無料、3D/2D デュアルエンジン、2.23 MB 軽量 Rust 実装、macOS (M1–M4/Homebrew)＆Linux 対応、パスワード自動目隠し、クロマキー不要 OBS 透過ソース、MCP AI カスタム。',
      eyebrow: 'Comparison · Bongo Cat 代替アプリ比較',
      h1: 'KuroCat vs Bongo Cat 徹底比較',
      lead: '3D 表示・Mac / Linux 対応・パスワード保護・クロマキー不要の OBS 透過配信をすべて無料で備えた、Bongo Cat のモダンなオープンソース代替です。',
      breadcrumb: 'vs Bongo Cat',
      tblTitle: '機能・パフォーマンス比較表',
      colFeat: '比較項目',
      colKuro: 'KuroCat（公式オープンソース）',
      colBongo: '従来の Bongo Cat',
      rows: [
        ['ライセンス・料金', '<span class="badge-yes">完全無料 · MIT オープンソース（広告・課金ゼロ）</span>', '<span class="badge-mid">クローズドソースや一部課金あり</span>'],
        ['3D / 2D デュアル切替', '<span class="badge-yes">3D フィギュア ⇄ 2D クラシック即切替（360° 回転可）</span>', '<span class="badge-no">2D のみ</span>'],
        ['容量と軽さ', '<span class="badge-yes">2.23 MB (Tauri v2 + Rust) · ゲーム時 30 FPS 省電力</span>', '<span class="badge-mid">60〜180 MB クラスが多い</span>'],
        ['対応 OS', '<span class="badge-yes">Win11/10/7 · macOS (M1–M4/Homebrew) · Linux · Android</span>', '<span class="badge-no">多くが Windows のみ</span>'],
        ['パスワード自動保護', '<span class="badge-yes">OS 検知で自動目閉じ＆キー非表示（OBS 連動）</span>', '<span class="badge-no">非対応</span>'],
        ['OBS 透過ソース', '<span class="badge-yes">内蔵ブラウザソース（クロマキー不要・OBS 専用表示）</span>', '<span class="badge-mid">グリーンバック合成が必要</span>'],
        ['AI 連携 & MCP 造形', '<span class="badge-yes">22 項目顔カスタム（オッドアイ・垂れ耳等）＆Claude/Codex 連携</span>', '<span class="badge-no">非対応</span>'],
      ],
      whyTitle: 'KuroCat が選ばれる 3 つの理由',
      cards: [
        ['🙈 配信中のパスワード入力も安心', 'パスワード欄にフォーカスすると自動で目を閉じキー表示を隠すため、OBS 配信や画面共有でも安全です。'],
        ['⚡ ゲームを邪魔しない超軽量設計', 'ゲーム検知で自動 30 FPS 省電力へ切替。アンチチート保護のためトレイからワンクリックでフック停止も可能です。'],
        ['🎨 写真から AI が 0.4 秒で再現', '内蔵 MCP で輪郭・耳型（スコティッシュ折れ耳/垂れ耳）・瞳・オッドアイ・舌出しまで自在にカスタムできます。'],
      ],
      faqs: [
        { q: 'Mac で動く Bongo Cat の代替はありますか？', a: 'はい。KuroCat は Apple Silicon (M1〜M4) と Intel Mac にネイティブ対応し、brew install --cask qianyiai/tap/kurocat で 1 行導入できます。' },
        { q: 'KuroCat は本当に完全無料ですか？', a: 'はい、MIT ライセンスの完全無料オープンソースです。全ソースコードが github.com/qianyiai/kurocat で公開されています。' },
      ],
    },
    ko: {
      title: 'KuroCat vs Bongo Cat — 무료 오픈소스 3D Bongo Cat 대안 완벽 비교',
      description: 'KuroCat과 기존 Bongo Cat 전격 비교: MIT 무료 오픈소스, 3D/2D 듀얼 엔진, 2.23 MB 초경량 Rust 빌드, macOS(Homebrew)·Linux 지원, 비밀번호 자동 눈 가리기, 크로마키 없는 OBS 투명 소스, AI MCP 커스텀.',
      eyebrow: 'Comparison · 무료 오픈소스 Bongo Cat 대안',
      h1: 'KuroCat vs Bongo Cat 핵심 기능 비교',
      lead: '3D 피규어 모드, macOS/Linux 기본 지원, 비밀번호 자동 눈 가리기, 크로마키 없는 OBS 투명 방송까지 모두 무료 오픈소스로 제공하는 차세대 Bongo Cat 대안입니다.',
      breadcrumb: 'vs Bongo Cat',
      tblTitle: '항목별 상세 비교',
      colFeat: '비교 항목',
      colKuro: 'KuroCat (공식 오픈소스)',
      colBongo: '기존 / Steam Bongo Cat',
      rows: [
        ['라이선스 및 가격', '<span class="badge-yes">100% 무료 · MIT 오픈소스 (광고/결제 없음)</span>', '<span class="badge-mid">비공개 소스 또는 일부 유료/뽑기 요소</span>'],
        ['3D + 2D 듀얼 엔진', '<span class="badge-yes">3D 피규어 ⇄ 2D 클래식 원클릭 전환 (360° 회전)</span>', '<span class="badge-no">2D 평면만 지원</span>'],
        ['용량 및 리소스', '<span class="badge-yes">2.23 MB (Tauri v2 + Rust) · 게임 시 자동 30 FPS 절전</span>', '<span class="badge-mid">60~180 MB, 일부 클론은 유휴 시에도 높은 GPU 점유</span>'],
        ['크로스 플랫폼', '<span class="badge-yes">Win 11/10/7 · macOS (M1–M4/Homebrew) · Linux · Android</span>', '<span class="badge-no">대부분 Windows 전용</span>'],
        ['비밀번호 눈 가리기', '<span class="badge-yes">OS 레벨 자동 감지로 눈 가리기 & 키 숨김</span>', '<span class="badge-no">미지원</span>'],
        ['OBS 투명 오버레이', '<span class="badge-yes">로컬 알파 투명 브라우저 소스 기본 내장 (크로마키 불필요)</span>', '<span class="badge-mid">그린스크린 크로마키 필요</span>'],
        ['AI 컴패니언 & MCP', '<span class="badge-yes">22종 얼굴 커스텀(오드아이·접힌 귀 등) + Claude/Codex 연동</span>', '<span class="badge-no">미지원</span>'],
      ],
      whyTitle: '스트리머와 개발자가 KuroCat을 선택하는 이유',
      cards: [
        ['🙈 방송 중 비밀번호 입력도 안전하게', '비밀번호 입력창에 포커스가 가면 자동으로 눈을 가리고 키캡 표시를 숨겨 OBS 방송에서도 안전합니다.'],
        ['⚡ 게임 프레임을 지키는 초경량 Rust 코어', '게임 실행 시 자동 30 FPS 절전 모드로 전환되며, 안티치트 게임 전 트레이에서 원클릭 일시정지도 지원합니다.'],
        ['🎨 반려묘 사진으로 0.4초 AI 커스텀', '내장 MCP 서버로 얼굴형, 7가지 귀 모양(폴드/처진 귀), 오드아이, 혀 내밀기(blep)까지 자유롭게 제작할 수 있습니다.'],
      ],
      faqs: [
        { q: '맥북(Apple Silicon M1~M4)에서도 쓸 수 있는 Bongo Cat 대안인가요?', a: '네, KuroCat은 Apple Silicon과 Intel Mac을 모두 네이티브 지원하며 brew install --cask qianyiai/tap/kurocat으로 한 줄 설치가 가능합니다.' },
        { q: 'OBS에서 그린스크린 없이 투명하게 띄울 수 있나요?', a: '네, 앱 내장 브라우저 소스(http://127.0.0.1:27421/obs)를 추가하면 크로마키 없이 완벽한 알파 투명 채널로 방송에 넣을 수 있습니다.' },
      ],
    },
  }[locale];

  const bodyHtml = `
    <section class="card">
      <h2>${esc(copy.tblTitle)}</h2>
      <div class="table-wrap">
        <table>
          <thead><tr><th>${esc(copy.colFeat)}</th><th>${esc(copy.colKuro)}</th><th>${esc(copy.colBongo)}</th></tr></thead>
          <tbody>
            ${copy.rows.map((r) => `<tr><td><strong>${esc(r[0])}</strong></td><td>${r[1]}</td><td>${r[2]}</td></tr>`).join('\n            ')}
          </tbody>
        </table>
      </div>
    </section>

    <section class="card">
      <h2>${esc(copy.whyTitle)}</h2>
      <div class="grid-3">
        ${copy.cards.map((c) => `<div class="mini-card"><h3>${esc(c[0])}</h3><p>${esc(c[1])}</p></div>`).join('\n        ')}
      </div>
    </section>
  `;

  return renderPage({
    locale,
    slug: 'vs/bongo-cat',
    title: copy.title,
    description: copy.description,
    eyebrow: copy.eyebrow,
    h1: copy.h1,
    lead: copy.lead,
    breadcrumbLabel: copy.breadcrumb,
    bodyHtml,
    faqs: copy.faqs,
    today,
  });
}

function buildObsPage(locale, today) {
  const nav = NAV_I18N[locale];
  const obsUrl = 'http://127.0.0.1:27421/obs';
  const copy = {
    zh: {
      title: 'KuroCat OBS 透明直播源教程 — 免绿幕抠像 3 步添加 3D/2D 打字小黑猫',
      description: '无需绿幕色度抠像！3 步把 KuroCat 透明打字小黑猫接入 OBS Studio / 抖音直播伴侣 / B站直播姬：原生 Alpha 透明通道、支持「仅 OBS 显示」与输密码自动闭眼同步。',
      eyebrow: 'OBS Studio · Zero Chroma-Key Alpha Overlay',
      h1: 'OBS 免绿幕透明打字猫：3 步极速接入',
      lead: 'KuroCat 原生内置本机透明浏览器源（默认关闭零开销），直接输出纯 Alpha 透明通道，告别绿幕溢色与锯齿边缘，完美适配 OBS Studio、Streamlabs、B 站直播姬与抖音直播伴侣。',
      breadcrumb: 'OBS 直播源',
      stepsTitle: '3 步完成 OBS 透明源配置',
      steps: [
        { name: '开启并复制本机 OBS 地址', text: '启动 KuroCat 后，右键点击桌面小猫或右下角系统托盘，选择「复制 OBS 透明源地址」（自动启动本机服务 http://127.0.0.1:27421/obs，不联网、零外泄）。' },
        { name: '在 OBS 中添加「浏览器」来源', text: '打开 OBS Studio → 来源栏点「+」→ 选择「浏览器 (Browser)」→ URL 粘贴 http://127.0.0.1:27421/obs，建议画布尺寸设为 800 × 600（或按需缩放），无需任何色度键滤镜。' },
        { name: '按需开启「仅 OBS 显示」与密码保护', text: '如果不想桌面上遮挡游戏画面，可在托盘勾选「仅 OBS 显示」隐藏桌面猫，OBS 直播画面依然 60fps 实时同步打字、鼠标左右键、AI 状态与输密码自动闭眼！' },
      ],
      extraTitle: '抖音直播伴侣 / 窗口捕获补充方案（KuroCat Live）',
      extraBody: '部分直播工具（如抖音直播伴侣）如果不支持透明浏览器源，KuroCat 同样内置了「直播伴侣绿/蓝/品红幕捕获窗口（KuroCat Live）」，右键菜单或托盘一键开启纯色无边框捕获窗口，配合色度抠像同样清晰丝滑。',
      faqs: [
        { q: '为什么 OBS 添加后没有绿底、也不用加色度键滤镜？', a: '因为 http://127.0.0.1:27421/obs 直接渲染在带原生 Alpha 透明通道的网页画布上，OBS 浏览器源原生支持透明背景，边缘抗锯齿比绿幕抠像干净得多。' },
        { q: '直播时输入密码会被观众看到按键吗？', a: '不会。KuroCat 在检测到 Windows / macOS 密码输入框时会自动进入防偷窥状态，OBS 透明源会实时同步闭眼（大肥鱼捂眼）并完全屏蔽按键与气泡。' },
        { q: '平时不直播时开启 OBS 服务会占资源吗？', a: 'OBS 透明源服务默认关闭（零线程、零端口开销），仅在你主动开启或点击复制地址后才在 127.0.0.1 本机监听。' },
      ],
    },
    en: {
      title: 'KuroCat OBS Transparent Keyboard Cat Overlay — 3-Step Zero Chroma-Key Setup',
      description: 'Add a free 3D/2D typing cat overlay to OBS Studio without green screen chroma-key. Built-in local Browser Source (http://127.0.0.1:27421/obs) with true Alpha transparency, OBS-Only mode, and synced password privacy.',
      eyebrow: 'OBS Studio · Zero Chroma-Key Alpha Overlay',
      h1: 'OBS Transparent Typing Cat Overlay in 3 Steps',
      lead: 'Skip ugly green-screen fringes. KuroCat ships with a built-in local Browser Source (off by default with zero overhead) delivering true Alpha transparency for OBS Studio, Twitch, YouTube, and Kick streams.',
      breadcrumb: 'OBS Overlay',
      stepsTitle: '3-Step OBS Browser Source Setup',
      steps: [
        { name: 'Copy the Local OBS Source URL', text: 'Right-click KuroCat (or its system tray icon) and click "Copy OBS Transparent Source URL". This enables the loopback-only server at http://127.0.0.1:27421/obs.' },
        { name: 'Add a Browser Source in OBS Studio', text: 'In OBS Studio click "+" under Sources → Browser → paste http://127.0.0.1:27421/obs and set Width 800, Height 600. No Chroma Key filter needed!' },
        { name: 'Optional: Enable OBS-Only Mode', text: 'Want a clean desktop while streaming? Toggle "OBS-Only Mode" to hide the desktop cat while keeping the OBS overlay running live with synced password privacy guard.' },
      ],
      extraTitle: 'Chroma-Key Window Capture Fallback (KuroCat Live)',
      extraBody: 'For streaming tools that do not support transparent Browser Sources, KuroCat also includes a borderless "KuroCat Live" capture window with switchable blue/green/magenta chroma backgrounds.',
      faqs: [
        { q: 'Does the OBS Browser Source send my keystrokes to the internet?', a: 'Never. The overlay server binds strictly to 127.0.0.1 (localhost only) and is disabled by default until you turn it on.' },
        { q: 'Does password privacy protection also work inside OBS?', a: 'Yes! Whenever you focus a Windows or macOS password field, the OBS overlay immediately closes the cat’s eyes and suppresses all key highlights and bubbles.' },
      ],
    },
    ja: {
      title: 'KuroCat OBS 透過タイピング猫オーバーレイ導入ガイド — クロマキー不要の 3 ステップ',
      description: 'グリーンバック不要！KuroCat の内蔵ブラウザソース（http://127.0.0.1:27421/obs）を使って OBS Studio に完全アルファ透過の 3D/2D 打鍵猫を 3 ステップで追加する方法。',
      eyebrow: 'OBS Studio · クロマキー不要アルファ透過',
      h1: 'OBS 透過タイピング猫オーバーレイ（3 ステップ導入）',
      lead: 'クロマキーの緑フチとはお別れ。KuroCat 内蔵のローカルブラウザソース（初期 OFF・負荷ゼロ）で、完全アルファ透過のまま OBS Studio に 60fps 表示できます。',
      breadcrumb: 'OBS 透過配信',
      stepsTitle: 'OBS ブラウザソース 3 ステップ設定',
      steps: [
        { name: 'ローカル OBS URL をコピー', text: 'KuroCat またはトレイを右クリックし「OBS 透過ソース URL をコピー」を選択します（ローカル限定 http://127.0.0.1:27421/obs が起動）。' },
        { name: 'OBS で「ブラウザ」ソースを追加', text: 'OBS Studio のソース「＋」→「ブラウザ」を選び、URL に http://127.0.0.1:27421/obs、サイズ 800×600 を入力します。クロマキーフィルタは不要です。' },
        { name: '必要に応じて「OBS のみ表示」をオン', text: 'デスクトップ側を隠したい場合は「OBS のみ表示」を有効化。パスワード入力時の自動目隠しも OBS 側へそのまま連動します。' },
      ],
      extraTitle: 'ウィンドウキャプチャ派向けのクロマキー専用窓（KuroCat Live）',
      extraBody: 'ブラウザソース非対応の配信ツール向けに、青/緑/マゼンタ背景を切り替えられるフレームレス専用窓「KuroCat Live」も内蔵しています。',
      faqs: [
        { q: 'OBS 配信中にパスワードを入力しても大丈夫ですか？', a: 'はい。OS のパスワード欄を検知すると OBS 側でも即座に目を閉じ、キー発光やバブルを完全に非表示にします。' },
        { q: 'ローカルサーバーは外部からアクセスされますか？', a: 'いいえ、127.0.0.1（自分自身の PC 内部）のみにバインドされ、初期状態では完全にオフです。' },
      ],
    },
    ko: {
      title: 'KuroCat OBS 투명 타이핑 고양이 오버레이 설정 — 크로마키 없는 3단계 가이드',
      description: '그린스크린 크로마키 없이 OBS Studio에 3D/2D 타이핑 고양이를 추가하세요. 내장 로컬 브라우저 소스(http://127.0.0.1:27421/obs)로 알파 투명 채널, OBS 전용 표시 및 비밀번호 눈 가리기를 완벽 지원합니다.',
      eyebrow: 'OBS Studio · 크로마키 없는 알파 투명 오버레이',
      h1: 'OBS 투명 타이핑 고양이 오버레이 3단계 설정',
      lead: '지저분한 초록 테두리 없이 깔끔하게! KuroCat 내장 로컬 브라우저 소스(기본 꺼짐·부하 0)로 OBS Studio, 치지직, 숲(아프리카TV), 트위치 방송에 바로 투명 오버레이를 띄울 수 있습니다.',
      breadcrumb: 'OBS 투명 오버레이',
      stepsTitle: 'OBS 브라우저 소스 3단계 연결',
      steps: [
        { name: '로컬 OBS 주소 복사', text: 'KuroCat 또는 트레이 아이콘을 우클릭해「OBS 투명 소스 주소 복사」를 누릅니다(로컬 전용 http://127.0.0.1:27421/obs 자동 시작).' },
        { name: 'OBS에서「브라우저」소스 추가', text: 'OBS Studio 소스「+」→「브라우저」선택 후 URL에 http://127.0.0.1:27421/obs, 너비 800 / 높이 600을 입력합니다. 크로마키 필터가 전혀 필요 없습니다.' },
        { name: '원하면「OBS 전용 표시」활성화', text: '게임 화면을 가리지 않으려면「OBS 전용 표시」로 바탕화면 펫을 숨기세요. OBS 방송 화면은 그대로 유지되며 비밀번호 눈 가리기도 실시간 연동됩니다.' },
      ],
      extraTitle: '윈도우 캡처용 크로마키 전용 창 (KuroCat Live)',
      extraBody: '브라우저 소스를 지원하지 않는 방송 프로그램을 위해 파랑/초록/마젠타 단색 배경의 테두리 없는 캡처 창(KuroCat Live)도 함께 제공합니다.',
      faqs: [
        { q: '방송 중 비밀번호를 입력해도 키가 노출되지 않나요?', a: '네, Windows/macOS 비밀번호 입력창이 감지되면 OBS 오버레이에서도 즉시 눈을 가리고 모든 키캡과 말풍선을 숨깁니다.' },
        { q: '키 입력 데이터가 외부 서버로 전송되나요?', a: '전혀 전송되지 않습니다. OBS 소스는 127.0.0.1 로컬 루프백에서만 동작하며 기본 상태에서는 꺼져 있습니다.' },
      ],
    },
  }[locale];

  const bodyHtml = `
    <section class="card">
      <h2>${esc(copy.stepsTitle)}</h2>
      <div class="code-box">
        <button class="copy-btn" type="button" data-copy="${esc(obsUrl)}">${esc(nav.copy)}</button>
        <pre>${esc(obsUrl)}</pre>
      </div>
      <div class="grid-3">
        ${copy.steps.map((s, i) => `<div class="mini-card"><h3><span class="step-num">${i + 1}</span>${esc(s.name)}</h3><p>${esc(s.text)}</p></div>`).join('\n        ')}
      </div>
    </section>

    <section class="card">
      <h2>${esc(copy.extraTitle)}</h2>
      <p>${esc(copy.extraBody)}</p>
    </section>
  `;

  return renderPage({
    locale,
    slug: 'obs',
    title: copy.title,
    description: copy.description,
    eyebrow: copy.eyebrow,
    h1: copy.h1,
    lead: copy.lead,
    breadcrumbLabel: copy.breadcrumb,
    bodyHtml,
    faqs: copy.faqs,
    howToSteps: copy.steps,
    today,
  });
}

function buildMcpPage(locale, today) {
  const nav = NAV_I18N[locale];
  const mcpHttpCfg = `{
  "mcpServers": {
    "kurocat": {
      "url": "http://127.0.0.1:27420/mcp"
    }
  }
}`;
  const sampleSculptJson = `{
  "id": "scottish-fold-odd-eye",
  "name": "异瞳折耳吐舌猫",
  "faceShape": "round",
  "headWidth": 1.10,
  "earShape": "folded",
  "eyeScale": 1.20,
  "pupilShape": "round",
  "eyeColorTop": "#2c7be5",
  "rightEyeColorTop": "#d9921c",
  "noseShape": "small",
  "mouthShape": "blep",
  "blushAlways": true
}`;

  const copy = {
    zh: {
      title: 'KuroCat MCP AI 捏猫 & AI 编程伴侣 — Claude Code / Cursor / Codex / 豆包实时联动',
      description: 'KuroCat 原生内置 Stdio 与 Streamable HTTP (127.0.0.1:27420) MCP 服务端：支持 Claude Code、Cursor、Codex、DeepSeek、豆包状态实时同步，发一张宠物照片让 AI 0.4 秒调出脸型、折耳/垂耳、异瞳与 22 项精细五官。',
      eyebrow: 'Built-in MCP Server · AI Coding Companion',
      h1: 'AI 编程伴侣 & MCP 全五官自由捏宠',
      lead: '无需安装 Node.js 或 Python，KuroCat 单文件原生内置 MCP 服务端与 Agent Hook：既能让 AI 写代码时自动陪你敲键盘、跑完叮咚提醒，也能发一张照片让 AI 0.4 秒把你家毛孩子捏进 2D/3D 桌面。',
      breadcrumb: 'AI 伴侣 & MCP',
      cfgTitle: '1 分钟接入 MCP（Claude Desktop / Cursor / Windsurf / Antigravity）',
      cfgDesc: '右键猫咪或系统托盘点「复制 MCP 配置」即可获取 Stdio 配置，或直接连接运行中的本机 Streamable HTTP 端点：',
      sculptTitle: '全新 2D / 3D 全维度五官捏脸（看图捏宠更像了）',
      sculptItems: [
        ['脸型与体型', '5 种脸型（round / square 藏狐方脸 / wide 虎熊宽腮 / fox / oval）+ headWidth + jawSquareness + bodyChubbiness'],
        ['7 种耳型（含折耳/垂耳）', 'cat / round / tall / small / wide / folded（折耳猫）/ floppy（垂耳狗/兔）+ earScale / earSpacing / earTilt'],
        ['眼睛全维度 + 异瞳', 'eyeScale / eyeAspect / eyeSpacing / eyeOffsetY / eyeTilt / eyeSquint + 5 种瞳孔（oval / round / slit 竖瞳 / dot 豆豆眼 / star 星星眼）+ rightEyeColorTop 异瞳'],
        ['鼻嘴、眉毛、胡须与斑点', '5 种鼻型 + 6 种嘴型（含 blep 呆萌吐舌）+ 5 种眉型（含柴犬豆豆眉）+ 可隐藏胡须 + 常驻腮红 + 最多 16 处 3D 自定义斑点'],
      ],
      jsonTitle: '示例：异瞳折耳吐舌猫 MCP JSON（0.4s 热重载）',
      promptsTitle: '直接复制给 AI 的捏猫提示词',
      prompts: [
        '看这张我家猫的照片，先调用 KuroCat MCP 的 get_cat_schema，再按它的脸型、耳型、眼色、五官比例和斑点位置帮我用 upsert_cat 捏一只 3D 桌宠并切过去！',
        '帮我用 KuroCat MCP 捏一只异瞳折耳白猫（左蓝右金、圆大眼、粉色小鼻子和吐舌 blep 表情，常驻腮红），并立刻切换显示。',
        '帮我用 KuroCat MCP 捏一只带白色豆豆眉、垂耳、隐藏胡须、大圆黑鼻子和开心微笑的柴犬桌宠！',
      ],
      faqs: [
        { q: '使用 KuroCat MCP 需要装 Node.js 或 Python 吗？', a: '完全不需要。KuroCat 用 Rust 在单个客户端程序内原生实现了 Stdio（--mcp）与本机 Streamable HTTP（http://127.0.0.1:27420/mcp）双模式 MCP 服务端。' },
        { q: '支持哪些 AI 编程工具的状态联动？', a: '支持 Claude Code、Codex CLI、Cursor、Windsurf、Antigravity、DeepSeek、豆包工作版等：AI 写代码时小猫自动代打，等你确认时轻提醒，报错炸毛，任务完成眯眼脸红并同步到 OBS 直播源。' },
        { q: '可以按照片修改脸型、五官大小和位置吗？', a: '可以！最新 MCP schema 已在 2D 和 3D 引擎同步开放脸型、7 种耳型（含折耳/垂耳）、眼睛大小/圆扁/眼距/高低/倾角、5 种瞳孔、异瞳、鼻嘴形状位置、眉毛与胡须等全部精细参数。' },
      ],
    },
    en: {
      title: 'KuroCat MCP Server & AI Coding Companion — Claude Code / Cursor / Codex Desktop Pet',
      description: 'Built-in zero-dependency Stdio & Streamable HTTP MCP server (127.0.0.1:27420/mcp) inside KuroCat: real-time Claude Code / Cursor / Codex companion hooks plus 22 facial sculpting parameters (folded/floppy ears, heterochromia, blep, eyebrows) in 2D & 3D.',
      eyebrow: 'Built-in MCP Server · AI Coding Companion',
      h1: 'AI Coding Companion & Built-In MCP Pet Studio',
      lead: 'Zero Node.js or Python needed. KuroCat embeds both Stdio and local Streamable HTTP MCP servers so Claude Code, Cursor, Codex, or Windsurf can animate your desktop pet while coding — and sculpt your own pet from a photo in 0.4 seconds.',
      breadcrumb: 'AI & MCP Studio',
      cfgTitle: 'Connect MCP in 1 Minute (Claude Desktop / Cursor / Windsurf)',
      cfgDesc: 'Right-click KuroCat → "Copy MCP Config" for Stdio, or point any MCP client directly at the running local Streamable HTTP endpoint:',
      sculptTitle: 'Full 2D + 3D Facial Sculpting via MCP',
      sculptItems: [
        ['Head & Body Silhouette', '5 faceShape presets (round / square / wide / fox / oval) + headWidth + jawSquareness + bodyChubbiness'],
        ['7 Ear Shapes (Folded & Floppy)', 'cat / round / tall / small / wide / folded (Scottish Fold) / floppy (puppy/lop) + earScale / earSpacing / earTilt'],
        ['Eyes, Pupils & Heterochromia', 'eyeScale / eyeAspect / eyeSpacing / eyeOffsetY / eyeTilt / eyeSquint + 5 pupil shapes (oval / round / slit / dot / star) + rightEyeColorTop odd-eyed heterochromia'],
        ['Nose, Mouth, Brows & Spots', '5 nose shapes + 6 mouth styles (incl. cute blep tongue) + 5 eyebrow styles (incl. Shiba dot brows) + whiskerLength (0 hides) + permanent blush + up to 16 3D spots'],
      ],
      jsonTitle: 'Example: Odd-Eyed Scottish Fold Blep JSON (0.4s Live Hot-Reload)',
      promptsTitle: 'Copy-Paste AI Prompts',
      prompts: [
        'Look at this photo of my pet. Call KuroCat MCP get_cat_schema first, then sculpt its face shape, ears, eyes, facial proportions, and spots using upsert_cat and switch to it!',
        'Use KuroCat MCP to create an odd-eyed white Scottish Fold cat (blue left eye, amber right eye, folded ears, cute blep tongue, permanent soft blush) and activate it.',
        'Use KuroCat MCP to sculpt a smiling Shiba Inu with thick cream dot eyebrows, no whiskers, round black nose, and fluffy tail!',
      ],
      faqs: [
        { q: 'Does KuroCat MCP require Node.js or Python?', a: 'No. Both Stdio (--mcp) and local Streamable HTTP (http://127.0.0.1:27420/mcp) are compiled natively in Rust inside the single KuroCat binary.' },
        { q: 'Which AI coding tools can drive KuroCat as a companion?', a: 'Claude Code, Codex CLI, Cursor, Windsurf, Antigravity, DeepSeek, and Doubao via --hook, local HTTP /hook, or Streamable HTTP /mcp.' },
      ],
    },
    ja: {
      title: 'KuroCat MCP サーバー＆AI コーディング相棒 — Claude Code / Cursor / Codex 連携＆AI 顔カスタム',
      description: 'Node.js・Python 不要のネイティブ MCP サーバー（127.0.0.1:27420/mcp）を内蔵。Claude Code や Cursor の作業状態をリアルタイム反映し、22 項目の顔パラメータ（折れ耳・垂れ耳・オッドアイ・舌出し）で写真から愛猫を 0.4 秒再現。',
      eyebrow: 'Built-in MCP Server · AI コーディングコンパニオン',
      h1: 'AI コーディング連携＆MCP フル顔カスタム',
      lead: '追加ランタイム不要。Claude Code / Cursor / Codex の作業中に黒猫が代わりにタイピングし、完了やエラーを表情でお知らせ。さらに愛猫の写真から 0.4 秒で 2D/3D 再現できます。',
      breadcrumb: 'AI & MCP',
      cfgTitle: '1 分で MCP 接続（Claude Desktop / Cursor / Windsurf）',
      cfgDesc: '右クリック「MCP 設定をコピー」または実行中のローカル Streamable HTTP エンドポイントへ直接接続できます：',
      sculptTitle: '2D / 3D 同期 22 項目フル顔造形パラメータ',
      sculptItems: [
        ['輪郭・体型', '5 種の faceShape（round / square / wide / fox / oval）＋ headWidth / jawSquareness / bodyChubbiness'],
        ['7 種の耳型（折れ耳・垂れ耳対応）', 'cat / round / tall / small / wide / folded（スコティッシュ）/ floppy（垂れ耳犬・うさぎ）＋ 間隔・傾き'],
        ['目・瞳・オッドアイ', '目の大きさ/縦横比/間隔/高さ/つり目・垂れ目 ＋ 5 種の瞳（oval / round / slit / dot / star）＋ 左右別色オッドアイ'],
        ['鼻・口・眉・ひげ・模様', '5 種の鼻 ＋ 6 種の口（舌出し blep 含む）＋ 柴犬まろ眉など 5 種の眉 ＋ ひげ長（0 で非表示）＋ 常時チーク ＋ 斑点 16 箇所'],
      ],
      jsonTitle: 'MCP JSON サンプル（オッドアイ折れ耳・舌出し白猫）',
      promptsTitle: 'AI にそのまま貼れるプロンプト',
      prompts: [
        'この愛猫の写真を見て、KuroCat MCP の get_cat_schema を確認してから、輪郭・耳・目・模様まで upsert_cat で再現して切り替えて！',
        'KuroCat MCP で左青・右金のオッドアイ、折れ耳、舌出し（blep）、常時チークの白猫を作って切り替えて！',
      ],
      faqs: [
        { q: 'MCP 利用に Node.js や Python の導入は必要ですか？', a: '不要です。単体バイナリに Rust ネイティブの Stdio とローカル Streamable HTTP（127.0.0.1:27420/mcp）を内蔵しています。' },
      ],
    },
    ko: {
      title: 'KuroCat MCP 서버 & AI 코딩 컴패니언 — Claude Code / Cursor / Codex 연동 및 AI 얼굴 커스텀',
      description: 'Node.js·Python 설치 없이 내장된 Rust MCP 서버(127.0.0.1:27420/mcp): Claude Code·Cursor 작업 상태 실시간 연동 및 22종 정밀 얼굴 커스텀(접힌 귀/처진 귀/오드아이/혀 내밀기) 지원.',
      eyebrow: 'Built-in MCP Server · AI 코딩 컴패니언',
      h1: 'AI 코딩 컴패니언 & 내장 MCP 펫 스튜디오',
      lead: '별도 런타임 없이 단일 앱에 Stdio와 로컬 Streamable HTTP MCP 서버를 내장했습니다. AI 코딩 중 자동 타이핑·알림 연동은 물론, 반려묘 사진 한 장으로 0.4초 만에 2D/3D 펫을 제작하세요.',
      breadcrumb: 'AI & MCP',
      cfgTitle: '1분 만에 MCP 연결 (Claude Desktop / Cursor / Windsurf)',
      cfgDesc: '우클릭「MCP 설정 복사」를 쓰거나 실행 중인 로컬 Streamable HTTP 주소로 바로 연결하세요:',
      sculptTitle: '2D / 3D 동시 지원 22종 정밀 얼굴 커스텀',
      sculptItems: [
        ['얼굴형 & 체형', '5가지 faceShape(round / square / wide / fox / oval) + headWidth + jawSquareness + bodyChubbiness'],
        ['7가지 귀 모양 (폴드/처진 귀)', 'cat / round / tall / small / wide / folded(스코티시 폴드) / floppy(강아지·토끼 처진 귀) + 간격·각도'],
        ['눈·동공 & 오드아이', '눈 크기/비율/간격/높이/눈꼬리 + 5가지 동공(oval / round / slit / dot / star) + 좌우 다른 색 오드아이'],
        ['코·입·눈썹·수염·얼룩', '5가지 코 + 6가지 입(혀 내밀기 blep 포함) + 시바견 콩눈썹 등 5가지 눈썹 + 수염 숨김(0) + 상시 볼터치 + 최대 16개 3D 얼룩'],
      ],
      jsonTitle: '예시: 오드아이 스코티시 폴드 혀 내밀기 JSON (0.4초 핫리로드)',
      promptsTitle: 'AI에게 바로 복사해서 쓰는 프롬프트',
      prompts: [
        '우리 집 반려동물 사진을 보고 KuroCat MCP get_cat_schema를 먼저 확인한 뒤, 얼굴형·귀·눈 비율·무늬까지 upsert_cat으로 만들어 적용해 줘!',
        'KuroCat MCP로 왼쪽 파란 눈·오른쪽 금색 눈 오드아이, 접힌 귀(folded), 혀 내밀기(blep), 상시 볼터치 흰 고양이를 만들어 바로 전환해 줘!',
      ],
      faqs: [
        { q: 'KuroCat MCP를 쓰려면 Node.js나 Python이 필요한가요?', a: '아니요. Rust로 작성된 Stdio(--mcp)와 로컬 Streamable HTTP(127.0.0.1:27420/mcp)가 단일 앱 안에 기본 내장되어 있습니다.' },
      ],
    },
  }[locale];

  const howToSteps = [
    { name: copy.cfgTitle, text: 'Connect http://127.0.0.1:27420/mcp or KuroCat --mcp in Claude Desktop, Cursor, or Windsurf.' },
    { name: 'Inspect get_cat_schema', text: 'Let your AI assistant read all facial sculpting parameters and examples.' },
    { name: 'Call upsert_cat / patch_cat', text: 'Hot-reload your custom 2D & 3D desktop pet live in 0.4 seconds.' },
  ];

  const bodyHtml = `
    <section class="card">
      <h2>${esc(copy.cfgTitle)}</h2>
      <p>${esc(copy.cfgDesc)}</p>
      <div class="code-box">
        <button class="copy-btn" type="button" data-copy="${esc(mcpHttpCfg)}">${esc(nav.copy)}</button>
        <pre>${esc(mcpHttpCfg)}</pre>
      </div>
    </section>

    <section class="card">
      <h2>${esc(copy.sculptTitle)}</h2>
      <div class="grid-2">
        ${copy.sculptItems.map((it) => `<div class="mini-card"><h3>${esc(it[0])}</h3><p>${esc(it[1])}</p></div>`).join('\n        ')}
      </div>
    </section>

    <section class="card">
      <h2>${esc(copy.jsonTitle)}</h2>
      <div class="code-box">
        <button class="copy-btn" type="button" data-copy="${esc(sampleSculptJson)}">${esc(nav.copy)}</button>
        <pre>${esc(sampleSculptJson)}</pre>
      </div>
      <h3>${esc(copy.promptsTitle)}</h3>
      ${copy.prompts
        .map(
          (pr) =>
            `<div class="code-box"><button class="copy-btn" type="button" data-copy="${esc(pr)}">${esc(nav.copy)}</button><pre style="white-space:pre-wrap">${esc(pr)}</pre></div>`,
        )
        .join('\n      ')}
    </section>
  `;

  return renderPage({
    locale,
    slug: 'mcp',
    title: copy.title,
    description: copy.description,
    eyebrow: copy.eyebrow,
    h1: copy.h1,
    lead: copy.lead,
    breadcrumbLabel: copy.breadcrumb,
    bodyHtml,
    faqs: copy.faqs,
    howToSteps,
    today,
  });
}

export function generateAllSubpages(distDir, today) {
  const builders = {
    download: buildDownloadPage,
    'vs/bongo-cat': buildVsBongoCatPage,
    obs: buildObsPage,
    mcp: buildMcpPage,
  };
  let count = 0;
  for (const slug of SUBPAGE_SLUGS) {
    for (const locale of LOCALES) {
      const html = builders[slug](locale, today);
      const relDir = locale === 'zh' ? slug : path.join(locale, slug);
      const outDir = path.join(distDir, relDir);
      fs.mkdirSync(outDir, { recursive: true });
      fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf8');
      count += 1;
    }
  }
  return count;
}
